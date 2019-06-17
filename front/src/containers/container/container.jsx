import React from 'react';
import createAsyncCallComponent from 'react-async-call';
import { Flex } from '@rebass/grid';
import Delay from 'react-delay';

import { getCustomers } from '../../api';
import { Spinner } from '../../components';
import { REQUEST_TOLERATED_TIME, indentations, colors } from '../../common';

const fetchSmth = (params) => getCustomers(params);
const FetchSmth = createAsyncCallComponent(fetchSmth);

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
);

const emptyResult = 'Нет данных';

export class Container extends React.Component {
  render() {
    return (
      <div className="App">
        <FetchSmth params={{ id: 1 }}>
          <FetchSmth.Running>
            <Delay wait={REQUEST_TOLERATED_TIME}>
              <Flex justifyContent="center" as={Spinner} />
            </Delay>
          </FetchSmth.Running>
          <FetchSmth.Resolved>{({ result }) => <div>{JSON.stringify(result)}</div>}</FetchSmth.Resolved>
          <FetchSmth.Rejected>
            <Disclaimer>{emptyResult}</Disclaimer>
          </FetchSmth.Rejected>
        </FetchSmth>
      </div>
    );
  }
}
