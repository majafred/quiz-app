import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Start from './containers/Start';
import Quiz from './containers/Quiz';
import './app.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<Start />} />
            <Route exact path='/quiz' element={<Quiz />} />
          </Routes>
        </Fragment>
      </Router>
    </div >
  );
}

export default App;
