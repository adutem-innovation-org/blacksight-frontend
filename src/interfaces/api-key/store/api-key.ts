export interface ApiKey {
  _id: string;
  ownerId: string;
  createdBy: string;
  expiresAt: string;
  scopes: string[];
  revoked: boolean;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  secretKey: string;
}
