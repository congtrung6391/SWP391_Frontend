import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import UserRoute from './router/UserRouter';
import AdminRoute from './router/AdminRouter';
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={UserRoute} />
          <Route path="admin" component={AdminRoute} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
