const LOAD_ALL_QUESTIONS = "questions/LOAD_ALL_QUESTIONS"
const LOAD_ONE_QUESTION = "questions/LOAD_ONE_QUESTION"

export const loadAllQuestions = (questions) => ({
    type: LOAD_ALL_QUESTIONS,
    questions
})

export const loadOneQuestion = (question) => ({
    type: LOAD_ONE_QUESTION,
    question
})

export const fetchQuestions = () => async (dispatch) => {
    const res = await fetch('/api/questions');

    if (res.ok) {
        const questions = await res.json();
        dispatch(loadAllQuestions(questions));
        return questions;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const fetchOneQuestion = (questionId) => async (dispatch) => {
    const res = await fetch(`/api/questions/${questionId}`);

    if (res.ok) {
        const question = await res.json();
        dispatch(loadOneQuestion(question));
        return question;
    } else {
        const errors = await res.json();
        return errors;
    }
}

const questionsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_QUESTIONS: {
            const questionsState = { ...state };
            action.questions.Questions.forEach(question => {
                questionsState[question.id] = question;
            });

            console.log("Q-REUDCER", action)
            // const question = action.questions;
            // questionsState[question.id] = question;

            return questionsState;
        }

        case LOAD_ONE_QUESTION: {
            return { ...state, [action.question.id]: action.question }
        }

        default:
            return { ...state }
    }
}

export default questionsReducer
