import {
    SET_EPG,
} from '../../shared/actionCreators/epg';

const initialState = [];

export default function epgs(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_EPG: {
            const epgs = [ ...state ].push(payload.value);
            return epgs;
        }
        default:
            return state;
    }
}
