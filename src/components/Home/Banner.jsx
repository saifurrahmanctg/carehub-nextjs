import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:grid grid-cols-2 gap-20 items-center">
      <div className="flex flex-col gap-8 text-center md:text-left">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          We give <span className="text-primary">care</span> to all who{" "}
          <span className="text-secondary">deserve</span>
        </h2>
        <p className="text-justify">
          CareHub connects families with professional baby sitters, elderly
          caregivers, and special care providers — ensuring comfort, safety, and
          peace of mind.
        </p>
        <Link href="/services" className="btn md:btn-wide btn-secondary rounded-full p-6 hover:bg-transparent hover:text-secondary">
          OUR CARE SERVICES
        </Link>
      </div>
      <div className="mt-10 md:mt-0">
        <Image
          src={"/banner-img.png"}
          alt="Banner Image"
          className="w-full"
          style={{ height: 'auto' }}
          width={400}
          height={400}
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
