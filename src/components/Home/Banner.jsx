import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:grid grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-8 text-center md:text-left">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl">
          We give <span className="text-primary">Care</span> to all who{" "}
          <span className="text-secondary">deserves</span>
        </h2>
        <p className="text-justify text">
          CareHub connects families with professional baby sitters, elderly
          caregivers, and special care providers — ensuring comfort, safety, and
          peace of mind.
        </p>
        <button className="btn md:btn-wide btn-secondary rounded-full p-6 hover:bg-transparent hover:text-secondary">
          OUR CARE SERVICES
        </button>
      </div>
      <div className="mt-10 md:mt-0">
        <Image
          src={"/banner-img.png"}
          alt="Banner Image"
          className="w-full"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Banner;
