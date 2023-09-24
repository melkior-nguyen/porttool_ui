import { toast } from "react-toastify";

const buildToastOption = (content: any, options = {}) => {
  const toastId =
    typeof content === "string" ? content : content?.toString() ?? undefined;
  return {
    toastId: `${toastId}${Math.random()}`,
    ...options,
  };
};

export default {
  toastSuccess: (content: any, options?: any) =>
    toast.success(content, buildToastOption(content, options)),
  toastInfo: (content: any, options?: any) =>
    toast.info(content, buildToastOption(content, options)),
  toastWarning: (content: any, options?: any) =>
    toast.warning(content, buildToastOption(content, options)),
  toastError: (content: any, options?: any) =>
    toast.error(content, buildToastOption(content, options)),
};
