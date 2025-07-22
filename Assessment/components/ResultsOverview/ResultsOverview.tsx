import React from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { toggleResultsView, navigateToQuestion } from '../../store/assessment.slice';
import {
    selectAssessmentProgress,
    selectQuestions,
    selectResults,
    selectShowResults
} from "@features/Assessment/store/assessment.selector";


export const ResultsOverview: React.FC = () => {
    const dispatch = useAppDispatch();
    const showResults = useAppSelector(selectShowResults);
    const results = useAppSelector(selectResults);
    const questions = useAppSelector(selectQuestions);
    const progress = useAppSelector(selectAssessmentProgress);

    const handleClose = () => {
        dispatch(toggleResultsView());
    };

    const handleNavigateToQuestion = (questionId: string) => {
        dispatch(navigateToQuestion(questionId));
        dispatch(toggleResultsView());
    };

    if (!showResults) return null;

    return (
        <div className="absolute top-32 left-0 right-0 mx-auto max-w-4xl z-20 bg-white border border-gray-200 rounded-lg shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 font-mier">Assessment Results</h2>
                <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 p-1"
                    aria-label="Close results overview"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4">
                {/* Score Summary */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{progress.correctAnswers}</div>
                            <div className="text-sm text-gray-600">Correct</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-600">{progress.answeredQuestions}</div>
                            <div className="text-sm text-gray-600">Answered</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{progress.totalQuestions}</div>
                            <div className="text-sm text-gray-600">Total</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{progress.scorePercentage}%</div>
                            <div className="text-sm text-gray-600">Score</div>
                        </div>
                    </div>
                </div>

                {/* Questions Table */}
                <div className="overflow-auto max-h-96">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="p-3 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Question
                            </th>
                            <th className="p-3 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Status
                            </th>
                            <th className="p-3 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Your Answer
                            </th>
                            <th className="p-3 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Correct Answer
                            </th>
                            <th className="p-3 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Feedback
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((question, index) => {
                            const result = results[question.id];
                            const questionNum = index + 1;

                            const getRowClassName = () => {
                                const baseClasses = 'hover:bg-gray-50 cursor-pointer transition-colors';
                                if (result?.passed === true) return `bg-green-50 ${baseClasses}`;
                                if (result?.passed === false) return `bg-red-50 ${baseClasses}`;
                                return `bg-gray-50 ${baseClasses}`;
                            };

                            const getStatusBadge = () => {
                                if (result?.passed === true) {
                                    return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Correct</span>;
                                }
                                if (result?.passed === false) {
                                    return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Incorrect</span>;
                                }
                                return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Not answered</span>;
                            };

                            const getAnswerOption = (optionId: string | null) => {
                                if (!optionId) return 'Not answered';
                                const option = question.content.options.find(opt => opt.id === optionId);
                                return option ? option.text : 'Unknown option';
                            };

                            return (
                                <tr
                                    key={question.id}
                                    className={getRowClassName()}
                                    onClick={() => handleNavigateToQuestion(question.id)}
                                >
                                    <td className="p-3 border border-gray-200">
                                        <div className="font-medium">Question {questionNum}</div>
                                        <div className="text-sm text-gray-600 truncate max-w-xs" title={question.text}>
                                            {question.text}
                                        </div>
                                    </td>
                                    <td className="p-3 border border-gray-200">
                                        {getStatusBadge()}
                                    </td>
                                    <td className="p-3 border border-gray-200 text-sm">
                                        {getAnswerOption(result?.selected)}
                                    </td>
                                    <td className="p-3 border border-gray-200 text-sm">
                                        {result?.attempt && !result.passed
                                            ? getAnswerOption(result.correct)
                                            : result?.passed
                                                ? getAnswerOption(result.selected)
                                                : 'N/A'
                                        }
                                    </td>
                                    <td className="p-3 border border-gray-200 text-sm">
                                        {result?.attempt?.feedback?.message && (
                                            <div className="max-w-xs">
                                                <div className="font-medium text-gray-700 truncate" title={result.attempt.feedback.message}>
                                                    {result.attempt.feedback.message}
                                                </div>
                                                {result.attempt.feedback.explanation && (
                                                    <div className="text-xs text-gray-500 truncate mt-1" title={result.attempt.feedback.explanation}>
                                                        {result.attempt.feedback.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-opensans"
                    >
                        Close Overview
                    </button>
                </div>
            </div>
        </div>
    );
};