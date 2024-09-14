import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: '',
    isError: false,
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: errorMsg, isError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <label className="user-input-label" htmlFor="userPassword">
          PASSWORD
        </label>
        <input
          type="password"
          className="user-input-value"
          placeholder="Password"
          id="userPassword"
          value={password}
          onChange={this.changePassword}
        />
      </>
    )
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="user-input-label" htmlFor="userInput">
          USERNAME
        </label>
        <input
          type="text"
          className="user-input-value"
          placeholder="Username"
          id="userInput"
          onChange={this.changeUsername}
          value={username}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, isError} = this.state
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.submitForm} className="form-container">
            <div className="user-input-container">
              {this.renderUserNameField()}
            </div>
            <div className="user-input-container">
              {this.renderPasswordField()}
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError && <p className="error-message-text">{showErrorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
