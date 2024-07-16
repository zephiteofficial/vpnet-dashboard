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
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/Auth"
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const { getSession, logIn } = useAuth()
  const navigate = useNavigate();

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
      logIn(email, password).then((data) => {
        if (data) {
          navigate("/");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-4 w-96 bg-inherit">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to log into your account
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="ml-auto inline-block text-sm text-muted-foreground hover:underline hover:text-primary">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" placeholder="********" type="password" required onChange={event=> setPassword(event.target.value)} />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-muted-foreground hover:underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
