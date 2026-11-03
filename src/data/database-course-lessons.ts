import type {
  DatabaseExample,
  DatabaseLessonData,
  DatabaseSection,
} from "./database-lessons";

type Chapter = {
  number: number;
  slug: string;
  title: string;
  description: string;
  objectives: string[];
  notes: string[];
  examples: DatabaseExample[];
  tasks: string[];
  solution: DatabaseExample;
  mistakes: string[];
  takeaway: string;
  extraSections?: DatabaseSection[];
};

function example(
  filename: string,
  code: string,
  command: string,
  expected: string,
  explanation: string,
): DatabaseExample {
  return {
    title: filename,
    filename,
    code,
    command,
    expected,
    explanation,
  };
}

function sql(
  filename: string,
  code: string,
  expected: string,
  explanation: string,
): DatabaseExample {
  return example(
    filename,
    code,
    "After completing Chapters 2–3, run this SQL in the practice database using psql or your database client's query editor.",
    expected,
    explanation,
  );
}

const migrationAndPermissionSections: DatabaseSection[] = [
  {
    title: "Testing schema migrations",
    paragraphs: [
      "A migration changes the database structure or transforms existing data. Test it against representative records created using the previous schema.",
      "Verify that existing rows survive, new defaults behave as intended, and new constraints reject invalid data without unexpectedly rejecting valid historical records.",
      "A successful migration on an empty database does not prove it works on a populated database.",
      "The example below is a reversible teaching exercise. Production migrations also require checks for deployment compatibility, lock duration, large-table behavior, and the team's recovery strategy.",
    ],
    example: sql(
      "Reversible migration validation",
      `BEGIN;

CREATE TEMP TABLE customer_migration_demo (
  id integer PRIMARY KEY,
  name text NOT NULL
);

INSERT INTO customer_migration_demo (id, name)
VALUES (1, 'Existing customer');

ALTER TABLE customer_migration_demo
ADD COLUMN active boolean NOT NULL DEFAULT true;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM customer_migration_demo
    WHERE id = 1
      AND name = 'Existing customer'
      AND active = true
  ) THEN
    RAISE EXCEPTION 'Migration changed or lost existing data';
  END IF;
END;
$$;

INSERT INTO customer_migration_demo (id, name)
VALUES (2, 'New customer');

SELECT id, name, active
FROM customer_migration_demo
ORDER BY id;

ROLLBACK;`,
      "Both existing and new customers have active = true. The temporary migration exercise is rolled back.",
      "The assertions cover historical data and behavior after the schema change.",
    ),
  },
  {
    title: "Migration test checklist",
    paragraphs: [
      "Use the actual migration scripts in integration tests. Verify the upgrade path from the supported previous schema, rather than recreating only the final schema.",
    ],
    table: {
      headers: ["Check", "What to verify"],
      rows: [
        [
          "Existing records",
          "Identifiers, relationships, and business values remain correct.",
        ],
        [
          "Backfill",
          "Historical rows receive the intended values, including edge cases.",
        ],
        [
          "New writes",
          "The upgraded application can create and update valid records.",
        ],
        ["Constraints", "Invalid values are rejected after the migration."],
        [
          "Compatibility",
          "Application versions that overlap during deployment remain compatible where required.",
        ],
        [
          "Recovery",
          "The documented rollback or forward-fix process is tested.",
        ],
      ],
    },
  },
  {
    title: "Testing database permissions",
    paragraphs: [
      "Application roles and reporting roles should have only the access their responsibilities require. A reporting role might read data but must not modify it.",
      "Test with the actual restricted identity. Successfully reading data with an administrator account does not prove that role permissions are correct.",
      "The following demonstration requires role-management privileges. Run it only in the disposable local course database. Its role and table are removed by rollback.",
      "This isolated table demonstrates a permission boundary. It does not establish that a role has no access through other schemas, inherited roles, functions, or ownership.",
    ],
    example: sql(
      "Read-only role verification",
      `BEGIN;

CREATE ROLE sdet_readonly_demo NOLOGIN;

CREATE TABLE public.permission_demo (
  id integer PRIMARY KEY,
  value text NOT NULL
);

INSERT INTO public.permission_demo VALUES (1, 'original');

GRANT USAGE ON SCHEMA public TO sdet_readonly_demo;
GRANT SELECT ON public.permission_demo TO sdet_readonly_demo;

SET LOCAL ROLE sdet_readonly_demo;

SELECT * FROM public.permission_demo;

DO $$
BEGIN
  BEGIN
    UPDATE public.permission_demo
    SET value = 'changed'
    WHERE id = 1;

    RAISE EXCEPTION 'FAIL: read-only role could update';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'PASS: update denied';
  END;
END;
$$;

RESET ROLE;

SELECT value FROM public.permission_demo WHERE id = 1;

ROLLBACK;`,
      "SELECT succeeds, UPDATE is denied, and the stored value remains original.",
      "The test catches the expected permission error rather than treating any failure as a passing result.",
    ),
  },
];

const persistenceSections: DatabaseSection[] = [
  {
    title: "Eventual consistency and read replicas",
    paragraphs: [
      "Some operations persist data asynchronously, or queries read from a replica that has not yet replayed a committed change. An immediate missing row can therefore have a different meaning from a permanent failure.",
      "Identify the required consistency contract before adding retries. Our local practice API commits before returning success, and direct reads use the primary database, so its normal persistence checks do not require polling.",
      "For an asynchronous system, poll a narrowly identified record until the expected condition appears or a bounded deadline expires.",
      "Do not convert query errors into an empty result and silently retry them. Authentication failures, invalid SQL, and unavailable databases need to remain visible.",
      "Use fresh statements with appropriate transaction isolation. Repeated reads inside one Repeatable Read transaction can keep observing the same old snapshot.",
    ],
    example: example(
      "Bounded polling helper — asynchronous systems only",
      `import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import type { Pool } from "pg";

export async function waitForOrder(
  pool: Pool,
  reference: string,
  expectedStatus: string,
  timeoutMs = 5000,
) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const result = await pool.query(
      "SELECT id, status FROM orders WHERE client_reference = $1",
      [reference],
    );

    assert.ok(result.rowCount !== null && result.rowCount <= 1);

    if (result.rows[0]?.status === expectedStatus) {
      return result.rows[0];
    }

    const remaining = deadline - Date.now();

    if (remaining <= 0) break;

    await delay(Math.min(100, remaining));
  }

  throw new Error(
    "Order did not reach the expected status within the polling window",
  );
}`,
      "Use this helper only with a controlled asynchronous workflow. Configure a finite database statement timeout on the pool as well.",
      "The helper returns the matching order or fails after the polling window, plus any in-flight query time.",
      "A polling deadline does not cancel an already-running query. Query timeouts and test timeouts are separate controls.",
    ),
  },
  {
    title: "Soft deletion",
    paragraphs: [
      "Soft deletion marks a record as deleted instead of physically removing it. A common design uses deleted_at, but the application contract defines the actual behavior.",
      "Verify that normal reads exclude deleted records, privileged recovery flows behave correctly, and related records remain consistent.",
      "A deleted_at column does not automatically filter queries or release unique values. Those behaviors require explicit application or database rules.",
      "The example uses a temporary table and does not alter the shopping schema.",
    ],
    example: sql(
      "Soft-delete visibility",
      `BEGIN;

CREATE TEMP TABLE soft_delete_demo (
  id integer PRIMARY KEY,
  email text NOT NULL UNIQUE,
  deleted_at timestamptz
);

INSERT INTO soft_delete_demo (id, email)
VALUES (1, 'customer@example.test');

UPDATE soft_delete_demo
SET deleted_at = clock_timestamp()
WHERE id = 1;

SELECT count(*) AS physical_rows
FROM soft_delete_demo
WHERE id = 1;

SELECT count(*) AS visible_rows
FROM soft_delete_demo
WHERE id = 1 AND deleted_at IS NULL;

ROLLBACK;`,
      "The physical count is 1; the normal visible count is 0.",
      "The row still exists. Each application access path must enforce its intended visibility rules.",
    ),
  },
  {
    title: "Audit fields and change history",
    paragraphs: [
      "Typical audit fields include created_at, updated_at, created_by, and updated_by. Verify which layer supplies them and which identity they represent.",
      "A DEFAULT timestamp initializes a value on insert; it does not automatically update the column on later writes. That requires application logic or a trigger.",
      "For an update, check that created_at is unchanged and updated_at follows the documented behavior. Do not require strict timestamp inequality when precision or transaction-time semantics allow equal values.",
      "PostgreSQL now() represents the transaction start time. clock_timestamp() reads the current wall-clock time. Choose assertions that match the implementation.",
      "If the system maintains an audit history, verify the actor, action, record identifier, relevant before/after values, and that unauthorized changes produce no successful business update.",
    ],
    table: {
      headers: ["Scenario", "Expected evidence"],
      rows: [
        ["Create", "Correct creator identity and creation timestamp."],
        [
          "Update",
          "Creation metadata preserved; update metadata follows the contract.",
        ],
        ["Soft delete", "Deletion marker and actor recorded when required."],
        [
          "Rejected change",
          "Business data remains unchanged; security logging follows its own contract.",
        ],
        [
          "Audit history",
          "The recorded change belongs to the correct entity and actor.",
        ],
      ],
    },
  },
];

const frameworkPersistenceSections: DatabaseSection[] = [
  {
    title: "Playwright: API request followed by database assertions",
    paragraphs: [
      "This integration test creates its own product, sends an order request to the Chapter 19 API, and independently verifies the stored order and stock.",
      "Save it in the practice project with @playwright/test and pg installed. Start server.mjs and set DATABASE_URL before running it.",
      "The test uses the APIRequestContext fixture and Node-side database access. It does not open a browser.",
    ],
    example: example(
      "tests/order-persistence.spec.ts",
      `import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";

test("API order is persisted correctly", async ({ request }) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
    statement_timeout: 5000,
  });

  const runId = randomUUID();
  const productId = "pw-product-" + runId;
  const reference = "pw-order-" + runId;
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:5052";

  try {
    await pool.query(
      "INSERT INTO products " +
      "(id, name, category, price_cents, stock) " +
      "VALUES ($1, 'Playwright Product', 'test', 2500, 10)",
      [productId],
    );

    const response = await request.post(apiUrl + "/orders", {
      data: {
        customerId: "c1",
        productId,
        quantity: 2,
        clientReference: reference,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.id).toEqual(expect.any(String));

    const stored = await pool.query(
      "SELECT o.customer_id, o.total_cents, " +
      "i.product_id, i.quantity, i.unit_price_cents " +
      "FROM orders o JOIN order_items i ON i.order_id = o.id " +
      "WHERE o.id = $1 AND o.client_reference = $2",
      [body.id, reference],
    );

    expect(stored.rowCount).toBe(1);
    expect(stored.rows[0]).toEqual({
      customer_id: "c1",
      total_cents: 5000,
      product_id: productId,
      quantity: 2,
      unit_price_cents: 2500,
    });

    const stock = await pool.query(
      "SELECT stock FROM products WHERE id = $1",
      [productId],
    );

    expect(stock.rows[0].stock).toBe(8);
  } finally {
    try {
      await pool.query(
        "DELETE FROM orders WHERE client_reference = $1",
        [reference],
      );
      await pool.query(
        "DELETE FROM products WHERE id = $1",
        [productId],
      );
    } finally {
      await pool.end();
    }
  }
});`,
      "npx playwright test tests/order-persistence.spec.ts",
      "The API returns 201, the database contains the expected order item, and stock is 8.",
      "Expected values come from the controlled input, not from copying the API response.",
    ),
  },
  {
    title: "Cypress: Node-side persistence tasks",
    paragraphs: [
      "These tasks create, inspect, and clean up data owned by a Cypress test. Database credentials stay in the Node process.",
      "Save this as cypress/database-tasks.ts in the Cypress project, with pg and @types/pg installed.",
      "The cleanup task uses the generated reference and product ID. It does not delete shared orders or products.",
    ],
    example: example(
      "cypress/database-tasks.ts",
      `import { Client } from "pg";
import { randomUUID } from "node:crypto";

type OwnedData = {
  productId: string;
  reference: string;
};

async function withClient<T>(
  action: (client: Client) => Promise<T>,
): Promise<T> {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
    statement_timeout: 5000,
  });

  try {
    await client.connect();
    return await action(client);
  } finally {
    await client.end();
  }
}

export const databaseTasks = {
  newOrderIdentity(): OwnedData {
    const id = randomUUID();
    return {
      productId: "cy-product-" + id,
      reference: "cy-order-" + id,
    };
  },

  async seedOrderProduct(data: OwnedData) {
    return withClient(async (client) => {
      await client.query(
        "INSERT INTO products " +
        "(id, name, category, price_cents, stock) " +
        "VALUES ($1, 'Cypress Product', 'test', 2500, 10)",
        [data.productId],
      );
      return null;
    });
  },

  async readOrderPersistence(data: OwnedData) {
    return withClient(async (client) => {
      const order = await client.query(
        "SELECT o.customer_id, o.total_cents, " +
        "i.product_id, i.quantity, i.unit_price_cents " +
        "FROM orders o JOIN order_items i ON i.order_id = o.id " +
        "WHERE o.client_reference = $1",
        [data.reference],
      );

      const product = await client.query(
        "SELECT stock FROM products WHERE id = $1",
        [data.productId],
      );

      return {
        items: order.rows,
        stock: product.rows[0]?.stock ?? null,
      };
    });
  },

  async cleanupOrderData(data: OwnedData) {
    return withClient(async (client) => {
      await client.query(
        "DELETE FROM orders WHERE client_reference = $1",
        [data.reference],
      );
      await client.query(
        "DELETE FROM products WHERE id = $1",
        [data.productId],
      );
      return null;
    });
  },
};`,
      "Register these tasks in your existing Cypress setupNodeEvents function using the configuration example below.",
      "Cypress can invoke narrow operations without receiving database credentials.",
      "Each operation closes its connection in finally. A task returns null when it has no other result.",
    ),
  },
  {
    title: "Register the Cypress tasks",
    paragraphs: [
      "Add the import to your existing cypress.config.ts, then register databaseTasks inside setupNodeEvents. Preserve your existing configuration and task handlers.",
      "This example uses the extensionless relative import resolved by Cypress's TypeScript configuration loader.",
    ],
    example: example(
      "Cypress task registration",
      `// At the top of cypress.config.ts:
import { databaseTasks } from "./cypress/database-tasks";

// Inside your existing setupNodeEvents(on, config):
on("task", databaseTasks);`,
      "Merge these lines into cypress.config.ts; they are not a replacement for the entire file.",
      "The four database task names become available to the test.",
      "Keep DATABASE_URL in the environment of the process launching Cypress.",
    ),
  },
  {
    title: "Cypress: API request and persisted result",
    paragraphs: [
      "Start the Chapter 19 API before running this spec. The test obtains its identifiers before seeding, so afterEach can attempt cleanup even if setup or an assertion fails.",
      "afterEach is ordinary test cleanup, not a guarantee against process termination. Disposable databases remain useful for recovering from interrupted runs.",
    ],
    example: example(
      "cypress/e2e/order-persistence.cy.ts",
      `type OwnedData = {
  productId: string;
  reference: string;
};

describe("API-to-database persistence", () => {
  let owned: OwnedData | undefined;

  beforeEach(() => {
    owned = undefined;

    cy.task<OwnedData>("newOrderIdentity").then((data) => {
      owned = data;
      return cy.task("seedOrderProduct", data);
    });
  });

  afterEach(() => {
    if (owned) {
      cy.task("cleanupOrderData", owned);
    }
  });

  it("persists the order and updates stock", () => {
    const data = owned!;

    cy.request({
      method: "POST",
      url: "http://127.0.0.1:5052/orders",
      body: {
        customerId: "c1",
        productId: data.productId,
        quantity: 2,
        clientReference: data.reference,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.totalCents).to.equal(5000);
    });

    cy.task("readOrderPersistence", data).should("deep.equal", {
      items: [{
        customer_id: "c1",
        total_cents: 5000,
        product_id: data.productId,
        quantity: 2,
        unit_price_cents: 2500,
      }],
      stock: 8,
    });
  });
});`,
      "Run this spec in your Cypress project with the local API running and DATABASE_URL set.",
      "The request succeeds and independent database assertions confirm its effects.",
      "The assertion does not automatically rerun the database task. This API commits before responding, so polling is unnecessary.",
    ),
  },
];

const concurrencyProjectSections: DatabaseSection[] = [
  {
    title: "Concurrent purchases must not oversell",
    paragraphs: [
      "Create one product with stock 1, then submit two purchase requests with different references. Exactly one should succeed, and the other should report insufficient stock.",
      "Use a separate database connection to hold the product row lock while both requests are submitted. This creates a controlled contention window before releasing the requests to proceed.",
      "The short delay below is a contention aid, not proof that both server transactions reached the lock at exactly the same instant. Deterministic scheduling tests require additional server-side synchronization or lock-wait observation.",
      "The correctness assertions check committed outcomes: one order, one item, and stock zero.",
    ],
    example: example(
      "scripts/concurrent-orders.ts",
      `import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  connectionTimeoutMillis: 5000,
  statement_timeout: 5000,
});

const apiUrl = process.env.API_URL ?? "http://127.0.0.1:5052";
const runId = randomUUID();
const productId = "concurrent-" + runId;
const references = ["first-" + runId, "second-" + runId];

async function purchase(reference: string) {
  const response = await fetch(apiUrl + "/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: "c1",
      productId,
      quantity: 1,
      clientReference: reference,
    }),
    signal: AbortSignal.timeout(10000),
  });

  return {
    status: response.status,
    body: await response.json(),
  };
}

type PurchaseResult = Awaited<ReturnType<typeof purchase>>;

let pending:
  Promise<PromiseSettledResult<PurchaseResult>[]> | undefined;

try {
  await pool.query(
    "INSERT INTO products " +
    "(id, name, category, price_cents, stock) " +
    "VALUES ($1, 'Last Item', 'test', 2500, 1)",
    [productId],
  );

  const blocker = await pool.connect();

  try {
    await blocker.query("BEGIN");
    await blocker.query(
      "SELECT id FROM products WHERE id = $1 FOR UPDATE",
      [productId],
    );

    pending = Promise.allSettled(references.map(purchase));

    // Give the local server an opportunity to queue both requests.
    await delay(300);
  } finally {
    try {
      await blocker.query("ROLLBACK");
    } finally {
      blocker.release();
    }
  }

  const settled = await pending!;

  const results = settled.map((result) => {
    if (result.status === "rejected") {
      throw result.reason;
    }
    return result.value;
  });

  assert.deepEqual(
    results.map((result) => result.status).sort((a, b) => a - b),
    [201, 409],
  );

  const rejected = results.find((result) => result.status === 409);
  assert.equal(rejected?.body.error, "INSUFFICIENT_STOCK");

  const stored = await pool.query(
    "SELECT o.id, i.quantity, i.unit_price_cents, o.total_cents " +
    "FROM orders o JOIN order_items i ON i.order_id = o.id " +
    "WHERE o.client_reference = ANY($1::text[])",
    [references],
  );

  assert.equal(stored.rowCount, 1);
  assert.equal(stored.rows[0].quantity, 1);
  assert.equal(stored.rows[0].unit_price_cents, 2500);
  assert.equal(stored.rows[0].total_cents, 2500);

  const product = await pool.query(
    "SELECT stock FROM products WHERE id = $1",
    [productId],
  );
  assert.equal(product.rows[0].stock, 0);

  console.log("PASS: one purchase succeeded; stock was not oversold");
} finally {
  // Avoid cleaning up while a submitted client request is still pending.
  if (pending) {
    await pending;
  }

  try {
    await pool.query(
      "DELETE FROM orders WHERE client_reference = ANY($1::text[])",
      [references],
    );
    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [productId],
    );
  } finally {
    await pool.end();
  }
}`,
      "Start server.mjs, set DATABASE_URL, then run: npx tsx scripts/concurrent-orders.ts",
      "One response is 201, the other is 409, exactly one order item exists, and stock is zero.",
      "The application uses a row lock and rechecks stock before writing. Do not assume which request wins.",
    ),
  },
];

function chapter(data: Chapter): DatabaseLessonData {
  const sections: DatabaseSection[] = [
    {
      title: "Concepts and approach",
      paragraphs: data.notes,
    },
    ...(data.extraSections ?? []),
    ...data.examples.map((item, index) => ({
      title: `Example ${index + 1}: ${item.title}`,
      paragraphs: [],
      example: item,
    })),
  ];

  return {
    number: data.number,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: {
      introduction: data.description,
      objectives: data.objectives,
      sections,
      mistakes: data.mistakes,
      exercise: {
        title: `Practice: ${data.title}`,
        tasks: data.tasks,
        solution: data.solution,
      },
      takeaway: data.takeaway,
    },
  };
}

const schemaSql = `BEGIN;

CREATE TABLE customers (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  phone text
);

CREATE TABLE products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  stock integer NOT NULL CHECK (stock >= 0),
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE orders (
  id text PRIMARY KEY,
  customer_id text NOT NULL REFERENCES customers(id),
  client_reference text NOT NULL UNIQUE,
  status text NOT NULL
    CHECK (status IN ('created', 'paid', 'cancelled')),
  total_cents integer NOT NULL CHECK (total_cents >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  order_id text NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 5),
  unit_price_cents integer NOT NULL CHECK (unit_price_cents >= 0),
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO customers (id, email, name, phone) VALUES
  ('c1', 'alice@example.test', 'Alice', NULL),
  ('c2', 'bob@example.test', 'Bob', '555-0102'),
  ('c3', 'cara@example.test', 'Cara', NULL);

INSERT INTO products
  (id, name, category, price_cents, stock, attributes)
VALUES
  ('p1', 'Keyboard', 'accessories', 2500, 10,
    '{"color":"black","wireless":false}'::jsonb),
  ('p2', 'Mouse', 'accessories', 1500, 20,
    '{"color":"white","wireless":true}'::jsonb),
  ('p3', 'Monitor', 'displays', 20000, 3,
    '{"sizeInches":27}'::jsonb),
  ('p4', 'Cable', 'accessories', 500, 0, '{}'::jsonb);

INSERT INTO orders
  (id, customer_id, client_reference, status, total_cents, created_at)
VALUES
  ('o1', 'c1', 'seed-o1', 'paid', 5000, '2026-01-10T10:00:00Z'),
  ('o2', 'c1', 'seed-o2', 'created', 1500, '2026-01-11T10:00:00Z'),
  ('o3', 'c2', 'seed-o3', 'paid', 20000, '2026-02-01T10:00:00Z');

INSERT INTO order_items
  (order_id, product_id, quantity, unit_price_cents)
VALUES
  ('o1', 'p1', 2, 2500),
  ('o2', 'p2', 1, 1500),
  ('o3', 'p3', 1, 20000);

COMMIT;`;

const apiServer = `import express from "express";
import { Pool } from "pg";
import { randomUUID } from "node:crypto";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  connectionTimeoutMillis: 5000,
  statement_timeout: 5000,
});

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ error: "DATABASE_UNAVAILABLE" });
  }
});

app.post("/orders", async (req, res) => {
  const body = req.body;
  const allowed = [
    "customerId", "productId", "quantity", "clientReference"
  ];

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).some((key) => !allowed.includes(key)) ||
    typeof body.customerId !== "string" ||
    typeof body.productId !== "string" ||
    typeof body.clientReference !== "string" ||
    body.clientReference.length < 1 ||
    body.clientReference.length > 100 ||
    !Number.isInteger(body.quantity) ||
    body.quantity < 1 ||
    body.quantity > 5
  ) {
    return res.status(400).json({ error: "INVALID_ORDER" });
  }

  let client;

  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const customer = await client.query(
      "SELECT id FROM customers WHERE id = $1",
      [body.customerId],
    );

    if (customer.rowCount !== 1) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "CUSTOMER_NOT_FOUND" });
    }

    const result = await client.query(
      "SELECT price_cents, stock FROM products WHERE id = $1 FOR UPDATE",
      [body.productId],
    );

    if (result.rowCount !== 1) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
    }

    const product = result.rows[0];

    if (product.stock < body.quantity) {
      await client.query("ROLLBACK");
      return res.status(409).json({ error: "INSUFFICIENT_STOCK" });
    }

    const id = randomUUID();
    const total = product.price_cents * body.quantity;

    await client.query(
      "INSERT INTO orders " +
      "(id, customer_id, client_reference, status, total_cents) " +
      "VALUES ($1, $2, $3, 'created', $4)",
      [id, body.customerId, body.clientReference, total],
    );

    await client.query(
      "INSERT INTO order_items " +
      "(order_id, product_id, quantity, unit_price_cents) " +
      "VALUES ($1, $2, $3, $4)",
      [id, body.productId, body.quantity, product.price_cents],
    );

    await client.query(
      "UPDATE products SET stock = stock - $1 WHERE id = $2",
      [body.quantity, body.productId],
    );

    await client.query("COMMIT");

    return res.status(201).json({
      id,
      customerId: body.customerId,
      productId: body.productId,
      quantity: body.quantity,
      totalCents: total,
      clientReference: body.clientReference,
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK").catch(() => {});
    }

    const conflict = error?.code === "23505";

    return res.status(conflict ? 409 : 500).json({
      error: conflict ? "DUPLICATE_REFERENCE" : "INTERNAL_ERROR",
    });
  } finally {
    client?.release();
  }
});

app.use((error, _req, res, _next) => {
  if (error?.type === "entity.too.large") {
    return res.status(413).json({ error: "BODY_TOO_LARGE" });
  }

  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "INVALID_JSON" });
  }

  return res.status(500).json({ error: "INTERNAL_ERROR" });
});

const server = app.listen(5052, "127.0.0.1", () => {
  console.log("Database practice API: http://127.0.0.1:5052");
});

function stop() {
  server.close(() => {
    pool.end().catch(() => {
      process.exitCode = 1;
    });
  });
}

process.once("SIGTERM", stop);
process.once("SIGINT", stop);`;

const capstoneTest = `import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  statement_timeout: 5000,
});

const baseUrl = process.env.API_URL ?? "http://127.0.0.1:5052";
const runId = randomUUID();
const productId = "product-" + runId;
const reference = "order-" + runId;
const invalidReference = "invalid-" + runId;

async function postOrder(body: Record<string, unknown>) {
  return fetch(baseUrl + "/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  });
}

try {
  await pool.query(
    "INSERT INTO products " +
    "(id, name, category, price_cents, stock) " +
    "VALUES ($1, 'Test Keyboard', 'accessories', 2500, 10)",
    [productId],
  );

  const input = {
    customerId: "c1",
    productId,
    quantity: 2,
    clientReference: reference,
  };

  const response = await postOrder(input);
  assert.equal(response.status, 201);

  const body = await response.json();
  assert.equal(typeof body.id, "string");
  assert.equal(body.totalCents, 5000);

  const stored = await pool.query(
    "SELECT o.customer_id, o.status, o.total_cents, " +
    "i.product_id, i.quantity, i.unit_price_cents " +
    "FROM orders o JOIN order_items i ON i.order_id = o.id " +
    "WHERE o.id = $1 AND o.client_reference = $2",
    [body.id, reference],
  );

  assert.equal(stored.rowCount, 1);
  assert.deepEqual(stored.rows[0], {
    customer_id: "c1",
    status: "created",
    total_cents: 5000,
    product_id: productId,
    quantity: 2,
    unit_price_cents: 2500,
  });

  const stockAfterCreate = await pool.query(
    "SELECT stock FROM products WHERE id = $1",
    [productId],
  );
  assert.equal(stockAfterCreate.rows[0].stock, 8);

  const duplicate = await postOrder(input);
  assert.equal(duplicate.status, 409);
  assert.equal((await duplicate.json()).error, "DUPLICATE_REFERENCE");

  const invalid = await postOrder({
    ...input,
    quantity: 0,
    clientReference: invalidReference,
  });
  assert.equal(invalid.status, 400);

  const invalidOrders = await pool.query(
    "SELECT id FROM orders WHERE client_reference = $1",
    [invalidReference],
  );
  assert.equal(invalidOrders.rowCount, 0);

  const ownedOrders = await pool.query(
    "SELECT id FROM orders WHERE client_reference = $1",
    [reference],
  );
  assert.equal(ownedOrders.rowCount, 1);

  const stockAfterRejections = await pool.query(
    "SELECT stock FROM products WHERE id = $1",
    [productId],
  );
  assert.equal(stockAfterRejections.rows[0].stock, 8);

  console.log("PASS: persisted order, stock, duplicate, and rejection checks");
} finally {
  try {
    await pool.query(
      "DELETE FROM orders WHERE client_reference = ANY($1::text[])",
      [[reference, invalidReference]],
    );

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [productId],
    );
  } finally {
    await pool.end();
  }
}`;

export const databaseCourseLessons: DatabaseLessonData[] = [
  chapter({
    number: 2,
    slug: "postgresql-setup",
    title: "PostgreSQL Setup and Database Clients",
    description:
      "Start a controlled PostgreSQL instance and verify where your queries run.",
    objectives: [
      "Start PostgreSQL with Docker Compose.",
      "Connect using psql or a graphical database client.",
      "Identify the current database and user.",
    ],
    notes: [
      "Create a separate folder named sdet-database-practice. Install and start Docker before running the commands. The website only displays these examples.",
      "This course uses PostgreSQL 18 on host port 5433 to reduce conflicts with another local PostgreSQL installation. The container still listens on port 5432.",
      "The demo credentials are for this loopback-bound practice environment. The database administrator account is convenient for schema exercises; real application and test environments should use appropriately restricted roles.",
      "The named volume preserves data across container restarts. Starting the container again does not recreate the database or reset its contents.",
    ],
    examples: [
      example(
        "compose.yaml",
        `services:
  db:
    image: postgres:18
    environment:
      POSTGRES_USER: sdet
      POSTGRES_PASSWORD: local-demo
      POSTGRES_DB: sdet_shop
    ports:
      - "127.0.0.1:5433:5432"
    volumes:
      - sdet_pgdata:/var/lib/postgresql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U sdet -d sdet_shop"]
      interval: 2s
      timeout: 5s
      retries: 15

volumes:
  sdet_pgdata:`,
        `docker compose up -d --wait
docker compose exec db psql -U sdet -d sdet_shop`,
        "The database becomes healthy and psql opens an sdet_shop prompt.",
        "For PostgreSQL 18, mount the named volume at /var/lib/postgresql. Exit psql with \\q. A graphical client uses host 127.0.0.1, port 5433, database sdet_shop, user sdet, and password local-demo.",
      ),
    ],
    tasks: [
      "Start the database and connect.",
      "Display the current database, user, and PostgreSQL version.",
      "Exit psql without stopping the database.",
    ],
    solution: sql(
      "Connection verification",
      `SELECT current_database(), current_user;
SELECT version();`,
      "The database is sdet_shop and the current user is sdet.",
      "Verify the target connection before running schema or data changes.",
    ),
    mistakes: [
      "Using host port 5432 when Compose publishes 5433.",
      "Expecting an existing named volume to reset on restart.",
      "Running commands against an unrelated database.",
    ],
    takeaway:
      "A predictable database environment begins with a verified connection.",
  }),

  chapter({
    number: 3,
    slug: "tables-types-and-constraints",
    title: "Tables, Data Types, Keys, and Constraints",
    description:
      "Create the shared shopping schema and deterministic seed data.",
    objectives: [
      "Create related tables with appropriate types.",
      "Understand primary, foreign, and unique keys.",
      "Use NOT NULL and CHECK constraints.",
    ],
    notes: [
      "Save the schema below as schema.sql in the practice project. Run it once against the empty database from Chapter 2. It intentionally fails if the tables already exist instead of silently replacing data.",
      "Primary keys identify rows. Foreign keys require referenced rows to exist. UNIQUE prevents duplicate references. CHECK enforces expressions such as non-negative stock.",
      "A CHECK constraint alone does not reject NULL when its expression evaluates to unknown. Combine CHECK with NOT NULL when a value is required.",
      "Prices use integer cents for this small single-currency lab. Order items preserve purchase-time prices. Cross-table total consistency is not enforced by the simple CHECK constraints and requires application logic and tests.",
      "The seed rows are fixed examples. Stock represents the current snapshot; the schema script does not replay historical inventory movements.",
    ],
    examples: [
      example(
        "schema.sql",
        schemaSql,
        "docker compose exec -T db psql -v ON_ERROR_STOP=1 -U sdet -d sdet_shop < schema.sql",
        "Four tables are created with 3 customers, 4 products, 3 orders, and 3 order items.",
        "The transaction prevents partial initialization if a statement fails.",
      ),
    ],
    tasks: [
      "Create the tables and seed data.",
      "Check the row count of each table.",
      "Explain why order_items stores unit_price_cents.",
    ],
    solution: sql(
      "Verify seed counts",
      `SELECT 'customers' AS entity, count(*) AS rows FROM customers
UNION ALL
SELECT 'products', count(*) FROM products
UNION ALL
SELECT 'orders', count(*) FROM orders
UNION ALL
SELECT 'order_items', count(*) FROM order_items;`,
      "Counts are customers 3, products 4, orders 3, and order_items 3.",
      "The examples in Chapters 4–18 assume this seed data remains unchanged.",
    ),
    mistakes: [
      "Rerunning the schema script against populated tables.",
      "Assuming a foreign key checks every business rule.",
      "Using the current catalog price to reconstruct historical purchases.",
    ],
    takeaway:
      "Schema constraints protect structural rules; tests also verify business consistency.",
  }),

  chapter({
    number: 4,
    slug: "select-basics",
    title: "Reading Data with SELECT",
    description:
      "Retrieve precise values and calculate independent expectations.",
    objectives: [
      "Select explicit columns.",
      "Use aliases and calculated expressions.",
      "Locate a record using its identifier.",
    ],
    notes: [
      "SELECT chooses output expressions and FROM identifies the source. WHERE narrows the rows.",
      "Explicit columns make assertions easier to understand and reduce accidental dependence on unrelated fields.",
      "An alias changes the result column name, not the stored schema.",
    ],
    examples: [
      sql(
        "Read one product",
        `SELECT
  id,
  name,
  price_cents,
  price_cents * 2 AS expected_two_item_total
FROM products
WHERE id = 'p1';`,
        "Keyboard costs 2500 cents; two items total 5000 cents.",
        "Use the known product identifier rather than selecting an arbitrary first row.",
      ),
    ],
    tasks: ["Read p2.", "Return its name and the cost of three units."],
    solution: sql(
      "Mouse calculation",
      `SELECT name, price_cents * 3 AS total_cents
FROM products
WHERE id = 'p2';`,
      "Mouse, 4500.",
      "A calculation in SELECT does not modify stored data.",
    ),
    mistakes: [
      "Assuming SELECT changes data.",
      "Using SELECT * for every automated assertion.",
      "Checking only that a query returned something.",
    ],
    takeaway: "Select the smallest set of values that proves the requirement.",
  }),

  chapter({
    number: 5,
    slug: "filtering-data",
    title: "Filtering with WHERE, IN, BETWEEN, and LIKE",
    description: "Express precise conditions for identifying relevant records.",
    objectives: [
      "Combine conditions with AND and OR.",
      "Use IN and inclusive BETWEEN boundaries.",
      "Match text with LIKE and ILIKE.",
    ],
    notes: [
      "BETWEEN includes both endpoints. IN matches any listed value. LIKE uses % for any sequence and _ for one character.",
      "PostgreSQL ILIKE supports case-insensitive pattern matching. Use parentheses when combining AND and OR so the intended grouping is explicit.",
      "Values supplied by an application must be bound as parameters rather than concatenated into SQL.",
    ],
    examples: [
      sql(
        "Available accessories",
        `SELECT id, name, price_cents
FROM products
WHERE category IN ('accessories')
  AND price_cents BETWEEN 1000 AND 3000
  AND stock > 0
ORDER BY id;

SELECT id, name
FROM products
WHERE name ILIKE '%board%'
ORDER BY id;`,
        "The first query returns p1 and p2. The second returns Keyboard.",
        "Both endpoints of the price interval are included.",
      ),
    ],
    tasks: [
      "Find accessories that are out of stock or cost less than 1000 cents.",
      "Keep the category condition applicable to both alternatives.",
    ],
    solution: sql(
      "Grouped filtering",
      `SELECT id, name
FROM products
WHERE category = 'accessories'
  AND (stock = 0 OR price_cents < 1000)
ORDER BY id;`,
      "p4, Cable.",
      "Parentheses preserve the intended relationship between conditions.",
    ),
    mistakes: [
      "Treating BETWEEN as exclusive.",
      "Forgetting LIKE wildcard meanings.",
      "Combining AND and OR without considering precedence.",
    ],
    takeaway:
      "A good filter expresses the exact population the test intends to inspect.",
  }),

  chapter({
    number: 6,
    slug: "sorting-pagination-and-distinct",
    title: "Sorting, Pagination, and DISTINCT",
    description: "Make result ordering and pagination deterministic.",
    objectives: [
      "Sort with a unique tie-breaker.",
      "Use LIMIT and OFFSET.",
      "Understand what DISTINCT removes.",
    ],
    notes: [
      "Without ORDER BY, row order is not guaranteed. Sorting by a non-unique column alone still leaves ties unordered.",
      "OFFSET pagination can skip or repeat records when data changes between requests. Stable test data helps isolate pagination behavior.",
      "DISTINCT applies to the complete selected row. It should not hide duplicate records caused by an incorrect join.",
    ],
    examples: [
      sql(
        "Two deterministic pages",
        `SELECT id, name, price_cents
FROM products
ORDER BY price_cents, id
LIMIT 2 OFFSET 0;

SELECT id, name, price_cents
FROM products
ORDER BY price_cents, id
LIMIT 2 OFFSET 2;

SELECT DISTINCT category
FROM products
ORDER BY category;`,
        "Page 1: p4, p2. Page 2: p1, p3. Categories: accessories, displays.",
        "The unique id breaks ties in price.",
      ),
    ],
    tasks: [
      "Return the next two products after p2 using keyset pagination.",
      "Use its price of 1500 cents and identifier as the cursor.",
    ],
    solution: sql(
      "Keyset pagination",
      `SELECT id, name, price_cents
FROM products
WHERE (price_cents, id) > (1500, 'p2')
ORDER BY price_cents, id
LIMIT 2;`,
      "p1 followed by p3.",
      "The cursor predicate must match the ordering columns and direction.",
    ),
    mistakes: [
      "Using LIMIT without ORDER BY.",
      "Ignoring ties in the sort column.",
      "Using DISTINCT to conceal a faulty join.",
    ],
    takeaway: "Stable ordering is part of a reliable pagination contract.",
  }),

  chapter({
    number: 7,
    slug: "null-coalesce-and-case",
    title: "Handling NULL, COALESCE, and CASE",
    description:
      "Distinguish missing values from empty strings and classify results.",
    objectives: [
      "Use IS NULL and IS NOT NULL.",
      "Explain COALESCE.",
      "Build conditional expressions with CASE.",
    ],
    notes: [
      "NULL represents an absent or unknown value. Comparing a column with = NULL does not produce true; use IS NULL.",
      "COALESCE returns the first non-NULL argument. It changes the query output, not the underlying record.",
      "An empty string is a value and is different from NULL.",
    ],
    examples: [
      sql(
        "Display contact availability",
        `SELECT
  id,
  COALESCE(phone, 'Not provided') AS display_phone,
  CASE
    WHEN phone IS NULL THEN 'missing'
    ELSE 'available'
  END AS phone_status
FROM customers
ORDER BY id;`,
        "c1 and c3 have missing phone numbers. c2 has an available phone number.",
        "Display defaults should not be mistaken for stored values.",
      ),
    ],
    tasks: [
      "Find customers without a phone number.",
      "Classify products as out of stock or available.",
    ],
    solution: sql(
      "Missing values and stock labels",
      `SELECT id FROM customers
WHERE phone IS NULL
ORDER BY id;

SELECT id,
  CASE WHEN stock = 0 THEN 'out of stock'
       ELSE 'available'
  END AS availability
FROM products
ORDER BY id;`,
      "Missing phones: c1 and c3. Only p4 is out of stock.",
      "CASE makes the classification rule explicit.",
    ),
    mistakes: [
      "Writing column = NULL.",
      "Treating empty text and NULL as identical.",
      "Assuming COALESCE updates the table.",
    ],
    takeaway:
      "Missing data requires explicit handling in both queries and assertions.",
  }),

  chapter({
    number: 8,
    slug: "aggregations",
    title: "Aggregations, GROUP BY, and HAVING",
    description: "Validate counts, totals, and grouped business results.",
    objectives: [
      "Use COUNT, SUM, MIN, MAX, and AVG.",
      "Distinguish WHERE from HAVING.",
      "Handle empty aggregate results.",
    ],
    notes: [
      "WHERE filters input rows before grouping. HAVING filters groups after aggregation.",
      "COUNT(*) counts rows; COUNT(column) excludes NULL values. SUM over no matching rows returns NULL, while COUNT returns zero.",
      "PostgreSQL aggregate return types may differ from the input type. For example, SUM(integer) and COUNT return bigint, which node-postgres commonly returns as strings.",
    ],
    examples: [
      sql(
        "Customer order totals",
        `SELECT customer_id,
       count(*) AS order_count,
       sum(total_cents) AS total_cents
FROM orders
GROUP BY customer_id
HAVING sum(total_cents) > 6000
ORDER BY customer_id;

SELECT count(*) AS customers,
       count(phone) AS customers_with_phone
FROM customers;`,
        "c1 has 2 orders totaling 6500; c2 has 1 totaling 20000. There are 3 customers and 1 non-NULL phone.",
        "Aggregated order value is not automatically revenue; the status rule matters.",
      ),
    ],
    tasks: [
      "Calculate the total for paid orders only.",
      "Return zero if no paid orders exist.",
    ],
    solution: sql(
      "Paid order total",
      `SELECT COALESCE(sum(total_cents), 0) AS paid_total_cents
FROM orders
WHERE status = 'paid';`,
      "25000 cents.",
      "Filter the business population before calculating the aggregate.",
    ),
    mistakes: [
      "Counting nullable columns when every row should count.",
      "Assuming SUM over no rows returns zero.",
      "Calling all order totals revenue regardless of status.",
    ],
    takeaway:
      "An aggregate is meaningful only when its population matches the requirement.",
  }),

  chapter({
    number: 9,
    slug: "joins",
    title: "Joining Tables",
    description:
      "Verify relationships without losing or multiplying records accidentally.",
    objectives: [
      "Use INNER JOIN and LEFT JOIN.",
      "Identify customers without orders.",
      "Recognize one-to-many row multiplication.",
    ],
    notes: [
      "INNER JOIN returns matching rows. LEFT JOIN preserves rows from the left table even when the right side has no match.",
      "One order can have several items, so joining items can multiply order rows. Summing an order-level total after that join can overcount.",
      "A WHERE filter on a right-side column can remove unmatched LEFT JOIN rows. Place conditions deliberately.",
    ],
    examples: [
      sql(
        "Orders and their owners",
        `SELECT o.id, c.name, o.total_cents
FROM orders o
JOIN customers c ON c.id = o.customer_id
ORDER BY o.id;

SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL
ORDER BY c.id;`,
        "o1 and o2 belong to Alice; o3 belongs to Bob. Cara has no orders.",
        "The second query uses a missing right-side primary key to identify unmatched rows.",
      ),
    ],
    tasks: ["Return all customers and their order counts, including zero."],
    solution: sql(
      "Include customers with no orders",
      `SELECT c.id, c.name, count(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY c.id;`,
      "c1: 2, c2: 1, c3: 0.",
      "COUNT(o.id) excludes the NULL placeholder for an unmatched customer.",
    ),
    mistakes: [
      "Using COUNT(*) to count right-side matches in a LEFT JOIN.",
      "Joining without the intended relationship condition.",
      "Summing order totals after multiplying orders by their items.",
    ],
    takeaway:
      "Always understand the expected number of rows produced by a join.",
  }),

  chapter({
    number: 10,
    slug: "subqueries-and-ctes",
    title: "Subqueries and Common Table Expressions",
    description:
      "Express existence checks and break validation queries into stages.",
    objectives: [
      "Use EXISTS and NOT EXISTS.",
      "Build a readable CTE.",
      "Reconcile stored order totals with line items.",
    ],
    notes: [
      "EXISTS checks whether a subquery returns at least one row. NOT EXISTS is useful for finding missing relationships.",
      "NOT IN can behave unexpectedly when its subquery contains NULL. NOT EXISTS often expresses absence more clearly.",
      "A CTE gives a query expression a name. It improves readability but is not automatically a performance optimization.",
    ],
    examples: [
      sql(
        "Reconcile order totals",
        `WITH calculated AS (
  SELECT order_id,
         sum(quantity * unit_price_cents) AS calculated_total
  FROM order_items
  GROUP BY order_id
)
SELECT o.id, o.total_cents, c.calculated_total
FROM orders o
LEFT JOIN calculated c ON c.order_id = o.id
WHERE c.order_id IS NULL
   OR o.total_cents <> c.calculated_total
ORDER BY o.id;`,
        "Zero rows for the seed data.",
        "The query detects missing items as well as mismatched totals.",
      ),
    ],
    tasks: ["Find customers who have never placed an order using NOT EXISTS."],
    solution: sql(
      "Customers without orders",
      `SELECT c.id, c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
)
ORDER BY c.id;`,
      "c3, Cara.",
      "The correlated subquery checks each customer's relationship.",
    ),
    mistakes: [
      "Assuming a CTE always makes a query faster.",
      "Ignoring NULL behavior in NOT IN.",
      "Checking totals without detecting missing item rows.",
    ],
    takeaway: "Readable query stages make complex assertions easier to review.",
  }),

  chapter({
    number: 11,
    slug: "test-data-mutations",
    title: "Inserting, Updating, and Deleting Test Data",
    description: "Create and manipulate records owned by your test.",
    objectives: [
      "Use INSERT, UPDATE, DELETE, and RETURNING.",
      "Scope changes to a known identifier.",
      "Keep practice changes reversible.",
    ],
    notes: [
      "Data modification statements should identify exactly which records they affect. RETURNING exposes the changed rows.",
      "Use unique identifiers for concurrent automated tests. The fixed identifier below is only for a single-user transaction that rolls back.",
      "Deleting an order cascades to its order_items in our schema. It does not automatically restore inventory; cleanup and business cancellation are different operations.",
    ],
    examples: [
      sql(
        "Owned customer lifecycle",
        `BEGIN;

INSERT INTO customers (id, email, name)
VALUES ('practice-customer', 'practice@example.test', 'Practice')
RETURNING id, name;

UPDATE customers
SET name = 'Updated Practice'
WHERE id = 'practice-customer'
RETURNING id, name;

DELETE FROM customers
WHERE id = 'practice-customer'
RETURNING id;

ROLLBACK;`,
        "Each statement affects the practice customer only. The seed data remains unchanged.",
        "The transaction contains the entire example.",
      ),
    ],
    tasks: [
      "Temporarily add one unit to p4 stock.",
      "Verify the change, then undo it.",
    ],
    solution: sql(
      "Reversible stock update",
      `BEGIN;
UPDATE products SET stock = stock + 1
WHERE id = 'p4'
RETURNING id, stock;
ROLLBACK;

SELECT stock FROM products WHERE id = 'p4';`,
      "The update returns 1; the final read returns 0.",
      "ROLLBACK undoes changes in this transaction.",
    ),
    mistakes: [
      "Running UPDATE or DELETE without the intended WHERE clause.",
      "Deleting other tests' records.",
      "Confusing direct cleanup with a business cancellation workflow.",
    ],
    takeaway:
      "Test data changes need clear ownership and a predictable cleanup strategy.",
  }),

  chapter({
    number: 12,
    slug: "transactions",
    title: "Transactions, Rollbacks, and Savepoints",
    description:
      "Understand which operations commit together and what rollback can undo.",
    objectives: [
      "Explain transaction atomicity.",
      "Use savepoints for partial rollback.",
      "Recognize connection boundaries.",
    ],
    notes: [
      "BEGIN starts a transaction. COMMIT persists it. ROLLBACK discards its uncommitted changes.",
      "A savepoint allows rollback to a point inside a transaction without discarding all earlier work.",
      "Transactions belong to database connections. A test cannot roll back an API's committed changes by rolling back its own separate connection.",
      "After a statement error, a PostgreSQL transaction generally remains aborted until rollback or rollback to an appropriate savepoint.",
    ],
    examples: [
      sql(
        "Partial rollback",
        `BEGIN;

UPDATE products SET stock = stock - 1 WHERE id = 'p1';
SAVEPOINT after_first_change;

UPDATE products SET stock = stock - 2 WHERE id = 'p1';
SELECT stock FROM products WHERE id = 'p1';

ROLLBACK TO SAVEPOINT after_first_change;
SELECT stock FROM products WHERE id = 'p1';

ROLLBACK;
SELECT stock FROM products WHERE id = 'p1';`,
        "Stock reads 7, then 9, then 10.",
        "The savepoint removes the second update; the final rollback removes the first.",
      ),
    ],
    tasks: [
      "Change a customer's name inside a transaction.",
      "Verify it inside the transaction, roll back, and read again.",
    ],
    solution: sql(
      "Rollback an update",
      `BEGIN;
UPDATE customers SET name = 'Temporary' WHERE id = 'c1';
SELECT name FROM customers WHERE id = 'c1';
ROLLBACK;
SELECT name FROM customers WHERE id = 'c1';`,
      "Temporary inside the transaction; Alice after rollback.",
      "These statements must run on the same connection.",
    ),
    mistakes: [
      "Splitting one transaction across different pooled clients.",
      "Expecting rollback to undo another connection's commit.",
      "Continuing an aborted transaction without recovery.",
    ],
    takeaway: "Transaction boundaries are connection boundaries.",
  }),

  chapter({
    number: 13,
    slug: "relationship-validation",
    title: "Validating Constraints and Relationships",
    extraSections: migrationAndPermissionSections,
    description:
      "Prove that invalid data is rejected by the expected constraint.",
    objectives: [
      "Test unique, foreign-key, and check violations.",
      "Distinguish a desired rejection from an unrelated failure.",
      "Verify no invalid record remains.",
    ],
    notes: [
      "A negative test must establish that the intended constraint rejected the operation. A syntax error or connection failure is not a passing constraint test.",
      "Common SQLSTATE values include 23505 for unique violations, 23503 for foreign-key violations, 23514 for check violations, and 23502 for not-null violations.",
      "The DO block below catches only the expected condition. If the invalid insert succeeds, RAISE EXCEPTION makes the test fail.",
    ],
    examples: [
      sql(
        "Reject negative stock",
        `DO $$
BEGIN
  BEGIN
    INSERT INTO products
      (id, name, category, price_cents, stock)
    VALUES ('invalid-stock', 'Invalid', 'test', 100, -1);

    RAISE EXCEPTION 'FAIL: negative stock was accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'PASS: negative stock rejected';
  END;
END;
$$;

SELECT id FROM products WHERE id = 'invalid-stock';`,
        "A PASS notice and zero rows.",
        "The handled exception block rolls back its failed insert.",
      ),
    ],
    tasks: [
      "Try creating an order for a missing customer.",
      "Confirm the foreign key rejects it.",
    ],
    solution: sql(
      "Reject an unknown customer",
      `DO $$
BEGIN
  BEGIN
    INSERT INTO orders
      (id, customer_id, client_reference, status, total_cents)
    VALUES
      ('invalid-fk', 'missing-customer', 'invalid-fk', 'created', 0);

    RAISE EXCEPTION 'FAIL: missing customer was accepted';
  EXCEPTION WHEN foreign_key_violation THEN
    RAISE NOTICE 'PASS: missing customer rejected';
  END;
END;
$$;`,
      "PASS: missing customer rejected.",
      "The test catches the specific expected constraint category.",
    ),
    mistakes: [
      "Treating any database exception as success.",
      "Testing a constraint with input that violates a different constraint first.",
      "Assuming application validation makes database constraints unnecessary.",
    ],
    takeaway:
      "A meaningful negative test proves the intended rule caused the rejection.",
  }),

  chapter({
    number: 14,
    slug: "sql-functions",
    title: "String, Date, Time, and Numeric Functions",
    description:
      "Validate normalized text, precise monetary calculations, and time ranges.",
    objectives: [
      "Use string and numeric functions.",
      "Understand timestamptz display behavior.",
      "Use half-open timestamp ranges.",
    ],
    notes: [
      "LOWER and TRIM can normalize query output, but do not prove the application stored normalized values.",
      "timestamptz represents an instant and displays it using the session time zone. It does not preserve the original input time-zone name.",
      "Use start-inclusive and end-exclusive timestamp ranges to avoid overlapping adjacent reporting periods.",
      "Integer division truncates. Convert to numeric before calculating currency units when fractional output is required.",
    ],
    examples: [
      sql(
        "Text, money, and dates",
        `SELECT lower(trim('  ALICE@EXAMPLE.TEST  ')) AS normalized;

SELECT id, round(price_cents::numeric / 100, 2) AS price
FROM products
ORDER BY id;

SELECT id, created_at AT TIME ZONE 'UTC' AS created_utc
FROM orders
WHERE created_at >= TIMESTAMPTZ '2026-01-01T00:00:00Z'
  AND created_at < TIMESTAMPTZ '2026-02-01T00:00:00Z'
ORDER BY created_at, id;`,
        "Normalized email is alice@example.test. January contains o1 and o2.",
        "Explicit boundaries avoid accidental dependence on the session time zone.",
      ),
    ],
    tasks: ["Count orders in February 2026 using UTC boundaries."],
    solution: sql(
      "February orders",
      `SELECT count(*)
FROM orders
WHERE created_at >= TIMESTAMPTZ '2026-02-01T00:00:00Z'
  AND created_at < TIMESTAMPTZ '2026-03-01T00:00:00Z';`,
      "1.",
      "The range includes all of February without guessing its final timestamp.",
    ),
    mistakes: [
      "Using integer division when decimal output is needed.",
      "Ignoring session time zones.",
      "Using overlapping inclusive boundaries for adjacent months.",
    ],
    takeaway:
      "Formatting, arithmetic, and time-zone assumptions belong in the test design.",
  }),

  chapter({
    number: 15,
    slug: "window-functions",
    title: "Window Functions for Data Validation",
    description: "Rank related records while preserving individual rows.",
    objectives: [
      "Use ROW_NUMBER with PARTITION BY.",
      "Select the latest record per customer.",
      "Distinguish window calculations from grouped results.",
    ],
    notes: [
      "Window functions calculate across related rows without collapsing them into one grouped row.",
      "PARTITION BY defines independent groups for the calculation. The window ORDER BY determines ranking within each group.",
      "Use a deterministic tie-breaker when selecting a latest record. A timestamp alone may not be unique.",
    ],
    examples: [
      sql(
        "Latest order per customer",
        `WITH ranked AS (
  SELECT id, customer_id, created_at,
         row_number() OVER (
           PARTITION BY customer_id
           ORDER BY created_at DESC, id DESC
         ) AS position
  FROM orders
)
SELECT id, customer_id
FROM ranked
WHERE position = 1
ORDER BY customer_id;`,
        "c1: o2; c2: o3.",
        "The outer query filters the calculated row number.",
      ),
    ],
    tasks: [
      "Show each customer's running total ordered by creation time and ID.",
    ],
    solution: sql(
      "Running order value",
      `SELECT id, customer_id,
       sum(total_cents) OVER (
         PARTITION BY customer_id
         ORDER BY created_at, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM orders
ORDER BY customer_id, created_at, id;`,
      "c1: 5000 then 6500. c2: 20000.",
      "The explicit ROWS frame expresses a row-by-row running total.",
    ),
    mistakes: [
      "Forgetting PARTITION BY and ranking all customers together.",
      "Using ambiguous ordering.",
      "Assuming a window calculation removes individual rows.",
    ],
    takeaway: "Window functions help validate sequence-dependent results.",
  }),

  chapter({
    number: 16,
    slug: "json-and-jsonb",
    title: "Validating JSON and JSONB Data",
    description:
      "Inspect JSON fields without losing type and missing-value distinctions.",
    objectives: [
      "Use JSONB extraction and containment.",
      "Distinguish JSON values from extracted text.",
      "Check whether keys exist.",
    ],
    notes: [
      'The -> operator returns JSON; ->> returns text. JSON boolean true and JSON string "true" are different values.',
      "The ? operator checks top-level key existence. @> tests JSONB containment.",
      "A missing key, JSON null, and SQL NULL are distinct concepts. Text extraction can make some of those differences less visible.",
    ],
    examples: [
      sql(
        "Wireless products",
        `SELECT id, attributes ->> 'color' AS color
FROM products
WHERE attributes @> '{"wireless":true}'::jsonb
ORDER BY id;

SELECT id,
       attributes ? 'wireless' AS has_wireless_key,
       jsonb_typeof(attributes -> 'wireless') AS value_type
FROM products
ORDER BY id;`,
        "The wireless query returns p2, white. p1 and p2 have boolean wireless values.",
        "Containment preserves the distinction between a boolean and text.",
      ),
    ],
    tasks: ["Find products without a color key."],
    solution: sql(
      "Missing JSON key",
      `SELECT id
FROM products
WHERE NOT (attributes ? 'color')
ORDER BY id;`,
      "p3 and p4.",
      "Key existence is different from checking whether extracted text equals an empty string.",
    ),
    mistakes: [
      "Comparing JSON strings and booleans as though they were identical.",
      "Assuming every record has every JSON key.",
      "Using JSONB instead of relational columns without considering constraints.",
    ],
    takeaway:
      "Validate JSON structure, key presence, and value types deliberately.",
  }),

  chapter({
    number: 17,
    slug: "indexes-and-query-plans",
    title: "Indexes and Query Plans",
    description:
      "Inspect how PostgreSQL executes queries without making brittle performance claims.",
    objectives: [
      "Read basic EXPLAIN output.",
      "Understand index trade-offs.",
      "Distinguish estimates from measured execution.",
    ],
    notes: [
      "Indexes can accelerate some lookups but consume storage and add write overhead. Their usefulness depends on query shape and data distribution.",
      "EXPLAIN shows the selected plan. EXPLAIN ANALYZE executes the statement and reports observed execution statistics.",
      "A sequential scan on a tiny table may be the best choice. Do not assert that every indexed query must use an index.",
      "PostgreSQL creates indexes for primary and unique keys, but does not automatically create an index on every referencing foreign-key column.",
    ],
    examples: [
      sql(
        "Inspect an order lookup",
        `BEGIN;

CREATE INDEX practice_orders_customer_created
ON orders (customer_id, created_at DESC, id DESC);

ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total_cents
FROM orders
WHERE customer_id = 'c1'
ORDER BY created_at DESC, id DESC;

ROLLBACK;`,
        "A plan is displayed. A sequential scan is acceptable on this three-row table.",
        "ROLLBACK removes the practice index. Do not use this tiny dataset to claim production performance.",
      ),
    ],
    tasks: [
      "Inspect the plan for a product ID lookup.",
      "Explain why its plan can differ with a much larger dataset.",
    ],
    solution: sql(
      "Product lookup plan",
      `EXPLAIN
SELECT id, name
FROM products
WHERE id = 'p1';`,
      "An estimated execution plan.",
      "Costs are planner estimates, not a direct latency guarantee.",
    ),
    mistakes: [
      "Running EXPLAIN ANALYZE on a write without recognizing it executes the write.",
      "Treating a sequential scan as automatically defective.",
      "Comparing timings from unrepresentative datasets.",
    ],
    takeaway:
      "Query plans provide evidence for investigation, not universal performance assertions.",
  }),

  chapter({
    number: 18,
    slug: "isolation-and-concurrency",
    title: "Isolation, Concurrency, and Locks",
    description: "Observe how overlapping database operations interact.",
    objectives: [
      "Recognize the default Read Committed behavior.",
      "Observe row locking with two sessions.",
      "Understand transaction retry boundaries.",
    ],
    notes: [
      "PostgreSQL defaults to Read Committed, where each statement reads a snapshot established for that statement. Later statements can observe newly committed changes.",
      "Repeatable Read uses a stable transaction snapshot. Serializable adds checks for anomalies and can require retrying an entire transaction.",
      "SELECT FOR UPDATE locks selected rows against conflicting changes until transaction end. Lock ordering, short transactions, and bounded waits help reduce contention.",
      "Use two independent query sessions for this exercise. Run Session A first and keep it open while running Session B.",
    ],
    examples: [
      sql(
        "Session A: hold a row lock",
        `BEGIN;
SELECT id, stock
FROM products
WHERE id = 'p1'
FOR UPDATE;

-- Leave this transaction open.
-- After completing Session B:
-- ROLLBACK;`,
        "Session A locks p1 until it commits or rolls back.",
        "Keep this session open while testing the conflicting update.",
      ),
      sql(
        "Session B: bounded conflicting update",
        `BEGIN;
SET LOCAL lock_timeout = '1s';

UPDATE products
SET stock = stock - 1
WHERE id = 'p1';

-- After the lock timeout error, run:
ROLLBACK;`,
        "The update fails with a lock timeout while Session A holds the lock.",
        "Run ROLLBACK separately if your query editor stops executing the batch after the error.",
      ),
    ],
    tasks: [
      "Release Session A's lock with ROLLBACK.",
      "Retry a reversible update in Session B.",
      "Confirm the seed stock is restored.",
    ],
    solution: sql(
      "Update after releasing the lock",
      `BEGIN;
UPDATE products SET stock = stock - 1
WHERE id = 'p1'
RETURNING stock;
ROLLBACK;

SELECT stock FROM products WHERE id = 'p1';`,
      "The update returns 9; the final stock is 10.",
      "In real retry logic, retry the whole failed transaction for recognized retryable errors, with a limit.",
    ),
    mistakes: [
      "Trying to demonstrate concurrency using one connection.",
      "Leaving transactions open after the exercise.",
      "Blindly retrying any error or only the final statement.",
    ],
    takeaway:
      "Concurrency tests need independent sessions and explicit synchronization.",
  }),

  chapter({
    number: 19,
    slug: "api-database-validation",
    extraSections: persistenceSections,
    title: "Database Validation After API Operations",
    description:
      "Introduce a local API that commits orders, items, and stock changes to PostgreSQL.",
    objectives: [
      "Connect an HTTP operation to a database transaction.",
      "Correlate responses with persisted records.",
      "Verify a server-calculated total.",
    ],
    notes: [
      "This is a separate database practice API on port 5052. The earlier API course server on port 5050 still uses memory and is not automatically connected to PostgreSQL.",
      "Use Node.js 24 in sdet-database-practice. Run npm init -y if this folder does not already contain package.json, then install express and pg.",
      "The API is an unauthenticated, loopback-only teaching service. It accepts one product per order and is not a production checkout implementation.",
      "It locks the product, calculates the total, writes the order and item, decrements stock, and commits using one checked-out database client.",
      "Duplicate references are rejected with 409. This is duplicate prevention, not an idempotency protocol that replays a previous response.",
    ],
    examples: [
      example(
        "server.mjs",
        apiServer,
        `npm install express pg
export DATABASE_URL='postgresql://sdet:local-demo@127.0.0.1:5433/sdet_shop'
node server.mjs`,
        "GET http://127.0.0.1:5052/health returns status ok when PostgreSQL is reachable.",
        "Save server.mjs in the practice folder. Keep the server terminal open and use a separate terminal for requests.",
      ),
      example(
        "Create an order from a second terminal",
        `curl -i http://127.0.0.1:5052/orders \\
  -H 'Content-Type: application/json' \\
  -d '{
    "customerId": "c1",
    "productId": "p1",
    "quantity": 2,
    "clientReference": "manual-chapter-19"
  }'`,
        "Run once against the original seed data.",
        "201 Created with totalCents 5000 and a generated order ID.",
        "This commits real practice data. Repeating the same reference is rejected.",
      ),
    ],
    tasks: [
      "Create the manual order once.",
      "Read the order and its item using its reference.",
      "Verify p1 stock decreased from 10 to 8.",
    ],
    solution: sql(
      "Verify the API write",
      `SELECT o.id, o.customer_id, o.total_cents,
       i.product_id, i.quantity, i.unit_price_cents
FROM orders o
JOIN order_items i ON i.order_id = o.id
WHERE o.client_reference = 'manual-chapter-19';

SELECT stock FROM products WHERE id = 'p1';`,
      "One matching item: c1, total 5000, p1, quantity 2, unit price 2500. Stock is 8 after one successful request.",
      "Later automated tests create their own product, so they do not depend on p1's remaining stock.",
    ),
    mistakes: [
      "Using the old in-memory API and expecting database writes.",
      "Running transaction statements through unrelated pool.query calls.",
      "Expecting a test connection rollback to undo a committed API order.",
    ],
    takeaway:
      "Correlate the application response with independently retrieved database evidence.",
  }),

  chapter({
    number: 20,
    slug: "typescript-database-checks",
    title: "PostgreSQL Checks with TypeScript",
    description:
      "Write parameterized database assertions and close connections reliably.",
    objectives: [
      "Configure a TypeScript database practice project.",
      "Bind query values using parameters.",
      "Handle query results and pool cleanup.",
    ],
    notes: [
      "Run these files in sdet-database-practice. Install TypeScript, tsx, Node types, and pg types as development dependencies.",
      "Parameters bind values, not identifiers such as table names. Dynamic identifiers require a controlled design rather than passing them as $1.",
      "TypeScript types do not validate actual database values at runtime. Assertions still need to inspect returned data.",
      "COUNT and bigint values commonly arrive as strings. Do not blindly convert arbitrary large database numbers to JavaScript Number.",
    ],
    examples: [
      example(
        "tsconfig.json",
        `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["scripts/**/*.ts"]
}`,
        `npm pkg set type=module
npm install --save-dev typescript@5 tsx @types/node@24 @types/pg
mkdir -p scripts`,
        "The practice project can type-check and run TypeScript scripts.",
        "Keep this configuration in the practice project, not the Next.js application.",
      ),
      example(
        "scripts/check-product.ts",
        `import assert from "node:assert/strict";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  statement_timeout: 5000,
});

try {
  const result = await pool.query(
    "SELECT id, name, price_cents FROM products WHERE id = $1",
    ["p1"],
  );

  assert.equal(result.rowCount, 1);
  assert.deepEqual(result.rows[0], {
    id: "p1",
    name: "Keyboard",
    price_cents: 2500,
  });

  const count = await pool.query(
    "SELECT count(*) AS total FROM products WHERE id = $1",
    ["p1"],
  );
  assert.equal(count.rows[0].total, "1");

  console.log("PASS: product checks");
} finally {
  await pool.end();
}`,
        `export DATABASE_URL='postgresql://sdet:local-demo@127.0.0.1:5433/sdet_shop'
npx tsc --noEmit
npx tsx scripts/check-product.ts`,
        "PASS: product checks.",
        "The query parameters remain separate from the SQL text, and finally closes the pool even if an assertion fails.",
      ),
    ],
    tasks: [
      "Query a missing product using a bound parameter.",
      "Assert that no record is returned.",
    ],
    solution: example(
      "Add inside the existing try block",
      `const missing = await pool.query(
  "SELECT id FROM products WHERE id = $1",
  ["missing-product"],
);
assert.equal(missing.rowCount, 0);`,
      "Insert before the finally block in scripts/check-product.ts and rerun it.",
      "The missing-product assertion passes.",
      "Do not dereference rows[0] before establishing that the row exists.",
    ),
    mistakes: [
      "Concatenating user input into SQL.",
      "Logging a connection string containing credentials.",
      "Leaving pools open after assertions fail.",
    ],
    takeaway:
      "Parameterized queries and controlled connection lifetimes are automation fundamentals.",
  }),

  chapter({
    number: 21,
    slug: "automation-integration",
    extraSections: frameworkPersistenceSections,
    title: "Database Integration with Playwright and Cypress",
    description:
      "Run database checks in Node.js while keeping credentials outside browser code.",
    objectives: [
      "Use a Playwright fixture for database access.",
      "Expose a narrow Cypress database task.",
      "Separate browser and Node execution contexts.",
    ],
    notes: [
      "The Playwright example runs in its Node.js test runner. It does not need a page or browser because it is a database integration check.",
      "Cypress test code runs in a different environment from Node event handlers. Use cy.task to perform the database query in Node.",
      "Add pg to the automation project that runs the check. DATABASE_URL must be available to that process; do not put it in NEXT_PUBLIC variables or browser-accessible configuration.",
      "The Cypress task below exposes one named lookup instead of accepting arbitrary SQL from test code.",
    ],
    examples: [
      example(
        "tests/database.spec.ts — Playwright",
        `import { test as base, expect } from "@playwright/test";
import { Pool } from "pg";

const test = base.extend<{ db: Pool }>({
  db: async ({}, use) => {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required");
    }

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1,
      connectionTimeoutMillis: 5000,
      statement_timeout: 5000,
    });

    try {
      await use(pool);
    } finally {
      await pool.end();
    }
  },
});

test("stored product has the expected price", async ({ db }) => {
  const result = await db.query(
    "SELECT price_cents FROM products WHERE id = $1",
    ["p1"],
  );

  expect(result.rowCount).toBe(1);
  expect(result.rows[0].price_cents).toBe(2500);
});`,
        `npm install --save-dev @playwright/test
npx playwright test tests/database.spec.ts`,
        "The database test passes without opening a browser.",
        "The fixture ensures pool teardown. If you already have a Playwright project, merge this pattern into its existing fixture structure.",
      ),
      example(
        "cypress.config.ts — database task",
        `import { defineConfig } from "cypress";
import { Client } from "pg";

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      on("task", {
        async getProduct(id: string) {
          if (typeof id !== "string" || id.length > 100) {
            throw new Error("Invalid product ID");
          }

          if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is required");
          }

          const client = new Client({
            connectionString: process.env.DATABASE_URL,
            connectionTimeoutMillis: 5000,
            statement_timeout: 5000,
          });

          try {
            await client.connect();
            const result = await client.query(
              "SELECT id, price_cents FROM products WHERE id = $1",
              [id],
            );
            return result.rows[0] ?? null;
          } finally {
            await client.end();
          }
        },
      });
    },
  },
});`,
        "In a Cypress project with pg installed, add this task to setupNodeEvents. Preserve other existing tasks and configuration.",
        "The Node-side task returns a product object or null.",
        "A task must return a serializable result. This example creates and closes a connection per task to keep its lifecycle explicit.",
      ),
      example(
        "cypress/e2e/database.cy.ts",
        `describe("Database product checks", () => {
  it("reads the expected product", () => {
    cy.task("getProduct", "p1").should("deep.equal", {
      id: "p1",
      price_cents: 2500,
    });
  });

  it("returns null for a missing product", () => {
    cy.task("getProduct", "missing-product").should("equal", null);
  });
});`,
        "Run this spec in your configured Cypress project with DATABASE_URL set in the launching terminal.",
        "Both assertions pass against the practice database.",
        "A chained assertion does not rerun the database task to poll for changes. Eventual consistency needs an explicit bounded polling design.",
      ),
    ],
    tasks: [
      "Run either the Playwright or Cypress example.",
      "Add a check for p2 with price 1500.",
      "Confirm the query runs outside browser code.",
    ],
    solution: example(
      "Additional Cypress assertion",
      `it("reads the mouse price", () => {
  cy.task("getProduct", "p2").should("deep.equal", {
    id: "p2",
    price_cents: 1500,
  });
});`,
      "Add inside the existing describe block.",
      "The p2 check passes.",
      "Database access is delegated to the Node task.",
    ),
    mistakes: [
      "Importing pg into browser application code.",
      "Exposing DATABASE_URL to client-side JavaScript.",
      "Assuming cy.task automatically repeats until data changes.",
    ],
    takeaway:
      "Use the automation framework's Node execution boundary for database access.",
  }),

  chapter({
    number: 22,
    slug: "database-ci",
    title: "Test Data Isolation and CI Execution",
    description:
      "Run database checks against a fresh PostgreSQL service in CI.",
    objectives: [
      "Initialize a fresh CI database.",
      "Wait for database readiness.",
      "Separate parallel test data and propagate failures.",
    ],
    notes: [
      "Use this workflow in the sdet-database-practice repository, where package.json, package-lock.json, schema.sql, and scripts/check-product.ts are at the repository root.",
      "The service container is disposable for each job. Its credentials are local test values, not credentials for a shared database.",
      "Commit package-lock.json and use npm ci for reproducible dependency installation. Install start-server-and-test as a development dependency before using the capstone command.",
      "Parallel tests should own unique records. Shared fixture data should remain read-only, and pool sizes should account for the number of workers.",
      "The major PostgreSQL image tag selects the course version. Teams requiring immutable builds can pin an approved image digest.",
    ],
    examples: [
      example(
        "scripts/init-db.mjs",
        `import { readFile } from "node:fs/promises";
import { Client } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

try {
  await client.connect();
  const schema = await readFile(
    new URL("../schema.sql", import.meta.url),
    "utf8",
  );
  await client.query(schema);
  console.log("Database initialized");
} finally {
  await client.end();
}`,
        "CI runs node scripts/init-db.mjs against its fresh database.",
        "The schema and seed data are installed.",
        "Do not run this initialization script against the already-initialized local database.",
      ),
      example(
        ".github/workflows/database.yml",
        `name: Database checks

on:
  push:
  pull_request:

permissions:
  contents: read

jobs:
  database:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    services:
      postgres:
        image: postgres:18
        env:
          POSTGRES_USER: sdet
          POSTGRES_PASSWORD: local-demo
          POSTGRES_DB: sdet_shop
        ports:
          - 5433:5432
        options: >-
          --health-cmd "pg_isready -U sdet -d sdet_shop"
          --health-interval 2s
          --health-timeout 5s
          --health-retries 15

    env:
      DATABASE_URL: postgresql://sdet:local-demo@127.0.0.1:5433/sdet_shop

    steps:
      - uses: actions/checkout@v6

      - uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: npm

      - run: npm ci

      - name: Initialize fresh database
        run: node scripts/init-db.mjs

      - name: Type-check scripts
        run: npx tsc --noEmit

      - name: Check product data
        run: npx tsx scripts/check-product.ts`,
        "Commit the practice project and push it to GitHub.",
        "The job initializes a fresh database and fails if type checking or an assertion fails.",
        "Because the job runs directly on the runner, it reaches the service through the published localhost port.",
      ),
    ],
    tasks: [
      "Run the product check in CI.",
      "After completing Chapter 23, add the capstone step.",
      "Verify that an incorrect expected total makes CI fail.",
    ],
    solution: example(
      "Capstone workflow step",
      `      - name: Check API persistence
        run: >
          npx start-server-and-test
          "node server.mjs"
          http-get://127.0.0.1:5052/health
          "tsx scripts/capstone.ts"`,
      "First run npm install --save-dev start-server-and-test locally and commit the updated package files. Add this step after the product check once scripts/capstone.ts exists.",
      "The helper waits for API readiness, runs the assertions, and stops the API process.",
      "Do not suppress the test process exit code. Cleanup should not turn a failing assertion into a passing job.",
    ),
    mistakes: [
      "Initializing a shared database as though it were disposable.",
      "Using the container hostname when the job expects a published localhost port.",
      "Allowing concurrent tests to mutate the same stock row.",
    ],
    takeaway:
      "Reliable CI combines a fresh environment, controlled data ownership, and visible failures.",
  }),

  chapter({
    number: 23,
    slug: "shopping-database-project",
    extraSections: concurrencyProjectSections,
    title: "Shopping Application Database Testing Project",
    description:
      "Verify an API order through persisted rows, inventory changes, and rejected requests.",
    objectives: [
      "Create isolated data for an end-to-end service test.",
      "Assert order and item values independently.",
      "Verify duplicate and invalid requests leave no extra effects.",
      "Clean up only records owned by the test.",
    ],
    notes: [
      "Complete Chapters 19–20 first. This project uses server.mjs, pg, tsx, the practice schema, and a DATABASE_URL environment variable.",
      "The test creates a unique product with known stock and price. It does not mutate the shared p1 product or depend on the manual Chapter 19 order.",
      "A successful HTTP response is followed by independent database assertions for owner, status, product, quantity, purchase-time price, total, and stock.",
      "The duplicate request should not create another order or decrement stock again. A rejected quantity-zero request should not create an order.",
      "Cleanup runs in finally and deletes only this test's orders and product. Unexpected process termination can still leave data; disposable environments and run identifiers provide an additional cleanup strategy.",
      "This is a service-to-database integration test. It does not establish browser behavior, payment correctness, crash recovery, or complete concurrency coverage.",
    ],
    examples: [
      example(
        "scripts/capstone.ts",
        capstoneTest,
        `export DATABASE_URL='postgresql://sdet:local-demo@127.0.0.1:5433/sdet_shop'
npx tsc --noEmit
npx tsx scripts/capstone.ts`,
        "With the Chapter 19 server running, the script prints PASS and removes its own test records.",
        "Use independently calculated expectations: two units at 2500 cents mean 5000 cents and stock decreases from 10 to 8.",
      ),
    ],
    tasks: [
      "Run the capstone twice and confirm both runs pass.",
      "Explain why unique product IDs make the test independent of other runs.",
      "Add a check that the product price remains 2500 after placing the order.",
      "Run the same script through the Chapter 22 CI step.",
    ],
    solution: example(
      "Additional price assertion",
      `const unchangedPrice = await pool.query(
  "SELECT price_cents FROM products WHERE id = $1",
  [productId],
);
assert.equal(unchangedPrice.rowCount, 1);
assert.equal(unchangedPrice.rows[0].price_cents, 2500);`,
      "Insert inside the capstone try block before its success message.",
      "The product price remains 2500 cents.",
      "Order placement should update stock in this lab, not the catalog price.",
    ),
    mistakes: [
      "Using the API response total as the only expected database value.",
      "Cleaning up all orders instead of the current test's records.",
      "Assuming an external API write can be rolled back by the test's connection.",
      "Claiming one happy-path integration test covers every database risk.",
    ],
    takeaway:
      "A strong database test connects a requirement, an application operation, persisted evidence, and owned cleanup.",
  }),
];
