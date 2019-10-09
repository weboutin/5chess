import React from 'react';
import Header from './components/header';
import Chessboard from './components/chessboard';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Route path="/" exact component={Chessboard} />
      </Router>
    </div>
  );
}

export default App;
