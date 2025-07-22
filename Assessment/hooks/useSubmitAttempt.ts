import { useCallback } from 'react';
import { useAppDispatch } from '@app/hooks';
import {SubmitQuestionAttemptParams, useSubmitQuestionAttemptMutation} from '@core/services';
import {setSubmittingState, updateAttemptResult} from "@features/Assessment/store/assessment.slice";

export const useSubmitAttempt = () => {
    const dispatch = useAppDispatch();
    const [submitMutation, { isLoading }] = useSubmitQuestionAttemptMutation();

    const submitAttempt = useCallback(async (params: SubmitQuestionAttemptParams) => {
        try {
            dispatch(setSubmittingState(true));
            const result = await submitMutation(params).unwrap();
            dispatch(updateAttemptResult(result));
            return { success: true, data: result };
        } catch (error) {
            dispatch(setSubmittingState(false));
            return { success: false, error };
        }
    }, [dispatch, submitMutation]);

    return {
        submitAttempt,
        isSubmitting: isLoading,
    };
};