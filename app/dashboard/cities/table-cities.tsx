'use client';
import DataTable from '@/components/Generator/DataTableNextUI';
import { DeleteIcon } from '@/components/icons/table/delete-icon';
import { EditIcon } from '@/components/icons/table/edit-icon';
import { EyeIcon } from '@/components/icons/table/eye-icon';
import { fetcher } from '@/lib/Fetcher';
import { Tooltip } from '@nextui-org/react';
import React from 'react';
import useSWR from 'swr';
import AddCity from './add-cities';
import DeleteCity from './delete-cities';
import EditCities from './edit-cities';

export default function TableCities({ session }: { session: any }) {
  const { data, mutate } = useSWR(['/api/admin/dashboard/cities', session?.user], fetcher);
  const cityData = data?.cities.map((city: any, i: number) => {
    return {
      key: i + 1,
      no: i + 1,
      name: city.name,
      action: (
        <div className="flex items-center gap-4 ">
          <div>
            <EditCities session={session} mutate={mutate} id={city.id} name={city.name} />
          </div>
          <div>
            <DeleteCity session={session} mutate={mutate} id={city.id} name={city.name} />
          </div>
        </div>
      ),
    };
  });

  return <DataTable columns={['Name', 'Action']} data={cityData} isSearchable searchFilterColumn={['name']} isLoading={!data} extraContent={<AddCity session={session} mutate={mutate} />} />;
}
