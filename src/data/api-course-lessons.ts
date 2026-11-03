import type { ApiExample, ApiLessonData, ApiSection } from "./api-lessons";

type Chapter = {
  number: number;
  slug: string;
  title: string;
  description: string;
  objectives: string[];
  notes: string[];
  example: ApiExample;
  exercise: {
    tasks: string[];
    solution: ApiExample;
  };
  mistakes: string[];
  takeaway: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  extraSections?: ApiSection[];
};

function example(
  filename: string,
  code: string,
  command: string,
  expected: string,
  explanation: string,
): ApiExample {
  return {
    title: "Worked example",
    filename,
    code,
    command,
    expected,
    explanation,
  };
}

function chapter(data: Chapter): ApiLessonData {
  return {
    number: data.number,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: {
      introduction: data.description,
      objectives: data.objectives,
      sections: [
        {
          title: "Concepts and approach",
          paragraphs: data.notes,
          table: data.table,
        },
        ...(data.extraSections ?? []),
        {
          title: "Worked example",
          paragraphs: [],
          example: data.example,
        },
      ],
      mistakes: data.mistakes,
      exercise: {
        title: `Practice: ${data.title}`,
        tasks: data.exercise.tasks,
        solution: data.exercise.solution,
      },
      takeaway: data.takeaway,
    },
  };
}

const authenticationSections: ApiSection[] = [
  {
    title: "Authentication and authorization",
    paragraphs: [
      "Authentication verifies who or what is making a request. Authorization determines which resources and operations that caller can access.",
      "For example, Alice can successfully authenticate but must still be prevented from reading or deleting Bob's private orders.",
      "An API key may identify an application rather than an individual user. Understand the identity represented by each credential before designing tests.",
    ],
  },
  {
    title: "Authentication mechanisms at a glance",
    paragraphs: [
      "Use the mechanism documented by the API. Selecting an authentication option in an API client does not make the server support it.",
    ],
    table: {
      headers: ["Mechanism", "How it works", "Typical request"],
      rows: [
        [
          "Basic",
          "Sends an encoded username and password.",
          "Authorization: Basic <encoded-credentials>",
        ],
        [
          "API key",
          "Sends a key identifying an application or caller.",
          "X-API-Key: <key>",
        ],
        [
          "Bearer token",
          "Possession of the token allows access within its permissions.",
          "Authorization: Bearer <token>",
        ],
        [
          "OAuth 1.0",
          "Supports delegated access using authenticated requests, commonly with signatures.",
          "Authorization: OAuth <OAuth parameters>",
        ],
        [
          "OAuth 2.0",
          "Defines flows for obtaining access tokens with granted permissions.",
          "Often Authorization: Bearer <access-token>",
        ],
        [
          "Session cookie",
          "Sends a cookie associated with a server-side session.",
          "Cookie: sessionId=<session-id>",
        ],
        [
          "Mutual TLS",
          "Authenticates the client using a certificate during TLS.",
          "Client certificate configured for the API host.",
        ],
      ],
    },
  },
  {
    title: "Basic authentication",
    paragraphs: [
      "Basic authentication encodes username:password using Base64 and sends it in the Authorization header. Base64 is reversible encoding, not encryption. Use HTTPS.",
      "For an API supporting Basic authentication, configure its Basic Auth option with username and password variables. Let the client construct the header.",
    ],
    bullets: [
      "Valid credentials: verify the expected response and caller identity.",
      "Wrong password: verify rejection.",
      "Missing credentials: verify rejection.",
      "Disabled account: verify access is denied according to the contract.",
      "Avoid a manually entered Authorization header alongside generated authentication.",
    ],
  },
  {
    title: "API key authentication",
    paragraphs: [
      "An API key is issued to a caller or application. Its header name and permitted operations are defined by the service.",
      "For example, configure an API Key entry with key X-API-Key, value {{apiKey}}, and placement Header when the API contract requires that header.",
      "Some services accept query-string keys. Follow the contract, but remember that URLs can appear in logs and browser history.",
    ],
    bullets: [
      "Valid key: verify permitted access.",
      "Missing or incorrect key: verify rejection.",
      "Revoked key: verify it no longer grants access.",
      "Restricted key: verify it cannot access operations outside its permissions.",
      "Key rotation: verify the replacement key and the documented retirement behavior of the old key.",
      "Do not assume every API key expires or uses the same error status.",
    ],
  },
  {
    title: "Bearer token authentication",
    paragraphs: [
      "A bearer token grants access to whoever possesses it, within its permissions. Send it using Authorization: Bearer <token>.",
      "In the API client's Bearer Token field, enter {{token}} without adding the word Bearer again.",
      "Our practice API issues an opaque token from POST /api/login. It is a local demonstration, not an OAuth authorization server.",
    ],
    bullets: [
      "Valid token: verify the expected caller and response.",
      "Missing or malformed token: verify rejection.",
      "Expired token: verify rejection after its actual expiry.",
      "Revoked token: test only when the service supports revocation.",
      "Another user's token: verify private resources remain inaccessible.",
      "Use HTTPS for real services and keep credentials out of shared exports and reports.",
    ],
  },
  {
    title: "Bearer tokens versus JWTs",
    paragraphs: [
      "Bearer describes how a token is used. JWT describes a token format. A bearer token can be a JWT or an opaque string.",
      "A signed JWT commonly contains header, payload, and signature segments. Decoding its payload does not verify the signature and does not prove that its claims are trustworthy.",
      "For JWT-based APIs, validation belongs on the server. Tests should verify rejection of tampered tokens, expired tokens, and tokens with an inappropriate issuer or audience.",
      "Do not treat every access token as a JWT. Our practice API's opaque tokens should not be passed to a JWT decoder.",
    ],
  },
  {
    title: "Session cookie authentication",
    paragraphs: [
      "A session-based API typically sets a cookie after login. The client sends that cookie on later requests, and the server uses it to identify the session.",
      "Use the API client's cookie jar and inspect Set-Cookie on login. Clear existing cookies before testing unauthenticated access.",
      "Browser cookie behavior also depends on attributes such as Secure, HttpOnly, SameSite, Domain, and Path. An API client alone cannot prove all browser protections work.",
    ],
    bullets: [
      "Login establishes the expected session.",
      "Requests without the session cookie are rejected.",
      "Expired or invalidated sessions no longer grant access.",
      "Logout invalidates the session according to the contract.",
      "One user's session cannot access another user's private data.",
      "For browser applications, test CSRF protections on state-changing requests.",
    ],
  },
  {
    title: "Mutual TLS authentication",
    paragraphs: [
      "With mutual TLS, the client presents a certificate during the TLS connection. Configure the client certificate and private key for the intended API host.",
      "The service may require an application credential as well as the client certificate.",
      "A missing, expired, or untrusted certificate can cause a TLS handshake failure before an HTTP response exists. Do not assume every authentication failure produces HTTP 401.",
    ],
    bullets: [
      "Trusted, valid client certificate: verify connection and permitted access.",
      "Missing or untrusted certificate: verify connection rejection.",
      "Expired certificate: verify rejection.",
      "Certificate identity: verify it maps to the intended caller.",
    ],
  },
  {
    title: "Authentication testing checklist",
    paragraphs: [
      "Choose the expected result from the API contract. Verify the response and confirm that rejected requests did not change protected data.",
    ],
    table: {
      headers: ["Scenario", "What to verify"],
      rows: [
        [
          "Valid credentials",
          "Expected success, correct caller, and correct response data.",
        ],
        [
          "Missing credentials",
          "Access is rejected without exposing protected data.",
        ],
        [
          "Invalid credentials",
          "Access is rejected with the documented error.",
        ],
        [
          "Expired credentials",
          "Access is rejected when the mechanism supports expiry.",
        ],
        [
          "Revoked credentials",
          "Access is rejected according to the documented revocation behavior.",
        ],
        [
          "Insufficient permissions",
          "The operation is denied; commonly 403, or 404 when existence is concealed.",
        ],
        [
          "Cross-user access",
          "A valid credential cannot access another user's private resources.",
        ],
        ["Rejected write", "Protected data remains unchanged."],
      ],
    },
  },
];

const oauthSections: ApiSection[] = [
  {
    title: "OAuth 1.0 versus OAuth 2.0",
    paragraphs: [
      "OAuth supports access delegation without giving a third-party application the user's password. OAuth 1.0 and OAuth 2.0 are separate protocols and are not backward-compatible.",
    ],
    table: {
      headers: ["Aspect", "OAuth 1.0", "OAuth 2.0"],
      rows: [
        [
          "Approach",
          "Authenticated requests, commonly using request signatures.",
          "Access tokens obtained through defined authorization flows.",
        ],
        [
          "Typical credentials",
          "Client credentials and, for delegated access, token credentials.",
          "Credentials vary by flow and client type.",
        ],
        [
          "Request handling",
          "Signing depends on request details and the selected signature method.",
          "Resource requests commonly carry bearer access tokens over HTTPS.",
        ],
        [
          "Testing focus",
          "Signatures, signed parameters, timestamps, and nonce replay handling where applicable.",
          "Flows, scopes, token expiry, audience, and permission enforcement.",
        ],
      ],
    },
  },
  {
    title: "Testing an OAuth 1.0 integration",
    paragraphs: [
      "Use the provider's documented signature method and credentials. Configure the client's OAuth 1.0 helper instead of manually inventing a signature.",
      "Common configuration includes consumer key, consumer secret, access token, and token secret. Exact requirements depend on the provider and signature method.",
      "Our local practice API does not implement OAuth 1.0.",
    ],
    bullets: [
      "Verify a correctly authenticated request succeeds.",
      "Verify an incorrect signature is rejected.",
      "For signed requests, change a signed parameter without recomputing the signature and verify rejection.",
      "Verify stale timestamps and repeated nonces are rejected where the provider uses them.",
      "Verify the granted access cannot exceed the user's permissions.",
    ],
  },
  {
    title: "OAuth 2.0 roles",
    paragraphs: [
      "The resource owner controls access to a resource. The client is the application requesting access. The authorization server issues tokens. The resource server is the API accepting those tokens.",
      "Successful token issuance does not prove that every API operation is allowed. Test the resource server's permission checks separately.",
    ],
  },
  {
    title: "OAuth 2.0 flows an SDET should understand",
    paragraphs: [
      "Select a flow appropriate to the client and the provider. For modern user-facing integrations, learn Authorization Code with PKCE. For trusted service-to-service clients, learn Client Credentials.",
      "Do not use the Resource Owner Password Credentials grant. Avoid the Implicit grant for new implementations.",
    ],
    table: {
      headers: ["Flow", "Typical use", "Testing focus"],
      rows: [
        [
          "Authorization Code with PKCE",
          "An application accesses resources after user authorization.",
          "Redirect URI validation, PKCE verification, authorization response correlation, consent, and scopes.",
        ],
        [
          "Client Credentials",
          "A confidential service acts on its own behalf.",
          "Client authentication, granted application permissions, and token expiry.",
        ],
        [
          "Refresh Token",
          "A client obtains another access token when refresh is supported.",
          "Invalid or revoked refresh tokens and rotation/reuse handling where configured.",
        ],
      ],
    },
  },
  {
    title: "Authorization Code with PKCE: practice checklist",
    paragraphs: [
      "Use a provider test tenant and a registered application. Obtain the authorization URL, token URL, client ID, permitted redirect URI, and scopes from that provider.",
      "Configure Authorization Code with PKCE using S256. Complete the browser authorization step, then use the issued access token with the intended API.",
      "A public client must not depend on keeping a client secret confidential. Confidential clients may require client authentication in addition to PKCE.",
    ],
    bullets: [
      "Valid authorization and code exchange succeed.",
      "An incorrect code verifier causes code exchange to fail.",
      "Reusing an authorization code fails.",
      "An unregistered redirect URI is rejected.",
      "Denied consent does not produce usable access.",
      "The application rejects an authorization response that fails its configured state or other correlation checks.",
    ],
  },
  {
    title: "Client Credentials: practice checklist",
    paragraphs: [
      "Use a confidential test client registered with the provider. Configure its token endpoint, client authentication method, and allowed scopes.",
      "Obtain an access token and call the intended resource API. Do not assume this token represents a signed-in user.",
    ],
    bullets: [
      "Valid client credentials obtain the expected token.",
      "Incorrect client credentials are rejected.",
      "Requested permissions cannot exceed the client's grants.",
      "The resource API rejects a token intended for another API.",
      "CI uses an approved non-interactive flow with credentials supplied securely at runtime.",
    ],
  },
  {
    title: "Scopes, expiry, refresh, and revocation",
    paragraphs: [
      "Scopes describe granted access, such as orders:read or orders:write. A valid token with read-only access must not authorize writes.",
      "Access-token expiry limits its usable lifetime. Refresh tokens, when issued, are used at the authorization server to obtain new access tokens; they are not credentials for ordinary resource requests.",
      "Revocation behavior depends on the system. Revoking a refresh token does not universally invalidate every already-issued access token immediately.",
    ],
    bullets: [
      "Test an expired access token rather than merely substituting a random invalid string.",
      "Test missing permissions using a genuinely restricted token.",
      "Verify revoked refresh tokens cannot obtain new access tokens.",
      "When refresh-token rotation is enabled, verify replacement and reuse detection according to the provider's policy.",
      "Verify logout and revocation behavior against the documented contract.",
    ],
  },
  {
    title: "OAuth 2.0 and OpenID Connect",
    paragraphs: [
      "OAuth 2.0 is an authorization framework. OpenID Connect adds an identity layer for authenticating the end user.",
      "An access token is intended for a resource API. An ID token communicates authentication information to the client. Do not substitute an ID token for an API access token.",
      "OIDC clients validate ID tokens, including signature, issuer, audience, expiry, and nonce when applicable.",
    ],
  },
];

export const apiCourseLessons: ApiLessonData[] = [
  chapter({
    number: 2,
    slug: "http-fundamentals",
    title: "HTTP Fundamentals",
    description:
      "Read HTTP requests and responses and distinguish URLs, headers, media types, and JSON.",
    objectives: [
      "Identify request and response components.",
      "Distinguish path parameters from query parameters.",
      "Explain Accept and Content-Type.",
    ],
    notes: [
      "An HTTP request identifies a method and target, includes headers, and may include a body. A response has a status, headers, and sometimes a body.",
      "A URL includes a scheme, host, optional port, path, and optional query. A fragment after # is not sent as part of the HTTP request target.",
      "Accept describes desired response media types. Content-Type describes the media type of the message body being sent.",
      "JSON has strings, numbers, booleans, null, arrays, and objects. The number 2 and the string '2' are different values.",
      "HTTP does not require JSON. APIs may exchange XML, text, binary files, or other formats.",
      "HTTPS protects transport. It does not establish that the caller has permission to access a resource.",
    ],
    example: example(
      "Illustrative HTTP exchange",
      `GET /api/products?category=accessories&page=1&limit=2 HTTP/1.1
Host: 127.0.0.1:5050
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "id": "p1",
      "name": "Keyboard",
      "priceCents": 2500
    }
  ],
  "page": 1,
  "limit": 2,
  "total": 1
}`,
      "Read this example; the practice server is introduced in chapter 3.",
      "Identify the method, path, query parameters, response status, and body.",
      "The response here illustrates structure rather than the complete dataset of the later server.",
    ),
    exercise: {
      tasks: [
        "Explain the role of each URL component.",
        "Explain why the fragment is not an API input.",
        "Identify which header belongs to the request body's format.",
      ],
      solution: example(
        "Practice notes",
        `URL:
http://127.0.0.1:5050/api/products/p1?include=stock#details

Scheme: http
Host: 127.0.0.1
Port: 5050
Path: /api/products/p1
Query: include=stock
Fragment: details — not sent to the server

Accept: application/json
- Requests a JSON response.

Content-Type: application/json
- Describes a JSON message body.`,
        "Compare your explanation with these notes.",
        "You can distinguish addressing information from representation metadata.",
        "Correct request construction starts with knowing where each input belongs.",
      ),
    },
    mistakes: [
      "Sending a string when the contract requires a number.",
      "Confusing Accept with Content-Type.",
      "Assuming an HTTP API must use JSON.",
    ],
    takeaway: "Read the complete exchange before deciding what to assert.",
  }),

  chapter({
    number: 3,
    slug: "postman-and-practice-setup",
    title: "Postman and Practice API Setup",
    description:
      "Prepare a separate local API that supports the requests and workflows used throughout this course.",
    objectives: [
      "Start the practice API.",
      "Send a request from Postman.",
      "Understand the demo's data and authentication limits.",
    ],
    notes: [
      "Create a new folder named sdet-api-practice outside the Learning Hub and other automation projects. Use Node.js 24 for this course.",
      "In that folder run: npm init -y. Then run: npm install express swagger-ui-express.",
      "Save the server below as server.mjs and start it with node server.mjs. Leave that terminal running while sending requests.",
      "Use the Postman desktop application to reach the local service directly. Create a GET request to http://127.0.0.1:5050/health and select Send.",
      "The demo users are alice and bob. Both use the deliberately public password demo-password. This is a local teaching service, not a production authentication implementation.",
      "Tokens expire after 15 minutes. Orders are owned by usernames and stored in memory. Logging in again does not delete that user's orders; restarting the server clears all state.",
      "Products are fixed. Inventory is checked but not reserved or decremented. Payment, durable storage, and concurrency-safe inventory management are outside this demo.",
      "Swagger UI will initially show an empty document. Chapter 4 adds the document.",
    ],
    example: example(
      "server.mjs",
      `import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

const products = [
  { id: "p1", name: "Keyboard", category: "accessories", priceCents: 2500, stock: 10 },
  { id: "p2", name: "Mouse", category: "accessories", priceCents: 1500, stock: 20 },
  { id: "p3", name: "Monitor", category: "displays", priceCents: 20000, stock: 3 },
];

const tokens = new Map();
const orders = new Map();

let document = {
  openapi: "3.0.3",
  info: { title: "SDET Practice API", version: "1.0.0" },
  paths: {},
};

try {
  document = JSON.parse(
    await readFile(new URL("./openapi.json", import.meta.url), "utf8")
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));
app.get("/openapi.json", (_req, res) => res.json(document));

const errorBody = (code, message) => ({ error: { code, message } });

function reject(res, status, code, message) {
  return res.status(status).json(errorBody(code, message));
}

function authenticate(req, res, next) {
  const header = req.get("authorization") ?? "";
  const match = /^Bearer +(.+)$/i.exec(header);
  const identity = tokens.get(match?.[1]);

  if (!identity || identity.expiresAt <= Date.now()) {
    res.set("WWW-Authenticate", "Bearer");
    return reject(res, 401, "UNAUTHORIZED", "A valid token is required");
  }

  req.username = identity.username;
  next();
}

function publicOrder(order) {
  const { owner, ...result } = order;
  return result;
}

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/products", (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 2);
  const sort = req.query.sort ?? "id";
  const category = req.query.category;

  if (
    !Number.isInteger(page) || page < 1 ||
    !Number.isInteger(limit) || limit < 1 || limit > 10 ||
    !["id", "priceAsc", "priceDesc"].includes(sort) ||
    (category !== undefined && typeof category !== "string")
  ) {
    return reject(res, 400, "INVALID_QUERY", "Invalid query parameters");
  }

  const filtered = products
    .filter((product) => !category || product.category === category)
    .sort((a, b) => {
      if (sort === "priceAsc") return a.priceCents - b.priceCents;
      if (sort === "priceDesc") return b.priceCents - a.priceCents;
      return a.id.localeCompare(b.id);
    });

  res.json({
    items: filtered.slice((page - 1) * limit, page * limit),
    page,
    limit,
    total: filtered.length,
  });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) return reject(res, 404, "NOT_FOUND", "Product not found");
  res.json(product);
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body ?? {};

  if (!["alice", "bob"].includes(username) || password !== "demo-password") {
    return reject(res, 401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  const token = randomUUID();
  tokens.set(token, {
    username,
    expiresAt: Date.now() + 15 * 60 * 1000,
  });

  res.set("Cache-Control", "no-store");
  res.json({ accessToken: token, tokenType: "Bearer", expiresIn: 900 });
});

app.get("/api/me", authenticate, (req, res) => {
  res.json({ username: req.username });
});

app.get("/api/orders", authenticate, (req, res) => {
  res.json({
    items: [...orders.values()]
      .filter((order) => order.owner === req.username)
      .map(publicOrder),
  });
});

app.post("/api/orders", authenticate, (req, res) => {
  const body = req.body;

  if (
    !body || typeof body !== "object" || Array.isArray(body) ||
    Object.keys(body).some((key) =>
      !["productId", "quantity", "clientReference"].includes(key)
    ) ||
    typeof body.productId !== "string" ||
    !Number.isInteger(body.quantity) ||
    body.quantity < 1 || body.quantity > 5 ||
    typeof body.clientReference !== "string" ||
    body.clientReference.length < 1 ||
    body.clientReference.length > 80
  ) {
    return reject(res, 400, "INVALID_ORDER", "Invalid order input");
  }

  const product = products.find((item) => item.id === body.productId);
  if (!product) return reject(res, 404, "NOT_FOUND", "Product not found");

  if (body.quantity > product.stock) {
    return reject(res, 409, "INSUFFICIENT_STOCK", "Insufficient stock");
  }

  const order = {
    id: randomUUID(),
    owner: req.username,
    productId: product.id,
    quantity: body.quantity,
    totalCents: product.priceCents * body.quantity,
    clientReference: body.clientReference,
    status: "created",
  };

  orders.set(order.id, order);
  res.location("/api/orders/" + order.id);
  res.status(201).json(publicOrder(order));
});

app.get("/api/orders/:id", authenticate, (req, res) => {
  const order = orders.get(req.params.id);

  if (!order || order.owner !== req.username) {
    return reject(res, 404, "NOT_FOUND", "Order not found");
  }

  res.json(publicOrder(order));
});

app.delete("/api/orders/:id", authenticate, (req, res) => {
  const order = orders.get(req.params.id);

  if (!order || order.owner !== req.username) {
    return reject(res, 404, "NOT_FOUND", "Order not found");
  }

  orders.delete(order.id);
  res.status(204).end();
});

app.get("/api/slow", (req, res) => {
  const delayMs = Number(req.query.delayMs ?? 500);

  if (!Number.isInteger(delayMs) || delayMs < 0 || delayMs > 2000) {
    return reject(res, 400, "INVALID_DELAY", "Use a delay from 0 to 2000");
  }

  setTimeout(() => res.json({ ready: true }), delayMs);
});

app.use((_req, res) =>
  reject(res, 404, "NOT_FOUND", "Endpoint not found")
);

app.use((error, _req, res, _next) => {
  if (error.type === "entity.parse.failed") {
    return reject(res, 400, "INVALID_JSON", "Malformed JSON");
  }

  if (error.type === "entity.too.large") {
    return reject(res, 413, "TOO_LARGE", "Request body too large");
  }

  reject(res, 500, "INTERNAL_ERROR", "Unexpected server error");
});

app.listen(5050, "127.0.0.1", () => {
  console.log("API: http://127.0.0.1:5050");
  console.log("Docs: http://127.0.0.1:5050/docs");
});`,
      "node server.mjs",
      "The server listens on port 5050 and GET /health returns status ok.",
      "The entire practice API runs locally. Keep its package-lock.json for repeatable installation.",
    ),
    exercise: {
      tasks: [
        "Start the service.",
        "Send GET /health and GET /api/products/p1 from Postman.",
        "Compare the product body with the fixed dataset.",
      ],
      solution: example(
        "Postman request",
        `GET http://127.0.0.1:5050/api/products/p1

Expected status: 200

Expected body:
{
  "id": "p1",
  "name": "Keyboard",
  "category": "accessories",
  "priceCents": 2500,
  "stock": 10
}`,
        "Select GET, enter the URL, and select Send.",
        "The response contains the keyboard's fixed values.",
        "A connection error means the service or address needs checking before assertions can be evaluated.",
      ),
    },
    mistakes: [
      "Adding this server inside the Learning Hub.",
      "Using the wrong port.",
      "Expecting in-memory records to survive a restart.",
    ],
    takeaway:
      "Establish a controlled service before building a collection of checks.",
  }),

  chapter({
    number: 4,
    slug: "openapi-and-swagger-ui",
    title: "OpenAPI and Swagger UI",
    description:
      "Read a machine-readable contract through interactive documentation.",
    objectives: [
      "Identify operations, parameters, and schemas.",
      "Open a local Swagger UI.",
      "Separate documented behavior from implementation evidence.",
    ],
    notes: [
      "OpenAPI describes an HTTP interface. Swagger UI renders that description and can issue requests to a configured server.",
      "Save the document below as openapi.json beside server.mjs, then restart the server.",
      "This starter document intentionally covers only product retrieval. The remaining API operations still work but are not yet documented here.",
      "Open http://127.0.0.1:5050/docs. Expand the GET operation, select Try it out, enter p1, and execute.",
      "The document uses OpenAPI 3.0.3 explicitly. Its schema dialect is not interchangeable with every JSON Schema version.",
      "Documentation can become stale. Compare the declared contract with the actual response rather than assuming they match.",
    ],
    example: example(
      "openapi.json",
      `{
  "openapi": "3.0.3",
  "info": {
    "title": "SDET Practice API",
    "version": "1.0.0",
    "description": "Starter contract for product retrieval."
  },
  "servers": [
    { "url": "http://127.0.0.1:5050" }
  ],
  "paths": {
    "/api/products/{id}": {
      "get": {
        "summary": "Retrieve a product",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" },
            "example": "p1"
          }
        ],
        "responses": {
          "200": {
            "description": "Product found",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Product" }
              }
            }
          },
          "404": {
            "description": "Product not found",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Product": {
        "type": "object",
        "required": ["id", "name", "category", "priceCents", "stock"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "category": { "type": "string" },
          "priceCents": { "type": "integer", "minimum": 0 },
          "stock": { "type": "integer", "minimum": 0 }
        }
      },
      "Error": {
        "type": "object",
        "required": ["error"],
        "properties": {
          "error": {
            "type": "object",
            "required": ["code", "message"],
            "properties": {
              "code": { "type": "string" },
              "message": { "type": "string" }
            }
          }
        }
      }
    }
  }
}`,
      "Restart node server.mjs, then open http://127.0.0.1:5050/docs.",
      "Swagger UI displays the documented product operation.",
      "Try it out calls the real local API; displaying the schema alone does not validate it.",
    ),
    exercise: {
      tasks: [
        "Execute product p1 through Swagger UI.",
        "Repeat with missing as the ID.",
        "Compare actual statuses with the documented responses.",
      ],
      solution: example(
        "Documentation review",
        `p1:
- Expected status: 200
- Required product properties are present.

missing:
- Expected status: 404
- error.code is NOT_FOUND.
- error.message is Product not found.

Coverage limit:
- Only product retrieval is documented in this starter file.`,
        "Record any difference between documentation and implementation.",
        "The two documented paths match the observed behavior.",
        "Contract review includes both successful and unsuccessful responses.",
      ),
    },
    mistakes: [
      "Assuming every implemented endpoint is documented.",
      "Treating Try it out as a complete regression suite.",
      "Mixing incompatible schema dialects without checking support.",
    ],
    takeaway:
      "Use documentation to derive expectations, then verify the running service.",
  }),

  chapter({
    number: 5,
    slug: "requests-and-parameters",
    title: "Requests, Parameters, and Bodies",
    description:
      "Place request inputs in the correct location and use valid JSON.",
    objectives: [
      "Configure path and query inputs.",
      "Set relevant headers.",
      "Distinguish body data from URL parameters.",
    ],
    notes: [
      "In Postman, enter the path in the URL and query values in Params. Postman encodes query values.",
      "A path ID selects a resource. Query parameters commonly filter, sort, or paginate a collection.",
      "For a JSON request body, choose Body, raw, and JSON. Confirm Content-Type is application/json.",
      "Do not add a body to every request. GET request content has no generally defined semantics and is not used by this practice API.",
    ],
    example: example(
      "Postman request configuration",
      `Method: GET
URL: http://127.0.0.1:5050/api/products

Params:
category = accessories
sort = priceAsc
page = 1
limit = 2

Headers:
Accept = application/json

Body:
None`,
      "Send the request using the Params editor.",
      "The result contains Mouse followed by Keyboard, with total 2.",
      "Filtering selects the dataset, sorting orders it, and pagination selects the slice.",
    ),
    exercise: {
      tasks: [
        "Change the category to displays.",
        "Keep page 1 and limit 2.",
        "Inspect the result and pagination metadata.",
      ],
      solution: example(
        "Expected response",
        `{
  "items": [
    {
      "id": "p3",
      "name": "Monitor",
      "category": "displays",
      "priceCents": 20000,
      "stock": 3
    }
  ],
  "page": 1,
  "limit": 2,
  "total": 1
}`,
        "Send GET /api/products?category=displays&page=1&limit=2.",
        "Only the monitor appears.",
        "The total counts filtered records, not all products.",
      ),
    },
    mistakes: [
      "Putting a JSON object into Params when the API expects a body.",
      "Forgetting JSON double quotes.",
      "Assuming page size must equal returned item count.",
    ],
    takeaway: "Construct inputs according to the operation's contract.",
  }),

  chapter({
    number: 6,
    slug: "http-methods-and-idempotency",
    title: "HTTP Methods and Idempotency",
    description:
      "Distinguish retrieval, creation, replacement, partial updates, and repeated effects.",
    objectives: [
      "Explain safe and idempotent methods.",
      "Recognize duplicate-creation risks.",
      "Separate method semantics from endpoint implementation.",
    ],
    notes: [
      "GET retrieves a representation. POST asks a resource to process submitted content. PUT commonly creates or replaces the state at a known target. PATCH applies a partial modification. DELETE removes the target's association.",
      "Safe means the client did not request a state-changing action. Idempotent means repeating an identical request has the same intended effect as making it once.",
      "Idempotency does not require identical response bodies or statuses. A repeated DELETE can return 404 after the first returns 204.",
      "POST is not generally idempotent. This demo creates another order for every valid POST, even when clientReference is repeated.",
      "The practice API does not implement PUT or PATCH. Treat those method examples as concepts, not available endpoints.",
    ],
    example: example(
      "Method comparison",
      `GET /api/products/p1
- Reads a product.

POST /api/orders
- Creates a new order on each valid call.

DELETE /api/orders/{id}
- First successful call removes the order.
- A later call returns 404 in this demo.

PUT /resource/{id}
- Conceptual replacement; not implemented here.

PATCH /resource/{id}
- Conceptual partial update; not implemented here.`,
      "Compare intended state changes rather than only response codes.",
      "You can explain which calls are safe to repeat under the agreed contract.",
      "An idempotency key only helps when the server explicitly implements its semantics.",
    ),
    exercise: {
      tasks: [
        "Describe what could happen if a create-order response is lost.",
        "Explain why immediately retrying POST could create a duplicate.",
      ],
      solution: example(
        "Retry decision",
        `A timeout does not prove the server rejected the request.

Possible sequence:
1. Server creates the order.
2. Response is lost.
3. Client retries POST.
4. Server creates a second order.

Better contract:
- Server-supported idempotency keys, or
- A reliable reconciliation operation.

This demo does not implement either guarantee.`,
        "Document the retry policy before automating retries.",
        "The policy acknowledges uncertain outcomes.",
        "Retry safety depends on service behavior, not only the HTTP client.",
      ),
    },
    mistakes: [
      "Assuming every repeated POST is safe.",
      "Equating idempotency with identical responses.",
      "Inventing an Idempotency-Key header without server support.",
    ],
    takeaway: "Understand the operation's effects before repeating it.",
  }),

  chapter({
    number: 7,
    slug: "status-codes-and-errors",
    title: "Status Codes and Error Contracts",
    description:
      "Validate exact response outcomes and useful error structures.",
    objectives: [
      "Distinguish status-code categories.",
      "Check a structured error.",
      "Avoid parsing an empty 204 body as JSON.",
    ],
    table: {
      headers: ["Status code", "Meaning", "What an SDET should validate"],
      rows: [
        [
          "200",
          "OK",
          "Verify the response data and expected business outcome.",
        ],
        [
          "201",
          "Created",
          "Verify the new resource, its identifier, and the Location header when required by the contract.",
        ],
        [
          "202",
          "Accepted",
          "Verify acceptance and use the documented mechanism to check whether processing eventually completes.",
        ],
        [
          "204",
          "No Content",
          "Verify the operation succeeded and the response body is empty.",
        ],
        [
          "301",
          "Moved Permanently",
          "Verify the permanent redirect destination in the Location header.",
        ],
        [
          "302",
          "Found",
          "Verify the temporary redirect destination and the client's redirect behavior.",
        ],
        [
          "304",
          "Not Modified",
          "Verify conditional request handling and an empty response body.",
        ],
        [
          "307",
          "Temporary Redirect",
          "Verify the redirect preserves the request method and body.",
        ],
        [
          "308",
          "Permanent Redirect",
          "Verify the permanent redirect preserves the request method and body.",
        ],
        [
          "400",
          "Bad Request",
          "Verify invalid input is rejected with useful error details and no unintended changes.",
        ],
        [
          "401",
          "Unauthorized",
          "Verify missing or invalid credentials are rejected and check the WWW-Authenticate header.",
        ],
        [
          "403",
          "Forbidden",
          "Verify access is refused when the requester lacks permission.",
        ],
        [
          "404",
          "Not Found",
          "Verify unavailable resources return the expected error. Some APIs also use this to hide inaccessible resources.",
        ],
        [
          "405",
          "Method Not Allowed",
          "Verify unsupported HTTP methods are rejected and the Allow header lists supported methods.",
        ],
        [
          "409",
          "Conflict",
          "Verify conflicts with the resource's current state are handled correctly.",
        ],
        [
          "412",
          "Precondition Failed",
          "Verify requests with an unmet condition, such as an outdated If-Match value, are rejected.",
        ],
        [
          "413",
          "Content Too Large",
          "Verify requests exceeding the supported content size are rejected.",
        ],
        [
          "415",
          "Unsupported Media Type",
          "Verify unsupported request content types or encodings are rejected.",
        ],
        [
          "422",
          "Unprocessable Content",
          "Verify syntactically valid but unprocessable input is rejected according to the API contract.",
        ],
        [
          "429",
          "Too Many Requests",
          "Verify rate limits and the Retry-After header when provided.",
        ],
        [
          "500",
          "Internal Server Error",
          "Verify unexpected failures return a safe error response without exposing stack traces or secrets.",
        ],
        [
          "502",
          "Bad Gateway",
          "Verify gateway handling when an upstream server returns an invalid response.",
        ],
        [
          "503",
          "Service Unavailable",
          "Verify temporary unavailability handling and Retry-After when provided.",
        ],
        [
          "504",
          "Gateway Timeout",
          "Verify gateway handling when an upstream response takes too long.",
        ],
      ],
    },
    notes: [
      "Status families communicate information, success, redirection, client errors, or server errors. The operation contract determines the exact expected status.",
      "This demo uses 200 for retrieval, 201 for order creation, and 204 for deletion.",
      "It uses 400 for invalid input, 401 for missing or invalid tokens, 404 for unavailable resources, and 409 for insufficient stock.",
      "An API can intentionally return 404 instead of revealing that another user's resource exists.",
      "Do not call pm.response.json() on a successful 204 response, which has no content.",
    ],
    example: example(
      "GET /api/products/missing — Scripts > Post-response",
      `pm.test("Unknown product returns 404", () => {
  pm.response.to.have.status(404);
});

pm.test("Error contract is useful", () => {
  pm.expect(pm.response.json()).to.deep.equal({
    error: {
      code: "NOT_FOUND",
      message: "Product not found"
    }
  });
});`,
      "Send GET http://127.0.0.1:5050/api/products/missing.",
      "Both assertions pass.",
      "The checks validate the status and the agreed error body.",
    ),
    exercise: {
      tasks: [
        "Send GET /api/products?page=0.",
        "Assert the invalid-query contract.",
      ],
      solution: example(
        "Post-response script",
        `pm.test("Invalid query is rejected", () => {
  pm.response.to.have.status(400);
  pm.expect(pm.response.json().error.code).to.equal("INVALID_QUERY");
});`,
        "Attach the script to GET /api/products?page=0 and send.",
        "The API rejects the invalid page number.",
        "Different invalid conditions may have different error codes.",
      ),
    },
    mistakes: [
      "Accepting any 2xx status when the contract requires 201.",
      "Parsing an empty body as JSON.",
      "Checking error text while ignoring the status.",
    ],
    takeaway:
      "Assert the complete error contract at the level required by the scenario.",
  }),

  chapter({
    number: 8,
    slug: "variables-and-environments",
    title: "Variables and Environments",
    description:
      "Separate environment configuration from reusable request definitions.",
    objectives: [
      "Create a local environment.",
      "Use variable substitution.",
      "Avoid accidental scope shadowing.",
    ],
    notes: [
      "Create a Postman environment named SDET Local. Add baseUrl with value http://127.0.0.1:5050 and select that environment.",
      "Use {{baseUrl}} in request URLs. Keep the trailing slash out of this variable to avoid accidental double slashes.",
      "Variables can exist in several scopes. A narrower value can override a broader one, so avoid reusing names unintentionally.",
      "Use pm.environment for environment values and pm.collectionVariables for collection-owned workflow values.",
      "Do not share real access tokens in exported environments or repository files.",
    ],
    example: example(
      "Postman environment and request",
      `Environment: SDET Local

baseUrl = http://127.0.0.1:5050

Request:
GET {{baseUrl}}/api/products/p1

Optional pre-request check:
const baseUrl = pm.environment.get("baseUrl");
if (!baseUrl) {
  throw new Error("Select the SDET Local environment");
}`,
      "Select SDET Local before sending the request.",
      "The variable resolves to the local API.",
      "The same request structure can later target another authorized test environment.",
    ),
    exercise: {
      tasks: [
        "Replace hardcoded URLs in the existing requests.",
        "Check the resolved address before sending.",
      ],
      solution: example(
        "Reusable request URLs",
        `{{baseUrl}}/health
{{baseUrl}}/api/products
{{baseUrl}}/api/products/p1`,
        "Send each request with SDET Local selected.",
        "All requests reach the same local service.",
        "Changing an environment should not require editing every URL.",
      ),
    },
    mistakes: [
      "Leaving the intended environment unselected.",
      "Defining different baseUrl values in overlapping scopes.",
      "Exporting real credentials.",
    ],
    takeaway: "Keep configuration explicit and separate from request logic.",
  }),

  chapter({
    number: 9,
    slug: "collections-and-organization",
    title: "Collections and Request Organization",
    description:
      "Organize requests by capability and keep workflow prerequisites visible.",
    objectives: [
      "Create a readable collection.",
      "Separate independent checks from workflows.",
      "Place shared configuration at the appropriate scope.",
    ],
    notes: [
      "Create a collection named SDET API Course. Group related requests into folders.",
      "Use names that describe the expected behavior rather than only the method.",
      "Collection-level authorization is useful for protected requests, but public and negative authentication cases need explicit overrides.",
      "Avoid a global status-200 assertion: valid creation, deletion, and negative tests have different expected statuses.",
    ],
    example: example(
      "Suggested collection structure",
      `SDET API Course
  Public products
    Retrieves a known product
    Rejects an unknown product
    Filters accessories

  Authentication
    Logs in Alice
    Rejects invalid credentials

  Order workflow
    Creates an order
    Reads the created order
    Deletes the created order
    Confirms deletion

  Negative cases
    Rejects invalid quantity
    Rejects missing authentication`,
      "Create the folders and save the requests already built.",
      "The collection communicates purpose and dependency order.",
      "Workflow requests may depend on captured IDs; independent checks should not.",
    ),
    exercise: {
      tasks: [
        "Add a description to the public-products folder.",
        "State its prerequisites and cleanup needs.",
      ],
      solution: example(
        "Folder description",
        `Purpose:
Validate product retrieval and filtering.

Prerequisite:
The local practice API is running.

Authentication:
Not required.

Data:
Fixed seeded products p1, p2, and p3.

Cleanup:
None; these checks do not modify data.`,
        "Save this description on the folder.",
        "Another learner can understand how to run the checks.",
        "Readable context makes a collection maintainable.",
      ),
    },
    mistakes: [
      "Putting every request in one unstructured folder.",
      "Hiding dependencies in unexplained variables.",
      "Applying the same success assertion to every request.",
    ],
    takeaway: "Organize around capabilities and make dependencies explicit.",
  }),

  chapter({
    number: 10,
    slug: "response-assertions",
    title: "Response Assertions",
    description:
      "Write JavaScript checks for response status, structure, and business values.",
    objectives: [
      "Use pm.test and pm.expect.",
      "Check types and independent expected values.",
      "Keep failure messages meaningful.",
    ],
    notes: [
      "Place these scripts in Scripts > Post-response for the request.",
      "Use separate tests for observations that should have separate failure messages.",
      "A type check alone does not establish correctness. The keyboard price must equal the expected business value, not merely be numeric.",
      "Parse response JSON inside the relevant assertion so invalid JSON is reported as a failed test.",
    ],
    example: example(
      "GET {{baseUrl}}/api/products/p1 — Post-response",
      `pm.test("Returns a successful JSON response", () => {
  pm.response.to.have.status(200);
  pm.expect(pm.response.headers.get("Content-Type"))
    .to.include("application/json");
});

pm.test("Keyboard has the expected identity and price", () => {
  const body = pm.response.json();

  pm.expect(body.id).to.equal("p1");
  pm.expect(body.name).to.equal("Keyboard");
  pm.expect(body.priceCents).to.be.a("number");
  pm.expect(Number.isInteger(body.priceCents)).to.equal(true);
  pm.expect(body.priceCents).to.equal(2500);
});

pm.test("Stock is a nonnegative integer", () => {
  const stock = pm.response.json().stock;

  pm.expect(Number.isInteger(stock)).to.equal(true);
  pm.expect(stock).to.be.at.least(0);
});`,
      "Send the product request and inspect Test Results.",
      "Three tests pass with useful names.",
      "Expected values come from the fixed product contract.",
    ),
    exercise: {
      tasks: [
        "Temporarily change the expected price to 2600.",
        "Inspect the failed test.",
        "Restore 2500.",
      ],
      solution: example(
        "Controlled mismatch",
        `pm.test("Keyboard price is correct", () => {
  pm.expect(pm.response.json().priceCents).to.equal(2500);
});`,
        "Use a deliberate mismatch only during the exercise.",
        "The incorrect value fails; restoring the contract value passes.",
        "Do not change an expectation merely to accommodate a real defect.",
      ),
    },
    mistakes: [
      "Asserting only response status.",
      "Deriving the expected price from the same actual response.",
      "Using vague test names.",
    ],
    takeaway:
      "Assert meaningful outcomes with independently known expectations.",
  }),

  chapter({
    number: 11,
    slug: "pre-request-scripts",
    title: "Pre-request Scripts and Dynamic Data",
    description:
      "Prepare request-specific values without making business expectations unpredictable.",
    objectives: [
      "Generate a unique reference.",
      "Use pre-request variables in JSON.",
      "Separate identity randomness from business inputs.",
    ],
    notes: [
      "Pre-request scripts run before the request. Use them for values needed by that request, not for assertions about a response that has not arrived.",
      "Generate unique references for records, while keeping product and quantity deterministic.",
      "The demo stores clientReference but does not enforce uniqueness or idempotency.",
      "The order request below becomes executable after authentication is configured in chapter 12.",
    ],
    example: example(
      "Create order — Pre-request and Body",
      `// Scripts > Pre-request
pm.variables.set(
  "clientReference",
  "course-" + pm.variables.replaceIn("{{$guid}}")
);

// Body > raw > JSON
{
  "productId": "p1",
  "quantity": 2,
  "clientReference": "{{clientReference}}"
}`,
      "Configure the script and body in their separate Postman editors.",
      "Each send receives a new reference while retaining quantity 2.",
      "The displayed block combines two editor examples; do not paste the JSON body into the script editor.",
    ),
    exercise: {
      tasks: [
        "Add a prerequisite check for an access token.",
        "Do not print the token.",
      ],
      solution: example(
        "Create order — additional Pre-request check",
        `if (!pm.collectionVariables.get("token")) {
  throw new Error("Run the login request before creating an order");
}`,
        "After chapter 12, run login and then the order request.",
        "Missing prerequisites produce a clear script error.",
        "A local variable check is diagnostic; the server must still enforce authentication.",
      ),
    },
    mistakes: [
      "Randomizing important business inputs without recording them.",
      "Treating a unique reference as server-supported idempotency.",
      "Pasting body JSON into the script editor.",
    ],
    takeaway:
      "Generate identity data deliberately and keep scenario behavior reproducible.",
  }),

  chapter({
    number: 12,
    slug: "authentication-and-authorization",
    title: "Authentication and Authorization",
    extraSections: authenticationSections,
    description:
      "Acquire a demo bearer token and distinguish identity from permission.",
    objectives: [
      "Capture a token after a successful login.",
      "Send a bearer token.",
      "Check unauthenticated requests.",
    ],
    notes: [
      "Authentication establishes a caller's identity. Authorization decides what that caller may access.",
      "API keys identify a client or principal according to the API contract. Basic authentication encodes credentials but does not encrypt them; real credentials require HTTPS.",
      "Bearer tokens grant access to whoever possesses them. Keep them out of URLs and logs.",
      "The demo login endpoint is a simplified token issuer, not an OAuth authorization server. Its token is opaque, not a JWT.",
      "Create POST {{baseUrl}}/api/login with No Auth and JSON body containing username alice and password demo-password.",
    ],
    example: example(
      "Login — Scripts > Post-response",
      `pm.collectionVariables.unset("token");

pm.test("Login returns a usable token", () => {
  pm.response.to.have.status(200);
  const body = pm.response.json();

  pm.expect(body.tokenType).to.equal("Bearer");
  pm.expect(body.accessToken).to.be.a("string").and.not.empty;
  pm.expect(body.expiresIn).to.equal(900);

  pm.collectionVariables.set("token", body.accessToken);
});

// For a protected request:
// Authorization > Bearer Token
// Token: {{token}}
//
// Example protected request:
// GET {{baseUrl}}/api/me`,
      'Send login with {"username":"alice","password":"demo-password"}, then GET /api/me using Bearer Token {{token}}.',
      'The identity response is {"username":"alice"}.',
      "The token is captured only after the login assertions pass.",
    ),
    exercise: {
      tasks: [
        "Duplicate the /api/me request.",
        "Set Authorization to No Auth and remove any manually added Authorization header.",
        "Assert the rejection.",
      ],
      solution: example(
        "Unauthenticated /api/me — Post-response",
        `pm.test("Missing authentication is rejected", () => {
  pm.response.to.have.status(401);
  pm.expect(pm.response.json().error.code).to.equal("UNAUTHORIZED");
});`,
        "Send the protected request without credentials.",
        "The API returns 401.",
        "A token being present is not enough; it must also be valid.",
      ),
    },
    mistakes: [
      "Confusing a valid login with permission to every resource.",
      "Leaving inherited authorization on a negative test.",
      "Calling the local login endpoint OAuth.",
    ],
    takeaway: "Check identity and resource permissions as separate contracts.",
  }),

  chapter({
    number: 13,
    slug: "oauth-and-token-lifecycle",
    title: "OAuth 2.0 and Token Lifecycle",
    extraSections: oauthSections,
    description:
      "Understand authorization flows and test token expiration without confusing the demo login with OAuth.",
    objectives: [
      "Explain authorization code with PKCE and client credentials.",
      "Distinguish access tokens from refresh tokens.",
      "Test invalid tokens against the local API.",
    ],
    notes: [
      "OAuth 2.0 is an authorization framework. OpenID Connect adds identity functionality; OAuth alone is not a complete user-login protocol.",
      "Authorization code with PKCE is used for supported user-delegated flows. Client credentials is for a confidential client acting on its own behalf.",
      "Use an authorized identity provider's actual configuration: authorization URL, token URL, client ID, redirect URI, scopes, and applicable client authentication.",
      "Do not use implicit or resource-owner-password flows as the default for a new design. Follow the provider's supported secure flow.",
      "A refresh token can obtain a new access token when the provider supports it. Refresh tokens are not guaranteed, and the local demo does not issue them.",
      "Postman's interactive OAuth helper is not automatically reproduced by a headless collection runner. Unattended execution needs an explicitly supported token-acquisition workflow.",
      "The local demo's tokens expire after 900 seconds. For a quick negative test, use an invalid token. That verifies rejection, not elapsed-time expiry.",
    ],
    example: example(
      "OAuth configuration worksheet — provider-specific",
      `Flow: Authorization Code with PKCE

Required from the authorized test provider:
- Authorization URL
- Token URL
- Client ID
- Registered redirect URI
- Requested scopes
- PKCE method, normally S256
- Client authentication rules, if applicable

Verify:
- Requested access is appropriate.
- Redirect URI matches registration.
- Invalid or expired tokens are rejected.
- Insufficient permissions are rejected.
- Tokens are not exposed in logs.

Do not point these fields at /api/login:
the local demo is not an OAuth server.`,
      "Use this worksheet with an authorized test identity provider; no external provider is required for the local exercises.",
      "You can explain the flow's participants and configuration.",
      "A real OAuth exercise requires provider details that cannot be invented.",
    ),
    exercise: {
      tasks: [
        "Send GET /api/me with bearer token invalid-demo-token.",
        "Then repeat with a fresh valid token.",
      ],
      solution: example(
        "Invalid-token request — Post-response",
        `pm.test("Invalid token is rejected", () => {
  pm.response.to.have.status(401);
  pm.expect(pm.response.json().error.code).to.equal("UNAUTHORIZED");
});`,
        "Use invalid-demo-token only in the negative request.",
        "The invalid token fails while a freshly issued token succeeds.",
        "Test actual expiration separately by retaining a token beyond its lifetime.",
      ),
    },
    mistakes: [
      "Treating every token as a JWT.",
      "Assuming every provider issues refresh tokens.",
      "Calling an invalid-token check an expiration test.",
    ],
    takeaway:
      "Use the provider's real flow and distinguish token acquisition, validity, and permission.",
  }),

  chapter({
    number: 14,
    slug: "schema-and-contract-validation",
    title: "Schema and Contract Validation",
    description:
      "Validate response structure without losing business-specific assertions.",
    objectives: [
      "Define required fields and constraints.",
      "Run a response schema assertion.",
      "Separate schema checks from exact-value checks.",
    ],
    notes: [
      "A schema can describe required fields, types, ranges, and allowed values.",
      "Schema validity does not establish that the correct resource or price was returned.",
      "The example uses a small JSON Schema suitable for the Postman response assertion. It is not a claim that the entire OpenAPI document is being validated.",
      "Choose whether additional properties should be allowed according to the compatibility contract. Rejecting every new field can make otherwise compatible evolution fail unnecessarily.",
    ],
    example: example(
      "GET /api/products/p1 — Post-response",
      `const schema = {
  type: "object",
  required: ["id", "name", "category", "priceCents", "stock"],
  properties: {
    id: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1 },
    category: { type: "string" },
    priceCents: { type: "integer", minimum: 0 },
    stock: { type: "integer", minimum: 0 }
  }
};

pm.test("Product follows the response schema", () => {
  pm.response.to.have.jsonSchema(schema);
});

pm.test("Correct product and price are returned", () => {
  const body = pm.response.json();
  pm.expect(body.id).to.equal("p1");
  pm.expect(body.priceCents).to.equal(2500);
});`,
      "Add the script to the known-product request and send.",
      "Both structural and business assertions pass.",
      "A different valid product could pass the schema but fail the identity check.",
    ),
    exercise: {
      tasks: [
        "Explain why priceCents 9999 passes the schema.",
        "Identify which assertion detects the wrong keyboard price.",
      ],
      solution: example(
        "Contract comparison",
        `Schema:
priceCents must be a nonnegative integer.
9999 satisfies that structure.

Business expectation:
Keyboard p1 costs 2500 cents.
9999 violates that expectation.`,
        "Keep both categories of checks.",
        "You can explain their complementary coverage.",
        "Schema checks and scenario checks solve different problems.",
      ),
    },
    mistakes: [
      "Treating schema validity as complete correctness.",
      "Using an unsupported schema dialect without checking compatibility.",
      "Making required-field decisions without consulting the contract.",
    ],
    takeaway: "Validate structure and business meaning independently.",
  }),

  chapter({
    number: 15,
    slug: "negative-and-boundary-testing",
    title: "Negative and Boundary Testing",
    description:
      "Derive invalid and boundary cases from explicit order constraints.",
    objectives: [
      "Select boundary and equivalence cases.",
      "Check error codes.",
      "Consider side effects after rejection.",
    ],
    notes: [
      "Order quantity must be an integer from 1 through 5. productId and clientReference are required strings, and clientReference is limited to 80 characters.",
      "Use a valid Alice token from chapter 12. Otherwise authentication will fail before input validation is reached.",
      "Change one important condition at a time when diagnosing validation behavior.",
      "A rejection should not create an order. Compare owned records or a unique reference before and after when verifying side effects.",
    ],
    example: example(
      "POST {{baseUrl}}/api/orders — case matrix",
      `Keep:
productId = p1
clientReference = a unique test reference

quantity = 1      -> 201
quantity = 5      -> 201
quantity = 0      -> 400 INVALID_ORDER
quantity = 6      -> 400 INVALID_ORDER
quantity = 1.5    -> 400 INVALID_ORDER
quantity = "2"    -> 400 INVALID_ORDER
quantity omitted -> 400 INVALID_ORDER

Other scenarios:
productId = missing -> 404 NOT_FOUND
productId = p3, quantity = 4 -> 409 INSUFFICIENT_STOCK

Clean up every successfully created order.`,
      "Send each body as raw JSON with a valid bearer token.",
      "The statuses match the individual constraints.",
      "Stock and quantity range are separate rules: four is in range but exceeds the monitor's stock.",
    ),
    exercise: {
      tasks: [
        "Send a body with quantity 1.5.",
        "Assert its status and machine-readable error code.",
      ],
      solution: example(
        "Fractional quantity — Post-response",
        `pm.test("Fractional quantity is rejected", () => {
  pm.response.to.have.status(400);
  pm.expect(pm.response.json().error.code).to.equal("INVALID_ORDER");
});`,
        'Use {"productId":"p1","quantity":1.5,"clientReference":"fraction-case"}.',
        "The API rejects the fractional input.",
        "A status check alone does not independently prove absence of side effects.",
      ),
    },
    mistakes: [
      "Using an invalid token while trying to test input validation.",
      "Changing many fields in a single diagnostic case.",
      "Leaving successful boundary-test orders behind.",
    ],
    takeaway:
      "Select cases from constraints and verify both rejection and relevant state.",
  }),

  chapter({
    number: 16,
    slug: "request-chaining-and-cleanup",
    title: "Request Chaining and Cleanup",
    description:
      "Carry identifiers through a create-read-delete workflow and clean up only owned data.",
    objectives: [
      "Capture a created resource ID.",
      "Use the ID in later requests.",
      "Verify deletion.",
    ],
    notes: [
      "Create an order with Alice's token, product p1, quantity 2, and a unique clientReference.",
      "Before creation, clear any old orderId so a failed create cannot leave a stale identifier available for later requests.",
      "Capture the ID only after validating the create response. Read and delete that exact resource.",
      "Normal sequential cleanup does not guarantee cleanup after a crash. A production test environment needs ownership tags and a recovery policy for abandoned records.",
    ],
    example: example(
      "Create order — Pre-request and Post-response",
      `// Pre-request
pm.collectionVariables.unset("orderId");

// Post-response
pm.test("Order is created correctly", () => {
  pm.response.to.have.status(201);
  const body = pm.response.json();

  pm.expect(body.id).to.be.a("string").and.not.empty;
  pm.expect(body.quantity).to.equal(2);
  pm.expect(body.totalCents).to.equal(5000);

  pm.collectionVariables.set("orderId", body.id);
});

// Next requests:
// GET {{baseUrl}}/api/orders/{{orderId}}
// DELETE {{baseUrl}}/api/orders/{{orderId}}
// GET {{baseUrl}}/api/orders/{{orderId}}`,
      "Run the workflow in the stated order with the same user's token.",
      "Read returns 200, delete returns 204, and the final read returns 404.",
      "Place the pre-request and post-response snippets in their separate editors.",
    ),
    exercise: {
      tasks: [
        "Assert deletion has no body.",
        "Assert the later read reports the resource as unavailable.",
      ],
      solution: example(
        "Deletion and verification scripts",
        `// DELETE request:
pm.test("Order is removed", () => {
  pm.response.to.have.status(204);
  pm.expect(pm.response.text()).to.equal("");
});

// Following GET request:
pm.test("Deleted order is unavailable", () => {
  pm.response.to.have.status(404);
  pm.expect(pm.response.json().error.code).to.equal("NOT_FOUND");
});`,
        "Attach each script to its matching request.",
        "The resource is no longer retrievable after deletion.",
        "Do not parse the deletion response as JSON.",
      ),
    },
    mistakes: [
      "Using an ID from an earlier run.",
      "Deleting shared records.",
      "Assuming cleanup always executes after interruption.",
    ],
    takeaway:
      "Make dependencies explicit and tie cleanup to identifiers created by the current workflow.",
  }),

  chapter({
    number: 17,
    slug: "pagination-filtering-and-sorting",
    title: "Pagination, Filtering, and Sorting",
    description:
      "Validate collection membership, ordering, totals, and page boundaries.",
    objectives: [
      "Check ordering and filtering.",
      "Verify pagination metadata.",
      "Recognize consistency limits in changing datasets.",
    ],
    notes: [
      "The product endpoint accepts category, sort, page, and limit.",
      "For this fixed dataset, accessories sorted by ascending price should return p2 then p1.",
      "A page size is a maximum, not a guarantee of that many results. A page beyond the end returns an empty items array.",
      "For a changing production dataset, discuss stable sorting, tie-breakers, cursor semantics, and snapshot consistency before asserting cross-page completeness.",
    ],
    example: example(
      "Filtered request — Post-response",
      `// GET {{baseUrl}}/api/products?category=accessories&sort=priceAsc&page=1&limit=2

pm.test("Filtering and sorting are correct", () => {
  pm.response.to.have.status(200);
  const body = pm.response.json();

  pm.expect(body.items.map((item) => item.id)).to.deep.equal(["p2", "p1"]);
  pm.expect(body.items.every((item) => item.category === "accessories"))
    .to.equal(true);

  pm.expect(body.page).to.equal(1);
  pm.expect(body.limit).to.equal(2);
  pm.expect(body.total).to.equal(2);
});`,
      "Send the filtered and sorted request.",
      "The mouse precedes the keyboard and total is 2.",
      "The assertions verify membership and ordering rather than just a count.",
    ),
    exercise: {
      tasks: [
        "Change page to 2 while keeping the accessories filter and limit 2.",
        "Check the empty page and total.",
      ],
      solution: example(
        "Beyond-end page — Post-response",
        `pm.test("Beyond-end page is empty", () => {
  const body = pm.response.json();
  pm.response.to.have.status(200);
  pm.expect(body.items).to.deep.equal([]);
  pm.expect(body.page).to.equal(2);
  pm.expect(body.total).to.equal(2);
});`,
        "Send the same filtered request with page=2.",
        "The page is empty while the filtered total remains 2.",
        "Total describes the matching dataset, not the current page size.",
      ),
    },
    mistakes: [
      "Checking only item count.",
      "Expecting every page to be full.",
      "Assuming offset pagination is stable during concurrent writes.",
    ],
    takeaway:
      "Check membership, order, and metadata against the collection contract.",
  }),

  chapter({
    number: 18,
    slug: "mock-apis-and-examples",
    title: "Mock APIs and Examples",
    description:
      "Use controlled responses while clearly separating simulation from integration evidence.",
    objectives: [
      "Run a local mock endpoint.",
      "Check a deterministic failure response.",
      "Explain the coverage limits of mocks.",
    ],
    notes: [
      "A mock supplies a controlled response without exercising the real dependency's implementation.",
      "Postman saved examples can document responses and support mock workflows. The local example below avoids requiring a hosted mock service.",
      "Save mock-server.mjs in the same practice project and start it in another terminal on port 5051.",
      "Keep the mock address distinct from the real practice API. Do not overwrite baseUrl accidentally.",
    ],
    example: example(
      "mock-server.mjs",
      `import express from "express";

const app = express();

app.get("/api/products", (_req, res) => {
  res.status(503).json({
    error: {
      code: "DEPENDENCY_UNAVAILABLE",
      message: "Product service unavailable"
    }
  });
});

app.listen(5051, "127.0.0.1", () => {
  console.log("Mock: http://127.0.0.1:5051");
});`,
      "node mock-server.mjs",
      "GET http://127.0.0.1:5051/api/products always returns the controlled 503 response.",
      "This does not prove the real API fails gracefully or that a browser displays the correct message.",
    ),
    exercise: {
      tasks: [
        "Create a separate request to the mock URL.",
        "Assert the controlled status and error code.",
      ],
      solution: example(
        "Mock request — Post-response",
        `pm.test("Mock supplies the planned failure", () => {
  pm.response.to.have.status(503);
  pm.expect(pm.response.json().error.code)
    .to.equal("DEPENDENCY_UNAVAILABLE");
});`,
        "Send GET http://127.0.0.1:5051/api/products.",
        "The deterministic error assertion passes.",
        "A consuming application needs its own test to verify its reaction.",
      ),
    },
    mistakes: [
      "Reporting mocked requests as real-service coverage.",
      "Returning unrealistic payloads.",
      "Mixing mock and integration environments without clear names.",
    ],
    takeaway:
      "Use mocks to control conditions, and retain real integration checks.",
  }),

  chapter({
    number: 19,
    slug: "timeouts-retries-and-consistency",
    title: "Timeouts, Retries, and Consistency",
    description:
      "Handle delayed and uncertain results without hiding defects or creating duplicate work.",
    objectives: [
      "Distinguish timeout from rejection.",
      "Set bounded waiting policies.",
      "Recognize eventual consistency.",
    ],
    notes: [
      "A client timeout means the client stopped waiting. It does not prove the server performed no work.",
      "Retry only when the operation and failure mode permit it. Use bounded attempts and delays rather than infinite loops.",
      "For eventually consistent systems, poll a read operation until a defined condition or deadline. This practice API stores orders immediately and does not simulate eventual consistency.",
      "A response-time assertion checks one observation. It is not a load test or evidence of a percentile performance objective.",
      "The slow endpoint accepts delayMs from 0 to 2000. Keep the client's request timeout above the planned delay for the successful example.",
    ],
    example: example(
      "GET {{baseUrl}}/api/slow?delayMs=500 — Post-response",
      `pm.test("Delayed operation completes", () => {
  pm.response.to.have.status(200);
  pm.expect(pm.response.json()).to.deep.equal({ ready: true });
});

pm.test("Response fits a generous local diagnostic budget", () => {
  pm.expect(pm.response.responseTime).to.be.below(5000);
});`,
      "Send with a request timeout greater than 5000ms.",
      "The response eventually succeeds; the timing check is diagnostic only.",
      "Local scheduling and machine load affect elapsed response time.",
    ),
    exercise: {
      tasks: [
        "Temporarily set the client's request timeout below the 500ms delay.",
        "Observe the transport failure.",
        "Restore the timeout.",
      ],
      solution: example(
        "Interpretation notes",
        `Observed:
The client stops waiting before a response arrives.

Not established:
- The server rejected the request.
- No server-side work occurred.
- Retrying a write would be safe.

Next action:
Check the operation's retry and reconciliation contract.`,
        "Restore the normal timeout before running the collection.",
        "You distinguish a transport timeout from an API error response.",
        "A timeout may prevent normal response assertions from running.",
      ),
    },
    mistakes: [
      "Retrying writes blindly.",
      "Using unlimited polling.",
      "Calling one response-time sample a performance test.",
    ],
    takeaway:
      "Bound waiting and handle uncertain outcomes according to the operation's contract.",
  }),

  chapter({
    number: 20,
    slug: "api-security-checks",
    title: "API Security Checks for SDETs",
    description:
      "Verify access boundaries and input restrictions in the authorized local environment.",
    objectives: [
      "Check cross-user resource access.",
      "Inspect sensitive response fields.",
      "Test unexpected writable properties.",
    ],
    notes: [
      "Run security scenarios only against environments you are authorized to test. This lesson uses the local demo.",
      "A valid token must not allow a user to read or delete another user's order. This is an object-level authorization boundary.",
      "Create an order as Alice and retain its ID. Log in as Bob using the same demo password, saving Bob's token separately.",
      "The demo returns 404 to Bob for Alice's order to avoid revealing its existence. A different API may specify another deliberate response.",
      "The order API rejects extra body properties. A caller cannot set owner or totalCents through the request body.",
      "These checks are a focused regression set, not a complete security assessment.",
    ],
    example: example(
      "Cross-user access scenario",
      `1. Login as alice.
2. Save token as aliceToken.
3. Create an order and save its ID as aliceOrderId.
4. Login as bob.
5. Save token as bobToken.
6. GET /api/orders/{{aliceOrderId}} using bobToken.
7. DELETE /api/orders/{{aliceOrderId}} using bobToken.
8. GET the order using aliceToken to confirm it still exists.
9. DELETE the order using aliceToken.

Expected:
- Bob's GET: 404
- Bob's DELETE: 404
- Alice's verification GET: 200
- Alice's cleanup DELETE: 204`,
      "Use explicit request authorization so each step sends the intended user's token.",
      "Bob cannot access or delete Alice's resource.",
      "The owner read after Bob's rejected delete checks that the forbidden action had no effect.",
    ),
    exercise: {
      tasks: [
        "Send an order body with an added totalCents field.",
        "Use valid authentication.",
        "Assert rejection.",
      ],
      solution: example(
        "Unexpected property — Post-response",
        `// Body:
// {
//   "productId": "p1",
//   "quantity": 2,
//   "clientReference": "security-extra-field",
//   "totalCents": 1
// }

pm.test("Client cannot assign the calculated total", () => {
  pm.response.to.have.status(400);
  pm.expect(pm.response.json().error.code).to.equal("INVALID_ORDER");
});`,
        "Send the body to POST /api/orders with a valid token.",
        "The unexpected property is rejected.",
        "The server calculates totalCents from trusted product data.",
      ),
    },
    mistakes: [
      "Testing only missing-token scenarios.",
      "Accidentally using Alice's token in Bob's request.",
      "Assuming a rejected response proves no side effects without checking.",
    ],
    takeaway:
      "Test identity, object ownership, writable properties, and observable side effects.",
  }),

  chapter({
    number: 21,
    slug: "collection-runner-and-data",
    title: "Collection Runner and Data-driven Tests",
    description:
      "Run controlled input sets with expectations tied to each iteration.",
    objectives: [
      "Load a JSON data file.",
      "Read iteration data.",
      "Report positive and negative cases distinctly.",
    ],
    notes: [
      "Create a dedicated folder containing one request: GET {{baseUrl}}/api/products/{{productId}}.",
      "Use the JSON data file below in the Collection Runner. Select only that folder for this exercise.",
      "Iteration data supplies productId in the URL. Read expectedStatus explicitly with pm.iterationData.",
      "Use meaningful case names. A collection run repeats selected requests; it does not make dependent state automatically independent.",
    ],
    example: example(
      "product-cases.json",
      `[
  {
    "caseName": "keyboard exists",
    "productId": "p1",
    "expectedStatus": 200
  },
  {
    "caseName": "mouse exists",
    "productId": "p2",
    "expectedStatus": 200
  },
  {
    "caseName": "unknown product",
    "productId": "missing",
    "expectedStatus": 404
  }
]`,
      "Select the data file in the Collection Runner for the single-request folder.",
      "Three iterations execute using different product IDs.",
      "JSON preserves numeric expectedStatus values without CSV conversion ambiguity.",
    ),
    exercise: {
      tasks: [
        "Add the script below to the request.",
        "Run all three iterations.",
        "Inspect results by case name.",
      ],
      solution: example(
        "Data-driven request — Post-response",
        `const caseName = pm.iterationData.get("caseName");
const expectedStatus = Number(pm.iterationData.get("expectedStatus"));
const productId = pm.iterationData.get("productId");

pm.test(caseName + ": expected status", () => {
  pm.expect(pm.response.code).to.equal(expectedStatus);
});

pm.test(caseName + ": expected body", () => {
  const body = pm.response.json();

  if (expectedStatus === 200) {
    pm.expect(body.id).to.equal(productId);
  } else {
    pm.expect(body.error.code).to.equal("NOT_FOUND");
  }
});`,
        "Run the selected folder with product-cases.json.",
        "Each case produces status and body results.",
        "Expected outcomes come from the data rather than the received status.",
      ),
    },
    mistakes: [
      "Running unrelated workflow requests for every data row.",
      "Using the actual status to decide what status should have been expected.",
      "Losing numeric types when importing data.",
    ],
    takeaway:
      "Tie each iteration to explicit inputs and independent expected outcomes.",
  }),

  chapter({
    number: 22,
    slug: "cli-ci-and-reporting",
    title: "CLI Execution, CI, and Reports",
    description:
      "Run a compatible collection locally and in CI while preserving failure evidence.",
    objectives: [
      "Choose a runner compatible with the collection format.",
      "Start and stop the local API automatically.",
      "Produce JUnit results.",
      "Retain failed results in CI.",
    ],
    notes: [
      "Newman runs Postman Collection v2.1 JSON. Do not pass a collection v3 representation to it and assume compatibility.",
      "Postman CLI supports newer Postman workflows and formats. This course uses Newman with an explicitly generated v2.1 collection to keep the local example self-contained.",
      "Install the tools in the API practice project: npm install --save-dev newman start-server-and-test.",
      "Chapter 23 generates collections/shopping.postman_collection.json. Generate that file before running the commands below.",
      "Stop a manually running server on port 5050 first. start-server-and-test starts the service, waits for health, runs Newman, and stops the service.",
      "The generated collection acquires its demo token during execution. It does not need an exported token or hosted Postman account.",
      "Newman failures must keep a nonzero exit status. Do not suppress them merely to upload a report.",
    ],
    example: example(
      ".github/workflows/api.yml",
      `name: API checks

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: npm

      - name: Install locked dependencies
        run: npm ci

      - name: Generate the course collection
        run: node build-collection.mjs

      - name: Run API checks
        run: >
          npx start-server-and-test
          "node server.mjs"
          http-get://127.0.0.1:5050/health
          "newman run collections/shopping.postman_collection.json --env-var baseUrl=http://127.0.0.1:5050 --timeout-request 5000 --reporters cli,junit --reporter-junit-export reports/api.xml"

      - name: Retain results
        if: \${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: api-results
          path: reports/
          if-no-files-found: warn
          retention-days: 7`,
      'npx start-server-and-test "node server.mjs" http-get://127.0.0.1:5050/health "newman run collections/shopping.postman_collection.json --env-var baseUrl=http://127.0.0.1:5050 --timeout-request 5000 --reporters cli,junit --reporter-junit-export reports/api.xml"',
      "After chapter 23 setup, the run executes the API workflow and writes JUnit XML.",
      "Commit package.json, package-lock.json, server.mjs, build-collection.mjs, and this workflow to the practice repository.",
    ),
    exercise: {
      tasks: [
        "Complete chapter 23's collection generator.",
        "Run the command locally.",
        "Inspect reports/api.xml.",
        "Run the committed workflow in GitHub Actions.",
      ],
      solution: example(
        "Terminal — API practice project",
        `npm install --save-dev newman start-server-and-test
node build-collection.mjs
npx start-server-and-test "node server.mjs" http-get://127.0.0.1:5050/health "newman run collections/shopping.postman_collection.json --env-var baseUrl=http://127.0.0.1:5050 --timeout-request 5000 --reporters cli,junit --reporter-junit-export reports/api.xml"`,
        "Run from the practice project with no other server using port 5050.",
        "The local API and collection run complete, and the server is stopped.",
        "The report records what ran; it does not establish untested performance or security properties.",
      ),
    },
    mistakes: [
      "Mixing incompatible collection formats and runners.",
      "Committing live credentials.",
      "Starting tests before health is ready.",
      "Suppressing the test process's exit status.",
    ],
    takeaway:
      "Match the runner to the format and make CI execution repeatable and diagnosable.",
  }),

  chapter({
    number: 23,
    slug: "shopping-api-project",
    title: "Practice: Shopping API Test Project",
    description:
      "Generate and run a complete create-read-delete collection with negative checks.",
    objectives: [
      "Combine authentication and order workflows.",
      "Verify independent business expectations.",
      "Capture and clean up owned records.",
      "Run the same collection in Postman and CI.",
    ],
    notes: [
      "Create build-collection.mjs in the API practice project. This Node script writes a Postman Collection v2.1 JSON file.",
      "Import the generated JSON into Postman and select SDET Local, or run it with the command from chapter 22.",
      "The collection checks product data, logs in Alice, creates a two-keyboard order, reads it, deletes it, verifies deletion, and exercises rejected requests.",
      "Its generated reference identifies the current order. The server does not treat that reference as an idempotency key.",
      "The collection's normal workflow performs cleanup. If execution is interrupted, inspect the owned order or restart the local in-memory server.",
      "This project does not prove database durability, inventory reservation, payment behavior, or production OAuth integration.",
    ],
    example: example(
      "build-collection.mjs",
      `import { mkdir, writeFile } from "node:fs/promises";

function request(name, method, path, script, body, protectedRequest = false) {
  const headers = [
    { key: "Accept", value: "application/json" },
  ];

  if (body !== undefined) {
    headers.push({ key: "Content-Type", value: "application/json" });
  }

  if (protectedRequest) {
    headers.push({ key: "Authorization", value: "Bearer {{token}}" });
  }

  return {
    name,
    request: {
      method,
      auth: { type: "noauth" },
      header: headers,
      url: "{{baseUrl}}" + path,
      ...(body === undefined ? {} : {
        body: {
          mode: "raw",
          raw: JSON.stringify(body, null, 2),
          options: { raw: { language: "json" } },
        },
      }),
    },
    event: [{
      listen: "test",
      script: {
        type: "text/javascript",
        exec: script.split("\\n"),
      },
    }],
  };
}

const items = [
  request(
    "01 - Product contract",
    "GET",
    "/api/products/p1",
    [
      'pm.test("Known product is correct", () => {',
      '  pm.response.to.have.status(200);',
      '  const body = pm.response.json();',
      '  pm.expect(body.id).to.equal("p1");',
      '  pm.expect(body.name).to.equal("Keyboard");',
      '  pm.expect(body.priceCents).to.equal(2500);',
      '});',
    ].join("\\n")
  ),

  request(
    "02 - Login Alice",
    "POST",
    "/api/login",
    [
      'pm.collectionVariables.unset("token");',
      'pm.collectionVariables.unset("orderId");',
      'pm.collectionVariables.set("reference", pm.variables.replaceIn("{{$guid}}"));',
      'pm.test("Login succeeds", () => {',
      '  pm.response.to.have.status(200);',
      '  const token = pm.response.json().accessToken;',
      '  pm.expect(token).to.be.a("string").and.not.empty;',
      '  pm.collectionVariables.set("token", token);',
      '});',
    ].join("\\n"),
    { username: "alice", password: "demo-password" }
  ),

  request(
    "03 - Create order",
    "POST",
    "/api/orders",
    [
      'pm.test("Creates the correct order", () => {',
      '  pm.response.to.have.status(201);',
      '  const body = pm.response.json();',
      '  pm.expect(body.id).to.be.a("string").and.not.empty;',
      '  pm.collectionVariables.set("orderId", body.id);',
      '  pm.expect(body.productId).to.equal("p1");',
      '  pm.expect(body.quantity).to.equal(2);',
      '  pm.expect(body.totalCents).to.equal(5000);',
      '  pm.expect(body.clientReference).to.equal(pm.collectionVariables.get("reference"));',
      '  pm.expect(pm.response.headers.get("Location")).to.equal("/api/orders/" + body.id);',
      '});',
    ].join("\\n"),
    { productId: "p1", quantity: 2, clientReference: "{{reference}}" },
    true
  ),

  request(
    "04 - Read saved order",
    "GET",
    "/api/orders/{{orderId}}",
    [
      'pm.test("Saved values match the scenario", () => {',
      '  pm.response.to.have.status(200);',
      '  pm.expect(pm.response.json()).to.deep.equal({',
      '    id: pm.collectionVariables.get("orderId"),',
      '    productId: "p1",',
      '    quantity: 2,',
      '    totalCents: 5000,',
      '    clientReference: pm.collectionVariables.get("reference"),',
      '    status: "created"',
      '  });',
      '});',
    ].join("\\n"),
    undefined,
    true
  ),

  request(
    "05 - Delete owned order",
    "DELETE",
    "/api/orders/{{orderId}}",
    [
      'pm.test("Deletes the owned order", () => {',
      '  pm.response.to.have.status(204);',
      '  pm.expect(pm.response.text()).to.equal("");',
      '});',
    ].join("\\n"),
    undefined,
    true
  ),

  request(
    "06 - Verify deletion",
    "GET",
    "/api/orders/{{orderId}}",
    [
      'pm.test("Deleted order is unavailable", () => {',
      '  pm.response.to.have.status(404);',
      '  pm.expect(pm.response.json().error.code).to.equal("NOT_FOUND");',
      '});',
    ].join("\\n"),
    undefined,
    true
  ),

  request(
    "07 - Reject fractional quantity",
    "POST",
    "/api/orders",
    [
      'pm.test("Rejects invalid quantity", () => {',
      '  pm.response.to.have.status(400);',
      '  pm.expect(pm.response.json().error.code).to.equal("INVALID_ORDER");',
      '});',
    ].join("\\n"),
    { productId: "p1", quantity: 1.5, clientReference: "{{reference}}-invalid" },
    true
  ),

  request(
    "08 - Verify no invalid order was saved",
    "GET",
    "/api/orders",
    [
      'pm.test("No record uses the invalid reference", () => {',
      '  pm.response.to.have.status(200);',
      '  const reference = pm.collectionVariables.get("reference") + "-invalid";',
      '  const items = pm.response.json().items;',
      '  pm.expect(items).to.be.an("array");',
      '  pm.expect(items.some((item) => item.clientReference === reference)).to.equal(false);',
      '});',
    ].join("\\n"),
    undefined,
    true
  ),

  request(
    "09 - Reject missing authentication",
    "GET",
    "/api/me",
    [
      'pm.test("Requires authentication", () => {',
      '  pm.response.to.have.status(401);',
      '  pm.expect(pm.response.json().error.code).to.equal("UNAUTHORIZED");',
      '});',
    ].join("\\n")
  ),
];

const collection = {
  info: {
    name: "SDET Shopping API",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    description: "Local teaching workflow with explicit assertions and owned cleanup.",
  },
  variable: [
    { key: "baseUrl", value: "http://127.0.0.1:5050", type: "string" },
    { key: "token", value: "", type: "string" },
    { key: "orderId", value: "", type: "string" },
    { key: "reference", value: "", type: "string" },
  ],
  item: items,
};

await mkdir("collections", { recursive: true });
await writeFile(
  "collections/shopping.postman_collection.json",
  JSON.stringify(collection, null, 2)
);

console.log("Created collections/shopping.postman_collection.json");`,
      "node build-collection.mjs",
      "A compatible collection containing nine requests is generated.",
      "The generator produces a real importable artifact locally rather than requiring you to assemble every workflow request manually.",
    ),
    exercise: {
      tasks: [
        "Generate and import the collection.",
        "Run all nine requests in order.",
        "Inspect the saved-order and cleanup assertions.",
        "Run the same collection through chapter 22's local CLI command.",
        "Document remaining risks, including cross-user access, duplicate POSTs, and stock behavior.",
      ],
      solution: example(
        "Terminal — API practice project",
        `node build-collection.mjs

# With the server already running:
npx newman run collections/shopping.postman_collection.json --env-var baseUrl=http://127.0.0.1:5050 --timeout-request 5000 --reporters cli,junit --reporter-junit-export reports/api.xml`,
        "Install Newman as described in chapter 22 before running.",
        "All nine requests execute and their assertions pass against the unchanged demo.",
        "Do not use --bail for this cleanup exercise: a failed assertion should not unnecessarily prevent later cleanup requests from being attempted.",
      ),
    },
    mistakes: [
      "Claiming persistence coverage from in-memory storage.",
      "Comparing only the create response without reading the resource.",
      "Deleting resources not created by the workflow.",
      "Reporting the small suite as complete security or performance coverage.",
    ],
    takeaway:
      "Connect explicit requirements to observable service outcomes, owned data, and repeatable execution.",
  }),
];
