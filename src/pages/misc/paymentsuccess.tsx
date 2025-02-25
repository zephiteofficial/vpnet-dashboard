import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { CircleCheckIcon } from "lucide-react"

export default function NotFoundError() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <CircleCheckIcon className="text-primary size-12" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground text-center">Thank you for your purchase. Your order is being processed.</p>
            <Button className='mt-4' onClick={() => navigate('/')}>Go to Dashboard</Button>
        </div>
    )
}
