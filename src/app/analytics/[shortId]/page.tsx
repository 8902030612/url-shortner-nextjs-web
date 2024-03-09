import Footer from "@/components/core/footer/footer";
import Header from "@/components/core/header/header";
import Loading from "@/components/core/loading";
import AnalyticsSection from "@/components/ui/analyticsSection";
import { Progress } from "@nextui-org/react";
import React, { Suspense } from "react";

export default function Analytics({ params }: { params: { shortId: string } }) {
  const ssId = params.shortId;
  // console.log(ssId);

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_282px)]">
        <div className="container mx-auto">
          <AnalyticsSection shortId={ssId}></AnalyticsSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
