import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { UserProfile } from "@/interfaces"
import { Button } from "@/components/custom/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FormEvent, useState } from "react"
import { IconLoader2 } from "@tabler/icons-react"
import { useAuth } from "@/context/Auth"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'

export default function VpnCredentailsCard(userProfile : UserProfile|null){
  const { getSession } = useAuth();
  const { toast } = useToast();
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const handleSubmit = async () => {
    setLoading(true);
    const idToken = await getIdToken();
    await axios.post(`${import.meta.env.VITE_BASE_API_URL}/v1/user/profile/password`, {
      new_password: password
    }, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    }).then(async (res) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(res)
      }
      toast({
        title: 'Password Updated',
        description: 'Your VPN password has been changed successfully.'
      })
      setLoading(false);
      setDialogOpen(false);
      await timeout(3000);
      window.location.reload();
    }).catch((err) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Password Update Failed',
        description: err.response.data.message
      })
    })
  }
  return(
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='w-72'>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Input id="password" placeholder="New Password" required onChange={event=> setPassword(event.target.value)} />
            <Button type="submit" className="w-full mt-4" disabled={loading} onClick={handleSubmit}>
              {loading ? (<IconLoader2 className="mr-2 h-4 w-4 animate-spin"/>) : ("Confirm")}
            </Button>
          </DialogDescription>
        </DialogContent>
        <Card className='bg-inherit max-w-[28rem] min-w-48'>
          <CardHeader className='pb-2'>
            <p className='font-medium text-lg'>VPN Credentials</p>
            <p className='text-sm text-muted-foreground'>Your credentials are as follows:</p>
          </CardHeader>
          <CardContent className="pb-4">
            <div className='mt-2 flex'>
              <p className='text-sm'>Username</p>
              {userProfile ? <p className='ml-auto text-sm text-muted-foreground'>{userProfile.profile.vpn_credentials.username}</p> : <Skeleton className="ml-auto w-[40px] h-[20px] rounded-full" />}
            </div>
            <div className='mt-2 flex'>
              <p className='text-sm'>Password</p>
              {userProfile ? <p className='ml-auto text-sm text-muted-foreground'>{userProfile.profile.vpn_credentials.password}</p> : <Skeleton className="ml-auto w-[40px] h-[20px] rounded-full" />}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger asChild>
              <Button className='w-full h-8'>
                <p className="text-xs font-semibold">Change Password</p>
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
      </Dialog>
  )
}