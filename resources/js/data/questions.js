import {appearance} from './questions/appearance';
import {comparison} from './questions/comparison';
import {memory} from './questions/memory';
import {hypothetical} from './questions/hypothetical';
import {emotion} from './questions/emotion';
import {ultimate} from './questions/ultimate';

export const questions = [
    ...appearance,
    ...comparison,
    ...memory,
    ...hypothetical,
    ...emotion,
    ...ultimate,
];
