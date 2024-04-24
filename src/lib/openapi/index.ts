import createClient from "openapi-fetch";
import type { paths } from "@lib/openapi/schema";
import { publicEnv } from "@/constants/env";

const client = createClient<paths>({ baseUrl: publicEnv.BASE_URL });
export default client;
