

export const HomeCard = ({ title, navi }: { title: string, navi: string }) => {
    return <div className="rounded shadow-md p-5 grid h-min gap-y-4 bg-[#FAFAFA]">
        <div className="flex justify-between items-center">
            <div className="font-bold text-3xl">
                {title}
            </div>
            <div className="flex items-center">
                <div className="text-blue-700 underline text flex flex-col justify-center text-center">
                    { } orders
                </div>

                <div className="text-blue-700 pt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
}