let apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.3:8081"
    : "http://192.168.1.3:8080";
const VUE_APP_API_URL = apiUrl;
export { VUE_APP_API_URL };
