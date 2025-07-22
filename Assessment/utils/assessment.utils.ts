import {ASSESSMENT_CONFIG, QuestionStatus} from "@features/Assessment/store/types";
import {QuestionResult} from "@core/models";


export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getQuestionStatusColor = (status: QuestionStatus): string => {
    switch (status) {
        case 'correct':
            return 'bg-green-100 border-green-500 text-green-700';
        case 'incorrect':
            return 'bg-red-100 border-red-500 text-red-700';
        case 'flagged':
            return 'bg-yellow-100 border-yellow-500 text-yellow-700';
        case 'answered':
            return 'bg-blue-100 border-blue-500 text-blue-700';
        default:
            return 'bg-gray-100 border-gray-300 text-gray-700';
    }
};

export const calculateAssessmentScore = (results: Record<string, QuestionResult>): {
    score: number;
    percentage: number;
    totalQuestions: number;
} => {
    const questions = Object.values(results);
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(result => result.passed === true).length;

    return {
        score: correctAnswers,
        percentage: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
        totalQuestions,
    };
};

export const getAttemptsRemaining = (result: QuestionResult | null): number => {
    if (!result?.attempt) return ASSESSMENT_CONFIG.MAX_ATTEMPTS;
    return result.attempt.attempts_remaining;
};

export const canRetryQuestion = (result: QuestionResult | null): boolean => {
    return getAttemptsRemaining(result) > 0 && result?.passed !== true;
};