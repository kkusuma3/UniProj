import React, { Component } from 'react';
import './header.css';
import {Nav, NavItem, NavDropdown, MenuItem, Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="home-icon" href="#home">Brand</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" className="header-tabs">
              <i class="material-icons">add</i>&nbsp;Add Projects
            </NavItem>
          </Nav>
          <Nav>
            <NavItem eventKey={2} href="#" className="header-tabs">
              <i class="material-icons">group_work</i>&nbsp;Matches
            </NavItem>
          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>{' '}
            <Button type="submit" onClick="searchSubmit()">Submit</Button>
          </Navbar.Form>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="My profile" id="basic-nav-dropdown" className="header-tabs"> 
              <MenuItem eventKey={3.1} className="dropdown-tabs">Edit Profile</MenuItem>
              <MenuItem eventKey={3.2} className="dropdown-tabs">My Postings</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} className="dropdown-signout">Sign Out</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
