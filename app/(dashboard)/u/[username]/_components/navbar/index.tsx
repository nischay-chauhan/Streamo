import { Actions } from "./actions"
import { Logo } from "./logo"

export const Navbar = () => {
    return(
        <>
        <nav className="fixed top-0 w-full h-20 z-[100] bg-black  px-4 lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
            <Actions />
        </nav>
        </>
    )
}