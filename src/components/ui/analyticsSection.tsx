"use client";

import React from "react";
import { useMutation, useQuery } from "react-query";

import {
  Analytic,
  AnalyticResp,
  AnalyticsBody,
  ServerError,
  getAnalytics,
} from "@/services/axios";
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
  Input,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { IoMdAnalytics } from "react-icons/io";
import { columns } from "@/utils/table";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRight } from "react-icons/fa6";

type FormInput = {
  shortUrl: string;
};

export default function AnalyticsSection() {
  const schema: ZodType<FormInput> = z.object({
    shortUrl: z.string().min(1, { message: "Please enter any Url" }),
    // .refine(
    //   (value) => {
    //     const urlPattern =
    //       /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
    //     return urlPattern.test(value);
    //   },
    //   {
    //     message: "Please enter a valid URL",
    //   }
    // ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });
  const {
    mutateAsync: AnalyticsMutation,
    data,
    isLoading,
  } = useMutation<AnalyticResp, ServerError, AnalyticsBody>(getAnalytics);
  const submit = async (data: FormInput) => {
    console.log(data);
    AnalyticsMutation(data);
    // reset();
  };
  function extractShortID(shortUrl: string) {
    return shortUrl.substring(shortUrl.lastIndexOf("/") + 1);
  }
  function getDateTime(date: string) {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  }

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
      <div className="m-6">
        <form action="" className="flex w-full gap-6 mb-2">
          <Input
            isRequired
            type="url"
            label="Short Url"
            className="mb-3"
            placeholder="https://tvdg-api.com/kQpVx"
            variant="underlined"
            color="success"
            isInvalid={!!errors.shortUrl}
            errorMessage={errors.shortUrl && `${errors.shortUrl.message}`}
            classNames={{
              label: "font-bold",
              errorMessage: "text-xs italic",
            }}
            {...register("shortUrl")}
          />

          <Button
            type="submit"
            radius="full"
            variant="shadow"
            color="success"
            isIconOnly
            isLoading={isLoading}
            aria-label="Download"
            className="text-xl mt-4"
            onClick={handleSubmit(submit)}
          >
            <FaArrowRight />
          </Button>
        </form>
        {data && (
          <div>
            <div className="flex justify-between pb-3">
              <div className="flex items-center justify-center gap-3">
                <IoMdAnalytics className="text-5xl text-[#0e3552]" />
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-[#0e3552]">
                    Analytics
                  </p>
                  <p className="text-small text-default-500">
                    {extractShortID(getValues("shortUrl"))}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-center items-center gap-3">
                  <p className="text-md font-semibold text-[#0e3552]">
                    Total Clicks:
                  </p>
                  <p className=" text-success text-center text-4xl font-semibold">
                    {data && data.visitHistory.totalClicks}
                  </p>
                </div>
              </div>
            </div>

            <Divider />

            <div>
              <p className="text-md text-center font-semibold py-2 text-[#0e3552]">
                {data.message}
              </p>
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
          </div>
        )}
      </div>
    </>
  );
}
