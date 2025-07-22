import React, { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    selectCurrentQuestion,
    selectCurrentQuestionResult,
    selectSelectedOption,
    selectShowResults,
    selectSubmittingAnswer,
} from '@features/Assessment/store/assessment.selector'
import { selectOption } from '@features/Assessment/store/assessment.slice'

const QuestionCard = () => {
    const dispatch = useAppDispatch()
    const showResults = useAppSelector(selectShowResults)
    const currentQuestion = useAppSelector(selectCurrentQuestion)
    const selectedOption = useAppSelector(selectSelectedOption)
    const submittingAnswer = useAppSelector(selectSubmittingAnswer)

    // We'll compute the question number for display purposes
    // This assumes there's some way to determine the sequence number
    // For now, we'll just use a placeholder that can be replaced
    const questionNumber = 1 // This should be provided or computed

    const currentQuestionResult = useAppSelector(selectCurrentQuestionResult)

    const handleOptionSelect = useCallback(
        (optionId: string) => {
            dispatch(selectOption(optionId))
        },
        [dispatch]
    )

    const hasAttempt = !!currentQuestionResult?.attempt
    const isCorrect = currentQuestionResult?.passed === true
    const attemptsRemaining =
        currentQuestionResult?.attempt?.attempts_remaining ||
        (hasAttempt ? 0 : 3)
    const shouldFreezeQuestion =
        hasAttempt && (isCorrect || attemptsRemaining === 0)

    const memoizedOptions = useMemo(() => {
        return currentQuestion.content.options.map((option) => {
            const isSelectedOption = selectedOption === option.id
            const isCorrectOption = currentQuestionResult?.correct === option.id
            const isIncorrectSelection =
                hasAttempt && isSelectedOption && !isCorrect

            return (
                <div
                    key={option.id}
                    className={`p-4 rounded-lg border ${
                        shouldFreezeQuestion
                            ? 'cursor-default'
                            : 'cursor-pointer'
                    } ${
                        // FIXED: Make sure the option highlights correctly regardless of frozen state
                        isSelectedOption
                            ? 'bg-[#e1f0fd] border-[#1095F1]'
                            : shouldFreezeQuestion
                              ? 'bg-gray-50'
                              : 'bg-gray-50 hover:bg-gray-100'
                    } ${
                        hasAttempt && isCorrectOption
                            ? 'bg-green-50 border-green-500'
                            : ''
                    } ${
                        isIncorrectSelection ? 'bg-red-50 border-red-500' : ''
                    }`}
                    onClick={() =>
                        !shouldFreezeQuestion && handleOptionSelect(option.id)
                    }
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedOption === option.id
                                    ? 'border-[#1095F1]'
                                    : 'border-gray-400'
                            }`}
                        >
                            {selectedOption === option.id && (
                                <div className="w-3 h-3 rounded-full bg-[#1095F1]"></div>
                            )}
                        </div>
                        <span className="font-opensans text-gray-700">
                            {option.text}
                        </span>
                    </div>
                </div>
            )
        })
    }, [currentQuestion, selectedOption])

    return (
        <div
            className={`w-full bg-white border border-gray-200 rounded-lg p-6 mb-4 ${
                showResults ? 'opacity-20 pointer-events-none' : ''
            } ${
                hasAttempt
                    ? isCorrect
                        ? 'border-l-4 border-l-green-500'
                        : 'border-l-4 border-l-red-500'
                    : ''
            } relative`}
        >
            {submittingAnswer && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg">
                    <div className="w-12 h-12 border-4 border-[#1095F1] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-700 font-opensans font-medium">
                        Submitting your answer...
                    </p>
                </div>
            )}

            <h2 className="text-lg font-bold mb-6 text-gray-800 font-mier">
                Question {questionNumber}: {currentQuestion.text}
                {hasAttempt && (
                    <span
                        className={`ml-2 inline-flex items-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {isCorrect ? (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        )}
                    </span>
                )}
            </h2>

            <div className="space-y-4">{memoizedOptions}</div>

            {hasAttempt && attemptsRemaining > 0 && !isCorrect && (
                <div className="mt-4 text-sm text-gray-600">
                    Attempts remaining: {attemptsRemaining}
                </div>
            )}

            {hasAttempt && currentQuestionResult?.attempt?.feedback && (
                <div
                    className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                >
                    <h3
                        className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'} mb-2`}
                    >
                        Feedback
                    </h3>
                    {currentQuestionResult.attempt.feedback.message && (
                        <p className="mb-2 font-opensans">
                            {currentQuestionResult.attempt.feedback.message}
                        </p>
                    )}
                    {currentQuestionResult.attempt.feedback.explanation && (
                        <div className="text-gray-700 font-opensans text-sm bg-white p-3 rounded">
                            <strong>Explanation:</strong>{' '}
                            {currentQuestionResult.attempt.feedback.explanation}
                        </div>
                    )}

                    {attemptsRemaining == 1 && !isCorrect && (
                        <div className="text-gray-700 font-opensans text-sm bg-white p-3 rounded">
                            <strong>Hint:</strong>{' '}
                            {currentQuestionResult?.attempt?.feedback?.hint}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default QuestionCard
