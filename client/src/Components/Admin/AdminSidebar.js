import React, { useEffect } from 'react'
import './AdminSidebar.css'
import userimg from './../../Assets/carbondashboard.png'
import advocateimg from './../../Assets/openmoji.png'
import casesimg from './../../Assets/Gro-up.png'
import enquiryimg from '../../Assets/Vector5.png'
import juniorimg from '../../Assets/arcticons.png'
import internimg from '../../Assets/material.png'
import profile from '../../Assets/5856.jpg'
import { Link, useNavigate } from 'react-router-dom'


function AdminSidebar() {

    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("adminId" == null)) {
        navigate("/");
      }
    });

  return (
    <div className='row-4'>
        <div className='admin-sidebar'>
        <div className='profile-div'>
            <Link to={'/admin-dashboard'}>
            <div className='row'>
                <div className='col-md-4 col-sm-12'>
                    <img className='img-style' src={profile} alt='Profile' />
                </div>
                <div className='col-md-8 col-sm-12'>
                    <label className='profile-label text-light'>Administrator</label>
                </div>
            </div>
            </Link>
            
        </div>
        
            <div className='content-div'>
                <div className='div-style'>
                <div>
                <label className='label-general'>General</label>
                <div className='adjust-space'>
                <img src={userimg} className='image-adjust-1 img1-padding each' alt='User image'/>{' '},{' '},{' '}
                <Link to={'/admin-viewallusers'}>
                <label className='label-sub'>Users</label>
                </Link>
                </div>
                <div className='adjust-space'>
                <img src={advocateimg} className='img2-padding' alt='User image'/>{' '},{' '},{' '}
                    <Link to='/admin-viewalladvocates'>
                    <label className='label-sub'>Advocate</label>
                    </Link>
                </div>
                <div className='adjust-space'>
                <img src={casesimg} className='image-adjust-1 padding each' alt='User image'/>{' '},{' '},{' '}
                <Link to={'/admin_view_cases'}>
                <label className='label-sub'>Cases</label>

                </Link>
                </div>
               
                <div className='adjust-space'>
                <img src={juniorimg} className='image-adjust-1 padding each' alt='User image'/>{' '},{' '},{' '}
                    <Link to='/adminviewalljunioradvocates'>
                    <label className='label-sub '>Junior Advocates</label>
                    </Link>
                </div>
                <div className='adjust-space'>
                <img src={internimg} className='image-adjust-1 padding each-1' alt='User image'/>{' '},{' '}
                    <Link to={'/admin_view_approved_interns'}><label className='label-sub padding'>Interns</label></Link>
                </div>
                <div className='adjust-space'>
                <img src={internimg} className='image-adjust-1 padding each-1' alt='User image'/>{' '},{' '}
                    <Link to={'/admin_view_complaints'}><label className='label-sub padding'>Complaints</label></Link>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSidebar