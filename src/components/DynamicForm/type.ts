type InitialValues = {
  [k: string]: string | boolean | object | null;
};

type Validate = {
  message: string;
};

/*
HttpMonitorObjectFields
Miss: method, request_payload
APIMonitorObjectFields
Miss: api_public_key
*/

export type Field = {
  type:
    | "typeMonitor"
    | "text"
    | "password"
    | "number"
    | "checkbox"
    | "dropdown"
    | "multiSelect"
    | "autoCompleteMultiSelect"
    | "JSON"
    | "dynamicField"
    | "SQL";
  label: string;
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  validate?: Validate;
  options?: any[];
  columnWidth?: 12 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;
};

export type Form = {
  id: string | number;
  fields: Field[];
  initialValues?: InitialValues;
};
