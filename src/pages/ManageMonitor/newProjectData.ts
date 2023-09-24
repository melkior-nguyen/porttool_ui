import { Form } from "@/components/DynamicForm/type";

export const newProjectData: Form = {
  id: "API",
  initialValues: {
    name: "",
    pinOrder: false,
  },
  fields: [
    {
      type: "checkbox",
      label: "Arrange order your monitor",
      name: "pinOrder",
    },
    {
      type: "text",
      name: "name",
      label: "Name",
      validate: { message: "Name is required" },
    },
  ],
};
