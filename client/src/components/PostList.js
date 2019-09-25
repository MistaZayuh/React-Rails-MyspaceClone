import React, { useEffect, useState, } from "react";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Divider, Button, Header, Container, Segment, } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import axios from "axios";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/users/:user_id/posts")
      .then( res => {
        setPosts(res.data)
      })
      .catch( err => {
        console.log(err)
      })
  }, [],
  );

  return(
    <Container>
      <Header as="h1" textAlign="center">All Posts</Header>
      <Link to="/posts/new">
        <Button color="black">New Post</Button>
      </Link>
      { posts.map( post => (
        <Segment key={post.id}>
          <Header as="h3">{ post.topic }</Header>
          <p>{ post.body }</p>
          <Divider />
          <Header as="h6" color="grey">Updated at: {post.updated_at}</Header>
          { post.user_id === props.auth.user.id ? 
            <Link to={`/posts/${post.id}/edit`}>
              <Button color="green">
                Edit
              </Button>
            </Link>
            :
            null }
        </Segment>
      ))}

    </Container>
  );
};

const ConnectedPostList = (props) => (
  <AuthConsumer>
    { auth => (
      <PostList { ...props } auth={auth} />
    )}
  </AuthConsumer>
)
export default ConnectedPostList;