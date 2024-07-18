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
import { UserUsage } from "@/interfaces";

export default function AdditionalBandwidthCard(userUsage: UserUsage | null){
  const navigate = useNavigate();
  function navigateToShop() {
    navigate("/plans");
  }
  return(
    <AlertDialog>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Additional Premium Bandwidth</AlertDialogTitle>
            <AlertDialogDescription>
            Should you exhaust your monthly premium bandwidth, you have the option to buy more to maintain uninterrupted service. This extra bandwidth is permanent and will be utilized whenever your monthly allocation is depleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Okay</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
      <Card className="bg-inherit col-span-2">
        <CardHeader className="pb-0">
          <div className="flex">
            <CardDescription className="text-xs md:text-sm font-semibold text-secondary-foreground">Excess Bandwidth</CardDescription>
            <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer"><IconInfoCircle size={16} /></AlertDialogTrigger>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold">
            {userUsage ?
            (((userUsage.usage.bandwidth_surplus/1024/1024/1024)>=1000) ? (`${(userUsage.usage.bandwidth_surplus/1024/1024/1024/1024).toFixed(2)} TB`) : (`${(userUsage.usage.bandwidth_surplus/1024/1024/1024).toFixed(2)} GB`)) : 
            (<Skeleton className="mt-2 w-[100px] h-[24px] rounded-full" />) }
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="text-xs h-4 font-semibold text-muted-foreground">
            {userUsage ? (`of excess bandwidth availaible`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={navigateToShop} className="w-full h-6">
            <p className="text-xs font-semibold">View Plans</p>
          </Button>
        </CardFooter>
      </Card>
    </AlertDialog>
  )
}