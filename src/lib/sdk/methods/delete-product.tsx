import { ecommApi } from "../utility/apis";

export async function deleteProduct(id: number) {
  const response = await ecommApi.delete("product", { params: { id } });
  console.log(response);
  return response;
}
