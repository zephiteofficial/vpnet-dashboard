import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { IconBox, IconBell } from '@tabler/icons-react'

export function AnnouncementCard(){
  return(
    <Card className="col-span-2 md:col-span-4 lg:col-span-4 row-span-2 bg-inherit">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">Announcements</CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground">Latest updates and news</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Card className="flex items-center h-16 px-4 bg-inherit">
        <div><IconBox className="mr-4" size={24}/></div>
        <div><p className="text-xs md:text-sm font-semibold">The dashboard is currently in Alpha Version 0.1</p></div>
        </Card>
        <Card className="flex items-center h-16 px-4 bg-inherit">
          <div><IconBell className="mr-4" size={24}/></div>
          <div><p className="text-xs md:text-sm font-semibold">This is a test announcement</p></div>
        </Card>
      </CardContent>
    </Card>
  )
}