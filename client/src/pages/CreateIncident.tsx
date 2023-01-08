import React, {useContext} from "react";
import {Button, Card, CardContent, CardHeader, Container, MenuItem, TextField as MUITextfield} from "@material-ui/core";
import styled from "styled-components";
import {incidentAPI} from "../api/IncidentAPI";
import {userAPI} from "../api/UserAPI";
import {SeverityTypes, Snackbar} from "../components/snackbar/Snackbar";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

interface ICreateIncident {}

const incidentTypes = [
  {
    value: "Software",
    label: "Software"
  },
  {
    value: "Hardware",
    label: "Hardware"
  },
  {
    value: "Service",
    label: "Service"
  }
];

const priorities = [
  {
    value: "Low",
    label: "Low"
  },
  {
    value: "Normal",
    label: "Normal"
  },
  {
    value: "High",
    label: "High"
  }
];

const deadlines = [
  {
    value: addDays(7),
    label: "7 Days"
  },
  {
    value: addDays(14),
    label: "14 days"
  },
  {
    value: addDays(28),
    label: "28 days"
  },
  {
    value: addMonths(6),
    label: "6 months"
  }
];

function addDays(numberOfDays: number) {
  const date = new Date();
  return date.setDate(date.getDate() + numberOfDays);
}

function addMonths(numberOfMonths: number) {
  const date = new Date();
  return date.setMonth(date.getMonth() + numberOfMonths);
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  width: 47%;
  margin-top: 28px;
`;

const TextField = styled(MUITextfield)`
  margin-bottom: 24px;
`;

export function CreateIncident(props: ICreateIncident) {
  const { role, userId } = useContext(AuthContext);
  const [subject, setSubject] = React.useState("");
  const [incidentType, setIncidentType] = React.useState(incidentTypes[0].value);
  const [users, setUsers] = React.useState([{label: '', value: ''}])
  const [user, setUser] = React.useState(role === 'Service Desk employee' ? "" : userId );
  const [priority, setPriority] = React.useState(priorities[0].value);
  const [deadline, setDeadline] = React.useState("7");
  const [description, setDescription] = React.useState("");
  const [failure, setFailure] = React.useState(false);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const history = useHistory();

  const handleChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleChangeIncident = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncidentType(event.target.value);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const handleChangePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
  };

  const handleChangeDeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  function onSubmit(event?: React.FormEvent<HTMLFormElement>) {
    const requestBody = {
      reportDate: new Date(),
      subject: subject,
      type: incidentType,
      reportedBy: user,
      priority: priority,
      deadline: deadline,
      description: description,
      isResolved: "false"
    };

    incidentAPI.createIncident(requestBody).then(res => {
      history.push({pathname: "/", state: {tab: 1, fromOtherPage: true, message: "Incident creation successfull", severity: SeverityTypes.SUCCESS}});
    }).catch(e => {
      setFailure(e)
    })

  }

  function setAllUsers(): void{
    userAPI.getAllUsers().then(res => {
      const users: {label: string, value: string}[] = []
      res.data.data.forEach((user: any) => {
        users.push({
          label: user.firstName + ' ' + user.lastName,
          value: user._id
        })
      })
      setUsers(users)
    }).catch(e => {
      console.log(e)
    })
  }

  React.useEffect(() => {
    setAllUsers()
  }, []);

  React.useEffect(() => {
      setFormIsValid(validateForm());
  }, [subject, incidentType, user, priority, deadline]);

  function validateForm(): boolean {
    return (subject &&
      incidentType &&
      user &&
      priority &&
      deadline) ? true : false;
  }

  // @ts-ignore
  return (
    <Container maxWidth="sm" style={{ marginTop: "96px" }}>
      <Card>
        <CardHeader
          title="Create a new incident"
          subheader="Fill in all the required incident details"
        />
        <CardContent>
          <Form autoComplete="on">
            {/* SUBJECT */}
            <TextField
              required
              id="subject"
              label="Subject"
              value={subject}
              onChange={handleChangeSubject}
            />

            {/* TYPE OF INCIDENT*/}
            <TextField
              id="type"
              select
              required
              label="Type of incident"
              value={incidentType}
              onChange={handleChangeIncident}
            >
              {incidentTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* REPORTED BY USER*/}
            {role === 'Service Desk employee' && (
                <TextField
                id="user"
                select
                required
                label="Reported by user"
                value={user}
                onChange={handleChangeUser}
            >
              {users.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>)}

            {/* PRIORITY*/}
            <TextField
              id="priority"
              select
              required
              label="Priority"
              value={priority}
              onChange={handleChangePriority}
            >
              {priorities.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* DEADLINE*/}
            <TextField
              id="deadline"
              select
              required
              label="Deadline"
              value={deadline}
              onChange={handleChangeDeadline}
            >
              {deadlines.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* DESCRIPTION*/}
            <TextField
              id="description"
              label="Description"
              multiline
              rows={6}
              value={description}
              onChange={handleChangeDescription}
              variant="outlined"
            />
            <ButtonContainer>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => history.push({pathname: "/", state: {tab: 1}})}
              >
                CANCEL
              </Button>

              <Button
                color="primary"
                variant="contained"
                onClick={() => onSubmit()}
                disabled={!formIsValid}
                disableElevation
              >
                SUBMIT TICKET
              </Button>
            </ButtonContainer>
          </Form>
        </CardContent>
        <Snackbar
          open={failure}
          message="Incident creation failed, please try again"
          severity={SeverityTypes.WARNING}
        />
      </Card>
    </Container>
  );
}
