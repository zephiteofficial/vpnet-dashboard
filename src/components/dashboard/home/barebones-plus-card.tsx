import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Loader2, Plus, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from 'react-router-dom'
import { useAuth } from "@/context/Auth"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { set } from "react-hook-form"
import { Input } from "@/components/ui/input"
import UserPlanData from "@/interfaces/user-plan-data"
import { time } from "console"

export default function BarebonesPlusCard(planData: UserPlanData | null) {
  return(
    <Card className="col-span-2 md:col-span-4 lg:col-span-4 row-start-2 lg:row-start-3 bg-inherit">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">ZephyrPlus (Early Alpha)</CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground">New Protocol for Restricted Networks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {TokenTable({ planData })}
      </CardContent>
    </Card>
  )
}

export function TokenTable({ planData }: { planData: UserPlanData | null }) {
  
  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const [tokens, setTokens] = useState<any[]>([]);
  useEffect(() => {
    fetchTokens();
  }, []);
  async function fetchTokens() {
  const idToken = await getIdToken();
    try{
      await axios.get(`${import.meta.env.VITE_BASE_API_URL}/v1/user/plus/token`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then(async (res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res)
        }
        setTokens(res.data.tokens);
      }
      )
    }catch(err){
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tokens {"("}{tokens.length}{"/"}{planData?.plan.device_limit}{")"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              No tokens available. Create one to get started.
            </TableCell>
          </TableRow>
        ) : tokens.map((token) => (
          <TableRow key={token.token_id}>
            <TableCell className="font-medium">{token.token_name}</TableCell>
            <TableCell className="text-right"><ViewToken tokenId={token.token_id} /><DeleteToken tokenId={token.token_id} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-transparent">
        <TableRow>
          <TableCell colSpan={3}>
            <div className="flex items-center">{AddToken()}</div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export function AddToken() {
  const [isLoading, setIsLoading] = useState(false);
  const { getSession } = useAuth();
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const [tokenName, setTokenName] = useState('');
  const handleTokenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenName(e.target.value);
  };
  async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const handleCreateToken = async () => {
    if(tokenName.trim() === ''){
      toast({
        title: 'Error',
        description: 'Token name cannot be empty'
      })
      return;
    }
    const idToken = await getIdToken();
    try{
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_BASE_API_URL}/v1/user/plus/token?name=${tokenName}`, {}, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then(async (res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res)
        }
        toast({
          title: 'Access Key Created'
        })
        await timeout(2000);
        setIsLoading(false);
        window.location.reload();
      }).catch((err) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(err)
        }
        toast({
          variant: 'destructive',
          title: 'Creation Failed',
          description: err.response.data.message
        })
        setIsLoading(false);
      })
    }catch(err){
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      toast({
        title: 'Error',
        description: 'An error occurred while creating token'
      })
      setIsLoading(false);
    }
  }
  return (
    <div className='hidden sm:flex w-full justify-center'>
      <Dialog>
        <DialogContent className='w-72'>
          <DialogHeader>
            <DialogTitle>Add Token</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="flex flex-col space-y-4">
              <Input placeholder="Token Name" value={tokenName} onChange={handleTokenNameChange} />
              <Button onClick={handleCreateToken} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Token
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
          <DialogTrigger asChild>
              <Button variant="outline" className="w-48">
                <div className="mr-2 text-sm">
                  Create Access Key
                </div>
                <Plus size={16} className='hover:cursor-pointer font-black'/>
              </Button>
          </DialogTrigger>
      </Dialog>
      </div>
  )
}

interface ViewTokenProps {
  tokenId: string;
}

export function ViewToken({ tokenId }: ViewTokenProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accessKey, setAccessKey] = useState('Fetching...');
  const { getSession } = useAuth();
  async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const waitAndReset = async () => {
    await timeout(200);
    setAccessKey('Fetching...');
  }
  useEffect( () => {
        if (!isDialogOpen) {
          waitAndReset();
        }
      }, [isDialogOpen]);
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const handleGetAccessKey = async () => {
    const idToken = await getIdToken();
    try{
      await axios.get(`${import.meta.env.VITE_BASE_API_URL}/v1/user/plus/token/key?id=${tokenId}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then(async (res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res)
        }
        toast({
          title: 'Access Key Retrieved'
        })
        setAccessKey(res.data.token_access_key);
      })
    }catch(err){
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      toast({
        title: 'Error',
        description: 'An error occurred while fetching access key'
      })
    }
  }
  return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='w-80'>
          <DialogHeader>
            <DialogTitle>Access Key Contents</DialogTitle>
          </DialogHeader>
          <DialogDescription>

            <Textarea readOnly value={accessKey} className="resize-none h-48" />
          </DialogDescription>
        </DialogContent>
          <DialogTrigger asChild>
              <Button className="mr-2" variant="outline" onClick={handleGetAccessKey}><Eye className="h-4 w-4" /></Button>
          </DialogTrigger>
          <DialogClose asChild>
          </DialogClose>
      </Dialog>
  )
}

interface DeleteTokenProps {
  tokenId: string;
}
export function DeleteToken({ tokenId }: DeleteTokenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { getSession } = useAuth();
  async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  async function getIdToken() {
    const data = await getSession();
    return data.session.idToken.jwtToken;
  }
  const handleDelete = async () => {
    setIsLoading(true);
    const idToken = await getIdToken();
    try{
      await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/v1/user/plus/token/key?id=${tokenId}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then(async (res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res)
        }
        toast({
          title: 'Token Deleted'
        })
        await timeout(2000);
        setIsLoading(false);
        window.location.reload();
      }).catch((err) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(err)
        }
        toast({
          variant: 'destructive',
          title: 'Deletion Failed',
          description: err.response.data.message
        })
        setIsLoading(false);
      })
    }catch(err){
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(err)
      }
      toast({
        title: 'Error',
        description: 'An error occurred while deleting token'
      })
      setIsLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash size={16} className='hover:cursor-pointer font-black'/>
        </Button>
      </DialogTrigger>
      <DialogContent className='w-72'>
        <DialogHeader>
          <DialogTitle>Delete Token</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col">
            <div className="mb-4">Are you sure you want to delete this token?</div>
            <Button variant="outline" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}