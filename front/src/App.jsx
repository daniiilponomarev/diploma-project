import React, { StrictMode } from 'react';
import { Redirect } from 'react-router';
import { Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
// import styled, { ThemeProvider } from 'styled-components'
import { Flex } from '@rebass/grid';
import { map, values } from 'ramda';
import { createBrowserHistory } from 'history';

import { Container, Container2, Login } from './containers';
import { ErrorBoundary, PageHeader, PageFooter } from './components';
import './App.css';
import { colors, sizes, routes } from './common';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: .625rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
                  'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  input, textarea, select, button {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
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

let isAuthorized = false;

const theme = {
  breakpoints: map(item => `${item}em`, values(sizes)),
};

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

const App = () => (
  <StrictMode>
    <GlobalStyle whiteColor />
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Flex as={AppWrapper} flexDirection="column" m="0 auto">
          <PageHeader />
          <Flex mt="7rem" flex="1 0 auto" flexDirection="column">
            <ErrorBoundary>
              <Switch>
                {!isAuthorized && <Route path={routes.login} component={Login} />}
                {!isAuthorized && <Route path={routes.container} component={Container} />}
                {!isAuthorized && <Route path={routes.container2} component={Container2} />}
                {!isAuthorized && <Route path={routes.base} component={Container} />}
                {/* TODO: <Route path='*' component={NotFoundComponent} />*/}
                {/*<Redirect to={routes.base} />*/}
              </Switch>
            </ErrorBoundary>
          </Flex>
          <PageFooter />
        </Flex>
      </Router>
    </ThemeProvider>
  </StrictMode>
);

export default App;
