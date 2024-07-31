import {
  IconHome,
  IconServer,
  IconShoppingCart,
  IconSettings,
  IconBook2,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Home',
    label: '',
    href: '/',
    icon: <IconHome size={18} />,
  },
  {
    title: 'Servers',
    label: '',
    href: '/servers',
    icon: <IconServer size={18} />,
  },
  {
    title: 'Plans',
    label: '',
    href: '/plans',
    icon: <IconShoppingCart size={18} />,
  },
  {
    title: 'Guides',
    label: '',
    href: '/guides',
    icon: <IconBook2 size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
