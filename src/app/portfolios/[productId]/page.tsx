import { useRouter } from "next/navigation";
import { getOrderItemDetails } from "./action";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { PortfolioEditor } from "@/components/PortfolioEditor";
import EditorPortfolio from "./EditorPortfolio";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  console.log(typeof params.productId);

  const data = await getOrderItemDetails(Number(params.productId));
  let templateFields;
  const userTemplateFields = data?.userTemplateFields as any;
  if (typeof userTemplateFields === "string") {
    try {
      // Parse userTemplateFields if it's a valid JSON string
      templateFields = JSON.parse(userTemplateFields);
      // Ensure templateFields is an array
      if (!Array.isArray(templateFields)) {
        templateFields = [];
      }
    } catch (error) {
      console.error("Error parsing template fields:", error);
    }
  }
  const formatFormData = () => {
    if (typeof userTemplateFields === "object") {
      return Object.keys(userTemplateFields).map((field, key) => {
        const item: {
          label: string;
          value: string;
        } = { label: "", value: "" };
        item.label = field;
        item.value = userTemplateFields[field] as string;
        return item;
      });
    }
    return [];
  };
  const inititalFormData = formatFormData();
  return (
    <div className="text-white">
       <EditorPortfolio
          initialData={inititalFormData}
          data={data}
        />
    </div>
  );
}
