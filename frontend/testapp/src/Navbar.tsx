import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the props for Navbar, expecting an onLogout function
interface NavbarProps {
    onLogout: () => void;
  }

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">To Do App</a>
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                    <button className="btn btn-outline-danger" onClick={onLogout} type="button">Logout</button>
                {/* </div> */}
            </div>
        </nav>
    );
};

export default Navbar;

