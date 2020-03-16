import { 
    singleValuePayload, 
    aliasedSingleValuePayload,
    statusPayload
} from '../actions';

export const GET_M3U = 'GET_M3U';
export const _get_m3u = aliasedSingleValuePayload(GET_M3U);

export const SET_M3U = 'SET_M3U';
export const _set_m3u = aliasedSingleValuePayload(SET_M3U);

export const SET_PENDING_M3U = 'SET_PENDING_M3U';
export const _set_pending_m3u = singleValuePayload(SET_PENDING_M3U);

export const SET_PENDING_M3U_PROGRESS = 'SET_PENDING_M3U_PROGRESS';
export const _set_pending_m3u_progress = aliasedSingleValuePayload(SET_PENDING_M3U_PROGRESS);

export const SET_PENDING_M3U_STATUS = 'SET_PENDING_M3U_STATUS';
export const _set_pending_m3u_status = statusPayload(SET_PENDING_M3U_STATUS);

export const UPLOAD_M3U = 'UPLOAD_M3U';
export const _upload_m3u = singleValuePayload(UPLOAD_M3U);

export const SET_UPLOAD = 'SET_UPLOAD';
export const _set_upload = aliasedSingleValuePayload(SET_UPLOAD);