import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import React from "react";
import { DRAWER_MOTION_PROPS } from "../../constants/drawer";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface DrawerProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ title, children, isOpen, onClose }: DrawerProps) {
  return (
    <Modal
      radius="none"
      classNames={{
        base: "sm:m-0",
        closeButton:
          "scale-75 top-6 right-4 h-10 w-10 bg-default-100 hover:bg-default-200 hover:scale-100 transition-all",
      }}
      closeButton={<XMarkIcon className="bg-default-400 rounded-full" />}
      isOpen={isOpen}
      onClose={onClose}
      className="h-full p-4 m-0 absolute right-0"
      motionProps={DRAWER_MOTION_PROPS}
    >
      <ModalContent className="overflow-y-auto">
        <ModalHeader className="border-b">
          <h1 className="text-xl font-medium">{title}</h1>
        </ModalHeader>
        <ModalBody className="overflow-y-auto custom-scrollbar">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
