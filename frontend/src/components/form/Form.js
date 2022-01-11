import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Style.css";

export default function Form() {
  // rrd6 history repacement
  const navigate = useNavigate();

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const regex = /\S+@\S+\.\S+/;
  
  // ** store value in state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const {
    firstName,
    lastName,
    email,
    gender,
    password,
    address,
    city,
    state,
    country,
    zip,
  } = user;

  let name, value;
  const handleInput = (e) => {
    console.log(user);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    setFromErrors(validate(user));

    // check if the data is empty or not

    if (
      firstName &&
      lastName &&
      email &&
      gender &&
      password &&
      address &&
      city &&
      state &&
      country &&
      zip !== "" &&
      password.length>=6 &&
      regex.test(email) === true &&
      zip=== Number
    ) {
      await fetch("/api/form/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          gender,
          password,
          address,
          city,
          state,
          country,
          zip,
        }),
      })
        .then(async (response) => {
          console.log(response);
          if(response.status === 400) {
            var errorJSONSTR = await response.text();
            var errorJSONObj = JSON.parse(errorJSONSTR);
            if(errorJSONObj.errorCode === 255) {

              // alert("User Already Exist");
              
              navigate("/userExist")
            } else {
              alert('Some Error Occured!');
            }
            return;
          }

          navigate("/success");

          // clear the form

          setUser({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            password: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zip: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } 
    // else {
    //   // alert("Please Fill All The Data");
    // }
  };

  // to check if form is not empty

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).lenght === 0 && isSubmit) {
    }
  });

  const validate = (value) => {
    const errors = {};

    if (!value.firstName) {
      errors.firstName = "First name is required";
    }

    if (!value.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!value.gender) {
      errors.gender = "Gender is required";
    }

    if (!value.email) {
      errors.email = "Email is required";
    } else if (!regex.test(value.email)) {
      errors.email = "Enter valid Email Address";
    }

    if (!value.password) {
      errors.password = "Password is required";
    } else if (value.password.length < 6) {
      errors.password = "Password must be 6 digit or more";
    }

    if (!value.address) {
      errors.address = "Address is required";
    }

    if (!value.city) {
      errors.city = "city is required";
    }

    if (!value.state) {
      errors.state = "state is required";
    }

    if (!value.country) {
      errors.country = "country is required";
    }

    if (!value.zip) {
      errors.zip = "zip-code is required";
    }else if (value!== Number) {
      errors.zip = "Enter valid zip-code";
    }

    return errors;
  };

  return (
    <div className="body ">
      <div className="container w-50 h-100">
        <p className="text-center header">Signup Form</p>
        <form className="row g-3 pt-4" method="POST">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={handleInput}
              placeholder="Enter First Name"
            ></input>
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={user.lastName}
              onChange={handleInput}
              placeholder="Enter Last Name"
            />
          </div>

          <p className="error col-md-6">{formErrors.firstName}</p>
          <p className="error  col-md-6">{formErrors.lastName}</p>

          <fieldset className="row mb-3 pt-4">
            <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInput}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInput}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </fieldset>

          <p className="error col-md-6">{formErrors.gender}</p>

          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter valid Email-id"
            />
          </div>

          <p className="error col-md-6">{formErrors.email}</p>

          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Minimum 6 character"
            />
          </div>

          <p className="error col-md-6">{formErrors.password}</p>

          <div className="col-12">
            <label className="form-label ">Address</label>
            <textarea
              type="text"
              className="form-control "
              rows="2"
              name="address"
              value={user.address}
              onChange={handleInput}
              placeholder="House number, apartment name, street, locality"
            />
          </div>

          <p className="error col-md-12">{formErrors.address}</p>

          <div className="col-md-3">
            <label className="form-label">City</label>
            <select className="form-select" onChange={handleInput} name="city">
              <option selected>Choose City..</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="surat">surat</option>
              <option value="Mehsana">Mehsana</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">State</label>
            <select className="form-select" onChange={handleInput} name="state">
              <option selected>Choose State..</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Goa">Goa</option>
              <option value="Kerela">Kerela</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              onChange={handleInput}
              name="country"
            >
              <option selected>Choose Country..</option>
              <option value="India">India</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Zip-Code</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              value={user.zip}
              onChange={handleInput}
              placeholder="zip/pin code"
            />
          </div>
          
          <p className="error col-md-3">{formErrors.city}</p>

          <p className="error col-md-3">{formErrors.state}</p>

          <p className="error col-md-3">{formErrors.country}</p>

          <p className="error col-md-3">{formErrors.zip}</p>

          <div className="text-center" id="button">
            <button
              type="submit"
              className="btn btn-outline-primary "
              onClick={postData}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
