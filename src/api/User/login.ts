import { request } from "../request";

export function signIn(email: string, password: string) {
  return request.post("user", {
    email,
    password,
  });
}
