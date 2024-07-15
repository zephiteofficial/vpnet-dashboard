import { useEffect, useState } from "react";
import useFetch from "./use-fetch";

export function useAPI() {
  const [profileData, setProfileData] = useState();
  const { data } = useFetch({
    url: "https://api.vp-net.org/v1/profile",
    method: "get",
    key: ["profile"],
    cache: {
      enabled: true,
      ttl: 5,
    },
  });
  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);
  return { profileData };
}