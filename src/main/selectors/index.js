import { createSelector } from 'reselect';

const _getM3Us = state => state.m3us;

export const getPendingM3U = createSelector(_getM3Us, m3u => m3u.pending);
export const getPendingM3UProgress = createSelector(getPendingM3U, pendingM3U => pendingM3U.progress);