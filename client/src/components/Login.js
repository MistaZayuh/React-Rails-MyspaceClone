import React from "react";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, Segment } from "semantic-ui-react";

class Login extends React.Component {
  state = { email: "", password: "", }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, } = this.state;
    const { auth: { handleLogin }, history} = this.props
    handleLogin({ email, password, }, history);
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };


  render() {
    return (
      <Segment>
        <Header as="h1" textAlign="center">Login</Header>
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
            <Form.Button color="purple">Submit</Form.Button>
          </Form>
      </Segment>
        );
      };
    };

const ConnectedLogin = (props) => (
  <AuthConsumer>
    { auth => <Login {...props} auth={auth} /> }
  </AuthConsumer>
) 


export default ConnectedLogin;