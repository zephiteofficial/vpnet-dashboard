import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card'
import { VpnCredentailsCard } from '@/components/dashboard/'
import { HeaderRight } from '@/components/dashboard/'
import { useAPI } from "@/hooks"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default function ServersPage() {
  const { profileData } = useAPI();

  const servers = [
    {
      country: 'India',
      region: 'Mumbai',
      address: 'mumbai-p1.vp-net.org',
      type: 'Premium'
    },
    {
      country: 'India',
      region: 'Mumbai',
      address: 'mumbai-p2.vp-net.org',
      type: 'Test-Premium'
    },
    {
      country: 'India',
      region: 'Mumbai',
      address: 'mumbai-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'India',
      region: 'Mumbai',
      address: 'mumbai-b2.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'Singapore',
      region: 'Singapore',
      address: 'singapore-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'UK',
      region: 'London',
      address: 'uk-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'Canada',
      region: 'Beauharnois',
      address: 'canada-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'Poland',
      region: 'Warsaw',
      address: 'poland-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'Germany',
      region: 'Frankfurt',
      address: 'germany-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'Australia',
      region: 'Sydney',
      address: 'australia-b1.vp-net.org',
      type: 'Basic'
    },
    {
      country: 'France',
      region: 'Strasbourg',
      address: 'france-b1.vp-net.org',
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/#/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#/servers">Servers</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          </div>
          {HeaderRight(profileData)}
        </Layout.Header>

      <Layout.Body className='pt-0'>
        <div className='space-y-0.5 mb-4 lg:mb-6'>
          <div className=" flex items-center space-x-2">
            <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Servers</h1>
            <Badge className="text-xs mt-1">v1.2b</Badge>
          </div>
          <p className='text-muted-foreground'>
          You can connect to any of the servers below using the provided credentials.
          </p>
        </div>
        <div className='max-w-[1000px]'>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-7 lg:gap-8'>
            <div className='col-span-2 lg:col-span-5 lg:row-start-1'>
              <Card className='bg-inherit p-1'>
                <Table className='min-w-[550px]' >
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Country</TableHead>
                      <TableHead className="w-[140px]">Region</TableHead>
                      <TableHead className="w-[250px]">Address</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serverRows}
                  </TableBody>
                </Table>
              </Card>
            </div>
          
            <div className='col-span-3 lg:col-span-2 mb-4 row-start-1'>
              {VpnCredentailsCard(profileData)}
            </div>
          </div>    
        </div>
      </Layout.Body>
    </Layout>
  )
}