import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getLoggedUser } from "../../../utils/http-utils/auth-http-utils";
import { deleteRent, getRentById, getRents, saveFullRent, saveRent, updateRent } from "../../../utils/http-utils/rent-requests";
import { getUserById } from "../../../utils/http-utils/user-requests";
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

    const [rentToCancel,setRentToCancel] = useState();

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

                console.log(rentToCancel);
                console.log(vehicle.data);

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

                {rent.isActive?<button className="cancel" onClick={onCancel}>Cancel</button>:""}
                <button className="edit" onClick={onEdit}>Edit</button>
                <button className="delete" onClick={onDelete}>Delete</button>
                
                
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
                console.log(rent);
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
            {rent.isActive?<button className="cancel" onClick={onCancel}>Cancel</button>:""}
                <button className="edit" onClick={onEdit}>Edit</button>
                <button className="delete" onClick={onDelete}>Delete</button>
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
        
        