'use client';
import DataTable from '@/components/Generator/DataTableNextUI';
import { DeleteIcon } from '@/components/icons/table/delete-icon';
import { EditIcon } from '@/components/icons/table/edit-icon';
import { EyeIcon } from '@/components/icons/table/eye-icon';
import { fetcher } from '@/lib/Fetcher';
import { Tooltip } from '@nextui-org/react';
import React from 'react';
import useSWR from 'swr';
import AddStudent from './students-add';
import DeleteStudent from './students-delete';
import EditStudent from './students-edit';
import DetailStudent from './students-detail';

export default function StudentsTable({ session }: { session: any }) {
  const { data, mutate } = useSWR(['/api/admin/dashboard/students', session?.user], fetcher);

  const cityData = data?.students.map((student: any, i: number) => {
    return {
      key: i + 1,
      no: i + 1,
      nim: student.nim,
      name: student.name,
      born_date: student.born_date,
      university: student.university,
      action: (
        <div className="flex items-center gap-4 ">
          <div>
            <DetailStudent student={student} />
          </div>
          <div>
            <EditStudent session={session} mutate={mutate} student={student} />
          </div>
          <div>
            <DeleteStudent session={session} mutate={mutate} id={student.id} name={student.name} />
          </div>
        </div>
      ),
    };
  });

  return (
    <DataTable columns={['NIM', 'Born Date', 'Name', 'University', 'Action']} data={cityData} isSearchable searchFilterColumn={['name', 'university']} isLoading={!data} extraContent={<AddStudent session={session} mutate={mutate} />} />
  );
}
