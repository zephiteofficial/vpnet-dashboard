import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import { CurrencyButton } from "@/components/dashboard/currency-button"
import ThemeSwitch from '@/components/dashboard/theme-switch'
import { useAPI } from '@/hooks/use-api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconCheck, IconHexagonLetterV } from '@tabler/icons-react'

export function PricingFeatureText(text: string) {
  return (
    <CardDescription className='flex items-center text-muted-foreground'>
      <IconCheck className='text-primary' size={16} />
      <p className='ml-2'>{text}</p>
    </CardDescription>
  )
}
export function PricingCard(name: string, cost: string, description: string, bandwidth: string, devices: string){
  return(
    <Card className='bg-inherit'>
      <CardHeader className='mb-4'>
        <CardTitle className='text-xl text-muted-foreground'>{name}</CardTitle>
        <CardTitle className='text-2xl font-semibold'>
          <div className='flex items-center'>
            <IconHexagonLetterV size={28} className='mr-1 mt-0.5'/>
            {cost}
            <p className='text-lg font-semibold ml-1 mt-1'>/ month</p>
          </div>
        </CardTitle>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          <p>{description}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className='mb-4'>
        {PricingFeatureText(`${bandwidth} of Premium Bandiwdth`)}
        {PricingFeatureText(`${devices}`)}
        {PricingFeatureText('Access to Basic Servers')}
      </CardContent>
      <CardFooter className='mb-4'>
        <Button variant='outline' className='w-full h-8 hover:bg-primary hover:text-primary-foreground'> Subscribe </Button>
      </CardFooter>
    </Card>
  )
}

export default function Plans() {
  
  const { profileData } = useAPI();
  return (
    <Layout>
      <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
            <p className="text-2xl font-medium mb-1">Plans</p>
            <Badge className="text-[12px]">v0.1a</Badge>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            {CurrencyButton(profileData)}
            <ThemeSwitch />
          </div>
        </Layout.Header>

        <Layout.Body>
          <div>
            <p className='flex text-xl lg:text-2xl xl:text-3xl mb-2 font-bold justify-center'>Pricing Plans</p>
            <p className='flex text-sm lg:text-base xl:text-lg font-semibold justify-center text-center'>Choose the right plan that fits your needs</p>
          </div>
          <div className='pt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 justify-center'>
            {PricingCard("Lite", "69", "Dip your toes into greatness", "30 GB", "1 Simultaneous Device")}
            {PricingCard("Basic", "179", "Elevate your experience", "150 GB", "3 Simultaneous Devices")}
            {PricingCard("Standard", "269", "For the ambitious achievers", "300 GB", "5 Simultaneous Devices")}
            {PricingCard("Premium", "459", "Unleash the ultimate potential", "650 GB", "10 Simultaneous Devices")}
          </div>
        </Layout.Body>

    </Layout>
  )
}