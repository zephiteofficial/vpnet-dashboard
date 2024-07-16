export default interface UserPlanData {
  username: string;
  plan: {
    id: number;
    name: string;
    cost: number;
    bandwidth_limit: number;
    device_limit: number;
    auto_renewal: boolean;
    start_date: string;
    end_date: string;
  };
}