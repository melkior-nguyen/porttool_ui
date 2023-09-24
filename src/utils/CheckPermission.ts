import { env } from "@/types";

export const isDisableAction = (hasPermisson: boolean) => {
  return !(env.VITE_ENABLE_CONFIG_PERMISSON_FROM_FE === "true" || hasPermisson);
};
