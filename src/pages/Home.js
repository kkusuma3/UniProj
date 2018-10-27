import React, { Component } from 'react';
import Header from './../header';
import firebase from './../firebase';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLogin: false,
    }
  }

  componentWillMount() {
    // firebase.auth().signInWithEmailAndPassword('admin@test.com', 'admin1')
    //   .then(user => {
    //     this.setState({
    //       user,
    //       isLogin: true,
    //     })
    //   })
    //   .catch(error => console.log(error.message));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
          isLogin: true,
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
      </div>
    )
  }
}

export default Home;
