export default interface UserUsageData {
  username: string;
  usage: {
    active_sessions: number;
    active_session_bandwidth: number;
    bandwidth_used: number;
    bandwidth_surplus: number;
  };
}