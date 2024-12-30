// app/error.tsx
'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">出错了</h2>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                重试
            </button>
        </div>
    )
}