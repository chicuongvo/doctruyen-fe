import { format, parseISO } from "date-fns";

export const formatDate = (date: string) => {
  try {
    return format(parseISO(date), "MMM d, yyyy");
  } catch (error) {
    return date;
  }
};

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9-]/g, "-") 
    .replace(/-+/g, "-") 
    .replace(/^-|-$/g, ""); 
};