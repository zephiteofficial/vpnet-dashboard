import ThemeSwitch from '@/components/dashboard/theme-switch'
import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import { CurrencyButton } from "@/components/dashboard/home/currency-button"
import { MonthlyUsageCard } from "@/components/dashboard/home/monthly-usage-card"
import { AdditionalBandwidthCard } from "@/components/dashboard/home/additional-bandwidth-card"
import { AnnouncementCard } from "@/components/dashboard/home/announcement-card"
import { useAPI } from "@/hooks/use-api"

export default function HomePage() {
  const { profileData } = useAPI()

  /*
  const connectedDevicesTitle = homepageDetailsLoaded? (`0 Devices`) : (<Skeleton className="mt-2 w-[100px] h-[28px] rounded-full" />);
  const connectedDevicesString = homepageDetailsLoaded? (`out of 0 supported devices`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />);
  */
  return (
    <Layout>

        <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
            <p className="text-2xl font-medium mb-1">Home</p>
            <Badge className="text-[12px]">v0.1a</Badge>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            {CurrencyButton(profileData)}
            <ThemeSwitch />
          </div>
        </Layout.Header>
        <Layout.Body>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {AnnouncementCard()}
            {MonthlyUsageCard(profileData)}
            {AdditionalBandwidthCard(profileData)}
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
