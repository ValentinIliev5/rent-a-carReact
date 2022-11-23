import "./App.css";
import {Layout} from "./components/layout/Layout";
import { Routes, Route } from 'react-router';
import { UserList } from './components/users/user-list/UserList';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/auth/login/Login';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { Register } from './components/auth/register/Register';
import { UserProfile } from './components/users/user-profile/UserProfile';
import { VehicleList } from './components/vehicles/vehicle-list/VehicleList';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';

function App() {
  return (
  <div className="App">
    <Routes>
        <Route path="/login" element={<NonAuthenticatedRoute> <Login /> </NonAuthenticatedRoute>} />
        <Route path="/register" element={<NonAuthenticatedRoute> <Register /> </NonAuthenticatedRoute>} />
        <Route path="/" element={<AuthenticatedRoute> <Layout /> </AuthenticatedRoute>} >
          
          <Route path="users" element={<UserList />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="vehicles/create" element={<VehicleForm />} />
          <Route path="vehicles/edit/:id" element={<VehicleForm />} />
          <Route path="profile/:id" element={<UserProfile />} />
        </Route>
      </Routes>
  </div>
  )
}

export default App;
