import { createAliasedAction } from 'electron-redux';

export const singleValuePayload = type => createAliasedAction(
    type,
    value => ({
        type,
        payload: {
            value,
        }
    })
);