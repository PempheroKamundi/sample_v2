import React, { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    selectAllQuestionIds,
    selectCurrentQuestionId,
    selectResults,
} from '@features/Assessment/store/assessment.selector'
import { navigateToQuestion } from '@features/Assessment/store/assessment.slice'

const QuestionPills = () => {
    const dispatch = useAppDispatch()
    const results = useAppSelector(selectResults)
    const questionIds = useAppSelector(selectAllQuestionIds)
    const currentQuestionId = useAppSelector(selectCurrentQuestionId)

    const handleNavigateToQuestion = useCallback(
        (id: string) => {
            dispatch(navigateToQuestion(id))
        },
        [dispatch]
    )

    const memoizedList = useMemo(() => {
        return questionIds.map((id, index) => {
            // Determine question status
            const result = results[id]
            const isAnswered = result?.passed != null
            const isCorrect = result?.passed === true
            const isIncorrect = isAnswered && !isCorrect
            const isCurrent = id === currentQuestionId
            const isFlagged = false

            let pillClass =
                'w-8 h-8 rounded-full flex items-center justify-center cursor-pointer '

            if (isCorrect) {
                pillClass += 'bg-green-100 '
            } else if (isIncorrect || isFlagged) {
                pillClass += 'bg-red-100 '
            } else {
                pillClass += 'bg-gray-200 '
            }

            if (isCurrent) {
                pillClass += 'border-2 border-blue-600 '
            } else if (isFlagged) {
                pillClass += 'border border-red-500 '
            }

            return (
                <div
                    key={id}
                    className={pillClass.trim()}
                    onClick={() => handleNavigateToQuestion(id)}
                    aria-label={`Question ${index + 1}${isCurrent ? ' (current)' : ''}`}
                >
                    {index + 1}
                </div>
            )
        })
    }, [handleNavigateToQuestion, results, currentQuestionId])

    return (
        <div className="w-full bg-white border rounded-md p-3 flex items-center">
            <span className="mr-4">Questions:</span>
            <div className="flex flex-wrap gap-2">{memoizedList}</div>
        </div>
    )
}

export default QuestionPills
