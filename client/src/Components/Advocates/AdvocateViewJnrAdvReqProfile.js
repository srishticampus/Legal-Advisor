import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { imageUrl } from '../Constants/Image_Url';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function AdvocateViewJnrAdvReqProfile({value}) {
    const [advocate, setAdvocate] = useState({ profilePic: { filename: '' }, idProof: { filename: '' } });
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { aid } = useParams();

    console.log(aid);

    useEffect(() => {
        axiosInstance.post(`/viewJuniorAdvocateById/${id}`)
            .then(response => {
                setAdvocate(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the advocate details!', error);
            });
    }, [id]);

    const handleApprove = (id) => {
        axiosInstance.post(`/acceptJnrReqbyAdv/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    toast.success('Accepted')

                    navigate('/advocate_viewjuadvocatereq')
                }
            })
            .catch((error) => {
                console.error("Error!", error);
            });
    };

    const handleReject = (id) => {
        axiosInstance.post(`/rejectJnrReqbyAdv/${id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    toast.warning('Rejected')
                    navigate('/advocate_viewjuadvocatereq')

                }
            })
            .catch((error) => {
                console.error("Error!", error);
            });
    };

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
                        <Link className="ju-link-label" to="#" onClick={toggleModal}>View Id Proof</Link>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                        <div>
                            <table className="table ju-custom-table">
                                <tbody>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Bar Council Enrollment Number</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.bcNo}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Date of Enrollment</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.dateOfEnrollment}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">State Bar Council</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.bcState}</label></td>
                                    </tr>
                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Specialization Areas</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.specialization}</label></td>
                                    </tr>

                                    <tr>
                                        <td className='left-alignn'><label className="ju-sub-label">Educational Qualification</label></td>
                                        <td className='left-alignn'>:</td>
                                        <td className='left-alignn'><label className="ju-sub-label">{advocate.qualification}</label></td>
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
                                    <br />
                                    {
                                        data=='request'?<div className="row justify-content-center mt-4 arr">
                                        <div className="col-auto">
                                            <button
                                                className="btn btn-warning btn-style  me-2"
                                                onClick={() => handleApprove(aid)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-style btn-warning"
                                                onClick={() => handleReject(aid)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>:''
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
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
            </div>
        </div>
    );
}

export default AdvocateViewJnrAdvReqProfile;
