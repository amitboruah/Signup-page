import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/Style.css";

export default function Exist() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const userExist = () => {
    setIsSubmit(true);
    if (isSubmit) {
      navigate("/");
    }
  };

  return (
    <div className="SecondBody">
      <div className="container text-center w-50">
        <p className=" header">User already Exist</p>
        <button className="btn btn-outline-primary" onClick={userExist}>
          Add another User
        </button>
      </div>
    </div>
  );
}
