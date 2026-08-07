import { categories } from "@/constants/categories";
import { ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";

const page = () => {
  return (
    <main>
      <header className="relative w-full min-h-[420] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/header-bg.jpg" 
            alt="Concert Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Don’t miss out! <br />
            Explore the <span className="text-primary">vibrant events</span> happening locally and globally.
          </h1>
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl flex flex-col sm:flex-row items-center p-1.5 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              <div className="flex items-center gap-3 px-3 py-2 w-full sm:flex-1 text-gray-700">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search Events, Categories, Location..."
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-2 px-4 py-2 w-full sm:w-auto text-gray-700 cursor-pointer min-w-[150px]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
                  <span className="text-sm font-medium text-gray-800">Mumbai</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="w-full px-20">
        <h2>Explore Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
    {categories.map((category, index) => (
      <div 
        key={index} 
        className="flex flex-col items-center text-center cursor-pointer group max-w-[120]"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Image
            src={category.cover}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm font-semibold text-[#2D2D3F] leading-snug">
          {category.name}
        </p>
      </div>
    ))}
  </div>
      </section>
    </main>
  );
};

export default page;
