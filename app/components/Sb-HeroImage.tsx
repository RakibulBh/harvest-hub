export const HeroImage: React.FC = () => {
  return (
    <div>
      <div
        className="hero__Image__Container relative rounded-2xl bg-cover bg-no-repeat h-[680px] w-auto shadow-lg m-7 ml-[150px] mr-[150px]"
        style={{ backgroundImage: "url('/picturesForShop/hero.jpg')" }}
      >
        <div className="hero__Text__Container absolute inset-0 flex justify-left w-[650px] mt-20">
          <div className="hero__Text">
            <h2 className="text-customDarkGreen ml-12 text-6xl font-semibold">
              Get the best quality products at the lowest prices
            </h2>
            <h4 className="ml-12 mt-5 mb-6 text-xl font-semibold">
              Subheading
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
