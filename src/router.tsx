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
      Component: (await import('@/pages/authentication/signup/signup-verify')).default,
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
  {
    path: '/request-access',
    lazy: async () => ({
      //Component: (await import('@/pages/misc/access-request')).default,
      Component: NotFoundError,
    }),
  },

  // Policy routes

  {
    path: '/terms',
    lazy: async () => ({
      Component: (await import('@/pages/policies/terms')).default,
    }),
  },
  {
    path: '/refund',
    lazy: async () => ({
      Component: (await import('@/pages/policies/refund')).default,
    }),
  },
  {
    path: '/contact',
    lazy: async () => ({
      Component: (await import('@/pages/policies/contact')).default,
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
          Component: (await import('@/pages/dashboard/home')).default,
        }),
      },
      {
        path: '/servers',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/servers')).default,
        }),
      },
      {
        path: '/plans',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/plans')).default,
        }),
      },
      {
        path: '/guides',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/guides')).default,
        }),
      },
      {
        path: '/settings',
        lazy: async () => ({
          Component: (await import('@/pages/dashboard/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/dashboard/settings/profile')).default,
            }),
          },
          {
            path: 'plan',
            lazy: async () => ({
              Component: (await import('@/pages/dashboard/settings/plan')).default,
            }),
          }
        ],
      }
    ],
  },
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },
  { path: '*', Component: MaintenanceError },
])

export default router