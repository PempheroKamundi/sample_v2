import React, { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    selectResults,
    selectScoreInfo,
    selectShowResults,
} from '@features/Assessment/store/assessment.selector'
import { toggleResults } from '@features/Assessment/store/assessment.slice'

const ResultsOverview = () => {
    const dispatch = useAppDispatch()

    const showResults = useAppSelector(selectShowResults)
    const results = useAppSelector(selectResults)

    const { passedCount, scorePercent, totalQuestions } =
        useAppSelector(selectScoreInfo)

    const handleToggleResults = useCallback(() => {
        dispatch(toggleResults())
    }, [dispatch])

    const handleNavigateToQuestion = useCallback((questionId: string) => {
        // TODO: Implement navigation logic
        console.log('Navigate to question:', questionId)
    }, [])

    const getRowClassName = useCallback((passed: boolean | null) => {
        const baseClasses = 'hover:bg-gray-100 cursor-pointer font-opensans'
        if (passed) return `bg-green-50 ${baseClasses}`
        if (!passed) return `bg-red-50 ${baseClasses}`
        return `bg-gray-50 ${baseClasses}`
    }, [])

    const getStatusElement = useCallback((passed: boolean | null) => {
        if (passed) {
            return <span className="text-green-600">Passed</span>
        }
        if (!passed) {
            return <span className="text-red-600">Failed</span>
        }
        return <span className="text-gray-500">Not submitted</span>
    }, [])

    const questionEntries = useMemo(() => Object.entries(results), [results])

    const tableRows = useMemo(() => {
        return questionEntries.map(([questionId, questionResult], index) => {
            const questionNum = index + 1
            const hasFeedback = questionResult.attempt?.feedback

            return (
                <tr
                    key={questionId}
                    className={getRowClassName(questionResult?.passed)}
                    onClick={() => handleNavigateToQuestion(questionId)}
                >
                    <td className="p-2 border border-gray-200">
                        {questionNum}
                    </td>
                    <td className="p-2 border border-gray-200">
                        {getStatusElement(questionResult?.passed)}
                    </td>
                    <td className="p-2 border border-gray-200">
                        {questionResult.selected || 'Not answered'}
                    </td>
                    <td className="p-2 border border-gray-200">
                        {questionResult.correct || 'N/A'}
                    </td>
                    <td className="p-2 border border-gray-200">
                        {hasFeedback && (
                            <div className="text-gray-700 text-sm">
                                {questionResult?.attempt?.feedback.message && (
                                    <div className="font-medium mb-1">
                                        {
                                            questionResult.attempt.feedback
                                                .message
                                        }
                                    </div>
                                )}
                                {questionResult?.attempt?.feedback
                                    .explanation && (
                                    <div className="text-xs text-gray-600 italic">
                                        {
                                            questionResult.attempt.feedback
                                                .explanation
                                        }
                                    </div>
                                )}
                            </div>
                        )}
                    </td>
                </tr>
            )
        })
    }, [
        questionEntries,
        getRowClassName,
        getStatusElement,
        handleNavigateToQuestion,
    ])

    if (!showResults) return null

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4 absolute top-48 left-0 right-0 mx-auto max-w-4xl z-10 shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800 font-mier">
                    Results Overview
                </h2>
                <button
                    onClick={handleToggleResults}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close results overview"
                >
                    ✕
                </button>
            </div>

            <div className="mb-4">
                <p className="text-lg font-opensans">
                    Current Score:{' '}
                    <span className="text-[#1095F1] font-bold">
                        {passedCount}/{totalQuestions} ({scorePercent}%)
                    </span>
                </p>
            </div>

            <div className="overflow-auto max-h-96">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Question
                            </th>
                            <th className="p-2 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Status
                            </th>
                            <th className="p-2 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Your Answer
                            </th>
                            <th className="p-2 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Correct Answer
                            </th>
                            <th className="p-2 text-left border border-gray-200 font-opensans font-bold text-gray-700">
                                Feedback
                            </th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>

            <div className="mt-4 text-center">
                <button
                    onClick={handleToggleResults}
                    className="text-[#1095F1] hover:text-[#0d7fd0] font-medium font-opensans"
                >
                    Close Overview
                </button>
            </div>
        </div>
    )
}

export default ResultsOverview
