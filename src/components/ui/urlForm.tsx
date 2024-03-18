"use client";
import {
  ApiResponse,
  CustomSlugURIShort,
  Params,
  ServerError,
  urlShort,
} from "@/services/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Snippet, Link, Switch } from "@nextui-org/react";
import { MdAnalytics } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaLink } from "react-icons/fa6";
import { useMutation } from "react-query";
import { ZodType, z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";

type FormInput = {
  url: string;
  customSlug?: string;
};
export default function UrlForm() {
  const [isSelected, setIsSelected] = useState(false);
  const schema: ZodType<FormInput> = z.object({
    url: z
      .string()
      .min(1, { message: "Please enter any Url." })
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
    customSlug: z.optional(
      z
        .string()
        .min(1, { message: "Custom Slug is required." })
        .max(6, { message: "Custom Slug cannot be longer than 6 characters." })
    ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });
  const handleSwitchChange = (value: boolean) => {
    setIsSelected(value);
    resetField("customSlug");
  };
  const {
    mutateAsync: uploadMutation,
    data: res,
    isLoading,
  } = useMutation<ApiResponse, ServerError, Params>(urlShort);

  const {
    error,
    mutateAsync: uploadCustomMutation,
    data: res1,
    isLoading: isloadingC,
  } = useMutation(CustomSlugURIShort);
  const submit = async ({ url, customSlug }: FormInput) => {
    let uploadParams: Params;

    if (isSelected === true) {
      uploadParams = {
        url,
        customSlug: customSlug || undefined,
      };
    } else {
      uploadParams = { url };
    }

    if (isSelected === true) {
      // console.log(uploadParams);
      uploadCustomMutation({
        url: uploadParams.url,
        customSlug: uploadParams.customSlug,
      });
    } else {
      // console.log(uploadParams);
      uploadMutation({ url: uploadParams.url });
      // reset();
    }
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
            label: "font-bold !text-black",
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
          isLoading={isSelected ? isloadingC : isLoading}
          aria-label="Download"
          className="text-xl mt-4"
          onClick={handleSubmit(submit)}
        >
          <FaArrowRight />
        </Button>
      </form>
      <Switch
        isSelected={isSelected}
        onValueChange={handleSwitchChange}
        color="success"
        size="sm"
      >
        Add Custom Slug
      </Switch>
      {isSelected && (
        <Input
          isRequired
          type="text"
          label="Custom Slug"
          className="mb-3"
          variant="underlined"
          color="success"
          isInvalid={!!errors.customSlug}
          errorMessage={errors.customSlug && `${errors.customSlug.message}`}
          classNames={{
            label: "font-bold !text-black",
            errorMessage: "text-xs italic",
          }}
          {...register("customSlug")}
        />
      )}

      {isSelected ? (
        res1 ? (
          <div className="flex justify-center items-center gap-3">
            <Snippet
              hideSymbol
              size="md"
              color="success"
              variant="bordered"
              radius="sm"
            >
              <Link
                target="_blank"
                href={res1.ShortUrl}
                className="flex justify-center items-center gap-2 text-success"
              >
                <FaLink /> {res1.ShortUrl}
              </Link>
            </Snippet>
          </div>
        ) : null
      ) : res ? (
        <div className="flex justify-center items-center gap-3">
          <Snippet
            hideSymbol
            size="md"
            color="success"
            variant="bordered"
            radius="sm"
          >
            <Link
              target="_blank"
              href={res.ShortUrl}
              className="flex justify-center items-center gap-2 text-success"
            >
              <FaLink /> {res.ShortUrl}
            </Link>
          </Snippet>
        </div>
      ) : null}
    </div>
  );
}
