"use client";

export default function Button({className}: {className?: string}) {
  return (
    <button className={`${className ?? ''} 
        w-14 h-14 bg-[#084ea3] rounded-full
        hover:bg-[#0a61cc] hover:scale-110
        transition-all duration-200
        absolute z-10 opacity-0 group-hover:opacity-100
        `}>
        <span className="text-black text-2xl">▶</span>
    </button>
  );
}
