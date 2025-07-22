interface LoadingSpinnerProps {
    title?: string;
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  title = 'Loading',
                                                                  message = 'Please wait...',
                                                                  size = 'md'
                                                              }) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-16 w-16',
        lg: 'h-24 w-24'
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-4 max-w-4xl mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-50 font-opensans h-96">
            <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4`} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2 font-mier">
                {title}
            </h2>
            <p className="text-gray-500 font-opensans text-center">
                {message}
            </p>
        </div>
    );
};