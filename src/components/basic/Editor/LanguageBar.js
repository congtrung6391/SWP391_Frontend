import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ProgrammingLanguageContext } from '../../../context/programmingLanguage.context';
import { Loading } from '../../common/Loading';

class LanguageBar extends React.Component {
  constructor(props) {
    super(props);
    const { init } = this.props;
    this.state = {
      fetched: false,
      theme: init.theme || 'default',
    };
  }

  async componentDidMount() {
    await this.languageContext.fetchLanguages();
    this.setState({ fetched: true });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { changeSetting } = this.props;
    if (name === 'theme') {
      this.setState({ theme: value });
    }
    changeSetting(name, value);
  }

  render() {
    const { fetched, theme } = this.state;
    const {
      init, style, onFullScreen, fullScreening,
    } = this.props;
    const darkmode = cx({ 'dark-bar': theme === 'material' });

    return (
      <div className={`language-bar ${darkmode}`} style={style}>
        <Row className="p-0 d-flex flex-row justify-content-between">
          <Col className="mr-auto p-0">
            <ProgrammingLanguageContext.Consumer>
              {
              (context) => {
                this.languageContext = context;
                return (
                  fetched
                    ? (
                      <FormControl
                        className="m-1"
                        as="select"
                        onChange={this.onChange}
                        id="search-tag"
                        name="mode"
                        value={init.mode}
                      >
                        {context.languages.map((l) => (
                          <option key={l.Id} value={l.Name}>{l.Name}</option>
                        ))}
                      </FormControl>
                    ) : <Loading />
                );
              }
            }
            </ProgrammingLanguageContext.Consumer>
          </Col>
          <Col className="p-0">
            <FormControl
              className="m-1 ml-auto"
              as="select"
              onChange={this.onChange}
              id="search-tag"
              name="theme"
              value={init.theme}
            >
              <option value="default">Light</option>
              <option value="material">Dark</option>
            </FormControl>
          </Col>
          {
            onFullScreen && (
              <div
                className="m-1 p-1"
                role="button"
                tabIndex={0}
                onClick={() => onFullScreen()}
                style={{ height: '25px' }}
              >
                {fullScreening
                  ? <i className="fas fa-lg fa-compress" style={{ fontSize: '25px', color: '#606060' }} />
                  : <i className="fas fa-lg fa-expand" style={{ fontSize: '25px', color: '#606060' }} />}
              </div>
            )
          }
        </Row>
      </div>
    );
  }
}

LanguageBar.propTypes = {
  init: PropTypes.shape({
    mode: PropTypes.string,
    theme: PropTypes.string,
  }).isRequired,
  changeSetting: PropTypes.func.isRequired,
  style: PropTypes.object,
  fullScreening: PropTypes.bool,
  onFullScreen: PropTypes.func,
};
LanguageBar.defaultProps = {
  style: {},
  fullScreening: false,
  onFullScreen: undefined,
};

export default LanguageBar;
