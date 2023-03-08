
import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const selectSignUp = () => {
  return (
    <div>
        <Nav>
          <NavItem>
            <NavLink to="/sign-up-admin" className="nav-link">
             <p>Admin Sign up</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/sign-up" className="nav-link">
              Employee Sign up
            </NavLink>
          </NavItem>
        </Nav>
    </div>
  );
};
  
export default selectSignUp;