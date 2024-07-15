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

export function DeviceDetailsCard(profileData:any){
  const data = profileData
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
        <CardHeader className="pb-1">
          <div className="flex">
            <CardDescription className="text-sm font-semibold text-secondary-foreground">Connected Devices</CardDescription>
            <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
          </div>
          <CardTitle className="text-2xl font-bold">
            {data ? (`${data.data.attributes.connected_devices} Devices`) : (<Skeleton className="mt-2 w-[100px] h-[24px] rounded-full" />)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs font-semibold text-muted-foreground">
            {data ? (`out of ${data.data.attributes.device_limit} allowed devices`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialogTrigger className="w-full h-8" asChild>
            <Button className="w-full h-8">
            <p className="text-xs md:text-sm font-semibold">Disconnect</p>
            </Button>
          </AlertDialogTrigger>
        </CardFooter>
      </Card>
    </AlertDialog>
  )
}