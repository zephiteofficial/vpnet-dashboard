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
  const { profileData, usageData, planData } = useAPI()

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
            {MonthlyUsageCard(planData, usageData)}
            {AdditionalBandwidthCard(usageData)}
            {DeviceDetailsCard(planData, usageData)}
            {AnnouncementCard()}
          </div>
        </Layout.Body>
    </Layout>
  )
}
