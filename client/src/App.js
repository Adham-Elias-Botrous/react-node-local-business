import React from 'react';
import FeedBack from './FeedBack';
import Home from './Home';
import About from './About';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/feedback" component={FeedBack} />

      <div className="p-5"></div>
    </BrowserRouter>
  );
};

export default App;
