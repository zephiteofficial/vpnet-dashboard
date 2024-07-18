export default interface UserProfileData {
  username: string;
  profile: {
    id: number;
    credit_balance: number;
    email: string;
    automatic_renewal: boolean;
    vpn_credentials: {
      username: string;
      password: string;
    };
  };
}