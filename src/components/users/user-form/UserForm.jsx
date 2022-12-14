import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { saveUser, getUserById } from '../../../utils/http-utils/user-requests';
import { useNavigate, useParams, Navigate } from 'react-router';
import { useEffect } from 'react';

import './UserForm.scss';
import { parseBool } from '../../../utils/http-utils/bool-utils';
import { getLoggedUser } from '../../../utils/http-utils/auth-http-utils';

export function UserForm() {
    const emptyUser = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        photo: '',
        isAdmin: false
    };
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getUserById(params.id)
                .then((response) => {
                    setCurrentUser(response.data);
                })
        } else {
            setCurrentUser(emptyUser);
        }
    }, [params.id]);

    const onCheckboxChange = (event) => {
        setCurrentUser((prevState) => {
            return {
                ...prevState,
                isAdmin: event.target.checked.toString()
            }
        })
    }

    const onFormControlChange = (event) => {
        const target = event.target;
        let prop = 'value';
        if (target.name === 'isAdmin')
            prop = 'checked';

        setCurrentUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(currentUser);
        saveUser(currentUser).then(() => {
            navigate('/users');
        }).catch(error => {
            setError(error.message);
        });
    }

    const renderIsAdminControl = () => {
        const loggedUser = getLoggedUser();

        if (!loggedUser || !loggedUser.isAdmin || loggedUser.id === currentUser.id)
            return '';
        return <>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Is Admin</Form.Label>
            <Form.Check name="isAdmin" onChange={onCheckboxChange} checked={parseBool(currentUser.isAdmin)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Is Vip</Form.Label>
            <Form.Check name="isVIP" onChange={onCheckboxChange} checked={parseBool(currentUser.isVip)} />
        </Form.Group>
        </>
    }

    const navigateIfNotAdmin = () => {
        const loggedUser = getLoggedUser();
        
        if(loggedUser.id==params.id)
        {
            return <Navigate to={`/users/edit/${loggedUser.id}`}/>
        }

        if (loggedUser && !loggedUser.isAdmin)
            return <Navigate to='/users' />
    }

    return (
        <div className="user-form-wrapper">

            {navigateIfNotAdmin()}

            <Form className="user-form" onSubmit={onSubmit}>
                
                <span className="text-danger">{error}</span>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={onFormControlChange} value={currentUser.firstName} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={onFormControlChange} value={currentUser.lastName} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={onFormControlChange} value={currentUser.email} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter Address" onChange={onFormControlChange} value={currentUser.address} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentUser.password} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentUser.photo} />
                </Form.Group>

                {renderIsAdminControl()}

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    );
}