import React, { Component } from 'react';
import Header from './../header';
import firebase from './../firebase';
import HomeCSS from './Home.css';
import {Image, Label, Grid, Row, Col, Clearfix, Panel, PanelGroup, Accordion, ListGroup, ListGroupItem, Pager} from 'react-bootstrap';

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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
          isLogin: false,
        })
      } else {
        // window.location = 'loginPage';
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className = "home-title-section">
          <h1 className = "title-text">Project Matching</h1>
        </div>
        <div className = "browse-projects-section">
          <Col xs={10} md={5}>
            <Panel className = "browse-location-title">
              <Panel.Heading className = "project-title">
                Project(s) I applied to:
              </Panel.Heading>
              <ListGroup>
                <ListGroupItem className="list-project" bsStyle="success">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/SGA.png`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Front-End Developer Opportunity - SGA </p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Your application has been received! <i class="material-icons">done</i> </p>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="list-project" bsStyle="danger">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/stephen.jpg`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">Voluntary mathematics tutor needed! - Stephen A</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Your Application has been declined! <i class="material-icons">close</i></p>
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
                Applications received for my project(s):
              </Panel.Heading>
              <ListGroup>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/kevin.jpg`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">RE: Back-End Developer Opportunity</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Kevin Kusuma - High School Freshman in Atlanta, GA</p>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <Image src={`${process.env.PUBLIC_URL}/melvin.JPG`} className="image-float"/>
                  </Col>
                  <Row>
                    <p className = "project-header">RE: Back-End Remote work needed!</p>
                  </Row>
                  <Row>
                    <p className = "project-secondary">Melvin Juwono - College Sophomore in Athens, GA</p>
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
