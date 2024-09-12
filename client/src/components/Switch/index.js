"use client";

import { useRouter, usePathname } from 'next/navigation';

const Switch = ({ view }) => {
  const router = useRouter();
  const pathname = usePathname();

  const setView = (view) => {
    const setSearchParams = new URLSearchParams();
    setSearchParams.set('view', view);
    router.push('?' + `view=${view}`, { scroll: false });
  };

  const toggleSwitch = () => {
    if (pathname === "/") {
      if (!view || view === "collection") {
        setView("albums");
      } else {
        setView("collection");
      }
    } else {
      router.push("/?view=albums", { scroll: false });
    }
  };

  return (
    <div 
      className="inline-flex p-[5px] rounded-full select-none cursor-pointer bg-lightGray"
      onClick={toggleSwitch}
    >
      <div className={`flex items-center h-8 px-6 rounded-full ${(!view || view === "collection") && pathname === "/" ? "bg-white" : "opacity-40"}`}>
        Collection
      </div>
      <div className={`flex items-center h-8 px-6 rounded-full ${view === "albums" || pathname !== "/" ? "bg-white" : "opacity-40"}`}>
        Albums
      </div>
    </div>
  );
};

export default Switch;