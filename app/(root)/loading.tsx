const loading = () => {
    return (
        <div className="mt-60 flex flex-col items-center justify-center gap-4">
            <div className="size-10 border-t-2 border-t-gray-500 rounded-full animate-spin" />
            <h1 className="text-2xl text-white font-semibold">Loading...</h1>
        </div>
    )
}

export default loading