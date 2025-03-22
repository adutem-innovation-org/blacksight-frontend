export interface TopUser {
  id: string;
  userId: string;
  appointments: number;
  subscription: string;
  userDetails: UserDetails;
  lastLoginAt: string;
  nextSubscriptionDate: string;
}

type UserDetails = {
  name: string;
  email: string;
  imageUrl: string;
};
