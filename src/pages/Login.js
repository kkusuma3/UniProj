import React, { Component } from 'react';
import { Grid, Row, Col, Button, Collapse, Alert } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Header from './../header';
import firebase from './../firebase';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      formHorizontalEmail: '',
      formHorizontalPassword: '',
      showError: false,
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location = '/';
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(
      this.state.formHorizontalEmail,
      this.state.formHorizontalPassword
    ).then(user => {
      window.location = '/';
    }).catch(error => {
      this.setState({
        showError: true,
      })
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <h2>Sign In</h2>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalEmail" onChange={e => this.handleChange(e)}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email"/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" onChange={e => this.handleChange(e)}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password"/>
                  </Col>
                </FormGroup>

                <Col sm={10} smOffset={2} className="login-error">
                  <Collapse in={this.state.showError}>
                    <div>
                      <Alert bsStyle="danger">
                        <p>Email or password not found. Please try again.</p>
                      </Alert>
                    </div>
                  </Collapse>
                </Col>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">Sign in</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>

            <Col md={4} className="register-container">
              <div>
                <h2>Sign Up</h2>
                <p>
                  Doesn't have an account yet? Sign up <a href="/register">here</a>.
                </p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Login;
