import {
    SET_MATCH,
} from '../../shared/actionCreators/match';

const initialState = [];

export default function matches(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MATCH: {
            const matches = [ ...state ].push(payload.value);
            return matches;
        }
        default:
            return state;
    }
}
