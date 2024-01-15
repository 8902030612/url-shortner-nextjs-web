"use client";
import { ApiResponse, Params, ServerError, urlShort } from "@/services/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Snippet } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaLink, FaPaste } from "react-icons/fa6";
import { useMutation } from "react-query";
import { ZodType, z } from "zod";

type FormInput = {
  url: string;
};
export default function UrlForm() {
  const schema: ZodType<FormInput> = z.object({
    url: z
      .string()
      .min(1, { message: "Please enter any Url" })
      .refine(
        (value) => {
          const urlPattern =
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
          return urlPattern.test(value);
        },
        {
          message: "Please enter a valid URL",
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });
  const {
    mutateAsync: uploadMutation,
    data: res,
    isLoading,
  } = useMutation<ApiResponse, ServerError, Params>(urlShort);
  const submit = async (data: FormInput) => {
    console.log("addProfileParams", data);
    uploadMutation(data);
    reset();
  };
  return (
    <div className="m-6">
      <form action="" className="flex w-full gap-6 mb-2">
        <Input
          isRequired
          type="url"
          label="Url"
          className="mb-3"
          placeholder="https://google.com"
          variant="underlined"
          color="success"
          isInvalid={!!errors.url}
          errorMessage={errors.url && `${errors.url.message}`}
          classNames={{
            label: "font-bold",
            errorMessage: "text-xs italic",
          }}
          {...register("url")}
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
      {res ? (
        <Snippet hideSymbol size="md" color="success" variant="bordered">
          <Link
            target="_blank"
            href={res.ShortUrl}
            className="flex justify-center items-center gap-2"
          >
            <FaLink /> {res.ShortUrl}
          </Link>
        </Snippet>
      ) : null}
    </div>
  );
}
