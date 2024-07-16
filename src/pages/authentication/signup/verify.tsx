import { Navigate , useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Auth"
import { FormEvent, useState } from "react"


export default function Verify() {
  const { state } = useLocation();
  if (!state?.fromApp) {
    return <Navigate to="/login" />;
  }

  const { confirmSignUp, resendConfirmationCode } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [code, setCode] = useState("")
  const { email, username } = state;
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
    else {
      confirmSignUp(username, code).then((data) => {
        console.log(data);
        navigate("/login");
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  const handleResend = async () => {
    resendConfirmationCode(username).then((data) => {
      console.log(data);
    });
  }
  if (!email || !username) {
    return <Navigate to="/login" />;
  }
  else return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-4 w-96 bg-inherit">
        <CardHeader>
          <CardTitle className="text-2xl">Email Confirmation</CardTitle>
          <CardDescription>
            Confirmation code sent to {email}. Please check your inbox and enter it below.
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
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Didn&apos;t recieve a code?{" "}
            <button className="underline" onClick={handleResend}>
              Resend
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
