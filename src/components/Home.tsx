"use client";
import ProductList from "@/components/ProductList";
import GradientBackground from "@/components/GradientBackground";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { itemVariants, staggerItems } from "@/lib/variants";

export default function HomeComponent() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const gradientVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={staggerItems}
        initial="hidden"
        animate={"show"}
        className="relative flex flex-col items-center overflow-hidden px-5 p-[40px] text-center md:px-[30px] md:pb-[80px] md:pt-[60px] lg:pb-[80px] lg:pt-[40px] bg-primary"
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 50% 110%, #abddff 0%, rgba(0, 141, 255, 0.8) 35%, rgba(0, 111, 255, 0.4) 65%, rgb(0, 0, 0) 100%)",
        }}
      >
        <motion.h1
          className="bg-clip-text heading font-bold heading"
          style={{
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(10deg, #ffffff 0%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0) 100%)",
          }}
          variants={itemVariants}
          initial="hidden"
          animate={"show"}
        >
          Start Building Your <br /> Own Portfolio.
        </motion.h1>
        <motion.p
          className="text-xl text-balance text-white/70 mt-2"
          variants={itemVariants}
        >
          Customizable portfolio with one click!
        </motion.p>
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 mix-blend-overlay"
          variants={gradientVariants}
        >
          <GradientBackground />
        </motion.div>
      </motion.div>
      <motion.div className="py-6">
        <SectionWrapper>
          <motion.div
            variants={staggerItems}
            initial="hidden"
            animate={"show"}
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 auto-rows-[350px] gap-8"
          >
            <ProductList />
          </motion.div>
        </SectionWrapper>
      </motion.div>
    </motion.div>
  );
}
