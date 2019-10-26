import { AxiosResponse } from "axios";
import { IUser } from "../../model/user";
import { server } from "../server";

interface IResponse {
  data: IUser;
  token: string;
}

export const meApi = () => {
  return server.get<{}, AxiosResponse<IResponse>>("auth/me", {
    withCredentials: true,
  });
};
