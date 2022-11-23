import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import { getLoggedUser } from '../../../utils/http-utils/auth-http-utils';

import "./VehicleCard.scss";

export function VehicleCard({vehicle , onDelete})
{
    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(vehicle.id);
    }

    const navigateToUpdate = () => {
        navigate(`/vehicles/edit/${vehicle.id}`);
    }

    const navigateToRent = () =>{
        navigate(`/rent/create/${vehicle.id}`);
    }

    const renderActionButtons = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin) {
            return <>
                <Button style={{margin:"3px"}} variant='warning' onClick={navigateToUpdate}>Edit</Button>
                <Button style={{margin:"3px"}} variant='danger' onClick={onDeleteClicked}>Delete</Button>
            </>
        }
    }

return(
    <Card style = {{width:"17rem"}}>
        <Card.Img style={{height:"200px",width:'100%'}} variant ="top" src = {vehicle.photo}/>
        <Card.Body>
            <Card.Title> {vehicle.brand } {vehicle.model}</Card.Title>
            <Card.Text>
                    <span className='key'>Year: </span>
                    <span className='value'>{vehicle.constructionYear}</span>
            </Card.Text>
            <Card.Text>
                    <span className='key'>Type: </span>
                    <span className='value'>{vehicle.vehicleType}</span>
            </Card.Text>
            <Card.Text>
                    <span className='key'>Fuel: </span>
                    <span className='value'>{vehicle.fuelType}</span>
            </Card.Text>
            <Card.Text>
                    <span className='key'>Seats: </span>
                    <span className='value'>{vehicle.seats}</span>
            </Card.Text>
            <Card.Text>
                    <span className='key'>Available: </span>
                    <span className='value'>{vehicle.available}</span>
            </Card.Text>
            <Card.Text>
                    <span className='key'>Price: </span>
                    <span className='value'>{vehicle.price}$</span>
            </Card.Text>
            <div className='btnHolder'>
                <Button onClick={navigateToRent} style={{margin:"3px"}} variant='primary'>Rent</Button>
                {renderActionButtons()}
            </div>
        </Card.Body>
    </Card>
)
}