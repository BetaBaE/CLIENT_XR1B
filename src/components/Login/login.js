// Web3Login.jsx
import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import "./style.css";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // React.useEffect(() => {
  //   if (!localStorage.getItem("seenNewFeatures")) {
  //     Swal.fire({
  //       title: "Nouveautés ! 🎉",
  //       html: `
  //         <ul style="text-align: left;">
  //           <li>✨ Nouvelle fonctionnalité de comptabilité simplifiée</li>
  //           <li>🔒 Sécurité améliorée pour vos données</li>
  //           <li>🚀 Interface plus rapide et fluide</li>
  //         </ul>
  //       `,
  //       icon: "info",
  //       confirmButtonText: "Super, merci !",
  //       confirmButtonColor: "#4da7ca",
  //     }).then(() => {
  //       localStorage.setItem("seenNewFeatures", "true");
  //     });
  //   }
  // }, []);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Mot de passe oublié ?",
      text: "Veuillez contacter l’administrateur pour réinitialiser votre mot de passe.",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#4da7ca",
    });
  };
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // will call authProvider.login({ username, password })
    login({ username, password })
      .catch(() => {
        notify("identifiant ou mot de passe incorrect", {
          type: "warning",
          messageArgs: { _: "identifiant ou mot de passe incorrect" },
        });
        setUsername("");
        setPassword("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-section">
          <header>
            <h3 className="login-animation login-a1">
              Rebienvenue dans ton espace
            </h3>
            <h5 className="login-animation login-a2">
              Connecte-toi pour garder la main sur tes données et tes
              applications.
            </h5>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group login-animation login-a3">
              <label htmlFor="username">Username</label>
              <div className="login-input-with-icon">
                <input
                  type="text"
                  id="username"
                  className="login-input-field"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="login-input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div className="login-input-group login-animation login-a4">
              <label htmlFor="password">Password</label>
              <div className="login-input-with-icon">
                <input
                  type="password"
                  id="password"
                  className="login-input-field"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="login-input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="login-forgot-password login-animation login-a5">
              <a href="#" onClick={handleForgotPassword}>
                Mot de passe oublié ?
              </a>
            </div>

            <button
              className="login-btn login-animation login-a6"
              type="submit"
              id="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="login-loader"></div>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="login-right"></div>
    </div>
  );
};

export default Login;
