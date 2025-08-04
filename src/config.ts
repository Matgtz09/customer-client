// let API_BASE_URL = "";

// if (window.location.hostname === "localhost") {
//   API_BASE_URL = "http://localhost:3000";
// } else if (
//   window.location.hostname.includes("firebaseapp.com") ||
//   window.location.hostname.includes("web.app")
// ) {
//   API_BASE_URL = "https://rails-backend-420903537528.us-central1.run.app"; // ← paste here
// } else {
//   API_BASE_URL = "https://rails-backend-420903537528.us-central1.run.app";
// }

// export { API_BASE_URL };
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
