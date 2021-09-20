import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SingleAdminFeature = (props) => {
  const onClickHandler = (event) => {
    if (event.target.id === 'add-button'
    || event.target.parentElement.id === 'add-button') {
      props.history.push(`${props.link}/add`);
    } else {
      props.history.push(`${props.link}`);
    }
  };

  const {
    logo, color, title, addButton,
  } = props;
  return (
    <Card className="single-admin-feature shadow-sm">
      <div
        onClick={(event) => onClickHandler(event)}
        role="link"
        tabIndex="0"
      >
        <div className="cover">
          <Row>
            <Col md={4} xs={4} className="logo">
              <span className={logo} style={{ color }} />
            </Col>
          </Row>
        </div>
        <hr className="m-1" />
        <div className="control">
          <Row>
            <Col md={8} xs={8}><h2>{title}</h2></Col>
            <Col md={4} xs={4} className="text-right">
              {
                (addButton
                  && (
                    <button
                      className="control-add"
                      type="button"
                      id="add-button"
                    >
                      <span className="fas fa-plus" />
                    </button>
                  )
                )
                || (
                <button className="control-add" type="button">
                  <span className="fas fa-tools" />
                </button>
                )
              }
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

SingleAdminFeature.propTypes = {
  addButton: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SingleAdminFeature;
