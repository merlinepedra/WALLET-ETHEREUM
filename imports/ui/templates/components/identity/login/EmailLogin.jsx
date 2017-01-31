import React, { Component } from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import Warning from '../../../widgets/warning/Warning.jsx';
import Signup from '../signup/Signup.jsx';
import ForgotPassword from './ForgotPassword.jsx';

export default class EmailLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: true,
      passwordKnown: true,
    };

    this.handleLoginRender = this.handleLoginRender.bind(this);
    this.handleForgotPasswordRender = this.handleForgotPasswordRender.bind(this);
  }

  handleLoginRender() {
    this.setState({ loginScreen: !(this.state.loginScreen) });
  }

  handleForgotPasswordRender() {
    this.setState({ passwordKnown: !(this.state.passwordKnown) });
  }

  render() {
    if (this.state.loginScreen === true) {
      if (this.state.passwordKnown === true) {
        return (
          <div className="login">
            <div className="w-form">
              <form id="email-signin-form" name="email-form-3" data-name="Email Form 3">
                <div className="w-clearfix login-field">
                  <label htmlFor="name" className="login-label login-label-form">{TAPi18n.__('email-username')}</label>
                  <img src="/images/mail-closed.png" className="login-icon" alt="mail-closed" />
                  <input id="signin-email" type="text" placeholder={TAPi18n.__('email-sample')} className="w-input login-input" />
                </div>
                <div className="w-clearfix login-field">
                  <label htmlFor="name" className="login-label login-label-form">{TAPi18n.__('password')}</label>
                  <img src="/images/lock.png" className="login-icon" alt="lock" />
                  <input id="signin-password" type="password" placeholder={TAPi18n.__('password-sample')} className="w-input login-input" />
                </div>
                <button type="submit" id="signin-button" className="button login-button">
                  <div>{TAPi18n.__('sign-in')}</div>
                </button>
              </form>
            </div>
            <div>
              <a id="forgot-pw" onClick={this.handleForgotPasswordRender}>{TAPi18n.__('forgot-password')}</a>
            </div>
            <div>
              {TAPi18n.__('dont-have-account')} <a id="signup" onClick={this.handleLoginRender}>{TAPi18n.__('sign-up')}</a>.
            </div>
          </div>
        );
      } else if (this.state.passwordKnown === false) {
        return (<ForgotPassword onClick={this.handleForgotPasswordRender} />);
      }
    } else if (this.state.loginScreen === false) {
      return (<Signup onClick={this.handleLoginRender} />);
    }
  }
}
