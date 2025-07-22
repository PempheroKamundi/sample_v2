import {
    CourseSearchResult,
    SubTopicSearchResult,
    TopicSearchResult,
    LearningObjectiveSearchResult, Question,
} from '@core/models'
import {Results} from "@core/services";

export type SearchItem =
    | TopicSearchResult
    | SubTopicSearchResult
    | LearningObjectiveSearchResult
    | CourseSearchResult


export interface AssessmentState {
    questions: Question[];
    currentQuestionId: string | null;
    selectedOption: string | null;
    flaggedQuestions: Set<string>;
    answeredQuestions: Set<string>;
    showResults: boolean;
    results: Results;
    totalQuestions: number;
    submittingAnswer: boolean;
    navigationHistory: string[];
    assessmentStartTime: number | null;
    timeRemaining: number | null;
}

// UI State Types
export type QuestionStatus = 'unanswered' | 'answered' | 'correct' | 'incorrect' | 'flagged';
export type NavigationDirection = 'next' | 'prev';
export type AssessmentView = 'question' | 'results' | 'summary';


export const ASSESSMENT_CONFIG = {
    MAX_ATTEMPTS: 3,
    DEFAULT_TIME_LIMIT: 15 * 60, // 15 minutes in seconds
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    FEEDBACK_DISPLAY_DURATION: 3000, // 3 seconds
} as const;

export const ASSESSMENT_COLORS = {
    PRIMARY: '#1095F1',
    SUCCESS: '#10B981',
    ERROR: '#EF4444',
    WARNING: '#F59E0B',
    NEUTRAL: '#6B7280',
} as const;