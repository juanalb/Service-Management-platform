import React, { useState } from "react";
import {
  Container,
  Button,
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import { userColumns } from "../datatable/DataTable-constants";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import {userAPI} from "../../api/UserAPI";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    setAllUsers();
  }, []);

  function setAllUsers(){
      userAPI.getAllUsers().then(res => {
          setUsers(res.data.data)
      }).catch(e => {
          console.log(e)
      })
  }
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
