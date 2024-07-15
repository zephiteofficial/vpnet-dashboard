import { useEffect, useState } from "react";
import useFetch from "./use-fetch";
import { useToast } from "@/components/ui/use-toast";

export function useAPI() {
  const { toast } = useToast()
  const [profileData, setProfileData] = useState();
  const { data, error } = useFetch({
    url: "https://api.vp-net.org/v1/profile",
    method: "get",
    key: ["profile"],
    cache: {
      enabled: true,
      ttl: 5,
    },
  });
  if(error){
    toast({
      variant: "destructive",
      title: "API Error",
      description: "Couldn't call the API endpoint"
    });
  }
  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);
  return { profileData };
}