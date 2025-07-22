import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@app/store';
import { QuestionStatus } from './types';

// Base selectors


export const selectAssessmentState = (state: RootState) => state.assessment;

export const selectShowResults = createSelector(
    selectAssessmentState,
    (state) => state.showResults
);
export const selectQuestions = createSelector(
    selectAssessmentState,
    (state) => state.questions
);
export const selectCurrentQuestionId = createSelector(
    selectAssessmentState,
    (state) => state.currentQuestionId
);
export const selectResults = createSelector(
    selectAssessmentState,
    (state) => state.results
);

// Derived selectors
export const selectCurrentQuestion = createSelector(
    [selectQuestions, selectCurrentQuestionId],
    (questions, currentId) =>
        currentId ? questions.find(q => q.id === currentId) || null : null
);

export const selectCurrentQuestionIndex = createSelector(
    [selectQuestions, selectCurrentQuestionId],
    (questions, currentId) =>
        currentId ? questions.findIndex(q => q.id === currentId) : -1
);

export const selectCanNavigateNext = createSelector(
    [selectCurrentQuestionIndex, selectQuestions],
    (currentIndex, questions) =>
        currentIndex >= 0 && currentIndex < questions.length - 1
);

export const selectCanNavigatePrev = createSelector(
    selectCurrentQuestionIndex,
    (currentIndex) => currentIndex > 0
);

export const selectQuestionStatus = createSelector(
    [selectResults, selectAssessmentState],
    (results, state) => (questionId: string): QuestionStatus => {
        if (state.flaggedQuestions.has(questionId)) return 'flagged';

        const result = results[questionId];
        if (!result || result.passed === null) return 'unanswered';
        if (result.passed === true) return 'correct';
        if (result.passed === false) return 'incorrect';
        return 'answered';
    }
);

export const selectAssessmentProgress = createSelector(
    [selectResults, selectQuestions],
    (results, questions) => {
        const totalQuestions = questions.length;
        const answeredQuestions = Object.values(results)
            .filter(result => result.passed !== null).length;
        const correctAnswers = Object.values(results)
            .filter(result => result.passed === true).length;

        return {
            totalQuestions,
            answeredQuestions,
            correctAnswers,
            progressPercentage: totalQuestions > 0
                ? Math.round((answeredQuestions / totalQuestions) * 100)
                : 0,
            scorePercentage: totalQuestions > 0
                ? Math.round((correctAnswers / totalQuestions) * 100)
                : 0,
        };
    }
);

export const selectCurrentQuestionResult = createSelector(
    [selectResults, selectCurrentQuestionId],
    (results, currentId) => currentId ? results[currentId] || null : null
);

export const selectIsAssessmentComplete = createSelector(
    selectAssessmentProgress,
    (progress) => progress.answeredQuestions === progress.totalQuestions && progress.totalQuestions > 0
);