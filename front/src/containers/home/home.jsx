import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex } from '@rebass/grid';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { UserContext } from '../../user-context';
import { LogoSVG } from '../../components/common-components';

function RecipeReviewCard(props) {
  return (
    <Card>
      <CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
      <Flex m={50} justifyContent="center" alignItems="center">
        <Box width="150px">
          <LogoSVG />
        </Box>
      </Flex>
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="p">
          Добро пожаловать, {props.username}!
        </Typography>
      </CardContent>
    </Card>
  );
}

export class Home extends React.Component {
  static contextType = UserContext;

  render() {
    return (
      <Flex flex="1 0 auto" flexDirection="column" justifyContent="center" alignItems="center">
        <Helmet>
          <title>Главная</title>
        </Helmet>

        <RecipeReviewCard username={this.context.username} />
      </Flex>
    );
  }
}
