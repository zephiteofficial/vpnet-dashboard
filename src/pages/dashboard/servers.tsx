import ThemeSwitch from '@/components/theme-switch'
import { Button } from "@/components/ui/button"
import { IconCurrency } from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'


export default function ServerPage() {
  const homepageDetailsLoaded = true;
  const currency = homepageDetailsLoaded? (<p className="mb-0.5">{`999,999,999`}</p>) : (<Skeleton className="w-[100px] h-[20px] rounded-full" />);
  const servers = [
    {
      country: 'India',
      region: 'Mumbai',
      address: 'mumbai-test.vp-net.org',
      type: 'Premium'
    },
    {
      country: 'India',
      region: 'Mumbai',
      address: 'mumbai-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'Singapore',
      region: 'Singapore',
      address: 'singapore-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'United Kingdom',
      region: 'London',
      address: 'uk-b1.vp-net.org',
      type: 'Basic'
    },
  ]

  const serverRows = servers.map((server, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">{server.country}</TableCell>
      <TableCell>{server.region}</TableCell>
      <TableCell>{server.address}</TableCell>
      <TableCell className="text-right">{server.type}</TableCell>
    </TableRow>
  ))

  return (
    <Layout>
      <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
            <p className="text-2xl font-medium mb-1">Servers</p>
            <Badge className="text-[12px]">v0.1-alpha</Badge>
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
        <div className='mb-4'>
          <p className='text-lg font-medium'>Here are all the available servers.</p>
          <p className='text-sm text-muted-foreground'>You can connect to any of the servers below using the provided credentials.</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 lg:gap-8'>
          <div className='col-span-4 lg:row-start-1'>
            <Card className='bg-inherit p-1'>
              <Table className='outline' >
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Country</TableHead>
                    <TableHead className="w-[200px]">Region</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serverRows}
                </TableBody>
              </Table>
            </Card>
            
          </div>
        
          <div className='col-span-2 mb-4 row-start-1'>
            <Card className='bg-inherit'>
              <CardHeader className='pb-2'>
                <p className='font-medium text-lg'>VPN Credentials</p>
                <p className='text-sm text-muted-foreground'>Your credentials are as follows:</p>
              </CardHeader>
              <CardContent>
                <div className='mt-2 flex'>
                  <p className='text-sm'>Username</p>
                  <p className='ml-auto text-sm text-muted-foreground'>testuser</p>
                </div>
                <div className='mt-2 flex'>
                  <p className='text-sm'>Password</p>
                  <p className='ml-auto text-sm text-muted-foreground'>testpassword</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant='outline' className='w-full h-8'>Change Password</Button>
              </CardFooter>
            </Card>
          </div>
        </div>    
      </Layout.Body>
    </Layout>
  )
}