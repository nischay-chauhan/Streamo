import  {Tooltip , TooltipContent , TooltipTrigger , TooltipProvider} from "@/components/ui/tooltip"

interface HintProps {
    label : string;
    children: React.ReactNode;
    asChild?: boolean;
    side ?: "top" | "bottom" | "left" | "right";
    align ?: "start" | "center" | "end"
}

export const Hint = ({label , children , asChild , side , align} : HintProps) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                sideOffset={5}
                side={side}
                align={align}
                >
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}