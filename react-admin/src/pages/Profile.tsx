import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';
import { Dispatch } from 'redux';

const Profile = (props: any) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        (
            async () => {
                    // const { data } = await axios.get("user");
                    setFirstName(props.user.first_name)
                    setLastName(props.user.last_name)
                    setEmail(props.user.email)
            }
        )();
        }, [props.user]);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const {data} = await axios.put("users/info", {
            first_name,
            last_name,
            email
        })

        props.setUser(data)

    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await axios.put('users/password', {
            password,
            password_confirm
        })
    }

    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <TextField label="First Name" onChange={e => setFirstName(e.target.value)} value={first_name} />
                </div>
                <div className="mb-3">
                    <TextField label="Last Name" onChange={e => setLastName(e.target.value)} value={last_name} />
                </div>
                <div className="mb-3">
                    <TextField label="Email" onChange={e => setEmail(e.target.value)} value={email} />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <TextField label="Password" type="password" onChange={e => setPassword(e.target.value)} value={password} />
                </div>
                <div className="mb-3">
                    <TextField label="Password Confirm" type="password" onChange={e => setPasswordConfirm(e.target.value)} value={password_confirm}  />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Layout>
    )
}


const mapStateToProps = (state: {user: User}) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default Profile;