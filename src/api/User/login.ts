import { request } from "../request";

export function signIn(email: string, password: string) {
  return request.post("user", {
    email,
    password,
  });
}

export interface ITokenData {
  email: string;
  firstName: string;
  lastName: string;
  role: string[];
  exp: number;
  iat: number;
  id: string;
}
