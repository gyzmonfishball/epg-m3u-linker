import { singleValuePayload } from '../actions';

export const GET_M3U = 'GET_M3U';
export const _get_m3u = singleValuePayload(GET_M3U);

export const SET_M3U = 'SET_M3U';
export const _set_m3u = singleValuePayload(SET_M3U);

export const UPLOAD_M3U = 'UPLOAD_M3U';
export const _upload_m3u = singleValuePayload(UPLOAD_M3U);

export const SET_UPLOAD = 'SET_UPLOAD';
export const _set_upload = singleValuePayload(SET_UPLOAD);