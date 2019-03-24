// import { stringify } from 'query-string'
import { map, forEachObjIndexed } from 'ramda'

import { BACKEND_URL } from '../common'

// const enhancedStringify = params =>
//   stringify(
//     map(value => {
//       if (Array.isArray(value) && value.length > 0) {
//         return value.join(',')
//       }
//
//       return value
//     }, params),
//   )

const cache = new Map()

export const buildGetJson = (prefix = '') => (url, params) => {
  console.log(process.env)
  let adjustedUrl = url // params ? `${url}?${enhancedStringify(params)}` : url
  adjustedUrl = `${prefix}${adjustedUrl}`

  if (cache.has(adjustedUrl)) {
    return cache.get(adjustedUrl)
  }

  console.log('adjustedUrl111', adjustedUrl);
  const promise = fetch(adjustedUrl, {
    headers: new Headers({ 'content-type': 'application/json' }),
    credentials: 'no-cors',
    // credentials: 'same-origin',
  }).then(res => {
    console.log('res', res);
    if (res.status !== 200) {
      cache.delete(adjustedUrl)
    }
    return res.json().then(json => {
      return json
    })
  })

  cache.set(adjustedUrl, promise)

  return promise
}

export const buildPostMultipart = (prefix = '') =>
  function postData(url, params, files) {
    const adjustedUrl = `${prefix}${url}`
    const formData = new FormData()

    forEachObjIndexed(
      (value, key) => formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value),
      params,
    )

    files.forEach((item, index) => {
      formData.append(item.name, item)
    })

    return fetch(adjustedUrl, {
      method: 'POST',
      headers: new Headers({ Accept: 'application/json, text/plain, */*' }),
      credentials: 'same-origin',
      body: formData,
    }).then(response => {
      if (response.status === 401) {
        return postData(url, params, files)
      }

      if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`)
      } else {
        return response.json()
      }
    })
  }

export const getApiJson = buildGetJson(BACKEND_URL)
export const postApiMultipart = buildPostMultipart(BACKEND_URL)

export const getCustomer = id => getApiJson(`/customers/get?id=${id}`)

export const getSmth = id => getApiJson(`/smth/${id}`)

export const getSmth2 = () => {
  return getApiJson('/smth').then(response => {
    return response.map(smth => {
      return {
        id: smth.id,
        value: smth.value,
      }
    })
  })
}

export const postSmth = (smth, files) => postApiMultipart('/smth', smth, files)
