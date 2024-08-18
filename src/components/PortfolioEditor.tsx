"use client";

import { Prisma } from "@prisma/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { useState, useMemo } from "react";

interface FormField {
  label: string;
  value: string;
}

interface PortfolioEditorProps {
  fields: FormField[]; 
  templateHtml: string;  
  handleChange: (index: number, value: string) => void; 
}


export const PortfolioEditor = ({ fields, templateHtml, handleChange }: PortfolioEditorProps) => {

  // Memoize the parsed HTML with placeholders replaced by field values
  const parsedHtml = useMemo(() => {
    let parsedHtml = templateHtml;
    fields.forEach((field) => {
      const regex = new RegExp(`{${field.label}}`, "g");
      parsedHtml = parsedHtml.replace(regex, field.value || "");
    });
    return parsedHtml;
  }, [fields, templateHtml]); 

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <iframe 
          srcDoc={parsedHtml} 
          className="w-full h-full" 
          title="Portfolio Preview"
          style={{
            background: "#fff"
          }}
        />
      </ResizablePanel>

      <ResizableHandle className="bg-[#252525]" />

      <ResizablePanel>
        <form className="p-4 flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={index} className="form-group flex flex-col">
              <label htmlFor={`field-${index}`}>{field.label}</label>
              <input
                id={`field-${index}`}
                type="text"
                value={field.value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="p-2 rounded-[8px] mt-2 text-primary"
              />
            </div>
          ))}
        </form>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
