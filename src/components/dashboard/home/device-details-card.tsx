import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { IconInfoCircle } from '@tabler/icons-react'
import { UserPlan, UserUsage } from "@/interfaces";
import { useAuth } from "@/context/Auth";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

export default function DeviceDetailsCard(userPlan : UserPlan | null, userUsage: UserUsage | null){
  const [isLoading, setIsLoading] = useState(false);
  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const { toast } = useToast()
  const handleDisconnect = async () => {
    setIsLoading(true);
    const idToken = await getIdToken();
    try{
      await axios.get(`${import.meta.env.VITE_BASE_API_URL}/v1/user/disconnect`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then(async (res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res)
        }
        if(res.status === 200){
          toast({
            title: "Success",
            description: res.data.message,
          })
        }
        else {
          toast({
            title: "Error",
            description: "An unexpected error occurred.",
            variant: "destructive"
          })
        }
        setIsLoading(false);
      })
    } catch (error) {
      if(import.meta.env.VITE_ENV === 'development'){
        console.error(error)
      }
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      })
      setIsLoading(false);
    }
  }
  return(
    <AlertDialog>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>About Connected Devices</AlertDialogTitle>
            <AlertDialogDescription>
              This shows your connected devices. Click the button below to disconnect all devices at once. Note that some devices may automatically reconnect, and you might need to disconnect them from their own settings. You may need to try disconnecting multiple times for some devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Okay</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
      <Card className="bg-inherit col-span-2">
        <CardHeader className="pb-0">
          <div className="flex">
            <CardDescription className="text-sm font-semibold text-secondary-foreground">Connected Devices</CardDescription>
            <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer"><IconInfoCircle size={16} /></AlertDialogTrigger>
          </div>
          <CardTitle className="text-2xl font-bold">
            {userUsage ? (`${userUsage.usage.active_sessions} Devices`) : (<Skeleton className="mt-2 w-[100px] h-[24px] rounded-full" />)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="text-xs h-4 font-semibold text-muted-foreground">
            {userPlan ? (`connected out of ${userPlan.plan.device_limit === 0 ? 0 : userPlan.plan.device_limit} devices`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full h-6" onClick={handleDisconnect} disabled={isLoading}>
              {isLoading ? "Disconnecting..." : "Disconnect"}
            </Button>
        </CardFooter>
      </Card>
    </AlertDialog>
  )
}

