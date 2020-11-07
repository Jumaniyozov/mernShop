import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import FormContainer from "../components/FormContainer.component";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message.component";
import Loader from "../components/Loader.component";
import {getUserDetails, updateUser} from "../redux/user/user.action";
import {USER_UPDATE_RESET} from "../redux/user/user.types";

const UserEditPage = ({match, history}) => {
    const userID = match.params.id;
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;


    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else {

            if (!user.name || user._id !== userID) {
                dispatch(getUserDetails(userID));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, dispatch, userID, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id: userID, name, email, isAdmin}))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
                {loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (


                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name Address</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        value={isAdmin}
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    />
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Updates
                                </Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    );
};

export default UserEditPage;
