export const auth = {
  // authentication
  login: ({ username, password }) => {
    const request = new Request("http://10.111.1.68:8080/auth", {
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
      .then(({ auth, token, role }) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, fullName: username })
        );
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem(
            "auth",
            JSON.stringify({ ...auth, fullName: username })
          );
          document.location.reload();
        }, "30200000");
      });
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login required" }),
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  getIdentity: () => {
    const { fullName } = JSON.parse(localStorage.getItem("auth"));
    return Promise.resolve({ fullName });
  },
  getPermissions: () => {
    const role = localStorage.getItem("role");

    return role
      ? Promise.resolve(role)
      : Promise.reject({ redirectTo: "/login" });
  },
};
