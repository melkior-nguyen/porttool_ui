import { ReactNode } from "react";

export type LanguageProps = {
  languageId: string;
  locale: string;
  name: string;
};

export type UserListProps = {
  id: number;
  name: string;
  image: string;
  skills: string[];
  information: string;
  email: string;
  phone: string;
  website: string;
  charge: number;
  readTime: string;
  shares: string;
  retweets: string;
  topic: string;
};

export type RouterConfigData = {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  iconDynamic?: string | ReactNode;
  type: string;
  children?: RouterConfigData[];
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
  noTranslate?: boolean;
};
