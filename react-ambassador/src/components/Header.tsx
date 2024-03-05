import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { User } from '../models/user'

const Header = (props: {user: User}) => {
  const [title, setTitle ] = useState('Welcome')
  const [description, setDescription ] = useState('Share links to earn money')

  useEffect(() => {
    if (props.user?.id) {
      setTitle(`$${props.user.revenue}`)
      setDescription(`You have earned this far`);
    } else {
      setTitle("Welcome")
      setDescription("Share links to earn money")
    }
  }, [props.user])

  let buttons;

  if (!props.user?.id) {
    buttons = (
      <p>
        <Link to={"/login"} className="my-2 btn btn-primary">Login</Link>
        <Link to={"/register"} className="my-2 btn btn-secondary">Register</Link>
      </p>
    )
  }

  return (
    <section className="container py-5 text-center">
      <div className="row py-lg-5">
        <div className="mx-auto col-lg-6 col-md-8">
          <h1 className="fw-light">{title}</h1>
          <p className="lead text-body-secondary">{description}</p>
            {buttons}
        </div>
      </div>
    </section>
)
}

const mapStateToProps = (state: {user: User}) => ({
  user: state.user
})

export default connect(mapStateToProps)(Header)