import React from "react";
import axios from "axios";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, } from "semantic-ui-react";

class UserForm extends React.Component {
  state = { name: "", nickname: "", };

  componentDidMount() {
    axios.get(`/api/users/${this.props.auth.user.id}`)
      .then(res => {
        this.setState({ name: res.data.name, nickname: res.data.nickname, })
      })
      .catch(err => console.log(err))
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { auth: { user: { id, } }, history, } = this.props;
    debugger;
    axios.put(`/api/users/${id}`, this.state)
      .then(res => {
        history.goBack()
      })
      .catch(err => {
        console.log(err)
      })
  };

  render() {
    return (
      <div>
        <Header as="h1" textAlign="center">Edit Profile</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Name"
            name="name"
            placeholder="Name"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
          <Form.Input
            label="Nickname"
            name="nickname"
            placeholder="Nickname"
            required
            onChange={this.handleChange}
            value={this.state.nickname}
          />
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    );
  };
};

const ConnectedUserForm = (props) => (
  <AuthConsumer>
    {auth =>
      <UserForm {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedUserForm;