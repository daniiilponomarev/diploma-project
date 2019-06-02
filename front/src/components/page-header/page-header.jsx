import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
    anchorElProfile: null,
  };

  static contextType = UserContext;

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProfile = event => {
    this.setState({ anchorElProfile: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseProfile = () => {
    this.setState({ anchorElProfile: null });
  };

  handleLogout = () => {
    this.handleCloseProfile();
    this.context.authorize('', '');
  };

  render() {
    const { anchorEl, anchorElProfile } = this.state;
    const open = Boolean(anchorEl);
    const openProfile = Boolean(anchorElProfile);

    return (
      <div>
        <AppBar position="static">
          <Flex as={Toolbar} justifyContent={this.context.role ? 'space-between' : 'center'} alignItems="center">
            {this.context.role && (
              <Box>
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
                  <Link to={routes.base}>
                    <MenuItem onClick={this.handleClose}> Link 1 </MenuItem>
                  </Link>
                  <Link to={routes.request}>
                    <MenuItem onClick={this.handleClose}> Заявка </MenuItem>
                  </Link>
                  <Link to={routes.container}>
                    <MenuItem onClick={this.handleClose}> Link 2 </MenuItem>
                  </Link>
                  <Link to={routes.container2}>
                    <MenuItem onClick={this.handleClose}> Link 3 </MenuItem>
                  </Link>
                </Menu>
              </Box>
            )}
            <Box width="50px" as={Link} to={routes.base} title={COMMON_WORDS.homePage}>
              <LogoSVG />
            </Box>
            {this.context.role && (
              <Box>
                <IconButton
                  aria-owns={openProfile ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfile}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElProfile}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openProfile}
                  onClose={this.handleCloseProfile}>
                  <MenuItem onClick={this.handleLogout}>Выйти</MenuItem>
                </Menu>
              </Box>
            )}
          </Flex>
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
