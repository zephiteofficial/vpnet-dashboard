import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { IconHexagonLetterV } from '@tabler/icons-react'
import { UserProfile } from "@/interfaces"

export default function CurrencyButton(profileData : UserProfile|null){
  return(
    <>
    <Button variant='outline' size='sm'>
    {profileData ? <><IconHexagonLetterV size={20} className="mr-1 mt-0.5"/><p className="text-base font-semibold">{profileData.profile.credit_balance}</p></> : <Skeleton className="w-[60px] h-[20px] rounded-full" />}
    </Button>
    </>
  )
}