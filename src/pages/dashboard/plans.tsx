import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import { CurrencyButton } from "@/components/dashboard/"
import ThemeSwitch from '@/components/dashboard/theme-switch'
import { useAPI } from "@/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconCheck, IconHexagonLetterV } from '@tabler/icons-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default function Plans() {
  
  const { profileData } = useAPI();
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
                  <BreadcrumbLink href="/#/plans">Plans</BreadcrumbLink>
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
              <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Pricing Plans</h1>
              <Badge className="text-xs mt-1">v0.1a</Badge>
            </div>
            <p className='text-muted-foreground'>
            Choose the right plan for yourself
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-center'>
            {PricingCard("Lite", "69", "Dip your toes into greatness", "30 GB", "1 Simultaneous Device")}
            {PricingCard("Basic", "179", "Elevate your experience", "150 GB", "3 Simultaneous Devices")}
            {PricingCard("Standard", "269", "For the ambitious achievers", "300 GB", "5 Simultaneous Devices")}
            {PricingCard("Premium", "459", "Unleash the ultimate potential", "650 GB", "10 Simultaneous Devices")}
          </div>
        </Layout.Body>
    </Layout>
  )
}

export function PricingFeatureText(text: string) {
  return (
    <div className='flex items-start'>
      <div className='pt-0.5'><IconCheck className='text-primary' size={16} /></div>
      <div><CardDescription className='ml-2 text-muted-foreground'>{text}</CardDescription></div>
    </div>
    
    
  )
}
export function PricingCard(name: string, cost: string, description: string, bandwidth: string, devices: string){
  return(
    <Card className='bg-inherit'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-xl text-muted-foreground'>{name}</CardTitle>
        <CardTitle className='text-2xl font-semibold'>
          <div className='flex items-center'>
            <IconHexagonLetterV size={28} className='mr-1 mt-0.5'/>
            {cost}
            <p className='text-lg font-semibold ml-1 mt-1'>/ month</p>
          </div>
        </CardTitle>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          <p className='h-8'>{description}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {PricingFeatureText(`${bandwidth} of Premium Bandiwdth`)}
        {PricingFeatureText(`${devices}`)}
        {PricingFeatureText('Access to Basic Servers')}
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='w-full h-8 hover:bg-primary hover:text-primary-foreground'> Subscribe </Button>
      </CardFooter>
    </Card>
  )
}