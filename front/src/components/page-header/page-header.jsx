import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { Link } from 'react-router-dom';

import { zIndexes, routes } from '../../common';
import { LogoSVG } from '../common-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  height: 7rem;
  background-color: #fff;
  box-shadow: 0 2px 2px 3px #f6f7f8;
  z-index: ${zIndexes.pageHeader};
  width: 100%;
`;

export const PageHeader = ({ history }) => (
  <Flex as={HeaderWrapper} m="0 auto" alignItems="center" py="1rem">
    <Box width="50px">
      <LogoSVG
        onClick={() => {
          history.push(routes.base);
        }}
      />
    </Box>
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
