import { Question } from '@core/models'
import { Results } from '@core/services'

export interface AssessmentState {
    questions: Question[]
    currentQuestionId: string | null
    selectedOption: string | null
    flaggedQuestions: string[]
    answeredQuestions: string[]
    showResults: boolean
    results: Results
    totalQuestions: number
    submittingAnswer: boolean
}
