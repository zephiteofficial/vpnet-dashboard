import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { UserProfile } from "@/interfaces"

export function VpnCredentailsCard(userProfile : UserProfile|null){
  return(
    <Card className='bg-inherit'>
      <CardHeader className='pb-2'>
        <p className='font-medium text-lg'>VPN Credentials</p>
        <p className='text-sm text-muted-foreground'>Your credentials are as follows:</p>
      </CardHeader>
      <CardContent>
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
        <Button className='w-full h-8'>
          <p className="text-xs md:text-sm font-semibold">Change Password</p>
        </Button>
      </CardFooter>
    </Card>
  )
}