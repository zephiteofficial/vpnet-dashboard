import { Link, useNavigate } from "react-router-dom"
import { useState, FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/Auth"
import { useToast } from "@/components/ui/use-toast";
import { IconLoader2 } from '@tabler/icons-react'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const { getSession, logIn } = useAuth()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((data) => {
      console.log(data);
      console.log("User is already logged in");
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    
    event.preventDefault()
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.length < 1) {
      toast({
        variant: "destructive",
        title: "Email is required.",
        description: "Please make sure you have entered an email.",
      });
    }
    else if (email.match(validRegex) === null) {
      toast({
        variant: "destructive",
        title: "Invalid email.",
        description: "Please make sure you have entered a valid email.",
      });
    }
    else if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password is too short.",
        description: "Please make sure your password is at least 8 characters long.",
      });
    }
    else {
      setLoading(true)
      logIn(email, password).then((data) => {
        if (data) {
          navigate("/");
        }
        setLoading(false)
      }).catch((error) => {
        console.log(error);
        setLoading(false)
      });
      
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-4 w-96 bg-inherit">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-muted-foreground hover:underline hover:text-primary">
              Sign up
            </Link>
          </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              onChange={event=> setEmail(event.target.value)}
            />
              <Input id="password" placeholder="Password" type="password" required onChange={event=> setPassword(event.target.value)} />
              <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
            { loading ?(<IconLoader2 className="mr-2 h-4 w-4 animate-spin"/>):("Login")}
            </Button>
            <Link to="/forgot-password" className="text-xs font-medium text-muted-foreground text-center hover:underline hover:text-primary">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
