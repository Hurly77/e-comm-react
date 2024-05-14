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
  useDisclosure,
} from "@nextui-org/react";
import { NEW_INVENTORY_FORM } from "../../constants/new-inventory";
import React from "react";
import { CreateProductModel } from "@/lib/sdk/models/ProductModel";
import { createProduct } from "@/lib/sdk/methods";

export default function InventoryNewProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fileRef = React.useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [product, setProduct] = React.useState<CreateProductModel>({
    title: "Chess Board",
    SKU: "CHS-BRD-001",
    description: "Wooden Chess Board",
    price: 39.99,
    stock: 4,
  });

  function handleOnAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setPreviews([...previews, preview]);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const propertyValue = name === "price" || name === "stock" ? Number(value) : value;
    setProduct({ ...product, [name]: propertyValue });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("event: ", e);
    const formData = new FormData();
    const files = fileRef.current?.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    console.log(product);

    for (const key in product) {
      formData.append(key, product[key as keyof CreateProductModel]?.toString());
    }

    try {
      const response = await createProduct(formData);
      // const res = await fetch("http://localhost:4000/product", {
      //   body: formData,
      //   method: "POST",
      //   headers: {
      //     authorization:
      //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjYW1yYm9AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IkNhbSIsImxhc3RfbmFtZSI6IkxldiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTYzNDE4MiwiZXhwIjoxNzE1NzIwNTgyfQ.tOZlirhIdBzxril81lJV6n8PtiTYuzqBfaZe1_4W2WU",
      //   },
      // });
    } catch (error) {
      console.error(error);
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
            <h2>Add New Product</h2>
          </ModalHeader>
          <ModalBody>
            {/* Form goes here */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div>
                <div>
                  <label htmlFor="file-upload" className="flex space-x-2">
                    <span className="text-foreground-400">Upload: </span>
                    <FolderIcon className="h-6 w-6 stroke-default-400 cursor-pointer" />
                  </label>
                  <input
                    ref={fileRef}
                    accept="image/*"
                    onChange={handleOnAddImage}
                    id="file-upload"
                    hidden
                    type="file"
                  />
                </div>
                <Image
                  width={300}
                  height={200}
                  src={previews?.[0] || ""}
                  fallbackSrc="https://via.placeholder.com/300x200"
                  alt="NextUI Image with fallback"
                  className="bg-black"
                  classNames={{
                    wrapper: "bg-default",
                  }}
                />
              </div>
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
                <Button type="submit" color="primary">
                  Save
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
