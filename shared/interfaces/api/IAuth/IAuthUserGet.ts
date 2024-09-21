export interface IAuthUserGet {
  id: string;
  creationTime: string;
  departmentId: string;
  departmentName: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

type IAuthUserGetP = Promise<IAuthUserGet>;

export type { IAuthUserGetP };
