import React from "react";
import axios from "axios";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, } from "semantic-ui-react";

class PostForm extends React.Component {
  state = { topic: "", body: "", };

  componentDidMount() {
    if (this.props.location.pathname !== "/posts/new") {
      axios.get(`/api/users/${this.props.auth.user.id}/posts/${this.props.match.params.id}`)
        .then( res => {
          this.setState({ topic: res.data.topic, body: res.data.body, })
        })
        .catch( err => console.log(err) )
    }
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { auth: {user: { id, }}, location, history, match} = this.props;
    if (location.pathname === "/posts/new") {
      axios.post(`/api/users/${id}/posts`, this.state)
        .then( () => history.goBack() )
        .catch( err => {
          console.log(err)
        })
    } else {
      debugger
      axios.put(`/api/users/${id}/posts/${match.params.id}`, this.state)
        .then( res => {
          history.goBack()} )
        .catch( err => {
          console.log(err)
        })
    }
  };

  render() {
    return (
      <div>
        { this.props.location.pathname === "/posts/new" ? 
        <Header as="h1" textAlign="center">New Post</Header> 
        : 
        <Header as="h1" textAlign="center">Edit Post</Header> }
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Topic"
            name="topic"
            placeholder="Topic"
            required
            onChange={this.handleChange}
            value={this.state.topic}
          />
          <Form.TextArea
            label="Body"
            name="body"
            placeholder="Body"
            required
            onChange={this.handleChange}
            value={this.state.body}
          />
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    );
  };
};

const ConnectedPostForm = (props) => (
  <AuthConsumer>
    { auth => 
    <PostForm { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedPostForm;