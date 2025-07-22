import {
    CourseSearchResult,
    SubTopicSearchResult,
    TopicSearchResult,
    LearningObjectiveSearchResult,
} from '@core/models'

export type SearchItem =
    | TopicSearchResult
    | SubTopicSearchResult
    | LearningObjectiveSearchResult
    | CourseSearchResult
