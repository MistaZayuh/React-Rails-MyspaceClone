import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { Container, Divider, Header, Card, Image, Button, } from "semantic-ui-react";
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
      <Card.Group itemsPerRow={4}>

      {users.map(user => (
        <Card key={user.id}>
          <Image src={user.image} />
          <Card.Header textAlign="center" as="h3">{user.nickname}</Card.Header>
          <Card.Content>
            <Header as="h5">{user.name}</Header>
          </Card.Content>
          <Card.Meta>
            <Header as="h6" color="grey">Email: {user.email}</Header>
            <Link to={`/users/${user.id}`}>
              <Button color="blue">
                View Profile
                </Button>
            </Link>
          </Card.Meta>
        </Card>
      ))}
      </Card.Group>
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