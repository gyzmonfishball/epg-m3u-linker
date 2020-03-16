import {
    SET_M3U, SET_UPLOAD, SET_PENDING_M3U, SET_PENDING_M3U_PROGRESS
} from '../../shared/actionCreators/m3u';
import { M3UPROPMAP } from '../utils/constants';

const initialState = {
    processed: [],
    pending: {
        fields: Object.keys(M3UPROPMAP).map(key => key)
    }
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
        case SET_PENDING_M3U: {
            return { ...state, pending: {...state.pending, channels: payload.value} };
        }
        case SET_PENDING_M3U_PROGRESS: {
            return { ...state, pending: {...state.pending, progress: payload.value} };
        }
        default:
            return state;
    }
}
