import React from 'react';

import styled from 'styled-components';
import { colors } from '../../common';

export const Button = styled.button`
  height: 35px;
  width: 90px;
  background: linear-gradient(${colors.blue80}, ${colors.blue70});
  border-radius: 3px;
  border: none;
  box-shadow: inset 0 1px ${colors.blue90}, inset 0 0 3px ${colors.black}, 0 0 1px ${colors.black};
  font-size: 1.5rem;
  color: ${colors.white};
  text-transform: capitalize;

  &:active {
    background: linear-gradient(${colors.blue90}, ${colors.blue80});
  }
`;
