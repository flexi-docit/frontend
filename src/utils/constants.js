export const serverBaseURL = "http://192.168.1.3:8000";

export const JWTIdentifier = "d_token";

export const JWTRegex = /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/;

export const PageAuthMatrix = [
  {
    name: "ForgotPassword",
    allRoles: true,
  },
  {
    name: "Home",
    allRoles: false,
    role: ["Developer", "ModuleLead", "TeamLead"],
  },
  {
    name: "Login",
    allRoles: true,
  },
  {
    name: "PageNotFound",
    allRoles: true,
  },
  {
    name: "ResetPassword",
    allRoles: true,
  },
];
