import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS,
} from "react-admin";
export const auth = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request("http://10.111.1.95:8080/auth", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token, role }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          document.location.reload();
        }, "28800000");
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token")
      ? Promise.resolve()
      : Promise.reject({ redirectTo: "/login" });
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  }
  return Promise.reject("Unknown method");
};
