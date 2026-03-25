const API =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL;

export default API;