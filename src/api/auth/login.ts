import { AxiosResponse } from "axios";
import { IUser } from "../../model/user";
import { server } from "../server";

export interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  data: IUser;
  token: string;
}

export const loginApi = (payload: IRequest) => {
  return server.post<IRequest, AxiosResponse<IResponse>>("auth/login", payload);
};
