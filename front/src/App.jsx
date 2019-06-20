import React from 'react';
import { Redirect } from 'react-router';
import { Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Flex } from '@rebass/grid';
import { map, values } from 'ramda';
import { createBrowserHistory } from 'history';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Home, Container, Container2, Login, Request } from './containers';
import { ErrorBoundary, PageHeader, PageFooter } from './components';
import './App.css';
import { colors, sizes, routes } from './common';
import { UserContext } from './user-context';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: .625rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
                  'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  input, textarea, select, button {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
                  'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: ${colors.white};
  }

  #root {
    height: 100%;
    min-width: 270px;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  
  :focus {
    outline: ${colors.blue20} auto 5px;
  }
`;

const history = createBrowserHistory();

const theme = {
  breakpoints: map(item => `${item}em`, values(sizes)),
};

const muiTheme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: colors.blue80,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
  typography: {
    useNextVariants: true,
    htmlFontSize: 10,
    fontSize: 12,
  },
  overrides: {
    MuiOutlinedInput: {
      root: { background: colors.gray10, boxSizing: 'border-box', borderRadius: 4 },
    },
    MuiIconButton: {
      root: { padding: 0, color: colors.gray70 },
    },
    MuiSvgIcon: {
      root: { color: colors.gray70 },
    },
  },
});

history.listen((location, action) =>
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (action === 'POP' || action === 'PUSH' || (location.state && location.state.noScroll)) {
      return;
    }

    // In all other cases, scroll to top
    window.scrollTo(0, 0);
  }),
);

const AppWrapper = styled.div`
  height: 100%;
`;

const LoginRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ role }) => (
      <Route
        {...rest}
        render={props =>
          role === 'USER' || role === 'EMPLOYEE' || role === 'MANAGER' || role === 'DIRECTOR' ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )}
  </UserContext.Consumer>
);

const UserRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ role }) => (
      <Route {...rest} render={props => (role === 'USER' ? <Component {...props} /> : <Redirect to="/" />)} />
    )}
  </UserContext.Consumer>
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ role }) => (
      <Route {...rest} render={props => (role === 'ADMIN' ? <Component {...props} /> : <Redirect to="/" />)} />
    )}
  </UserContext.Consumer>
);

const EmployeeRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ role }) => (
      <Route {...rest} render={props => (role === 'EMPLOYEE' ? <Component {...props} /> : <Redirect to="/" />)} />
    )}
  </UserContext.Consumer>
);

const ManagerRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ role }) => (
      <Route {...rest} render={props => (role === 'MANAGER' ? <Component {...props} /> : <Redirect to="/" />)} />
    )}
  </UserContext.Consumer>
);

const DirectorRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ role }) => (
      <Route {...rest} render={props => (role === 'DIRECTOR' ? <Component {...props} /> : <Redirect to="/" />)} />
    )}
  </UserContext.Consumer>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Correct authorization
    this.authorize = (username, role) => {
      this.setState(() => ({
        username: username,
        role: role,
      }));
    };

    this.state = {
      username: '',
      role: '',
      authorize: this.authorize,
    };
  }

  render() {
    return (
      <AppWrapper>
        <GlobalStyle whiteColor />
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={this.state}>
            <MuiThemeProvider theme={muiTheme}>
              <Router history={history}>
                <Flex as={AppWrapper} flexDirection="column" m="0 auto">
                  <PageHeader history={history} />
                  <Flex flex="1 0 auto" flexDirection="column">
                    <ErrorBoundary>
                      <Switch>
                        <Route path={routes.login} component={Login} />}
                        <EmployeeRoute path={routes.request} component={Request} />
                        <UserRoute path={routes.container} component={Container} />
                        <AdminRoute path={routes.container2} component={Container2} />
                        <LoginRoute path={routes.base} component={Home} />
                        {/*/!* TODO: <Route path='*' component={NotFoundComponent} />*!/*/}
                        <Redirect to={routes.base} />
                      </Switch>
                    </ErrorBoundary>
                  </Flex>
                  {/*<PageFooter />*/}
                </Flex>
              </Router>
            </MuiThemeProvider>
          </UserContext.Provider>
        </ThemeProvider>
      </AppWrapper>
    );
  }
}

export default App;
