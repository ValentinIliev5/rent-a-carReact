import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router";
import { useEffect } from 'react';
import { getLoggedUser } from '../../../utils/http-utils/auth-http-utils';
import { getVehicleById, saveVehicle } from "../../../utils/http-utils/vehicle-requests";
import { Form }  from "react-bootstrap";
import Button from "react-bootstrap/Button"
import "./VehicleForm.scss"

export function VehicleForm(){

    const VehicleFuelTypes = {
        ELECTRIC: 'Electric',
        HYBRID: 'Hybrid',
        PETROL: 'Petrol',
        DIESEL: 'Diesel',
      };
    
      const VehicleTypes = {
        ECONOMY: 'Economy',
        ESTATE: 'Estate',
        LUXURY: 'Luxury',
        SUV: 'SUV',
        CARGO: 'Cargo',
      };
    
      const params = useParams();
      const navigate = useNavigate();
      const [currentVehicle, setVehicle] = useState({
        photo: '',
        brand: '',
        model: '',
        constructionYear: '',
        vehicleType: '',
        fuelType: '',
        seats: '',
        price: '',
        available: '',
      });
    
      useEffect(() => {
        if (params.id) {
          getVehicleById(params.id).then((vehicle) => {
            setVehicle(vehicle.data);
          });
        }
      }, [params.id]);
    
      const onSubmit = (event) => {
        event.preventDefault();
    
        saveVehicle(currentVehicle).then(() => {
          navigate('/vehicles');
        });
      };
    
      const onFormControlChange = (event) => {
        let value = event.target.value;
        if (event.target.name === 'isActive') {
          value = event.target.checked;
        }
    
        setVehicle((prevState) => {
          return {
            ...prevState,
            [event.target.name]: value,
          };
        });
      };

    const navigateIfNotAdmin = () =>{
        const loggedUser = getLoggedUser();

        if(loggedUser && !loggedUser.isAdmin)
            return <Navigate to='/vehicles'/>
    }
    return (
        <div className="vehicle-form-wrapper">

            {navigateIfNotAdmin()}
            
            <Form className="vehicle-form" onSubmit={onSubmit}>
            <h2> {currentVehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}</h2>

                

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                    required
                    value={currentVehicle.brand}
                    type="text"
                    placeholder="Enter brand name"
                    onChange={onFormControlChange}
                    name="brand"
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  required
                  value={currentVehicle.model}
                  type="text"
                  placeholder="Enter model"
                  onChange={onFormControlChange}
                  name="model"
                />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Construction Year</Form.Label>
                    <Form.Control
                     required
                     value={currentVehicle.constructionYear}
                     onChange={onFormControlChange}
                     name="constructionYear"
                     type="number"
                     placeholder="Enter year"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                 required
                 aria-label="Car type"
                 placeholder="Select Car Type"
                 name="vehicleType"
                 value={currentVehicle.vehicleType}
                 onChange={onFormControlChange}
                >
              {Object.keys(VehicleTypes).map((type) => (
                <option key={type} value={VehicleTypes[type]}>
                  {VehicleTypes[type]}
                </option>
              ))}
            </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Fuel type</Form.Label>
                <Form.Select
                  required
                  aria-label="Fuel type"
                  placeholder="Select Fuel Type"
                  name="fuelType"
                  value={currentVehicle.fuelType}
                  onChange={onFormControlChange}
                >
              {Object.keys(VehicleFuelTypes).map((type) => (
                <option key={type} value={VehicleFuelTypes[type]}>
                  {VehicleFuelTypes[type]}
                </option>
              ))}
            </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control
                      required
                      value={currentVehicle.seats}
                      onChange={onFormControlChange}
                      name="seats"
                      type="number"
                      placeholder="Enter Number Of Seats"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="photo" 
                    placeholder = "Enter photo link" 
                    onChange={onFormControlChange} 
                    value={currentVehicle.photo}/>  
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Available cars</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="available" 
                    value={currentVehicle.available}
                    placeholder = "Available cars" 
                    onChange={onFormControlChange} required/>  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  value={currentVehicle.price}
                  onChange={onFormControlChange}
                  name="price"
                  type="number"
                  placeholder="Enter Price Per Day"
                />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {currentVehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}
                </Button>

            </Form>
        </div>
    )
}