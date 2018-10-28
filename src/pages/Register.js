import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import Header from './../header';
import firebase from './../firebase';
import CreatableInputOnly from './../CreatableSelect';
import './Register.css';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      classStanding: '',
      phoneNumber: '0000000000',
      schoolName: '',
      password: '',
      confirmPassword: '',
      interests: [],
      skills: [],
      biography: '',
    }
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      window.location = '/';
    }
  }

  onInputChange = (e) => {
    const key = e.target.id;
    let term = e.target.value;
    this.setState({ [key]: term });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const status = [this.passwordValidation(), this.confirmPasswordValidation(), this.biographyValidation()];
    if (!status.includes('error')) {
      firebase.auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      ).then(user => {
        if (user) {
          const currentUser = firebase.auth().currentUser;
          this.writeUserData(currentUser.uid);
        }

      }).catch(error => {
        console.log(error.message);
        alert('Failed when creating account. Please try again later.');
      })
    }
  }

  writeUserData = (userId) => {
    const skills = this.state.skills.map(d => d.label);
    const interests = this.state.interests.map(d => d.label);
    firebase.database().ref('users/' + userId).set({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      classStanding: this.state.classStanding,
      phoneNumber: this.state.phoneNumber,
      schoolName: this.state.schoolName,
      skills: skills,
      interests: interests,
      biography: this.state.biography,
    }).then(() => {
      window.location = '/';
    });
  }

  passwordValidation = () => {
    if (this.state.password.length === 0) {
      return null;
    } else if (this.state.password.length < 8) {
      return 'error';
    } else {
      return null;
    }
  }

  confirmPasswordValidation = () => {
    if (this.state.confirmPassword.length === 0) {
      return null;
    } else if (this.state.password === this.state.confirmPassword) {
      return null;
    } else {
      return 'error';
    }
  }

  biographyValidation = () => {
    if (this.state.biography.split(' ').length < 100) {
      return null;
    } else {
      return 'error';
    }
  }

  updateSkills = (skills) => {
    this.setState({ skills });
  }

  updateInterests = (interests) => {
    this.setState({ interests });
  }

  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={10} md={10} xsOffset={1} mdOffset={1}>
              <h2>Create a new account</h2>
              <Form id="create-new-team" className="cool-form" onSubmit={e => this.handleSubmit(e)}>
                <FormGroup controlId="firstName">
                  <FormControl
                    type="text"
                    placeholder="First name"
                    onChange={event => this.onInputChange(event)}
                    required
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="lastName">
                  <FormControl
                    type="text"
                    placeholder="Last name"
                    onChange={event => this.onInputChange(event)}
                    required
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="email">
                  <FormControl
                    type="email"
                    placeholder="Email"
                    onChange={event => this.onInputChange(event)}
                    required
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="password"
                  validationState={this.passwordValidation()}
                >
                  <FormControl
                    type="password"
                    placeholder="Password"
                    onChange={event => this.onInputChange(event)}
                    required
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Password has to contain at least 8 characters.</HelpBlock>
                </FormGroup>
                <FormGroup controlId="confirmPassword"
                  validationState={this.confirmPasswordValidation()}
                >
                  <FormControl
                    type="password"
                    placeholder="Confirm password"
                    onChange={event => this.onInputChange(event)}
                    required
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="phoneNumber">
                  <FormControl
                    type="tel"
                    placeholder="Phone (number only)"
                    onChange={event => this.onInputChange(event)}
                    pattern="[0-9]{10}"
                    required
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="schoolName">
                  <FormControl
                    type="text"
                    placeholder="School name"
                    onChange={event => this.onInputChange(event)}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="classStanding">
                  <FormControl
                    componentClass="select"
                    placeholder="hsFreshman"
                    onChange={event => this.onInputChange(event)}
                  required>
                    <option value="hsFreshman">High School Freshman</option>
                    <option value="hsSophomore">High School Sophomore</option>
                    <option value="hsJunior">High School Junior</option>
                    <option value="hsSenior">High School Senior</option>
                    <option value="colFreshman">College Freshman</option>
                    <option value="colSophomore">College Sophomore</option>
                    <option value="colJunior">College Junior</option>
                    <option value="colSenior">College Senior</option>
                    <option value="colGrad">College Graduate Student</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="skills">
                  <CreatableInputOnly
                    placeholder="Enter your skills and press enter..."
                    handleChange={this.updateSkills}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="interests">
                  <CreatableInputOnly
                    placeholder="Enter your interests and press enter..."
                    handleChange={this.updateInterests}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="biography" validationState={this.biographyValidation()}>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Short biography (max 100 words)"
                    onChange={event => this.onInputChange(event)}
                    rows={3}
                    required
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <Button type="submit">Create account</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Register;
