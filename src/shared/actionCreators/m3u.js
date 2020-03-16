import { 
    singleValuePayload, 
    localSingleValuePayload,
    aliasedSingleValuePayload,
    localStatusPayload
} from '../actions';

export const GET_M3U = 'GET_M3U';
export const _get_m3u = singleValuePayload(GET_M3U);

export const SET_M3U = 'SET_M3U';
export const _set_m3u = singleValuePayload(SET_M3U);

export const SET_PENDING_M3U = 'SET_PENDING_M3U';
export const _set_pending_m3u = localSingleValuePayload(SET_PENDING_M3U);

export const SET_PENDING_M3U_PROGRESS = 'SET_PENDING_M3U_PROGRESS';
export const _set_pending_m3u_progress = singleValuePayload(SET_PENDING_M3U_PROGRESS);

export const SET_PENDING_M3U_STATUS = 'SET_PENDING_M3U_STATUS';
export const _set_pending_m3u_status = localStatusPayload(SET_PENDING_M3U_STATUS);

export const UPLOAD_M3U = 'UPLOAD_M3U';
export const _upload_m3u = singleValuePayload(UPLOAD_M3U);

export const SET_UPLOAD = 'SET_UPLOAD';
export const _set_upload = singleValuePayload(SET_UPLOAD);