import { useAuth } from "@/context/Auth"
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom"
import ThemeSwitch from '@/components/theme-switch'
import { Button } from "@/components/ui/button"
import { IconCurrency, IconInfoCircle } from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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
import { Badge } from "@/components/ui/badge"


export default function HomePage() {
  const { getSession } = useAuth();
  const navigate = useNavigate();

  const homepageDetailsLoaded = true;

  useEffect(() => {
    getSession().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
      console.log("Redirecting to login page");
      navigate("/login");
    });
  }, [])

  function navigateToProfile() {
    navigate("/profile");
  }
  function navigateToShop() {
    navigate("/shop");
  }

  const currency = homepageDetailsLoaded? (<p className="mb-0.5">{`999,999,999`}</p>) : (<Skeleton className="w-[100px] h-[20px] rounded-full" />);
  const monthlyUsageTitle = homepageDetailsLoaded? (`250 GB`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const monthlyUsageString = homepageDetailsLoaded? (`out of 1000 GB availaible`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  const additionalBandwidthTitle = homepageDetailsLoaded? (`5000 GB`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const additionalBandwidthTitleString = homepageDetailsLoaded? (`of excess overage availaible`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  const connectedDevicesTitle = homepageDetailsLoaded? (`0 Devices`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const connectedDevicesString = homepageDetailsLoaded? (`out of 0 supported devices`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  return (
    <Layout>

        <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
            <p className="text-2xl font-medium mb-1">Home</p>
            <Badge className="text-[12px]">v0.1-alpha</Badge>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            <Button variant='outline' size='sm'>
              <IconCurrency size={20} className="mr-2"/>
              {currency}
            </Button>
            <ThemeSwitch />
          </div>
        </Layout.Header>


        <Layout.Body>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>About Monthly Usage Bandwidth</AlertDialogTitle>
                <AlertDialogDescription>
                  This is the amount of monthly bandwidth you have used out of the total bandwidth available based on your subscription plan. It is reset every month at the beginning of your billing cycle.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Okay</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>

            <Card className="bg-inherit col-span-2">
              <CardHeader className="pb-2">
                <div className="flex">
                  <CardDescription className="text-secondary-foreground">Monthly Usage</CardDescription>
                  <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
                </div>
                <CardTitle className="text-3xl">{monthlyUsageTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{monthlyUsageString}</div>
              </CardContent>
              <CardFooter>
                <Button onClick={navigateToProfile} className="w-full h-8" variant="outline">
                  <p className="mb-1">Manage Subscription</p>
                </Button>
              </CardFooter>
            </Card>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>About Additional Bandwidth</AlertDialogTitle>
                  <AlertDialogDescription>
                    If you run out of your monthly bandwidth, you can purchase additional bandwidth to continue using the service without any interruptions. This additional bandwidth dosen't expire and can be used anytime.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

            <Card className="bg-inherit col-span-2">
              <CardHeader className="pb-2">
                <div className="flex">
                  <CardDescription className="text-secondary-foreground">Additional Bandwidth</CardDescription>
                  <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
                </div>
                <CardTitle className="text-3xl">{additionalBandwidthTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-2">
              <div className="text-xs text-muted-foreground">{additionalBandwidthTitleString}</div>
              </CardContent>
              <CardFooter>
                <Button onClick={navigateToShop} className="w-full h-8" variant="outline">
                  <p className="mb-1">Buy More</p>
                </Button>
              </CardFooter>
            </Card>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>About Connected Devices</AlertDialogTitle>
                  <AlertDialogDescription>
                    "Connected Devices" feature is not availaible yet.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

            <Card className="bg-inherit col-span-2 ">
              <CardHeader className="pb-2">
                <div className="flex">
                  <CardDescription className="text-secondary-foreground">Connected Devices</CardDescription>
                  <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
                </div>
                <CardTitle className="text-3xl">{connectedDevicesTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-2">
              <div className="text-xs text-muted-foreground">{connectedDevicesString}</div>
              </CardContent>
              <CardFooter>
                <AlertDialogTrigger className="w-full h-8" asChild>
                  <Button className="w-full h-8" variant="outline">
                    <div><p className="mb-1">Disconnect</p></div>
                  </Button>
                </AlertDialogTrigger>
              </CardFooter>
            </Card>
          </AlertDialog>
          </div>
        </Layout.Body>
    </Layout>
  )
}