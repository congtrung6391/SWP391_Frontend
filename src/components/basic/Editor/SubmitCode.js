/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';

import CodeMirror from './CodeMirror';
import LanguageBar from './LanguageBar';
import Button from '../Button';
import { ProgrammingLanguageContext } from '../../../context/programmingLanguage.context';
import LocalStorageService from '../../../services/localStorage.service';
import { ToastContext } from '../../../context/toast.context';
import Modal from '../Modal';
import { isLoggedIn } from '../../../utils/cookies';
import history from '../../../BrowserHistory';
import ToggleCheckbox from '../ToggleCheckbox';
import TestCodeResult from './TestCode';
import {
  lectureProblemPropType, adminProblemPropType, contestProblemPropType, problemPropType,
} from '../../../propTypes/propTypes';
import { DoubleView } from '../Body';

import LiveCodeService from '../../../services/liveCode.service';

class SubmitCode extends React.Component {
  constructor(props) {
    super(props);
    const oldSetting = LocalStorageService.read('submitcodesetting');
    this.state = {
      value: LocalStorageService.read(`temp-code:${props.problem.Id}`) || '',
      error: '',
      submitting: false,
      customInput: '',
      withInput: false,
      testing: false,
      submission: undefined,
    };
    if (oldSetting) {
      this.state.setting = {
        mode: oldSetting.mode || 'C',
        theme: oldSetting.theme || 'default',
      };
    } else {
      this.state.setting = {
        mode: 'C',
        theme: 'default',
      };
    }
  }

  changeSetting = (name, value) => {
    const { setting } = this.state;
    setting[name] = value;
    LocalStorageService.write('submitcodesetting', setting);
    this.setState({ setting });
  }

  onChange = (event) => {
    const { value } = event.target;
    const { problem } = this.props;
    this.setState({ value });
    LocalStorageService.write(`temp-code:${problem.Id}`, value);
  }

  onChangeCustomInput = (event) => {
    this.setState({ customInput: event.target.value });
  }

  submit = async () => {
    const { value, setting } = this.state;
    const { problem } = this.props;

    if (!isLoggedIn()) {
      alert('You need to login first!');
      history.push('/login');
    }
    if (value.trim() === '') {
      return;
    }

    this.setState({ submitting: true });
    const response = await problem.submit({
      Content: value,
      LanguageId: this.findLanguageId(setting.mode),
    });

    if (response) {
      this.setState({ error: response, submitting: false });
    } else {
      this.addNotification('Big-O Coding', 'Submitted');
    }
    this.setState({ submitting: false });
  }

  closeError = () => {
    this.setState({ error: '' });
  }

  testCode = async () => {
    const { value, customInput, setting } = this.state;
    const { problem } = this.props;

    if (value.trim() === '') {
      return;
    }

    try {
      this.setState({ testing: true, submission: undefined });

      let newCustomInput = '';
      if (customInput) {
        newCustomInput = customInput;
      } else if (problem.SampleTests.length > 0) {
        newCustomInput = Base64.decode(problem.SampleTests[0].InputContent);
      }

      const languageId = this.findLanguageId(setting.mode);

      const idLiveCode = await LiveCodeService.submitCode(
        languageId, Base64.encode(value), Base64.encode(newCustomInput),
      );

      let response = await LiveCodeService.getSubmit(idLiveCode);
      if (response.Verdict !== 'Pending') {
        this.setState({ submission: response, testing: false });
        clearIntervalAsync(this);
      } else {
        const refresh = setIntervalAsync(async () => {
          response = await LiveCodeService.getSubmit(idLiveCode);
          if (response.Verdict !== 'Pending') {
            this.setState({ submission: response, testing: false });
            clearIntervalAsync(refresh);
          }
        }, 2000);
      }
    } catch (error) {
      this.setState({ error: 'Có nhiều bài đang được chấm thử! Hãy thử lại sau.', testing: false });
    }
  }

  closeSubmission = () => {
    this.setState({ submission: undefined });
  }

  render() {
    const {
      setting, value, withInput, submitting, customInput, testing,
      submission, error,
    } = this.state;
    const { fullScreening, onFullScreen } = this.props;
    // const submission = {};
    // submission.Verdict = 'Success';
    // submission.CheckerLog = 'cdvnfj\n\n\n\n\nngj\nbnf\nnngfb\nnkj\nfg\nnbk\njfnbnbfg\nnbjgf';
    return (
      <div id="submit-code">
        <DoubleView
          viewName="ide"
          minRight={300}
          minLeft={300}
        >
          <div style={{ height: '100%' }}>
            {/* editor code */}
            <div className="editor border">
              <ProgrammingLanguageContext.Consumer>
                {
                  ({ findLanguageId }) => {
                    this.findLanguageId = findLanguageId;
                    return <></>;
                  }
                }
              </ProgrammingLanguageContext.Consumer>
              <ToastContext.Consumer>
                {
                  ({ addNotification }) => {
                    this.addNotification = addNotification;
                    return <></>;
                  }
                }
              </ToastContext.Consumer>
              <LanguageBar
                style={{ height: '35px' }}
                changeSetting={this.changeSetting}
                init={setting}
                onFullScreen={onFullScreen}
                fullScreening={fullScreening}
              />
              <hr className="m-0" />
              <div style={{ height: 'calc(100% - 36px)' }}>
                <CodeMirror
                  value={value}
                  onChange={this.onChange}
                  mode={setting.mode}
                  theme={setting.theme}
                />
              </div>
            </div>

            {/* submit bar */}
            <div className="submit-bar">
              <Col className="p-0 d-flex flex-column justify-content-center">
                <ToggleCheckbox
                  label=" Chạy thử với input tùy chỉnh"
                  className="green"
                  labelClassName="font-weight-bold"
                  checked={withInput}
                  onChange={() => {
                    if (withInput === true) {
                      this.setState({ customInput: '' });
                    }
                    this.setState({ withInput: !withInput });
                  }}
                />
              </Col>
              <div className="ml-auto">
                <Button
                  className="h-100 mr-2 green border-green corner bg-white"
                  disabled={testing}
                  onClick={this.testCode}
                >
                  {
                    (testing && <span className="fas fa-spinner fa-spin" />)
                    || (
                      <div>
                        Chạy thử
                        {' '}
                        <span className="fas fa-cogs" />
                      </div>
                    )
                  }
                </Button>
                <Button
                  className="h-100 bg-green border-0 text-white corner"
                  onClick={this.submit}
                  disabled={submitting}
                >
                  {
                    (submitting && <span className="fas fa-spinner fa-spin" />)
                    || (
                      <div>
                        Nộp bài
                        {' '}
                        <span className="fas fa-paper-plane" />
                      </div>
                    )
                  }
                </Button>
              </div>
            </div>
          </div>

          {
            (withInput || submission)
            && (
              <div style={{ height: '100%', overflow: 'scroll' }}>
                {/* <DoubleView
                  viewName="testcase"
                  orientation="vertical"
                  minLeft="100"
                  minRight="100"
                > */}
                  {
                    (withInput)
                    && (
                      <div style={{ maxHeight: '49%', overflow: 'scroll' }}>
                        <div
                          className="p-1 pl-2 font-weight-bold w100"
                          style={{ height: '2rem' }}
                        >
                          Input
                        </div>
                        <hr className="m-0" />
                        <div style={{ height: 'calc(49% - 2rem)' }}>
                          <CodeMirror
                            value={customInput}
                            onChange={this.onChangeCustomInput}
                            mode="text"
                            theme={setting.theme}
                            lineNumbers={false}
                          />
                        </div>
                      </div>
                    )
                  }
                <hr className="m-0" />
                  {
                    (submission)
                    && (
                      <div style={{ maxHeight: '50%', overflow: 'scroll' }}>
                        <TestCodeResult
                          submission={submission}
                          closeSubmit={this.closeSubmission}
                        />
                      </div>
                    )
                  }
                {/* </DoubleView> */}
              </div>
            )
          }
        </DoubleView>

        <Modal
          title="Lỗi"
          error={1}
          show={error !== ''}
          onHide={this.closeError}
          closebutton={1}
        >
          <div className="p-3">
            {error}
          </div>
        </Modal>
      </div>
    );
  }
}

SubmitCode.propTypes = {
  problem: PropTypes.oneOfType([
    problemPropType,
    adminProblemPropType,
    lectureProblemPropType,
    contestProblemPropType,
  ]).isRequired,
  fullScreening: PropTypes.bool,
  onFullScreen: PropTypes.func,
};
SubmitCode.defaultProps = {
  fullScreening: false,
  onFullScreen: undefined,
};

export default SubmitCode;
