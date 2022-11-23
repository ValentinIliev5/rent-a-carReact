import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { getLoggedUser } from '../../../utils/http-utils/auth-http-utils';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function UserCard({ user, onDelete}) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(user.id);
    }

    const navigateToUpdate = () => {
        navigate(`/users/edit/${user.id}`);
    }

    const renderActionButtons = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin && loggedUser.id !== user.id) {
            return <>
                <Button variant = "warning" onClick={navigateToUpdate} >Update</Button>
                <Button variant = "danger" onClick={onDeleteClicked}>Delete</Button>
            </>
        }

        if (loggedUser.id === user.id) {
            return <Button variant = "warning" onClick={navigateToUpdate} >Update</Button>;
        }
    }

    return (
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Img variant="top" src={user.photo} />
            <Card.Body>
                <Card.Title>
                    <Link to={`/profile/${user.id}`}>
                        {user.firstName} {user.lastName}
                    </Link>
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Address: {user.address}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email} </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {renderActionButtons()}
            </Card.Body>
        </Card>
    );
}