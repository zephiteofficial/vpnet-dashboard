import { ContentSection } from "@/components/dashboard"
import { Label } from "@/components/ui/label"
import { useAPI } from "@/hooks"
import { Skeleton } from "@/components/ui/skeleton"

export default function PlanSettings(){
  const { planData } = useAPI()
  return(
    <ContentSection title='Plan Details' desc='View your plan details here.'>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-sm font-bold">Name</Label>
          <div className="text-sm text-muted-foreground font-medium">{ planData? (`${planData.plan.name} Plan`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Plan Cost</Label>
          <div className="text-sm text-muted-foreground font-medium">{ planData? (`${planData.plan.cost} Credits`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Device Limit</Label>
          <div className="text-sm text-muted-foreground font-medium">{ planData? (`${planData.plan.device_limit} Devices`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Premium Bandwidth</Label>
          <div className="text-sm text-muted-foreground font-medium">{ planData? (`${(planData.plan.bandwidth_limit/1024/1024/1024).toFixed(2)} GB`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-bold">Plan End Date</Label>
          <div className="text-sm text-muted-foreground font-medium">{ planData? (`${planData.plan.end_date}`) : (<Skeleton className="w-[64px] h-[16px] rounded-full mt-2"/>) }</div>
        </div>
      </div>
    </ContentSection>
  )
}