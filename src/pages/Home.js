import React, { Component } from 'react';
import Header from './../header';
import firebase from './../firebase';
import './Home.css';
import {Row, Col, Panel, ListGroup, ListGroupItem, Pager, Label, Image} from 'react-bootstrap';

class Home extends Component {
  constructor() {
    super();

    this.labelDesign = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

    this.state = {
      user: '',
      isLogin: false,
    }
  }

  componentWillMount() {
    let userProfile = {};
    let that = this;
    firebase.auth().onAuthStateChanged(user => {
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

  render() {
    let name = '';
    if (this.state.user.firstName) {
      name = `${this.state.user.firstName} ${this.state.user.lastName}`;
    }

    return (
      <div>
        <Header />
        <div className = "home-title-section">
          <h1 className = "title-text">Welcome, {name}!</h1>
          <h2 className = "title-secondary">
            A project/opportunity for you is a few clicks away!
          </h2>
        </div>
        <div className = "browse-projects-section">
          <Col xs={10} md={5}>
            <Panel className = "browse-location-title">
              <Panel.Heading className = "project-title">
                Projects in Atlanta, GA
                <i className="material-icons locate-me">location_on</i>
              </Panel.Heading>
              <ListGroup>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/SGA.png`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Front-End Developer Opportunity</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Student Government Association - Atlanta, GA</p>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/open_hand.jpg`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Open-Hand volunteer opportunity needed!</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Open Hand Atlanta - Midtown Atlanta, GA</p>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="list-project" bsStyle="danger">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/food_bank.png`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">General volunteer opportunity needed!</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Food Bank Atlanta - Doraville, GA</p>
                  </Row>
                </ListGroupItem>
                <Pager className="pager">
                  <Pager.Item previous href="#">
                    &larr; Previous Page
                  </Pager.Item>
                  <Pager.Item href="#" className="browse-button">
                    Browse more opportunities ...
                  </Pager.Item>
                  <Pager.Item next href="#">
                    Next Page &rarr;
                  </Pager.Item>
                </Pager>
              </ListGroup>
            </Panel>
          </Col>
          <Col xsOffset={1} xs={10} md={5}>
            <Panel className = "browse-location-interests">
              <Panel.Heading className = "project-title">
                Projects related to
                <Label bsStyle={this.labelDesign['Backend Development'.charCodeAt(0) % 6]} className='top-skill'>
                  Backend Development
                </Label>
              </Panel.Heading>
              <ListGroup>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/ewb.jpg`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Back-End Developer Opportunity</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Engineering Without Borders - Athens, GA</p>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/swe.png`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Back-End Remote work needed!</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Society of Women Engineers</p>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="list-project" bsStyle="danger">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/eevm.png`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Need database design help!</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">EEVM Emory - Remote</p>
                  </Row>
                </ListGroupItem>
                <Pager className="pager">
                  <Pager.Item previous href="#">
                    &larr; Previous Page
                  </Pager.Item>
                  <Pager.Item href="#" className="browse-button">
                    Browse more opportunities ...
                  </Pager.Item>
                  <Pager.Item next href="#">
                    Next Page &rarr;
                  </Pager.Item>
                </Pager>
              </ListGroup>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }
}

export default Home;
