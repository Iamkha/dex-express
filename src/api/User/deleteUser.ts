import { request } from "../request";
import axios, { AxiosResponse } from "axios";

export type DeleteOneByIdFunc = (
  id: string
) => Promise<AxiosResponse<{ message: string }>>;
export const deleteOneById: DeleteOneByIdFunc = (id) => {
  const url = `user/${id}`;
  return request.delete(url);
};
