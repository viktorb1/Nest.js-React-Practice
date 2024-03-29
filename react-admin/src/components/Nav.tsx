import React from 'react';
import { User } from '../models/user';
import {Link} from "react-router-dom"
import axios from "axios"
import { useSelector } from 'react-redux';

const Nav = (props: any) => {
    // const logout = async () => {
    //   await axios.post("logout");
    // }
    const {user} = useSelector((state: {userlol2: {user: User}}) => state.userlol2);

    
    return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Company name</a>

        <ul className="my-2 my-md-0 mr-md-3">
            <Link to={'/login'} className="p-2 text-white text-decoration-none"
            <Link to={'/profile'} className="p-2 text-white text-decoration-none">{user.first_name} {user.last_name}</Link>
              // onClick={logout}
              onClick={async () => await axios.post('logout')}
            >Sign out</Link>
        </ul>
    </nav>
    )
}

// const mapStateToProps = (state: {user: User}) => ({
//     user: state.user
// })

// export default connect(mapStateToProps)(Nav);
export default Nav;