import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from './context/Auth.tsx'
import { ThemeProvider } from './context/Theme'
import { CacheProvider } from './context/Cache'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CacheProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CacheProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
