import React, { BaseSyntheticEvent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip, Tooltip } from '@nextui-org/react';
import { delay } from '@/lib/Promise';
import { DeleteIcon } from '@/components/icons/table/delete-icon';

interface City {
  session: any;
  mutate: any;
  name?: string;
  id?: string;
}
export default function DeleteStudent({ session, mutate, name, id }: City) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await delay(1000);
    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/api/admin/dashboard/students/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: session?.user?.token_type + ' ' + session?.user?.token_api,
      },
    });
    setIsLoading(false);
    if (!res.ok && res.status !== 200) {
      const result = await res.json();
      return;
    }
    mutate();
    return onOpenChange();
  };
  return (
    <>
      <Tooltip content="Delete user" color="danger" placement={'right'}>
        <button onClick={onOpen}>
          <DeleteIcon size={20} fill="#FF0080" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Delete Student</ModalHeader>
                <ModalBody>Are you sure to delete {name}?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" type="reset" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" type="submit" isLoading={isLoading}>
                    Delete
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
