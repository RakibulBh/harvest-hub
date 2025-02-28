import Navbar from "../sb-components/header1";
import AddToWishlistButton from "../sb-components/fav-button";
import AddToCartButton from "../sb-components/add_to_cart_button";
export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="m-10">
        <AddToWishlistButton />
      </div>
      <div className="m-10">
        <AddToCartButton />
      </div>
    </>
  );
}
