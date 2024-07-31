import { useEffect, useState } from "react";
import useFetch from "./use-fetch";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile, UserPlan, UserUsage } from "@/interfaces";

export default function useAPI() {
  const { toast } = useToast()
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [usageData, setUsageData] = useState<UserUsage | null>(null);
  const [planData, setPlanData] = useState<UserPlan | null>(null);

  const { data: profileDataResponse, error: profileDataError } = useFetch({
    url: import.meta.env.VITE_BASE_API_URL+"/v1/user/profile",
    method: "get",
    key: ["profile"],
    cache: {
      enabled: true,
      ttl: 3600,
    },
  });
  const { data: usageDataResponse, error: usageDataError } = useFetch({
    url: import.meta.env.VITE_BASE_API_URL+"/v1/user/usage",
    method: "get",
    key: ["usage"],
    cache: {
      enabled: true,
      ttl: 600,
    },
  });
  const { data: planDataResponse, error: planDataError } = useFetch({
    url: import.meta.env.VITE_BASE_API_URL+"/v1/user/plan",
    method: "get",
    key: ["plan"],
    cache: {
      enabled: true,
      ttl: 3600,
    },
  });

  if(profileDataError){
    toast({
      variant: "destructive",
      title: "API Error",
      description: "Couldn't call the User Profile API Endpoint"
    });
  }
  if(usageDataError){
    toast({
      variant: "destructive",
      title: "API Error",
      description: "Couldn't call the User Usage API Endpoint"
    });
  }
  if(planDataError){
    toast({
      variant: "destructive",
      title: "API Error",
      description: "Couldn't call the User Plan API Endpoint"
    });
  }

  useEffect(() => {
    if (profileDataResponse) {
      setProfileData(profileDataResponse.data);
    }
    if (usageDataResponse) {
      setUsageData(usageDataResponse.data)
    }
    if (planDataResponse) {
      setPlanData(planDataResponse.data)
    }
  }, [profileDataResponse, usageDataResponse, planDataResponse]);

  return { profileData, usageData, planData };
}