import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const { title, description, image, id, ratePerDay } = service;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full border-b-[6px] border-b-primary">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-white font-medium text-sm">Professional Care</span>
        </div>
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-primary shadow-sm uppercase tracking-wider">
          Top Rated
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-gray-500 leading-relaxed text-sm mb-8 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm font-semibold text-primary mb-6">
          <span>Starts at</span>
          <span className="text-lg">৳{ratePerDay}/day</span>
        </div>

        <Link
          href={`/service/${id}`}
          className="btn btn-primary btn-block rounded-full group-hover:bg-secondary group-hover:border-secondary text-white border-none shadow-md hover:shadow-lg transition-all"
        >
          Book Now
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
