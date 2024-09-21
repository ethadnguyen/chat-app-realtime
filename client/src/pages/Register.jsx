import { useContext } from 'react'
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
    const { registerInfo, updateRegisterInfo, register, registerError, isRegisterLoading } = useContext(AuthContext);

    const handleChange = (e) => {
        updateRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register();
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
                            <h2>Đăng ký</h2>

                            <Form.Control name='name' type='text' placeholder='Tên' onChange={handleChange} />
                            <Form.Control name='email' type='email' placeholder='Email' onChange={handleChange} />
                            <Form.Control name='password' type='password' placeholder='Mật khẩu' onChange={handleChange} />
                            <Button variant='primary' type='submit'>
                                {isRegisterLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
                            </Button>
                            {
                                registerError?.error && <Alert variant='warning' className='custom-alert'>
                                    <Alert.Heading>{registerError?.message}</Alert.Heading>
                                </Alert>
                            }
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Register