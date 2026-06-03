import {questions} from 'data/questions';
import {mockResponse} from 'apis/base';

export const getQuestionList = () => mockResponse(questions);

export const getQuestionById = (id) => mockResponse(questions.find((q) => q.id === id));
