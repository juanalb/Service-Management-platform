import React, { useState } from "react";
import {
  Container,
  Button,
  TextField
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import { userColumns } from "../datatable/DataTable-constants";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import {userAPI} from "../../api/UserAPI";
import {IUser} from "../../../../server/lib/modules/user/model";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [shownUsers, setShownUsers] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState<string>();


  React.useEffect(() => {
      userAPI.getAllUsers().then(res => {
          setUsers(res.data.data)
          setShownUsers(res.data.data);
      });
  }, []);

  React.useEffect(() => {
      if(searchPrompt === ''){
          setShownUsers(users);
          return;
      }

      const filteredUsers = filterUsers();
      setShownUsers(filteredUsers);
  }, [searchPrompt]);

  function filterUsers() {
      if(!searchPrompt){
          return [];
      }

      return users.filter((user: IUser) => {
          const searchString = searchPrompt.toLowerCase().replace(/\s+/g, ''); // removes all whitespace
          const userInfo = user.fullName + user.email;

          return userInfo.includes(searchString);
      })
  }

  const handleSearchTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchPrompt(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Link to="/create-user">
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Create User
        </Button>
      </Link>
      <TextField id="user-search" label="Search user by name or mail" onChange={handleSearchTextFieldChange} />
      <DataTable
        columns={userColumns}
        data={shownUsers}
        loading={users.length === 0}
      />
    </Container>
  );
}
