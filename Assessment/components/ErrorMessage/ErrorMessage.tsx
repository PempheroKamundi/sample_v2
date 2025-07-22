interface ErrorMessageProps {
    title: string;
    message: string;
    error?: any;
    onRetry?: () => void;
    showReturnButton?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
                                                              title,
                                                              message,
                                                              error,
                                                              onRetry,
                                                              showReturnButton = false
                                                          }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full mt-4 max-w-4xl mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-50 font-opensans h-96">
            <div className="text-red-500 mb-4">
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            <h2 className="text-xl font-semibold text-red-600 mb-2 font-mier">
                {title}
            </h2>

            <p className="text-gray-700 mb-4 font-opensans text-center">
                {message}
            </p>

            {error && (
                <details className="mb-4 max-w-md">
                    <summary className="text-sm text-gray-500 cursor-pointer">Show error details</summary>
                    <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
            {error.message || JSON.stringify(error, null, 2)}
          </pre>
                </details>
            )}

            <div className="flex gap-4">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-opensans"
                    >
                        Try Again
                    </button>
                )}

                {showReturnButton && (
                    <a
                        href="/dashboard"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-opensans"
                    >
                        Return to Dashboard
                    </a>
                )}
            </div>
        </div>
    );
};
