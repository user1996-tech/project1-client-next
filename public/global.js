// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
// const apiAddress = "http://192.168.20.32:5000";
const apiAddress = "https://transfermain.cloud";

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
  var nameEQ = name + "=";
  console.log(document.cookie);
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const login = async (username, password) => {
  const url = apiAddress + "/login/" + username + "&" + password;
  const res = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data === "error") {
        return "error";
      } else {
        // console.log(data);
        return data;
      }
    });
  return res;
};

const signUp = async (username, password) => {
  const url = apiAddress + "/signup/" + username + "&" + password;
  const res = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return res;
};

const checkLoggedIn = async (navigate, to = "/dashboard") => {
  const Cusername = getCookie("username");
  const Cpassword = getCookie("password");

  const response = await login(Cusername, Cpassword);
  if (response != "error") {
    navigate(to);
  }
};

export { setCookie, getCookie, login, signUp, checkLoggedIn, apiAddress };
