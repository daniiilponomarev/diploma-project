import { stringify } from 'query-string';
import { map, forEachObjIndexed, isEmpty, reject } from 'ramda';

import { BACKEND_URL } from '../common';

// common api
const enhancedStringify = params =>
  stringify(
    map(value => {
      if (Array.isArray(value) && value.length > 0) {
        return value.join(',');
      }

      return value;
    }, reject(isEmpty, params)),
  );

const cache = new Map();

export const buildGetJson = (prefix = '') => (url, params) => {
  console.log(BACKEND_URL);
  console.log(process.env, url, params);
  let adjustedUrl = params ? `${url}?${enhancedStringify(params)}` : url;
  adjustedUrl = `${prefix}${adjustedUrl}`;

  if (cache.has(adjustedUrl)) {
    console.log('cache', cache.get(adjustedUrl));
    return cache.get(adjustedUrl);
  }
  // adjustedUrl='https://private-amnesiac-3016b-daniilponomarev.apiary-proxy.com/questions'
  // adjustedUrl='https://polls.apiblueprint.org/questions'
  // adjustedUrl = 'http://localhost:9998/diploma-backend/customers/get';

  console.log('adjustedUrl', adjustedUrl);
  const promise = fetch(adjustedUrl, {
    headers: new Headers({
      // 'content-type': 'application/json',
    }),
    // credentials: 'no-cors',
    // credentials: 'same-origin',
  }).then(res => {
    console.log('res', res);
    if (res.status !== 200) {
      cache.delete(adjustedUrl);
    }
    return res.json().then(json => {
      console.log('json', json);
      return json;
    });
  });

  cache.set(adjustedUrl, promise);

  return promise;
};

export const buildPostMultipart = (prefix = '') =>
  function postData(url, params, files) {
    const adjustedUrl = `${prefix}${url}`;
    const formData = new FormData();

    forEachObjIndexed(
      (value, key) => formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value),
      params,
    );

    files.forEach((item, index) => {
      formData.append(item.name, item);
    });

    return fetch(adjustedUrl, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json, text/plain, */*' }),
      credentials: 'same-origin',
      body: formData,
    }).then(response => {
      if (response.status === 401) {
        return postData(url, params, files);
      }

      if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
      } else {
        return response.json();
      }
    });
  };

export const getApiJson = buildGetJson(BACKEND_URL);
export const postApiMultipart = buildPostMultipart(BACKEND_URL);

// specific api
export const getCustomers = id => getApiJson(`/customers/get`, id);

export const getSmth = id => getApiJson(`/smth/${id}`);

export const getSmth2 = () => {
  return getApiJson('/smth').then(response => {
    return response.map(smth => {
      return {
        id: smth.id,
        value: smth.value,
      };
    });
  });
};

export const postCustomers = (smth, files) => postApiMultipart('/smth', smth, files);

export const postSmth = (smth, files) => postApiMultipart('/smth', smth, files);
