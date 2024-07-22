import { useNavigate } from "react-router-dom"
import { useState, FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/Auth"
import { useToast } from "@/components/ui/use-toast";
import { IconLoader2 } from "@tabler/icons-react"

export default function ResetPasswordForm() {
  const { forgotPassword, getSession } = useAuth();
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
      forgotPassword(email).then((data) => {
        console.log(data);
        navigate("/reset-password", { state: { fromApp: true, email: email }})
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-4 w-96 bg-inherit">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to recieve a password reset code
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
            <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
              {loading ? (<IconLoader2 className="mr-2 h-4 w-4 animate-spin"/>) : ("Get Code")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}