import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
  Tooltip,
  SelectItem,
  Select,
  Textarea,
} from "@nextui-org/react";
import { EyeIcon } from "@/components/icons/table/eye-icon";

interface City {
  student?: any;
}
export default function DetailStudent({ student }: City) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Detail Student" color="secondary">
        <button onClick={onOpen}>
          <EyeIcon size={20} fill="#979797" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detail Student
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    name="nim"
                    label={"NIM"}
                    defaultValue={student.nim}
                    placeholder="Type here..."
                    labelPlacement="outside"
                    isReadOnly
                  />
                  <Input
                    type="text"
                    name="name"
                    label={"Name"}
                    defaultValue={student.name}
                    placeholder="Type here..."
                    labelPlacement="outside"
                    isReadOnly
                  />
                  <Input
                    type="date"
                    name="born_date"
                    label={"Born Date"}
                    defaultValue={student.born_date}
                    placeholder="Type here..."
                    labelPlacement="outside"
                    isReadOnly
                  />
                  <Select
                    label={"Gender"}
                    placeholder="Select the Gender"
                    defaultSelectedKeys={student.gender}
                    labelPlacement="outside"
                    name="gender"
                    isDisabled
                  >
                    <SelectItem key={"L"} value={"L"}>
                      Man
                    </SelectItem>
                    <SelectItem key={"P"} value={"P"}>
                      Woman
                    </SelectItem>
                  </Select>
                  <Input
                    type="text"
                    name="university"
                    label={"University"}
                    placeholder="Type here..."
                    defaultValue={student.university}
                    labelPlacement="outside"
                    isReadOnly
                  />
                  <Input
                    type="text"
                    name="city"
                    label={"City"}
                    placeholder="Type here..."
                    defaultValue={student?.city?.name ?? "No City Selected."}
                    labelPlacement="outside"
                    isReadOnly
                  />
                  <div className="col-span-2">
                    <Textarea
                      name="address"
                      label={"Address"}
                      labelPlacement="outside"
                      placeholder="Type here..."
                      defaultValue={student.address}
                      isReadOnly
                    ></Textarea>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  type="reset"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
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
