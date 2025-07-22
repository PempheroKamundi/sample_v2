import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@app/hooks';
import { useFetchQuestionAttemptsQuery } from '@core/services';
import { updateAttemptResult } from '../store/assessment.slice';

export const useQuestionAttempts = (objectiveId: string) => {
    const dispatch = useAppDispatch();

    const {
        data,
        error,
        isLoading,
        refetch,
    } = useFetchQuestionAttemptsQuery(
        { objectiveId },
        { skip: !objectiveId }
    );

    useEffect(() => {
        if (data) {
            dispatch(updateAttemptResult(data));
        }
    }, [data, dispatch]);

    const retry = useCallback(() => {
        refetch();
    }, [refetch]);

    return {
        isLoading,
        error,
        retry,
    };
};