import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {selectAssessmentState} from "@features/Assessment/store/assessment.selector";
import {updateTimeRemaining} from "@features/Assessment/store/assessment.slice";
import {formatTime} from "@features/Assessment/utils/assessment.utils";

interface TimerProps {
    onTimeUp?: () => void;
    showHours?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp, showHours = false }) => {
    const dispatch = useAppDispatch();
    const { timeRemaining } = useAppSelector(selectAssessmentState);

    useEffect(() => {
        if (timeRemaining === null) return;

        const timer = setInterval(() => {
            dispatch(updateTimeRemaining(timeRemaining - 1));

            if (timeRemaining <= 1) {
                clearInterval(timer);
                onTimeUp?.();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, dispatch, onTimeUp]);

    const getColorClass = useCallback(() => {
        if (timeRemaining === null) return 'text-gray-600';
        if (timeRemaining <= 60) return 'text-red-600'; // Last minute
        if (timeRemaining <= 300) return 'text-amber-500'; // Last 5 minutes
        return 'text-blue-600';
    }, [timeRemaining]);

    if (timeRemaining === null) {
        return null;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-md p-2 flex items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" className={getColorClass()}>
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="12" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="12" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <span className={`font-opensans font-semibold ${getColorClass()}`}>
        {formatTime(timeRemaining)}
                <span className="ml-1 text-gray-700 font-normal">left</span>
      </span>
        </div>
    );
};