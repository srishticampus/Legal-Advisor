// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axiosInstance from '../Constants/BaseUrl';
// import { imageUrl } from '../Constants/Image_Url';

// function ViewProfile_JuniorAdvocate({ view }) {
//   const [juniorAdvocate, setJuniorAdvocate] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (!localStorage.getItem("adminId")) {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     axiosInstance
//       .post(`/viewJuniorAdvocateById/${id}`)
//       .then((response) => {
//         setJuniorAdvocate(response.data.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the advocate details!", error);
//       });
//   }, [id]);

//   const handleAction = (action) => {
//     axiosInstance
//       .post(`/${action}JuniorAdvocateById/${id}`)
//       .then((res) => {
//         if (res.data.status === 200) {
//           setJuniorAdvocate((prev) => ({
//             ...prev,
//             isActive: action === 'activate',
//             adminApproved: action === 'approve' ? true : action === 'reject' ? false : prev.adminApproved,
//           }));
//           if (action === 'approve' || action === 'reject') {
//             navigate("/admin-viewalladvocates");
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error!", error);
//       });
//   };

//   if (!juniorAdvocate) {
//     return null;
//   }

//   return (
//     <div className="container-fluid mt-5">
//       <div className="row justify-content-center">
//         <div className="admin_view_advocate_img col-lg-4 col-md-6 col-sm-12 text-center">
//           <img
//             src={`${imageUrl}/${juniorAdvocate.profilePic.filename}`}
//             className="img-fluid rounded"
//             alt="Advocate"
//           />
//           <br />
//           <label className="advocate-name d-block mt-3">{juniorAdvocate.name}</label>
//           <label className="practice-area d-block">Practice Area</label>
//           <label className="experience-label d-block">
//             {juniorAdvocate.experience} Years of Experience in Various Cases
//           </label>
//           <br />
//           <Link className="link-label" to="">
//             View Id Proof
//           </Link>
//         </div>
//         <div className="col-lg-8 col-md-6 col-sm-12 mt-5">
//           <table className="table custom-table">
//             <tbody>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">Bar Council Enrollment Number</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.bcNo}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">Date of Enrollment</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.dateOfEnrollment}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">State Bar Council</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.bcState}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">Specialization Areas</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.specialization}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">Years of Experience</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.experience} years</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">Educational Qualification</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.qualification}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="left-alignn">
//                   <label className="sub-label">Professional Experience</label>
//                 </td>
//                 <td className="left-alignn">:</td>
//                 <td className="left-alignn">
//                   <label className="sub-label">{juniorAdvocate.experience}</label>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           {view === 'view' && (
//             <div className="row justify-content-center mt-4 arr">
//               <div className="col-auto">
//                 {juniorAdvocate.isActive ? (
//                   <button
//                     className="btn btn-outline-danger button-size1"
//                     onClick={() => handleAction('deactivate')}
//                   >
//                     Deactivate
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-outline-success button-size1"
//                     onClick={() => handleAction('activate')}
//                   >
//                     Activate
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//           {view === "request" && (
//             <div className="row justify-content-center mt-4 arr">
//               <div className="col-auto">
//                 <button
//                   className="btn btn-warning btn-style me-2"
//                   onClick={() => handleAction('approve')}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="btn btn-style btn-warning"
//                   onClick={() => handleAction('reject')}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewProfile_JuniorAdvocate;
