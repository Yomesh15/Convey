import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StartAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-[#050816] flex justify-center items-center overflow-hidden">
 
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-blue-600 blur-[140px]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 0.3 }}
        transition={{ duration: 2 }}
      />

      <div className="relative flex items-center">
 
        <motion.h1
          initial={{
            scale: 0,
            opacity: 0,
            filter: "blur(15px)"
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)"
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
          className="text-8xl font-extrabold text-blue-500"
          style={{
            textShadow: "0 0 25px #3b82f6"
          }}
        >
          C
        </motion.h1>
 
        <div className="overflow-hidden">

          <motion.h1
            initial={{
              x: -120,
              opacity: 0
            }}
            animate={{
              x: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="text-8xl font-extrabold text-white ml-1"
          >
            onvey
          </motion.h1>

        </div>

      </div>
 
      <motion.p
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 0.7,
          y: 0
        }}
        transition={{
          delay: 1.5,
          duration: 0.8
        }}
        className="absolute bottom-24 text-gray-400 tracking-[0.4em] uppercase text-sm"
      >
        Connect • Chat • Call
      </motion.p>
 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-12 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-blue-500"
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

    </div>
  );
};

export default StartAnimation;