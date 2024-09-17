import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { IconPlanet } from '@tabler/icons-react'

export default function Migration() {
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <IconPlanet size={72} />
        <h1 className='text-4xl font-bold leading-tight'>VPNet Deprecated</h1>
        <p className='text-center text-muted-foreground'>
          VPNet has been deprecated in favour of ZephyrVPN. <br />
          <Link className='hover:underline font-semibold' to={'/contact'}>Contact</Link> us if you wish to migrate your current plan to ZephyrVPN.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button onClick={() => navigate('/')}>Go to ZephyrVPN</Button>
        </div>
      </div>
    </div>
  )
}
