import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { Container, Divider, Header, Card, Segment, Button, } from "semantic-ui-react";
import { AuthConsumer } from "../providers/AuthProvider";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [],
  );

  return (
    <Container>
      <Header as="h1" textAlign="center">All Users</Header>
      {users.map(user => (
        <Segment key={user.id}>
          <Header as="h3">{user.name}</Header>
          <Divider />
          <Header as="h6" color="grey">Email: {user.email}</Header>
          <Link to={`/users/${user.id}`}>
            <Button color="blue">
              View Profile
              </Button>
          </Link>
        </Segment>
      ))}

    </Container>
  );
};

const ConnectedUserList = (props) => (
  <AuthConsumer>
    { auth => (
      <UserList {...props } auth={auth} />
    )}
  </AuthConsumer>

);

export default ConnectedUserList;