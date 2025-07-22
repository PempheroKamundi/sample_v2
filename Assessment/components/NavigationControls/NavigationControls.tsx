import React from 'react';
import { useAppSelector } from '@app/hooks';
import {selectAssessmentProgress, selectCurrentQuestionResult} from "@features/Assessment/store/assessment.selector";
import {ActionButtons} from "./components/ActionButtons"
import {NavigationButtons} from "./components/NavigationButtons";


interface NavigationControlsProps {
    objectiveId: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({ objectiveId }) => {
    const currentResult = useAppSelector(selectCurrentQuestionResult);
    const progress = useAppSelector(selectAssessmentProgress);

    const isAssessmentComplete = progress.answeredQuestions === progress.totalQuestions && progress.totalQuestions > 0;

    return (
        <div className="w-full flex justify-between items-center mb-4 gap-4">
            <NavigationButtons />
            <ActionButtons
                objectiveId={objectiveId}
                currentResult={currentResult}
                isAssessmentComplete={isAssessmentComplete}
            />
        </div>
    );
};