const router=require('express').Router()
const user=require('./User/userController')
const advocates=require('./Advocates/advocateController')
const junioradvocates=require('./JuniorAdvocate/junioradvocateController')
const cases=require('./Cases/caseController')
const appointments=require('./AdvAppointments/appointmentController')
 const chat=require('./Chats/chatController')
const mentorship=require('./JuniorAdvReqs/junoirAdvReqController')
const Interns=require('./Interns/internController')
const caseStatusController=require('./Cases/CaseStatus/caseStatusController')
const Payments=require('./Cases/Payments/paymentController')
const Evidences=require('./Cases/Evidences/evidenceController')
const blog=require('./Blogs/blogController')
const complaints=require('./complaints/complaintController')
const Reviews=require('./Reviews/reviewController')
const GroupChats=require('./Chats/GroupChats/chatController')
const InternReqs=require('./Interns/CaseReqs/caseReqController')
const JuniorCases=require('./JuniorAdvocate/CaseReqs/caseReqController')
const Internship=require('./InternshipReqs/internAdvReqController')
//advocate routes
router.post('/registerAdvocate',advocates.upload,advocates.registerAdvocate)
router.post('/viewAdvocateById/:id',advocates.viewAdvocateById)
router.post('/forgotPassword',advocates.forgotPassword)
router.post('/loginAdvocate',advocates.login)
router.post('/editAdvocateById/:id',advocates.uploadProfile,advocates.editAdvocateById)
router.post('/deleteAdvocateById/:id',advocates.deleteAdvocateById)
router.post('/resetPassword/:id',advocates.resetPassword)
router.post('/approveAdvocateById/:id',advocates.approveAdvocateById)
router.post('/rejectAdvocateById/:id',advocates.rejectAdvocateById)
router.post('/requireAuth',advocates.requireAuth)
router.post('/viewAdvocateReqs',advocates.viewAdvocateReqs)
router.post('/viewAdvocates',advocates.viewAdvocates)
router.post('/activateAdvocateById/:id',advocates.activateAdvocateById)
router.post('/deactivateAdvocateById/:id',advocates.deactivateAdvocateById)
router.post('/viewAdvocatesBySpecializn',advocates.viewAdvocatesBySpecializn)
router.post('/addRating/:id',advocates.addRating)

//junior advocate routes
router.post('/registerJuniorAdvocate',junioradvocates.upload,junioradvocates.registerJuniorAdvocate)
router.post('/viewJuniorAdvocates',junioradvocates.viewJuniorAdvocates)
router.post('/viewJuniorAdvocateReqs',junioradvocates.viewJuniorAdvocateReqs)
router.post('/approveJuniorAdvocateById/:id',junioradvocates.approveJuniorAdvocateById)
router.post('/rejectJuniorAdvocateById/:id',junioradvocates.rejectJuniorAdvocateById)
router.post('/activateJuniorAdvocateById/:id',junioradvocates.activateJuniorAdvocateById)
router.post('/deactivateJuniorAdvocateById/:id',junioradvocates.deactivateJuniorAdvocateById)
router.post('/editJuniorAdvocateById/:id',junioradvocates.uploadProfile,junioradvocates.editJuniorAdvocateById)
router.post('/viewJuniorAdvocateById/:id',junioradvocates.viewJuniorAdvocateById)
router.post('/deleteJuniorAdvocateById/:id',junioradvocates.deleteJuniorAdvocateById)
router.post('/junioradvocateforgotPassword',junioradvocates.forgotPassword)
router.post('/junioradvocateresetPassword/:id',junioradvocates.resetPassword)
router.post('/loginJuniorAdvocate',junioradvocates.login)
router.post('/requireAuth',junioradvocates.requireAuth)


//users routers
router.post('/registerUser',user.upload,user.registerUser)
router.post('/loginUser',user.login)
router.post('/editUserById/:id',user.upload,user.editUserById)
router.post('/viewUserById/:id',user.viewUserById)
router.post('/userforgotPassword',user.forgotPassword)
router.post('/resetPassword',user.resetPassword)
router.post('/deleteUserById/:id',user.deleteUserById)
router.post('/editUserById',user.upload,user.login)
router.post('/requireAuth',user.requireAuth)
router.post('/viewUsers',user.viewUsers)

//case routes
router.post('/createCase/:id',cases.upload,cases.createCase)
router.post('/getCaseType',cases.getCaseType)
router.post('/getCaseByUserId/:id',cases.getCaseByUserId)
router.post('/getCaseById/:id',cases.getCaseById)
router.post('/deleteCase/:id',cases.deleteCase)
router.post('/getAllCases',cases.getAllCases)




router.post('/createAppointment',appointments.createAppointment)
router.post('/getAppointmentReqsByUserId/:id',appointments.getAppointmentReqsByUserId)
router.post('/getAppointmentReqsForAdv/:id',appointments.getAppointmentReqsForAdv)
router.post('/acceptReqbyAdv/:id',appointments.acceptReqbyAdv)
router.post('/rejectReqbyAdv/:id',appointments.rejectReqbyAdv)
router.post('/getAppointmentReqsById/:id',appointments.getAppointmentReqsById)
router.post('/getApprovedAppointmentsForAdv/:id',appointments.getApprovedAppointmentsForAdv)
router.post('/getApprovedAppointmentsForAdv/:id',appointments.getApprovedAppointmentsForAdv)

//chatting
router.post('/chatting',chat.chatting)
router.post('/viewChatRecipientsforAdvocateById/:id',chat.viewChatRecipientsforAdvocateById)
router.post('/viewChatRecipientsforUserId/:id',chat.viewChatRecipientsforUserId)
router.post('/viewChatBetweenUserAndAdv',chat.viewChatBetweenUserAndAdv)
router.post('/viewChatBetweenInternAndAdv',chat.viewChatBetweenInternAndAdv)
router.post('/viewChatBetweenAdvAndJr',chat.viewChatBetweenAdvAndJr)
router.post('/viewChatBetweenUserAndJunior',chat.viewChatBetweenUserAndJunior)
router.post('/checkIfJrInchat',chat.checkIfJrInchat)            



//Jr Advocate Mentorshipreqs

router.post('/createMentorship',mentorship.createAppointment)
router.post('/getAppointmentReqsByjrId/:id',mentorship.getAppointmentReqsByjrId)
router.post('/getAppointmentReqsJnrForAdv/:id',mentorship.getAppointmentReqsForAdv)
router.post('/getAppointmentReqsById/:id',mentorship.getAppointmentReqsById)
router.post('/getApprovedJnrAppointmentsForAdv/:id',mentorship.getApprovedAppointmentsForAdv)
router.post('/acceptJnrReqbyAdv/:id',mentorship.acceptReqbyAdv)
router.post('/rejectJnrReqbyAdv/:id',mentorship.rejectReqbyAdv)
router.post('/getApprovedMentorForJuniors/:id',mentorship.getApprovedMentorForJuniors)


//Intern Routes
router.post('/registerInterns',Interns.upload,Interns.registerInterns)
router.post('/viewInternss',Interns.viewInternss)
router.post('/viewInternsReqs',Interns.viewInternsReqs)
router.post('/approveInternsById/:id',Interns.approveInternsById)
router.post('/rejectInternsById/:id',Interns.rejectInternsById)
router.post('/activateInternsById/:id',Interns.activateInternsById)
router.post('/deactivateInternsById/:id',Interns.deactivateInternsById)
router.post('/editInternsById/:id',Interns.upload,Interns.editInternsById)
router.post('/viewInternsById/:id',Interns.viewInternsById)
router.post('/internforgotPassword',Interns.forgotPassword)
router.post('/internresetPassword/:id',Interns.resetPassword)
router.post('/loginIntern',Interns.login)


//Intern reqs
router.post('/interncreateAppointment',Internship.createAppointment)
router.post('/interngetAppointmentReqsByUserId/:id',Internship.getAppointmentReqsByinternId)
router.post('/interngetAppointmentReqsForAdv/:id',Internship.getAppointmentReqsForAdv)
router.post('/internacceptReqbyAdv/:id',Internship.acceptReqbyAdv)
router.post('/internrejectReqbyAdv/:id',Internship.rejectReqbyAdv)
router.post('/interngetAppointmentReqsById/:id',Internship.getAppointmentReqsById)
router.post('/interngetApprovedAppointmentsForAdv/:id',Internship.getApprovedAppointmentsForAdv)
router.post('/interngetApprovedMentorForInterns/:id',Internship.getApprovedMentorForInterns)


//case status
router.post('/createStatus/:id',caseStatusController.createStatus)
router.post('/getStatusById/:id',caseStatusController.getStatusById)
router.post('/getStatusByCaseId/:id',caseStatusController.getStatusByCaseId)

//payments
router.post('/reqPayment/:id',Payments.reqPayment)
router.post('/getAllPaymentByAdvId/:id',Payments.getAllPaymentByAdvId)
router.post('/getPaymentsByCaseId/:id',Payments.getPaymentsByCaseId)
router.post('/getPaymentsById/:id',Payments.getPaymentsById)
router.post('/receivePaymentsById/:id',Payments.receivePaymentsById)

//evidences
router.post('/addEvidence/:id',Evidences.upload,Evidences.addEvidence)
router.post('/getEvidenceByCaseId/:id',Evidences.getEvidenceByCaseId)
router.post('/getEvidenceById/:id',Evidences.getEvidenceById)


//blogs
router.post('/addBlog/:id',blog.upload,blog.addBlog)
router.post('/viewBlogsById/:id',blog.viewBlogsById)
router.post('/editBlogsById/:id',blog.upload,blog.editBlogsById)
router.post('/deleteBlogsById/:id',blog.deleteBlogsById)
router.post('/viewAllBlogs',blog.viewAllBlogs)
router.post('/viewMyBlogsByadvocateId/:id',blog.viewMyBlogsByadvocateId)


//complaints
router.post('/addComplaint',complaints.addcomplaint)
router.post('/viewAllComplaints',complaints.viewAllcomplaints)
router.post('/viewComplaintById/:id',complaints.viewcomplaintById)
router.post('/deleteComplaintById/:id',complaints.deletecomplaintById)

//reviews
router.post('/addReview',Reviews.addReview)
router.post('/viewAllreviewsByAdvId/:id',Reviews.viewAllreviewsByAdvId)


//GroupChats
router.post('/createGroup/:id',GroupChats.createGroup)
router.post('/viewAllActiveGroups',GroupChats.viewAllActiveGroups)
router.post('/viewGroupById/:id',GroupChats.viewGroupById)
router.post('/viewgroupChatsByGroupId/:id',GroupChats.viewgroupChatsByGroupId)
router.post('/viewgroupsByInternId/:id',GroupChats.viewgroupsByInternId)
router.post('/closeGroupById/:id',GroupChats.closeGroupById)
router.post('/joinGroup/:id',GroupChats.joinGroup)

//Internreqs
router.post('/internreqCase',InternReqs.reqCase)
router.post('/internGetCaseReqsById/:id',InternReqs.getAppointmentReqsById)
router.post('/interngetAppointmentReqsByinternId/:id',InternReqs.getAppointmentReqsByinternId)
router.post('/internacceptInternCaseReqbyAdv/:id',InternReqs.acceptReqbyAdv)
router.post('/internrejectCaseReqbyAdv/:id',InternReqs.rejectReqbyAdv)
router.post('/interngetCaseAppointmentReqsById/:id',InternReqs.getAppointmentReqsById)
router.post('/interngetApprovedInternCasereqsForAdv/:id',InternReqs.getApprovedAppointmentsForAdv)
router.post('/getAppointmentCaseReqsForAdv/:id',InternReqs.getAppointmentReqsForAdv)
router.post('/getApprovedAppointmentsForIntern/:id',InternReqs.getApprovedAppointmentsForIntern)

//Junior cases reqs
router.post('/assignCaseforJr',JuniorCases.assignCaseforJr)
router.post('/getAssignedCaseReqsById/:id',JuniorCases.getAssignedCaseReqsById)
router.post('/getCasesAssignedForJrId/:id',JuniorCases.getCasesAssignedForJrId)

module.exports=router