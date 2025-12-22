import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 font-serif">
        <Image src={"/logo.png"} alt="Logo" width={40} height={40}></Image>
        <span className="text-3xl  text-primary -ml-1">
          Care<span className="text-secondary font-semibold ">Hub</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
