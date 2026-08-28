import { getAuth } from "firebase/auth";
import createClient, { Middleware } from "openapi-fetch";

import { publicEnv } from "@/constants/env";
import { firebaseApp } from "@lib/firebase";
import type { paths } from "@lib/openapi/schema";

const authInterceptor: Middleware = {
  async onRequest(req) {
    const auth = getAuth(firebaseApp);
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) {
      return req;
    }
    req.headers.set("Authorization", `Bearer ${idToken}`);
    return req;
  },
};

const client = createClient<paths>({ baseUrl: publicEnv.API_URL });

client.use(authInterceptor);

export default client;
