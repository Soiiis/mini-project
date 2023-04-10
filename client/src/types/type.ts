import { GridRowId } from "@mui/x-data-grid";

export interface User {
  username: string;
  password: string;
  createAt: Date;
}
export interface Post {
  _id: GridRowId;
  postId: string;
  title: string;
  imageUrl: string;
  view: number;
  status: boolean;
}

export interface Location {
  _id: GridRowId;
  addressId: string;
  address: string;
  imageUrl: string;
  location: string;
  status: boolean;
}

export interface Payment {
  _id: GridRowId;
  logId: string;
  title: string;
  imageUrl: string;
  moneyUsed: string;
  status: boolean;
}

export interface Reward {
  _id: GridRowId;
  code: string;
  information: string;
  imageUrl: string;
  expired: string;
  status: boolean;
}
