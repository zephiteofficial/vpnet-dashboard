import ThemeSwitch from '@/components/dashboard/theme-switch'
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
import { CurrencyButton } from '@/components/dashboard/currency-button'
import { VpnCredentailsCard } from '@/components/dashboard/servers/vpn-credentials-card'
import { useAPI } from '@/hooks/use-api'

export default function ServersPage() {
  const { profileData } = useAPI();

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
            <Badge className="text-[12px]">v0.1a</Badge>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            {CurrencyButton(profileData)}
            <ThemeSwitch />
          </div>
        </Layout.Header>

      <Layout.Body>
        <div className='mb-4'>
          <p className='text-lg font-medium'>Here are all the available servers.</p>
          <p className='text-sm text-muted-foreground'>You can connect to any of the servers below using the provided credentials.</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 lg:gap-8'>
          <div className='col-span-2 lg:col-span-4 lg:row-start-1'>
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
        
          <div className='col-span-2 mb-4 row-start-1'>
            {VpnCredentailsCard(profileData)}
          </div>
        </div>    
      </Layout.Body>
    </Layout>
  )
}