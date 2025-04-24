import LandingCarousel from './Components/LandingPage/LandingCarousel';
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
import AdvocateRegister from './Components/Advocates/AdvocateRegister';
import AdvocateHome from './Components/Advocates/AdvocateHome';
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
import AdvcateReg from './Components/Advocates/AdvocateReg';

import UserNav_Main from './Components/User/UserNav_Main';
import InternRegistration from './Components/Interns/InternRegistration';
import InternLogin from './Components/Interns/InternLogin';
import InternsHome from './Components/Interns/InternsHome';
import InternNavbar from './Components/Interns/InternNavbar';
import AdvocateForgotPassword from './Components/Advocates/AdvocateForgotPassword';
import JuniorAdvocateForgotPassword from './Components/JuniorAdvocates/JuniorAdvocateForgotPassword';
import UserForgotPassword from './Components/User/UserForgotPassword';
import InternForgotPassword from './Components/Interns/InternForgotPassword';


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
          <Route path="/userfooter" element={<UserFooter />} />



          {/* Advocate routes */}
          <Route path="/AdvcateReg" element={[<LandingNavbar />, <AdvcateReg />]} />
          <Route path="/AdvocateLogin" element={[<LandingNavbar />, <AdvocateLogin />, <UserFooter />]} />
          <Route path="/AdvocateForgot" element={[<LandingNavbar />, <AdvocateForgotPassword />, <UserFooter />]} />
          <Route path="/AdvcateRegister" element={[<LandingNavbar />, <AdvocateRegister />, <UserFooter />]} />
          <Route path="/advocate_home" element={[<AdvocateNavbar />, <AdvocateHome />, <UserFooter />]} />
          <Route path="/advocate_edit_profile/:id" element={[<AdvocateNavbar />,<FormHead title="Advocate Profile View" />, <AdvocateEditProfile />,<UserFooter />]} />


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


          {/* Intern Routes */}

          <Route path="/intern_registration" element={[<LandingNavbar />,<InternRegistration/>,<UserFooter />]} />
          <Route path="/intern_login" element={[<LandingNavbar />,<InternLogin/>,<UserFooter />]} />
          <Route path="/intern_forgot_password" element={[<LandingNavbar />,<InternForgotPassword/>,<UserFooter />]} />
          <Route path="/intern_home" element={[<InternNavbar />,<InternsHome/>,<UserFooter />]} />



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
