import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import _ from 'lodash';
import PropTypes from 'prop-types';
import history from '../../../BrowserHistory';
import TabContent from './TabContent';
import URLService from '../../../services/URL.service';

class TabControl extends React.Component {
  onChangeTabMobile = (event) => {
    history.replace(event.target.value);
  }

  render() {
    const { controlKey } = this.props;
    const tab = URLService.getQueryString(controlKey);
    let { children } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    if (!_.isArray(this.props.children)) {
      children = [children];
    }
    children = children.filter((child) => child);

    let check = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const child of children) {
      if (child.props.route === tab) {
        check = true;
        break;
      }
    }

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
      <Card className="border-0 shadow-sm mb-1">
        <div className="nav-tabs d-flex justify-content-around">
          {
            children.map((child, index) => child && (
              <NavLink
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                to={`${window.location.pathname}?${controlKey}=${child.props.route}`}
                className={tab === child.props.route ? 'nav-tab-active' : ''}
              >
                <h4 className="m-0">{child.props.title}</h4>
              </NavLink>
            ))
          }
        </div>

        <div className="nav-tabs d-flex justify-content-around nav-tabs-mobile">
          <FormGroup className="problem-filter p-1">
            <FormControl
              as="select"
              onChange={this.onChangeTabMobile}
              className="text-capitalize"
              value={`${window.location.pathname}?${controlKey}=${tab}`}
            >
              {
                children.map((child, index) => (
                  <option
                    className="text-capitalize"
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    value={`${window.location.pathname}?${controlKey}=${child.props.route}`}
                  >
                    {child.props.title}
                  </option>
                ))
              }
            </FormControl>
          </FormGroup>
        </div>
        {
          (() => {
            const content = children.find((child) => tab === child.props.route);
            return (
              <div style={{ display: 'block' }}>
                <TabContent>
                  {content}
                </TabContent>
              </div>
            );
          })()
          // children.find((child) => tab === child.props.route).map((child, index) => (
          //   // eslint-disable-next-line react/no-array-index-key
          //   <div style={{ display: tab === child.props.route ? 'block' : 'none' }} key={index}>
          //     <TabContent>
          //       {child}
          //     </TabContent>
          //   </div>
          // ))
        }
      </Card>
    );
  }
}

TabControl.propTypes = {
  controlKey: PropTypes.string.isRequired,
};

export default TabControl;
