"use client";

import { PortfolioEditor } from "@/components/PortfolioEditor";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateTemplateFields } from "./action";

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
  const { mutate: update } = useMutation({
    mutationFn: updateTemplateFields,
    mutationKey: ["updateTemplateFields"],
    onSuccess: () => {
      alert("Template fields updated");
    },
  });
  const handleChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
  };

  const handleSave = () => {
    // unformat the data
    const updateTemplateFields = {} as any;
    fields.forEach((field) => {
      updateTemplateFields[field.label] = field.value;
    });
    console.log(updateTemplateFields, "updateTemplateFields");
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
        <Button variant="secondary" onClick={() => handleSave()}>Save</Button>
        {/* <Button>Preview</Button> */}
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
