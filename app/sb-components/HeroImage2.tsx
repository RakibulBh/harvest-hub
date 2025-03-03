export const HeroImage: React.FC = () => {
  return (
    <div>
      <div
        // Hero Image container
        className="relative rounded-2xl bg-cover bg-no-repeat h-[680px] w-auto shadow-lg m-7"
        style={{ backgroundImage: "url('/picturesForShop/hero5.jpg')" }}
      >
        {/* Heading text - overlay with semi-transparent background */}
        <div className=" max-w-3xl p-8">
          <h1 className="text-7xl font-bold text-black mb-4 mt-20 ml-20">
            Welcome to the best shop
          </h1>

          <p className="text-3xl text-black mt-10 ml-20">
            We have all you need
          </p>
        </div>
      </div>
    </div>
  );
};
