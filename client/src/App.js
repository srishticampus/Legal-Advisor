import LandingCarousel from './Components/LandingPage/LandingCarousel';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'remixicon/fonts/remixicon.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingNavbar from './Components/LandingPage/LandingNavbar';
import LandingServices from './Components/LandingPage/LandingServices';
import UserLogin from './Components/User/UserLogin';
import UserRegistration from './Components/User/UserRegistration';
import AdvocateLogin from './Components/Advocates/AdvocateLogin';
import BarCouncilLogin from './Components/BarCouncil/BarCouncilLogin';
import AdminLogin from './Components/Admin/AdminLogin';
import FormHead from './Components/Common/FormHead';
import UserNavbar from './Components/User/UserNavbar';
import UserHome from './Components/User/UserHome';
import AdminSidebar from './Components/Admin/AdminSidebar';
import AdminFooter from './Components/Admin/AdminFooter';
import UserFooter from './Components/Common/UserFooter';
import AdminMain from './Components/Admin/AdminMain';
import AdminNav from './Components/Admin/AdminNav';
import RecentEnquries from './Components/Admin/RecentEnquries';
import AdvocateRegister from './Components/Advocates/AdvocateRegister';
import AdvocateHome from './Components/Advocates/AdvocateHome';
import ViewProfile_AR from './Components/Admin/ViewProfile_AR';
import AdvocateNavbar from './Components/Advocates/AdvocateNavbar';
import AdvocateEditProfile from './Components/Advocates/AdvocateEditProfile';
import AboutUs from './Components/LandingPage/AboutUs';
import JuniorAdvocateRegistration from './Components/JuniorAdvocates/JuniorAdvocateRegistration';
import JuniorAdvocateLogin from './Components/JuniorAdvocates/JuniorAdvocateLogin';
import ContactUs from './Components/LandingPage/ContactUs';
import JuniorAdvocateHome from './Components/JuniorAdvocates/JuniorAdvocateHome';
import JuniorAdvocateEditProfile from './Components/JuniorAdvocates/JuniorAdvocateEditProfile';
import JuniorAdvocateNavbar from './Components/JuniorAdvocates/JuniorAdvocateNavbar';
import UserProfile from './Components/User/UserProfile';
import UserAddCases from './Components/User/UserAddCases';
import UserViewRecentCases from './Components/User/UserViewRecentCases';
import AdvcateReg from './Components/Advocates/AdvocateReg';

import AdvocateViewCaseReq from './Components/Advocates/AdvocateViewCaseReq';
import AdvocateViewAllCaseReq from './Components/Advocates/AdvocateViewAllCaseReq';
import AdvocateViewSingleRecentCase from './Components/Advocates/AdvocateViewSingleRecentCase';

import UserNav_Main from './Components/User/UserNav_Main';
import User_ViewAllAdvocates from './Components/User/User_ViewAllAdvocates';
import User_ViewAdvocateDetail from './Components/User/User_ViewAdvocateDetail';
import User_RequestAdvocate from './Components/User/User_RequestAdvocate';
import User_BookAppoinment from './Components/User/User_BookAppoinment';
import Advocate_ViewCaseRequest from './Components/Advocates/Advocate_ViewCaseRequest';
import UserChattoAdvocate from './Components/User/UserChattoAdvocate';
import Advocate_PaymentRequest from './Components/Advocates/Advocate_PaymentRequest';
import Advocate_AddEvidence from './Components/Advocates/Advocate_AddEvidence';
import Advocate_UpdateCaseStatus from './Components/Advocates/Advocate_UpdateCaseStatus';
import JuAdvocate_ViewAllAdvocates from './Components/JuniorAdvocates/JuAdvocate_ViewAllAdvocates';
import JuAdvocate_RequestMentorshop from './Components/JuniorAdvocates/JuAdvocate_RequestMentorshop';
import Advocate_ViewJuAdvocateRequest from './Components/Advocates/Advocate_ViewJuAdvocateRequest';
import AdvocateViewAllRecentCases from './Components/Advocates/AdvocateViewAllRecentCases';
import AdvocateChat from './Components/Advocates/AdvocateChat';
import InternRegistration from './Components/Interns/InternRegistration';
import InternLogin from './Components/Interns/InternLogin';
import InternsHome from './Components/Interns/InternsHome';
import AdvocateViewJnrAdvReqProfile from './Components/Advocates/AdvocateViewJnrAdvReqProfile';
import JuniorAdvocateViewMentor from './Components/JuniorAdvocates/JuniorAdvocateViewMentor';
import JuniorAdvChatToAdv from './Components/JuniorAdvocates/JuniorAdvChatToAdv';
import AdvocateViewClientPaymentStatus from './Components/Advocates/AdvocateViewClientPaymentStatus';
import AdvAssignCasesToJnrAdv from './Components/Advocates/AdvAssignCasesToJnrAdv';
import AdvovatedViewApprovedJnrAdv from './Components/Advocates/AdvovatedViewApprovedJnrAdv';
import JuniorAdvViewAssignedCases from './Components/JuniorAdvocates/JuniorAdvViewAssignedCases';
import JuniorAdvViewAssignedCasesDetails from './Components/JuniorAdvocates/JuniorAdvViewAssignedCasesDetails';
import AdvocateViewCaseStatus from './Components/Advocates/AdvocateViewCaseStatus';
import AdvocateViewAddedEvidences from './Components/Advocates/AdvocateViewAddedEvidences';
import UserViewCaseUpdates from './Components/User/UserViewCaseUpdates';
import UserViewCaseStatus from './Components/User/UserViewCaseStatus';
import UserViewCaseEvidences from './Components/User/UserViewCaseEvidences';
import UserViewPaymentReq from './Components/User/UserViewPaymentReq';
import UserPayAdvReq from './Components/User/UserPayAdvReq';
import UserAddComplaints from './Components/User/UserAddComplaints';
import AdvocateAddComplaints from './Components/Advocates/AdvocateAddComplaints';
import JuniorAdvAddComplaints from './Components/JuniorAdvocates/JuniorAdvAddComplaints';
import InternNavbar from './Components/Interns/InternNavbar';
import InternAddComplaints from './Components/Interns/InternAddComplaints';
import AdvocateAddArticle from './Components/Advocates/AdvocateAddArticle';
import AdvocateViewArticles from './Components/Advocates/AdvocateViewArticles';
import AdvocateEditArticle from './Components/Advocates/AdvocateEditArticle';
import AdvocateForgotPassword from './Components/Advocates/AdvocateForgotPassword';
import JuniorAdvocateForgotPassword from './Components/JuniorAdvocates/JuniorAdvocateForgotPassword';
import UserForgotPassword from './Components/User/UserForgotPassword';
import InternForgotPassword from './Components/Interns/InternForgotPassword';
import InternViewAdv from './Components/Interns/InternViewAdv';
import InternRequestInternship from './Components/Interns/InternRequestInternship';
import AdvocateViewInternReq from './Components/Advocates/AdvocateViewInternReq';
import AdvocateViewApprovedInterns from './Components/Advocates/AdvocateViewApprovedInterns';
import AdvocateViewSingleIntern from './Components/Advocates/AdvocateViewSingleIntern';
import InternViewInternshipAdv from './Components/Interns/InternViewInternshipAdv';
import InternChatToAdv from './Components/Interns/InternChatToAdv';
import InternGroupChat from './Components/Interns/InternGroupChat';
import JuniorAdvViewAllAdvCases from './Components/JuniorAdvocates/JuniorAdvViewAllAdvCases';
import JuniorAdvViewAdvDetailCase from './Components/JuniorAdvocates/JuniorAdvViewAdvDetailCase';
import InternViewMentorAllCases from './Components/Interns/InternViewMentorAllCases';
import InternViewSingleCaseOfMentor from './Components/Interns/InternViewSingleCaseOfMentor';
import JuniorAdvViewAssignedCasesEvidences from './Components/JuniorAdvocates/JuniorAdvViewAssignedCasesEvidences';
import JuniorAdvChatToUser from './Components/JuniorAdvocates/JuniorAdvChatToUser';
import UserChatToJuniorAdv from './Components/User/UserChatToJuniorAdv';
import AdvocateViewResourceReq from './Components/Advocates/AdvocateViewResourceReq';
import InternViewApprovedCaseResource from './Components/Interns/InternViewApprovedCaseResource';
import InternViewSingleCaseResource from './Components/Interns/InternViewSingleCaseResource';
import InternViewResourceCaseStatus from './Components/Interns/InternViewResourceCaseStatus';
import InternViewResourceAddedEvidences from './Components/Interns/InternViewResourceAddedEvidences';
import UserViewBlogs from './Components/User/UserViewBlogs';


function App() {
  return (
    <BrowserRouter basename="legal_liaison">
      <div>
        <Routes>
          {/* Client routes */}
          <Route path="/" element={(<LandingNavbar />, <LandingCarousel />)} />
          <Route path="/UserLogin" element={[<LandingNavbar />, <FormHead title="Home / User Login" />, <UserLogin />,<UserFooter/>]} />
          <Route path="/Userforgot" element={[<LandingNavbar />, <UserForgotPassword />,<UserFooter/>]} />
          <Route path="/UserRegistration" element={[<LandingNavbar />, <FormHead title="User Registration Form" />, <UserRegistration />,<UserFooter/>]} />
          <Route path="/user_home" element={[<UserNavbar />, <UserHome />,<UserFooter/>]} />
          <Route path="/user_profile" element={[<UserNavbar />, <FormHead title="Client Profile View" />,<UserProfile/>,<UserFooter/>]} />
          <Route path="/user_add_case" element={[<UserNavbar />, <FormHead title="Add Case Details" />,<UserAddCases/>,<UserFooter/>]} />
          <Route path="/user_view_recent_cases" element={[<UserNavbar />, <FormHead title="Recent Cases" />,<UserViewRecentCases/>,<UserFooter/>]} />
          <Route path="/userfooter" element={<UserFooter />} />
          <Route path="/client-viewalladvocate" element={[<UserNavbar />,<User_ViewAllAdvocates />,<UserFooter/>]} />
          <Route path="/user_view_advocate_detail/:id" element={[<UserNavbar />,<User_ViewAdvocateDetail />,<UserFooter/>]} />
          <Route path="/user-requestanadvocate/:id" element={[<UserNavbar />,<User_RequestAdvocate />,<UserFooter/>]} />
          <Route path="/user_bookappoinment/:id/:cid" element={[<UserNavbar />,<User_BookAppoinment />,<UserFooter/>]} />
          <Route path="/user_chat_to_advocate/:aid" element={[<UserNavbar />,<FormHead title="Chat" />,<UserChattoAdvocate />,<UserFooter/>]} />
          <Route path="/user_view_case_updations/:id" element={[<UserNavbar />,<FormHead title="Case Details" />,<UserViewCaseUpdates />,<UserFooter/>]} />
          <Route path="/user_view_case_status/:id" element={[<UserNavbar />,<FormHead title="Case Status" />,<UserViewCaseStatus />,<UserFooter/>]} />
          <Route path="/user_view_added_evidences/:id" element={[<UserNavbar />,<FormHead title="Evidences" />,<UserViewCaseEvidences />,<UserFooter/>]} />
          <Route path="/user_view_adv_payment_req/:id" element={[<UserNavbar />,<FormHead title="Payment" />,<UserViewPaymentReq />,<UserFooter/>]} />
          <Route path="/user_pay_adv_req/:id" element={[<UserNavbar />,<UserPayAdvReq />,<UserFooter/>]} />
          <Route path="/user_add_complaint" element={[<UserNavbar />,<UserAddComplaints />,<UserFooter/>]} />

          <Route path="/user_chat_to_jnr_adv/:cid" element={[<UserNavbar />,<UserChatToJuniorAdv />,<UserFooter/>]} />
          <Route path="/client-viewblogs" element={[<UserNavbar />,<FormHead title="View Articles" />, <UserViewBlogs />,<UserFooter/>]} />



          {/* Advocate routes */}
          <Route path="/AdvcateReg" element={[<LandingNavbar />, <AdvcateReg />]} />
          <Route path="/AdvocateLogin" element={[<LandingNavbar />, <AdvocateLogin />, <UserFooter />]} />
          <Route path="/AdvocateForgot" element={[<LandingNavbar />, <AdvocateForgotPassword />, <UserFooter />]} />
          <Route path="/AdvcateRegister" element={[<LandingNavbar />, <AdvocateRegister />, <UserFooter />]} />
          <Route path="/advocate_home" element={[<AdvocateNavbar />, <AdvocateHome />, <UserFooter />]} />
          <Route path="/advocate_edit_profile/:id" element={[<AdvocateNavbar />,<FormHead title="Advocate Profile View" />, <AdvocateEditProfile />,<UserFooter />]} />
          {/* <Route path="/advocate_view_all_case_req" element={[<AdvocateNavbar />,<FormHead title="Case Requests" />, <AdvocateViewAllCaseReq />,<UserFooter />]} /> */}
          <Route path="/advocate_viewcasereq" element={[<AdvocateNavbar />, <Advocate_ViewCaseRequest />, <UserFooter />]} />
          <Route path="/advocate_view_intern_req" element={[<AdvocateNavbar />, <AdvocateViewInternReq />, <UserFooter />]} />
          <Route path="/advocate_view_single_case_req/:id" element={[<AdvocateNavbar />,<FormHead title="Case Requests" />, <AdvocateViewCaseReq />,<UserFooter />]} />
          <Route path="/advocate_view_all_recent_case" element={[<AdvocateNavbar />,<FormHead title="Recent Cases" />, <AdvocateViewAllRecentCases />,<UserFooter />]} />
          <Route path="/advocate_view_all_interns" element={[<AdvocateNavbar />,<FormHead title="Interns" />, <AdvocateViewApprovedInterns />,<UserFooter />]} />
          <Route path="/advocate_view_single_recent_case/:id" element={[<AdvocateNavbar />,<FormHead title="Case Tittle" />, <AdvocateViewSingleRecentCase />,<UserFooter />]} />
          
          <Route path="/advocate_chat" element={[<AdvocateNavbar />,<FormHead title="Chat" />, <AdvocateChat type='noChat' />,<UserFooter />]} />
          <Route path="/advocate_single_chat/:uid/:type" element={[<AdvocateNavbar />,<FormHead title="Chat" />, <AdvocateChat />,<UserFooter />]} />

          <Route path="/advocate_viewcasereq" element={[<AdvocateNavbar />, <Advocate_ViewCaseRequest />, <UserFooter />]} />
          <Route path="/advocate_paymentreq/:id" element={[<AdvocateNavbar />, <Advocate_PaymentRequest />, <UserFooter />]} />
          <Route path="/advocate_addevidence/:id" element={[<AdvocateNavbar />, <Advocate_AddEvidence />, <UserFooter />]} />
          <Route path="/advocate_view_added_evidences/:id" element={[<AdvocateNavbar />, <AdvocateViewAddedEvidences />, <UserFooter />]} />
          <Route path="/advocate_update_casestatus/:id" element={[<AdvocateNavbar />, <Advocate_UpdateCaseStatus />, <UserFooter />]} />
          <Route path="/advocate_viewjuadvocatereq" element={[<AdvocateNavbar />, <Advocate_ViewJuAdvocateRequest />, <UserFooter />]} />
          <Route path="/advocate_view_jnr_adv_profile_req/:id/:aid" element={[<AdvocateNavbar />, <AdvocateViewJnrAdvReqProfile value='request' />, <UserFooter />]} />
          <Route path="/advocate_view_intern_profile/:id" element={[<AdvocateNavbar />, <AdvocateViewSingleIntern />, <UserFooter />]} />
          <Route path="/advocate_view_client_payment_status/:id" element={[<AdvocateNavbar />, <AdvocateViewClientPaymentStatus />, <UserFooter />]} />
          <Route path="/advocate_view_case_status/:id" element={[<AdvocateNavbar />, <AdvocateViewCaseStatus />, <UserFooter />]} />
          <Route path="/advocate_assign_cases_to_jnradv/:jid" element={[<AdvocateNavbar />,<FormHead title="Advocate Assign Cases" />, <AdvAssignCasesToJnrAdv />, <UserFooter />]} />
          <Route path="/advocate_view_all_jnr_adv" element={[<AdvocateNavbar />, <AdvovatedViewApprovedJnrAdv />, <UserFooter />]} />
          <Route path="/advocate_add_complaints" element={[<AdvocateNavbar />, <AdvocateAddComplaints />, <UserFooter />]} />
          <Route path="/advocate_add_articles" element={[<AdvocateNavbar />, <AdvocateAddArticle />, <UserFooter />]} />
          <Route path="/advocate_view_articles" element={[<AdvocateNavbar />,<FormHead title="View Articles" />, <AdvocateViewArticles />, <UserFooter />]} />
          <Route path="/advocate_edit_articles/:id" element={[<AdvocateNavbar />, <AdvocateEditArticle />, <UserFooter />]} />
          <Route path="/advocate_view_case_req_access" element={[<AdvocateNavbar />, <AdvocateViewResourceReq />, <UserFooter />]} />


          {/* Bar council routes */}
          <Route path="/BarCouncilLogin" element={[<LandingNavbar />, <BarCouncilLogin />]} />

          {/* Admin routes */} 
          <Route path="/AdminLogin" element={[<LandingNavbar />, <FormHead title="Admin Login" />, <AdminLogin />, <AdminFooter />]} />
          <Route path="/admin-dashboard" element={[<AdminNav />, <AdminMain data="admindashboard" />, <AdminFooter />]} />
          <Route path="/admin-viewalladvocates" element={[<AdminNav />, <AdminMain data="adminviewalladvocates" />, <AdminFooter />]} />
          <Route path="/admin-viewallusers" element={[<AdminNav />, <AdminMain data="adminviewallusers" />, <AdminFooter />]} />
          <Route path="/admin_view_single_user/:id" element={[<AdminNav />, <AdminMain data="singleUser" />, <AdminFooter />]} />
          <Route path="/adminviewadvocaterequest" element={[<AdminNav />, <AdminMain data="approvereject" />, <AdminFooter />]} />
          <Route path="/adminviewrequest/:id" element={[<AdminNav />, <AdminMain data="adminviewrequest" />, <AdminFooter />]} />
          <Route path="/admin_view_single_advocate/:id" element={[<AdminNav />, <AdminMain data="adminviewsingleadvocate" />, <AdminFooter />]} />
          <Route path="/adminsidebar" element={<AdminSidebar />} />
          <Route path="/adminfooter" element={<AdminFooter />} /> 
          <Route path="/adminnav" element={<AdminNav />} />
          <Route path="/recentenquries" element={<RecentEnquries />} />
          <Route path="/adminviewrequest/:id" element={<ViewProfile_AR />} />
          <Route path="/admin_view_intern_adv_req" element={[<AdminNav />, <AdminMain data="approverejectIntern" />, <AdminFooter />]} />
          <Route path="/admin_view_intern_detailed_req/:id" element={[<AdminNav />, <AdminMain data="interndetailreq" />, <AdminFooter />]} />
          <Route path="/admin_view_intern_details/:id" element={[<AdminNav />, <AdminMain data="interndetails" />, <AdminFooter />]} />
          <Route path="/admin_view_approved_interns" element={[<AdminNav />, <AdminMain data="approvedInterns" />, <AdminFooter />]} />
          <Route path="/admin_view_complaints" element={[<AdminNav />, <AdminMain data="complaints" />, <AdminFooter />]} />
          <Route path="/admin_view_cases" element={[<AdminNav />, <AdminMain data="viewCases" />, <AdminFooter />]} />
          <Route path="/admin_view_single_case/:id" element={[<AdminNav />, <AdminMain data="viewSingleCase" />, <AdminFooter />]} />
          <Route path="/admin_view_case_status/:id" element={[<AdminNav />, <AdminMain data="status" />, <AdminFooter />]} />
          <Route path="/admin_view_added_evidences/:id" element={[<AdminNav />, <AdminMain data="evidence" />, <AdminFooter />]} />
          <Route path="/admin_view_client_payment_status/:id" element={[<AdminNav />, <AdminMain data="payment" />, <AdminFooter />]} />


          <Route path="/adminviewjunioradvocaterequest" element={[<AdminNav />,<AdminMain data='approverejectjunioradvocate'/>, <AdminFooter />]} />
          <Route path="/adminviewalljunioradvocates" element={[<AdminNav />,<AdminMain data="adminviewalljunioradvocates"/>, <AdminFooter />]} />
          <Route path="/JuniorAdvocateViewProfile/:id" element={[<AdminNav />,<AdminMain data='adminviewprofile-alladvocates'/>,<AdminFooter />]} />
          <Route path="/JuniorAdvocate-profile-request/:id" element={[<AdminNav />,<AdminMain data='adminviewprofile-requests'/>,<UserFooter />]} />

          {/* Junior Advocate routes */}
          <Route path="/JuniorAdvocateRegister" element={[<LandingNavbar />,<JuniorAdvocateRegistration/>,<UserFooter />]} />
          <Route path="/JuniorAdvocateLogin" element={[<LandingNavbar />,<JuniorAdvocateLogin/>,<UserFooter />]} />       
          <Route path="/JuniorAdvocateForgot" element={[<LandingNavbar />,<JuniorAdvocateForgotPassword/>,<UserFooter />]} />          
          <Route path="/JuniorAdvocate-homepage" element={[<JuniorAdvocateNavbar/>,<JuniorAdvocateHome />,<UserFooter />]} /> 
          <Route path="/JuniorAdvocate-editprofile" element={[<JuniorAdvocateNavbar/>,<JuniorAdvocateEditProfile />,<UserFooter />]} /> 
          <Route path="/JuniorAdvocate-viewalladvocate" element={[<JuniorAdvocateNavbar/>,<JuAdvocate_ViewAllAdvocates />,<UserFooter />]} /> 
          <Route path="/JuniorAdvocate-requestmentorship/:id" element={[<JuniorAdvocateNavbar/>,<JuAdvocate_RequestMentorshop />,<UserFooter />]} /> 
          <Route path="/junior_adv_view_mentor" element={[<JuniorAdvocateNavbar/>,<JuniorAdvocateViewMentor />,<UserFooter />]} /> 
          <Route path="/junior_adv_chat_to_adv/:aid" element={[<JuniorAdvocateNavbar/>,<JuniorAdvChatToAdv />,<UserFooter />]} /> 
          <Route path="/junior_adv_chat_to_user/:aid/:cid" element={[<JuniorAdvocateNavbar/>,<JuniorAdvChatToUser />,<UserFooter />]} /> 
          <Route path="/junior_adv_view_assigned_cases" element={[<JuniorAdvocateNavbar/>,<JuniorAdvViewAssignedCases />,<UserFooter />]} /> 
          <Route path="/junior_adv_view_assigned_cases_details/:id/:cid" element={[<JuniorAdvocateNavbar/>,<JuniorAdvViewAssignedCasesDetails />,<UserFooter />]} /> 
          <Route path="/junior_adv_add_complaint" element={[<JuniorAdvocateNavbar/>,<JuniorAdvAddComplaints />,<UserFooter />]} /> 
          <Route path="/junior_adv_view_adv_cases/:id" element={[<JuniorAdvocateNavbar/>,<FormHead title="Cases of Mentor" />,<JuniorAdvViewAllAdvCases />,<UserFooter />]} /> 
          <Route path="/junior_adv_view_adv_single_case/:id" element={[<JuniorAdvocateNavbar/>,<FormHead title="Cases of Mentor" />,<JuniorAdvViewAdvDetailCase />,<UserFooter />]} /> 
          <Route path="/junior_adv_view_assigned_case_evidences/:id" element={[<JuniorAdvocateNavbar/>,<FormHead title="Evidences" />,<JuniorAdvViewAssignedCasesEvidences />,<UserFooter />]} /> 


          {/* Intern Routes */}

          <Route path="/intern_registration" element={[<LandingNavbar />,<InternRegistration/>,<UserFooter />]} />
          <Route path="/intern_login" element={[<LandingNavbar />,<InternLogin/>,<UserFooter />]} />
          <Route path="/intern_forgot_password" element={[<LandingNavbar />,<InternForgotPassword/>,<UserFooter />]} />
          <Route path="/intern_home" element={[<InternNavbar />,<InternsHome/>,<UserFooter />]} />
          <Route path="/intern_add_complaint" element={[<InternNavbar />,<InternAddComplaints/>,<UserFooter />]} />
          <Route path="/intern_view_advocate" element={[<InternNavbar />,<InternViewAdv/>,<UserFooter />]} />
          <Route path="/intern_req_internship/:id" element={[<InternNavbar />,<InternRequestInternship/>,<UserFooter />]} />
          <Route path="/intern_view_internship_adv" element={[<InternNavbar />,<InternViewInternshipAdv/>,<UserFooter />]} />
          <Route path="/intern_view_adv_cases/:id" element={[<InternNavbar />,<FormHead title="Cases of Mentor" />,<InternViewMentorAllCases/>,<UserFooter />]} />
          <Route path="/intern_view_adv_single_case/:id" element={[<InternNavbar />,<FormHead title="Cases of Mentor" />,<InternViewSingleCaseOfMentor/>,<UserFooter />]} />
          
          <Route path="/intern_chat_to_adv/:aid" element={[<InternNavbar />,<InternChatToAdv/>,<UserFooter />]} />
          <Route path="/intern_group_chat" element={[<InternNavbar />,<InternGroupChat type={'noChat'} />,<UserFooter />]} />
          <Route path="/intern_single_chat/:id" element={[<InternNavbar />,<InternGroupChat type={'group'} />,<UserFooter />]} />
          <Route path="/intern_view_approved_case_resource" element={[<InternNavbar />,<InternViewApprovedCaseResource />,<UserFooter />]} />
          <Route path="/intern_view_approved_single_case_resource/:id" element={[<InternNavbar />,<InternViewSingleCaseResource />,<UserFooter />]} />
          <Route path="/intern_view_resource_case_status/:id" element={[<InternNavbar />,<InternViewResourceCaseStatus />,<UserFooter />]} />
          <Route path="/intern_view_resource_evidence_info/:id" element={[<InternNavbar />,<InternViewResourceAddedEvidences />,<UserFooter />]} />




          {/* Landing Page routes */}
          <Route path="/aboutus" element={[<LandingNavbar />,<AboutUs />,<UserFooter />]} />
          <Route path="/services" element={[<LandingNavbar />,<LandingServices />,<UserFooter />]} />
          <Route path="/contactus" element={[<LandingNavbar />,<ContactUs />,<UserFooter />]} />




        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
