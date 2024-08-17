"use client"

import SectionWrapper from '@/components/SectionWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import useSize from '@/hooks/useSize';
import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti'

export default function Page() {
    const {width, height} = useSize();
  return (
    <>
        <SectionWrapper className='text-center'>
            <div className="container mx-auto px-4 p-8 mt-16 text-white flex flex-col justify-center items-center bg-[#222321] rounded-lg">
                <BadgeCheck size={64} className="text-green-500 " />
                <h1 className="text-4xl font-bold mt-2">
                Thank You for Your Purchase!
                </h1>
                <p className="mt-2">Your order has been completed!</p>
                <p className="mt-2">
                    You can view your portfolios by clicking the button below.
                </p>
                <div className='mt-8'>
                    <Link href={"/portfolios"} className={buttonVariants({variant: "secondary"})}>
                            Your Portfolios
                    </Link>  
                </div>
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
            
            />
                {/* <h3 className="text-xl font-semibold">Total: ${order.total}</h3> */}
            </div>
        </SectionWrapper>
    </>
  );
}
