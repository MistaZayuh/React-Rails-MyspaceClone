import React from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, Button, } from "semantic-ui-react";

class PostForm extends React.Component {
  state = { topic: "", body: "", };

  componentDidMount() {
    const { auth: { user, }, match: { params, }, history, location} = this.props
    if (location.pathname !== "/posts/new") {
      axios.get(`/api/users/${user.id}/posts/${params.id}`)
      .then(res => {
          if (user.id !== res.data.user_id) {
            history.push(`/posts`);
          };
          this.setState({ topic: res.data.topic, body: res.data.body, })
        })
        .catch(err => console.log(err))
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { auth: { user: { id, } }, location, history, match } = this.props;
    if (location.pathname === "/posts/new") {
      axios.post(`/api/users/${id}/posts`, this.state)
        .then(() => history.goBack())
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.put(`/api/users/${id}/posts/${match.params.id}`, this.state)
        .then(res => {
          history.goBack()
        })
        .catch(err => {
          console.log(err)
        })
    }
  };

  render() {
    return (
      <div>
        {this.props.location.pathname === "/posts/new" ?
          <Header as="h1" textAlign="center">New Post</Header>
          :
          <Header as="h1" textAlign="center">Edit Post</Header>}
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
        <Link to="/posts">
          <Button color="green">Back</Button>
        </Link>
      </div>
    );
  };
};

const ConnectedPostForm = (props) => (
  <AuthConsumer>
    {auth =>
      <PostForm {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedPostForm;