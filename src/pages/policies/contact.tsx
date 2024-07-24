import { Layout } from "@/components/custom/layout";
import { Label } from "@/components/ui/label";
import { ThemeSwitch } from "@/components/dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <Layout className="h-screen">
      <Layout.Header className="pb-0">
        <div className='ml-auto flex items-center space-x-4'>
          <TooltipProvider>
            <ThemeSwitch />
          </TooltipProvider>
        </div>
      </Layout.Header>
      <Layout.Body className="flex flex-col space-y-8 h-5/6">
        <div className="flex flex-col my-auto space-y-2 items-center">
          <Label className="text-4xl">Contact Us</Label>
          <div className="flex flex-col space-y-2">
            <div className="text-lg font-semibold pb-2">
            You can contact us at:
            </div>
            <div className="flex">
              <IconMail size={24} className="mt-0.5" />
              <Link to="mailto:support@vp-net.org" className="ml-2">support@vp-net.org</Link>
            </div>
            <div className="flex">
              <IconBrandWhatsapp size={24} />
              <Link to="https://wa.me/message/C3OWYU3XR64CA1" className="ml-2">+91 83059 86362</Link>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}