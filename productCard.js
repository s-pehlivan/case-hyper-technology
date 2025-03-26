function productCard(product) {
  return `
  <div id="${
    product?.productName ?? "product-card"
  }" class="flex flex-col gap-2 bg-pink-200">
  <div class="overflow-hidden w-full aspect-square">
    <img
      id="product-image"
      class="w-full h-full object-cover hover:scale-[1.25] transition-all duration-500"
      src="$product?.productData?.productMainImage ?? ""}"
      alt="${product?.productName ?? "product-card"}"
    />
  </div>

  <h2 class="product-name text-sm">${product.productName}</h2>
  <div
    id="product-price"
    class="flex flex-wrap mt-auto gap-2 items-center flex-no-wrap text-sm"
  >
    <h3 id="buying-price" class="font-semibold text-md"></h3>
    <h4 id="market-price" class="text-gray-500 line-through font-light"></h4>
    <h5 id="discount" class="text-gray-500 font-semibold"></h5>
  </div>
</div>

    `;
}

export default productCard;
