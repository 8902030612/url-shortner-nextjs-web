import Footer from "@/components/core/footer/footer";
import Header from "@/components/core/header/header";
import Loading from "@/components/core/loading";
import Image from "next/image";
import AnalyticsSection from "@/components/ui/analyticsSection";
import { Card, CardBody, Progress } from "@nextui-org/react";
import React, { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};
export default function Analytics() {
  return (
    <>
      <Header />
      <main className="flex flex-col lg:flex-row bg-[url('/bg.svg')] bg-cover bg-bottom h-[calc(100vh_-_122px)]">
        <div className="flex lg:flex-1 items-center justify-center flex-col">
          <div className="my-10 lg:my-0 px-5">
            <h1 className="text-7xl font-light text-[#071a28]">
              Url <span className="font-semibold">Shortner</span>
            </h1>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#071a28]">
              Short links, Magical results
            </h1>
            <p className="mt-4 text-sm sm:text-lg xl:text-2xl text-[#0e3552]">
              Your loooong links will be shortened by a click!
            </p>
          </div>
        </div>

        <div className="flex lg:flex-1 items-center xs:justify-start lg:justify-center">
          <Card
            isBlurred
            className="py-5 md:py-12 px-4 md:px-8 rounded-xl bg-background/80 dark:bg-default-100/50 2xl:w-7/12 xl:w-10/12 w-full lg:w-12/12 2xl:mr-40 xl:mr-30 lg:mr-14 mx-5 lg:mx-0 mb-10 lg:mb-0 mt:10 flex flex-col"
            shadow="sm"
          >
            <CardBody className="items-center">
              <h3 className="text-xl font-semibold mt-6 text-[#0e3552]">
                Get Analytics
              </h3>
              <AnalyticsSection />
            </CardBody>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
