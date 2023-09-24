import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Placeholder from "@/assets/images/placeholder_default.jpg";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import * as yup from "yup";
import { debounce } from "lodash";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatchResolve } from "@/utils/Hooks";
import { getUserInfoMonitor } from "@/store/monitor/action";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const validationSchema = yup.object({
  email: yup.object().required("Member is required"),
  role: yup.string().required("Role is required"),
});

const QUERY_FIND_ACCOUNT = gql`
  query FindAccount($projectId: ID!, $query: String!) {
    findAccount(projectId: $projectId, query: $query) {
      id
      avatar
      fullName
      username
    }
  }
`;

const MUTATION_EDIT_OFFICE = gql`
  mutation CreateOrUpdateProject($project: ProjectInput) {
    createOrUpdateProject(project: $project) {
      message
      ok
    }
  }
`;

const regexEmail = /\S+@\S+\.\S+/;

const AddMember = ({ currentProject, handleCloseEditProject }: any) => {
  const dispatchResolve = useDispatchResolve();
  const [fetchData, { loading, data }] = useLazyQuery(QUERY_FIND_ACCOUNT);
  const [openMember, setOpenMember] = useState(false);
  const [valueInput, setValueInput] = useState<any>();
  const [opionsAccount, setOpionsAccount] = useState([]);
  const [optionEmail, setOptionEmail] = useState<any>([]);

  const [mutationCreateOrUpdateProject] = useMutation(MUTATION_EDIT_OFFICE, {
    onError(err) {
      toast(err?.message, { type: "error" });
    },
    onCompleted(data) {
      data && toast("Edit successfully", { type: "success" });
      typeof handleCloseEditProject === "function" && handleCloseEditProject();
      dispatchResolve(getUserInfoMonitor());
    },
  });

  const debounceDelay = 300;

  const handleInputChange = debounce((text) => {
    if (regexEmail.test(text)) {
      setOptionEmail([{ id: text, username: text, isEmail: true }]);
    } else {
      setOptionEmail([]);
    }
    setValueInput(undefined);
    fetchData({
      variables: { projectId: currentProject?.id, query: text },
    });
  }, debounceDelay);

  useEffect(() => {
    if (data) {
      setOpionsAccount(data.findAccount);
    }
  }, [data]);

  return (
    <Formik
      initialValues={{
        email: "",
        role: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const emailValue = values.email as any;
        if (!emailValue) return;
        const valueMember = emailValue.isEmail
          ? { email: emailValue.id }
          : { userId: emailValue.id };
        setSubmitting(true);
        await mutationCreateOrUpdateProject({
          variables: {
            project: {
              id: currentProject?.id,
              members: [
                {
                  role: (values as any).role,
                  ...valueMember,
                },
              ],
            },
          },
        });
        setSubmitting(false);
      }}
    >
      {({
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form>
          <FormControl fullWidth>
            <Autocomplete
              id="asynchronous-demo"
              open={openMember}
              onOpen={() => setOpenMember(true)}
              onClose={() => setOpenMember(false)}
              isOptionEqualToValue={(option: any, value: any) =>
                option.username === value.username
              }
              getOptionLabel={(option) => option.username}
              options={opionsAccount?.length > 0 ? opionsAccount : optionEmail}
              loading={loading}
              freeSolo
              onChange={(event, value) => {
                setValueInput(value || (event.target as any).value);
                setFieldValue("email", value || (event.target as any).value);
              }}
              onInputChange={(event, value) => {
                handleInputChange(value);
                setFieldValue("email", undefined);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Member"
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => {
                return (
                  <Box {...(props as any)} key={Math.random()}>
                    {option ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ mr: 1 }}
                          aria-haspopup="true"
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              border: "1px solid rgb(204, 204, 204)",
                            }}
                            src={option?.avatar || Placeholder}
                          />
                        </IconButton>
                        <Box sx={{ textAlign: "left" }}>
                          <Box sx={{ fontSize: "14px" }}>
                            {option?.username}
                          </Box>
                          <Box sx={{ fontSize: "16px" }}>
                            {option?.fullName}
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ mr: 1 }}
                          aria-haspopup="true"
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              border: "1px solid rgb(204, 204, 204)",
                            }}
                            src={option?.avatar || Placeholder}
                          />
                        </IconButton>
                        <Box>{option?.email}</Box>
                      </Box>
                    )}
                  </Box>
                );
              }}
            />
          </FormControl>
          <Box sx={{ mt: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
                name="role"
                value={(values as any).role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.role && touched.role)}
              >
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
                <MenuItem value={"MODIFY"}>Modify</MenuItem>
                <MenuItem value={"READ"}>Read</MenuItem>
              </Select>
              {errors.role && touched.role && (
                <FormHelperText error>{errors.role}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              sx={{
                mt: 4,
                width: "200px",
                fontWeight: 700,
                textTransform: "capitalize",
                height: 44,
              }}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddMember;
