import {
  IconBarrierBlock,
  IconHome,
  IconServer,
  IconShoppingCart,
  IconUser,
  IconError404,
  IconExclamationCircle,
  IconServerOff,
  IconSettings,
  IconLock,
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
    title: 'Shop',
    label: '',
    href: '/shop',
    icon: <IconShoppingCart size={18} />,
  },
  {
    title: 'Profile',
    label: '',
    href: '/profile',
    icon: <IconUser size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
  {
    title: 'Error Pages',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'Not Found',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'Internal Server Error',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'Maintenance Error',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18} />,
      },
      {
        title: 'Unauthorised Error',
        label: '',
        href: '/401',
        icon: <IconLock size={18} />,
      },
    ],
  },
]
