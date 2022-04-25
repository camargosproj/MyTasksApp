import React, {Fragment, useState } from 'react';
import "./styles/App.css";
// Components 
import InputTodo from './components/InputTask';
import ListTodo from './components/ListTask';
import Header from './components/Header';
import ToggleButton from './components/ToggleButton';
import Footer from './components/Footer';



const App = () => {
    const [isdark, setIsdark] = useState(false);
    return (
      <Fragment>
        <ToggleButton setMode={() =>setIsdark(!isdark)} isDark={isdark}/>
            {isdark ?
              (<div id="dark-mode" className="container">
              <Header setMode={isdark}/>
              <InputTodo />
              <ListTodo />
            </div>) :
            (<div className="container">
            <Header setMode={isdark}/>
            <InputTodo />
            <ListTodo />
          </div>)
          }
          <Footer/>
      </Fragment>
    );
}

export default App;
