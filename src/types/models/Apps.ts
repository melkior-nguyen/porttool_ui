import { ReactNode } from "react";
import { RoutePermittedRole } from "../../constants/AppEnums";

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
