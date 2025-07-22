import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { updateTimeRemaining } from '../store/assessment.slice';
import {selectAssessmentState} from "@features/Assessment/store/assessment.selector";

export const useAssessmentTimer = (onTimeUp?: () => void) => {
    const dispatch = useAppDispatch();
    const { timeRemaining, assessmentStartTime } = useAppSelector(selectAssessmentState);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const onTimeUpRef = useRef(onTimeUp);

    // Update ref when callback changes
    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    const startTimer = useCallback(() => {
        if (intervalRef.current) return; // Already started

        intervalRef.current = setInterval(() => {
            dispatch(updateTimeRemaining(Math.max(0, timeRemaining - 1)));
        }, 1000);
    }, [dispatch, timeRemaining]);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Handle time up
    useEffect(() => {
        if (timeRemaining === 0 && onTimeUpRef.current) {
            onTimeUpRef.current();
            stopTimer();
        }
    }, [timeRemaining, stopTimer]);

    // Auto-start timer when assessment starts
    useEffect(() => {
        if (assessmentStartTime && timeRemaining && timeRemaining > 0) {
            startTimer();
        }

        return stopTimer;
    }, [assessmentStartTime, timeRemaining, startTimer, stopTimer]);

    return { startTimer, stopTimer };
};