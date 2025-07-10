import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};
export type UserRole = keyof typeof USER_ROLE;

export type Product = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  price: number;
  regular_price: number;
  product_code: string;
  brand: string;
  model: string;
  category: string;
  image: string;
  description: string;
  status: string;
  isDeleted: boolean;
  key_features: string[];
  specification: {
    main_features?: Record<string, string>;
    physical_attribute?: Record<string, string>;
    warranty_information?: Record<string, string>;
  };
  question: string[]; // or define a type if known
  reviews: string[]; // or define a type if known
  createdAt: string;
  updatedAt: string;
};

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  child?: DrawerItem[];
}
export type ResponseSuccessType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: IMeta;
};
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage;
};
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
