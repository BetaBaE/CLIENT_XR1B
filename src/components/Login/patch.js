useEffect(() => {
  if (!localStorage.getItem("seenNewFeatures")) {
    Swal.fire({
      title: "Nouveautés ! 🎉",
      html: `
          <ul style="text-align: left;">
            <li>✨ Nouvelle fonctionnalité de comptabilité simplifiée</li>
            <li>🔒 Sécurité améliorée pour vos données</li>
            <li>🚀 Interface plus rapide et fluide</li>
          </ul>
        `,
      icon: "info",
      confirmButtonText: "Super, merci !",
      confirmButtonColor: "#4da7ca",
    }).then(() => {
      localStorage.setItem("seenNewFeatures", "true");
    });
  }
}, []);
