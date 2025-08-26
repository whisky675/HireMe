import React from "react";
import "../Styles/Footer.css"; // still using your existing CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} HireMe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
