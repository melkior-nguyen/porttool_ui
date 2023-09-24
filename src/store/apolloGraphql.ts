import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { env } from "@/types";
import Global from "@/utils/Global";

const AppConfigs = {
  rootAPI: env.VITE_URL,
};

const httpLink = new HttpLink({
  uri: AppConfigs.rootAPI,
});

const authLink = setContext((_: any, { headers, ...context }: any) => {
  const token = localStorage.getItem("jwtToken");
  const deviceId = localStorage.getItem(
    env.VITE_HEADER_DEVICE_ID.toString().toLowerCase()
  );
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(deviceId ? { [env.VITE_HEADER_DEVICE_ID]: deviceId } : {}),
    },
    ...context,
  };
});

const uploadHttpLink = new (createUploadLink as any)({
  uri: AppConfigs.rootAPI,
});
// const uploadLink = from([authLink, uploadHttpLink]);

const errorLink = new ErrorLink(({ graphQLErrors, operation, forward }) => {
  const { response } = operation.getContext();
  if (response?.status === 401) {
    const naivigate = Global.UseNavigate.get();
    if (naivigate) {
      window.localStorage.removeItem("jwtToken");
      window.localStorage.removeItem("jwt");
      naivigate("/signin");
    }
  }
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      switch (error?.extensions?.code) {
        case "UNAUTHENTICATED":
          return forward(operation);
      }
    }
  }
});

const checkExpireTokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const messgeExpire = "Error decoding signature";
    const messageLoginAgain =
      "To perform this action, Please login your account again.";
    const messageSignatureHasExpired = "Signature has expired";
    if (
      response &&
      response.errors &&
      (response.errors[0].message === messgeExpire ||
        response.errors[0].message === messageLoginAgain ||
        response.errors[0].message === messageSignatureHasExpired)
    ) {
      const naivigate = Global.UseNavigate.get();
      if (naivigate) {
        window.localStorage.removeItem("jwtToken");
        window.localStorage.removeItem("jwt");
        naivigate("/signin");
      }
    }
    return response;
  });
});

// After the backend responds, we take the refreshToken from headers if it exists, and save it in the cookie.
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    if (
      headers &&
      !localStorage.getItem(env.VITE_HEADER_DEVICE_ID.toString().toLowerCase())
    ) {
      const deviceId = headers.get(env.VITE_HEADER_DEVICE_ID);
      if (deviceId) {
        localStorage.setItem(
          env.VITE_HEADER_DEVICE_ID.toString().toLowerCase(),
          deviceId
        );
      }
    }

    return response;
  });
});

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    afterwareLink,
    uploadHttpLink,
    checkExpireTokenLink,
    httpLink,
  ]),
  cache: new InMemoryCache({
    typePolicies: {},
    addTypename: false,
  }),
});

const mutate = async (queryString: any, variables = {}, headers = {}) => {
  const queryBody = queryString?.loc?.source?.body;
  try {
    if (process.env.NODE_ENV === "development") {
      console.info("***** GraphQL mutation", {
        queryString: queryBody,
        variables,
        headers,
      });
    }
    const response = await client.mutate({
      mutation: queryString,
      variables,
      context: {
        headers,
      },
      fetchPolicy: "network-only",
    });
    if (process.env.NODE_ENV === "development") {
      console.info("***** GraphQL mutation response", response);
    }
    return response;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.info("***** GraphQL mutation error", {
        queryString: queryBody,
        variables,
        headers,
        error,
      });
    }
    if (error?.networkError) {
      throw [
        { message: error?.networkError?.message || "internalServerError" },
      ];
    }
    if (error && error?.graphQLErrors?.length) {
      throw error.graphQLErrors;
    }
    throw error;
  }
};

const query = async (queryString: any, variables = {}, headers = {}) => {
  const queryBody = queryString?.loc?.source?.body;
  try {
    if (process.env.NODE_ENV === "development") {
      console.info("***** GraphQL query", {
        queryString: queryBody,
        variables: variables,
        headers,
      });
    }
    const response = await client.query({
      query: queryString,
      variables,
      context: {
        headers,
      },
      fetchPolicy: "network-only",
    });
    if (process.env.NODE_ENV === "development") {
      console.info("***** GraphQL query response", response);
    }
    return response;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.info("***** GraphQL query error", {
        queryString: queryBody,
        variables: variables,
        headers,
        error,
      });
    }
    if (error?.networkError?.result?.errors) {
      throw error?.networkError?.result?.errors;
    }
    if (error?.networkError) {
      throw [
        {
          message: error?.message || "internalServerError",
        },
      ];
    }
    if (error && error?.graphQLErrors?.length) {
      throw error.graphQLErrors;
    }
    if (error && error?.clientErrors?.length) {
      throw error.clientErrors;
    }
    throw error;
  }
};

export { client, mutate, query };
