import { IUser, IReqGetUser } from '../interfaces/user.interface';

export type UserState = {
  users?: IUser[];
  loading: boolean;
};
export type UserAction = {
  getUsers: (req: IReqGetUser) => Promise<void>;
  resetUserStore: () => void;
};

export type UserStore = UserState & UserAction;
