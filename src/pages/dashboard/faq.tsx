import { Layout } from '@/components/custom/layout'
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HeaderRight } from '@/components/dashboard/'
import { useAPI } from "@/hooks"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Link } from 'react-router-dom'

export default function FAQPage() {
  const { profileData } = useAPI();

  return (
    <Layout>
      <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
          <Breadcrumb className='hidden sm:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/#/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#/faq">FAQ</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          </div>
          {HeaderRight(profileData)}
        </Layout.Header>

      <Layout.Body className='pt-0'>
        <div className='space-y-0.5 mb-4 lg:mb-6'>
          <div className=" flex items-center space-x-2">
            <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>FAQ</h1>
            <Badge className="text-xs mt-1">v1.0a</Badge>
          </div>
          <p className='text-muted-foreground'>
            Look here for answers to common questions
          </p>
        </div>
        <div className=''>
          <Accordion type="single" collapsible defaultValue={window.screen.width >= 768 ? "item" : ""}>
            <AccordionItem value="vpn-guide">
              <AccordionTrigger>How to Set Up A VPNet VPN Connection on Windows</AccordionTrigger>
              <AccordionContent className='space-y-2'>
                <h3 className='text-base font-medium pb-1'>Creating an IKEv2 VPN Profile</h3>
                <ol className='pl-2 space-y-1'>
                  <li><span className='font-semibold'>1.</span> Navigate to <strong className='font-medium'>Start &gt; Settings &gt; Network & internet &gt; VPN &gt; Add a VPN connection</strong>.</li>
                  <li><span className='font-semibold'>2.</span> In the <strong className='font-medium'>Add a VPN connection</strong> window, fill out the form with the following details:
                    <ul className='pl-2 py-2 space-y-0.5'>
                      <li><strong className='font-medium'>- VPN provider:</strong> Select <em>Windows (built-in)</em>.</li>
                      <li><strong className='font-medium'>- Connection name:</strong> Give your connection a memorable name.</li>
                      <li><strong className='font-medium'>- Server name or address:</strong> Type the address for a <Link className='hover:underline' to={"/servers"}>VPN server</Link></li>
                      <li><strong className='font-medium'>- VPN type:</strong> Choose <em>IKEv2</em> from the dropdown menu.</li>
                      <li><strong className='font-medium'>- Type of sign-in info:</strong> Select username and password and enter your credentials.</li>
                    </ul>
                  </li>
                  <li><span className='font-semibold'>3.</span> Click <strong className='font-medium'>Save</strong> to create your VPN profile.</li>
                </ol>
                <h3 className='text-base font-medium pb-1 pt-4'>Connecting to the IKEv2 VPN</h3>
                <p>Once your IKEv2 VPN profile is set up, you can connect to it through either the taskbar or the Windows Settings page.</p>
                <ul className='pl-2 space-y-1'>
                  <li><span className='font-semibold'>1.</span><strong className='font-medium'> From the taskbar:</strong> Click on the <strong className='font-medium'>Network icon &gt; VPN,</strong> then select your newly created VPN and then click <strong className='font-medium'>Connect</strong>.</li>
                  <li><span className='font-semibold'>2.</span><strong className='font-medium'> From Settings:</strong> Navigate to <strong className='font-medium'>Start &gt; Settings &gt; Network & internet &gt; VPN</strong>, choose your VPN, then click <strong className='font-medium'>Connect</strong>.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Layout.Body>
    </Layout>
  )
}