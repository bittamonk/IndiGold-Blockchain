// import { useState } from "react"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "./App.css"
import "../../custom.css";
import logo from "../assets/logo-04.png";
import React from "react";

function LandingPage() {
    return (
      <div>
        <br />
        <img className="logo" src={logo}></img>
        <h1>Hello Blockchain App</h1>
      </div>
    );
    // <h1 className="text-3xl font-bold underline">Hello world!</h1>
  }
  
  export default LandingPage;