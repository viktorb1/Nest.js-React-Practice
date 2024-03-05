import React, { Component, SyntheticEvent } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    passwordConfirm = ''
    state = {
        redirect: false
    }
    

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:8000/api/admin/register', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.passwordConfirm
        });

        this.setState({
            redirect: true
        })
    }

    render(): React.ReactNode {
        if (this.state.redirect) {
            // return <Redirect to={'/login'} />
            return <Navigate to={'/login'} />
        }

        return (
            <form className="form-signin" onSubmit={this.submit}>
                <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
                
                <label hidden htmlFor="inputEmail" className="sr-only">First Name</label>
                <input className="form-control" placeholder="First Name" required autoFocus onChange={e => this.firstName = e.target.value}/>

                <label hidden htmlFor="inputEmail" className="sr-only">Last Name</label>
                <input className="form-control" placeholder="Last Name" required onChange={e => this.lastName = e.target.value}/>

                <label hidden htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required onChange={e => this.email = e.target.value}/>

                <label hidden htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" className="form-control" placeholder="Password" required onChange={e => this.password = e.target.value}/>

                <label hidden htmlFor="inputPasswordConfirm" className="sr-only">Password Confirm</label>
                <input id="password_confirm" type="password" className="form-control" placeholder="Password Confirm" required onChange={e => this.passwordConfirm = e.target.value}/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>
        )
    }
}

export default Register;