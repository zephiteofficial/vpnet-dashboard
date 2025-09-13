import { Layout } from '@/components/custom/layout'
import { BandwidthUsageCard, AdditionalBandwidthCard, DeviceDetailsCard, AnnouncementCard } from '@/components/dashboard'
import { useAPI } from "@/hooks"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { HeaderRight } from '@/components/dashboard/'
import VersionBadge from '@/components/custom/version-badge'
import BarebonesPlusCard from '@/components/dashboard/home/barebones-plus-card'
import ZephyrPlusDownloads from '@/components/dashboard/home/zephyrplus-downloads'

export default function HomePage() {
  const { profileData, usageData, planData } = useAPI()

  return (
    <Layout>

        <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/#/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#/">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          </div>
          {HeaderRight(profileData)}
        </Layout.Header>


        <Layout.Body className='pt-0'>
        <div className='space-y-0.5 mb-4 lg:mb-6'>
          <div className=" flex items-center space-x-2">
            <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Home</h1>
            <VersionBadge />
          </div>
          <p className='text-muted-foreground'>
            View your premium bandwidth usage, device details and more.
          </p>
        </div>
          <div className='max-w-[1000px]'>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {BandwidthUsageCard(planData, usageData)}
              {AdditionalBandwidthCard(usageData)}
              {DeviceDetailsCard(planData, usageData)}
              {AnnouncementCard()}
              {ZephyrPlusDownloads()}
              {BarebonesPlusCard(planData)}
            </div>
          </div>
        </Layout.Body>
    </Layout>
  )
}
