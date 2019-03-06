import React from 'react'
import createAsyncCallComponent from 'react-async-call'
import { Flex } from 'grid-styled'
import Delay from 'react-delay'

import { getSmth } from '../../api'
import { Spinner } from '../../components'
import { REQUEST_TOLERATED_TIME, indentations, colors } from '../../common'
import logo from '../../logo.svg'

const fetchSmth = ({ id }) => getSmth(id)
const FetchSmth = createAsyncCallComponent(fetchSmth)

export const Disclaimer = ({ children }) => (
  <Flex
    mt="2.4rem"
    mb="6rem"
    mx={indentations.m}
    fontSize="1.6rem"
    color={colors.gray}
    justifyContent="center"
    data-spec="card-no-data">
    {children}
  </Flex>
)

const emptyResult = 'Нет данных'

export class Container extends React.Component {
  render() {
    console.log('render Container');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FetchSmth params={{ id: 1 }}>
          <FetchSmth.Running>
            <Delay wait={REQUEST_TOLERATED_TIME}>
              <Flex justifyContent="center" is={Spinner} />
            </Delay>
          </FetchSmth.Running>
          <FetchSmth.Resolved>{({ result }) => <div>{result}</div>}</FetchSmth.Resolved>
          <FetchSmth.Rejected>
            <Disclaimer>{emptyResult}</Disclaimer>
          </FetchSmth.Rejected>
        </FetchSmth>
      </div>
    )
  }
}
