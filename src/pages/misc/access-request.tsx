import { useNavigate } from "react-router-dom"
import { useState, FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/Auth"
import { useToast } from "@/components/ui/use-toast";
import { IconLoader2 } from "@tabler/icons-react"
import axios from "axios"

export default function AccessRequestForm() {
  const { getSession } = useAuth();
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then((data) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(data);
        console.log("User is already logged in");
      }
      navigate("/");
    }).catch((error) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(error);
      }
    });
  }, [])
  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.length < 1) {
      toast({
        variant: "destructive",
        title: "Email is required.",
        description: "Please make sure you have entered an email.",
      });
    }
    else if (email.match(emailRegex) === null) {
      toast({
        variant: "destructive",
        title: "Invalid email.",
        description: "Please make sure you have entered a valid email.",
      });
    }
    else {
      setLoading(true);
      await axios.post(`https://api.vp-net.org/v1/request-access?email=${email}`)
      .then((res) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(res);
        }
        toast({
          title: 'Request Granted',
          description: 'You have been successfully added to the whitelist.'
        })
        navigate("/signup");
        setLoading(false);
      }).catch((error) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(error);
        }
        toast({
          variant: "destructive",
          title: 'Request Denied',
          description: error.response.data.message
        })
        setLoading(false);
      });
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-4 w-96 bg-inherit">
        <CardHeader>
          <CardTitle className="text-2xl">Request Access</CardTitle>
          <CardDescription>
            Enter your email to see if you are eligible for access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="arshvimal@example.com"
                required
                onChange={event=> setEmail(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
              {loading ? (<IconLoader2 className="mr-2 h-4 w-4 animate-spin"/>) : ("Request Access")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}