import { localStorageConstants } from "./constants";

const { tokenKey, roleKey, IDKey } = localStorageConstants;
const JWTRegex = /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/;

const checkAndManageAuth = (stateStore, router) => {
  const token = localStorage.getItem(tokenKey);
  const role = localStorage.getItem(roleKey);
  const ID = localStorage.getItem(IDKey);
  if (JWTRegex.test(token) && role !== null && ID !== null) {
    stateStore.commit("setLoggedIn", true);
    stateStore.commit("setRole", role);
    stateStore.commit("setID", ID);
  } else {
    // window.alert("You have been logged out, please log in again");
    stateStore.commit("setLoggedIn", false);
    stateStore.commit("setRole", null);
    stateStore.commit("setID", null);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(roleKey);
    localStorage.removeItem(IDKey);
    router.push("/login");
  }
};

export default checkAndManageAuth;
