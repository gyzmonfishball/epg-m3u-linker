import configureStore from '../shared/store/configureStore';

let store;

export async function initStore() {
  store = configureStore(global.state);

  store.subscribe(async () => {
    global.state = store.getState();
  });
}

export const getStore = () => store;
