import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { getLoggedUser } from "../../../utils/http-utils/auth-http-utils";
import { deleteRent, getRents, updateRent } from "../../../utils/http-utils/rent-requests";
import { getVehicleById, saveVehicle } from "../../../utils/http-utils/vehicle-requests";

export function RentList(){
    const navigate = useNavigate();

    const [rents,setRents] = useState([]);
    useEffect(()=>{
        getRents().then((response)=>{
            setRents(response.data);
        });

        if(!getLoggedUser().isAdmin){
            setRents((allRents)=>{
                return allRents.filter(r=>r.userId == getLoggedUser().id)
            })
        }
    },[]);

    const renderTableBody = () =>{
        if(!getLoggedUser().isAdmin)
        return rents.filter(r=>r.userId == getLoggedUser().id).map(rent =>{
            const onEdit = () =>{
                navigate(`/rent/edit/${rent.id}`);
            }

            const onDelete = () =>{
                deleteRent(rent.id).then(()=>{
                    setRents((allRents) =>{
                        return allRents.filter(r=>r.id !== rent.id);
                    });
                });
            }
            const onCancel = async () =>{
                console.log(rent);

                const [vehicle] = await Promise.all(
                    [
                    getVehicleById(rent.vehicleId)
                    ]
                    
                );
                rent.isActive=false;

                vehicle.data.available+=1;

                updateRent(rent).then(saveVehicle(vehicle.data));
                
            }

        return <tr key= {rent.id}>
            <td>{rent.id}</td>
            <td>{getLoggedUser().id==rent.userId ? `You` : `User ${rent.userId}`}</td>
            <td>{rent.vehicleId}</td>
            <td>{rent.startDate}</td>
            <td>{rent.endDate}</td>
            <td>{rent.totalPrice}</td>
            {rent.isActive?<td>Active</td>:<td>Canceled</td>}
            <td className="action-buttons">

                {rent.isActive?<Button style={{margin:'3px'}} className="cancel" variant ="light" onClick={onCancel}>Cancel</Button>:""}

                <Button className="edit" variant ="warning" onClick={onEdit}>Edit</Button>

                {getLoggedUser.isAdmin?<Button className="delete" variant ="danger" onClick={onDelete}>Delete</Button> : ""}
                
                
            </td>
        </tr>

        })
        else return rents.map(rent =>{
            const onEdit = () =>{
                navigate(`/rent/edit/${rent.id}`);
            }

            const onDelete = () =>{
                deleteRent(rent.id).then(()=>{
                    setRents((allRents) =>{
                        return allRents.filter(r=>r.id !== rent.id);
                    });
                });
            }
            const onCancel = async () =>{

                rent.isActive=false;
                const [vehicle] = await Promise.all(
                    [
                    getVehicleById(rent.vehicleId)
                    ]
                    
                );
                vehicle.data.available+=1;
                saveVehicle(vehicle.data);
                updateRent(rent);

            }

        return <tr key= {rent.id}>
            <td>{rent.id}</td>
            <td>{getLoggedUser().id==rent.userId ? `You` : `User ${rent.userId}`}</td>
            <td>{rent.vehicleId}</td>
            <td>{rent.startDate}</td>
            <td>{rent.endDate}</td>
            <td>{rent.totalPrice}</td>
            {rent.isActive?<td>Active</td>:<td>Canceled</td>}
            <td className="action-buttons">

            {rent.isActive?<Button  className="cancel" variant ="light" onClick={onCancel}><Link to="/vehicles">Cancel</Link></Button>:""}

                <Button className="edit" variant ="warning" onClick={onEdit}>Edit</Button>

                <Button className="delete" variant ="danger" onClick={onDelete}>Delete</Button>
            </td>
        </tr>
        })
    }

    return (
        <div className="tasks-list">
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>User</td>
                        <td>Vehicle ID</td>
                        <td>Start Date</td>
                        <td>End Date</td>
                        <td>Price</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </Table>
        </div>
    );
}
        
        