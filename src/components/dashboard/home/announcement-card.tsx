import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { IconBox, IconBell } from '@tabler/icons-react'
import { Link } from "react-router-dom"

export default function AnnouncementCard(){
  return(
    <Card className="col-span-2 md:col-span-4 lg:col-span-4 row-start-1 lg:row-start-2 bg-inherit">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">Announcements</CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground">Latest updates and news</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Card className="flex items-center h-16 px-4 bg-inherit">
        <div><IconBox className="mr-4" size={24}/></div>
        <div><p className="text-xs md:text-sm font-semibold">The dashboard is currently in Beta 1.0</p></div>
        </Card>
        <Card className="flex items-center h-16 px-4 bg-inherit">
          <div><IconBell className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-semibold"><Link className="hover:underline" to={"https://chat.whatsapp.com/EzpMuTqsept5iMMFBO0nbf"}>Join the WhatsApp Community</Link></p></div>
        </Card>
      </CardContent>
    </Card>
  )
}