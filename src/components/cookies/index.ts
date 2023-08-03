import Cookies from "js-cookie";

export const setCookie = (cname: string, cvalue: any) => {
  Cookies.set(cname, cvalue);
};

export const getCookie = (cname: string) => {
  return Cookies.get(cname);
};

export const removeCookie = (cname: string) => {
  Cookies.remove(cname);
};
