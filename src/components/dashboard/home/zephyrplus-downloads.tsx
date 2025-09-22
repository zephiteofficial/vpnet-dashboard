import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AppWindow } from "lucide-react"
import { Link } from "react-router-dom"

export default function ZephyrPlusDownloads(){
  return(
    <Card className="col-span-2 row-start-3 lg:row-start-2 bg-inherit">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">ZephyrPlus Downloads</CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground">Download the latest version of ZephyrPlus</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Card className="flex items-center h-16 px-4 bg-inherit">
          <div><AppWindow className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-semibold"><Link className="hover:underline" to={"https://github.com/zephiteofficial/vpnet-dashboard/releases/download/beta/ZephyrPlusWindowsInstaller.exe"}>ZephyrPlus Windows Client</Link></p></div>
        </Card>
        <Card className="flex items-center h-16 px-4 bg-inherit">
          <div><AppWindow className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-semibold"><Link className="hover:underline" to={"https://github.com/zephiteofficial/vpnet-dashboard/releases/download/beta/ZephyrPlusAndroidClient.apk"}>ZephyrPlus Android Client</Link></p></div>
        </Card>
      </CardContent>
    </Card>
  )
}