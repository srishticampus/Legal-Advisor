import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import img from "../../Assets/image 21.png";
import { imageUrl } from '../Constants/Image_Url'
function AdminViewSingleUsers() {

    const [advocate, setAdvocate] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post(`/viewUserById/${id}`)
      .then((response) => {
        setAdvocate(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the advocate details!", error);
      });
  }, [id]);

  


  if (!advocate) {
    return "";
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="admin_view_advocate_img col-lg-4 col-md-6 col-sm-12 text-center">
          <img src={`${imageUrl}/${advocate.profilePic.filename}`} className="img-fluid rounded" alt="Advocate" />
          <br />
          <label className="advocate-name d-block mt-3">{advocate.name}</label>
         
          <br />
        
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12 ">
          <div>
            <table className="table custom-table">
              <tbody>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Name </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.name}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Email </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.email}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Contact </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.contact}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Gender </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.gender}</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Address </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.address} years</label>
                  </td>
                </tr>
                <tr>
                  <td className="left-alignn">
                    <label className="sub-label">Nationality </label>
                  </td>
                  <td className="left-alignn"> : </td>
                  <td className="left-alignn">
                    <label className="sub-label">{advocate.nationality}</label>
                  </td>
                </tr>
            
              </tbody>
            </table>
          </div>
        </div>
      </div>

    

    </div>
  )
}

export default AdminViewSingleUsers
