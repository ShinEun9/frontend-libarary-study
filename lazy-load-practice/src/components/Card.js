import React, { useEffect, useRef } from "react";

function Card(props) {
  const imgRef = useRef();
  useLazyLoadImage(imgRef);

  return (
    <div className="Card text-center">
      <img data-src={props.image} ref={imgRef} alt="" />
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
        {props.children}
      </div>
    </div>
  );
}

export default Card;

const useLazyLoadImage = (imgRef, options = {}) => {
  useEffect(() => {
    if (!imgRef.current) return;

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [imgRef, options]);
};
