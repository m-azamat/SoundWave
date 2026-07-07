'use client'
import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa6";

export default function ButtonScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleIsVisible = () => {
      if(window.scrollY > 2300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleIsVisible)

    return () => window.removeEventListener("scroll", toggleIsVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  } 

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed z-20 -left-5 bottom-30 
        text-white bg-blue-800 rounded-full p-4
        transition-all duration-300 
        ${isVisible ? "opacity-100 left-5" : "opacity-0 pointer-events-none"}  
      `}
    >
      <FaArrowUp size={15}/>
    </button>
  )
}