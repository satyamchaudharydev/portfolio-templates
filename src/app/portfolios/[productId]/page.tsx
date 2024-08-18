import { formatFormData } from "@/lib/utils";
import { getOrderItemDetails } from "./action";
import EditorPortfolio from "./EditorPortfolio";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {

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
  
  const inititalFormData = formatFormData(userTemplateFields);
  return (
    <div className="text-white">
       <EditorPortfolio
          initialData={inititalFormData}
          data={data}
        />
    </div>
  );
}
