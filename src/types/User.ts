export type GENDER_TYPE = "male" | "female";
export type USER_STATUS_TYPE = "pending" | "active";

export interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
  level: string;
  status: USER_STATUS_TYPE;
  gender: GENDER_TYPE;
  goalWeight: number;
  birthDate: string;
  height: number;
  weight: number;
}
