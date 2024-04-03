interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    return(
        <aside className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-gary-600 z-101">
            {children}
        </aside>
    )
}