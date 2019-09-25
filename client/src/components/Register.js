import React from "react";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, } from "semantic-ui-react";

class Register extends React.Component {
  state = { email: "", password: "", passwordConfirmation: "", };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;

    if (password === passwordConfirmation)
      handleRegister({ email, password, passwordConfirmation, }, history);
    else
      alert("Passwords Don't Match")
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  render() {
    return (
      <>
        <Header as="h1" textAlign="center">Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Email"
            placeholder="Email"
            required
            autoFocus
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password"
            required
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            placeholder="Password Confirmation"
            required
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
          <Form.Button color="purple">Submit</Form.Button>
        </Form>
      </>
    );
  };
};

const ConnectedRegister = (props) => (
  <AuthConsumer>
    { auth => <Register {...props} auth={auth} /> }
  </AuthConsumer>
);


export default ConnectedRegister;