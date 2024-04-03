import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: "700",
});

export const Logo = () => {
    return (
        <>
        <div className={cn("flex  items-center gap-y-4")}>
            <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                />
        </div>
        <h3 className={cn("text-3xl text-white font-bold", font.className)}>Join Today</h3>
        </>
    )
}