import React, { StrictMode } from 'react'
import { Redirect } from 'react-router'
import { Router, Route, Switch } from 'react-router-dom'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { Flex } from 'grid-styled'
import { map, values } from 'ramda'
import { createBrowserHistory } from 'history'

import { Container, Container2 } from './containers'
import { ErrorBoundary, PageHeader, PageFooter } from './components'
import './App.css'
import { colors, sizes, routes } from './common'

injectGlobal`
  html {
    font-size: .625rem;
    font-family: Tahoma, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: ${colors.white};
  }

  input, textarea, select, button {
    font-family: Tahoma, Arial, sans-serif;
  }

  #root {
    height: 100%;
  }
`

const history = createBrowserHistory()

const theme = {
  breakpoints: map(item => `${item}em`, values(sizes)),
}

history.listen((location, action) =>
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (action === 'POP' || action === 'PUSH' || (location.state && location.state.noScroll)) {
      return
    }

    // In all other cases, scroll to top
    window.scrollTo(0, 0)
  }),
)

const AppWrapper = styled.div`
  height: 100%;
  max-width: 1366px;
`

const App = () => (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Flex is={AppWrapper} flexDirection="column" m="0 auto">
          <PageHeader />
          <Flex mt="7rem" flex="1 0 auto" flexDirection="column">
            <ErrorBoundary>
              <Switch>
                <Route path={routes.container} component={Container} />
                <Route path={routes.container2} component={Container2} />
                <Route path={routes.container} component={Container} />
                <Redirect to={routes.base} />
              </Switch>
            </ErrorBoundary>
          </Flex>
          <PageFooter />
        </Flex>
      </Router>
    </ThemeProvider>
  </StrictMode>
)

export default App
