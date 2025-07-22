import React from 'react'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    selectCurrentQuestionId,
    selectCurrentQuestionResult,
    selectScoreInfo,
    selectSelectedOption,
} from '@features/Assessment/store/assessment.selector'
import {
    navigateQuestion,
    toggleSubmittingAnswer,
} from '@features/Assessment/store/assessment.slice'
import useSubmitAttempt from '@features/Assessment/hooks/useSubmitAttempt'

const NavigationControls = ({ objectiveId }: { objectiveId: string }) => {
    const dispatch = useAppDispatch()
    const { submitQuestionAttempt, isLoading } = useSubmitAttempt()

    const currentQuestionResult = useAppSelector(selectCurrentQuestionResult)

    // dont mind these, will make dynamic later
    const isSubmitDisabled = false
    const isPrevDisabled = false
    const isNextDisabled = false

    const selectedOption = useAppSelector(selectSelectedOption)
    const currentQuestionId = useAppSelector(selectCurrentQuestionId)
    const { answeredCount, totalQuestions } = useAppSelector(selectScoreInfo)

    // Handler for submit button
    const hasAttempt = !!currentQuestionResult?.attempt
    const attemptsRemaining =
        currentQuestionResult?.attempt?.attempts_remaining ||
        (hasAttempt ? 0 : 3)
    const isCorrect = currentQuestionResult?.passed === true
    const shouldFreezeQuestion =
        hasAttempt && (isCorrect || attemptsRemaining === 0)

    const handleFlag = () => {
        console.log('handle flag')
    }

    const handleNavigate = (direction: 'next' | 'prev') => {
        dispatch(navigateQuestion(direction))
    }

    const onSubmitClick = async () => {
        // Add async here
        if (
            !isSubmitDisabled &&
            selectedOption !== null &&
            currentQuestionId !== null
        ) {
            try {
                dispatch(toggleSubmittingAnswer(true))

                await submitQuestionAttempt({
                    objectiveId,
                    questionId: currentQuestionId,
                    selectedOption,
                }).unwrap()

                console.log('Answer submitted successfully!')
            } catch (error) {
                console.error('Failed to submit answer:', error)
            } finally {
                dispatch(toggleSubmittingAnswer(false))
            }
        }
    }

    // Check if all questions are answered
    const isAssessmentComplete =
        answeredCount === totalQuestions && totalQuestions > 0

    // Handle complete assessment action
    const onCompleteClick = () => {
        // handle submit complete here
    }

    // Check if the current question is flagged
    // const isFlagged =
    //     currentQuestionId !== null &&
    //     flaggedQuestions.includes(currentQuestionId)
    const isFlagged = false

    return (
        <div className="w-full flex justify-between mb-4">
            {/* Left side navigation buttons */}
            <div className="flex gap-4">
                <button
                    className={`
            bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-full 
            flex items-center gap-2 border border-gray-300 font-opensans
            ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}
          `}
                    onClick={() => !isPrevDisabled && handleNavigate('prev')}
                    aria-label="Go to previous question"
                    disabled={isPrevDisabled}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                    Previous
                </button>

                <button
                    className={`
            bg-[#1095F1] text-white font-medium py-3 px-6 rounded-full 
            flex items-center gap-2 font-opensans
            ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0d7fd0] cursor-pointer'}
          `}
                    onClick={() => !isNextDisabled && handleNavigate('next')}
                    aria-label="Go to next question"
                    disabled={isNextDisabled}
                >
                    Next
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </button>
            </div>

            {/* Right side action buttons */}
            <div className="flex gap-4">
                {!shouldFreezeQuestion && (
                    <>
                        <button
                            className={`border py-3 px-6 rounded-full flex items-center gap-2 font-opensans transition-colors ${
                                isFlagged
                                    ? 'bg-red-50 border-red-400 text-red-600 hover:bg-red-100'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={handleFlag}
                            aria-label={
                                isFlagged
                                    ? 'Unflag this question'
                                    : 'Flag this question for review'
                            }
                            data-testid="flag-button"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                className={
                                    isFlagged ? 'text-red-500' : 'text-gray-500'
                                }
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 21V4h6l2 2h8v10H10l-2-2H4z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            Flag
                        </button>

                        <button
                            className={`py-3 px-6 rounded-full font-opensans transition-colors font-medium text-white ${
                                isSubmitDisabled || selectedOption === null
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                            }`}
                            onClick={onSubmitClick}
                            disabled={
                                isSubmitDisabled ||
                                selectedOption === null ||
                                isLoading
                            }
                            aria-label="Submit your answer"
                            data-testid="submit-button"
                        >
                            Submit
                        </button>
                    </>
                )}

                {isAssessmentComplete && (
                    <button
                        className="py-3 px-6 rounded-full font-opensans transition-colors font-medium text-white bg-[#1095F1] hover:bg-[#0d7fd0] cursor-pointer"
                        onClick={onCompleteClick}
                        aria-label="Complete the assessment"
                        data-testid="complete-button"
                    >
                        Complete Assessment
                    </button>
                )}
            </div>
        </div>
    )
}

export default NavigationControls
