const ErrorBlock = ({
    title,
    description,
    message,
}: {
    title: string
    description: string
    message?: string
}) => (
    <div className="flex flex-col items-center justify-center w-full mt-4 max-w-4xl mx-auto p-6 border border-gray rounded-lg shadow-lg bg-gray-50 font-opensans h-96">
        <div className="text-red-500 mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
        </div>
        <h2 className="text-xl font-semibold text-red-600 mb-2 font-mier">
            {title}
        </h2>
        <p className="text-gray-700 mb-4 font-opensans">{description}</p>
        {message && <p className="text-red-600 mb-6 text-center">{message}</p>}
        <div className="flex gap-4">
            <button
                className="px-4 py-2 bg-textSecondary text-white rounded-md hover:bg-textSecondary transition-colors font-opensans"
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>
            <a
                href="/dashboard"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-opensans"
            >
                Return to Dashboard
            </a>
        </div>
    </div>
)

export default ErrorBlock
