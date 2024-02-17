import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <div className="header" style={{ background: "black" }}>
        <div>
          <Link to="/dashboard">
            <img
              src="logo.png"
              alt="logo"
              style={{
                width: "8%",
                height: "auto",
                cursor: "pointer",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
