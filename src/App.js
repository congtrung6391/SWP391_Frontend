import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import history from './BrowserHistory';
import UserRoute from './router/UserRoute';
import AdministratorRoute from './router/AdministratorRoute';
import { LanguageWrapper } from './context/language.context';
import ThemeWrapper from './context/theme.context';
import Footer from './components/common/Footer';
import Page404 from './components/common/404';
import AuthenticationProvider from './context/authentication.context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasError: false,
    };
  }

  render() {
    return (
      <ThemeWrapper>
        <LanguageWrapper>
          <AuthenticationProvider>
            <Router history={history}>
              <Header />
              <Switch>
                <Route path="/admin" component={AdministratorRoute} />
                <Route path="/" component={UserRoute} />
                <Route component={Page404} />
              </Switch>
              <Footer />
            </Router>
          </AuthenticationProvider>
        </LanguageWrapper>
      </ThemeWrapper>
    );
  }
}

export default App;
