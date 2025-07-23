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
import VersionBadge from '@/components/custom/version-badge'

export default function GuidesPage() {
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
                <BreadcrumbLink href="/#/guides">Guides</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          </div>
          {HeaderRight(profileData)}
        </Layout.Header>

      <Layout.Body className='pt-0'>
        <div className='space-y-0.5 mb-4 lg:mb-6'>
          <div className=" flex items-center space-x-2">
            <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Guides</h1>
            <VersionBadge />
          </div>
          <p className='text-muted-foreground'>
            Look here for answers to common questions
          </p>
        </div>
        <div className=''>
          <Accordion type="single" collapsible defaultValue={window.screen.width >= 768 ? "item" : ""}>
            <AccordionItem value="windows-guide">
              <AccordionTrigger className='hover:no-underline'>How To Set Up A ZephyrVPN Connection On Windows</AccordionTrigger>
              <AccordionContent>
                <h3 className='text-base font-medium pb-1'>Creating a ZephyrVPN Profile</h3>
                <ol className='pl-2 space-y-1'>
                  <li><span className='font-semibold'>1.</span> Navigate to <strong className='font-medium'>Start &gt; Settings &gt; Network & internet &gt; VPN &gt; Add a VPN connection</strong>.</li>
                  <li><span className='font-semibold'>2.</span> In the <strong className='font-medium'>Add a VPN connection</strong> window, fill out the form with the following details:
                    <ul className='pl-2 py-2 space-y-0.5'>
                      <li><strong className='font-medium'>- VPN provider:</strong> Select <em>Windows (built-in)</em>.</li>
                      <li><strong className='font-medium'>- Connection name:</strong> Give your connection a memorable name.</li>
                      <li><strong className='font-medium'>- Server name or address:</strong> Type the <Link className='underline' to={"/servers"}>address</Link> for a ZephyrVPN server.</li>
                      <li><strong className='font-medium'>- VPN type:</strong> Choose <em>IKEv2</em> from the dropdown menu.</li>
                      <li><strong className='font-medium'>- Type of sign-in info:</strong> Select username and password and enter your <Link className='underline' to={"/servers"}>ZephyrVPN Credentials</Link>.</li>
                    </ul>
                  </li>
                  <li><span className='font-semibold'>3.</span> Click <strong className='font-medium'>Save</strong> to create your VPN profile.</li>
                </ol>
                <h3 className='text-base font-medium pb-1 pt-4'>Connecting to the ZephyrVPN Server</h3>
                <p>Once your ZephyrVPN profile is set up, you can connect to it through either the taskbar <strong className='font-medium'>( Network icon &gt; VPN )</strong> or the Windows Settings page <strong className='font-medium'>( Start &gt; Settings &gt; Network & internet &gt; VPN )</strong>.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="android-guide">
              <AccordionTrigger className='hover:no-underline'>How To Set Up A ZephyrVPN Connection On Android</AccordionTrigger>
              <AccordionContent>
              <h3 className='text-base font-medium pb-1'>Creating a strongSwan ZephyrVPN Profile</h3>
                <ol className='pl-2 space-y-1'>
                  <li><span className='font-semibold'>1.</span> Download the <Link className='underline' to={"https://play.google.com/store/apps/details?id=org.strongswan.android&pcampaignid=web_share"}>strongSwan VPN Client</Link> from Play Store.</li>
                  <li><span className='font-semibold'>2.</span> Click on <strong className='font-medium'>ADD VPN PROFILE</strong> button and fill out the form with the following details:
                    <ul className='pl-2 py-2 space-y-0.5'>
                      <li><strong className='font-medium'>- Server:</strong> Type the <Link className='underline' to={"/servers"}>address</Link> for a ZephyrVPN server.</li>
                      <li><strong className='font-medium'>- VPN type:</strong> Choose <em>IKEv2 EAP (Username/Password)</em> from the dropdown menu.</li>
                      <li><strong className='font-medium'>- Username and Password:</strong> Enter your <Link className='underline' to={"/servers"}>ZephyrVPN Credentials</Link>.</li>
                    </ul>
                  </li>
                  <li><span className='font-semibold'>3.</span> Click <strong className='font-medium'>Save</strong> to create your VPN profile.</li>
                </ol>
                <h3 className='text-base font-medium pb-1 pt-4'>Connecting to the ZephyrVPN Server</h3>
                <p>Once your profile is set up, it will be added to the list of servers. Just click on a server to connect.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ios-guide">
              <AccordionTrigger className='hover:no-underline'>How To Set Up A ZephyrVPN Connection On iOS</AccordionTrigger>
              <AccordionContent>
              <h3 className='text-base font-medium pb-1'>Creating an ZephyrVPN Profile on iOS</h3>
                <ol className='pl-2 space-y-1'>
                  <li><span className='font-semibold'>1.</span> Go to the Settings app.</li>
                  <li><span className='font-semibold'>2.</span> Navigate to <strong className='font-medium'>General &gt; VPN & device management &gt; VPN</strong>.</li>
                  <li><span className='font-semibold'>3.</span> Tap <strong className='font-medium'>Add VPN Configuration</strong> and fill out the form with the following details:
                    <ul className='pl-2 py-2 space-y-0.5'>
                      <li><strong className='font-medium'>- Description:</strong> Give your connection a memorable name.</li>
                      <li><strong className='font-medium'>- Server and Remote ID:</strong> Type the <Link className='underline' to={"/servers"}>address</Link> for a ZephyrVPN server.</li>
                      <li><strong className='font-medium'>- User Authentication:</strong> Select Username and enter your <Link className='underline' to={"/servers"}>ZephyrVPN Credentials</Link>.</li>
                    </ul>
                  </li>
                  <li><span className='font-semibold'>3.</span> Click <strong className='font-medium'>Done</strong> to create your VPN profile.</li>
                </ol>
                <h3 className='text-base font-medium pb-1 pt-4'>Connecting to the ZephyrVPN Server</h3>
                <p>Once your profile is set up, it will be added to the your list of VPN profiles in <strong className='font-medium'>General &gt; VPN & device management &gt; VPN</strong>. Select the newly created profile and click on the slider to connect.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Layout.Body>
    </Layout>
  )
}