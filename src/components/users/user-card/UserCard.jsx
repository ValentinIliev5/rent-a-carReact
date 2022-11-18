import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./UserCard.scss";

export function UserCard({user})
{
return(
    <Card style = {{width:"17rem"}}>
        <Card.Img style={{height:"200px",width:'100%'}} variant ="top" src = {user.photo}/>
        <Card.Body>
            <Card.Title> {user.firstName} {user.lastName}</Card.Title>
            <Card.Text>
                    <span className='key'>Email: </span>
                    <span className='value'>{user.email}</span>
            </Card.Text>
            <Card.Text>
                    <span className='key'>Phone: </span>
                    <span className='value'>{user.phoneNumber}</span>
            </Card.Text>
            <div className='btnHolder'>
                <Button style={{margin:"3px"}} variant='warning'>Edit</Button>
                <Button style={{margin:"3px"}} variant='danger'>Delete</Button>
            </div>
        </Card.Body>
    </Card>
)
}