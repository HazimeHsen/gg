"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const Card = ({
  info,
}: {
  info: { title: string; text: string; image: string };
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.2, // Percentage of the element in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row  mb-8 px-3"
      key={info.title}>
      <div className="w-full ">
        <h2 className="flex">
          <Image
            className="-mt-[20px]"
            src={info.image}
            width={60}
            height={60}
            alt={info.title}
          />{" "}
          <div className="font-extrabold text-2xl underline justify-start text-purple-800 mb-4">
            {info.title}:
          </div>
        </h2>
        <div className="font-semibold pl-8">
          <div className="mb-2 text-lg ">{info.text}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
