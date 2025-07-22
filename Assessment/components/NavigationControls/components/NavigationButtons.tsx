import React from 'react';
import {useAssessmentNavigation} from "@features/Assessment/hooks/useAssessmentNavigation";

export const NavigationButtons: React.FC = () => {
    const { navigate, canNavigateNext, canNavigatePrev } = useAssessmentNavigation();

    return (
        <div className="flex gap-4">
            <button
                className={`
          bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-full 
          flex items-center gap-2 border border-gray-300 font-opensans transition-all
          ${canNavigatePrev ? 'hover:bg-gray-200 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
        `}
                onClick={() => canNavigatePrev && navigate('prev')}
                disabled={!canNavigatePrev}
                aria-label="Go to previous question"
            >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Previous
            </button>

            <button
                className={`
          bg-blue-600 text-white font-medium py-3 px-6 rounded-full 
          flex items-center gap-2 font-opensans transition-all
          ${canNavigateNext ? 'hover:bg-blue-700 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
        `}
                onClick={() => canNavigateNext && navigate('next')}
                disabled={!canNavigateNext}
                aria-label="Go to next question"
            >
                Next
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </button>
        </div>
    );
};