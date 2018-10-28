import React, { Component } from 'react';
import Header from './../header';
import firebase from './../firebase';
import PostingDetailsCSS from './PostingDetails.css';
import {Label, Jumbotron, Grid, Row, Col, Clearfix, Panel, PanelGroup, Accordion, ListGroup, ListGroupItem, Pager, Button} from 'react-bootstrap';

const postingTitle = 'Front-End Developer Opportunity available!';
const postingPoster = 'Student Government Association';
const postingLocation = 'Athens, GA';
const postingDueDate = 'Dec 28, 2018';


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
          <Col xs={12} md={4} lg ={2}>
            <img src={`${process.env.PUBLIC_URL}/SGA.png`} className="posting-image"></img>
          </Col>
          <Col xs={12} md={8} lg={10}>
            <Row>
              <h1 className = "posting-title">{postingTitle}</h1>
            </Row>
            <Row>
              <p className = "posting-poster">{postingPoster} - {postingLocation}</p>
            </Row>
            <Row>
              <p className = "posting-dueDate">Due on {postingDueDate}</p>
            </Row>
          </Col>
        </Grid>
        <Grid className = "posting-body-section">
          <Row>
            <p className = "posting-text">Desired Skills:</p>
          </Row>
          <Row>
            <Label bsStyle="default posting-skills">HTML</Label>{' '}
            <Label bsStyle="primary posting-skills">CSS</Label>{' '}
            <Label bsStyle="warning posting-skills">Front-End</Label>{' '}
            <Label bsStyle="danger posting-skills">XML</Label>
          </Row>
          <Row>
            <p className = "posting-text">Project Length:</p>
          </Row>
          <Row>
            <p className = "posting-subtext"> 3 Months </p>
          </Row>
          <Row>
            <p className = "posting-text">Project Description:</p>
          </Row>
          <Row>
            <p className = "posting-subtext">Looking for high school student to fulfill over front-end development role starting {postingDueDate} </p>
          </Row>
          <Row className="button-apply">
            <Button bsStyle="success" bsSize="large"> <i class="material-icons">add</i>&nbsp; Apply</Button>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
