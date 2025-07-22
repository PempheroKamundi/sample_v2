import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ASSESSMENT_CONFIG, AssessmentState, NavigationDirection} from './types';
import {Question} from "@core/models";
import {QuestionAttemptsResponse} from "@core/services";

const initialState: AssessmentState = {
    questions: [],
    currentQuestionId: null,
    selectedOption: null,
    flaggedQuestions: new Set(),
    answeredQuestions: new Set(),
    showResults: false,
    results: {},
    totalQuestions: 0,
    submittingAnswer: false,
    navigationHistory: [],
    assessmentStartTime: null,
    timeRemaining: null,
};

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        initializeAssessment: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
            state.totalQuestions = action.payload.length;
            state.currentQuestionId = action.payload[0]?.id || null;
            state.assessmentStartTime = Date.now();
            state.timeRemaining = ASSESSMENT_CONFIG.DEFAULT_TIME_LIMIT;
            state.navigationHistory = [];

            // Initialize results for all questions
            action.payload.forEach(question => {
                state.results[question.id] = {
                    passed: null,
                    selected: null,
                    correct: null,
                };
            });
        },

        selectOption: (state, action: PayloadAction<string>) => {
            if (!state.currentQuestionId) return;

            state.selectedOption = action.payload;
            state.answeredQuestions.add(state.currentQuestionId);

            // Update result with selection
            if (state.results[state.currentQuestionId]) {
                state.results[state.currentQuestionId].selected = action.payload;
            }
        },

        navigateToQuestion: (state, action: PayloadAction<string>) => {
            const targetQuestionId = action.payload;

            if (state.currentQuestionId) {
                state.navigationHistory.push(state.currentQuestionId);
            }

            state.currentQuestionId = targetQuestionId;
            state.selectedOption = state.results[targetQuestionId]?.selected || null;
        },

        navigateQuestion: (state, action: PayloadAction<NavigationDirection>) => {
            const currentIndex = state.questions.findIndex(
                q => q.id === state.currentQuestionId
            );

            let nextIndex: number;
            if (action.payload === 'next') {
                nextIndex = Math.min(currentIndex + 1, state.totalQuestions - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }

            if (nextIndex !== currentIndex) {
                const nextQuestionId = state.questions[nextIndex]?.id;
                if (nextQuestionId) {
                    assessmentSlice.caseReducers.navigateToQuestion(state, {
                        type: 'navigateToQuestion',
                        payload: nextQuestionId,
                    });
                }
            }
        },

        toggleQuestionFlag: (state, action: PayloadAction<string | undefined>) => {
            const questionId = action.payload || state.currentQuestionId;
            if (!questionId) return;

            if (state.flaggedQuestions.has(questionId)) {
                state.flaggedQuestions.delete(questionId);
            } else {
                state.flaggedQuestions.add(questionId);
            }
        },

        updateAttemptResult: (state, action: PayloadAction<QuestionAttemptsResponse>) => {
            Object.entries(action.payload).forEach(([questionId, attempt]) => {
                state.results[questionId] = {
                    ...state.results[questionId],
                    passed: attempt.is_correct,
                    selected: attempt.question_metadata.selected_option_ids[0],
                    attempt,
                    correct: attempt.is_correct
                        ? attempt.question_metadata.selected_option_ids[0]
                        : state.results[questionId]?.correct || null,
                };

                state.answeredQuestions.add(questionId);
            });

            state.submittingAnswer = false;
        },

        setSubmittingState: (state, action: PayloadAction<boolean>) => {
            state.submittingAnswer = action.payload;
        },

        toggleResultsView: (state) => {
            state.showResults = !state.showResults;
        },

        updateTimeRemaining: (state, action: PayloadAction<number>) => {
            state.timeRemaining = Math.max(0, action.payload);
        },

        resetAssessment: () => initialState,
    },
});

export const {
    initializeAssessment,
    selectOption,
    navigateToQuestion,
    navigateQuestion,
    toggleQuestionFlag,
    updateAttemptResult,
    setSubmittingState,
    toggleResultsView,
    updateTimeRemaining,
    resetAssessment,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;