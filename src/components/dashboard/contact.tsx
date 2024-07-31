import { IconHeadset, IconMail, IconBrandWhatsapp } from '@tabler/icons-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className='hidden sm:flex'>
      <Dialog>
        <DialogContent className='w-72'>
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className='pb-2'>For any queries, contact us at</p>
            <div className='flex items-center space-x-2 pb-1'>
              <IconMail className='mt-0.5' size={18}/>
              <Link className='hover:underline' to={'mailto:support@vp-net.org'}>support@vp-net.org</Link>
            </div>
            <div className='flex items-center space-x-2'>
              <IconBrandWhatsapp size={18}/>
              <Link className='hover:underline' to={'https://wa.me/message/C3OWYU3XR64CA1'}>+91 83059 86362</Link>
            </div>
          </DialogDescription>
        </DialogContent>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger>
              <IconHeadset size={18} className='hover:cursor-pointer'/>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent className=''>
            Contact
          </TooltipContent>
        </Tooltip>
      </Dialog>
    </div>
  )
}