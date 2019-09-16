import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Header from './components/html/header';
import Footer from './components/html/footer';
import PostRoutes from './components/Routes/PostRoutes';
import AuthRoutes from './components/Routes/AuthRoutes';
import UserRoutes from './components/Routes/UserRoutes';
class App extends Component {
  render() {
    return (
      <Router>
          <React.StrictMode>
            <Header />
              <main role="main" className="container main">

                <PostRoutes />
                <UserRoutes />
                <AuthRoutes />
                  {/*
                <Route path="/" exact component={Home} />
            
              
               
            
                  */}
            
              </main>
            <Footer />
          </React.StrictMode>
        </Router>
    );
  }
}

export default App;
