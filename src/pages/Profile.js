import React, { Component } from 'react';
import { Grid, Row, Col, Image, Label } from 'react-bootstrap';
import firebase from './../firebase';
import Header from './../header';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.labelDesign = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

    this.classStandingDict = {
      hsFreshman: 'High School Freshman',
      hsSophomore: 'High School Sophomore',
      hsJunior: 'High School Junior',
      hsSenior: 'High School Senior',
      colFreshman: 'College Freshman',
      colSophomore: 'College Sophomore',
      colJunior: 'College Junior',
      colSenior: 'College Senior',
      colGrad: 'College Graduate Student',
    }

    this.state = {
      user: {
        interests: [],
        skills: []
      },
    }
  }

  componentWillMount() {
    let userProfile = {};
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          userProfile = snapshot.val();
          that.setState({
            user: userProfile,
            isLogin: true,
          })
        });
      } else {
        window.location = '/login';
      }
    })
  }

  handlePPEdit() {

  }

  render() {
    let name = '';
    if (this.state.user.firstName) {
      name = `${this.state.user.firstName} ${this.state.user.lastName}`;
    }

    const interests = this.state.user.interests.map(data => {
      const style = this.labelDesign[data.charCodeAt(0) % this.labelDesign.length];
      return (
        <Label bsStyle={style}>{data}</Label>
      )
    })

    const skills = this.state.user.skills.map(data => {
      const style = this.labelDesign[data.charCodeAt(0) % this.labelDesign.length];
      return (
        <Label bsStyle={style}>{data}</Label>
      )
    })

    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <Image
                src={`${process.env.PUBLIC_URL}/person_placeholder.png`}
                className="profile-picture"
                circle
              />
              <div className="pp-edit" onClick={this.handlePPEdit}>
                <p>Click here to edit profile picture</p>
              </div>
            </Col>
            <Col xs={5} md={8} xsOffset={1} mdOffset={1} className="profile-bio">
              <div>
                <h1>{name}</h1>
                <hr />
              </div>
              <textarea
                value={this.state.user.biography}
                placeholder="Short bio"
                readOnly
              />
              <div className="contact-info">
                <i className="material-icons">email</i>
                <p><a href={`mailto:${this.state.user.email}`}>{this.state.user.email}</a></p>
              </div>
              <div className="contact-info">
                <i className="material-icons">contact_phone</i>
                <p>{this.state.user.phoneNumber}</p>
              </div>
              <div className="contact-info">
                <i className="material-icons">school</i>
                <p>{this.state.user.schoolName}</p>
              </div>
              <div className="contact-info">
                <i className="material-icons">school</i>
                <p>{this.classStandingDict[this.state.user.classStanding]}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <h2>Interests</h2>
            <div>
              {interests}
            </div>
          </Row>
          <Row>
            <h2>Skills</h2>
            <div>
              {skills}
            </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Profile;
