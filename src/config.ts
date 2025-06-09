let API_BASE_URL = "";

if (window.location.hostname === "localhost") {
  API_BASE_URL = "http://localhost:3000";
} else if (window.location.hostname.includes("staging")) {
  API_BASE_URL = "https://staging-backend.fly.dev";
} else {
  API_BASE_URL = "https://api-backend.fly.dev";
}

export { API_BASE_URL };