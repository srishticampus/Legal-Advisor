import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import ViewAllAdvocates from "./ViewAllAdvocates";
import ApproveRejectAdvocate from "./ApproveRejectAdvocate";
import ViewProfile_AR from "./ViewProfile_AR";
import "../Admin/AdminMain.css";
import AdminViewAllJuniorAdvocate from "./AdminViewAllJuniorAdvocate";
import AdminApproveRejectJuniorAdvocate from "./ViewJuniorAdvocateRequest";
import ViewJuniorAdvocateRequest from "./ViewJuniorAdvocateRequest";
import ViewProfile_AllJuniorAdvocates from "./ViewProfile_AllJuniorAdvocates";
import ViewProfile_JuniorAdvocate from "./ViewProfile_JuniorAdvocate";
import ViewProfile_JuniorAdvocateRequest from "./ViewProfile_JuniorAdvocateRequest";
import AdminViewInternRequest from "./AdminViewInternRequest";
import AdminViewInternProfile from "./AdminViewInternProfile";
import AdminViewApprovedInterns from "./AdminViewApprovedInterns";
import AdminViewComplaints from "./AdminViewComplaints";
import AdminViewUsers from "./AdminViewUsers";
import AdminViewSingleUsers from "./AdminViewSingleUsers";
import AdminViewAllCases from "./AdminViewAllCases";
import AdminViewSingleCase from "./AdminViewSingleCase";
import AdminViewCaseStatus from "./AdminViewCaseStatus";
import AdminViewEvidences from "./AdminViewEvidences";
import AdminViewPayment from "./AdminViewPayment";

function AdminMain({ data }) {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  }, [navigate]); 

  return (
    <div className="container-fluid admin_main">
      <div className="row">
        <div
          className="col-lg-3 col-md-6 col-sm-12 adminmain-sidebar"
          style={{ padding: 0 }}
        >
          <AdminSidebar />
        </div>
        <div className=" col-lg-9 col-md-6 col-sm-12 adminmain-content">
          {data === "admindashboard" ? (
            <AdminDashboard />
          ) : data === "adminviewalladvocates" ? (
            <ViewAllAdvocates />
          ) : data === "approvereject" ? (
            <ApproveRejectAdvocate />
          ) : data === "adminviewrequest" ? (
            <ViewProfile_AR view="request" />
          ) : data === "adminviewsingleadvocate" ? (
            <ViewProfile_AR view="view" />
          ) : data === "adminviewalljunioradvocates" ? (
            <AdminViewAllJuniorAdvocate />
          ) : data === "approverejectjunioradvocate" ? (
            <ViewJuniorAdvocateRequest />
          ) : data === "adminviewprofile-alladvocates" ? (
            <ViewProfile_AllJuniorAdvocates />
          ) : data === "adminviewprofile-requests" ? (
            <ViewProfile_JuniorAdvocateRequest />
          ) : data === "approverejectIntern" ? (
            <AdminViewInternRequest />
          ) : data === "interndetailreq" ? (
            <AdminViewInternProfile view="request" />
          ) : data === "approvedInterns" ? (
            <AdminViewApprovedInterns />
          ) : data === "interndetails" ? (
            <AdminViewInternProfile view="view" />
          ) : data === "complaints" ? (
            <AdminViewComplaints />
          ) : data === "adminviewallusers" ? (
            <AdminViewUsers />
          ) : data === "singleUser" ? (
            <AdminViewSingleUsers />
          ) : data === "viewCases" ? (
            <AdminViewAllCases />
          ) : data === "viewSingleCase" ? (
            <AdminViewSingleCase />
          ) : data === "status" ? (
            <AdminViewCaseStatus />
          ) : data === "evidence" ? (
            <AdminViewEvidences />
          ) : data === "payment" ? (
            <AdminViewPayment />
          ) : (
            <AdminLogin />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
