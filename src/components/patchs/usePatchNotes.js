import { useEffect } from "react";
import Swal from "sweetalert2";

// Version history with patch notes
const PATCH_NOTES = {
  "2.0.0": [
    "👤 Nouveau profil utilisateur",
    "🔒 Fonction de mise à jour du mot de passe",
    "✏️ Édition du nom complet",
    "🌙 Mode sombre (dark mode)",
    "📱 Design responsive amélioré",
    "⚡ Optimisations des performances",
  ],
};

const CURRENT_VERSION = "2.0.0"; // Update this with each release

const PatchNotesDialog = () => {
  useEffect(() => {
    const seenVersions = JSON.parse(
      localStorage.getItem("seenPatchVersions") || "[]"
    );

    if (!seenVersions.includes(CURRENT_VERSION)) {
      Swal.fire({
        title: `Nouveautés de la version ${CURRENT_VERSION} 🎉`,
        html: `
          <div style="text-align: left; max-height: 60vh; overflow-y: auto;">
            <ul style="padding-left: 20px;">
              ${PATCH_NOTES[CURRENT_VERSION].map(
                (note) => `
                <li style="margin-bottom: 8px;">${note}</li>
              `
              ).join("")}
            </ul>
          </div>
        `,
        icon: "info",
        confirmButtonText: "Fermer",
        confirmButtonColor: "#4da7ca",
        width: "600px",
      }).then(() => {
        localStorage.setItem(
          "seenPatchVersions",
          JSON.stringify([...seenVersions, CURRENT_VERSION])
        );
      });
    }
  }, []);

  return null;
};

export default PatchNotesDialog;
