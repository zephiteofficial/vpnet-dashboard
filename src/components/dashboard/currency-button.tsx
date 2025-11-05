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
import { useAuth } from "@/context/Auth"
import axios from "axios"
import { toast } from "../ui/use-toast"

export default function CurrencyButton(profileData : UserProfile|null){
    /*
  const handleClicked = () => {
    window.open(import.meta.env.VITE_RAZORPAY_PAYMENT_URL, "_blank", "noreferrer");
  }
  */

  const [price, setPrice] = useState(69)
  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted:", { price })
    const idToken = await getIdToken();
    await axios.get(`${import.meta.env.VITE_BASE_API_URL}/v1/user/credits?amount=${price}`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    }).then(async (res) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(res)
      }
      toast({
        title: 'Invoice Created',
        description: `Invoice for ₹${price} has been created Successfully. Redirecting to payment gateway.`
      })
      window.open(res.data.invoice.URL)
    }).catch((err) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      toast({
        variant: 'destructive',
        title: 'Invoice Failed',
        description: `Failed to create an invoice. Please try again later.`
      })
    })
    // Here you would typically send the data to your backend
  }
/*
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
 */
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

          {/* Drawer Header 
          <DrawerHeader>
            <DrawerTitle>Buy Zephyr Credits</DrawerTitle>
            <DrawerDescription>Enter the amount of credits you want to buy.</DrawerDescription>
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
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
              <Button type="submit">Submit</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
          */}
          <DrawerHeader>
            <DrawerTitle>New Payments are currently paused due to a bug with creating tokens.</DrawerTitle>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
   
}