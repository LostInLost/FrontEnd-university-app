import { AuthOptions } from '@/app/api/auth/[...nextauth]/AuthOptions';
import { getServerSession } from 'next-auth';
import React from 'react';
import TableCities from './table-cities';
import Link from 'next/link';

export default async function CitiesPage() {
  const session = await getServerSession(AuthOptions);
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex gap-2">
        <li className="flex ">
          <Link href={'/dashboard'}>
            <span>Home</span>
          </Link>
        </li>
        <span> / </span>{' '}
        <li className="flex">
          <span>Cities</span>
        </li>
        <span> / </span>{' '}
        <li className="flex">
          <span>List</span>
        </li>
      </ul>
      <h3 className="text-xl font-semibold">All Cities </h3>
      <TableCities session={session} />
    </div>
  );
}
