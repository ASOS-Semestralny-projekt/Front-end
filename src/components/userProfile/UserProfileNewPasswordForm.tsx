import {Button, Form, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import {ChangePasswordInterface} from "./ChangePasswordInterface.ts";

const UserProfilePasswordForm = () => {

    //control loading after submit
    const [loading, setLoading] = useState<boolean>(false);

    const [passwords, setPasswords] = useState<ChangePasswordInterface>({
        old_password: "",
        new_password: "",
        new_password_confirm: "",
    });

    // Handle input change and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };

    const handleButtonClick = () => {
        setLoading(true)
        setTimeout(() => {
            console.log("Passwords:", passwords);
            setLoading(false);
        }, 2000);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupOldPassword">
                <Form.Label className='h6'>Staré heslo</Form.Label>
                <Form.Control type="password" name="old_password" value={passwords.old_password}
                              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNewPassword">
                <Form.Label className='h6'>Nové heslo</Form.Label>
                <Form.Control type="password" name="new_password" value={passwords.new_password}
                              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNewPasswordConfirm">
                <Form.Label className='h6'>Potvrdenie nového hesla</Form.Label>
                <Form.Control type="password" name="new_password_confirm" value={passwords.new_password_confirm}
                              onChange={handleChange} />
            </Form.Group>
            {loading ? (
                <Spinner animation="border" className="spinner my-3" />
            ) : (
                <Button type="button" onClick={handleButtonClick} className="user-profile-button my-3">
                    Zmeniť heslo</Button>
            )}

        </Form>
    );
}

export default UserProfilePasswordForm;