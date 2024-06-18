import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, Button } from "@nextui-org/react";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isLoading?: boolean;
  type?: "removal" | "confirmation";
}

const colorVariants = {
  removal: {
    cancel: {
      color: "danger" as const,
      variant: "light" as const,
    },
    confirm: {
      color: "danger" as const,
      variant: "solid" as const,
    },
  },
  confirmation: {
    cancel: {
      color: "danger" as const,
      variant: "ghost" as const,
    },
    confirm: {
      color: "primary" as const,
      variant: "solid" as const,
    },
  },
};

export default function ConfirmModal(props: ConfirmModalProps) {
  const { isOpen, onClose, onConfirm, title, message, confirmText, cancelText, isLoading } = props;

  const { confirm, cancel } = colorVariants[props.type ?? "removal"];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button isDisabled={isLoading} color={cancel.color} variant={cancel.variant} onClick={onClose}>
            {cancelText}
          </Button>
          <Button radius="sm" variant={confirm.variant} color={confirm.color} isLoading={isLoading} onClick={onConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
