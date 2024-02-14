
export const fetcher = ([url, token]: any) =>
  fetch(process.env.NEXT_PUBLIC_URL_API + url, {
    headers: {
      'Content-type': 'application/json',
      Authorization: token.token_type + ' ' + token.token_api,
    },
  }).then((res) => res.json());

