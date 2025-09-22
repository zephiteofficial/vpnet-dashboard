import { Layout } from '@/components/custom/layout'
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
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import VersionBadge from '@/components/custom/version-badge'

interface PlanConfig {
  id: number;
  name: string;
  cost: string;
  description: string;
  bandwidth: string;
  devices: number;
}

const plans: Record<'monthly' | 'quarterly', PlanConfig[]> = {
  monthly: [
    {
      id: 1,
      name: "Lite",
      cost: "69",
      description: "Dip your toes into greatness",
      bandwidth: "5 GB",
      devices: 2
    },
    {
      id: 2,
      name: "Basic",
      cost: "139",
      description: "Elevate your experience",
      bandwidth: "40 GB",
      devices: 3
    },
    {
      id: 11,
      name: "Essential",
      cost: "199",
      description: "Elevate your experience",
      bandwidth: "80 GB",
      devices: 4
    },
    {
      id: 3,
      name: "Standard",
      cost: "279",
      description: "For the ambitious achievers",
      bandwidth: "120 GB",
      devices: 5
    },
    {
      id: 4,
      name: "Plus",
      cost: "449",
      description: "Unleash the ultimate potential",
      bandwidth: "300 GB",
      devices: 7
    }
  ],
  quarterly: [
    {
      id: 12,
      name: "Lite Quarterly",
      cost: "189",
      description: "Dip your toes into greatness",
      bandwidth: "25 GB",
      devices: 2
    },
    {
      id: 13,
      name: "Basic Quarterly",
      cost: "379",
      description: "Elevate your experience",
      bandwidth: "150 GB",
      devices: 3
    },
    {
      id: 14,
      name: "Essential Quarterly",
      cost: "549",
      description: "For the ambitious achievers",
      bandwidth: "280 GB",
      devices: 4
    },
    {
      id: 15,
      name: "Standard Quarterly",
      cost: "769",
      description: "For the ambitious achievers",
      bandwidth: "400 GB",
      devices: 5
    },
    {
      id: 16,
      name: "Plus Quarterly",
      cost: "1249",
      description: "Unleash the ultimate potential",
      bandwidth: "1 TB",
      devices: 7
    }
  ]
};

export default function PlansPage() {
  const { profileData, planData } = useAPI();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  
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
          <div className='space-y-0.5 mb-4'>
            <div className=" flex items-center space-x-2">
              <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Pricing Plans</h1>
              <VersionBadge />
            </div>
            <p className='text-muted-foreground'>
            Choose the right plan for yourself
            </p>
            <div className='flex items-center'>
            <Switch className='mr-2 h-4 w-9'
              checked={billingCycle === 'quarterly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'quarterly' : 'monthly')}
            />
            {billingCycle === 'monthly' ? (
              <p className='text-md text-muted-foreground'>Monthly</p>
            ) : (
              <p className='text-md text-muted-foreground'>Quarterly</p>
            )}
          </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-center'>
            {/*
            {SpecialPricingCard(7, "VRGC Solo Day Pass", "9", "One Day, One Mission - Game On!", "5 GB", "1 day", "1 Simultaneous Device", planData?.plan.id!=0)}
            {SpecialPricingCard(8, "VRGC Team Day Pass", "29", "Squad Up for a Day of Victory!", "30 GB", "1 day", "6 Simultaneous Devices", planData?.plan.id!=0)}
            {SpecialPricingCard(9, "VRGC Solo Week Pass", "39", "7 Days of Glory - Go All In!", "30 GB", "7 days", "1 Simultaneous Devices", planData?.plan.id!=0)}
            {SpecialPricingCard(10, "VRGC Team Week Pass", "129", "A Full Week to Dominate the Arena!", "200 GB", "7 days", "6 Simultaneous Devices", planData?.plan.id!=0)}
            
            {PricingCard(1, "Lite", "69", "Dip your toes into greatness", "5 GB", "1 Simultaneous Device", planData?.plan.id!=0)}
            {PricingCard(2, "Basic", "139", "Elevate your experience", "40 GB", "2 Simultaneous Devices", planData?.plan.id!=0)}
            {PricingCard(3, "Standard", "279", "For the ambitious achievers", "120 GB", "4 Simultaneous Devices", planData?.plan.id!=0)}
            {PricingCard(4, "Plus", "449", "Unleash the ultimate potential", "300 GB", "6 Simultaneous Devices", planData?.plan.id!=0)}
            */}
            {plans[billingCycle].map((plan) => (
              <PricingCard
                key={plan.id}
                id={plan.id}
                name={plan.name}
                cost={plan.cost}
                description={plan.description}
                bandwidth={plan.bandwidth}
                devices={plan.devices}
                disabled={planData?.plan.id !== 0}
                billingCycle={billingCycle}
              />
            ))}
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

export function PricingCard(props: {
  id: number;
  name: string;
  cost: string;
  description: string;
  bandwidth: string;
  devices: number;
  disabled?: boolean;
  billingCycle: 'monthly' | 'quarterly';
}) {
  const { id, name, cost, description, bandwidth, devices, disabled, billingCycle } = props;
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
            This action will deduct {cost} credits from your account and subscribe you to the {name} plan for {billingCycle === 'quarterly' ? '3 months' : '1 month'}.
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
              <p className='text-lg font-semibold ml-1 mt-1'>
                / {billingCycle === 'quarterly' ? '3 months' : 'month'}
                </p>
            </div>
          </CardTitle>
          <CardTitle className='text-sm font-medium text-muted-foreground'>
            <p className='h-8'>{description}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {PricingFeatureText(`${bandwidth} of Premium Bandwidth`)}
          {PricingFeatureText(`Unlimited Basic Bandwidth`)}
          {PricingFeatureText(`${devices} ZephyrPlus Connections`)}
          {PricingFeatureText(`${devices} IKEv2 Connections`)}
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
export function SpecialPricingCard(
    id: number,
    name: string,
    cost: string,
    description: string,
    bandwidth: string,
    days: string,
    devices: string,
    disabled?: boolean
  ) {
    const { getSession } = useAuth();
    const { toast } = useToast();
    
    async function timeout(delay: number) {
      return new Promise((res) => setTimeout(res, delay));
    }
    
    async function getIdToken() {
      const data = await getSession();
      return data.session.idToken.jwtToken;
    }
    
    const handleSubscribe = async () => {
      const idToken = await getIdToken();
      await axios
        .post(
          `${import.meta.env.VITE_BASE_API_URL}/v1/user/plan/subscribe?id=${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then(async (res) => {
          if (import.meta.env.VITE_ENV === "development") {
            console.log(res);
          }
          toast({
            title: "Subscription Successful",
            description:
              "You have successfully subscribed to the plan. Check out the guides page on how to setup your VPN.",
          });
          await timeout(5000);
          window.location.reload();
        })
        .catch((err) => {
          if (import.meta.env.VITE_ENV === "development") {
            console.log(err);
          }
          toast({
            variant: "destructive",
            title: "Subscription Failed",
            description: err.response.data.message,
          });
        });
    };
    
    return (
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you wish to continue?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will deduct {cost} credits from your account and subscribe
              you to the {name} plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubscribe}>
              Subscribe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        {/* Use the custom metallic-card class */}
        <Card className="metallic-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-muted-foreground">{name}</CardTitle>
            <CardTitle className="text-2xl font-semibold">
              <div className="flex items-center">
                <IconHexagonLetterV size={28} className="mr-1 mt-0.5" />
                {cost} for {days}
              </div>
            </CardTitle>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <p className="h-8">{description}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {PricingFeatureText(`${bandwidth} of Premium Bandwidth`)}
            {PricingFeatureText(`Unlimited Basic Bandwidth`)}
            {PricingFeatureText(`${devices}`)}
          </CardContent>
          <CardFooter>
            {disabled ? (
              <Button
                variant="outline"
                disabled
                className="w-full h-8 bg-transparent hover:bg-background"
              >
                Unavailaible
              </Button>
            ) : (
              <AlertDialogTrigger className="w-full" asChild>
                <Button
                  variant="outline"
                  className="w-full h-8 bg-transparent hover:bg-background"
                >
                  Subscribe
                </Button>
              </AlertDialogTrigger>
            )}
          </CardFooter>
        </Card>
      </AlertDialog>
    );
  }
  