import { singleValuePayload, aliasedSingleValuePayload, noPayload } from '../actions';

export const GET_M3U = 'GET_M3U';
export const _get_m3u = aliasedSingleValuePayload(GET_M3U);

export const SET_M3U = 'SET_M3U';
export const _set_m3u = aliasedSingleValuePayload(SET_M3U);

export const SET_PENDING_M3U = 'SET_PENDING_M3U';
export const _set_pending_m3u = aliasedSingleValuePayload(SET_PENDING_M3U);

export const SET_PENDING_M3U_PROGRESS = 'SET_PENDING_M3U_PROGRESS';
export const _set_pending_m3u_progress = aliasedSingleValuePayload(SET_PENDING_M3U_PROGRESS);

export const UPLOAD_M3U = 'UPLOAD_M3U';
export const _upload_m3u = aliasedSingleValuePayload(UPLOAD_M3U);

export const SET_UPLOAD = 'SET_UPLOAD';
export const _set_upload = aliasedSingleValuePayload(SET_UPLOAD);