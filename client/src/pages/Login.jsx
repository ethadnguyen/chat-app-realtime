import { useContext } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';

const Login = () => {

    const {
        logout,
        login,
        loginInfo,
        updateLoginInfo,
        loginError,
        isLoginLoading
    } = useContext(AuthContext);

    const handleChange = (e) => {
        updateLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row style={{
                    height: '100vh',
                    justifyContent: 'center',
                    paddingTop: '10%'
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Đăng nhập</h2>

                            <Form.Control name='email' type='email' placeholder='Email' onChange={handleChange} />
                            <Form.Control name='password' type='password' placeholder='Mật khẩu' onChange={handleChange} />
                            <Button variant='primary' type='submit'>
                                {isLoginLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </Button>

                            {loginError?.error && <Alert variant='warning' className='custom-alert'>
                                <Alert.Heading>{loginError?.message}</Alert.Heading>
                            </Alert>}

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Login