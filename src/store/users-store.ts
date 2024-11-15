import { create } from "zustand";
import { IUser } from "@/interfaces/users";

export const useUsersGlobalStore = create((set) => ({
  loggedInUserData: null,
  setLoggedInUserData: (data: any) => set({ loggedInUserData: data }),
}));

export interface IUsersGlobalStore {
  loggedInUserData: IUser | null;
  setLoggedInUserData: (data: IUser) => void;
}
