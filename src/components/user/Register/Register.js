import React/* , { useContext, useState, useEffect } */ from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SHA256 from 'crypto-js/sha256';
import validate from 'validate.js';
import { Redirect } from 'react-router-dom';

import Input from '../../basic/Input';
import Button from '../../basic/Button';
// import { isLoggedIn } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
// import AuthenticationService from '../../../services/authentication.service';
import LanguageService from '../../../services/language.service';
import registerLanguage from './register.lang';
import { LanguageContext } from '../../../context/language.context';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import { AuthenticationContext } from '../../../context/authentication.context';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: '',
      Email: '',
      Password: '',
      confirmPassword: '',
      errorUsername: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirmPassword: '',
      passwordStrength: 0,
      isRegistering: false,
      isGoolgeLoggingIn: false,
      socialLoginError: '',
    };
    this.GOOGLE_ID = process.env.REACT_APP_GOOGLE_LOGIN_ID;
    this.FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_LOGIN_ID;
    this.language = new LanguageService();
    this.language.import(registerLanguage);
  }

  validateUsername = (username) => {
    if (!username) {
      this.setState(() => ({ errorUsername: this.language.get('Username can not be empty.') }));
    } else if (username.includes(' ')) {
      this.setState(() => ({ errorUsername: 'Tên đăng nhập không được chứa khoảng trắng' }));
    } else {
      this.setState(() => ({ errorUsername: '' }));
    }
  };

  validateEmail = (email) => {
    if (!email) {
      this.setState(() => ({ errorEmail: 'Email không được để trống.' }));
    } else {
      const constraint = {
        from: {
          email: true,
        },
      };

      if (validate({ from: email }, constraint) !== undefined) {
        this.setState(() => ({ errorEmail: 'Email không hợp lệ.' }));
      } else {
        this.setState(() => ({ errorEmail: '' }));
      }
    }
  };

  validatePassword = (password) => {
    if (!password) {
      this.setState(() => ({ errorPassword: 'Mật khẩu không được để trống.', passwordStrength: 0 }));
    } else if (password.length < 8) {
      this.setState(() => ({ errorPassword: 'Mật khẩu phải chứa ít nhất 8 ký tự.', passwordStrength: 0 }));
    } else {
      this.setState(() => ({ errorPassword: '' }));
      this.calculatePasswordStrength(password);
    }
  };

  validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword !== password) {
      this.setState(() => ({ errorConfirmPassword: 'Mật khẩu xác nhận phải giống mật khẩu.' }));
    } else {
      this.setState(() => ({ errorConfirmPassword: '' }));
    }
  };

  onChangeUsername = (Username) => {
    this.setState(() => ({ Username }));
    this.validateUsername(Username);
  };

  onChangeEmail = (Email) => {
    this.setState(() => ({ Email }));
    this.validateEmail(Email);
  };

  calculatePasswordStrength = (password) => {
    const regexLower = /[a-z]/g;
    const regexUpper = /[A-Z]/g;
    const regexNumber = /[0-9]/g;
    const regexSpecial = /[`~!@#$%^&*()_+{}|;:'",<.>?]/g;
    let passwordStrength = 0;

    if (password.match(regexLower)) {
      passwordStrength += 1;
    }
    if (password.match(regexUpper)) {
      passwordStrength += 1;
    }
    if (password.match(regexNumber)) {
      passwordStrength += 1;
    }
    if (password.match(regexSpecial)) {
      passwordStrength += 1;
    }

    this.setState(() => ({ passwordStrength }));
  };

  onChangePassword = (Password) => {
    this.setState(() => ({ Password }));
    this.validatePassword(Password);
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState(() => ({ confirmPassword }));
    const { Password } = this.state;
    this.validateConfirmPassword(Password, confirmPassword);
  };

  onFocusEmail = () => {
    const { Username } = this.state;
    this.validateUsername(Username);
  };

  onFocusPassword = () => {
    const { Username, Email } = this.state;
    this.validateUsername(Username);
    this.validateEmail(Email);
  };

  onFocusConfirmPassword = () => {
    const { Username, Email, Password } = this.state;
    this.validateUsername(Username);
    this.validateEmail(Email);
    this.validatePassword(Password);
  };

  registerNewUser = async (event) => {
    const {
      Username,
      Email,
      Password,
      confirmPassword,
      errorUsername,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
    } = this.state;
    const { history } = this.props;
    event.preventDefault();
    this.validateUsername(Username);
    this.validateEmail(Email);
    this.validatePassword(Password);
    this.validateConfirmPassword(Password, confirmPassword);

    if (errorUsername || errorEmail
        || errorPassword || errorConfirmPassword) {
      return;
    }

    this.setState(() => ({ isRegistering: true }));
    const response = await this.authenticationcContext.register(
      Username,
      Email,
      SHA256(Password).toString(),
    );

    if (!response || response === null) {
      history.push('/login');
    }

    if (response.includes('exists')) {
      this.setState({
        errorUsername: 'Tên đăng nhập hoặc email đã tồn tại.',
      });
    }
    // if (response === 'Username already exists.') {
    //   this.setState(() => ({
    //     errorUsername: 'Tên đăng nhập đã tồn tại.'
    //   }));
    // }
    // else if (response === 'Email already exists.') {
    //   this.setState(() => ({
    //     errorEmail: 'Email đã tồn tại.'
    //   }));
    // }
    this.setState(() => ({ isRegistering: false }));
  };

  successResponseGoogle = async (googleResponse) => {
    const { tokenId, googleId } = googleResponse;
    const { googleLogin } = this.authenticationcContext;

    // loading google logo
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
      const { history } = this.props;
      history.goBack();
    }
  }

  failureResponseGoogle = () => {
  }

  responseFacebook = async (response) => {
    const { accessToken, userID } = response;
    const { facebookLogin } = this.authenticationcContext;

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
      const { history } = this.props;
      history.goBack();
    }
  }

  render = () => {
    const {
      Username,
      Email,
      Password,
      confirmPassword,
      errorUsername,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
      passwordStrength,
      isRegistering,
      isGoolgeLoggingIn,
      isFacebookLoggingIn,
      socialLoginError,
    } = this.state;
    const { history } = this.props;

    return (
      <LanguageContext.Consumer>
        {
        (languageContext) => {
          this.language.use(languageContext.language);

          return (
            <AuthenticationContext.Consumer>
              {(authenticationcContext) => {
                this.authenticationcContext = authenticationcContext;

                if (authenticationcContext.verifyUser()) {
                  return (
                    <Redirect to="/" />
                  );
                }

                return (
                  <>
                    <NavigationBar
                      nav={[
                        ['Home', '/'],
                        ['Register'],
                      ]}
                    />
                    <Body>
                      <Container>
                        <Row className="justify-content-md-center">
                          <Col xg lg="5" className="form register-div shadow-sm" style={{ backgroundColor: 'white' }}>
                            <form onSubmit={this.registerNewUser}>
                              <h1>{this.language.get('Register')}</h1>
                              <Input
                                name={this.language.get('Username')}
                                value={Username}
                                onChange={this.onChangeUsername}
                                message={errorUsername}
                              />
                              <Input
                                name={this.language.get('Email')}
                                type="email"
                                value={Email}
                                onChange={this.onChangeEmail}
                                message={errorEmail}
                                onFocus={this.onFocusEmail}
                              />
                              <Input
                                name={this.language.get('Password')}
                                type="password"
                                autoComplete="new-password"
                                className="register-password"
                                value={Password}
                                onChange={this.onChangePassword}
                                message={errorPassword}
                                onFocus={this.onFocusPassword}
                              />
                              <Container>
                                <Row className="justify-content-md-center">
                                  <Col className={`${passwordStrength > 0 && 'very-weak-password'}`} />
                                  <Col className={`${passwordStrength > 1 && 'weak-password'}`} />
                                  <Col className={`${passwordStrength > 2 && 'medium-password'}`} />
                                  <Col className={`${passwordStrength > 3 && 'strong-password'}`} />
                                </Row>
                              </Container>
                              <Input
                                name={this.language.get('Confirm password')}
                                type="password"
                                value={confirmPassword}
                                onChange={this.onChangeConfirmPassword}
                                message={errorConfirmPassword}
                                onFocus={this.onFocusConfirmPassword}
                              />
                              <Button
                                className="register-button w-100"
                                type="submit"
                                disabled={
                                  isRegistering
                                  || errorConfirmPassword
                                  || errorEmail
                                  || errorPassword
                                  || errorUsername
                                }
                              >
                                {isRegistering ? <div style={{ padding: '5px 0 5px 0' }}><Loading /></div> : this.language.get('Register')}
                              </Button>
                            </form>
                          </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                          <Col
                            xg
                            lg="5"
                            className="form register-div shadow-sm"
                            style={{
                              textAlign: 'center', marginTop: '20px', marginBottom: '50px', backgroundColor: 'white',
                            }}
                          >
                            {this.language.get('Already have account? ')}
                            <label
                              className="to-login"
                              htmlFor="login-now-text"
                            >
                              <div role="link" tabIndex={0} id="login-now-text" onClick={() => history.push('/login')}>{this.language.get('Login now')}</div>
                            </label>
                            <div className="mt-1">
                              {'Hoặc đăng nhập với '}
                              
                            </div>
                            {
                              socialLoginError
                              && (
                              <div className="login-error text-danger">
                                <p>{socialLoginError}</p>
                              </div>
                              )
                            }
                          </Col>
                        </Row>
                      </Container>
                    </Body>
                  </>
                );
              }}
            </AuthenticationContext.Consumer>
          );
        }
      }
      </LanguageContext.Consumer>
    );
  }
}

export default Register;
