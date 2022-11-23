import { useEffect } from "react";
import { useState } from "react";
import { getRentById, saveFullRent } from "../../../utils/http-utils/rent-requests";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams, Navigate } from "react-router";
import { getLoggedUser } from "../../../utils/http-utils/auth-http-utils";

export function EditRent(){
    const params = useParams();
    const navigate = useNavigate();

    const [rent,setRent] = useState({
        id:"",
        userId: `${getLoggedUser().id}`,
        vehicleId: `${params.id}`,
        startDate: "",
        endDate: "",
        totalPrice:"",
        isActive:false
    });

    useEffect(()=>{
        getRentById(params.id).then((rent)=>{
            setRent(rent.data);
        })
    },[])

    const onSubmit = (event) =>{
        event.preventDefault();

        saveFullRent(rent).then(()=>{
            navigate("/rents");
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
                    value={rent.startDate}
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
                    value={rent.endDate}
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
