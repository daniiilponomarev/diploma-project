import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Link } from 'react-router-dom';

import { zIndexes, routes } from '../../common';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  height: 7rem;
  background-color: #fff;
  box-shadow: 0 2px 2px 3px #f6f7f8;
  z-index: ${zIndexes.pageHeader};
  width: 1366px;
`;

export const PageHeader = () => (
  <Flex as={HeaderWrapper} m="0 auto" alignItems="center" py="1rem">
    <Link to={routes.base} title="home">
      Home
    </Link>
    <Link to={routes.container} title="container">
      container
    </Link>
    <Link to={routes.container2} title="container2">
      container2
    </Link>
  </Flex>
);
