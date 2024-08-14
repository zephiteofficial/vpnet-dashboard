import { Outlet } from "react-router-dom";
import { Layout } from "@/components/custom/layout";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarNav, HeaderRight } from "@/components/dashboard";
import { useAPI } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";


export default function SettingsPage(){
  const { profileData } = useAPI()
  return(
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
                <BreadcrumbLink href="/#/settings">Settings</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {HeaderRight(profileData)}
      </Layout.Header>
      <Layout.Body className='pt-0'>
        <div className='space-y-0.5'>
            <div className=" flex items-center space-x-2">
              <h1 className='text-2xl font-bold tracking-tight md:text-2xl'>Settings</h1>
              <Badge className="text-xs mt-1">v1.1b</Badge>
            </div>
          <p className='text-muted-foreground'>
            Manage and view your account settings and details.
          </p>
        </div>
        <Separator className='my-4 lg:my-6'/>
        <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems}/>
          </aside>
          <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
            <Outlet />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: <IconUser size={18} />,
    href: '/settings',
  },
  {
    title: 'Plan',
    icon: <IconShoppingCart size={18} />,
    href: '/settings/plan',
  }
]