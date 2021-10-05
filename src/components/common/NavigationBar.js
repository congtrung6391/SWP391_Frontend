import React, { useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Container,
  Breadcrumbs,
  Link,
  Box,
  Typography,
} from '@mui/material';

import LanguageService from '../../services/language.service';
import navigationLanguage from './navigation.lang';
import { LanguageContext } from '../../context/language.context';

const LS = new LanguageService();
LS.import(navigationLanguage);

const NavigationBar = (props) => {
  useEffect(() => {
    const { nav } = props;
    if (nav.length > 1) {
      document.title = `Online Tutor | ${nav[nav.length - 1][0]}`;
    }
  });

  const checkNav = (nav) => {
    if (nav.length === 0) return false;
    let valid = false;
    nav.forEach((item) => {
      if (item[0].length !== 0) valid = true;
    });
    return valid;
  };

  return (
    <LanguageContext.Consumer>
      {
    (() => {
      LS.use('vi');
      let { nav /* , style, bannerUrl */ } = props;

      if (!checkNav(nav)) {
        nav = [['Home', '/']];
      }

      return (
        <Container
          component={Box}
          py={2}
          style={{ paddingLeft: '3rem' }}
        >
          <Breadcrumbs separator="›&nbsp;" aria-label="breadcrumb">
            {
              nav.map((link) => (
                link[1]
                  ? (
                    <Link
                      key={link[0]}
                      component={LinkRouter}
                      to={link[1]}
                      color="inherit"
                      underline="none"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {LS.get(link[0]).toLowerCase()}
                    </Link>
                  )
                  : (
                    <Typography
                      key={link[0]}
                      color="textPrimary"
                      style={{ textTransform: 'capitalize', maxWidth: '10rem' }}
                      noWrap
                    >
                      {LS.get(link[0]).toLowerCase()}
                    </Typography>
                  )
              ))
            }
          </Breadcrumbs>
        </Container>
      );
    }
    )
  }
    </LanguageContext.Consumer>
  );
};

NavigationBar.propTypes = {
  nav: PropTypes.array.isRequired,
  // bannerBg: PropTypes.string,
  // bannerUrl: PropTypes.string,
};
NavigationBar.defaultProps = {
  // bannerBg: '#000000',
  // bannerUrl: undefined,
};

export default NavigationBar;
