import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { NEW_INVENTORY_FORM } from "../../constants/new-inventory";
import React from "react";
import { CreateProductModel } from "@/lib/sdk/models/ProductModel";
import useInventory from "../../hooks/useInventory";
import Carousel from "@/components/common/Carousel/Carousel";
import InventoryImageUploader from "./InventoryImageUploader";

export default function InventoryNewProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inventoryCtx = useInventory();

  const fileRef = React.useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>();
  const [isCreatingProduct, setIsCreatingProduct] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<CreateProductModel>({
    title: "Chess Board",
    SKU: "CHS-BRD-001",
    description: "Wooden Chess Board",
    price: 39.99,
    stock: 4,
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const propertyValue = name === "price" || name === "stock" ? Number(value) : value;
    setProduct({ ...product, [name]: propertyValue });
  }

  function handleResetForm() {
    setProduct({
      title: "",
      SKU: "",
      description: "",
      price: 0,
      stock: 0,
    });
    setPreviews([]);
    setIsCreatingProduct(false);
    setError(null);
    setSuccess(null);
  }

  function handleOnClose() {
    onClose();
    handleResetForm();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("event: ", e);
    const formData = new FormData();
    const files = fileRef.current?.files;
    if (!files?.length) return;

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    console.log(product);

    for (const key in product) {
      formData.append(key, product[key as keyof CreateProductModel]?.toString());
    }

    setIsCreatingProduct(true);

    try {
      const { data, error } = await inventoryCtx.add(formData);
      if (data) setSuccess("Product created successfully");
      if (error) console.log("Success Error: ", error);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingProduct(false);
    }
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" radius="sm">
        <PlusIcon className="h-6 w-6 stroke-white" />
        Add Product
      </Button>

      <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {!success && (
              <>
                <h2>Add New Product</h2>
                <div className="text-danger">{error}</div>
              </>
            )}
          </ModalHeader>
          <ModalBody>
            {/* Form goes here */}
            {success ? (
              <div className="h-96 flex items-center justify-center">
                <h3 className="text-success text-2xl">{success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InventoryImageUploader fileRef={fileRef} images={previews} setImages={setPreviews} />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name={NEW_INVENTORY_FORM.TITLE_INPUT.name}
                    label={NEW_INVENTORY_FORM.TITLE_INPUT.label}
                    placeholder={NEW_INVENTORY_FORM.TITLE_INPUT.placeholder}
                    onChange={handleOnChange}
                    value={product.title}
                  />
                  <Input
                    name={NEW_INVENTORY_FORM.SKU_INPUT.name}
                    label={NEW_INVENTORY_FORM.SKU_INPUT.label}
                    placeholder={NEW_INVENTORY_FORM.SKU_INPUT.placeholder}
                    onChange={handleOnChange}
                    value={product.SKU}
                  />
                  <Input
                    name={NEW_INVENTORY_FORM.DESCRIPTION_INPUT.name}
                    label={NEW_INVENTORY_FORM.DESCRIPTION_INPUT.label}
                    placeholder={NEW_INVENTORY_FORM.DESCRIPTION_INPUT.placeholder}
                    onChange={handleOnChange}
                    value={product.description}
                  />
                  <Input
                    type="number"
                    name={NEW_INVENTORY_FORM.PRICE_INPUT.name}
                    label={NEW_INVENTORY_FORM.PRICE_INPUT.label}
                    placeholder={NEW_INVENTORY_FORM.PRICE_INPUT.placeholder}
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    onChange={handleOnChange}
                    value={product.price?.toString()}
                  />
                  <Input
                    type="number"
                    name={NEW_INVENTORY_FORM.STOCK_INPUT.name}
                    label={NEW_INVENTORY_FORM.STOCK_INPUT.label}
                    placeholder={NEW_INVENTORY_FORM.STOCK_INPUT.placeholder}
                    value={product.stock?.toString()}
                  />
                </div>
                <div className="flex pt-4 gap-x-2 justify-end">
                  <Button
                    type="submit"
                    color="primary"
                    isDisabled={isCreatingProduct}
                    endContent={isCreatingProduct ? <Spinner color="white" size="sm" /> : <></>}
                  >
                    Save
                  </Button>
                  <Button isDisabled={isCreatingProduct} color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </ModalBody>

          {success && (
            <ModalFooter>
              <div className="flex pt-4 gap-x-2 justify-end">
                <Button onPress={handleResetForm} type="submit" color="primary">
                  <PlusIcon className="h-6 w-6 stroke-white" />
                  Add Another Product
                </Button>
                <Button onPress={handleOnClose}>Close</Button>
              </div>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
