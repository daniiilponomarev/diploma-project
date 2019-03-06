import React from 'react'
import { Box } from 'grid-styled'
import styled from 'styled-components'

import { indentations } from '../../common'

export const Header = styled.span`
  font-size: 2rem;
  margin-bottom: 2rem;
`

const Details = styled.details`
  font-size: 1.4rem;
  white-space: pre-wrap;
`

export class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo })
  }

  render() {
    const { error, errorInfo } = this.state

    if (errorInfo) {
      // Error
      return (
        <Box m={indentations.m}>
          <Header>Неожиданный сбой приложения.</Header>
          <Details>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </Details>
        </Box>
      )
    }
    // Component
    return this.props.children
  }
}
