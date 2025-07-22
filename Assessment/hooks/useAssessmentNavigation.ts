import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {selectCanNavigateNext, selectCanNavigatePrev} from "@features/Assessment/store/assessment.selector";
import {NavigationDirection} from "@features/Assessment/store/types";
import {navigateQuestion, navigateToQuestion} from "@features/Assessment/store/assessment.slice";

export const useAssessmentNavigation = () => {
    const dispatch = useAppDispatch();
    const canNavigateNext = useAppSelector(selectCanNavigateNext);
    const canNavigatePrev = useAppSelector(selectCanNavigatePrev);

    const navigate = useCallback((direction: NavigationDirection) => {
        dispatch(navigateQuestion(direction));
    }, [dispatch]);

    const goToQuestion = useCallback((questionId: string) => {
        dispatch(navigateToQuestion(questionId));
    }, [dispatch]);

    return {
        navigate,
        goToQuestion,
        canNavigateNext,
        canNavigatePrev,
    };
};