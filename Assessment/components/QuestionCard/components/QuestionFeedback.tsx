import React from 'react';
import {QuestionResult} from "@core/models";
import {getAttemptsRemaining} from "@features/Assessment/utils/assessment.utils";


interface QuestionFeedbackProps {
    result: QuestionResult | null;
}

export const QuestionFeedback: React.FC<QuestionFeedbackProps> = ({ result }) => {
    if (!result?.attempt) return null;

    const { feedback } = result.attempt;
    const attemptsLeft = getAttemptsRemaining(result);
    const isCorrect = result.passed;

    return (
        <div className="mt-6 space-y-4">
            {/* Attempts remaining indicator */}
            {!isCorrect && attemptsLeft > 0 && (
                <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded p-2">
                    <span className="font-medium">Attempts remaining: {attemptsLeft}</span>
                </div>
            )}

            {/* Feedback section */}
            {feedback && (
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <h3 className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>

                    {feedback.message && (
                        <p className="mb-2 font-opensans text-gray-700">
                            {feedback.message}
                        </p>
                    )}

                    {feedback.explanation && (
                        <div className="text-gray-700 font-opensans text-sm bg-white p-3 rounded border-l-4 border-l-blue-500">
                            <strong>Explanation:</strong> {feedback.explanation}
                        </div>
                    )}

                    {!isCorrect && attemptsLeft === 1 && feedback.hint && (
                        <div className="text-gray-700 font-opensans text-sm bg-yellow-50 p-3 rounded border-l-4 border-l-yellow-500 mt-2">
                            <strong>💡 Hint:</strong> {feedback.hint}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};