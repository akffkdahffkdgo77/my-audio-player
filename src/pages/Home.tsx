export default function Home() {
    return (
        <main className="w-full min-h-screen flex justify-center items-center flex-col gap-2.5">
            <h1 className="text-3xl font-bold underline">My Audio Player</h1>
            <div className="w-[300px] h-[500px] bg-black rounded-md p-5">
                <div className="w-full h-[150px] bg-blue-50 rounded-md border-2 border-black">MP3 Display</div>
                <div className="py-[100px] flex justify-center items-center">
                    <div className="relative bg-white text-black rounded-full w-[150px] h-[150px]">
                        <button className="absolute top-[10.5px] left-[calc(50%-22.5px)] w-[45px] text-[14px] uppercase" type="button">
                            Menu
                        </button>
                        <button className="absolute -left-[5px] top-[calc(50%-10.5px)]  w-[45px] text-[14px] uppercase" type="button">
                            {`<<`}
                        </button>
                        <div className="absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] bg-black rounded-full w-[75px] h-[75px]" />
                        <button className="absolute bottom-[10.5px] right-[calc(50%-22.5px)] w-[45px] text-[14px] uppercase" type="button">
                            Menu
                        </button>
                        <button className="absolute -right-[5px] bottom-[calc(50%-10.5px)] w-[45px] text-[14px] uppercase" type="button">
                            {`>>`}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
