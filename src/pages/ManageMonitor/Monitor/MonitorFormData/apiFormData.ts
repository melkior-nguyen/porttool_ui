import { Form } from "@/components/DynamicForm/type";

export const apiFormData: Form = {
  id: "API",
  initialValues: {
    typeMonitor: "API",
    pinOrder: false,
    name: "",
    // apiPublicKey: "",
    interval: "",
    timeout: "",
    retries: "",
  },
  fields: [
    {
      columnWidth: 12,
      type: "checkbox",
      label: "Arrange order your monitor",
      name: "pinOrder",
    },
    {
      columnWidth: 3,
      type: "dropdown",
      name: "typeMonitor",
      label: "Type Monitor",
      options: [],
    },
    {
      columnWidth: 9,
      type: "text",
      name: "name",
      label: "Name",
      validate: { message: "Name is required" },
    },
    // {
    //   columnWidth: 6,
    //   type: "text",
    //   name: "apiPublicKey",
    //   label: "api Public Key",
    //   validate: { message: "api Public Key is required" },
    // },
    {
      columnWidth: 4,
      type: "dropdown",
      name: "interval",
      label: "Interval",
      validate: { message: "Interval is required" },
      options: [],
    },
    {
      columnWidth: 4,
      type: "dropdown",
      name: "timeout",
      label: "Timeout",
      validate: { message: "Timeout is required" },
      options: [],
    },
    {
      columnWidth: 4,
      type: "dropdown",
      name: "retries",
      label: "Retries",
      validate: { message: "Retries is required" },
      options: [],
    },
  ],
};
