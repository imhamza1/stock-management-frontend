import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.baseURL = "https://booklitapi.herokuapp.com";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

class GenericService {
  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  Data = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  post = (url, data) =>
    new Promise((resolve, reject) => {
      // console.log(data.get("cart_data"));
      axios
        .post(url, data)
        .then((res) => {
          // console.log("talking from generic service", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  postData = (url, data, config) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  putData = (url, data, config) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  delete = (url) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

export default GenericService;
