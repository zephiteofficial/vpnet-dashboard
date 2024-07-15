import { useNavigate } from "react-router-dom"
import ThemeSwitch from '@/components/theme-switch'
import { Button } from "@/components/ui/button"
import { IconBell, IconBox, IconCurrency, IconInfoCircle, IconNotification } from '@tabler/icons-react'
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
import { Car, Icon } from "lucide-react"


export default function HomePage() {
  const navigate = useNavigate();

  const homepageDetailsLoaded = true;

  function navigateToProfile() {
    navigate("/profile");
  }
  function navigateToShop() {
    navigate("/shop");
  }

  const currency = homepageDetailsLoaded? (<p>{`99,999`}</p>) : (<Skeleton className="w-[100px] h-[20px] rounded-full" />);
  const monthlyUsageTitle = homepageDetailsLoaded? (`250 GB`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const monthlyUsageString = homepageDetailsLoaded? (`out of 1000 GB availaible`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  const additionalBandwidthTitle = homepageDetailsLoaded? (`5000 GB`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const additionalBandwidthTitleString = homepageDetailsLoaded? (`of excess data availaible`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  const connectedDevicesTitle = homepageDetailsLoaded? (`0 Devices`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const connectedDevicesString = homepageDetailsLoaded? (`out of 0 supported devices`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  
  return (
    <Layout>

        <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
            <p className="text-2xl font-medium mb-1">Home</p>
            <Badge className="text-[12px]">v0.1a</Badge>
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
            <Card className="col-span-2 md:col-span-4 lg:col-span-4 row-span-2 bg-inherit">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold">Announcements</CardTitle>
                <CardDescription className="text-sm font-medium text-muted-foreground">Latest updates and news</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Card className="flex items-center h-16 px-4 bg-inherit">
                <div><IconBox className="mr-4" size={24}/></div>
                <div><p className="text-xs md:text-sm font-semibold">The dashboard is currently in Alpha Version 0.1</p></div>
                </Card>
                <Card className="flex items-center h-16 px-4 bg-inherit">
                  <div><IconBell className="mr-4" size={24}/></div>
                  <div><p className="text-xs md:text-sm font-semibold">This is a test announcement</p></div>
                </Card>
              </CardContent>
            </Card>
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
              <CardHeader className="pb-1">
                <div className="flex">
                  <CardDescription className="text-xs md:text-sm font-semibold text-secondary-foreground">Monthly Usage</CardDescription>
                  <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold">{monthlyUsageTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs font-semibold text-muted-foreground">{monthlyUsageString}</div>
              </CardContent>
              <CardFooter>
                <Button onClick={navigateToProfile} className="w-full h-8">
                  <p className="text-xs md:text-sm font-semibold">Manage Plan</p>
                </Button>
              </CardFooter>
            </Card>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>About Additional Bandwidth</AlertDialogTitle>
                  <AlertDialogDescription>
                    If you run out of your monthly bandwidth, you can purchase additional bandwidth to continue using the service without any interruptions. This additional bandwidth dosen't expire and will be used whenever you run out of your monthly bandwidth.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            <Card className="bg-inherit col-span-2">
              <CardHeader className="pb-1">
                <div className="flex">
                  <CardDescription className="text-xs md:text-sm font-semibold text-secondary-foreground">Excess Bandwidth</CardDescription>
                  <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold">{additionalBandwidthTitle}</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="text-xs font-semibold text-muted-foreground">{additionalBandwidthTitleString}</div>
              </CardContent>
              <CardFooter>
                <Button onClick={navigateToShop} className="w-full h-8">
                  <p className="text-xs md:text-sm font-semibold">Buy More</p>
                </Button>
              </CardFooter>
            </Card>
          </AlertDialog>

          {/* 
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
            <Card className="bg-inherit col-span-2 col-start-5">
              <CardHeader className="pb-0">
                <div className="flex">
                  <CardDescription className="text-sm font-semibold text-secondary-foreground">Connected Devices</CardDescription>
                  <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer hover:text-muted-foreground"><IconInfoCircle size={16} /></AlertDialogTrigger>
                </div>
                <CardTitle className="text-2xl font-bold">{connectedDevicesTitle}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
              <div className="text-xs font-semibold text-muted-foreground">{connectedDevicesString}</div>
              </CardContent>
              <CardFooter>
                <AlertDialogTrigger className="w-full h-8" asChild>
                  <Button className="w-full h-8">
                  Disconnect
                  </Button>
                </AlertDialogTrigger>
              </CardFooter>
            </Card>
          </AlertDialog>
          */}
          </div>
        </Layout.Body>
    </Layout>
  )
}