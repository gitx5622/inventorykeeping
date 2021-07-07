import React from 'react';
import "../../../styles/Footer/Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div><img className="foxx" src="/images/Footer/foxx.png" alt="foxx" width="70%"/>
            </div>
            <div className="links">
                <ul>
                    <h2>COMPANY</h2>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>FAQ</li>
                    <li>Terms</li>
                </ul>
            </div>
            <div className="links">
                <ul>
                    <h2>LEGAL</h2>
                    <li>Privacy Policy</li>
                    <li>Terms</li>
                    <li>Cookie Policy</li>
                    <li>Confidentiality Policy</li>
                </ul>
            </div>
            <div className="copyright"><span>© 2021. Foxx Projects. All Rights Reserved.</span></div>
        </div>
    );
};

export default Footer;