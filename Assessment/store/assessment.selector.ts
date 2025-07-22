import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'

export const selectCurrentQuestionId = (state: RootState) =>
    state.assessment.currentQuestionId

export const selectSelectedOption = (state: RootState) =>
    state.assessment.selectedOption

export const selectFlaggedQuestions = (state: RootState) =>
    state.assessment.flaggedQuestions

export const selectAnsweredQuestions = (state: RootState) =>
    state.assessment.answeredQuestions

export const selectShowResults = (state: RootState) =>
    state.assessment.showResults

export const selectResults = (state: RootState) => state.assessment.results

export const selectTotalQuestions = (state: RootState) =>
    state.assessment.totalQuestions

export const selectSubmittingAnswer = (state: RootState) =>
    state.assessment.submittingAnswer
export const selectQuestions = (state: RootState) => state.assessment.questions

// Memoized selectors for computed values
export const selectCurrentQuestion = createSelector(
    [selectQuestions, selectCurrentQuestionId],
    (questions, currentQuestionId) =>
        questions.find((q) => q.id === currentQuestionId) || questions[0]
)

export const selectAllQuestionIds = createSelector(
    [selectQuestions],
    (questions) => questions.map((q) => q.id)
)

export const selectProgressPercent = createSelector(
    [selectQuestions, selectCurrentQuestionId, selectTotalQuestions],
    (questions, currentQuestionId, totalQuestions) => {
        const currentIndex = questions.findIndex(
            (q) => q.id === currentQuestionId
        )
        return currentIndex >= 0
            ? ((currentIndex + 1) / totalQuestions) * 100
            : 0
    }
)

export const selectScoreInfo = createSelector(
    [selectResults, selectTotalQuestions],
    (results, totalQuestions) => {
        const questionIds = Object.keys(results)

        const answeredCount = questionIds.filter(
            (id) => results[id].passed !== null
        ).length

        const passedCount = questionIds.filter(
            (id) => results[id].passed === true
        ).length

        const scorePercent =
            totalQuestions > 0
                ? Math.round((passedCount / totalQuestions) * 100)
                : 0

        return {
            answeredCount,
            passedCount,
            scorePercent,
            totalQuestions,
        }
    }
)

export const selectIsCurrentQuestionAnswered = createSelector(
    [selectAnsweredQuestions, selectCurrentQuestionId],
    (answeredQuestions, currentQuestionId) =>
        currentQuestionId
            ? answeredQuestions.includes(currentQuestionId)
            : false
)

export const selectIsCurrentQuestionFlagged = createSelector(
    [selectFlaggedQuestions, selectCurrentQuestionId],
    (flaggedQuestions, currentQuestionId) =>
        currentQuestionId ? flaggedQuestions.includes(currentQuestionId) : false
)

export const selectCurrentQuestionResult = createSelector(
    [selectResults, selectCurrentQuestionId],
    (results, currentQuestionId) =>
        currentQuestionId ? results[currentQuestionId] : null
)
