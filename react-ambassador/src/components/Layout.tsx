import React, { useEffect, useState } from 'react'
import Nav from "./Nav"
import Header from "./Header"
import axios from 'axios';
// import { Navigate } from 'react-router-dom';
import { setUser } from '../redux/actions/setUserAction';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { Dispatch } from "redux"
import { useLocation } from 'react-router-dom';

const Layout = (props: any) => {

  // const [redirect, setRedirect] = useState(false);
  const location = useLocation()

  useEffect(() => {
  (
      async () => {
          try {
              const { data } = await axios.get("user");
              console.log(data)
              props.setUser(data)
          } catch (e) {
              // setRedirect(true)
          }
      }
  )();
  }, []);

  let header;

  if (location.pathname === '/' || location.pathname === '/backend') {
    header = <Header />
  }

  return (

    <div>
  <Nav/>
  <main>
    {header}

    <div className="album py-5 bg-body-tertiary">
      <div className="container">
            {props.children}    
      </div>
    </div>
  </main>
</div>

  )
}

const mapStateToProps = (state: {user: User}) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
