import { useAuth } from "@/context/Auth"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import ThemeSwitch from '@/components/theme-switch'
import { Button } from "@/components/ui/button"
import { IconCurrency } from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Car } from "lucide-react";


export default function HomePage() {
  const { getSession } = useAuth();
  const navigate = useNavigate();

  const currencyLoaded = true;

  useEffect(() => {
    getSession().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
      console.log("Redirecting to login page");
      navigate("/login");
    });
  }, [])

  const currency = currencyLoaded? (<p className="mb-0.5">{`999,999,999`}</p>) : (<Skeleton className="w-[100px] h-[20px] rounded-full" />)
  return (
    <Layout>


      <Layout.Header>
        <div>
          <p className="text-2xl font-medium mb-1">Home</p>
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          <Button variant='outline' size='sm'>
            <IconCurrency size={20} className="mr-2"/>
            {currency}
          </Button>
          <ThemeSwitch />
        </div>
      </Layout.Header>


      <Layout.Body>
        <div className="grid grid-cols-2">
          <Card className="bg-inherit mx-2">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to your dashboard</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
    
  )
}