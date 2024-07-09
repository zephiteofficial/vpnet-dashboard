import { useAuth } from "@/context/Auth"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import ThemeSwitch from '@/components/theme-switch'
import { Button } from "@/components/ui/button"
import { IconCurrency } from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'

export default function HomePage() {
  const { getSession } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getSession().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
      console.log("Redirecting to login page");
      navigate("/login");
    });
  }, [])
  return (
    <Layout>
      <Layout.Header>
        <div>
          <p className="text-xl font-medium">Home</p>
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          <Button variant='outline' size='sm'>
            <IconCurrency size={20} className="mr-2"/>
            <p className="mb-0.5">{`999,999,999`}</p>
          </Button>
          <ThemeSwitch />
        </div>
      </Layout.Header>
      <Layout.Body>
      </Layout.Body>
    </Layout>
  )
}