import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
