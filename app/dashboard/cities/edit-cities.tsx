import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip, Tooltip } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@/lib/Promise';
import { EditIcon } from '@/components/icons/table/edit-icon';

interface City {
  session: any;
  mutate: any;
  name?: string;
  id?: string;
}
export default function EditCities({ session, mutate, name, id }: City) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg('');
    const formData = new FormData(e.currentTarget);

    await delay(1000);

    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/api/admin/dashboard/cities/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session?.user?.token_type + ' ' + session?.user?.token_api,
      },
      body: JSON.stringify({
        name: formData.get('name') ?? '',
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
      <Tooltip content="Edit user" color="secondary">
        <button onClick={onOpen}>
          <EditIcon size={20} fill="#979797" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action="" method="post" onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Edit City</ModalHeader>
                <ModalBody>
                  {errMsg && <Chip color="danger">{errMsg}</Chip>}
                  <div className="flex flex-col gap-3">
                    <Input type="text" name="name" defaultValue={name} placeholder="City Name..." />
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
