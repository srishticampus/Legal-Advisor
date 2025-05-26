import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { imageUrl } from '../Constants/Image_Url';

function AdvocateViewSingleIntern() {

    const [advocate, setAdvocate] = useState({ profilePic: { filename: '' }});
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        axiosInstance.post(`/viewInternsById/${id}`)
            .then(response => {
                console.log(response);
                setAdvocate(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the advocate details!', error);
            });
    }, [id]);

    

    const toggleModal = () => {
        setShowModal(!showModal);
    };

  return (
    <div>
            <div className="container-fluid mt-5 pt-5 pb-5">
                <div className="row justify-content-center">
                    <div className="admin_view_junioradvocate_img col-lg-4 col-md-6 col-sm-12 text-center">
                        <br />
                        <img src={`${imageUrl}/${advocate.profilePic.filename}`} className="img-fluid rounded image-size" alt="Advocate" />

                        <label className="ju-advocate-name d-block mt-3">{advocate.name}</label>
                        <label className="ju-practice-area d-block">{advocate.specialization}</label>
                        {/* <Link className="ju-link-label" to="#" onClick={toggleModal}>View Id Proof</Link> */}
                    </div>
                    <div className="col-sm-6 col-lg-6">
                        <div>
                            <table className="table ju-custom-table">
                                <tbody>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Name</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.name}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">E-mail</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.email}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Contact</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.contact}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Qualification</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.qualification}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Institution</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.institute}</label></td>
                                    </tr>

                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Specialization</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.specialization}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Institute Name</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.institute}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Percentage of Marks</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.percentage}%</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Year of Passout</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.yearOfPassout}</label></td>
                                    </tr>
                                    <br />
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {/* <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ID Proof</h5>
                            <button type="button" className="btn-close" onClick={toggleModal}></button>
                        </div>
                        <div className="modal-body">
                            {advocate.idProof.filename.endsWith('.pdf') ? (
                                <embed src={`${imageUrl}/${advocate.idProof.filename}`} width="100%" height="500px" type="application/pdf" />
                            ) : (
                                <img src={`${imageUrl}/${advocate.idProof.filename}`} className="img-fluid" alt="ID Proof" />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
  )
}

export default AdvocateViewSingleIntern
