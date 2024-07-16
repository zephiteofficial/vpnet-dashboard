import { useNavigate } from "react-router-dom"
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

export function MonthlyUsageCard(userPlan : UserPlan | null, userUsage: UserUsage | null){
  const navigate = useNavigate();
  function navigateToProfile() {
    navigate("/profile");
  }
  return(
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>About Premium Bandwidth</AlertDialogTitle>
          <AlertDialogDescription>
          Premium Bandwidth provides access to high-speed, low-latency servers. Your plan determines the bandwidth limit, which resets monthly. Usage of Basic Servers does not deplete your Premium Bandwidth.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Card className="bg-inherit col-span-2">
        <CardHeader className="pb-1">
          <div className="flex">
            <CardDescription className="text-xs md:text-sm font-semibold text-secondary-foreground">Premium Bandwidth</CardDescription>
            <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold">
            {userUsage ? (((userUsage.usage.bandwidth_used/1024/1024/1024)>=1000) ? (`${(userUsage.usage.bandwidth_used/1024/1024/1024/1024).toFixed(2)} TB`) : (`${(userUsage.usage.bandwidth_used/1024/1024/1024).toFixed(2)} GB`)) : (<Skeleton className="mt-2 w-[100px] h-[24px] rounded-full" />)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs font-semibold text-muted-foreground">
            {userPlan ? (((userPlan.plan.bandwidth_limit/1024/1024/1024)>=1000) ? (`out of ${(userPlan.plan.bandwidth_limit/1024/1024/1024/1024).toFixed(2)} TB availaible`) : (`out of ${(userPlan.plan.bandwidth_limit/1024/1024/1024).toFixed(2)} GB availaible`)) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={navigateToProfile} className="w-full h-8">
            <p className="text-xs md:text-sm font-semibold">Manage Plan</p>
          </Button>
        </CardFooter>
      </Card>
    </AlertDialog>
    
  )
}
