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
