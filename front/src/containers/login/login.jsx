import React from 'react';
import { Flex } from '@rebass/grid';

import styled from 'styled-components';
import { Input, Button } from '../../components/common-components';
import { colors } from '../../common';
import user from '../../assets/icons/user.svg';
import key from '../../assets/icons/key.svg';

const LoginFormBorder = styled.div`
  background: rgba(216, 216, 216, 0.12);
  width: 470px;
  height: 210px;
  border-radius: 10px;
  padding-bottom: 5px;
`;

const LoginFormContainer = styled.div`
  width: 450px;
  height: 190px;
  border-radius: 10px;
  border: 1px solid ${colors.gray};
  box-shadow: 0 0 5px ${colors.gray}, 0 5px 2px rgba(0, 0, 0, 0.29);
  margin: 0 auto;
  background: linear-gradient(${colors.gray30}, ${colors.gray20});
  line-height: normal;
`;

const LoginForm = styled.form`
  width: 400px;
  margin: 19px auto 13px;
  color: #6b6b6b;
`;

const TextInputContainer = styled.div`
  position: relative;
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
        <Flex as={LoginFormBorder} alignItems="center">
          <LoginFormContainer>
            <Flex
              as={LoginForm}
              flexDirection="column"
              alignItems="flex-end"
              action="http://httpbin.org/post"
              method="post">
              <UsernameInputContainer>
                <Input name="username" type="text" id="username" autoFocus required placeholder="Имя пользователя" />
              </UsernameInputContainer>
              <PasswordInputContainer>
                <Input name="password" type="password" id="password" required placeholder="Пароль" />
              </PasswordInputContainer>
              <Button type="submit">Войти</Button>
            </Flex>
          </LoginFormContainer>
        </Flex>
      </Flex>
    );
  }
}
