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

export default function DeviceDetailsCard(userPlan : UserPlan | null, userUsage: UserUsage | null){
  return(
    <AlertDialog>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>About Connected Devices</AlertDialogTitle>
            <AlertDialogDescription>
              "Disconnect Devices" feature is not availaible yet.
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
            {userPlan ? (`connected out of ${userPlan.plan.device_limit === 0 ? 0 : userPlan.plan.device_limit - 1} devices`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialogTrigger className="w-full h-8" asChild>
            <Button className="w-full h-6">
            <p className="text-xs font-semibold">Disconnect</p>
            </Button>
          </AlertDialogTrigger>
        </CardFooter>
      </Card>
    </AlertDialog>
  )
}