import { ecommApi } from "../utility/apis";

export async function deleteProduct(id: number) {
  const response = await ecommApi.delete("product", { params: { id } });
  // eslint-disable-next-line no-console
  console.log(response);
  return response;
}
