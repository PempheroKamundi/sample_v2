import React from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { toggleResultsView } from '../../store/assessment.slice';
import {selectAssessmentProgress, selectCurrentQuestionIndex} from "@features/Assessment/store/assessment.selector";

export const ProgressBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentIndex = useAppSelector(selectCurrentQuestionIndex);
    const progress = useAppSelector(selectAssessmentProgress);

    const handleToggleResults = () => {
        dispatch(toggleResultsView());
    };

    const currentQuestionNumber = Math.max(1, currentIndex + 1);
    const progressPercentage = progress.progressPercentage;

    return (
        <div className="flex-grow bg-white border border-gray-200 rounded-md p-2 relative mr-4">
            <div
                className="bg-blue-600 opacity-40 absolute left-0 top-0 h-full rounded-md transition-all duration-300"
                style={{ width: `${progressPercentage}%`, margin: '2px' }}
            />

            <div className="text-center relative z-10 font-opensans text-gray-700 flex items-center justify-between px-2">
                <span>Question {currentQuestionNumber} of {progress.totalQuestions}</span>

                <button
                    onClick={handleToggleResults}
                    className="bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded px-3 py-1 flex items-center gap-2 transition-colors text-sm"
                    title="View your quiz progress and results"
                >
                    <div className="flex items-end h-4 gap-1">
                        <div className="w-1 h-2 bg-amber-600 rounded-sm" />
                        <div className="w-1 h-1.5 bg-amber-600 rounded-sm" />
                        <div className="w-1 h-3 bg-amber-600 rounded-sm" />
                    </div>
                    <span className="font-medium text-amber-800">
            Progress ({progress.correctAnswers}/{progress.totalQuestions})
          </span>
                </button>
            </div>
        </div>
    );
};
