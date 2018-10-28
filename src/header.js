import React, { Component } from 'react';
import firebase from './firebase';
import './header.css';
import {Nav, NavItem, NavDropdown, MenuItem, Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLogin: true,
        })
      }
    })
  }

  searchSubmit = () => {

  }

  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      window.location = '/login';
    }).catch(function(error) {
      alert('Logout unsuccessful.');
    });
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="home-icon" href="/">UniProj</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.state.isLogin ? (
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#" className="header-tabs">
                <i className="material-icons">add</i>&nbsp;Add Projects
              </NavItem>
            </Nav>
            <Nav>
              <NavItem eventKey={2} href="/consumerMatching" className="header-tabs">
                <i className="material-icons">group_work</i>&nbsp;Matches
              </NavItem>
            </Nav>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>{' '}
              <Button type="submit" onClick={this.searchSubmit()}>Submit</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavDropdown eventKey={3} title="My profile" id="basic-nav-dropdown" className="header-tabs">
                <MenuItem eventKey={3.1} className="dropdown-tabs" href="/profile">View Profile</MenuItem>
                <MenuItem eventKey={3.2} className="dropdown-tabs">My Postings</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3} className="dropdown-signout" onClick={this.handleSignOut}>Sign Out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : ''}
      </Navbar>
    );
  }
}

export default Header;
