import React, { useState } from "react";
import {
  Container,
  Button,
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import { userColumns } from "../datatable/DataTable-constants";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const token = "60049aa7d1e8cb22e8606daa";

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/all`, {
        headers: {
          'x-access-token': token
        }
      })
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Link to="/create-user">
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Create User
        </Button>
      </Link>
      <DataTable
        columns={userColumns}
        data={users}
        loading={users ? users.length <= 0 : true}
      />
    </Container>
  );
}
