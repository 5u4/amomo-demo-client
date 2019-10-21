import { AxiosResponse } from "axios";
import { IUser } from "../../model/user";
import { IAvatarState } from "../../store/avatar/types";
import { server } from "../server";

export interface IRequest {
  username: string;
  email: string;
  password: string;
  avatar?: IAvatarState;
}

interface IResponse {
  data: IUser;
  token: string;
}

export const registerApi = (payload: IRequest) => {
  return server.post<IRequest, AxiosResponse<IResponse>>(
    "auth/register",
    payload
  );
};
