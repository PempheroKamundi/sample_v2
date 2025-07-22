import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {QuestionResult} from "@core/models";
import {useSubmitAttempt} from "@features/Assessment/hooks/useSubmitAttempt";
import {selectAssessmentState, selectCurrentQuestionId} from "@features/Assessment/store/assessment.selector";
import {toggleQuestionFlag} from "@features/Assessment/store/assessment.slice";
import {canRetryQuestion} from "@features/Assessment/utils/assessment.utils";


interface ActionButtonsProps {
    objectiveId: string;
    currentResult: QuestionResult | null;
    isAssessmentComplete: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
                                                                objectiveId,
                                                                currentResult,
                                                                isAssessmentComplete
                                                            }) => {
    const dispatch = useAppDispatch();
    const { submitAttempt, isSubmitting } = useSubmitAttempt();
    const currentQuestionId = useAppSelector(selectCurrentQuestionId);
    const { selectedOption, flaggedQuestions } = useAppSelector(selectAssessmentState);

    const handleFlag = useCallback(() => {
        if (currentQuestionId) {
            dispatch(toggleQuestionFlag(currentQuestionId));
        }
    }, [dispatch, currentQuestionId]);

    const handleSubmit = useCallback(async () => {
        if (!currentQuestionId || !selectedOption) return;

        const result = await submitAttempt({
            objectiveId,
            questionId: currentQuestionId,
            selectedOption,
        });

        if (!result.success) {
            console.error('Failed to submit answer:', result.error);
            // Here you might want to show a toast notification or error message
        }
    }, [submitAttempt, objectiveId, currentQuestionId, selectedOption]);

    const handleCompleteAssessment = useCallback(() => {
        // Navigate to results page or show completion modal
        console.log('Assessment completed!');
    }, []);

    const canSubmit = selectedOption && canRetryQuestion(currentResult) && !isSubmitting;
    const isFlagged = currentQuestionId ? flaggedQuestions.has(currentQuestionId) : false;
    const showSubmitButton = canRetryQuestion(currentResult);

    return (
        <div className="flex gap-4 items-center">
            {showSubmitButton && (
                <>
                    <button
                        className={`border py-3 px-6 rounded-full flex items-center gap-2 font-opensans transition-colors ${
                            isFlagged
                                ? 'bg-red-50 border-red-400 text-red-600 hover:bg-red-100'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={handleFlag}
                        aria-label={isFlagged ? 'Unflag this question' : 'Flag this question for review'}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" className={isFlagged ? 'text-red-500' : 'text-gray-500'}>
                            <path d="M4 21V4h6l2 2h8v10H10l-2-2H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Flag
                    </button>

                    <button
                        className={`py-3 px-6 rounded-full font-opensans transition-colors font-medium text-white ${
                            canSubmit
                                ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        aria-label="Submit your answer"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </>
            )}

            {isAssessmentComplete && (
                <button
                    className="py-3 px-6 rounded-full font-opensans transition-colors font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    onClick={handleCompleteAssessment}
                    aria-label="Complete the assessment"
                >
                    Complete Assessment
                </button>
            )}
        </div>
    );
};