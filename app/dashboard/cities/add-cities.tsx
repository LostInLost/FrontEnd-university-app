import React, { BaseSyntheticEvent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@/lib/Promise';

export default function AddCity({ session, mutate }: { session: any; mutate: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg('');
    const formData = new FormData(e.currentTarget);
    await delay(1000);
    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/api/admin/dashboard/cities', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: session?.user?.token_type + ' ' + session?.user?.token_api,
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
        Add City
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action="" method="post" onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Add City</ModalHeader>
                <ModalBody>
                  {errMsg && <Chip color="danger">{errMsg}</Chip>}
                  <div className="flex flex-col gap-3">
                    <Input type="text" name="name" placeholder="City Name..." />
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
