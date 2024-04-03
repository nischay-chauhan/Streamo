import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: "700",
});

export const Logo = () => {
    return (
        <>
            <Link href={"/"}>
                <div className="hidden lg:flex items-center gap-x-4 py-4 hover:opacity-75 transition ">
                    <div className="bg-white rounded-full p-1">
                        <Image
                            src={"/logo.svg"}
                            alt="logo"
                            height={40}
                            width={40}
                        />
                    </div>
                    <div className={cn(font.className)}>
                        <p className="text-xl font-semibold"> 
                            MyLive
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Let&apos;s Play
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}