import {
  Box,
  Chip,
  Grid,
  Button,
  Select,
  Switch,
  Checkbox,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import * as yup from "yup";
import get from "lodash/get";
import AddIcon from "@mui/icons-material/Add";
import JSONEditor from "react-json-editor-ajrm";
import AppGridContainer from "../AppGridContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import PasswordField from "./components/PasswordField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AppTextField from "../AppFormComponents/AppTextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useCallback, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { locale } from "@/components/DynamicForm/locale";
import { Field as FieldType, Form as FormType } from "./type";
import CodeMirror from "@uiw/react-codemirror";
import jsBeautify from "js-beautify";
import xmlFormat from "xml-formatter";
import {
  extensionsJSON,
  extensionsXML,
  extensionsSQL,
  codeMirrorTheme,
} from "./utils";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DynamicForm = ({
  formsData,
  handleSubmit,
  handleChangeFormData,
  handleFieldChangeValue,
  isDisableFields,
  isDisableSubmit,
  txtSubmit,
}: {
  formsData: FormType;
  handleSubmit: (
    value: { [k: string]: string | boolean },
    setSubmitting: (value: boolean) => void
  ) => void;
  handleChangeFormData?: (formData: any) => void;
  handleFieldChangeValue?: (formData: any, field: string, value: any) => void;
  isDisableFields?: boolean;
  isDisableSubmit?: boolean;
  txtSubmit?: string;
}) => {
  const fields = get(formsData, ["fields"]);
  const initialValues = get(formsData, ["initialValues"]);
  const [valueEditor, setValueEditor] = useState<any>("text");
  const [typeEditor, setTypeEditor] = useState<any>(undefined);

  const validateSchema: { [k: string]: any } = {};
  fields.map((item) => {
    if (item.validate) {
      switch (item.type) {
        case "text":
        case "password":
        case "SQL":
        case "JSON":
          validateSchema[item.name] = yup
            .string()
            .required(item.validate.message);
          break;
        case "number":
          validateSchema[item.name] = yup
            .number()
            .moreThan(-1, "Number must be non-negative");
          break;
        case "dropdown":
          validateSchema[item.name] = yup
            .object()
            .required(item.validate.message)
            .nullable();
          break;
        case "multiSelect":
        case "autoCompleteMultiSelect":
          validateSchema[item.name] = yup.array().min(1, item.validate.message);
          break;
        case "checkbox":
          validateSchema[item.name] = yup
            .boolean()
            .oneOf([true], item.validate.message);
          break;
        case "dynamicField":
          validateSchema[item.name] = yup
            .array()
            .of(
              yup.object().shape({
                key: yup.string().required("Header Key is required"),
                value: yup.string().required("Header Value is required"),
              })
            )
            .min(1, "Please add at least one field");
          break;
      }
    }
  });

  const validationSchema = yup.object(validateSchema);

  const renderField = useCallback(
    (
      fieldItem: FieldType,
      values: any,
      errors: any,
      touched: any,
      handleChange: any,
      setFieldValue: any
    ) => {
      switch (fieldItem.type) {
        case "text":
          return (
            <AppTextField
              label={fieldItem.label}
              name={fieldItem.name}
              variant="outlined"
              sx={{ width: "100%" }}
              disabled={isDisableFields}
            />
          );
        case "password":
          return (
            <PasswordField fieldItem={fieldItem} disabled={isDisableFields} />
          );
        case "number":
          return (
            <AppTextField
              label={fieldItem.label}
              name={fieldItem.name}
              variant="outlined"
              type="number"
              sx={{ width: "100%" }}
              disabled={isDisableFields}
            />
          );
        case "dropdown":
          return (
            <FormControl
              fullWidth
              error={
                (errors[fieldItem.name] && touched[fieldItem.name]) || false
              }
            >
              <InputLabel id="demo-simple-select-label">
                {fieldItem.label}
              </InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={fieldItem.label}
                name={fieldItem.name}
                // value={values[fieldItem.name]}
                value={
                  fieldItem?.options?.find(
                    (option) =>
                      JSON.stringify(option) ===
                      JSON.stringify(values[fieldItem.name])
                  ) || ""
                }
                disabled={isDisableFields || fieldItem.disabled}
                onChange={(event: SelectChangeEvent) => {
                  if (
                    fieldItem.name === "typeMonitor" &&
                    typeof handleChangeFormData === "function"
                  ) {
                    handleChange(event);
                    handleChangeFormData(event.target.value);
                  } else {
                    handleChange(event);
                  }
                  if (typeof handleFieldChangeValue === "function")
                    handleFieldChangeValue(
                      formsData,
                      fieldItem.name,
                      event.target.value
                    );
                }}
                error={Boolean(
                  errors[fieldItem.name] && touched[fieldItem.name]
                )}
              >
                {fieldItem?.options?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item}>
                    {typeof item === "object" ? item.name : item}
                  </MenuItem>
                ))}
              </Select>
              {errors[fieldItem.name] && touched[fieldItem.name] && (
                <FormHelperText error>{errors[fieldItem.name]}</FormHelperText>
              )}
            </FormControl>
          );
        case "multiSelect":
          return (
            <FormControl
              fullWidth
              error={
                (errors[fieldItem.name] && touched[fieldItem.name]) || false
              }
            >
              <InputLabel>{fieldItem.label}</InputLabel>
              <Select
                multiple
                sx={{ textAlign: "left" }}
                labelId="demo-multi-select-label"
                id="demo-multi-select"
                label={fieldItem.label}
                name={fieldItem.name}
                value={values[fieldItem.name] || []}
                onChange={(event: any) => {
                  const { value } = event.target;
                  setFieldValue(fieldItem.name, value);
                }}
                error={Boolean(
                  errors[fieldItem.name] && touched[fieldItem.name]
                )}
                disabled={isDisableFields}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value: any, index: number) => (
                      <Chip
                        key={index}
                        label={typeof value === "object" ? value.name : value}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                        }}
                        onDelete={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          const newValue = values[fieldItem.name].filter(
                            (item: any) => item !== value
                          );
                          setFieldValue(fieldItem.name, newValue);
                        }}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    ))}
                  </div>
                )}
              >
                {fieldItem.options &&
                  fieldItem.options.map((option: any, index: number) => (
                    <MenuItem key={index} value={option}>
                      {typeof option === "object" ? option.name : option}
                    </MenuItem>
                  ))}
              </Select>
              {errors[fieldItem.name] && touched[fieldItem.name] && (
                <FormHelperText error>{errors[fieldItem.name]}</FormHelperText>
              )}
            </FormControl>
          );
        case "autoCompleteMultiSelect":
          return (
            <FormControl
              fullWidth
              error={
                (errors[fieldItem.name] && touched[fieldItem.name]) || false
              }
            >
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={fieldItem?.options as any}
                disableCloseOnSelect
                getOptionLabel={(option: any) =>
                  typeof option === "object" ? option.name : option
                }
                onChange={(e, value) => {
                  setFieldValue(fieldItem.name, value);
                }}
                disabled={isDisableFields}
                value={values[fieldItem.name] || []}
                renderOption={(props, option) => {
                  const checked = values[fieldItem.name]?.some(
                    (item: any) =>
                      (typeof item === "object" ? item.name : item) ===
                      (typeof option === "object" ? option.name : option)
                  );
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        onChange={(e) => {
                          if (checked) {
                            const updatedValues = values[
                              fieldItem.name
                            ]?.filter(
                              (item: any) =>
                                (typeof item === "object"
                                  ? item.name
                                  : item) !==
                                (typeof option === "object"
                                  ? option.name
                                  : option)
                            );
                            setFieldValue(fieldItem.name, updatedValues);
                          } else {
                            const updatedValues = [
                              ...values[fieldItem.name],
                              option,
                            ];
                            setFieldValue(fieldItem.name, updatedValues);
                          }
                        }}
                        checked={checked}
                      />
                      {typeof option === "object" ? option.name : option}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={fieldItem.label}
                    name={fieldItem.name}
                  />
                )}
              />
              {errors[fieldItem.name] && touched[fieldItem.name] && (
                <FormHelperText error>{errors[fieldItem.name]}</FormHelperText>
              )}
            </FormControl>
          );
        case "checkbox":
          return (
            <FormControl
              error={
                (errors[fieldItem.name] && touched[fieldItem.name]) || false
              }
            >
              <Field name={fieldItem.name}>
                {({ field, form }: any) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value}
                        disabled={isDisableFields}
                        onChange={(e) => {
                          if (typeof handleFieldChangeValue === "function")
                            handleFieldChangeValue(
                              formsData,
                              field.name,
                              e.target.checked
                            );
                          form.setFieldValue(field.name, e.target.checked);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={fieldItem.label}
                  />
                )}
              </Field>
              {errors[fieldItem.name] && touched[fieldItem.name] && (
                <FormHelperText error>{errors[fieldItem.name]}</FormHelperText>
              )}
            </FormControl>
          );
        case "SQL": {
          return (
            <>
              <FormControl
                fullWidth
                error={
                  (errors[fieldItem.name] && touched[fieldItem.name]) || false
                }
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <InputLabel sx={{ display: "contents" }}>
                    {fieldItem.label}
                  </InputLabel>
                </Box>
                <CodeMirror
                  value={values[fieldItem.name]}
                  height="150px"
                  theme={codeMirrorTheme}
                  extensions={extensionsSQL}
                  onChange={(value) => {
                    setFieldValue(fieldItem.name, value);
                  }}
                />
                {errors[fieldItem.name] && touched[fieldItem.name] && (
                  <FormHelperText error>
                    {errors[fieldItem.name]}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          );
        }
        case "JSON":
          return (
            <FormControl fullWidth>
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InputLabel sx={{ display: "contents" }}>
                    {fieldItem.label}
                  </InputLabel>
                </Box>
                {(valueEditor === "json" || valueEditor === "xml") &&
                  values[fieldItem.name] && (
                    <Button
                      onClick={() => {
                        if (valueEditor === "xml") {
                          setFieldValue(
                            fieldItem.name,
                            xmlFormat(values[fieldItem.name], {
                              indentation: "  ",
                              filter: (node) => node.type !== "Comment",
                              collapseContent: true,
                              lineSeparator: "\n",
                            })
                          );
                        }
                        if (valueEditor === "json") {
                          setFieldValue(
                            fieldItem.name,
                            jsBeautify(values[fieldItem.name], {
                              indent_size: 2,
                              preserve_newlines: false,
                            })
                          );
                        }
                      }}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Format Code
                    </Button>
                  )}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Type Editor
                    </InputLabel>
                    <Select
                      label="Type Editor"
                      value={valueEditor}
                      onChange={(event) => {
                        setValueEditor(event.target.value);
                        setFieldValue(fieldItem.name, "");
                        switch (event.target.value) {
                          case "text": {
                            setTypeEditor(undefined);
                            break;
                          }
                          case "json": {
                            setTypeEditor(extensionsJSON);
                            break;
                          }
                          case "xml": {
                            setTypeEditor(extensionsXML);
                            break;
                          }
                        }
                      }}
                    >
                      <MenuItem value={"text"}>Text</MenuItem>
                      <MenuItem value={"json"}>JSON</MenuItem>
                      <MenuItem value={"xml"}>XML</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <CodeMirror
                value={values[fieldItem.name]}
                height="150px"
                theme={codeMirrorTheme}
                extensions={typeEditor}
                onChange={(value) => {
                  setFieldValue(fieldItem.name, value);
                }}
              />
              {/* <Field name={fieldItem.name}>
                {({ field, form }: any) => (
                  <JSONEditor
                    height="230px"
                    width="100%"
                    locale={locale}
                    placeholder={field.value || {}}
                    onChange={(value: any) => {
                      if (value.error) {
                        return form.setFieldValue(field.name, "");
                      } else {
                        return form.setFieldValue(field.name, value.jsObject);
                      }
                    }}
                  />
                )}
              </Field> */}
              {errors[fieldItem.name] && touched[fieldItem.name] && (
                <FormHelperText error>{errors[fieldItem.name]}</FormHelperText>
              )}
            </FormControl>
          );
        case "dynamicField":
          return (
            <FieldArray name={fieldItem.name}>
              {({ push, remove }) => (
                <FormControl fullWidth>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <InputLabel sx={{ display: "contents" }}>
                      {fieldItem.label}
                    </InputLabel>
                  </Box>
                  <AppGridContainer sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={2}
                      sx={{ my: 1 }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        Header Key
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                      >
                        Header Value
                      </Grid>
                    </Grid>
                    {values[fieldItem.name]?.map((item: any, index: number) => (
                      <Grid
                        key={index}
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        sx={{ my: 1 }}
                      >
                        <Grid item xs={12} md={5}>
                          <AppTextField
                            label="Header Key"
                            name={`${fieldItem.name}[${index}].key`}
                            variant="outlined"
                            sx={{ width: "100%" }}
                            disabled={isDisableFields}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <AppTextField
                            label="Header Value"
                            name={`${fieldItem.name}[${index}].value`}
                            variant="outlined"
                            sx={{ width: "100%" }}
                            disabled={isDisableFields}
                          />
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Box
                            sx={{
                              mt: 0.75,
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </AppGridContainer>
                  <Box sx={{ display: "block" }}>
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        push({ key: "", value: "" });
                      }}
                    >
                      Add Request Headers
                    </Button>
                  </Box>
                </FormControl>
              )}
            </FieldArray>
          );
      }
    },
    [
      handleChangeFormData,
      handleFieldChangeValue,
      formsData,
      isDisableFields,
      typeEditor,
      valueEditor,
    ]
  );

  return (
    <Formik
      validateOnChange={true}
      initialValues={initialValues ?? {}}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(data, { setSubmitting }) => {
        handleSubmit(data as any, setSubmitting);
      }}
    >
      {({
        values,
        isSubmitting,
        errors,
        touched,
        handleChange,
        setFieldValue,
      }) => (
        <Form>
          <AppGridContainer>
            <Grid container rowSpacing={2} columnSpacing={1}>
              {fields.map((fieldItem, index) => (
                <Grid key={index} item xs={12} md={fieldItem.columnWidth || 12}>
                  {!fieldItem.hidden && (
                    <Box>
                      {renderField(
                        fieldItem,
                        values,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue
                      )}
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </AppGridContainer>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isDisableSubmit || isSubmitting}
              sx={{
                mt: 4,
                width: "200px",
                fontWeight: 700,
                textTransform: "capitalize",
                height: 44,
              }}
            >
              {txtSubmit ?? "Submit"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
