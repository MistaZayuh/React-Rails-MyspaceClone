import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Header, Segment, Divider, Button, Container, Card, Image, } from "semantic-ui-react";

const UserView = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const { match: { params, }, } = props

  useEffect(() => {
    axios.get(`/api/users/${params.id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`/api/users/${params.id}/posts`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, [],
  );

  const addFriend = (e) => {
    debugger
  };

  return (
    <Container display="flex">
      <Header as="h1" textAlign="center">{user.nickname}</Header>
      <Container>
        {props.auth.user.id === +params.id ?
          <Link to={`/users/${user.id}/edit`}>
            <Button color="green">
              Edit Profile
            </Button>
          </Link>
          :
          null
        }
          <Button onClick={addFriend} color="orange">
            Add Friend
          </Button>
        <Segment>
          
        </Segment>
        <Card>
          <Image src={user.image} />
          <Card.Content>
            <Card.Header>
              {user.name}
            </Card.Header>
            <Card.Meta>
              {user.email}
            </Card.Meta>
          </Card.Content>
          <Divider />
          <Card.Meta>
            Joined: {user.created_at}
          </Card.Meta>
        </Card>
      </Container>
      <Container>
        <Header textAlign="center" as="h2">{user.nickname}'s posts</Header>
        {posts.filter(post => post.user_id === +props.match.params.id).map(post => (
          <Segment key={post.id}>
            <Header as="h3">
              {post.topic}
            </Header>
            <Container>
              {post.body}
            </Container>
            <Divider />
            {post.user_id === props.auth.user.id ?
              <Link to={`/posts/${post.id}/edit`}>
                <Button color="green">
                  Edit
              </Button>
              </Link>
              :
              null}
          </Segment>
        )
        )}
      </Container>
    </Container>
  );
};

const ConnectedUserView = (props) => (
  <AuthConsumer>
    {auth => (
      <UserView {...props} auth={auth} />
    )}
  </AuthConsumer>
);

export default ConnectedUserView;