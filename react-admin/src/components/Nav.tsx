import React from 'react';
import { User } from '../models/user';
import {Link} from "react-router-dom"
import axios from "axios"
import { connect } from 'react-redux';

const Nav = (props: {user: User | null}) => {
    // const logout = async () => {
    //   await axios.post("logout");
    // }

    return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Company name</a>

        <ul className="my-2 my-md-0 mr-md-3">
            <Link to={'/profile'} className="p-2 text-white text-decoration-none">{props.user?.first_name} {props.user?.last_name}</Link>
            <Link to={'/login'} className="p-2 text-white text-decoration-none"
              // onClick={logout}
              onClick={async () => await axios.post('logout')}
            >Sign out</Link>
        </ul>
    </nav>
    )
}

const mapStateToProps = (state: {user: User}) => ({
    user: state.user
})

export default connect(mapStateToProps)(Nav);
// export default Nav;