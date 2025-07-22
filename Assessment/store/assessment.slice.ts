import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssessmentState } from './question-store.types'
import { QuestionAttemptsResponse, Results } from '@core/services'
import { Question } from '@core/models'

const initialState: AssessmentState = {
    questions: [],
    currentQuestionId: '',
    selectedOption: null,
    flaggedQuestions: [],
    answeredQuestions: [],
    showResults: false,
    results: {},
    totalQuestions: 0,
    submittingAnswer: false,
}

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        selectOption: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload
            const currentId = state.currentQuestionId

            if (currentId && !state.answeredQuestions.includes(currentId)) {
                state.answeredQuestions.push(currentId)
            }

            // Update the results with the selected option
            if (currentId && state.results[currentId]) {
                state.results[currentId].selected = action.payload
            }
        },

        toggleSubmittingAnswer: (state, action: PayloadAction<boolean>) => {
            state.submittingAnswer = action.payload
        },

        updateAttemptsData: (
            state,
            action: PayloadAction<QuestionAttemptsResponse>
        ) => {
            const attemptData = action.payload

            // Update each question's result with the attempt data
            Object.keys(attemptData).forEach((questionId) => {
                const attempt = attemptData[questionId]

                // Create a new result entry if it doesn't exist
                if (!state.results[questionId]) {
                    state.results[questionId] = {
                        passed: null,
                        selected: null,
                        correct: null,
                    }
                }

                // Update with attempt data
                state.results[questionId] = {
                    ...state.results[questionId],
                    passed: attempt.is_correct,
                    selected: attempt.question_metadata.selected_option_ids[0],
                    attempt: attempt,
                    correct: attempt.is_correct
                        ? attempt.question_metadata.selected_option_ids[0]
                        : null,
                }

                // Add to answered questions if not already there
                if (!state.answeredQuestions.includes(questionId)) {
                    state.answeredQuestions.push(questionId)
                }
            })
        },

        navigateQuestion: (state, action: PayloadAction<'next' | 'prev'>) => {
            const currentIndex = state.questions.findIndex(
                (q) => q.id === state.currentQuestionId
            )

            if (
                action.payload === 'next' &&
                currentIndex < state.totalQuestions - 1
            ) {
                state.currentQuestionId =
                    state.questions[currentIndex + 1]?.id || null
            } else if (action.payload === 'prev' && currentIndex > 0) {
                state.currentQuestionId =
                    state.questions[currentIndex - 1]?.id || null
            }

            // Update selected option for the new current question
            if (state.currentQuestionId) {
                state.selectedOption =
                    state.results[state.currentQuestionId]?.selected || null
            }
        },

        toggleFlag: (state) => {
            if (state.currentQuestionId) {
                if (state.flaggedQuestions.includes(state.currentQuestionId)) {
                    state.flaggedQuestions = state.flaggedQuestions.filter(
                        (id) => id !== state.currentQuestionId
                    )
                } else {
                    state.flaggedQuestions.push(state.currentQuestionId)
                }
            }
        },

        toggleResults: (state) => {
            state.showResults = !state.showResults
        },

        submitAnswer: (
            state,
            action: PayloadAction<{
                questionId: string
                selectedOption: string
            }>
        ) => {
            const { questionId, selectedOption } = action.payload
            const correctAnswer = state.results[questionId]?.correct

            if (correctAnswer !== undefined) {
                state.results[questionId] = {
                    ...state.results[questionId],
                    selected: selectedOption,
                    passed: selectedOption === correctAnswer,
                }
            }
        },

        navigateToQuestion: (state, action: PayloadAction<string>) => {
            state.currentQuestionId = action.payload
            state.selectedOption =
                state.results[action.payload]?.selected || null
        },

        updateResults: (state, action: PayloadAction<Results>) => {
            state.results = { ...state.results, ...action.payload }
        },

        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload
            state.totalQuestions = action.payload.length
            // Set current question if not already set
            if (!state.currentQuestionId && action.payload.length > 0) {
                state.currentQuestionId = action.payload[0].id
            }
        },

        // Reset state when starting new assessment
        resetAssessment: (state) => {
            state.questions = []
            state.currentQuestionId = ''
            state.selectedOption = null
            state.flaggedQuestions = []
            state.answeredQuestions = []
            state.showResults = false
            state.results = {}
            state.totalQuestions = 0
        },
    },
})

// Export actions
export const {
    selectOption,
    toggleSubmittingAnswer,
    navigateQuestion,
    toggleFlag,
    toggleResults,
    submitAnswer,
    navigateToQuestion,
    updateResults,
    setQuestions,
    updateAttemptsData,
    resetAssessment,
} = assessmentSlice.actions

export default assessmentSlice.reducer
