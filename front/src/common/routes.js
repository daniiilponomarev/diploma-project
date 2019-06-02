import { CONTEXT } from './constants';

const routes = {
  base: `${CONTEXT}/`,
  general: `${CONTEXT}/general`,
  login: `${CONTEXT}/login`,
  request: `${CONTEXT}/request`,
  container: `${CONTEXT}/container1`,
  container2: `${CONTEXT}/container2`,
  smth: (id = `:id`) => `${CONTEXT}/smth/${id}`,
};

export { routes };
