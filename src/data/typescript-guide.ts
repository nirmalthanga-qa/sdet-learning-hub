export type TypeScriptTopic = {
  id: string;
  group: string;
  title: string;
  explanation: string;
  points: string[];
  code?: string;
  exampleContext?: string;
  practice: string;
};

export const typescriptTopics: TypeScriptTopic[] = [
  {
    id: "execution",
    group: "Language foundations",
    title: "1. TypeScript, JavaScript, and execution",
    explanation:
      "TypeScript describes and checks usage before execution. The runtime still executes JavaScript behavior. Successful compilation does not prove that a test checks the right outcome.",
    points: [
      "Separate type checking, transformation, and execution.",
      "Annotations and interfaces do not become runtime validators.",
      "A runner can transform TypeScript without performing complete type checking.",
      "Use a dedicated tsc --noEmit check in addition to executing tests.",
    ],
    code: `function total(price: number, quantity: number): number {
  return price * quantity;
}

const actual = total(200, 3);

if (actual !== 600) {
  throw new Error("Unexpected total");
}`,
    exampleContext:
      "Language example: type checking and the runtime assertion provide different evidence.",
    practice:
      "Introduce one incompatible argument and one incorrect business expectation. Explain which check catches each problem.",
  },
  {
    id: "primitives",
    group: "Language foundations",
    title: "2. Primitive types, inference, and literals",
    explanation:
      "Use string, number, boolean, null, and undefined deliberately. Inference reduces repetitive annotations, while literal types constrain specific values.",
    points: [
      "Use lowercase primitive type names.",
      "A number type does not establish a positive integer, safe integer, or valid currency value.",
      "Use literal unions for finite statuses and roles.",
      "null and undefined should reflect the actual contract.",
      "Avoid widening a known status to string when a specific union communicates more.",
    ],
    code: `type BrowserName = "chromium" | "firefox" | "webkit";
type OrderStatus = "pending" | "paid" | "cancelled";

const browser: BrowserName = "chromium";
let orderId: string | undefined;

orderId = "O-101";`,
    practice:
      "Define an environment-name union and validate an external string before using it as that type.",
  },
  {
    id: "collections",
    group: "Language foundations",
    title: "3. Arrays, tuples, Map, Set, and references",
    explanation:
      "Choose a collection based on the meaning of the data. Arrays preserve order, tuples describe fixed positions, Map associates keys with values, and Set tracks unique values.",
    points: [
      "Readonly arrays restrict mutation through that reference.",
      "Array indexing may return undefined; check bounds or enable noUncheckedIndexedAccess.",
      "Object equality usually compares identity rather than properties.",
      "Spread copies are shallow.",
      "Set removes duplicate information, which may be important in response validation.",
    ],
    code: `type Credentials = readonly [email: string, password: string];

const browsers: readonly string[] = ["chromium", "firefox"];
const ids = new Set<string>(["O-1", "O-1", "O-2"]);
const counts = new Map<string, number>();

counts.set("passed", 2);

console.log(ids.size); // 2`,
    practice:
      "Compare two lists of order IDs while preserving duplicate counts and leaving both inputs unchanged.",
  },
  {
    id: "object-contracts",
    group: "Language foundations",
    title: "4. Interfaces, aliases, optional fields, and readonly",
    explanation:
      "Interfaces and type aliases describe contracts. Optional fields require absence handling, and readonly is a compile-time restriction rather than a deep runtime freeze.",
    points: [
      "Interfaces support extension and declaration merging.",
      "Aliases can express unions, intersections, functions, and object shapes.",
      "Structural compatibility does not imply an exact runtime key set.",
      "A property that is absent is not always equivalent to one explicitly set to undefined.",
      "Use exactOptionalPropertyTypes when that distinction should be enforced.",
    ],
    code: `interface User {
  readonly id: string;
  email: string;
  displayName?: string;
}

function label(user: User): string {
  return user.displayName ?? user.email;
}`,
    practice:
      "Model an API response with one optional property and one required nullable property. Explain the difference.",
  },
  {
    id: "functions",
    group: "Language foundations",
    title: "5. Functions, callbacks, closures, rest, and this",
    explanation:
      "Typed functions describe what callers supply and receive. Callbacks are functions passed to other functions. Closures retain access to an enclosing scope.",
    points: [
      "Use explicit return types where they clarify a public helper contract.",
      "Rest parameters collect arguments; spread expands values into a call or collection.",
      "Defaults apply to omitted or undefined arguments, not every falsy value.",
      "Arrow functions capture lexical this; ordinary methods depend on how they are called.",
      "A closure over shared mutable state can leak data between tests.",
    ],
    code: `function createIdFactory(prefix: string): () => string {
  let sequence = 0;

  return () => prefix + "-" + ++sequence;
}

function sum(...values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

const nextId = createIdFactory("local");
console.log(nextId()); // local-1
console.log(sum(1, 2, 3)); // 6`,
    exampleContext:
      "The ID factory is local to one closure. It does not guarantee uniqueness across processes or test runs.",
    practice:
      "Create separate ID factories for two tests and explain how their counters differ from a shared module-level counter.",
  },
  {
    id: "narrowing",
    group: "Reliable contracts",
    title: "6. unknown, any, never, and narrowing",
    explanation:
      "unknown requires evidence before use. any bypasses many checks. never describes a value that cannot occur, which is useful for exhaustive handling.",
    points: [
      "Narrow using typeof, null checks, instanceof, Array.isArray, and property checks.",
      "Catch values can be unknown; do not assume every thrown value is an Error.",
      "A type predicate must validate the shape it claims.",
      "A non-null assertion suppresses a check; it does not create a value.",
    ],
    code: `function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function assertNever(value: never): never {
  throw new Error("Unhandled case: " + String(value));
}`,
    practice:
      "Replace an any-typed JSON result with unknown and add checks before accessing its properties.",
  },
  {
    id: "runtime-validation",
    group: "Reliable contracts",
    title: "7. Runtime validation and assertion functions",
    explanation:
      "API responses, fixtures, and configuration enter the program as runtime values. Validate what you depend on instead of casting them to the desired type.",
    points: [
      "JSON.parse establishes JSON syntax, not a business contract.",
      "Schema libraries and handwritten validators both require maintained rules.",
      "Validate nested fields and array elements when your code uses them.",
      "An assertion function must throw when its assertion is false.",
    ],
    code: `type Order = {
  id: string;
  totalPaise: number;
};

function assertOrder(value: unknown): asserts value is Order {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    !("id" in value) ||
    typeof value.id !== "string" ||
    value.id.length === 0 ||
    !("totalPaise" in value) ||
    typeof value.totalPaise !== "number" ||
    !Number.isSafeInteger(value.totalPaise) ||
    value.totalPaise < 0
  ) {
    throw new Error("Invalid order");
  }
}

const body: unknown = JSON.parse('{"id":"O-1","totalPaise":500}');
assertOrder(body);
console.log(body.id);`,
    practice:
      "Reject an order with a negative total, a missing ID, or a numeric ID. Verify that each rejection actually happens.",
  },
  {
    id: "unions",
    group: "Reliable contracts",
    title: "8. Discriminated unions and exhaustive outcomes",
    explanation:
      "Represent distinct outcomes with a shared literal discriminant. This prevents invalid combinations such as success without data.",
    points: [
      "Use a discriminant such as kind or ok.",
      "Narrow before reading outcome-specific properties.",
      "An exhaustive switch reveals missing branches when the union grows.",
      "Prefer a clear union over many unrelated optional fields.",
    ],
    code: `type Outcome =
  | { kind: "passed"; durationMs: number }
  | { kind: "failed"; message: string };

function describe(outcome: Outcome): string {
  switch (outcome.kind) {
    case "passed":
      return "Passed in " + outcome.durationMs;
    case "failed":
      return outcome.message;
    default: {
      const unexpected: never = outcome;
      throw new Error("Unhandled outcome: " + String(unexpected));
    }
  }
}`,
    practice: "Add a blocked outcome and update the exhaustive handler.",
  },
  {
    id: "generics",
    group: "Reliable contracts",
    title: "9. Generics, constraints, keyof, and indexed access",
    explanation:
      "Generics preserve relationships between inputs and outputs. Constraints expose only the capabilities a helper needs.",
    points: [
      "keyof derives a union of property keys.",
      "T[K] describes the type of a selected property.",
      "Generics do not validate data or transform runtime values.",
      "Include undefined in lookup results that may be missing.",
    ],
    code: `function getProperty<T, K extends keyof T>(
  object: T,
  key: K
): T[K] {
  return object[key];
}

const product = { id: "P-1", stock: 3 };

const stock = getProperty(product, "stock");
// stock is number`,
    practice:
      "Write a generic findById helper that preserves extra properties and handles no match.",
  },
  {
    id: "advanced-types",
    group: "Reliable contracts",
    title: "10. Utility, mapped, conditional, and template literal types",
    explanation:
      "Derive related contracts from an existing type instead of duplicating every property definition. Keep advanced types readable and justified by actual needs.",
    points: [
      "Partial, Required, Pick, Omit, Readonly, and Record describe common transformations.",
      "ReturnType, Parameters, and Awaited derive function-related types.",
      "Exclude and Extract select members of unions.",
      "Mapped types transform properties; conditional types select types by a condition.",
      "These transformations do not remove or validate runtime properties.",
    ],
    code: `interface User {
  id: string;
  email: string;
  active: boolean;
}

type UserUpdate = Partial<Pick<User, "email" | "active">>;
type Flags<T> = { [K in keyof T]: boolean };
type ElementOf<T> = T extends readonly (infer U)[] ? U : T;
type TestId = \`test-\${string}\`;

async function loadUser(): Promise<User> {
  return { id: "U-1", email: "tester@example.com", active: true };
}

type LoadedUser = Awaited<ReturnType<typeof loadUser>>;`,
    practice:
      "Create an update contract that excludes ID and a summary contract containing only ID and email.",
  },
  {
    id: "satisfies",
    group: "Reliable contracts",
    title: "11. as const, satisfies, enums, and assertions",
    explanation:
      "Preserve literal information when useful, check compatibility without unnecessarily widening values, and avoid unsafe casts.",
    points: [
      "as const preserves literal types and gives readonly object or tuple structure in the inferred type.",
      "satisfies checks compatibility while preserving useful expression information.",
      "Neither feature freezes runtime data or validates an API response.",
      "String unions are often sufficient for statuses; regular enums also introduce runtime values.",
      "Use as only when you can justify the information unavailable to the compiler.",
    ],
    code: `type Environment = "local" | "staging";

const baseUrls = {
  local: "http://localhost:3000",
  staging: "https://staging.example.com",
} satisfies Record<Environment, string>;

const roles = ["customer", "admin"] as const;
type Role = (typeof roles)[number];`,
    practice:
      "Remove a required environment key and observe the type error. Then explain why satisfies would not validate a JSON configuration file.",
  },
  {
    id: "oop",
    group: "Framework design",
    title: "12. OOP, composition, and dependency injection",
    explanation:
      "Use classes for cohesive state and behavior, interfaces for contracts, and composition when responsibilities vary independently.",
    points: [
      "Understand constructors, methods, getters, static members, and instance members.",
      "Distinguish TypeScript private from runtime #private fields.",
      "Use inheritance for a meaningful substitutable relationship.",
      "Inject collaborators rather than creating fixed dependencies inside every helper.",
      "Avoid a universal base class containing unrelated browser, API, and database responsibilities.",
    ],
    code: `interface Reporter {
  write(message: string): void;
}

class RunSummary {
  constructor(private readonly reporter: Reporter) {}

  finish(): void {
    this.reporter.write("Run finished");
  }
}`,
    practice:
      "Supply a collecting reporter to test RunSummary without printing to the console.",
  },
  {
    id: "async",
    group: "Framework design",
    title: "13. Promises, cancellation, and concurrency",
    explanation:
      "Await results before using them, preserve failures, and control how much work runs concurrently.",
    points: [
      "Use Promise<T> and Promise<void> to express asynchronous contracts.",
      "Use sequential awaits for dependent operations.",
      "Promise.all coordinates independent work but does not cancel other inputs after rejection.",
      "Promise.allSettled exposes every settled outcome; inspect failures rather than ignoring them.",
      "A Promise.race timeout does not cancel the underlying task.",
      "Pass AbortSignal only to APIs that support it, and use bounded batches or workers for large workloads.",
    ],
    code: `async function loadText(
  url: string,
  signal: AbortSignal
): Promise<string> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.text();
}

// Caller creates an AbortController and passes controller.signal.
// Calling controller.abort() requests cancellation of this fetch.`,
    exampleContext:
      "Requires a runtime with fetch and AbortController. Cancellation support belongs to the underlying API.",
    practice:
      "Process inputs in batches of three and explain what happens to already-started work if one task fails.",
  },
  {
    id: "modules",
    group: "Project configuration",
    title: "14. Modules, imports, and declaration files",
    explanation:
      "Align imports and module settings with the runtime or bundler that will execute the code.",
    points: [
      "Understand ESM import/export and CommonJS require/module.exports.",
      "Use import type for imports needed only by the type checker.",
      "package.json type, file extensions, and compiler options work together.",
      ".d.ts files describe types and do not provide executable implementations.",
      "TypeScript paths aliases do not automatically rewrite runtime imports.",
      "Keep application, Node utility, Playwright, and Cypress type environments appropriately scoped.",
    ],
    code: `import type { Page, Locator } from "@playwright/test";

// A type-only import is removed from emitted JavaScript.
// The actual runtime object must still come from a fixture or caller.`,
    exampleContext: "Playwright project with @playwright/test installed.",
    practice:
      "Explain how a module can type-check with an alias yet fail when executed by Node without matching resolution support.",
  },
  {
    id: "tsconfig",
    group: "Project configuration",
    title: "15. tsconfig and strict checking",
    explanation:
      "Choose compiler settings for the execution environment. Do not copy the Learning Hub's Next.js configuration into every automation project.",
    points: [
      "strict enables a group of checks including strict null handling and implicit-any checks.",
      "noUncheckedIndexedAccess makes unchecked indexing account for missing values.",
      "exactOptionalPropertyTypes distinguishes absence from explicitly assigned undefined.",
      "target controls emitted language features; lib describes available API types.",
      "module and moduleResolution must match the toolchain.",
      "types scopes automatically included global type packages.",
      "Use npx tsc -p path/to/tsconfig.json --noEmit to check a project.",
    ],
    code: `{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "useUnknownInCatchVariables": true
  }
}`,
    exampleContext:
      "Strictness options to merge into a runner-appropriate configuration, not a complete universal tsconfig.",
    practice:
      "Enable unchecked indexed access and repair an array lookup without using a non-null assertion.",
  },
  {
    id: "playwright",
    group: "Playwright integration",
    title: "16. Typed Playwright tests and page objects",
    explanation:
      "Use Playwright's exported types and promise-based interactions. Keep scenario expectations clear and await asynchronous actions and assertions.",
    points: [
      "Use Page, Locator, BrowserContext, APIRequestContext, and TestInfo where needed.",
      "Type page-object constructor dependencies.",
      "Store Locators for reusable element queries.",
      "Use typed options for configuration and projects.",
      "Passing TypeScript checks does not prove a selector matches the intended element.",
    ],
    code: `import { test, expect, type Page, type Locator } from "@playwright/test";

class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email", { exact: true });
    this.password = page.getByLabel("Password", { exact: true });
    this.submit = page.getByRole("button", { name: "Sign in", exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto("/login");
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}

test("login page exposes credentials", async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await expect(login.email).toBeVisible();
  await expect(login.password).toBeVisible();
});`,
    exampleContext:
      "Playwright spec. Requires configured baseURL and an application with the illustrated /login page and labels.",
    practice:
      "Add a typed product-page object and assert a visible business outcome from the spec.",
  },
  {
    id: "fixtures",
    group: "Playwright integration",
    title: "17. Typed fixtures, scope, and cleanup",
    explanation:
      "Fixtures inject dependencies into tests and define setup and teardown. Their types describe what each test can request.",
    points: [
      "test.extend accepts a type describing custom test fixtures.",
      "Worker fixtures have a separate type parameter and lifecycle.",
      "Use test-scoped mutable data unless sharing is deliberately safe.",
      "Perform teardown after use, and use finally when cleanup must happen despite failures.",
      "Override configuration through fixture options rather than hidden globals.",
    ],
    code: `import { test as base, expect } from "@playwright/test";

type TestFixtures = {
  cartIds: string[];
};

export const test = base.extend<TestFixtures>({
  cartIds: async ({}, use) => {
    const ids: string[] = [];

    try {
      await use(ids);
    } finally {
      // In a real fixture, delete only server resources owned by this test.
      ids.length = 0;
    }
  },
});

test("fixture state starts empty", async ({ cartIds }) => {
  expect(cartIds).toEqual([]);
});`,
    exampleContext:
      "Playwright spec illustrating fixture lifecycle. Clearing this local array does not delete server-side carts.",
    practice:
      "Extend the fixture with an API-backed resource and cleanup that preserves the original test failure.",
  },
  {
    id: "api-data",
    group: "Playwright integration",
    title: "18. Typed API data and parameterized cases",
    explanation:
      "Describe known test cases statically, then validate external response bodies at runtime.",
    points: [
      "A generic API helper must not return response.json() as T without validating the claim.",
      "Keep status, schema, business values, and side effects as separate checks.",
      "Use discriminated unions for expected success and rejection cases.",
      "Give parameterized tests unique titles and independent mutable data.",
      "Do not assume retries restore the original application state.",
    ],
    code: `type QuantityCase = {
  name: string;
  quantity: number;
  expectedValid: boolean;
};

const cases = [
  { name: "minimum", quantity: 1, expectedValid: true },
  { name: "below minimum", quantity: 0, expectedValid: false },
] satisfies readonly QuantityCase[];

// In a Playwright API test:
// const response = await request.get("/api/orders/O-1");
// expect(response.ok()).toBeTruthy();
// const body: unknown = await response.json();
// assertOrder(body); // Use the validator from this guide.
// expect(body.id).toBe("O-1");`,
    exampleContext:
      "The cases are standalone TypeScript. The commented API integration needs an actual endpoint, fixture, and imported validator.",
    practice:
      "Write a typed success/rejection case union so rejection cases cannot accidentally require success-only fields.",
  },
  {
    id: "cypress",
    group: "Cypress integration",
    title: "19. Cypress Chainable and command sequencing",
    explanation:
      "Cypress commands are queued operations, not ordinary promises. Use chains and yielded subjects rather than async/await around cy commands.",
    points: [
      "Use Cypress.Chainable<T> for helpers returning Cypress chains.",
      "Use .then to work with yielded values once.",
      "Use .should for assertions that should participate in Cypress retry behavior.",
      "Keep side effects out of retried assertion callbacks.",
      "Do not read an outer variable immediately after scheduling a Cypress command and expect the callback to have already run.",
    ],
    code: `function readHeading(): Cypress.Chainable<string> {
  return cy.get("h1").invoke("text");
}

it("shows the catalog heading", () => {
  cy.visit("/products");
  cy.get("h1").should("have.text", "Products");

  readHeading().then((text) => {
    expect(text.trim()).to.equal("Products");
  });
});`,
    exampleContext:
      "Cypress spec. Requires baseUrl and a /products page with the illustrated heading. Do not make this test callback async.",
    practice:
      "Rewrite a helper that incorrectly returns a value from an outer variable so it returns a Cypress chain instead.",
  },
  {
    id: "cypress-commands",
    group: "Cypress integration",
    title: "20. Custom commands and declaration merging",
    explanation:
      "A custom command needs both runtime registration and a matching type declaration. A declaration alone does not create the command.",
    points: [
      "Augment Cypress.Chainable with the command signature.",
      "Keep the yielded subject type accurate.",
      "Import the implementation from the support entry file.",
      "Ensure declaration files are included by the Cypress tsconfig.",
      "Scope Cypress globals separately from conflicting test-runner globals.",
    ],
    code: `// cypress/support/commands.ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      byTestId(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("byTestId", (id: string) => {
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error("Unsupported test ID");
  }

  return cy.get<HTMLElement>('[data-testid="' + id + '"]');
});

// cypress/support/e2e.ts must include:
// import "./commands";

// A spec can then use:
// cy.byTestId("checkout-button").should("be.visible");`,
    exampleContext:
      "Cypress support code, not a standalone Node script. The identifier restriction avoids constructing an unsafe CSS selector from arbitrary text.",
    practice:
      "Add a command with a typed argument and return subject, then verify its declaration and implementation agree.",
  },
  {
    id: "cypress-api",
    group: "Cypress integration",
    title: "21. Cypress fixtures, intercepts, and Node tasks",
    explanation:
      "Type annotations improve authoring for fixtures and intercepted traffic, but external data still needs runtime validation.",
    points: [
      "cy.fixture<T> and request/response generics express expected shapes; they do not establish runtime correctness.",
      "Use cy.intercept to control or observe relevant network behavior and assert meaningful request and response values.",
      "Use cy.task for work that belongs in Cypress's Node process.",
      "Task arguments and results must respect the task transport's serialization limits.",
      "Tasks must return a value or a promise resolving to a value; use null when no result is needed.",
    ],
    code: `type CreateOrderRequest = { productId: string; quantity: number };
type CreateOrderResponse = { id: string };

cy.intercept("POST", "/api/orders").as("createOrder");

// Perform the UI action that submits the order:
cy.get('[data-testid="place-order"]').click();

cy.wait<CreateOrderRequest, CreateOrderResponse>("@createOrder")
  .then(({ request, response }) => {
    expect(request.body.quantity).to.be.greaterThan(0);

    if (!response) {
      throw new Error("No order response");
    }

    expect(response.statusCode).to.equal(201);
    expect(response.body.id).to.be.a("string").and.not.be.empty;
  });`,
    exampleContext:
      "Cypress spec fragment. Requires prepared checkout state, a matching button, and the illustrated API contract.",
    practice:
      "Validate fixture data before using it and add an explicit rejected-request scenario with no unintended state change.",
  },
  {
    id: "quality-gates",
    group: "Delivery and practice",
    title: "22. Type checks, linting, debugging, and CI",
    explanation:
      "Use several kinds of evidence: compilation checks, lint rules, utility tests, integration tests, and browser tests.",
    points: [
      "Run type checking separately for the relevant automation project.",
      "Use type-aware linting to identify floating or misused promises where appropriate.",
      "Use @ts-expect-error only for a documented deliberate negative type test, not to hide ordinary defects.",
      "Keep runner and compiler versions consistent through package manifests and lockfiles.",
      "Inspect traces, screenshots, logs, stack traces, and source maps according to the failure.",
      "A passing build is not evidence that browser scenarios were executed.",
    ],
    code: `// Example package.json scripts for a Playwright project:
{
  "scripts": {
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test:e2e": "playwright test"
  }
}

// Run the typecheck and test:e2e scripts as separate CI steps.
// A Cypress project uses its own configuration and cypress run command.`,
    exampleContext:
      "Illustrative script entries. Merge them into the appropriate automation project; do not paste comments into JSON.",
    practice:
      "Deliberately introduce one type error and one failing runtime assertion. Confirm that the appropriate pipeline step catches each.",
  },
  {
    id: "capstone",
    group: "Delivery and practice",
    title: "23. End-to-end TypeScript automation exercise",
    explanation:
      "Build a small vertical slice that connects types, validation, test data, framework integration, and failure reporting.",
    points: [
      "Define User, Product, Order, and rejection-result contracts.",
      "Implement isolated factories with controlled overrides.",
      "Validate external JSON as unknown before using it.",
      "Create a typed Playwright fixture and a focused page component.",
      "Implement the equivalent Cypress workflow using chain-returning helpers.",
      "Cover success, invalid input, authorization, and duplicate submission.",
      "Keep each framework's setup and globals isolated.",
      "Add type-checking and execution steps, then inspect an intentional failure.",
    ],
    practice:
      "Explain which checks are compile-time, which are runtime, and which prove actual application behavior. Run against a controlled test environment with owned data and cleanup.",
  },
];

export const typescriptReferences = [
  {
    label: "TypeScript Handbook",
    href: "https://www.typescriptlang.org/docs/handbook/intro.html",
  },
  {
    label: "TypeScript configuration reference",
    href: "https://www.typescriptlang.org/tsconfig/",
  },
  {
    label: "Playwright TypeScript support",
    href: "https://playwright.dev/docs/test-typescript",
  },
  {
    label: "Playwright fixtures",
    href: "https://playwright.dev/docs/test-fixtures",
  },
  {
    label: "Cypress TypeScript support",
    href: "https://docs.cypress.io/app/tooling/typescript-support",
  },
  {
    label: "Cypress command execution model",
    href: "https://docs.cypress.io/app/core-concepts/introduction-to-cypress",
  },
];
