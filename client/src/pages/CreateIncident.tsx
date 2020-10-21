import React from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";
import axios from "axios";

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

export function CreateIncident(props: ICreateIncident) {
  const [subject, setSubject] = React.useState("");
  const [incidentType, setIncidentType] = React.useState("Software");
  const [user, setUser] = React.useState("Juan");
  const [priority, setPriority] = React.useState("Normal");
  const [deadline, setDeadline] = React.useState("7");
  const [description, setDescription] = React.useState("");

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
        console.log(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <form autoComplete="on">
        {/* SUBJECT */}
        <TextField required id="subject" label="Subject" value={subject} onChange={handleChangeSubject} />

        {/* TYPE OF INCIDENT*/}
        <TextField
          id="type"
          select
          required
          label="Type of incident"
          value={incidentType}
          onChange={handleChangeIncident}
          helperText="Please select your currency"
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
          required
          label="Description"
          multiline
          rows={6}
          value={description}
          onChange={handleChangeDescription}
        />
        <Button color="secondary" variant="outlined" onClick={() => window.history.back()}>
          CANCEL
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit()}
          disableElevation
        >
          SUBMIT TICKET
        </Button>
      </form>
    </>
  );
}
