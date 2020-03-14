import { createAliasedAction } from 'electron-redux';

export const aliasedSingleValuePayload = type => createAliasedAction(
    type,
    value => ({
        type,
        payload: {
            value,
        }
    })
);

export const singleValuePayload = type => {
    return value => ({
      type,
      payload: {
        value,
      },
    });
  }

export const noPayload = type => () => ({type});