import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { UserContext } from '../../user-context';
import { colors, indentations, routes } from '../../common'
import { login } from '../../api';

const LoginFormContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${colors.gray50};
  background: linear-gradient(${colors.gray30}, ${colors.gray20});
`;

const initialState = {
  username: '',
  password: '',
  showPassword: false,
  dialogOpened: false,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class Login extends React.Component {
  state = initialState;

  static contextType = UserContext;

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = e => {
    e.preventDefault();

    login({
      username: this.state.username,
      password: this.state.password,
    }).then(
      response => {
        // console.log(response);
        // if (response.username) {
        //   this.context.authorize(response.username, response.role);
        //   this.handleClearForm();
        //   this.props.history.push(routes.base)
        // } else {
          this.setState(state => ({ dialogOpened: true }));
          console.log('Authorization error');
        // }
      },
      error => {
        this.setState(state => ({ dialogOpened: true }));
        console.log('Authorization error', error);
      },
    );
  };

  handleClearForm = e => {
    if (e) {
      e.preventDefault();
    }

    this.setState({ ...initialState });
  };

  handleDialogClose = () => {
    this.setState(state => ({ dialogOpened: !state.dialogOpened }));
  };

  render() {
    return (
      <Flex flex="1 0 auto" flexDirection="column" justifyContent="center" alignItems="center">
        <Helmet>
          <title>Вход</title>
        </Helmet>
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
            onSubmit={this.handleSubmit}
            flexDirection="column"
            alignItems="flex-end"
            m="0 auto"
            method="post">
            <Box width={1} mb={10}>
              <TextField
                variant="outlined"
                name="username"
                id="username"
                autoFocus
                required
                label="Имя пользователя"
                fullWidth
                onChange={this.handleChange('username')}
                InputProps={{
                  endAdornment: <AccountCircle />,
                }}
              />
            </Box>
            <Box width={1} mb={10}>
              <TextField
                variant="outlined"
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

        <Dialog
          open={this.state.dialogOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Пользователь не найден!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Введите корректные данные для авторизации!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Flex>
    );
  }
}
