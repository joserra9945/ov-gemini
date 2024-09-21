export interface IRoles {
  name: string;
  key: string;
  superAdmin?: boolean;
  permissions?: string[];
  path?: string;
}
