import { useFetchAssessmentQuestionsQuery } from '@core/services'
import { useEffect } from 'react'
import { useAppDispatch } from '@app/hooks'
import { setQuestions } from '@features/Assessment/store/assessment.slice'
interface AssessmentProps {
    objectiveId: string
}

const useAssessmentQuestions = ({ objectiveId }: AssessmentProps) => {
    const dispatch = useAppDispatch()

    const {
        data,
        error: questionsError,
        isLoading: questionsLoading,
    } = useFetchAssessmentQuestionsQuery(
        { objectiveId },
        { skip: !objectiveId }
    )

    useEffect(() => {
        if (data?.questions) {
            dispatch(setQuestions(data.questions))
        }
    }, [data, dispatch])

    return {
        questionsError,
        questionsLoading,
    }
}

export default useAssessmentQuestions
