import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {FaRegEnvelope} from 'react-icons/fa'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import './index.css'

const Header = props => {
  const clickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <div className="header-large-nav-container">
        <Link to="/" className="header-large-nav-links">
          <p className="header-large-nav-route">Home</p>
        </Link>
        <Link to="/jobs" className="header-large-nav-links">
          <p className="header-large-nav-route">Jobs</p>
        </Link>
      </div>
      <div className="header-small-nav-container">
        <Link to="/" className="nav-small-links">
          <IoMdHome className="nav-small-image" />
        </Link>
        <Link to="/jobs" className="nav-small-links">
          <FaRegEnvelope className="nav-small-image" />
        </Link>
        <button
          className="nav-small-logout"
          type="button"
          onClick={clickLogout}
        >
          <RiLogoutBoxRLine className="nav-small-logout-image" />
        </button>
      </div>
      <button
        className="header-large-button"
        type="button"
        onClick={clickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
