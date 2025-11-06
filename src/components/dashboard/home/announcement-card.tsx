import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { IconAlertCircle, IconBell } from '@tabler/icons-react'
import { Link } from "react-router-dom"

export default function AnnouncementCard(){
  return(
    <Card className="col-span-2 md:col-span-4 lg:col-span-4 row-start-1 lg:row-start-2 bg-inherit">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">Announcements</CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground">Latest updates and news</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/*
        <Card className="flex items-center h-16 px-4 bg-inherit">
        <div><IconBox className="mr-4" size={24}/></div>
        <div><p className="text-xs md:text-sm font-semibold">The dashboard is currently in Beta 1.0</p></div>
        </Card>
        */}
        <Card className="flex items-center h-20 px-4 bg-inherit">
          <div><IconAlertCircle className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-medium">Please recreate your access tokens if they were generated on or before 21 September 2025, 6:00 AM.</p></div>
        </Card>
        <Card className="flex items-center h-28 sm:h-24 px-4 bg-inherit">
          <div><IconAlertCircle className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-medium">The IPSec Protocol may not work on certain networks. A new protocol called "Plus" has been added to work on those more restrictive networks.</p></div>
        </Card>
        <Card className="flex items-center h-16 px-4 bg-inherit">
          <div><IconBell className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-semibold"><Link className="hover:underline" to={"https://chat.whatsapp.com/EzpMuTqsept5iMMFBO0nbf"}>Join the WhatsApp Community</Link></p></div>
        </Card>
      </CardContent>
    </Card>
  )
}