import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { colors, indentations } from '../../common';

const LoginFormContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${colors.gray50};
  // box-shadow: 0 0 5px ${colors.gray50}, 0 5px 2px rgba(0, 0, 0, 0.29);
  background: linear-gradient(${colors.gray30}, ${colors.gray20});
`;

export class Login extends React.Component {
  state = {
    password: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

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
          <Flex
            as="form"
            flexDirection="column"
            alignItems="flex-end"
            m="0 auto"
            action="http://httpbin.org/post"
            method="post">
            <Box width={1} mb={10}>
              <TextField
                name="username"
                id="username"
                autoFocus
                required
                label="Имя пользователя"
                fullWidth
                InputProps={{
                  endAdornment: <AccountCircle />,
                }}
              />
            </Box>
            <Box width={1} mb={10}>
              <TextField
                type={this.state.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                label="Пароль"
                fullWidth
                value={this.state.password}
                onChange={this.handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Войти
            </Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}
