import { createHashRouter } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error.tsx'
import NotFoundError from '@/pages/errors/not-found-error.tsx'
import MaintenanceError from '@/pages/errors/maintenance-error.tsx'
import UnauthorisedError from '@/pages/errors/unauthorised-error.tsx'

const router = createHashRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('@/pages/authentication/login/login')).default,
    }),
  },
  {
    path: '/signup',
    lazy: async () => ({
      Component: (await import('@/pages/authentication/signup/signup')).default,
    }),
  },
  {
    path: '/verify',
    lazy: async () => ({
      Component: (await import('@/pages/authentication/signup/verify')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('@/pages/authentication/forgot/forgot')).default,
    }),
  },
  {
    path: '/reset-password',
    lazy: async () => ({
      Component: (await import('@/pages/authentication/forgot/forgot-verify')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('@/components/shell/shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/home.tsx')).default,
        }),
      },
      {
        path: '/servers',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: '/shop',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: '/profile',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: '/settings',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      }
    ],
  },
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },
  { path: '*', Component: NotFoundError },
])

export default router