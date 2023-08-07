import { request } from "../request";
import { AxiosResponse } from "axios";

export type UpdateOneByIdFunc<T = any> = (
  id: string,
  data: T
) => Promise<AxiosResponse<T>>;
export const updateOneById: UpdateOneByIdFunc = (id, data) => {
  const url = `user/${id}`;
  return request.put(url, data);
};
