import React from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
    selectAssessmentState,
    selectCurrentQuestionId,
    selectQuestions,
    selectQuestionStatus
} from "@features/Assessment/store/assessment.selector";
import {getQuestionStatusColor} from "@features/Assessment/utils/assessment.utils";
import {navigateToQuestion} from "@features/Assessment/store/assessment.slice";


export const QuestionPills: React.FC = () => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector(selectQuestions);
    const currentQuestionId = useAppSelector(selectCurrentQuestionId);
    const getStatus = useAppSelector(selectQuestionStatus);
    const { flaggedQuestions } = useAppSelector(selectAssessmentState);

    const handleNavigateToQuestion = (questionId: string) => {
        dispatch(navigateToQuestion(questionId));
    };

    return (
        <div className="w-full bg-white border border-gray-200 rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Questions:</span>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-100 border border-green-500" />
                        <span>Correct</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-100 border border-red-500" />
                        <span>Incorrect</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-500" />
                        <span>Flagged</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {questions.map((question, index) => {
                    const status = getStatus(question.id);
                    const isCurrent = question.id === currentQuestionId;
                    const isFlagged = flaggedQuestions.has(question.id);

                    let pillClass = `
            w-10 h-10 rounded-full flex items-center justify-center cursor-pointer 
            font-medium text-sm transition-all duration-200 hover:scale-105
            ${getQuestionStatusColor(status)}
          `;

                    if (isCurrent) {
                        pillClass += ' ring-2 ring-blue-600 ring-offset-2';
                    }

                    if (isFlagged && status === 'unanswered') {
                        pillClass = pillClass.replace('bg-gray-100', 'bg-yellow-100');
                        pillClass = pillClass.replace('border-gray-300', 'border-yellow-500');
                    }

                    return (
                        <div
                            key={question.id}
                            className={pillClass}
                            onClick={() => handleNavigateToQuestion(question.id)}
                            title={`Question ${index + 1}${isCurrent ? ' (current)' : ''}`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleNavigateToQuestion(question.id);
                                }
                            }}
                        >
                            <span>{index + 1}</span>
                            {isFlagged && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border border-white" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};