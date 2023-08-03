import { request } from "../request";

export const createUser = (data: any) => {
  const url = `user/register`;
  return request.post(url, data);
};
