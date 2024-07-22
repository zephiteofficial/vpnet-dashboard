import { Layout } from "@/components/custom/layout";
import { Label } from "@/components/ui/label";
import { ThemeSwitch } from "@/components/dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Terms() {
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
          <Label className="text-4xl text-center">Terms and Conditions</Label>
          <Label className="text-lg text-center font-medium">Last Updated: Jul 21 2024</Label>
        </div>
        <div className="grid gap-8 text-sm py-12 mx-24">
          <div>
          For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean ARSH VIMAL, whose registered/operational office is New Moti Bagh Delhi DELHI 110022 . "you", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
          </div>
          <div className="font-semibold">
          Your use of the website and/or purchase from us are governed by following Terms and Conditions:
          </div>
          <div className="mx-8 space-y-4">
            <div className="flex space-x-2">
              <div>-</div>
              <div>The content of the pages of this website is subject to change without notice.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>You may not create a link to our website from another website or document without ARSH VIMAL’s prior written consent.</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India .</div>
            </div>
            <div className="flex space-x-2">
              <div>-</div>
              <div>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}