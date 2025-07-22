import { useEffect } from 'react'
import { useSubmitQuestionAttemptMutation } from '@core/services'
import { useAppDispatch } from '@app/hooks'
import { updateAttemptsData } from '@features/Assessment/store/assessment.slice'

const useSubmitAttempt = () => {
    const dispatch = useAppDispatch()

    const [submitQuestionAttempt, { isLoading, data }] =
        useSubmitQuestionAttemptMutation()
    useEffect(() => {
        if (data) {
            dispatch(updateAttemptsData(data))
        }
    }, [data, dispatch])

    return { submitQuestionAttempt, isLoading }
}

export default useSubmitAttempt
