import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip, Tooltip, SelectItem, Select, Textarea } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@/lib/Promise';
import { EditIcon } from '@/components/icons/table/edit-icon';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

interface City {
  session: any;
  mutate: any;
  student?: any;
}
export default function EditStudent({ session, mutate, student }: City) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { data } = useSWR([`/api/admin/dashboard/cities`, session?.user], fetcher);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg('');
    const formData = new FormData(e.currentTarget);

    await delay(1000);

    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/api/admin/dashboard/students/' + student.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session?.user?.token_type + ' ' + session?.user?.token_api,
      },
      body: JSON.stringify({
        nim: formData.get('nim') ?? '',
        name: formData.get('name') ?? '',
        born_date: formData.get('born_date') ?? '',
        gender: formData.get('gender') ?? '',
        city_id: formData.get('city_id') ?? '',
        university: formData.get('university') ?? '',
        address: formData.get('address') ?? '',
      }),
    });
    setIsLoading(false);
    setErrMsg('');
    if (!res.ok && res.status !== 200) {
      const result = await res.json();
      return setErrMsg(result?.message);
    }
    mutate();
    return onOpenChange();
  };

  return (
    <>
      <Tooltip content="Edit Student" color="secondary">
        <button onClick={onOpen}>
          <EditIcon size={20} fill="#979797" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action="" method="post" onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Edit Student</ModalHeader>
                <ModalBody>
                  {errMsg && <Chip color="danger">{errMsg}</Chip>}
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="text" name="nim" label={'NIM'} defaultValue={student.nim} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Input type="text" name="name" label={'Name'} defaultValue={student.name} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Input type="date" name="born_date" label={'Born Date'} defaultValue={student.born_date} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Select label={'Gender'} placeholder="Select the Gender" defaultSelectedKeys={student.gender} labelPlacement="outside" name="gender" isRequired>
                      <SelectItem key={'L'} value={'L'}>
                        Man
                      </SelectItem>
                      <SelectItem key={'P'} value={'P'}>
                        Woman
                      </SelectItem>
                    </Select>
                    <Input type="text" name="university" label={'University'} placeholder="Type here..." defaultValue={student.university} labelPlacement="outside" isRequired />
                    <Select label={'City'} placeholder="Select the City" name="city_id" labelPlacement="outside" defaultSelectedKeys={[student.city_id ?? 'not']} isRequired>
                      {!student?.city_id && <SelectItem key={'not'}>No City Selected.</SelectItem>}
                      {data?.cities &&
                        data?.cities.map((city: any, i: number) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                    </Select>
                    <div className="col-span-2">
                      <Textarea name="address" label={'Address'} labelPlacement="outside" placeholder="Type here..." defaultValue={student.address} isRequired></Textarea>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" type="reset" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isLoading={isLoading}>
                    Edit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

{
  /* <Tooltip content="Edit user" color="secondary">
  <button>
    <EditIcon size={20} fill="#979797" />
  </button>
</Tooltip>; */
}
