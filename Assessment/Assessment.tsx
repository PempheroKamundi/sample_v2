import React from 'react'
import AssessmentHeader from './components/AssessmentHeader/AssessmentHeader'
import ProgressBar from './components/ProgressBar/ProgressBar'
import ResultsOverview from './components/ResultsOverview/ResultsOverview'
import QuestionCard from './components/QuestionCard/QuestionCard'
import QuestionPills from './components/QuestionPills/QuestionPills'
import NavigationControls from './components/NavigationControls/NavigationControls'
import Timer from './components/Timer/Timer'
import { useParams } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import ErrorBlock from './components/ErrorBlock/ErrorBlock'
import useAssessmentQuestions from './hooks/useAssessment'
import useQuestionAttempts from './hooks/useQuestionAttempts'

const Assessment: React.FC = () => {
    const { objectiveId } = useParams()

    if (!objectiveId) {
        return null
    }

    const { questionsLoading, questionsError } = useAssessmentQuestions({
        objectiveId,
    })

    const { attemptsLoading, attemptsError } = useQuestionAttempts({
        objectiveId,
    })

    const isFetching = questionsLoading || attemptsLoading

    if (isFetching) {
        return (
            <div className="flex flex-col items-center justify-center w-full mt-4 max-w-4xl mx-auto p-6 border border-gray rounded-lg shadow-lg bg-gray-50 font-opensans h-96">
                <RingLoader
                    color={'#0f95f1'}
                    loading={true}
                    size={64} // matches your h-16 w-16
                    aria-label="Loading Assessment"
                />
                <h2 className="text-xl font-semibold text-gray-700 mb-2 font-mier">
                    Loading Assessment
                </h2>
                <p className="text-gray-500 font-opensans">
                    Please wait while we prepare your questions...
                </p>
            </div>
        )
    }

    if (questionsError) {
        return (
            <ErrorBlock
                title="Error Loading Assessment"
                description="We encountered a problem while loading your questions:"
            />
        )
    }
    if (attemptsError) {
        return (
            <ErrorBlock
                title="Error Loading Previous Attempts"
                description="We encountered a problem while loading your previous quiz attempts:"
            />
        )
    }

    return (
        <div className="flex flex-col items-center w-full mt-4 max-w-4xl mx-auto p-6 border border-gray rounded-lg shadow-lg bg-gray-50 font-opensans">
            <AssessmentHeader />

            <div className="w-full flex justify-between mb-4 gap-4 flex-wrap">
                <ProgressBar>
                    <Timer />
                </ProgressBar>
            </div>

            <ResultsOverview />

            <QuestionCard />

            <NavigationControls objectiveId={objectiveId} />

            <QuestionPills />
        </div>
    )
}

export default Assessment
