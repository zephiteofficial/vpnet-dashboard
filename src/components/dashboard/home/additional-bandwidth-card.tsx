import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { IconHexagonLetterV, IconInfoCircle } from '@tabler/icons-react'
import { UserUsage } from "@/interfaces";
import { useAuth } from "@/context/Auth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function AdditionalBandwidthCard(userUsage: UserUsage | null){
  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  
  const { toast } = useToast()
  const [ amount, setAmount ] = useState(10)
  const maxAmount = 99999
  const minAmount = 1
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
      await axios.get(`${import.meta.env.VITE_BASE_API_URL}/v1/user/bandwidth?amount=${amount}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then(async (res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res)
        }
        
        toast({
          title: 'Bandwidth Purchased',
          description: `You have successfully purchased ${amount} GB of excess bandwidth`
        })
        await timeout(2000);
        window.location.reload();
      })
    }catch(err){
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      toast({
        title: 'Error',
        description: 'An error occurred while purchasing bandwidth'
      })
    }
  }
  return(
    <Dialog>
      <DialogContent className="w-72">
          <DialogHeader className="flex">
            <DialogTitle className="text-xl">Excess Bandwidth</DialogTitle>
            <DialogDescription>Buy {amount} GB of bandwidth for {amount*3} credits.</DialogDescription>
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
            <Button className="w-full hover:bg-primary hover:text-primary-foreground" variant='outline' size='sm' onClick={handlePurchase}>
              <div className="flex">
                <p>Pay </p>
                <IconHexagonLetterV size={18} className="mt-[1.5px] ml-2 mr-0.5"/>
                <p className="font-semibold">{amount*3}</p>
              </div>
              
              </Button>
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
    <AlertDialog>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Additional Premium Bandwidth</AlertDialogTitle>
            <AlertDialogDescription>
            Should you exhaust your monthly premium bandwidth, you have the option to buy more to maintain uninterrupted service. This extra bandwidth is permanent and will be utilized whenever your monthly allocation is depleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Okay</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
      <Card className="bg-inherit col-span-2">
        <CardHeader className="pb-0">
          <div className="flex">
            <CardDescription className="text-xs md:text-sm font-semibold text-secondary-foreground">Excess Bandwidth</CardDescription>
            <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer"><IconInfoCircle size={16} /></AlertDialogTrigger>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold">
            {userUsage ?
            (((userUsage.usage.bandwidth_surplus/1024/1024/1024)>=1000) ? (`${(userUsage.usage.bandwidth_surplus/1024/1024/1024/1024).toFixed(2)} TB`) : (`${(userUsage.usage.bandwidth_surplus/1024/1024/1024).toFixed(2)} GB`)) : 
            (<Skeleton className="mt-2 w-[100px] h-[24px] rounded-full" />) }
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="text-xs h-4 font-semibold text-muted-foreground">
            {userUsage ? (`of excess bandwidth remaining`) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button className="w-full h-6">
              <p className="text-xs font-semibold bg-inherit">Buy Bandwidth</p>
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
    </AlertDialog>
    </Dialog>
  )
}