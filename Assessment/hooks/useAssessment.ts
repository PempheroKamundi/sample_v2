import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@app/hooks';
import { useFetchAssessmentQuestionsQuery } from '@core/services';
import { initializeAssessment } from '../store/assessment.slice';

export const useAssessment = (objectiveId: string) => {
    const dispatch = useAppDispatch();

    const {
        data,
        error,
        isLoading,
        refetch,
    } = useFetchAssessmentQuestionsQuery(
        { objectiveId },
        { skip: !objectiveId }
    );

    useEffect(() => {
        if (data?.questions) {
            dispatch(initializeAssessment(data.questions));
        }
    }, [data, dispatch]);

    const retry = useCallback(() => {
        refetch();
    }, [refetch]);

    return {
        isLoading,
        error,
        retry,
        hasData: !!data?.questions,
    };
};