import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ title, description, image, link }) {
  return (
    <div className="bg-base-200 rounded-lg border border-secondary shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-[#662c91]">
          {title}
        </h3>

        <p className="mt-3 font-body text-gray-600 text-sm">{description}</p>

        <Link
          href={link}
          className="w-full btn rounded-full bg-secondary mt-5 text-white font-semibold hover:bg-white hover:text-secondary border-secondary"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
