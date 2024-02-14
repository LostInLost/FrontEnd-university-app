import { getServerSession } from 'next-auth';
import React from 'react';
import { AuthOptions } from '../api/auth/[...nextauth]/AuthOptions';

export default async function Page() {
  const session = await getServerSession(AuthOptions);
  const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/api/admin/dashboard/cities', {
    method: 'GET',
    headers: {
      Authorization: session?.user.token_type + ' ' + session?.user.token_api,
    },
    cache: 'no-store',
  });
  // console.log(session);
  const city = await res.json();
  return <div>{city.cities && city?.cities.map((data: any) => <div>{data.name}</div>)}</div>;
}
