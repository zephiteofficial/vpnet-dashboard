import { ContentSection } from "@/components/dashboard"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAPI } from "@/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { useAuth } from "@/context/Auth"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ProfileSettings(){
  const { profileData } = useAPI()
  const { toast } = useToast()
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if(profileData){
      setChecked(profileData.profile.automatic_renewal);
    }
  }, [profileData])

  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }

  const handleRenewalToggle = async (newState:boolean) => {
    const idToken = await getIdToken();
    try{
      if(newState===true){
        await axios.post(`${import.meta.env.VITE_BASE_API_URL}/v1/user/profile?renew=1`, {}, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        }).then((res) => {
          console.log(res)
          toast({
            title: 'Automatic Renewal Enabled',
            description: 'You have successfully enabled automatic renewal'
          })
          setChecked(true)
        })
      }else{
        await axios.post(`${import.meta.env.VITE_BASE_API_URL}/v1/user/profile?renew=0`, {}, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        }).then((res) => {
          console.log(res)
          toast({
            title: 'Automatic Renewal Disabled',
            description: 'You have successfully disabled automatic renewal'
          })
          setChecked(false)
        })
      }
    }
    catch(err){
      console.log(err)
      toast({
        variant: 'destructive',
        title: 'Automatic Renewal Failed',
        description: "Couldn't update the automatic renewal status"
      })
    }
  }
  
  return(
    <ContentSection title='Profile' desc='View and manage your profile details here.'>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-sm font-bold">Username</Label>
          <div className="text-sm text-muted-foreground font-medium">{ profileData ? (`${profileData.username}`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Email</Label>
          <div className="text-sm text-muted-foreground font-medium">{ profileData ? (`${profileData.profile.email}`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Balance</Label>
          <div className="text-sm text-muted-foreground font-medium">{ profileData ? (`${profileData.profile.credit_balance} Credits`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Automatic Renewal</Label>
          <div className="flex items-center space-x-2">
            { profileData 
            ? (<><Switch id="renewal-switch" checked={checked} onCheckedChange={handleRenewalToggle} className="h-4 w-9 "/>{profileData.profile.automatic_renewal? (<p className="text-sm text-muted-foreground font-medium mb-0.5">On</p>): (<p className="text-sm text-muted-foreground font-medium mb-0.5">Off</p>)}</>) 
            : (<><Switch id="renewal-switch" disabled className="h-4 w-9 "/><Skeleton className="w-[128px] h-[16px] rounded-full mt-0.5"/></>) }
          </div>
        </div>
      </div>
    </ContentSection>
  )
}