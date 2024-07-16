import { Outlet } from "react-router-dom";
import { Layout } from "@/components/custom/layout";
import { Badge } from "@/components/ui/badge";
import { CurrencyButton, SidebarNav } from "@/components/dashboard";
import { ThemeSwitch } from "@/components/dashboard";
import { useAPI } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";


export default function SettingsPage(){
  const { profileData } = useAPI()

  return(
    <Layout>
      <Layout.Header>
          <div className="mr-auto flex items-center space-x-2">
            <p className="text-2xl font-medium mb-1">Dashboard</p>
            <Badge className="text-[12px]">v0.1a</Badge>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            {CurrencyButton(profileData)}
            <ThemeSwitch />
          </div>
      </Layout.Header>
      <Layout.Body>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Settings
          </h1>
          <p className='text-muted-foreground'>
            Manage your account settings and set e-mail preferences.
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