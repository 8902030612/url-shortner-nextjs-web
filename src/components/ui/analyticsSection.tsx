"use client";

import React from "react";
import { useQuery } from "react-query";

import { Analytic, AnalyticResp, getAnalytics } from "@/services/axios";
import {
  Card,
  CardHeader,
  Divider,
  Image,
  CardBody,
  CardFooter,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";
import { IoMdAnalytics } from "react-icons/io";
import { columns } from "@/utils/table";

interface PageProps {
  shortId: string;
}

export default function AnalyticsSection({ shortId }: PageProps) {
  function getDateTime(date: string) {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  }
  const { data } = useQuery<AnalyticResp>(
    ["getAnalytics"],
    () => getAnalytics({ shortId }),
    {
      onSuccess: () => {
        console.log("Analytics generated successfully!");
      },
    }
  );

  const mappedData =
    data &&
    data.visitHistory.analytics.map((item: Analytic) => ({
      key: item._id,
      timestamp: getDateTime(item.timestamp),

      ipAddress: item.ipAddress,
    }));

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <section>
        <Card className="max-w-[400px] mt-3" radius="none">
          <CardHeader className="flex justify-between gap-3">
            <div className="flex items-center justify-center gap-3">
              <IoMdAnalytics className="text-5xl" />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Analytics</p>
                <p className="text-small text-default-500">{shortId}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-3">
                <p className="text-md font-semibold">Total Clicks:</p>
                <p className=" text-success text-center text-4xl font-semibold">
                  {data && data.visitHistory.totalClicks}
                </p>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {data && (
              <div>
                <p className="text-md font-semibold pb-3">{data.message}</p>
                <Table
                  removeWrapper
                  aria-label="Example table with dynamic content"
                  classNames={{
                    table: "border-solid border-1 border-secondary-color ",
                    th: "bg-[#3ba15f] text-white text-lg font-medium first:rounded-none last:rounded-none border-solid border-1 border-secondary-color",
                    tr: "[&:nth-child(even)]:bg-[#f9f9f9]",
                    td: "text-base",
                  }}
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={mappedData}
                    emptyContent={"No rows to display."}
                  >
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardBody>
        </Card>
      </section>
    </>
  );
}
