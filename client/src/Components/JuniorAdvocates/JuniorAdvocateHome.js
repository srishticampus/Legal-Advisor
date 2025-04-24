import React, { useEffect } from 'react';
import './JuniorAdvocateHome.css';
import tick from '../../Assets/tick.png';
import backimg from '../../Assets/about_bg.jpg'
import manimg from '../../Assets/junior-adv-men.png'
import { VscLaw } from "react-icons/vsc";
import { BiBuildings, BiSolidInjection } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoHammerOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function JuniorAdvocateHome() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('junioradvocateId') == null) {
      navigate('/');
    }
  }, [navigate]);



  return (
    <div>
      <div className='first-img'><br/><br/>
        <h1 className='img1-heading'>Empowering Your Legal Journey</h1>
        <hr className='hr-style' />
        <p className='img1-sub-heading'>Consider mentors who have a reputation for being approachable<br /> and supportive.</p>
        <button type="button" className="btn btn-warning find-button">Find Advocate</button>
      </div>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-md-7 container">
            <br />
            <div className='main-content-style'>
            <label className="ju-advocate-label font-weight-bold">LEGAL LIAISON</label>
            <br /><br />
            <ul className="no-bullets">
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Personalised Legal Solution.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Professional and Compassionate Representation.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Dedicated to Your Legal Needs.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Building Strong Legal Foundation.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Achieving Your Legal Goals.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Clear Guidance in Legal Matters.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Advocating for your rights.</label></li>
              <li><img src={tick} className='image-style-tick' /><label className='ju-advocate-sublabel'>Your Advocate for justice.</label></li>
            </ul>
            </div>
          </div>
          <div className="col-md-5 background-image-column">
            <img src={manimg} className='second-man-img'/>
          </div>
        </div>
      </div>
      <div className='backimage-2'>
        <div className='div3-image'>
          <h4 className='practice-area-label'>Practice Areas</h4>
          <p className='label-text'>Handling divorce, child custody, and alimony cases.<br /> advising on prenuptial and postnuptial agreements.</p>
        </div>
        <div className="row mt-4">
          <div className="col-md-4 mb-4 padding-each-card">
            <div className="card p-3 cards-position">
              <div className='row'>
                <div className='col-2'>
                  <VscLaw className='icon-style'/>
                </div>
                <div className='col-10'>
                  <h5 className="card-title main-card-title">Criminal Law</h5>
                  <p className="card-text card-sub-text">Criminal Law is the body of law that relates to crime.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 padding-each-card">
            <div className="card p-3 cards-position">
              <div className='row'>
                <div className='col-2'>
                  <BiBuildings className='icon-style'/>
                </div>
                <div className='col-10 '>
                  <h5 className="card-title main-card-title">Real Estate Law</h5>
                  <p className="card-text card-sub-text">Any transfer of property in India is regulated by the transfer of the Property Act.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 padding-each-card">
            <div className="card p-3 cards-position">
              <div className='row'>
                <div className='col-2'>
                  <FaMoneyBillAlt className='icon-style'/>
                </div>
                <div className='col-10'>
                  <h5 className="card-title main-card-title">Financial Law</h5>
                  <p className="card-text card-sub-text">The components of finance law include banking laws, securities laws.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 padding-each-card">
            <div className="card p-3 cards-position">
              <div className='row'>
                <div className='col-2'>
                  <MdFamilyRestroom className='icon-style'/>
                </div>
                <div className='col-10'>
                  <h5 className="card-title main-card-title">Family Law</h5>
                  <p className="card-text card-sub-text">Family Law is an area of that deals with family matters and domestic relations.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 padding-each-card">
            <div className="card p-3 cards-position">
              <div className='row'>
                <div className='col-2'>
                  <IoHammerOutline className='icon-style' />
                </div>
                <div className='col-10'>
                  <h5 className="card-title main-card-title">Personal Law</h5>
                  <p className="card-text card-sub-text">Personal Law is the set of rules that govern a person’s family matters, like marriage, divorce.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 padding-each-card">
            <div className="card p-3 cards-position">
              <div className='row'>
                <div className='col-2'>
                  <BiSolidInjection className='icon-style'/>
                </div>
                <div className='col-10'>
                  <h5 className="card-title main-card-title">Drug Offense</h5>
                  <p className="card-text card-sub-text">Controlled drugs are according to their relative degree of overall harm from misuse.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuniorAdvocateHome;
