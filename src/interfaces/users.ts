export interface IUser {
  id: string;
  clerkUserId: string;
  currentSubscription: {
    _id: string;
    planId: any;
    expiryDate: string;
    createdAt: string;
    price: number;
    paymentId: string;
  };
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  isActive: boolean;
}
