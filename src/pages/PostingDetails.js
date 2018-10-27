import React, { Component } from 'react';
import Header from './../header';
import firebase from './../firebase';
import PostingDetailsCSS from './PostingDetails.css';
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
        <Grid className = "posting-title-section">
          <h1 className = "title-text">Welcome, {this.state.user.name}!</h1>
          <h2 className = "title-secondary">
            A project/opportunity for you is a few clicks away!
          </h2>
        </Grid>
        <div className = "browse-projects-section">
          <Col xs={10} md={5}>
            <Panel className = "browse-location-title">
              <Panel.Heading className = "project-title">Projects in {this.state.user.location} </Panel.Heading>
              <ListGroup>
                <ListGroupItem header="Front-End Developer Opportunity">Student Government Association - Atlanta, GA</ListGroupItem>
                <ListGroupItem header="Open Hand Volunteer Opportunity" href="#">
                  OpenHand Atlanta - Sandy Springs, GA
                </ListGroupItem>
                <ListGroupItem header="Food Bank needs your help!" bsStyle="danger">
                  Food Bank Atlanta - Doraville, GA
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
            <Row className = "browse-location-list">
              
            </Row>
          </Col>
          <Col xsOffset={1} xs={10} md={5}>
            <Panel className="browse-location-interests">
              <Panel.Heading className="project-title">Projects using {this.state.user.topSkill} </Panel.Heading>
              <ListGroup>
                <ListGroupItem header="Back-End Developer Opportunity">Engineering Without Borders - Athens, GA</ListGroupItem>
                <ListGroupItem header="Back-End Remote work needed!" href="#">
                  Abedi Aba - Remote
                </ListGroupItem>
                <ListGroupItem header="Need database design help!" bsStyle="danger">
                  Link - Remote
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
