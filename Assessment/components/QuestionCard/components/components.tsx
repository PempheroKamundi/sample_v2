import React from 'react';

interface LoadingOverlayProps {
    message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 rounded-lg">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-700 font-opensans font-medium">{message}</p>
    </div>
);