"use client";

import { PortfolioEditor } from "@/components/PortfolioEditor";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateTemplateFields } from "./action";
import { toast } from "@/components/ui/use-toast";
import AnimatedLoader from "@/components/AnimationLoader";
import { Loader } from "@/components/ui/Loader";

interface FormField {
  label: string;
  value: string;
}
type DataProps = Prisma.OrderItemGetPayload<{
  include: { product: true };
}>;

export default function EditorPortfolio({
  initialData,
  data,
}: {
  initialData: FormField[];
  data: DataProps;
}) {
  const [fields, setFields] = useState(initialData);
  const { mutate: update, isPending } = useMutation({
    mutationFn: updateTemplateFields,
    mutationKey: ["updateTemplateFields"],
    onSuccess: () => {
      toast({
        title: "Saved",
        description: "Portfolio saved successfully",
      });
    },
  });
  const handleChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
  };

  const handleSave = () => {
    const updateTemplateFields = {} as any;
    fields.forEach((field) => {
      updateTemplateFields[field.label] = field.value;
    });
    update({
      orderItemId: data.id,
      updateTemplateFields,
    });
  };

  return (
    <>
      <div className="p-4 bg-primary border-b border-t border-b-[#252525] border-t-[#252525] flex items-centers justify-between gap-2">
        <div></div>
        <h2 className="m-0 text-white/75 leading-[0] flex justify-center items-center text-[14px]">
          {data.product.name}
        </h2>
        <Button
            className="w-fit mt-2 overflow-hidden relative"
            variant={"secondary"}
            onClick={() => handleSave()}
          >
            <AnimatedLoader
              isLoading={isPending}
              loadingContent={<Loader className="w-6 h-6" />}
            >
              Save
            </AnimatedLoader>
          </Button>
      </div>
      <div style={{ height: "calc(100vh - 9rem)" }}>
        <PortfolioEditor
          fields={fields}
          handleChange={handleChange}
          templateHtml={data.product.templateHtml}
        />
      </div>
    </>
  );
}
