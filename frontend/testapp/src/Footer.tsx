import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="footer fixed-bottom bg-light">
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
                <span className="text-center">
                    Made with <span style={{ color: "red" }}>❤️</span> by Alana © 2024
                </span>
            </div>
        </footer>
    );
};

export default Footer;

