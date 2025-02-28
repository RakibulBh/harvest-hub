import Navbar from "../sb-components/header1";
import AddToWishlistButton from "../sb-components/fav-button";
import AddToCartButton from "../sb-components/add_to_cart_button";
import { ChevronRight } from "lucide-react";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="text-lg text-gray-600 ml-[210px] mt-10">
        home &#x276F; wishlist
      </div>
      <div className=" flex justify-center mt-20">
        <h1 className="text-4xl font-bold text-black">My Wishlist</h1>
      </div>
    </>
  );
}
