import React from 'react'
import { connect } from 'react-redux';
import { User } from '../models/user';
import { Link } from 'react-router-dom';
import axios from "axios"
import { Dispatch } from 'redux';
import { setUser } from '../redux/actions/setUserAction';

const Nav = (props: any) => {

  const handleLogout = async () => {
    await axios.post('logout');
    props.setUser(null)
  };

  let menu;

  if (props.user?.id) {
    menu = (
      <div className="col-md-4 text-end">
      <Link to={'/rankings'} className="btn">Rankings</Link>
      <Link to={'/stats'} className="btn me-2">Stats</Link>
      <Link to={'/'} className="btn btn-outline-primary me-2" onClick={handleLogout}>Logout</Link>
      <Link to={'/profile'} className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
    </div>
    )
  } else {
    menu = (
      <div className="col-md-3 text-end">
      <Link to={'/login'} className="btn btn-outline-primary me-2">Login</Link>
      <Link to={'/register'} className="btn btn-primary">Sign-up</Link>
    </div>
    )
  }





  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">

        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 link-secondary">Frontend</a></li>
          <li><a href="#" className="nav-link px-2">Backend</a></li>
        </ul>

        {menu}
      </header>
    </div>

)
}

const mapStateToProps = (state: {user: User}) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)