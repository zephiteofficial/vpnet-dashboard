import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { IconCurrency } from '@tabler/icons-react'

export function CurrencyButton(profileData:any){
  const data = profileData
  return(
    <>
    <Button variant='outline' size='sm'>
    {data ? <><IconCurrency size={18} className="mr-1 mt-0.5"/><p className="text-base font-semibold">{data.data.credit_balance}</p></> : <Skeleton className="w-[60px] h-[20px] rounded-full" />}
    </Button>
    </>
  )
}