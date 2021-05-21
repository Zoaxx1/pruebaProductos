import * as constans from "./constans";
import axios from "axios";

const token = localStorage.getItem("token");

const urlToken =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

const urlProduct = "https://test-lucas-594ea.firebaseio.com/products.json";

const authToken = "?auth=" + token;

type TokenProps = {
  email: string;
  password: string | any;
};

export const getToken = (info: TokenProps) => {
  return (dispatch: any) => {
    try {
      axios({
        method: "post",
        url: urlToken + "AIzaSyAGQtn7z7nfZVPKzx6Mf_Mkgyw2wo-Lhr8",
        data: { ...info, returnSecureToken: true },
      }).then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: constans.GET_TOKEN,
            payload: res.data.idToken,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProducts = () => {
  return (dispatch: any) => {
    try {
      axios({
        method: "get",
        url: urlProduct + authToken,
      }).then((res) => {
        if (res.status === 200) {
          return dispatch({ type: constans.GET_PRODUCTS, payload: res.data });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const postProducts = (information: any) => {
  return (dispatch: any) => {
    try {
      axios({
        method: "post",
        url: urlProduct + authToken,
        data: information,
      }).then((res) => {
        if (res.status === 200) {
          return dispatch({ type: constans.POST_PRODUCTS, payload: res.data });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduts = (key: string, set: (prop: boolean) => void) => {
  return () => {
    try {
      axios({
        method: "post",
        url:
          "https://test-lucas-594ea.firebaseio.com/products/" +
          key +
          ".json" +
          authToken,
        headers: { "X-HTTP-Method-Override": "DELETE" },
      }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          set(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
