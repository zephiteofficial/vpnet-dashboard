import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { IconHexagonLetterV } from '@tabler/icons-react'
import { UserProfile } from "@/interfaces"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CurrencyButton(profileData : UserProfile|null){
  /*
  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const { toast } = useToast()
  const [ amount, setAmount ] = useState(10)
  const maxAmount = 5000
  const minAmount = 10
  const increment = () => {
    if (amount >= maxAmount) return
    setAmount(amount + 1)
  }
  const decrement = () => {
    if (amount <= minAmount) return
    setAmount(amount - 1)
  }
  const handlePurchase = async () => {
    const idToken = await getIdToken();
    try{
      await axios.get(`https://api.vp-net.org/v1/user/credits?amount=${amount}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((res) => {
        console.log(res)
        window.open(res.data.invoice.URL, "_blank", "noreferrer");
        toast({
          title: 'Invoice Generated',
          description: `You have successfully generated an invoice for ${amount} credits`
        })
      })
    }catch(err){
      console.log(err)
      toast({
        title: 'Error',
        description: 'An error occurred while purchasing credits'
      })
    }
  }
  return(
      <Dialog>
        <DialogContent className="w-64">
          <DialogHeader className="flex">
            <DialogTitle className="text-xl">VPNet Credits</DialogTitle>
            <DialogDescription>Buy {amount} credits for ₹{amount}.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center space-x-1">
            <Button className="h-8" variant="outline" onClick={decrement}>-</Button>
            <Input className="h-8 w-2/3 text-center" type="number" value={amount} 
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (newValue >= minAmount && newValue <= maxAmount) {
                setAmount(newValue);
              } else if (newValue > maxAmount) {
                setAmount(maxAmount);
              } else {
                setAmount(minAmount);
              }
            }} 
            />
            <Button className="h-8" variant="outline" onClick={increment}>+</Button>
          </div>
          <DialogClose asChild>
            <Button className="w-full hover:bg-primary hover:text-primary-foreground" variant='outline' size='sm' onClick={handlePurchase}>Pay ₹{amount}</Button>
          </DialogClose>
          <DialogFooter>
            <div className="w-full flex justify-center">
              <Label className="text-xs text-muted-foreground text-center">Read our {" "}
                <Link to="/refund" className="text-muted-foreground underline">
                  {`cancellation and refund policy.`}
                </Link>
              </Label>
            </div>
          </DialogFooter>
        </DialogContent>

        <Tooltip>
          <TooltipContent>Buy Credits</TooltipContent>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant='outline' size='sm'>
                {profileData ? <><IconHexagonLetterV size={18} className="mr-1 mt-0.5"/><p className="text-base font-semibold">{profileData.profile.credit_balance}</p></> : <Skeleton className="w-[60px] h-[20px] rounded-full" />}
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </Dialog>
  )
  */
  
  const handleClicked = () => {
    window.open("https://pages.razorpay.com/vpnet", "_blank", "noreferrer");
  }
  return(
    <Tooltip>
      <TooltipContent>Buy Credits</TooltipContent>
        <TooltipTrigger asChild>
          <Button variant='outline' onClick={handleClicked} size='sm'>
            {profileData ? <><IconHexagonLetterV size={18} className="mr-1 mt-0.5"/><p className="text-base font-semibold">{profileData.profile.credit_balance}</p></> : <Skeleton className="w-[60px] h-[20px] rounded-full" />}
          </Button>
      </TooltipTrigger>
    </Tooltip>
  )
}