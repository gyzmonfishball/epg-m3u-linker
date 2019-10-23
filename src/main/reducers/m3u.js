import {
    SET_M3U,
} from '../../shared/actionCreators/m3u';

const initialState = [];

export default function m3us(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_M3U: {
            const m3us = [ ...state ].push(payload.value);
            return m3us;
        }
        default:
            return state;
    }
}
