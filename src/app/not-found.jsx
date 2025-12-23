import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={300}
        height={100}
        className="w-52"
      />
      <h1 className="font-serif font-extrabold text-9xl text-primary">404!</h1>
      <h3 className="font-serif font-bold text-5xl text-center">
        Sorry! The Page Not Found ;(
      </h3>
      <p className="text-secondary max-w-sm text-center">
        The Link You Followed Probably Broken, or the page has been removed.
      </p>
      <Link
        href={"/"}
        className="btn btn-secondary btn-wide rounded-full hover:bg-white hover:text-secondary hover:border-secondary"
      >
        BACK TO HOME
      </Link>
    </div>
  );
};

export default NotFound;
