import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import { HeaderRight } from '@/components/dashboard'
import { useAPI } from "@/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconCheck, IconHexagonLetterV } from '@tabler/icons-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import axios from 'axios'
import { useAuth } from '@/context/Auth'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PlansPage() {
  const { profileData, planData } = useAPI();
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
          {HeaderRight(profileData)}
        </Layout.Header>

        <Layout.Body className='pt-0'>
          <div className='space-y-0.5 mb-4 lg:mb-6'>
            <div className=" flex items-center space-x-2">
              <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Pricing Plans</h1>
              <Badge className="text-xs mt-1">v1.0b</Badge>
            </div>
            <p className='text-muted-foreground'>
            Choose the right plan for yourself
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-center'>
            {PricingCard(1, "Lite", "69", "Dip your toes into greatness", "20 GB", "1 Simultaneous Device", planData?.plan.id!=0)}
            {PricingCard(2, "Basic", "139", "Elevate your experience", "60 GB", "2 Simultaneous Devices", planData?.plan.id!=0)}
            {PricingCard(3, "Standard", "279", "For the ambitious achievers", "160 GB", "4 Simultaneous Devices", planData?.plan.id!=0)}
            {PricingCard(4, "Plus", "449", "Unleash the ultimate potential", "400 GB", "6 Simultaneous Devices", planData?.plan.id!=0)}
          </div>
          <div className='text-xs text-muted-foreground pt-6'>
            *The prices and features are subject to change. Please refer to the this page for the most up-to-date information.
          </div>
          <div className='text-xs text-muted-foreground pt-1'>
            **Please contact us if you wish to upgrade or downgrade your plan.
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

export function PricingCard(id: number, name: string, cost: string, description: string, bandwidth: string, devices: string, disabled?: boolean) {
  const { getSession } = useAuth();
  const { toast } = useToast();
  async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const handleSubscribe = async () => {
    const idToken = await getIdToken();
    await axios.post(`${import.meta.env.VITE_BASE_API_URL}/v1/user/plan/subscribe?id=${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    }).then(async (res) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(res)
      }
      toast({
        title: 'Subscription Successful',
        description: 'You have successfully subscribed to the plan. Check out the guides page on how to setup your VPN.'
      })
      await timeout(5000);
      window.location.reload();
    }).catch((err) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: err.response.data.message
      })
    })
  }
  return(
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you wish to continue?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will deduct {cost} credits from your account and subscribe you to the {name} plan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubscribe}>Subscribe</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
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
          {PricingFeatureText(`${bandwidth} of Premium Bandwidth`)}
          {PricingFeatureText(`Unlimited Basic Bandwidth`)}
          {PricingFeatureText(`${devices}`)}
        </CardContent>
        <CardFooter>
        
          { disabled
          ? (<Button variant='outline' disabled className='w-full h-8 hover:bg-primary hover:text-primary-foreground'> Unavailaible </Button>)
          : (
            <AlertDialogTrigger className='w-full' asChild>
              <Button variant='outline' className='w-full h-8 hover:bg-primary hover:text-primary-foreground'> Subscribe </Button>
            </AlertDialogTrigger>
          )
          }
        
        </CardFooter>
      </Card>
    </AlertDialog>
  )
}