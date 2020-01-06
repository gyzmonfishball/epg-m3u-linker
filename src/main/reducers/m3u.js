import {
    SET_M3U, SET_UPLOAD,
} from '../../shared/actionCreators/m3u';

const initialState = {
    processed: []
};

export default function m3us(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_M3U: {
            const processed = [ ...state.processed ].push(payload.value);
            return { ...state, processed };
        }
        case SET_UPLOAD: {
            return { ...state, upload: payload.value };
        }
        default:
            return state;
    }
}
