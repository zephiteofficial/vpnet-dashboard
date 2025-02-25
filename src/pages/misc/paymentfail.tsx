import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { CircleXIcon } from 'lucide-react'

export default function NotFoundError() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
                <CircleXIcon className="text-destructive size-12" />
                <h1 className="text-2xl font-bold">Payment Failed</h1>
                <p className="text-muted-foreground">We're sorry, but your payment was unsuccessful.</p>
                <Button variant={'outline'} className='mt-4' onClick={() => navigate('/')}>Go to Dashboard</Button>
            </div>
    )
}
