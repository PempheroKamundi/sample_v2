import React from 'react';
import { useAppSelector } from '@app/hooks';
import {selectAssessmentProgress, selectCurrentQuestion} from "@features/Assessment/store/assessment.selector";

export const AssessmentHeader: React.FC = () => {
    const currentQuestion = useAppSelector(selectCurrentQuestion);
    const progress = useAppSelector(selectAssessmentProgress);

    return (
        <div className="w-full bg-blue-600 text-white p-6 rounded-lg mb-4">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold font-mier mb-2">
                        Introduction to Biology Assessment
                    </h1>

                    {currentQuestion && (
                        <>
                            <p className="text-blue-100 mb-1 font-opensans">
                                <span className="font-medium">Subtopic:</span> {currentQuestion.sub_topic}
                            </p>
                            <p className="text-blue-100 mb-1 font-opensans">
                                <span className="font-medium">Learning Objective:</span> {currentQuestion.learning_objective}
                            </p>
                            <p className="text-blue-100 text-sm font-opensans">
                                <span className="font-medium">Difficulty:</span> {currentQuestion.difficulty}
                            </p>
                        </>
                    )}
                </div>

                <div className="text-right">
                    <div className="text-lg font-mier mb-1">Assessment Progress</div>
                    <div className="text-blue-100 text-sm">
                        {progress.answeredQuestions} of {progress.totalQuestions} completed
                    </div>
                    <div className="text-blue-100 text-sm">
                        Score: {progress.scorePercentage}%
                    </div>
                </div>
            </div>
        </div>
    );
};