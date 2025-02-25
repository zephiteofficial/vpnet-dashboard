import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { IconHexagonLetterV } from '@tabler/icons-react'
import { UserProfile } from "@/interfaces"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  /*
  const handleClicked = () => {
    window.open(import.meta.env.VITE_RAZORPAY_PAYMENT_URL, "_blank", "noreferrer");
  }
  */

  const [price, setPrice] = useState(69)
  const [phoneNumber, setPhoneNumber] = useState("")

  const incrementPrice = () => {
    if (price >= 5000){
      setPrice(5000)
    }
    else {
      setPrice(price + 1)
    }
  }
  

  const decrementPrice = () => {
    if (price <= 5){
      setPrice(5)
    }
    else {
      setPrice(price - 1)
    }
  }
  const checkValue = (value: number) => {
    if(value < 5){
      setPrice(5)
  
    }
    else if(value > 5000){
      setPrice(5000)

    }
    else{
      setPrice(value)
    }


  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip all non-digit characters
    const rawDigits = e.target.value.replace(/\D/g, "");
    const digits = rawDigits.substring(2)
    // Format the number and add +91 prefix
    let formattedNumber = "";
    
    formattedNumber = digits.slice(0, 5) + 
    (digits.length > 5 ? " " + digits.slice(5, 10) : "");
    
    // Ensure we don't store more than 10 digits (plus the +91 prefix)
    setPhoneNumber(formattedNumber.length <= 15 ? formattedNumber : formattedNumber.slice(0, 15));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted:", { price, phoneNumber })
    // Here you would typically send the data to your backend
  }
  return(
    <Drawer>
      <Tooltip>
        <TooltipContent>Buy Credits</TooltipContent>
          <TooltipTrigger asChild>
          <DrawerTrigger asChild>
            <Button variant='outline' size='sm'>
              {profileData ? <><IconHexagonLetterV size={18} className="mr-1 mt-0.5"/><p className="text-base font-semibold">{profileData.profile.credit_balance}</p></> : <Skeleton className="w-[60px] h-[20px] rounded-full" />}
            </Button>
            </DrawerTrigger>
        </TooltipTrigger>
      </Tooltip>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Set Your Price</DrawerTitle>
            <DrawerDescription>Adjust your price and provide your contact information.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="px-4">
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={decrementPrice}
                    aria-label="Decrease price"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => checkValue(Number.parseInt(e.target.value) || 0)}
                    className="h-10 rounded-none text-center"
                    min="0"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={incrementPrice}
                    aria-label="Increase price"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={`+91 `+phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}