import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'

export default function NotFoundError() {
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[5rem] font-bold leading-tight'>OOPS!</h1>
        <span className='font-medium'>Your payment has failed bro....</span>
        <div className='flex gap-4'>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
