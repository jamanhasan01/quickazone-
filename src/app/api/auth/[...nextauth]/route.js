// /src/app/api/auth/[...nextauth]/route.js

import { handlers } from "@/lib/auth/auth"; // <-- Import handlers
export const { GET, POST } = handlers; // <-- Export them