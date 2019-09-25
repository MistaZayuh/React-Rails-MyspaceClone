import React from 'react';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import PostView from "./components/PostView";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import UserView from "./components/UserView";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Switch, Route, } from "react-router-dom";
import { Container, } from "semantic-ui-react";
import FetchUser from './components/FetchUser';

const App = () => (
  <>
    <Navbar />
    <FetchUser>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/posts" component={PostList} />
          <ProtectedRoute exact path="/posts/new" component={PostForm} />
          <ProtectedRoute exact path="/posts/:id" component={PostView} />
          <ProtectedRoute exact path="/posts/:id/edit" component={PostForm} />
          <ProtectedRoute exact path="/users" component={UserList} />
          <ProtectedRoute exact path="/users/:id" component={UserView} />
          <ProtectedRoute exact path="/users/:id/edit" component={UserForm} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
);

export default App;
