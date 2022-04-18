import React, {Fragment, Component } from 'react';
// Components 
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <h1>MyTasks APP</h1>
          <InputTodo />
          <ListTodo />
        </div>
      </Fragment>
    );
  }
}

export default App;
