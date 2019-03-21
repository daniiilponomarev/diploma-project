import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const FooterWrapper = styled.header`
  height: 7rem;
  background-color: #aaa;
  box-shadow: 0 -2px -2px -3px #f6f7f8;
  width: 1366px;
`;

export const PageFooter = () => (
  <Flex as={FooterWrapper} m="0 auto" alignItems="center" py="1rem">
    <a href="/" title="home" target="blank">
      Home
    </a>
  </Flex>
);
