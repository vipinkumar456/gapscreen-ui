export const PATH = {
  LOGIN: 'user-management/api/v1/users/signIn',
  ACTIVATE_USER:'user-management/api/v1/users/password',
  GET_USER_FORGOT_PASSWORD:'user-management/api/v1/users/forget-password?userName=',
  FORGOT_PASSWORD:'user-management/api/v1/users/password',
  UPDATE_USER:'user-management/api/v1/users',
  GET_USER:'user-management/api/v1/users',

  GET_ALL_COUNTRIES:'agent-management/api/v1/countries',
  COMPANY_INFORMATION: 'agent-management/api/v1/company-information',
  GET_VENDOR_SETTINGS: 'agent-management/api/v1/vendor/settings',
  GET_DROPDOWNS: 'agent-management/api/v1/dropdowns',
  UPDATE_DOCUMENTS:'agent-management/api/v1/companyInformation/document/',
  AUDIT_HISTORY: 'agent-management/api/v1/auditInformation/',
  FILE_UPLOAD: 'agent-management/api/v1/s3Files',
  GET_UPLOADED_FILE: 'agent-management/api/v1/s3Files?fileName=',
  VENDOR_QUESTIONS: 'agent-management/api/v1/companies/questions/vendor',
  VENDOR_ESG: 'agent-management/api/v1/companies/esg/vendor',
  GET_FILE: 'agent-management/api/v1/files/get?objectName=',
  DELETE_FILE: 'agent-management/api/v1/files/delete?fileName=',
  NOTES_SUBMIT:'agent-management/api/v1/notes',
  GET_SUBMIT:'agent-management/api/v1/notes',
  GET_REGULATIONS:'agent-management/api/v1/vendor/setting/regulations-document',
  INVITE:'agent-management/api/v1/users/invite',
  INVITE_CUSTOMER:'agent-management/api/v1/customers/invite',
  REGISTER_COMPANY_ADMIN:'agent-management/api/v1/companies/admin/register',
  BULK_REGISTER_COMPANY_ADMIN:'agent-management/api/v1/companies/admin/bulk-register',
  REGISTER_COMPANY_SELF:'agent-management/api/v1/companies/register',
  INVITE_VENDOR:'agent-management/api/v1/vendor/invite',
  APPROVE_PENDING_USER:'agent-management/api/v1/companies/approve/',
  ACTIVATION_PENDING_USERS:'agent-management/api/v1/companies/status/',
  GET_ALL_COMPANIES:'agent-management/api/v1/companies',
  REGISTRATION_STATUS:'agent-management/api/v1/admin/registrationStats',
  REGISTRATION_STATUS_VENDOR:'agent-management/api/v1/companies/vendor/registrationStats',
  GET_USER_BY_ID:'agent-management/api/v1/companies/id/',
  VERIFYINVITATIONEMAIL:'agent-management/api/v1/invite-email',
  GET_ALL_VENDOR:'agent-management/api/v1/vendor',
  GET_LOGGEDIN_COMPANY:'agent-management/api/v1/companies/loggedInCompany',
  GET_LOGGEDIN_USER:'agent-management/api/v1/users/loggedInUser',
  GET_COMPANY_DETAILS:'agent-management/api/v1/companies/basic-details',
  GET_VENDOR_DETAILS:'agent-management/api/v1/vendor/loggedInVendor',
  SAVE_COMPANY_BASIC_DETAILS:'agent-management/api/v1/companies/basic-details',
  QUESTIONNAIRE:'agent-management/api/v1/companies/questions',
  GET_VENDOR_COMPANY_INFO:'agent-management/api/v1/companies/company/setting',
  GET_COMPANY_BY_ID:'agent-management/api/v1/companies/id/',
  POST_VENDOR_SETTINGS:'agent-management/api/v1/companies/vendor/setting',
  USER_MANAGEMENT:'agent-management/api/v1/companies/users',
  VENDOR_USER_MANAGEMENT:'agent-management/api/v1/vendor/users',
  VENDOR_ACTIVE_INACTIVE:'agent-management/api/v1/vendor/customer/',
  GET_CUSTOMER_COMPANY_INFORMATION:'agent-management/api/v1/company-information',
  REGULATIONS_Documents:'agent-management/api/v1/companies/setting/regulations-document',
  SURVEYS:"agent-management/api/v1/companies/setting/survey",
  SETTING_ESG:"agent-management/api/v1/companies/setting/esg",
  SURVEY_INVITE:"agent-management/api/v1/companies/survey/invite",
  GET_APPROVE_DATA:"agent-management/api/v1/company-information/status",
  RFI:"agent-management/api/v1/company-information/rfi",

  GET_OCR:"agent-management/api/v1/ocr/get-extracted-data",

  GET_VENDOR_BULK_INVITES:"agent-management/api/v1/s3Files",
  POST_VENDOR_BULK_INVITES:"agent-management/api/v1/vendor/bulk-invites",

  POST_CUSTOMER_BULK_INVITES:"agent-management/api/v1/companies/bulk-invites",
 


  GET_SEARCH_CIS:'search/api/v1/cis',
  GET_SEARCH_CIS_BY_ID:'search/api/v1/cis/data-summary',
  GET_CIS_RECORDS:'search/api/v1/cis/search-data',
  
};

export const SERVER_PATHS = {
  // http://ae4896cb06f214e8b966d3dd99c1b6d6-f70b869d6a261f9c.elb.eu-west-2.amazonaws.com:8080/
  DEV: '//af66f98aebf704faa9bf95786a83d69b-81a1d6555f8bcc1b.elb.eu-west-2.amazonaws.com:8080/',
  DEV_SEARCH: '//af66f98aebf704faa9bf95786a83d69b-81a1d6555f8bcc1b.elb.eu-west-2.amazonaws.com:8080/'
};
