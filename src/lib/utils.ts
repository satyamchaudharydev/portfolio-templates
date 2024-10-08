import { FormField } from "@/components/PortfolioEditor"
import { CartItemProps } from "@/components/cart/CartItem"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getTotalQuantity = (data: CartItemProps[]) => {
    if (!data) return 0
    return data.reduce((acc, item) => acc + item.quantity, 0)
  }
export const getTotalPrice = (data: CartItemProps[], discount?: number) => {
    if (!data || data.length === 0) return 0;
  
    // Calculate the total price of items
    let total = data.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
    // Apply discount if present
    if (discount) {
        total = total * (1 - discount / 100); // Apply percentage discount
    }
  
    // Ensure total doesn't go below zero
    return Math.max(total, 0);
  };
  

export const discounts = [
  {
    code: "SUMMER20",
    type: "percent", // or "fixed"
    value: 20, // 20% off
  },
  {
    code: "WELCOME10",
    type: "percent",
    value: 10, // 10% off
  },
  {
    code: "SAVE50",
    type: "fixed",
    value: 50, // $50 off
  },
  {
    code: "HALFPRICE",
    type: "percent",
    value: 50, // 50% off
  },
];

// parse html string

export const htmlParser = (html: string, fields: FormField[] ) => {
  let parsedHtml = html;
    fields.forEach((field) => {
      const regex = new RegExp(`{${field.label}}`, "g");
      parsedHtml = parsedHtml.replace(regex, field.value || "");
    });
    return parsedHtml;
}

export const formatFormData = (fields: any) => {
  if (typeof fields === "object") {
    return Object.keys(fields).map((field, key) => {
      const item: {
        label: string;
        value: string;
      } = { label: "", value: "" };
      item.label = field;
      item.value = fields[field] as string;
      return item;
    });
  }
  return [];
};