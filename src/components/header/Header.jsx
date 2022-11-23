import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getLoggedUser } from '../../utils/http-utils/auth-http-utils';
import { Button } from 'react-bootstrap';

export function Header() {

    const navigate = useNavigate();

    const onLogout = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const renderAdminLinks = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin) {
            return <div>
                <Button variant="light">
                    <Link className="nav-link" to="/users/create">Create user</Link>
                </Button>
                <Button variant="light">
                    <Link className="nav-link" to="/vehicles/create">Create vehicle</Link>
                </Button>
            </div>
        }
    }

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Rent a car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            
                            <Button variant="light"><Link className="nav-link" to="/users">Users</Link></Button>

                            <Button variant="light"><Link className="nav-link" to="/vehicles">Vehicles</Link></Button>

                            <Button variant="light"><Link className="nav-link" to="/rents">Rents</Link></Button>
                            {renderAdminLinks()}
                        </Nav>

                        <span>
                            Hello, {getLoggedUser().email}!
                        </span>
                        <Button variant="light">
                            <Link className="nav-link" onClick={onLogout} > Logout </Link>
                        </Button>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}