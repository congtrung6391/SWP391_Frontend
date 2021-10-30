import React from 'react';
import _ from 'lodash';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../../../BrowserHistory';
import URLService from '../../../services/URL.service';
import { Box } from '@mui/material';

class SideTabControl extends React.Component {
  onChangeTabMobile = (event) => {
    history.replace(event.target.value);
  }

  render() {
    const {
      controlKey, activeClassName, childClassName, direction,
    } = this.props;
    let { children } = this.props;
    const tab = URLService.getQueryString(controlKey);

    if (!_.isArray(children)) {
      children = [children];
    }
    children = children.filter((child) => child);

    const check = children.reduce((child, reducer) => reducer || child.props.route === tab, false);

    if (tab === undefined) {
      return (
        <Redirect to={`${window.location.pathname}?${controlKey}=${children[0].props.route}`} />
      );
    }

    if (check === false) {
      return (
        <Redirect to={`${window.location.pathname}?${controlKey}=${children[0].props.route}`} />
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: direction,
        }}
      >
        {
          children.map((child) => child && (
            <div
              key={child.props.route}
              className={`${childClassName} ${tab === child.props.route ? activeClassName : ''}`}
            >
              <NavLink
                to={`${window.location.pathname}?${controlKey}=${child.props.route}`}
              >
                {child}
              </NavLink>
            </div>
          ))
        }
      </Box>
    );
  }
}

SideTabControl.propTypes = {
  controlKey: PropTypes.string.isRequired,
  childClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  direction: PropTypes.string
};

SideTabControl.defaultProps = {
  childClassName: 'nav-tab',
  activeClassName: 'nav-tab-active',
  direction: 'column',
};

export default SideTabControl;
