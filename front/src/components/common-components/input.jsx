import React from 'react';

import styled from 'styled-components';
import { colors } from '../../common';

export const Input = styled.input`
  height: 50px;
  width: 400px;
  border-radius: 5px;
  display: block;
  box-shadow: inset 0 3px 2px rgba(0, 0, 0, 0.08);
  border: none;
  padding: 15px;
  font-size: 1.5rem;
  box-sizing: border-box;
  color: ${colors.lightBlack};

  &::placeholder {
    transition: opacity 0.3s ease;
    color: ${colors.darkGray};
  }

  &:focus::placeholder {
    opacity: 0.3;
  }
`;
