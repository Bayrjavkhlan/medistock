const constants = {
  AUTH_TOKEN_KEY: "auth-token",
  REFRESH_TOKEN_KEY: "refresh-token",
};

const LOCAL_GRAPHQL_URL = "http://localhost:4000/api/graphql";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const toGraphqlUrl = (value: string) =>
  value.endsWith("/api/graphql")
    ? value
    : `${trimTrailingSlash(value)}/api/graphql`;

export const getClientGraphqlUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!url) {
    if (process.env.NODE_ENV === "development") {
      return LOCAL_GRAPHQL_URL;
    }

    if (typeof window !== "undefined") {
      throw new Error("production орчинд NEXT_PUBLIC_GRAPHQL_URL шаардлагатай");
    }

    return "";
  }

  return toGraphqlUrl(url);
};

export const getServerGraphqlUrl = () => {
  console.log("GRAPHQL_URL:", !!process.env.GRAPHQL_URL);
  console.log(
    "NEXT_PUBLIC_GRAPHQL_URL:",
    !!process.env.NEXT_PUBLIC_GRAPHQL_URL,
  );

  const url =
    process.env.GRAPHQL_URL ||
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!url) {
    if (process.env.NODE_ENV === "development") {
      return LOCAL_GRAPHQL_URL;
    }

    throw new Error(
      "GraphQL URL тохируулагдаагүй байна. Vercel дээр GRAPHQL_URL эсвэл NEXT_PUBLIC_GRAPHQL_URL тохируулна уу.",
    );
  }

  return toGraphqlUrl(url);
};

export const env = {
  ...constants,
};
