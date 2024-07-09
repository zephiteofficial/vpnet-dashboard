import { Navigate , useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Auth"
import { FormEvent, useState } from "react"


export default function ResetPassword() {
  const { state } = useLocation();
  if (!state?.fromApp) {
    return <Navigate to="/forgot-password" />;
  }

  const { passwordConfirm } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { email } = state;
  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (code.length != 6 ) {
      toast({
        variant: "destructive",
        title: "Invalid code.",
        description: "Please make sure you have entered a 6 digit code.",
      });
      return;
    } else if (isNaN(Number(code))) {
      toast({
        variant: "destructive",
        title: "Invalid code.",
        description: "Please make sure you have entered a numeric code.",
      });
      return;
    }
    else if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password is too short.",
        description: "Please make sure your password is at least 8 characters long.",
      });
      return;
    }
    else if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match.",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    else {
      passwordConfirm(email, code, password).then((data) => {
        console.log(data);
        navigate("/login");
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  if (!email) {
    return <Navigate to="/login" />;
  }
  else return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-4 w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            Reset code has been sent to {email}. Please check your inbox and enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="confirmation-code">Confirmation Code</Label>
              <Input
                id="code"
                required
                onChange={event=> setCode(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" placeholder="********" type="password" onChange={event=> setPassword(event.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" placeholder="********" type="password" onChange={event=> setConfirmPassword(event.target.value)}/>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
