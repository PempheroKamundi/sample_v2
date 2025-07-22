import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';
import {ErrorMessage} from "@features/Assessment/components/ErrorMessage/ErrorMessage";
import {useAssessment} from "@features/Assessment/hooks/useAssessment";
import {useQuestionAttempts} from "@features/Assessment/hooks/useQuestionAttempts";
import {LoadingSpinner} from "@features/Assessment/components/LoadingSpinner/LoadingSpinner";
import {AssessmentHeader} from "@features/Assessment/components/AssessmentHeader/AssessmentHeader";
import {ResultsOverview} from "@features/Assessment/components/ResultsOverview/ResultsOverview";

import {QuestionPills} from "@features/Assessment/components/QuestionPills/QuestionPills";
import {ProgressSection} from "@features/Assessment/components/ProgressSection/ProgressSection";
import {QuestionCard} from "@features/Assessment/components/QuestionCard/QuestionCard";
import {NavigationControls} from "@features/Assessment/components/NavigationControls/NavigationControls";
import {selectShowResults} from "@features/Assessment/store/assessment.selector";

const Assessment: React.FC = () => {
    const { objectiveId } = useParams<{ objectiveId: string }>();
    const showResults = useAppSelector(selectShowResults);

    // Validate required parameter
    if (!objectiveId) {
        return (
            <ErrorMessage
                title="Invalid Assessment"
                message="No objective ID provided. Please check your URL and try again."
                showReturnButton
            />
        );
    }

    const assessment = useAssessment(objectiveId);
    const attempts = useQuestionAttempts(objectiveId);

    // Loading state
    if (assessment.isLoading || attempts.isLoading) {
        return (
            <LoadingSpinner
                title="Loading Assessment"
                message="Please wait while we prepare your questions..."
            />
        );
    }

    // Error states
    if (assessment.error) {
        return (
            <ErrorMessage
                title="Failed to Load Assessment"
                message="We couldn't load your assessment questions."
                error={assessment.error}
                onRetry={assessment.retry}
            />
        );
    }

    if (attempts.error) {
        return (
            <ErrorMessage
                title="Failed to Load Previous Attempts"
                message="We couldn't load your previous attempts."
                error={attempts.error}
                onRetry={attempts.retry}
            />
        );
    }

    // No data state
    if (!assessment.hasData) {
        return (
            <ErrorMessage
                title="No Questions Available"
                message="This assessment doesn't have any questions available."
                showReturnButton
            />
        );
    }

    return (
<>
    <div className="flex flex-col items-center w-full mt-4 max-w-4xl mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-50 font-opensans relative">
        <AssessmentHeader />
        <ProgressSection />

        {showResults && <ResultsOverview />}

        <div className={`w-full ${showResults ? 'opacity-20 pointer-events-none' : ''}`}>
            <QuestionCard />
            <NavigationControls objectiveId={objectiveId} />
            <QuestionPills />
        </div>
    </div>

</>

    );
};

export default Assessment;