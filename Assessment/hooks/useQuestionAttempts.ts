import { useEffect } from 'react'
import { useFetchQuestionAttemptsQuery } from '@core/services'
import { updateAttemptsData } from '@features/Assessment/store/assessment.slice'
import { useAppDispatch } from '@app/hooks'

interface AttemptsProps {
    objectiveId: string
}

const useQuestionAttempts = ({ objectiveId }: AttemptsProps) => {
    const dispatch = useAppDispatch()

    const {
        data,
        error: attemptsError,
        isLoading: attemptsLoading,
    } = useFetchQuestionAttemptsQuery({ objectiveId }, { skip: !objectiveId })
    useEffect(() => {
        if (data) {
            dispatch(updateAttemptsData(data))
        }
    }, [data, dispatch])

    return {
        attemptsError,
        attemptsLoading,
    }
}

export default useQuestionAttempts
