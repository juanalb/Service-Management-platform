import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  MenuItem,
  TextField as MUITextfield,
  Snackbar
} from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";

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

const users = [
  {
    value: "5f8cc5cae2c69f3a1c7cf99c",
    label: "Juan Albergen"
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
  const [subject, setSubject] = React.useState("");
  const [incidentType, setIncidentType] = React.useState("Software");
  const [users, setUsers] = React.useState([{label: '', value: ''}])
  const [user, setUser] = React.useState("Juan");
  const [priority, setPriority] = React.useState("Normal");
  const [deadline, setDeadline] = React.useState("7");
  const [description, setDescription] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [formIsValid, setFormIsValid] = React.useState(false);

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

    axios
      .post(`http://localhost:8080/api/incident`, requestBody)
      .then(res => {
        setSuccess(true);
      })
      .catch(e => {
        setFailure(true);
      });
  }

  function getUsers(): void{
    axios
        .get(`http://localhost:8080/api/user/all`)
        .then(res => {
          console.log(res.data)
          const users: {label: string, value: string}[] = []
          res.data.data.map((user: any) => {
            users.push({
              label: user.firstName + ' ' + user.lastName,
              value: user._id
            })
          })
          setUsers(users)
        })
        .catch(e => {
          console.log(e);
        });
  }

  React.useEffect(() => {
      getUsers()
  }, []);

  React.useEffect(() => {
      setFormIsValid(validateForm());
  }, [subject, incidentType, user, priority, deadline]);

  function validateForm(): boolean {
    console.log("subject", subject)
    return (subject &&
      incidentType &&
      user &&
      priority &&
      deadline) ? true : false;
  }

  console.log("render")
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
            </TextField>

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
                onClick={() => window.history.back()}
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
        <Snackbar open={success} message="Incident creation successful" />
        <Snackbar
          open={failure}
          message="Incident creation failed, please try again"
        />
      </Card>
    </Container>
  );
}
