import { create } from 'zustand';
import type { MockUser } from '@mocks';
import * as userService from '../services/user.service';
import type { UserListParams } from '../services/user.service';

interface UserState {
  data: MockUser[];
  total: number;
  loading: boolean;
  detail: MockUser | null;
  detailLoading: boolean;
  saving: boolean;
  fetchList: (params?: UserListParams) => Promise<void>;
  fetchById: (id: string) => Promise<MockUser | null>;
  create: (payload: Omit<MockUser, 'id' | 'createdAt'>) => Promise<MockUser>;
  update: (id: string, payload: Partial<MockUser>) => Promise<MockUser | null>;
  remove: (id: string) => Promise<boolean>;
  resetDetail: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  data: [],
  total: 0,
  loading: false,
  detail: null,
  detailLoading: false,
  saving: false,
  fetchList: async (params) => {
    set({ loading: true });
    try {
      const res = await userService.fetchUsers(params);
      set({ data: res.data, total: res.total });
    } finally {
      set({ loading: false });
    }
  },
  fetchById: async (id) => {
    set({ detailLoading: true });
    try {
      const user = await userService.fetchUserById(id);
      set({ detail: user });
      return user;
    } finally {
      set({ detailLoading: false });
    }
  },
  create: async (payload) => {
    set({ saving: true });
    try {
      return await userService.createUser(payload);
    } finally {
      set({ saving: false });
    }
  },
  update: async (id, payload) => {
    set({ saving: true });
    try {
      return await userService.updateUser(id, payload);
    } finally {
      set({ saving: false });
    }
  },
  remove: (id) => userService.deleteUser(id),
  resetDetail: () => set({ detail: null }),
}));

export default useUserStore;
