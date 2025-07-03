// Centralised role constants and helper for permission checks
// Extend or edit the list below to match the exact role labels stored in the DB / JWT
export const Roles = {
  ADMIN: "admin",
  DG: "direction générale",
  NORMAL: "normal user",
  COMPTABLE_MIDELT: "comptable midelt",
  SUP_COMP_MIDELT: "superviseur comptabilite midelt",
  COMPTABLE_PDT: "comptable PdT",
  SUP_COMP: "superviseur comptabilite",
  ACHATEUR: "achateur",
  COMPTABLE: "comptable",
  DIR_CONSULT: "consultation directeur",
};

// Common role groups to avoid repetition
export const RoleGroups = {
  READ: [
    "admin",
    "direction générale",
    "normal user",
    "comptable midelt",
    "superviseur comptabilite midelt",
    "superviseur comptabilite",
    "comptable PdT",
    "comptable",
  ],
  READ_WITH_ACHA: [
    "admin",
    "direction générale",
    "normal user",
    "comptable midelt",
    "superviseur comptabilite midelt",
    "superviseur comptabilite",
    "comptable PdT",
    "achateur",
    "comptable",
  ],
  READ_WITH_CONSULT: [
    "admin",
    "direction générale",
    "consultation directeur",
    "normal user",
    "comptable midelt",
    "superviseur comptabilite midelt",
    "superviseur comptabilite",
    "comptable PdT",
    "comptable",
  ],
  ADMIN_DG: ["admin", "direction générale"],
};

/**
 * Simple RBAC helper.
 * @param {string} role - current user role returned by authProvider
 * @param {string[]} allowed - list of allowed roles
 * @returns {boolean}
 */
export const can = (role, allowed) => allowed.includes(role);
