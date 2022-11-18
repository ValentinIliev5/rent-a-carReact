import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./VehicleCard.scss";

export function VehicleCard({vehicle})
{
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
            <div className='btnHolder'>
                <Button style={{margin:"3px"}} variant='primary'>Rent</Button>
                <Button style={{margin:"3px"}} variant='warning'>Edit</Button>
                <Button style={{margin:"3px"}} variant='danger'>Delete</Button>
            </div>
        </Card.Body>
    </Card>
)
}