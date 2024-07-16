export default interface UserProfileData {
  username: string;
  profile: {
    id: number;
    credit_balance: number;
    email: string;
    vpn_credentials: {
      username: string;
      password: string;
    };
  };
}