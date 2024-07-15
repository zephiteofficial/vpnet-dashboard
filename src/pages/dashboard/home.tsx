import ThemeSwitch from '@/components/dashboard/theme-switch'
import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import { CurrencyButton } from "@/components/dashboard/currency-button"
import { MonthlyUsageCard } from "@/components/dashboard/home/monthly-usage-card"
import { AdditionalBandwidthCard } from "@/components/dashboard/home/additional-bandwidth-card"
import { DeviceDetailsCard } from '@/components/dashboard/home/device-details-card'
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
            {MonthlyUsageCard(profileData)}
            {AdditionalBandwidthCard(profileData)}
            {DeviceDetailsCard(profileData)}
            {AnnouncementCard()}
          </div>
        </Layout.Body>
    </Layout>
  )
}
