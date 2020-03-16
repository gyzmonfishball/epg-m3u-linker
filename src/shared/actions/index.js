import { createAliasedAction } from 'electron-redux';

export const localSingleValuePayload = type => value => ({
  type,
  payload: {
    value,
  },
  meta: {
    scope: 'local',
  }
});

export const singleValuePayload = type => value => ({
  type,
  payload: {
    value,
  }
})

export const aliasedSingleValuePayload = type => createAliasedAction(
  type,
  value => ({
      type,
      payload: {
          value,
      }
  })
);

export const noPayload = type => () => ({type});

export const aliasedStatusPayload = type => createAliasedAction(
  type,
  ({status, message, description}) => ({
    type,
    payload: {
      status,
      message,
      description
    }
  })
);

export const localStatusPayload = type => ({status, message, description}) => ({
  type,
  payload: {
    status,
    message,
    description
  },
  meta: {
    scope: 'local',
  }
})