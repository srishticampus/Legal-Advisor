import React, { useState } from 'react'
import LandingNavbar from '../LandingPage/LandingNavbar'
import './AdvocateReg.css'
import img1 from "../../Assets/adv4.avif"
import { Link } from 'react-router-dom';

function AdvcateReg() {

  const [data, setData] = useState({
    fname: '',
    lname: '',
    contact: '',
    email: '',
    city: '',
    state:'',
    district: '',
    password: '',
    regno: ''
  });
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    contact: '',
    email: '',
    city: '',
    state:'',
    district: '',
    password: '',
    regno: ''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));

    

  };
  const validateField = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return '';
  }
  const validateField2 = (fieldName, value) => {
    if (value.length>0) {
      return `${fieldName} is required`;
    }
    return '';
  }
  const validateContact = (fieldName, value) => {
    if (!value.trim()) {
      console.log("val",value);
      return `${fieldName} is required`;
    }
    else if(value.length!=10)
     return `Please enter a valid Contact Number `;

    return '';
  };

  const handleSubmit = (event) => {
    console.log("worked");
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    errors.email = validateField('Email', data.email);
    errors.password = validateField('Password', data.password);
    errors.fname = validateField('First Name', data.fname);
    errors.contact = validateContact('Contact', data.contact);
    errors.city = validateField('City', data.city);
    errors.city = validateField('State', data.state);

    errors.district = validateField('District', data.district);
    errors.regno = validateField('Register Number', data.regno);



    setErrors(errors);

    if (formIsValid) {
      console.log("data", data);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='advocateRegistrationmaindiv'>

          <div className='advocateRegistrationimgdiv'>
            <img src={img1} className='advocateRegistrationimgdiv'></img>
          </div>
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <h2 className="advocateRegistrationtitle">Registration Form</h2>
              <div className="row">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">First Name :</label>

                </div>
                <div className="col-9">

                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="First Name Here"
                    value={data.fname}
                    onChange={handleChange}

                    name="fname"
                  />{errors.fname && <div className="text-danger">{errors.fname}</div>}
                </div>
              </div><div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">Last Name :</label>
                </div>
                <div className="col-9">

                  <div >
                    <input
                      type="text"
                      class="form-control  form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="Last Name Here"
                      name="lname"
                      value={data.lname}
                      onChange={handleChange}

                    /></div>

{errors.lname && <div className="text-danger">{errors.lname}</div>}
                </div>
              </div><div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">Email :</label>
                </div>
                <div className="col-9">

                  <div >
                    <input
                      type="email"
                      class="form-control  form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    /></div>
                  <div>{errors.email && <div className="text-danger">{errors.email}</div>}</div>

                </div>
              </div><div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">Contact Number :</label>
                </div>
                <div className="col-8">

                  <div >
                    <input
                      type="number"
                      class="form-control  form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="Contact Number"
                      name="contact"
                      value={data.contact}
                      onChange={handleChange}
                      onBlur={() => setErrors(prevErrors => ({
                        ...prevErrors,
                        contact: validateContact('Contact', data.contact)
                      }))}
                    /></div>
                    {errors.contact && <div className="text-danger">{errors.contact}</div>}
                </div> 
              </div>
              <div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">City</label>
                </div>
                <div className="col-9">

                  <div >
                    <input
                      type="text"
                      class="form-control  form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="City"
                      name="city"
                      value={data.city}
                      onChange={handleChange}
                    /></div>
                    {errors.city && <div className="text-danger">{errors.city}</div>}
                </div>
              </div>
              <div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">State</label>
                </div>
                <div className="col-9">

                  <div >
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="State"
                      name="state"
                      value={data.state}
                      onChange={handleChange}
                    />
                     {errors.state && <div className="text-danger">{errors.state}</div>}
                    </div>
                   
                </div>
              </div>
              <div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">District</label>
                </div>
                <div className="col-9">

                  <div >
                    <input
                      type="text"
                      class="form-control  form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="District"
                      name='district'
                      value={data.district}
                      onChange={handleChange}
                    /></div>
                    {errors.district && <div className="text-danger">{errors.district}</div>}
                </div>
              </div>

              <div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">Reg No :</label>
                </div>
                <div className="col-9">
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Registration Number"
                    name="regno"
                    value={data.regno}
                    onChange={handleChange}
                  />{errors.regno && <div className="text-danger">{errors.regno}</div>}
                </div> 
               
              </div>

              <div className="row mt-3">

                <div className="col-3">
                  <label class="form-label advocateRegistrationlabel">Password :</label>
                </div>
                <div className="col-9">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  /> {errors.password && <div className="text-danger">{errors.password}</div>}
                </div> 
              
              </div>

              <div className="row mt-3">

                <button type="submit" className="btn btn-secondary advocateRegistrationbutton mt-3">
                  Register
                </button>
                <div className='advocateRegistrationdivlast'>Already have an account?
                  <Link to='/advocateLogin' className='advocateRegistrationdivlink'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login Now</Link></div>
              </div>



            </form>
          </div>
        </div>
      </div>
    </>

  );
}


export default AdvcateReg

