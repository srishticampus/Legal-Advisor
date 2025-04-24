import React, { useEffect, useState } from 'react';
import tick from '../../Assets/editPofileCheckmark.png'; // Adjust as per your file structure
import axiosMultipartInstance from '../Constants/FormDataUrl'; // Adjust import based on your setup
import { imageUrl } from '../Constants/Image_Url';
import axiosInstance from '../Constants/BaseUrl';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

    const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userId') == null) {
      navigate('/');
    }
  }, [navigate]);

  const id = localStorage.getItem('userId');

    const [data, setData] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
        gender: '',
        dob: '',
        profilePic: null, // Assuming initial profilePic state as null if no image is selected
        nationality: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
        gender: '',
        dob: '',
        profilePic: '',
        nationality: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.post(`/viewUserById/${id}`); // Adjust API endpoint as per your backend
                if (res.data.status === 200) {
                    setData(res.data.data);
                } else {
                    alert(`Failed to fetch user data: ${res.data.msg}`);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data');
            }
        };
        if(id!==null){
            fetchData();
          }
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setData(prevData => ({
                ...prevData,
                [name]: files[0], // Assuming only one file is selected
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    function validateField(fieldName, value) {
        if (!value.trim()) {
            return `${fieldName} is required`;
        }
        return '';
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let errors = {};
        let formIsValid = true;

        // Validate each field
        errors.name = validateField('Full Name', data.name);
        errors.contact = validateField('Contact Number', data.contact);
        errors.email = validateField('Email', data.email);
        errors.address = validateField('Address', data.address);
        errors.gender = validateField('Gender', data.gender);
        errors.dob = validateField('Date of Birth', data.dob);
        errors.nationality = validateField('Nationality', data.nationality);

        setErrors(errors);

        for (let key in errors) {
            if (errors[key]) {
                formIsValid = false;
                break;
            }
        }

        if (formIsValid) {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('contact', data.contact);
            formData.append('email', data.email);
            formData.append('address', data.address);
            formData.append('gender', data.gender);
            formData.append('dob', data.dob);
            if (data.profilePic) {
                formData.append('profilePic', data.profilePic);
            }
            formData.append('nationality', data.nationality);

            try {
                const res = await axiosMultipartInstance.post(`/editUserById/${id}`, formData);
                if (res.data.status === 200) {
                    console.log(res);
                    window.location.reload()
                    alert('User profile updated successfully');
                } else {
                    alert(`User Profile Update Failed: ${res.data.msg}`);
                }
            } catch (error) {
                console.error('There was an error:', error);
                alert('Error updating user profile');
            }
        }
    };

    return (
        <div className='advocate_edit_profile'>
            <div className='container'>
                <div className='row'>
                    <div className='col-5 mt-5'>
                        <div className='advocate_edit_profile_img d-flex justify-content-center'>
                            {data.profilePic && (
                                <img src={`${imageUrl}/${data.profilePic.filename}`} className='img-fluid' alt='Profile' />
                            )}
                        </div>
                        <p className='advocate_edit_profile_title mt-5'>Stay Ahead <span className='text-gold'>: Keep Your Profile Updated!</span></p>
                        <p className='advocate_edit_profile_sub_title mt-4'>Regularly updating your information ensures you;</p>
                        <div className='advocate_edit_profile_sub_title2 d-flex align-items-center'>
                            <img src={tick} className='img-fluid' alt='Checkmark' />
                            <p>Keep Your Messaging focussed.</p>
                        </div>
                        <div className='advocate_edit_profile_sub_title2 d-flex align-items-center'>
                            <img src={tick} className='img-fluid' alt='Checkmark' />
                            <p>Document and share your profiles.</p>
                        </div>
                        <div className='advocate_edit_profile_sub_title2 d-flex align-items-center'>
                            <img src={tick} className='img-fluid' alt='Checkmark' />
                            <p>Connect with Your clients.</p>
                        </div>
                        <div className='advocate_edit_profile_sub_title2 d-flex align-items-center'>
                            <img src={tick} className='img-fluid' alt='Checkmark' />
                            <p>Build up Trust.</p>
                        </div>
                    </div>
                    <div className='col-7'>
                        <div className='container-fluid bckcolor'>
                            <div className=''>
                                <div className='container'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row mt-3'>
                                            <div className='col-sm-6 col-lg-6'>
                                                <label className='form-label advocateRegistrationlabel'>Full Name :</label>
                                                <input
                                                    type='text'
                                                    className='form-control textbox-style'
                                                    placeholder='Enter your Full Name'
                                                    name='name'
                                                    value={data.name}
                                                    onChange={handleChange}
                                                />
                                                {errors.name && <div className='text-danger'>{errors.name}</div>}
                                            </div>
                                            <div className='col-6'>
                                                <label className='form-label advocateRegistrationlabel'>Contact Number :</label>
                                                <input
                                                    type='text'
                                                    className='form-control textbox-style'
                                                    placeholder='Enter your contact number'
                                                    name='contact'
                                                    value={data.contact}
                                                    onChange={handleChange}
                                                />
                                                {errors.contact && <div className='text-danger'>{errors.contact}</div>}
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-6'>
                                                <label className='form-label advocateRegistrationlabel'>Date of Birth :</label>
                                                <input
                                                    type='date'
                                                    className='form-control textbox-style'
                                                    name='dob'
                                                    value={(data.dob).slice(0,10)}
                                                    onChange={handleChange}
                                                />
                                                {errors.dob && <div className='text-danger'>{errors.dob}</div>}
                                            </div>
                                            <div className='col-6'>
                                                <label className='form-label advocateRegistrationlabel'>Nationality :</label>
                                                <input
                                                    type='text'
                                                    className='form-control textbox-style'
                                                    placeholder='Enter your Nationality'
                                                    name='nationality'
                                                    value={data.nationality}
                                                    onChange={handleChange}
                                                />
                                                {errors.nationality && <div className='text-danger'>{errors.nationality}</div>}
                                            </div>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-12'>
                                                <label className='form-label advocateRegistrationlabel'>Email :</label>
                                                <input
                                                    type='email'
                                                    className='form-control textbox-style'
                                                    placeholder='Enter your Email'
                                                    name='email'
                                                    value={data.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <div className='text-danger'>{errors.email}</div>}
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-12'>
                                                <label className='form-label advocateRegistrationlabel'>Address :</label>
                                                <input
                                                    type='text'
                                                    className='form-control textbox-style'
                                                    placeholder='Enter your address'
                                                    name='address'
                                                    value={data.address}
                                                    onChange={handleChange}
                                                />
                                                {errors.address && <div className='text-danger'>{errors.address}</div>}
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-12'>
                                                <label className='form-label advocateRegistrationlabel'>Gender :</label>
                                                <select
                                                    className='form-control textbox-style'
                                                    name='gender'
                                                    value={data.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value=''>Select Gender</option>
                                                    <option value='male'>Male</option>
                                                    <option value='female'>Female</option>
                                                    <option value='other'>Other</option>
                                                </select>
                                                {errors.gender && <div className='text-danger'>{errors.gender}</div>}
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-12'>
                                                <label className='form-label advocateRegistrationlabel'>Profile Picture :</label>
                                                <input
                                                    type='file'
                                                    className='form-control'
                                                    name='profilePic'
                                                    onChange={handleChange}
                                                />
                                                {errors.profilePic && <div className='text-danger'>{errors.profilePic}</div>}
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-12'>
                                                <button type='submit' className='btn btn-warning'>Update</button>
                                                
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
