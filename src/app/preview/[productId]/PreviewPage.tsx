"use client";

import { TemplatePreview } from "@/components/TemplatePreview";
import { formatFormData, htmlParser } from "@/lib/utils";

export const PreviewPage = ({ 
    templateFields, 
    templateHtml
 }: {
    templateFields: any;
    templateHtml: string;
 }) => {
    const parsedFields = formatFormData(templateFields);
    const parsedHtml = htmlParser(templateHtml, parsedFields);
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <TemplatePreview src={parsedHtml} />
    </div>
  );
};
