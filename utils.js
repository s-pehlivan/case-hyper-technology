export function formatPrice(price) {
  if (!price || price === "" || isNaN(parseFloat(`${price}`))) return `0,0`;
  const _price = Math.round(price * 100) / 100;
  return _price.toFixed(2).replace(".", ",");
}
