import React from 'react'
import styled from 'styled-components'

import { colors } from '../../common'

export const Spinner = styled.div`
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
  box-sizing: border-box;
  border: 2px solid ${colors.lightGray};
  animation: spin 4s infinite linear;

  &:after,
  &:before {
    content: '';
    position: absolute;
    left: 5px;
    top: 5px;
    width: 32px;
    height: 32px;
    border: 2px solid ${colors.gray};
    animation: spin 2s infinite reverse linear;
  }
  &:before {
    border-color: ${colors.darkGray};
    left: 10px;
    top: 10px;
    width: 22px;
    height: 22px;
    animation: spin 2s infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
