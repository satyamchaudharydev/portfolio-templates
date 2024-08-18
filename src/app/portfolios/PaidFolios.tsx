"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { itemVariants, staggerItems } from "@/lib/variants";

const PaidFolios = ({ portfolios }: { portfolios: any[] }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerItems}
      className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 auto-rows-[350px] gap-8 "
    >
      {portfolios.map((portfolio: any) => (
        <Link
          href={`/portfolios/${portfolio.cardItemId}`}
          key={portfolio.productId}
        >
          <motion.div variants={itemVariants} className="flex-col max-h-[300px] h-full relative aspect-auto md:aspect-[0.833652/1]">
            <div className="rounded-lg shadow-md border border-white/[.08] overflow-hidden relative aspect-auto md:aspect-[0.833652/1] h-full ">
              <img
                src={portfolio?.image?.[0]}
                alt={portfolio.name}
                className="w-full object-cover mb-4 absolute h-full"
              />
            </div>
            <div className="flex flex-row pt-2 gap-2 justify-between">
              <div className="flex-col justify-between items-center">
                <h2
                  className="text-lg font-semibold
              max-w-[20ch] truncate
              "
                >
                  {portfolio.name}
                </h2>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default PaidFolios;
