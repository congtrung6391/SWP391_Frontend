// eslint-disable-next-line no-unused-vars
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import URLService from '../../../services/URL.service';

const SideTabContent = (props) => {
  const { controlKey } = props;
  let { children } = props;

  if (!_.isArray(children)) {
    children = [children];
  }
  children = children.filter((child) => child);

  const tab = URLService.getQueryString(controlKey);
  console.log(tab);

  const content = children.find((child) => child.props.route === tab);

  if (content) {
    return content;
  }
  return null;
};

SideTabContent.propTypes = {
  controlKey: PropTypes.string.isRequired,
};

export default SideTabContent;
