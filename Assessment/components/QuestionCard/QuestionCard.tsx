import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';


import { canRetryQuestion } from '../../utils/assessment.utils';
import {
    selectAssessmentState,
    selectCurrentQuestion,
    selectCurrentQuestionIndex,
    selectCurrentQuestionResult
} from "@features/Assessment/store/assessment.selector";
import {LoadingOverlay} from "@features/Assessment/components/QuestionCard/components/components";
import {QuestionHeader} from "@features/Assessment/components/QuestionCard/components/QuestionHeader";
import {QuestionOptions} from "@features/Assessment/components/QuestionCard/components/QuestionOptions";
import {QuestionFeedback} from "@features/Assessment/components/QuestionCard/components/QuestionFeedback";
import {selectOption} from "@features/Assessment/store/assessment.slice";

export const QuestionCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentQuestion = useAppSelector(selectCurrentQuestion);
    const currentResult = useAppSelector(selectCurrentQuestionResult);
    const currentIndex = useAppSelector(selectCurrentQuestionIndex);
    const { selectedOption, submittingAnswer, showResults } = useAppSelector(selectAssessmentState);

    const handleOptionSelect = useCallback((optionId: string) => {
        if (!canRetryQuestion(currentResult)) return;
        dispatch(selectOption(optionId));
    }, [dispatch, currentResult]);

    // Don't render if no current question
    if (!currentQuestion) {
        return (
            <div className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <p className="text-center text-gray-500">No question available</p>
            </div>
        );
    }

    const questionNumber = currentIndex + 1;
    const isInteractive = canRetryQuestion(currentResult);

    return (
        <div
            className={`w-full bg-white border border-gray-200 rounded-lg p-6 mb-4 relative transition-opacity ${
                showResults ? 'opacity-20 pointer-events-none' : ''
            }`}
        >
            {submittingAnswer && <LoadingOverlay message="Submitting your answer..." />}

            <QuestionHeader
                questionNumber={questionNumber}
                questionText={currentQuestion.text}
                result={currentResult}
            />

            <QuestionOptions
                options={currentQuestion.content.options}
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
                result={currentResult}
                isInteractive={isInteractive}
            />

            <QuestionFeedback result={currentResult} />
        </div>
    );
};