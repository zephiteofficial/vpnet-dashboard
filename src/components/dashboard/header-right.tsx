import ThemeSwitch from "./theme-switch"
import Contact from "./contact"
import { TooltipProvider } from "@/components/ui/tooltip"
import CurrencyButton from "./currency-button"
import { UserProfile } from "@/interfaces"

export default function HeaderRight(profileData : UserProfile|null) {
  return (
    <div className='ml-auto flex items-center space-x-4'>
      <TooltipProvider>
        {CurrencyButton(profileData)}
        <Contact />
        <ThemeSwitch />
      </TooltipProvider>
    </div>
  )
}