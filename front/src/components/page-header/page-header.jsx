import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { Link } from 'react-router-dom';
// import Link from '@material-ui/core/Link';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { zIndexes, routes, COMMON_WORDS } from '../../common';
import { LogoSVG } from '../common-components';
import { UserContext } from '../../user-context';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  height: 7rem;
  background-color: #fff;
  box-shadow: 0 2px 2px 3px #f6f7f8;
  z-index: ${zIndexes.pageHeader};
  width: 100%;
`;

export class PageHeader extends React.Component {
  state = {
    anchorEl: null,
  };

  static contextType = UserContext;

  handleMenu = event => {
    console.log('handleMenu');
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    console.log('handleClose');
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.context.authorize('', '');
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.context);

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}>
              <Link to={routes.base}><MenuItem onClick={this.handleClose}> Link 1 </MenuItem></Link>
              <Link to={routes.container}><MenuItem onClick={this.handleClose}> Link 2 </MenuItem></Link>
              <Link to={routes.container2}><MenuItem onClick={this.handleClose}> Link 3 </MenuItem></Link>
            </Menu>
            {/*<Typography variant="h6" color="inherit">*/}
            {/*  CTS*/}
            {/*</Typography>*/}
            {this.context.role && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}>
                  <MenuItem onClick={this.handleLogout}>Выйти</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        {/*<Flex as={HeaderWrapper} m="0 auto" alignItems="center" py="1rem">*/}
        {/*  <Box width="50px" as={Link} to={routes.base} title={COMMON_WORDS.homePage}>*/}
        {/*    <LogoSVG />*/}
        {/*  </Box>*/}
        {/*  <Link to={routes.base} title="home">*/}
        {/*    Home*/}
        {/*  </Link>*/}
        {/*  <Link to={routes.container} title="container">*/}
        {/*    container*/}
        {/*  </Link>*/}
        {/*  <Link to={routes.container2} title="container2">*/}
        {/*    container2*/}
        {/*  </Link>*/}
        {/*</Flex>*/}
      </div>
    );
  }
}
