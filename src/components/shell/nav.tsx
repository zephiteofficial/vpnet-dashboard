import { Link } from 'react-router-dom'
import { IconChevronDown, IconLogout } from '@tabler/icons-react'
import { Button, buttonVariants } from '@/components/custom/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { SideLink } from '@/data/sidelinks'
import { useAuth } from "@/context/Auth"
import { useNavigate } from "react-router-dom"

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  links: SideLink[]
  closeNav: () => void
}

export default function Nav({links, isCollapsed, className, closeNav,}: NavProps) {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const signOut = () => {
    logOut();
    navigate("/login");
  }
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      )

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      )

    return <NavLink {...rest} key={key} closeNav={closeNav} />
  }
  var logoutButton = isCollapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to=''
          onClick={signOut}
          className={cn(
            buttonVariants({
              variant: 'ghost',
              size: 'icon',
            }),
            'h-12 w-12'
          )}
        >
          <IconLogout className='ml-1' size={20} />
          <span className='sr-only'>{"Log Out"}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {"Log out"}
      </TooltipContent>
    </Tooltip>
    ):(
    <Button className='mx-2 mb-2' onClick={signOut} variant="outline">Log out</Button>
  )
  return (
    <div className="flex flex-col h-full">
      <div
        data-collapsed={isCollapsed}
        className={cn(
          'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
          className
        )}
      >
        <TooltipProvider delayDuration={0}>
          <nav className='flex flex-col h-full'>
            <div className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
              {links.map(renderLink)}
            </div>
            <div className="grid gap-1 group-[[data-collapsed=true]]:justify-center mt-auto">
              {logoutButton}
            </div>
          </nav>
        </TooltipProvider>
      </div>
    </div>
  )
}

interface NavLinkProps extends SideLink {
  subLink?: boolean
  closeNav: () => void
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href) ? 'secondary' : 'ghost',
          size: 'sm',
        }),
        'h-12 justify-start text-wrap rounded-none px-6',
        subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
      )}
      aria-current={checkActiveNav(href) ? 'page' : undefined}
    >
      <div className='mr-2'>{icon}</div>
      {title}
      {label && (
        <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
          {label}
        </div>
      )}
    </Link>
  )
}

function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'group h-12 w-full justify-start rounded-none px-6'
        )}
      >
        <div className='mr-2'>{icon}</div>
        {title}
        {label && (
          <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <IconChevronDown stroke={1} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className='collapsibleDropdown' asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className='my-1 ml-8'>
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(href) ? 'secondary' : 'ghost',
              size: 'icon',
            }),
            'h-12 w-12'
          )}
        >
          {icon}
          <span className='sr-only'>{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {title}
        {label && (
          <span className='ml-auto text-muted-foreground'>{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? 'secondary' : 'ghost'}
              size='icon'
              className='h-12 w-12'
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {title}{' '}
          {label && (
            <span className='ml-auto text-muted-foreground'>{label}</span>
          )}
          <IconChevronDown
            size={18}
            className='-rotate-90 text-muted-foreground'
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side='right' align='start' sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              to={href}
              className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}
            >
              {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
              {label && <span className='ml-auto text-xs'>{label}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}