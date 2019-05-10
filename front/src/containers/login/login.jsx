import React from 'react';
import { Flex, Box } from '@rebass/grid';

import styled from 'styled-components';
import { Input, Button } from '../../components/common-components';
import { colors, indentations } from '../../common';
import user from '../../assets/icons/user.svg';
import key from '../../assets/icons/key.svg';

const LoginFormContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${colors.gray};
  box-shadow: 0 0 5px ${colors.gray}, 0 5px 2px rgba(0, 0, 0, 0.29);
  background: linear-gradient(${colors.gray30}, ${colors.gray20});
`;

const TextInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 17px;
    right: 10px;
    display: inline-block;
    margin-left: -25px;
    height: 22px;
    width: 26px;
  }
`;

const UsernameInputContainer = styled(TextInputContainer)`
  &::after {
    mask: url(${user}) no-repeat 50% 50%;
    background-color: ${colors.darkGray};
    transition: background-color 0.3s ease;
  }

  &:focus-within::after {
    background-color: ${colors.blue20};
  }
`;

const PasswordInputContainer = styled(TextInputContainer)`
  &::after {
    mask: url(${key}) no-repeat 50% 50%;
    background-color: ${colors.darkGray};
    transition: background-color 0.3s ease;
  }

  &:focus-within::after {
    background-color: ${colors.blue20};
  }
`;

export class Login extends React.Component {
  render() {
    return (
      <Flex flex="1 0 auto" flexDirection="column" justifyContent="center" alignItems="center">
        <Box
          as={LoginFormContainer}
          width={1}
          css={{ maxWidth: 450 }}
          px={indentations.s}
          pt="20px"
          pb="15px"
          m="0 auto">
          <Flex flexDirection="column" alignItems="flex-end" m="0 auto" action="http://httpbin.org/post" method="post">
            <UsernameInputContainer>
              <Input name="username" type="text" id="username" autoFocus required placeholder="Имя пользователя" />
            </UsernameInputContainer>
            <PasswordInputContainer>
              <Input name="password" type="password" id="password" required placeholder="Пароль" />
            </PasswordInputContainer>
            <Button type="submit">Войти</Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}
