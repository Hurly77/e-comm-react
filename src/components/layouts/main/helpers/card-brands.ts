export function getCardBrandImage(brand?: string | null) {
  if (!brand) return "";
  switch (brand) {
    case "visa":
      return "/images/card_brand_light/Visa.png";
    case "mastercard":
      return "/images/card_brand_light/MasterCard.png";
    case "american_express":
      return "/images/card_brand_light/AmericanExpress.png";
    case "discover":
      return "/images/card_brand_light/Discover.png";
    case "diners_club":
      return "/images/card_brand_light/DinersClub.png";
    case "jcb":
      return "/images/card_brand_light/JCB.png";
    default:
      "";
  }
}
