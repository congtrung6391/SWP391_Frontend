/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Input from '../../basic/Input';
import Button from '../../basic/Button';
import Checkbox from '../../basic/Checkbox';
import { isLoggedIn } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import { AuthenticationContext } from '../../../context/authentication.context';
import history from '../../../BrowserHistory';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      remember: '',
      wrongPassword: '',
      isLoggingIn: false,
      isGoolgeLoggingIn: false,
      isFacebookLoggingIn: false,
      socialLoginError: '',
    };
    this.GOOGLE_ID = process.env.REACT_APP_GOOGLE_LOGIN_ID;
    this.FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_LOGIN_ID;
    this.context = AuthenticationContext;
  }

  componentDidMount = () => {
    if (isLoggedIn()) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push('/');
    }
  }

  toggleRemember = (value) => {
    const { remember } = this.state;
    if (remember === value) {
      this.setState(() => ({
        remember: '',
      }));
    } else {
      this.setState(() => ({
        remember: 'remember',
      }));
    }
  };

  resetWrongPassword = () => {
    const { wrongPassword } = this.state;
    if (wrongPassword) {
      this.setState(() => ({
        wrongPassword: '',
      }));
    }
  };

  onChangeUsername = (Username) => {
    this.setState(() => ({
      Username,
    }));

    this.resetWrongPassword();
  };

  onChangePassword = (Password) => {
    this.setState(() => ({
      Password,
    }));

    this.resetWrongPassword();
  }

  onSubmitLogin = async (event) => {
    event.preventDefault();
    const { Username, Password, remember } = this.state;
    const { login } = this.context;
    if (Username.trim().length === 0 || Password.length === 0) {
      await this.setState(() => ({ wrongPassword: 'Sai tên đăng nhập hoặc mật khẩu.' }));
      return;
    }

    this.setState(() => ({
      isLoggingIn: true,
    }));

    const response = await login(Username, Password, remember);
    if (response) {
      this.setState(() => ({
        wrongPassword: response.includes('Invalid user') ? 'Sai tên đăng nhập hoặc mật khẩu.' : response,
        isLoggingIn: false,
      }));
    } else {
      history.goBack();
    }
  }

  successResponseGoogle = async (googleResponse) => {
    const { tokenId, googleId } = googleResponse;
    const { googleLogin } = this.context;

    this.setState(() => ({
      isGoolgeLoggingIn: true,
    }));

    const response = await googleLogin(tokenId, googleId);
    if (response) {
      this.setState(() => ({
        socialLoginError: response.includes('duplicate') ? 'Tài khoản đã tồn tại' : 'Đăng nhập thất bại',
        isGoolgeLoggingIn: false,
      }));
    } else {
      history.goBack();
    }
  }

  failureResponseGoogle = () => {
    // console.log(response);
  }

  responseFacebook = async (response) => {
    const { accessToken, userID } = response;
    const { facebookLogin } = this.context;

    this.setState(() => ({
      isFacebookLoggingIn: true,
    }));

    const responseAccount = await facebookLogin(accessToken, userID);

    if (responseAccount) {
      this.setState(() => ({
        socialLoginError: responseAccount.includes('duplicate') ? 'Tài khoản đã tồn tại' : 'Đăng nhập thất bại',
        isFacebookLoggingIn: false,
      }));
    } else {
      history.goBack();
    }
  }

  render = () => {
    const {
      Username,
      wrongPassword,
      Password,
      remember,
      errorUsername,
      isLoggingIn,
      isGoolgeLoggingIn,
      isFacebookLoggingIn,
      socialLoginError,
    } = this.state;

    return (
      <AuthenticationContext.Consumer>
        {
        (context) => {
          this.context = context;

          if (context.verifyUser()) {
            return <Redirect to="/" />;
          }

          return (
            <div>
              <NavigationBar
                nav={[
                  ['Home', '/'],
                  ['Login'],
                ]}
              />
              <Body>
                <Container>
                  <Row className="justify-content-md-center">
                    <Col xs lg="5" className="form login-div shadow-sm" style={{ backgroundColor: 'white' }}>
                      <form onSubmit={this.onSubmitLogin}>
                        <h1>Đăng nhập</h1>
                        {
                          wrongPassword
                          && (
                          <div className="login-error">
                            <label>{wrongPassword}</label>
                          </div>
                          )
                        }
                        <Input
                          name="Tên đăng nhập / Email"
                          value={Username}
                          type="text"
                          message={errorUsername}
                          onChange={this.onChangeUsername}
                        />
                        <Input
                          name="Mật khẩu"
                          type="password"
                          className="password-input"
                          value={Password}
                          onChange={this.onChangePassword}
                        />
                        <Container>
                          <Row>
                            <Col>
                              <Checkbox
                                name="remember"
                                values={remember}
                                options={[{ value: 'remember', text: 'Ghi nhớ tài khoản' }]}
                                className="login-remember"
                                onChange={this.toggleRemember}
                              />
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                              <label
                                className="forgot-password-label"
                              >
                                <div role="link" tabIndex={0} onClick={() => this.props.history.push('/forgot')}>Quên mật khẩu?</div>
                              </label>
                            </Col>
                          </Row>
                        </Container>
                        <Button
                          type="submit"
                          disabled={isLoggingIn}
                          className="login-button w-100"
                        >
                          {isLoggingIn ? (<div style={{ padding: '5px 0 5px 0' }}><Loading /></div>) : 'Đăng nhập'}
                        </Button>
                      </form>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center" style={{ marginBottom: '10%' }}>
                    <Col
                      xs
                      lg="5"
                      className="form login-div shadow-sm"
                      style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'white' }}
                    >
                      {'Lần đầu đến với Big-O Coder? '}
                      <label
                        className="to-register"
                      >
                        <div role="link" tabIndex={0} onClick={() => this.props.history.push('/register')}>Tạo ngay tài khoản.</div>
                      </label>
                      <div className="mt-1">
                        {'Hoặc đăng nhập với '}
                      </div>
                      {
                        socialLoginError
                        && (
                        <div className="login-error">
                          <label>{socialLoginError}</label>
                        </div>
                        )
                      }
                    </Col>
                  </Row>
                </Container>
              </Body>
            </div>
          );
        }
      }
      </AuthenticationContext.Consumer>
    );
  }
}

export default Login;
