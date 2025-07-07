import apiUrl from "./config";

export const auth = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: "POST",
        credentials: "include", // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Login failed");
      }

      const { user } = await response.json();

      // Store only non-sensitive user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          fullName: user.fullname,
          username: user.username,
          role: user.role,
        })
      );

      return { data: user };
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("user");
      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },

  checkAuth: async () => {
    try {
      // Verify the cookie by making a request to a protected endpoint
      const response = await fetch(`${apiUrl}/auth/check`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      return Promise.resolve();
    } catch (error) {
      localStorage.removeItem("user");
      return Promise.reject({ redirectTo: "/login" });
    }
  },

  logout: async () => {
    try {
      await fetch(`${apiUrl}/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("sessionStartTime");
      return Promise.resolve();
    }
  },

  getIdentity: () => {
    const user = JSON.parse(localStorage.getItem("user") || {});
    return Promise.resolve({
      id: user.id,
      fullName: user.fullName || "Non défini",
      username: user.username || "Non défini", // Use username instead of email
      role: user.role || "Non défini",
    });
  },

  getPermissions: () => {
    const user = JSON.parse(localStorage.getItem("user") || {});
    return user.role
      ? Promise.resolve(user.role)
      : Promise.reject({ redirectTo: "/login" });
  },
  changePassword: async ({ currentPassword, newPassword }) => {
    try {
      const request = new Request(`${apiUrl}/auth/change-password`, {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
      });

      const response = await fetch(request);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Password change failed");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Network error during password change");
    }
  },
  updateProfile: async ({ fullName }) => {
    try {
      const request = new Request(`${apiUrl}/auth/update-profile`, {
        method: "PUT",
        body: JSON.stringify({ fullname: fullName }),
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
      });

      const response = await fetch(request);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Profile update failed");
      }

      // Update local storage
      const user = JSON.parse(localStorage.getItem("user"));
      user.fullName = fullName;
      localStorage.setItem("user", JSON.stringify(user));

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Network error during profile update");
    }
  },
};
