import { useContext } from 'react';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import Notification from './chat/Notification';
const NavBar = () => {
    const { user, logout } = useContext(AuthContext);


    return (
        <Navbar bg='dark' className='mb-4' style={{ height: '3.75rem' }}>
            <Container>
                <h2>
                    <Link to='/' className='link-light text-decoration-none'>
                        EthadChat
                    </Link>
                </h2>
                {user && (
                    <span className='text-warning'>
                        Tài khoản: <strong>{user?.name}</strong>
                    </span>
                )
                }
                <Nav>
                    <Stack direction='horizontal' gap={3}>
                        {user ? (
                            <>
                                <Notification />
                                <Link to='/login'
                                    onClick={() => logout()}
                                    className='link-light text-decoration-none'>
                                    Đăng xuất
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/login' className='link-light text-decoration-none'>Đăng nhập</Link>
                                <Link to='/register' className='link-light text-decoration-none'>Đăng ký</Link>
                            </>
                        )}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar