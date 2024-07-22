import { Layout } from "@/components/custom/layout";
import { Label } from "@/components/ui/label";
import { ThemeSwitch } from "@/components/dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Refund() {
  return (
    <Layout>
      <Layout.Header className="pb-0">
        <div className='ml-auto flex items-center space-x-4'>
          <TooltipProvider>
            <ThemeSwitch />
          </TooltipProvider>
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className="grid gap-8">
          <Label className="text-4xl text-center">Cancellation and Refund Policy</Label>
          <Label className="text-lg text-center font-medium">Last Updated: Jul 21 2024</Label>
        </div>
        <div className="grid gap-8 text-sm py-12 mx-24">
          <div className="font-semibold">
          ARSH VIMAL believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
          </div>
          <div className="mx-8 space-y-4">
            <div className="flex space-x-2">
              <div>-</div>
              <div>Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>In case of any Refunds approved by the ARSH VIMAL, it’ll take 9-15 days for the refund to be processed to the end customer.</div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}