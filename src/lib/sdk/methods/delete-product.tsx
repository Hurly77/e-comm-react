import { ecommAdminApi } from "../utility/apis";

export async function deleteProduct(id: number) {
  const response = await ecommAdminApi.delete("product", {
    params: {
      id,
    },
  });

  console.log(response);

  return response;
}
