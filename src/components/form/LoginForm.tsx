import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import './Form.css'
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginFormDataInterface} from './LoginFormDataInterface'
import {Spinner} from "react-bootstrap";
import {useAuth} from "../../contexts/authentication/AuthContext";
import {Alert} from "@mui/material";
import { logger } from "../../utilities/logger";

export function LoginForm() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const [showLoginSuccessMessage, setShowLoginSuccessMessage] = useState<boolean>(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormDataInterface>({
        email: "",
        password: "",
    })
    const { login } = useAuth();

    const signIn = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        try {
            await login(formData)
            setLoginSuccess(true)
            setShowLoginSuccessMessage(true)
        }catch (error) {
            setError({ message: (error as Error).message });
        }finally {
            setLoading(false)

        }
    };

    useEffect(() => {
        // After successful login, display the message and redirect after 3 seconds
        if (loginSuccess) {
            logger.info("Prihlásenie bolo úspešné. Prebieha presmerovanie na hlavnú stránku...");
            const timer = setTimeout(() => {
                setShowLoginSuccessMessage(false)
                navigate('/'); // Redirect to home page
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [loginSuccess, navigate]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <Card className="mx-auto" style={{ maxWidth: "36rem" }}>
            <Card.Body>
                {showLoginSuccessMessage ? (
                    <div className="success-message">
                        <Alert severity="success">Prihlásenie bolo úspešné. Prebieha presmerovanie na hlavnú stránku...</Alert>
                    </div>
                ) : (
                    <Form onSubmit={signIn}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label className='h6'>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange}
                                          placeholder="example@mail.com" required={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label className='h6'>Heslo</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange}
                                          placeholder="***************" required={true}/>
                        </Form.Group>

                        {error && <div className="error-message-div mb-3 mt-4">
                            <Alert severity="error" className="error-message ">
                                {error.message}</Alert>
                        </div>}

                        {loading ? (
                            <div className="form-submit-div">
                                <Spinner animation="border" className="spinner my-3" />
                            </div>

                        ) : (
                            <div className="form-submit-div">
                                <Button type="submit" className="form-submit-button my-3">Prihlásiť sa</Button>
                            </div>
                        )}
                    </Form>
                )}
            </Card.Body>
        </Card>
    );
}
