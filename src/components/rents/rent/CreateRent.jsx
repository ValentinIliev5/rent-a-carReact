import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams, Navigate } from "react-router";
import { getLoggedUser } from "../../../utils/http-utils/auth-http-utils";
import { saveRent } from "../../../utils/http-utils/rent-requests";
import { getUserById, saveUser } from "../../../utils/http-utils/user-requests";
import { getVehicleById, saveVehicle} from "../../../utils/http-utils/vehicle-requests";

export function CreateRent(){

    const params = useParams();
    const navigate = useNavigate();

    const [rent,setRent] = useState({
        id:"",
        userId: `${getLoggedUser().id}`,
        vehicleId: `${params.id}`,
        startDate: "",
        endDate: "",
    });

    
    const [vehicle,setVehicle] = useState();
    const [user,setUser] = useState();

    useEffect(()=>{
        getVehicleById(params.id).then((vehicle)=>{
            setVehicle(vehicle.data);
        })
    },[]);
    useEffect(()=>{
        getUserById(getLoggedUser().id).then((user)=>{
            setUser(user.data);
        })
    },[]);

    const onSubmit = (event) =>{
        event.preventDefault();

        vehicle.available -=1;

        user.rents +=1;
        saveVehicle(vehicle);

        saveUser(user);
        console.log(vehicle);
        console.log(user);

        saveRent(rent,vehicle.price,user.isVip).then(()=>{
            navigate('/vehicles');
        });
    }

    const onFormControlChange = (event) =>{
        let value = event.target.value;

        setRent((prevState)=>{
            return{
                ...prevState,
                [event.target.name]:value
            };
        });
        console.log(rent);

    };
    const navigateIfNotLogged = () =>{
        const loggedUser = getLoggedUser();

        if(!loggedUser)
            return <Navigate to='/vehicles'/>
    }

    return(
        <div className="create-rent-wrapper">
            {navigateIfNotLogged()}
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Start Date</Form.Label>
                <Form.Control
                    required
                    type="date"
                    placeholder="Enter start of rent date"
                    onChange={onFormControlChange}
                    name="startDate"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>End Date</Form.Label>
                <Form.Control
                    required
                    type="date"
                    placeholder="Enter end of rent date"
                    onChange={onFormControlChange}
                    name="endDate"
                />
            </Form.Group>

                 <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    )

}