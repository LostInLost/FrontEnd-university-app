'use client';
import React, { BaseSyntheticEvent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip, Select, SelectItem, Textarea } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@/lib/Promise';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

export default function AddStudent({ session, mutate }: { session: any; mutate: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const token = session?.user?.token_type + ' ' + session?.user?.token_api;
  const { data } = useSWR([`/api/admin/dashboard/cities`, session?.user], fetcher);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg('');
    const formData = new FormData(e.currentTarget);
    await delay(1000);
    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/api/admin/dashboard/students', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
      body: formData,
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
      <Button onPress={onOpen} color={'primary'} startContent={<FontAwesomeIcon icon={faPlus} />}>
        Add Student
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action="" method="post" onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Add Student</ModalHeader>
                <ModalBody>
                  {errMsg && <Chip color="danger">{errMsg}</Chip>}
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="text" name="nim" label={'NIM'} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Input type="text" name="name" label={'Name'} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Input type="date" name="born_date" label={'Born Date'} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Select label={'Gender'} placeholder="Select the Gender" labelPlacement="outside" name="gender" isRequired>
                      <SelectItem key={'L'} value={'L'}>
                        Man
                      </SelectItem>
                      <SelectItem key={'P'} value={'P'}>
                        Woman
                      </SelectItem>
                    </Select>
                    <Input type="text" name="university" label={'University'} placeholder="Type here..." labelPlacement="outside" isRequired />
                    <Select label={'City'} placeholder="Select the City" name="city_id" labelPlacement="outside" isRequired>
                      {data?.cities &&
                        data?.cities.map((city: any, i: number) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                    </Select>
                    <div className="col-span-2">
                      <Textarea name="address" label={'Address'} labelPlacement="outside" placeholder="Type here..." isRequired></Textarea>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" type="reset" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isLoading={isLoading}>
                    Add
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
