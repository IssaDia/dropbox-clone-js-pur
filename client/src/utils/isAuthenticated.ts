const isAuthenticated = (): boolean => {

    const token = localStorage.getItem("authToken");

    return token ? true : false;

}

export default isAuthenticated;