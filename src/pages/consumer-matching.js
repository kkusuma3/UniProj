import React, { Component } from 'react';
import Header from './../header';
import firebase from './../firebase';
import consumerMatch from './consumer-matching.css';
import {Jumbotron, Grid, Row, Col, Clearfix, Panel, PanelGroup, Accordion, ListGroup, ListGroupItem, Pager} from 'react-bootstrap';

class Home extends Component {
  constructor() {
    super();

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
          <h1 className = "title-text">My Applications</h1>
        </div>
        <div className = "browse-projects-section">
          <Col xs={12}>
            <Panel className = "browse-location-title">
              <Panel.Heading className = "project-title">Projects in {this.state.user.location} </Panel.Heading>
              <ListGroup>
                <ListGroupItem className="list-project">
                  <Col xs={4} md={3} lg={2}>
                    <img src={`${process.env.PUBLIC_URL}/SGA.png`} className="image-float"/> 
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
                    <img src={`${process.env.PUBLIC_URL}/SGA.png`} className="image-float"/> 
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
                    <img src={`${process.env.PUBLIC_URL}/SGA.png`} className="image-float"/> 
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
        </div>
      </div>
    );
  }
}

export default Home;
