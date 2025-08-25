import Image from "next/image"

export const Header = () => {
    return (
        <header className="bg-[#0d0d0d] w-full h-[200px] flex justify-center items-center mb-23">
            <div className="w-full max-w-[1440px] px-4 py-4">
                <div className="flex justify-center items-center">
                    <Image src="/Logo.svg" alt="Logo" width={226} height={48} />
                </div>
            </div>
        </header>
    )
}