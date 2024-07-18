import ThemeSwitch from '@/components/dashboard/theme-switch'
import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import { BandwidthUsageCard, AdditionalBandwidthCard, DeviceDetailsCard, AnnouncementCard, CurrencyButton } from '@/components/dashboard'
import { useAPI } from "@/hooks"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

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
          <div className='ml-auto flex items-center space-x-4'>
            {CurrencyButton(profileData)}
            <ThemeSwitch />
          </div>
        </Layout.Header>


        <Layout.Body className='pt-0'>
        <div className='space-y-0.5 mb-4 lg:mb-6'>
          <div className=" flex items-center space-x-2">
            <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Home</h1>
            <Badge className="text-xs mt-1">v1.0a</Badge>
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
            </div>
          </div>
        </Layout.Body>
    </Layout>
  )
}
