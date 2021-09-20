import React, { useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Breadcrumbs,
  Link,
  Box,
  Typography,
} from '@material-ui/core';

import LanguageService from '../../services/language.service';
import navigationLanguage from './navigation.lang';
import { LanguageContext } from '../../context/language.context';

const LS = new LanguageService();
LS.import(navigationLanguage);

const NavigationBar = (props) => {
  useEffect(() => {
    const { nav } = props;
    if (nav.length > 1) {
      document.title = `Big-O Coder | ${nav[nav.length - 1][0]}`;
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
        nav = [['Trang chủ', '/']];
      }

      return (
        <Box
          px="1.5rem"
          py="0.3rem"
          style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}
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
          {/* {
            bannerUrl
            && (
              <div
                className="d-flex flex-row justify-content-center"
                style={{
                  backgroundColor: bannerBg,
                }}
              >
                <img
                  src={bannerUrl}
                  alt="Line Code Wow banner"
                  style={{
                    maxHeight: '300px',
                    width: 'min(100%, 1500px)',
                  }}
                />
              </div>
            )
          } */}
        </Box>
        // <div className="py-1 pr-0 pl-1 shadow-sm navigation-bar" style={style}>
        //   <div className="pl-5">
        //     {
        //       nav.map((link, index) => (
        //         <span key={link[0]}>
        //           {
        //             (index < nav.length - 1 && <Link to={link[1]}>{LS.get(link[0])}</Link>)
        //             || <p>{LS.get(link[0])}</p>
        //           }
        //           {
        //             index < nav.length - 1
        //             && <span className="fas fa-chevron-right" style={{ fontSize: '10px' }} />
        //           }
        //         </span>
        //       ))
        //     }
        //   </div>
        // </div>
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
