import isAuthenticated from "../utils/isAuthenticated";

const withAuth =  (template: () => string) => {
    
  return () => {

    if (!isAuthenticated()) {
    window.location.href = "/";
    return "";
    }

  return template();
  }
    
}

export default withAuth;