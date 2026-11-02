export type PlaywrightExample = {
  title: string;
  filename: string;
  code: string;
  command: string;
  expected: string;
  explanation: string;
};

export type PlaywrightSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: PlaywrightExample;
};

export type PlaywrightLessonData = {
  number: number;
  slug: string;
  title: string;
  description: string;
  content?: {
    introduction: string;
    objectives: string[];
    sections: PlaywrightSection[];
    mistakes: string[];
    exercise: {
      title: string;
      tasks: string[];
      solution: PlaywrightExample;
    };
    takeaway: string;
  };
};

export const playwrightLessons: PlaywrightLessonData[] = [
  {
    number: 1,
    slug: "introduction",
    title: "Introduction to Playwright",
    description:
      "Understand browser automation, Playwright Test, and meaningful test outcomes.",
    content: {
      introduction:
        "Playwright lets you interact with browser pages programmatically. Playwright Test adds test organization, assertions, fixtures, and reporting around those interactions.",
      objectives: [
        "Understand where browser automation fits in testing.",
        "Recognize the test, page, and expect APIs.",
        "Distinguish performing an action from verifying its outcome.",
        "Understand the scope of the first practice examples.",
      ],
      sections: [
        {
          title: "What are we automating?",
          paragraphs: [
            "A browser test can enter values, activate controls, navigate pages, and inspect application behavior.",
            "A complete end-to-end test exercises a connected workflow across the relevant application parts. Not every browser test is automatically an end-to-end test.",
            "Our first examples load small HTML pages with page.setContent. They demonstrate browser behavior without a backend. They do not prove that a real application's services work together.",
          ],
        },
        {
          title: "Playwright and Playwright Test",
          paragraphs: [
            "The Playwright library provides browser automation APIs. Playwright Test provides a runner and test-focused features around those APIs.",
            "We will use @playwright/test with TypeScript. Examples will live in a separate automation project.",
          ],
          bullets: [
            "test declares an independently executable test.",
            "page is a built-in fixture representing a browser page.",
            "expect checks an outcome and reports a failure when it does not match.",
            "await coordinates asynchronous browser actions and assertions.",
          ],
        },
        {
          title: "Read your first test",
          paragraphs: [
            "Read this example now and run it after completing the setup lesson.",
            "The test prepares a page, finds its heading, and verifies that the heading is visible.",
          ],
          example: {
            title: "Verify a page heading",
            filename: "tests/intro.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("shows the learning heading", async ({ page }) => {
  await page.setContent("<h1>SDET Practice</h1>");

  await expect(
    page.getByRole("heading", {
      name: "SDET Practice",
      exact: true,
    })
  ).toBeVisible();
});`,
            command: "npx playwright test tests/intro.spec.ts",
            expected:
              "The heading check passes after the project and browser are installed.",
            explanation:
              "A locator identifies the heading. The assertion evaluates whether that heading is visible.",
          },
        },
        {
          title: "Meaningful outcomes",
          paragraphs: [
            "A click completing successfully does not prove that an order was created or a message was saved.",
            "Connect the action to an observable outcome. For an actual checkout flow, this might include a confirmation, an order record, and the correct business values.",
            "A green test only supports the behavior it actually checked. Avoid broad claims based on a narrow assertion.",
          ],
        },
      ],
      mistakes: [
        "Calling every browser interaction an end-to-end test.",
        "Assuming a successful click proves the business operation succeeded.",
        "Forgetting await on asynchronous actions or locator assertions.",
        "Treating console output as a test assertion.",
      ],
      exercise: {
        title: "Verify a different heading",
        tasks: [
          "Load a page containing an h1 with the text Products.",
          "Locate it by role and accessible name.",
          "Verify that it is visible.",
        ],
        solution: {
          title: "Heading exercise",
          filename: "tests/intro-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("shows the product heading", async ({ page }) => {
  await page.setContent("<h1>Products</h1>");

  await expect(
    page.getByRole("heading", {
      name: "Products",
      exact: true,
    })
  ).toBeVisible();
});`,
          command: "npx playwright test tests/intro-exercise.spec.ts",
          expected: "The test passes.",
          explanation:
            "Run this after Lesson 2. Change the expected name to observe an intentional failure.",
        },
      },
      takeaway:
        "A useful browser test connects preparation and actions to explicit expected outcomes. Start small and understand what each assertion establishes.",
    },
  },
  {
    number: 2,
    slug: "project-setup",
    title: "Set Up a Playwright TypeScript Project",
    description:
      "Install the runner and browser, configure the project, and execute a local smoke test.",
    content: {
      introduction:
        "Create a separate Playwright practice project. The Learning Hub remains the tutorial website; the automation project is where learners execute examples.",
      objectives: [
        "Create a separate automation folder.",
        "Install Playwright Test and Chromium.",
        "Add a small runner and TypeScript configuration.",
        "Run a smoke test and a separate type check.",
      ],
      sections: [
        {
          title: "Prepare the project",
          paragraphs: [
            "Use a Node.js release supported by your installed Playwright version. Check the official installation documentation when choosing or updating your runtime.",
            "Create and open a folder named sdet-playwright-practice in VS Code. Open its terminal.",
            "Run the following commands in that folder. Do not run them in the Learning Hub application.",
          ],
          bullets: [
            "npm init -y",
            "npm install -D @playwright/test typescript @types/node",
            "npx playwright install chromium",
            "Create a tests folder.",
          ],
        },
        {
          title: "Configure the runner",
          paragraphs: [
            "Create playwright.config.ts at the practice-project root.",
            "This starter uses Chromium and one worker to keep early learning runs simple. Later lessons will introduce multiple projects and parallel execution.",
          ],
          example: {
            title: "Starter runner configuration",
            filename: "playwright.config.ts",
            code: `import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    browserName: "chromium",
    headless: true,
  },
});`,
            command: "npx playwright --version",
            expected: "The installed Playwright version is displayed.",
            explanation:
              "The command confirms the CLI is available. The smoke test below verifies that the browser can launch.",
          },
        },
        {
          title: "Configure a separate type check",
          paragraphs: [
            "Create tsconfig.json at the practice-project root using the example below.",
            "Playwright transforms TypeScript to run tests. Run the compiler separately to check types.",
            "These settings belong to this standalone starter project. Do not replace the Next.js application's configuration with them.",
          ],
          example: {
            title: "Starter TypeScript configuration",
            filename: "tsconfig.json",
            code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["node"]
  },
  "include": ["playwright.config.ts", "tests/**/*.ts"]
}`,
            command: "npx tsc --noEmit",
            expected:
              "The command exits successfully without compiler errors when the included files are valid.",
            explanation:
              "A passing type check and a passing browser test are different checks.",
          },
        },
        {
          title: "Verify the installation",
          paragraphs: [
            "Save the smoke test below in tests/setup.spec.ts.",
            "It uses page.setContent, so no application server or internet request is needed during the test.",
          ],
          example: {
            title: "Local browser smoke test",
            filename: "tests/setup.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("browser setup works", async ({ page }) => {
  await page.setContent("<button>Ready</button>");

  await expect(
    page.getByRole("button", { name: "Ready", exact: true })
  ).toBeEnabled();
});`,
            command: "npx playwright test tests/setup.spec.ts",
            expected: "One test passes.",
            explanation:
              "This checks that the configured runner can launch its browser and execute an assertion.",
          },
        },
        {
          title: "Read setup failures",
          paragraphs: [
            "If the browser executable is missing, install the browser matching the current Playwright package.",
            "If no tests are found, check the tests folder, filename, and testDir configuration.",
            "If operating-system dependencies are missing, follow the installation instructions for that environment. A downloaded browser alone may not supply every required system library.",
          ],
        },
      ],
      mistakes: [
        "Installing the practice runner in the tutorial website by accident.",
        "Confusing the browser installation with the npm package installation.",
        "Copying a Next.js tsconfig into an unrelated runner project.",
        "Assuming browser execution performs complete type checking.",
      ],
      exercise: {
        title: "Run the smoke test with a visible browser",
        tasks: [
          "Save the setup files.",
          "Run the smoke test with --headed.",
          "Run npx tsc --noEmit separately.",
        ],
        solution: {
          title: "Headed smoke test",
          filename: "tests/setup.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("browser setup works", async ({ page }) => {
  await page.setContent("<button>Ready</button>");

  await expect(
    page.getByRole("button", { name: "Ready", exact: true })
  ).toBeEnabled();
});`,
          command: "npx playwright test tests/setup.spec.ts --headed",
          expected:
            "A browser window opens briefly and the test passes. A graphical desktop is required for headed execution.",
          explanation:
            "The test behavior is the same. The flag changes whether the browser window is visible.",
        },
      },
      takeaway:
        "Keep the runner, browser installation, configuration, and type checking explicit. Confirm the environment with a small local test before adding application dependencies.",
    },
  },
  {
    number: 3,
    slug: "first-test",
    title: "Write Your First Interaction Test",
    description:
      "Arrange a page, interact with a control, and assert the resulting state.",
    content: {
      introduction:
        "Build a complete small test with preparation, action, and verification. Learn to distinguish a browser interaction from the outcome it should produce.",
      objectives: [
        "Structure a test around preparation, action, and assertion.",
        "Use the page fixture and asynchronous actions.",
        "Verify an observable state change.",
        "Run and deliberately fail a focused test.",
      ],
      sections: [
        {
          title: "Prepare, act, and assert",
          paragraphs: [
            "Prepare the required page and data. Perform the user action. Assert the outcome that matters.",
            "Keep the test title specific enough to explain the behavior being checked.",
            "Each example in this batch is self-contained and does not rely on another test running first.",
          ],
        },
        {
          title: "Activate a toggle",
          paragraphs: [
            "The tiny page below uses a button that updates aria-pressed when activated. The inline handler exists only to keep this teaching page self-contained.",
            "The test verifies both the initial state and the state after clicking.",
          ],
          example: {
            title: "Verify a toggle state",
            filename: "tests/first-interaction.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("activates the in-stock filter", async ({ page }) => {
  await page.setContent(\`
    <button
      aria-pressed="false"
      onclick="this.setAttribute('aria-pressed', 'true')"
    >
      In stock only
    </button>
  \`);

  const filter = page.getByRole("button", {
    name: "In stock only",
    exact: true,
  });

  await expect(filter).toHaveAttribute("aria-pressed", "false");
  await filter.click();
  await expect(filter).toHaveAttribute("aria-pressed", "true");
});`,
            command: "npx playwright test tests/first-interaction.spec.ts",
            expected:
              "The test passes after verifying the initial and changed button states.",
            explanation:
              "This tests the simulated toggle state. A real product filter test would additionally verify which products remain visible.",
          },
        },
        {
          title: "Use fixtures rather than global pages",
          paragraphs: [
            "The runner supplies page to the test callback and manages its lifecycle.",
            "Avoid assigning a page to a shared module-level variable for unrelated tests. Shared mutable state makes order and parallelism problems harder to diagnose.",
            "Browser isolation does not automatically isolate server-side accounts, carts, or orders. Later lessons will address application data.",
          ],
        },
        {
          title: "Navigate when testing an application",
          paragraphs: [
            "For a running application, use page.goto with its URL or a relative path and configured baseURL.",
            "page.setContent does not navigate to your application, exercise routing, or validate backend behavior.",
            "We will use application navigation when the relevant application contract and environment are prepared.",
          ],
        },
        {
          title: "Read a deliberate failure",
          paragraphs: [
            "Temporarily change the final expected attribute to false. Rerun the test and inspect the expected value, received value, and call log.",
            "Restore the correct expectation afterward. Do not change a product expectation merely to match broken behavior.",
          ],
        },
      ],
      mistakes: [
        "Stopping after click without checking the resulting state.",
        "Using tests that depend on a previous test's page.",
        "Forgetting that page.setContent is a simulated page.",
        "Ignoring a failed assertion because the browser looked correct.",
      ],
      exercise: {
        title: "Enter and verify an email",
        tasks: [
          "Create a labelled email input.",
          "Fill it using getByLabel.",
          "Assert its value.",
        ],
        solution: {
          title: "Verify entered text",
          filename: "tests/first-test-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("accepts an email value", async ({ page }) => {
  await page.setContent(\`
    <label for="email">Email</label>
    <input id="email" type="email" />
  \`);

  const email = page.getByLabel("Email", { exact: true });

  await email.fill("tester@example.com");
  await expect(email).toHaveValue("tester@example.com");
});`,
          command: "npx playwright test tests/first-test-exercise.spec.ts",
          expected:
            "The input contains the supplied email and the test passes.",
          explanation:
            "This checks text entry, not registration, authentication, or server-side email validation.",
        },
      },
      takeaway:
        "Every important action needs a meaningful observable outcome. Keep the scope of the evidence clear.",
    },
  },
  {
    number: 4,
    slug: "locators",
    title: "Locators and Reliable Element Selection",
    description:
      "Find elements by role, label, text, test ID, and scoped relationships.",
    content: {
      introduction:
        "A locator describes how to find elements. Choose one that communicates intent and remains stable when incidental page structure changes.",
      objectives: [
        "Use role, label, text, and test-ID locators.",
        "Scope repeated controls to the intended component.",
        "Understand strictness and multiple matches.",
        "Avoid hiding ambiguous selection with first or nth.",
      ],
      sections: [
        {
          title: "Select by meaning",
          paragraphs: [
            "Role and accessible name are useful for interactive elements. Labels are useful for form controls. Text locators help identify non-interactive content.",
            "Test IDs provide an explicit testing contract when semantic selection is insufficient. CSS can be appropriate when it expresses a stable contract.",
          ],
          bullets: [
            'getByRole("button", { name: "Save", exact: true })',
            'getByLabel("Email", { exact: true })',
            'getByText("Order confirmed", { exact: true })',
            'getByTestId("order-summary")',
            'getByPlaceholder("Search products") when the placeholder is the intended contract.',
          ],
        },
        {
          title: "Scope repeated controls",
          paragraphs: [
            "Repeated Add to cart buttons are not inherently a problem. First identify the intended product, then find its button.",
            "The example gives each product section an accessible name through its heading.",
          ],
          example: {
            title: "Target the intended product",
            filename: "tests/locators.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("adds the keyboard rather than the mouse", async ({ page }) => {
  await page.setContent(\`
    <section aria-labelledby="keyboard-title">
      <h2 id="keyboard-title">Keyboard</h2>
      <button onclick="this.textContent = 'Added'">Add to cart</button>
    </section>

    <section aria-labelledby="mouse-title">
      <h2 id="mouse-title">Mouse</h2>
      <button onclick="this.textContent = 'Added'">Add to cart</button>
    </section>
  \`);

  const keyboard = page.getByRole("region", {
    name: "Keyboard",
    exact: true,
  });

  const mouse = page.getByRole("region", {
    name: "Mouse",
    exact: true,
  });

  await keyboard.getByRole("button", {
    name: "Add to cart",
    exact: true,
  }).click();

  await expect(
    keyboard.getByRole("button", { name: "Added", exact: true })
  ).toBeVisible();

  await expect(
    mouse.getByRole("button", { name: "Add to cart", exact: true })
  ).toBeVisible();
});`,
            command: "npx playwright test tests/locators.spec.ts",
            expected:
              "The keyboard button changes to Added while the mouse button remains unchanged.",
            explanation:
              "The test scopes each action and assertion to the relevant product section.",
          },
        },
        {
          title: "Strictness and collection operations",
          paragraphs: [
            "An action such as click needs an unambiguous target. If your locator matches multiple elements, refine it.",
            "Collection checks such as toHaveCount intentionally operate on multiple matches.",
            "Use first or nth only when position is genuinely part of the requirement, not as a general solution to ambiguity.",
          ],
        },
        {
          title: "Filtering and stable contracts",
          paragraphs: [
            "Locators can be chained and filtered to express relationships. Keep the resulting selection understandable.",
            "A selector tied to many nested layout containers can break during an unrelated redesign. Prefer a meaningful role, label, stable attribute, or explicit test ID.",
            "A role locator is not a full accessibility audit. It provides useful semantic selection but does not establish complete accessibility.",
          ],
        },
      ],
      mistakes: [
        "Clicking a repeated button without identifying its component.",
        "Using first to hide an unintended multiple match.",
        "Depending on generated class names or long positional selectors.",
        "Assuming semantic locators prove full accessibility.",
      ],
      exercise: {
        title: "Find a summary using its test ID",
        tasks: [
          "Create an order-summary element with data-testid.",
          "Verify its full text.",
          "Also verify that there is exactly one matching element.",
        ],
        solution: {
          title: "Use an explicit test contract",
          filename: "tests/locator-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("shows one order summary", async ({ page }) => {
  await page.setContent(\`
    <div data-testid="order-summary">Total: 500</div>
  \`);

  const summary = page.getByTestId("order-summary");

  await expect(summary).toHaveCount(1);
  await expect(summary).toHaveText("Total: 500");
});`,
          command: "npx playwright test tests/locator-exercise.spec.ts",
          expected: "The count and text assertions pass.",
          explanation:
            "The test ID identifies the component. The assertions still need to check its expected behavior or content.",
        },
      },
      takeaway:
        "A reliable locator communicates which element you mean. Scope repeated controls and resolve ambiguity rather than hiding it.",
    },
  },
  {
    number: 5,
    slug: "assertions-and-waiting",
    title: "Assertions, Auto-Waiting, and Timeouts",
    description:
      "Wait for observable outcomes and distinguish action readiness from completed business behavior.",
    content: {
      introduction:
        "Reliable tests synchronize with meaningful conditions. Learn when Playwright waits automatically and when your test must express the expected result.",
      objectives: [
        "Use retrying locator assertions.",
        "Distinguish action readiness from business completion.",
        "Avoid fixed sleeps and one-time state snapshots.",
        "Understand the purpose of different timeout budgets.",
      ],
      sections: [
        {
          title: "Action readiness and outcome are different",
          paragraphs: [
            "Before an action, Playwright checks conditions relevant to that action. A click generally requires a suitable target that can receive the interaction.",
            "These checks do not mean an order was saved or a network operation completed. Express that outcome separately.",
            "Forcing an action can bypass checks and hide a real interaction problem. Investigate why the normal action cannot proceed.",
          ],
        },
        {
          title: "Assert an observable delayed result",
          paragraphs: [
            "The sample page below updates a message after a short delay. The delay belongs to the simulated application, not to the test.",
            "The test waits through the assertion until the expected message appears or the assertion times out.",
          ],
          example: {
            title: "Wait for a saved message",
            filename: "tests/waiting.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("shows the completed save result", async ({ page }) => {
  await page.setContent(\`
    <button onclick="
      this.disabled = true;
      setTimeout(() => {
        document.getElementById('status').textContent = 'Saved';
      }, 150);
    ">Save</button>

    <p role="status" id="status">Ready</p>
  \`);

  await page.getByRole("button", {
    name: "Save",
    exact: true,
  }).click();

  await expect(page.getByRole("status")).toHaveText("Saved");
});`,
            command: "npx playwright test tests/waiting.spec.ts",
            expected:
              "The test waits for Saved and passes without a fixed sleep in the test.",
            explanation:
              "The assertion observes the result. It does not depend on the test sleeping for exactly the application's timer duration.",
          },
        },
        {
          title: "Choose the right assertion",
          paragraphs: [
            "Use locator assertions when waiting for page state. Examples include toBeVisible, toHaveText, toHaveValue, toHaveCount, and toBeEnabled.",
            "A value extracted once is only a snapshot. Checking that snapshot with a generic matcher will not repeatedly read the page.",
          ],
          bullets: [
            "Prefer await expect(locator).toHaveText(expected) for changing text.",
            "Avoid expect(await locator.isVisible()).toBe(true) when the intent is to wait for visibility.",
            "Use ordinary matchers for stable in-memory calculations.",
            "Use expect.poll for an appropriate repeatedly sampled condition.",
          ],
        },
        {
          title: "Understand timeout budgets",
          paragraphs: [
            "A test has an overall execution budget. Assertions and some operations also have their own configurable timeout behavior.",
            "A timeout is an upper waiting limit, not a delay that always runs in full.",
            "When a timeout occurs, check the locator, expected state, application behavior, and environment before increasing it.",
            "Retries rerun a test; they are not a substitute for correct synchronization or isolated data.",
          ],
        },
        {
          title: "Wait for application meaning",
          paragraphs: [
            "For actual workflows, wait for a user-visible state, an appropriate response, a URL, or another contractually meaningful signal.",
            "Do not assume a generic page-load event establishes that every application operation is finished.",
            "When waiting for events triggered by an action, arrange the wait before the action so a fast event is not missed. Later lessons will apply this to dialogs, tabs, downloads, and responses.",
          ],
        },
      ],
      mistakes: [
        "Using waitForTimeout as the default synchronization strategy.",
        "Checking a one-time snapshot when a condition may change.",
        "Increasing every timeout without investigating the failure.",
        "Forcing actions that a real user could not perform.",
        "Confusing a completed click with completed business processing.",
      ],
      exercise: {
        title: "Wait for a loaded product count",
        tasks: [
          "Create a list that receives two items asynchronously.",
          "Assert the number of list items.",
          "Assert their ordered text without using a fixed sleep.",
        ],
        solution: {
          title: "Verify an asynchronously populated list",
          filename: "tests/waiting-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("shows both loaded products", async ({ page }) => {
  await page.setContent(\`
    <ul aria-label="Products" id="products"></ul>

    <script>
      setTimeout(() => {
        document.getElementById('products').innerHTML =
          '<li>Keyboard</li><li>Mouse</li>';
      }, 150);
    </script>
  \`);

  const items = page
    .getByRole("list", { name: "Products", exact: true })
    .getByRole("listitem");

  await expect(items).toHaveCount(2);
  await expect(items).toHaveText(["Keyboard", "Mouse"]);
});`,
          command: "npx playwright test tests/waiting-exercise.spec.ts",
          expected:
            "Two products appear in the expected order and both assertions pass.",
          explanation:
            "The test observes count and text. A real application's data source would require additional integration coverage.",
        },
      },
      takeaway:
        "Synchronize with observable outcomes. Use waiting behavior that matches the requirement and investigate failures before changing timing.",
    },
  },
  {
    number: 6,
    slug: "forms-and-controls",
    title: "Forms and Controls",
    description:
      "Interact with text inputs, checkboxes, radio buttons, native dropdowns, and keyboard controls.",
    content: {
      introduction:
        "Choose interactions that match the control. Verify its resulting state and, when testing a real application, the business outcome it supports.",
      objectives: [
        "Fill text inputs and verify their values.",
        "Set checkbox and radio states explicitly.",
        "Select native dropdown options.",
        "Use keyboard interactions deliberately.",
      ],
      sections: [
        {
          title: "Text inputs",
          paragraphs: [
            "Use fill to replace an input's current value. Locate labelled controls by their accessible label.",
            "Use press for a particular key such as Enter or Tab. Use pressSequentially when individual keyboard events are specifically relevant to the behavior under test.",
            "Typing and filling are interactions, not proof of successful form submission. Verify the resulting value or business outcome.",
          ],
          example: {
            title: "Fill and replace an input value",
            filename: "tests/forms-input.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("replaces the search value", async ({ page }) => {
  await page.setContent(\`
    <label for="search">Search products</label>
    <input id="search" value="Mouse" />
  \`);

  const search = page.getByLabel("Search products", {
    exact: true,
  });

  await search.fill("Keyboard");
  await expect(search).toHaveValue("Keyboard");

  await search.fill("");
  await expect(search).toHaveValue("");
});`,
            command: "npx playwright test tests/forms-input.spec.ts",
            expected:
              "The initial value is replaced with Keyboard and then cleared.",
            explanation:
              "fill sets the intended value without depending on the input's previous contents.",
          },
        },
        {
          title: "Checkboxes and radio buttons",
          paragraphs: [
            "Use check, uncheck, or setChecked when the intended checkbox state is known. These express the desired state more clearly than blindly toggling with click.",
            "Radio buttons represent a choice within a group. Selecting one should deselect another option in the same group.",
          ],
          example: {
            title: "Set preference controls",
            filename: "tests/forms-options.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("sets checkout preferences", async ({ page }) => {
  await page.setContent(\`
    <label>
      <input type="checkbox" />
      Email receipt
    </label>

    <fieldset>
      <legend>Delivery</legend>

      <label>
        <input type="radio" name="delivery" value="standard" checked />
        Standard
      </label>

      <label>
        <input type="radio" name="delivery" value="express" />
        Express
      </label>
    </fieldset>
  \`);

  const receipt = page.getByRole("checkbox", {
    name: "Email receipt",
  });

  await receipt.check();
  await expect(receipt).toBeChecked();

  await receipt.uncheck();
  await expect(receipt).not.toBeChecked();

  await page.getByRole("radio", { name: "Express" }).check();

  await expect(
    page.getByRole("radio", { name: "Express" })
  ).toBeChecked();

  await expect(
    page.getByRole("radio", { name: "Standard" })
  ).not.toBeChecked();
});`,
            command: "npx playwright test tests/forms-options.spec.ts",
            expected:
              "The receipt preference changes as requested and Express becomes the selected delivery option.",
            explanation:
              "The assertions verify state rather than assuming the interaction succeeded.",
          },
        },
        {
          title: "Native selects and custom dropdowns",
          paragraphs: [
            "Use selectOption for a native HTML select. You can select by value or label.",
            "A custom dropdown built from buttons, listboxes, or other elements is not a native select. Interact with its trigger and options according to its actual semantics.",
            "Do not assume every visually similar dropdown supports the same API.",
          ],
          example: {
            title: "Select a category",
            filename: "tests/forms-select.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("selects an accessories category", async ({ page }) => {
  await page.setContent(\`
    <label for="category">Category</label>
    <select id="category">
      <option value="all">All categories</option>
      <option value="accessories">Accessories</option>
    </select>
  \`);

  const category = page.getByLabel("Category", { exact: true });

  await category.selectOption("accessories");
  await expect(category).toHaveValue("accessories");

  await category.selectOption({ label: "All categories" });
  await expect(category).toHaveValue("all");
});`,
            command: "npx playwright test tests/forms-select.spec.ts",
            expected:
              "The selected value changes to accessories and then back to all.",
            explanation:
              "This example uses a native select. It does not demonstrate a custom combobox.",
          },
        },
        {
          title: "Keyboard operation",
          paragraphs: [
            "Keyboard checks should observe focus and resulting behavior. Calling focus directly is useful setup, but it does not prove that normal Tab navigation can reach the control.",
            "When validating keyboard navigation, start from a known location and use keyboard actions to reach and operate the relevant controls.",
          ],
        },
      ],
      mistakes: [
        "Using selectOption on a custom dropdown.",
        "Clicking a checkbox without considering its current state.",
        "Checking only that a value was entered when submission behavior matters.",
        "Calling focus and claiming the entire keyboard navigation flow was tested.",
      ],
      exercise: {
        title: "Move through a small form using the keyboard",
        tasks: [
          "Fill the email field.",
          "Press Tab to move to the consent checkbox.",
          "Verify focus and use Space to select it.",
        ],
        solution: {
          title: "Keyboard form exercise",
          filename: "tests/forms-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("moves from email to consent", async ({ page }) => {
  await page.setContent(\`
    <label for="email">Email</label>
    <input id="email" />

    <label>
      <input type="checkbox" />
      Accept terms
    </label>
  \`);

  const email = page.getByLabel("Email", { exact: true });
  const consent = page.getByRole("checkbox", {
    name: "Accept terms",
  });

  await email.fill("tester@example.com");
  await email.press("Tab");

  await expect(consent).toBeFocused();

  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
});`,
          command: "npx playwright test tests/forms-exercise.spec.ts",
          expected:
            "Tab moves focus from email to consent, and Space checks the checkbox.",
          explanation:
            "This verifies one keyboard transition and activation, not complete accessibility conformance.",
        },
      },
      takeaway:
        "Use control-specific actions, express the intended state, and verify the result.",
    },
  },
  {
    number: 7,
    slug: "tables-and-dynamic-content",
    title: "Tables and Dynamic Content",
    description:
      "Locate meaningful rows and verify changing collections without fixed sleeps.",
    content: {
      introduction:
        "Lists and tables often change after filtering, sorting, or loading. Identify records by their meaning and synchronize with the expected collection state.",
      objectives: [
        "Scope actions and assertions to a table row.",
        "Filter locators using a matching child.",
        "Verify dynamic counts and ordered text.",
        "Understand the limits of DOM-only collection checks.",
      ],
      sections: [
        {
          title: "Find a row by its data",
          paragraphs: [
            "Identify the table first, then the row containing the relevant record. Avoid relying on a row number unless ordering is part of the requirement.",
            "The has filter below selects a row containing a cell with an exact accessible name.",
          ],
          example: {
            title: "Inspect the keyboard stock row",
            filename: "tests/table-row.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("shows the keyboard stock", async ({ page }) => {
  await page.setContent(\`
    <table>
      <caption>Inventory</caption>
      <thead>
        <tr><th>Product</th><th>Stock</th></tr>
      </thead>
      <tbody>
        <tr><td>Mouse</td><td>0</td></tr>
        <tr><td>Keyboard</td><td>3</td></tr>
      </tbody>
    </table>
  \`);

  const table = page.getByRole("table", { name: "Inventory" });

  const keyboardRow = table.getByRole("row").filter({
    has: page.getByRole("cell", {
      name: "Keyboard",
      exact: true,
    }),
  });

  await expect(keyboardRow).toHaveCount(1);

  await expect(
    keyboardRow.getByRole("cell")
  ).toHaveText(["Keyboard", "3"]);
});`,
            command: "npx playwright test tests/table-row.spec.ts",
            expected:
              "Exactly one Keyboard row is found and its cells show Keyboard and 3.",
            explanation:
              "The row is selected by product identity rather than its current position.",
          },
        },
        {
          title: "Verify a changing collection",
          paragraphs: [
            "Use assertions that can retry while the collection changes. An immediate read followed by an ordinary array assertion captures only one moment.",
            "Verify content as well as count when the identity of the records matters.",
          ],
          example: {
            title: "Filter a product list",
            filename: "tests/dynamic-list.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("filters to in-stock products", async ({ page }) => {
  await page.setContent(\`
    <button onclick="
      setTimeout(() => {
        document.querySelector('[data-stock-zero]').remove();
      }, 100);
    ">In stock only</button>

    <ul aria-label="Products">
      <li>Keyboard</li>
      <li data-stock-zero>Mouse</li>
      <li>Monitor</li>
    </ul>
  \`);

  const products = page
    .getByRole("list", { name: "Products" })
    .getByRole("listitem");

  await expect(products).toHaveCount(3);

  await page.getByRole("button", {
    name: "In stock only",
  }).click();

  await expect(products).toHaveCount(2);
  await expect(products).toHaveText(["Keyboard", "Monitor"]);
});`,
            command: "npx playwright test tests/dynamic-list.spec.ts",
            expected:
              "The Mouse item disappears and the two remaining product names match.",
            explanation:
              "The application simulation contains a delay. The test waits through assertions instead of sleeping.",
          },
        },
        {
          title: "Sorting, pagination, and virtualized lists",
          paragraphs: [
            "When validating sorting, confirm whether the requirement uses numeric values, text, case-sensitive ordering, or a business-specific rule.",
            "A DOM count may describe only the current page or rendered viewport. It does not necessarily equal the total number of records.",
            "Virtualized lists may remove off-screen rows. Test their intended scrolling and loading behavior instead of assuming all data is present in the DOM.",
          ],
          bullets: [
            "Check the expected sort direction.",
            "Include equal values when tie behavior matters.",
            "Preserve the original array when sorting extracted data for comparison.",
            "Check empty-result and final-page behavior.",
          ],
        },
      ],
      mistakes: [
        "Selecting a record by a row index when its position can change.",
        "Including header rows in a data-row count accidentally.",
        "Checking only the number of results, not their identities.",
        "Assuming the DOM contains every paginated or virtualized record.",
      ],
      exercise: {
        title: "Verify an empty search result",
        tasks: [
          "Start with two products.",
          "Activate a simulated search with no matches.",
          "Verify both an empty list and an explanatory message.",
        ],
        solution: {
          title: "Empty result exercise",
          filename: "tests/table-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("explains an empty result", async ({ page }) => {
  await page.setContent(\`
    <button onclick="
      document.getElementById('products').replaceChildren();
      document.getElementById('message').textContent = 'No products found';
    ">Search unavailable item</button>

    <ul id="products" aria-label="Products">
      <li>Keyboard</li>
      <li>Mouse</li>
    </ul>

    <p role="status" id="message"></p>
  \`);

  await page.getByRole("button", {
    name: "Search unavailable item",
  }).click();

  await expect(
    page.getByRole("list", { name: "Products" }).getByRole("listitem")
  ).toHaveCount(0);

  await expect(page.getByRole("status")).toHaveText(
    "No products found"
  );
});`,
          command: "npx playwright test tests/table-exercise.spec.ts",
          expected:
            "No product items remain and the empty-result message is displayed.",
          explanation:
            "The message distinguishes the intended empty state from a list that simply failed to render.",
        },
      },
      takeaway:
        "Select records by meaningful data and verify the expected collection state, including ordering and empty results.",
    },
  },
  {
    number: 8,
    slug: "frames-and-shadow-dom",
    title: "Frames and Shadow DOM",
    description:
      "Distinguish embedded documents from shadow roots and select elements in the correct scope.",
    content: {
      introduction:
        "An iframe contains another document. A shadow root encapsulates part of a document's DOM. These boundaries need different locator approaches.",
      objectives: [
        "Use frameLocator for iframe content.",
        "Choose a specific frame when several exist.",
        "Interact with an open shadow root.",
        "Understand closed-shadow-root and XPath limitations.",
      ],
      sections: [
        {
          title: "An iframe is a separate document",
          paragraphs: [
            "A locator scoped to the main document does not automatically search inside an iframe.",
            "Use frameLocator to identify the iframe, then locate elements inside its document.",
            "When multiple frames exist, select the intended one by a stable contract such as its title or test ID.",
          ],
          example: {
            title: "Fill a field inside a frame",
            filename: "tests/frame.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("enters a reference inside the frame", async ({ page }) => {
  await page.setContent(\`
    <h1>Order support</h1>

    <iframe
      title="Order reference"
      srcdoc="<label for='reference'>Reference</label><input id='reference'>"
    ></iframe>
  \`);

  const reference = page
    .frameLocator('iframe[title="Order reference"]')
    .getByLabel("Reference", { exact: true });

  await reference.fill("O-101");
  await expect(reference).toHaveValue("O-101");

  await expect(
    page.getByRole("heading", { name: "Order support" })
  ).toBeVisible();
});`,
            command: "npx playwright test tests/frame.spec.ts",
            expected:
              "The field inside the iframe contains O-101 while the main page remains accessible.",
            explanation:
              "frameLocator scopes the field lookup to the iframe document. No Selenium-style global frame switch is required.",
          },
        },
        {
          title: "Nested frames and external content",
          paragraphs: [
            "For nested frames, chain frameLocator calls through the relevant documents.",
            "Cross-origin frames cannot be inspected using ordinary parent-page DOM access in the same way as same-origin content. Use the browser automation frame APIs.",
            "An external provider can introduce availability, configuration, and contract differences. Use authorized test integrations and controlled data.",
          ],
        },
        {
          title: "Open Shadow DOM",
          paragraphs: [
            "Supported Playwright locators generally search through open shadow roots. XPath does not pierce shadow roots, and closed shadow roots are not supported for ordinary locator access.",
            "The following example creates a small open shadow root. page.evaluate is used only to prepare the teaching component, not to bypass the user interaction.",
          ],
          example: {
            title: "Interact with an open shadow root",
            filename: "tests/shadow-dom.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("activates a shadow component button", async ({ page }) => {
  await page.setContent('<div id="widget"></div>');

  await page.evaluate(() => {
    const host = document.getElementById("widget");

    if (!host) {
      throw new Error("Widget host is missing");
    }

    const root = host.attachShadow({ mode: "open" });
    const button = document.createElement("button");

    button.textContent = "Save preference";

    button.addEventListener("click", () => {
      button.textContent = "Preference saved";
    });

    root.append(button);
  });

  await page.getByRole("button", {
    name: "Save preference",
    exact: true,
  }).click();

  await expect(
    page.getByRole("button", {
      name: "Preference saved",
      exact: true,
    })
  ).toBeVisible();
});`,
            command: "npx playwright test tests/shadow-dom.spec.ts",
            expected:
              "The button inside the open shadow root changes its accessible name.",
            explanation:
              "The test uses a normal role locator for the actual interaction.",
          },
        },
        {
          title: "Choose the correct boundary",
          paragraphs: [
            "Inspect the component structure before changing selectors. A failed lookup can result from searching the wrong document, an ambiguous frame, or unsupported closed shadow content.",
            "Do not treat iframe and Shadow DOM as interchangeable concepts.",
          ],
        },
      ],
      mistakes: [
        "Searching the main document for an iframe's input.",
        "Selecting the first iframe without identifying its purpose.",
        "Using XPath to reach into a shadow root.",
        "Assuming closed shadow roots can be accessed like open ones.",
        "Using evaluate to change application state instead of testing the intended interaction.",
      ],
      exercise: {
        title: "Choose the correct frame",
        tasks: [
          "Create Shipping and Billing frames with the same input label.",
          "Fill only the Billing postcode.",
          "Verify that the Shipping postcode stays empty.",
        ],
        solution: {
          title: "Frame scoping exercise",
          filename: "tests/frame-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("updates only the billing postcode", async ({ page }) => {
  await page.setContent(\`
    <iframe
      title="Shipping"
      srcdoc="<label for='postcode'>Postcode</label><input id='postcode'>"
    ></iframe>

    <iframe
      title="Billing"
      srcdoc="<label for='postcode'>Postcode</label><input id='postcode'>"
    ></iframe>
  \`);

  const shipping = page
    .frameLocator('iframe[title="Shipping"]')
    .getByLabel("Postcode");

  const billing = page
    .frameLocator('iframe[title="Billing"]')
    .getByLabel("Postcode");

  await billing.fill("560001");

  await expect(billing).toHaveValue("560001");
  await expect(shipping).toHaveValue("");
});`,
          command: "npx playwright test tests/frame-exercise.spec.ts",
          expected: "Only the Billing frame contains the supplied postcode.",
          explanation:
            "Identical labels are unambiguous once the correct frame is selected.",
        },
      },
      takeaway:
        "Use frame scoping for separate documents and suitable locators for open shadow roots. Identify the boundary before debugging the selector.",
    },
  },
  {
    number: 9,
    slug: "dialogs-and-tabs",
    title: "Dialogs, Popups, and Tabs",
    description:
      "Handle browser dialogs and capture new pages without missing events.",
    content: {
      introduction:
        "Some interactions create browser-managed dialogs or additional pages. Register the relevant handling before triggering the action, then verify the outcome.",
      objectives: [
        "Distinguish browser dialogs from HTML dialogs.",
        "Accept or dismiss browser confirmations.",
        "Capture a popup before the triggering action.",
        "Interact with and close the correct page.",
      ],
      sections: [
        {
          title: "Browser dialogs versus HTML modals",
          paragraphs: [
            "alert, confirm, and prompt create browser dialogs. They are handled through Playwright's dialog events rather than ordinary DOM locators.",
            "An HTML modal is part of the page. Locate it through its DOM and accessible semantics, such as getByRole('dialog').",
            "A dialog listener must accept or dismiss the browser dialog so the page can continue.",
          ],
        },
        {
          title: "Handle a confirmation",
          paragraphs: [
            "Register the handler before clicking the button. Capture relevant information, resolve the dialog, and assert the resulting page state.",
            "Avoid leaving a dialog open while waiting for the click to finish; the dialog can block that action.",
          ],
          example: {
            title: "Accept a removal confirmation",
            filename: "tests/dialog.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("confirms removal", async ({ page }) => {
  await page.setContent(\`
    <button onclick="
      const accepted = confirm('Remove item?');
      document.getElementById('result').textContent =
        accepted ? 'Removed' : 'Kept';
    ">Remove</button>

    <p role="status" id="result"></p>
  \`);

  let message: string | undefined;
  let type: string | undefined;

  page.once("dialog", async (dialog) => {
    message = dialog.message();
    type = dialog.type();
    await dialog.accept();
  });

  await page.getByRole("button", {
    name: "Remove",
    exact: true,
  }).click();

  await expect(page.getByRole("status")).toHaveText("Removed");

  expect(type).toBe("confirm");
  expect(message).toBe("Remove item?");
});`,
            command: "npx playwright test tests/dialog.spec.ts",
            expected:
              "The confirmation is accepted and the page reports Removed.",
            explanation:
              "The handler is installed before the action. Assertions outside the handler verify the captured dialog information.",
          },
        },
        {
          title: "Capture a popup",
          paragraphs: [
            "Start waiting for the popup before the action that opens it. Await the resulting Page, then use that page for subsequent locators.",
            "page.waitForEvent('popup') is tied to popups from that page. A context-level page event can observe new pages across the context.",
            "Waiting for a page event does not prove the intended content is ready. Assert the new page's relevant state.",
          ],
          example: {
            title: "Open and inspect a help tab",
            filename: "tests/popup.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("opens help in another page", async ({ page }) => {
  await page.setContent(\`
    <button onclick="
      const help = window.open('about:blank', '_blank');

      if (help) {
        help.document.write('<h1>Checkout help</h1>');
        help.document.close();
      }
    ">Open help</button>
  \`);

  const popupPromise = page.waitForEvent("popup");

  await page.getByRole("button", {
    name: "Open help",
    exact: true,
  }).click();

  const popup = await popupPromise;

  try {
    await expect(
      popup.getByRole("heading", {
        name: "Checkout help",
        exact: true,
      })
    ).toBeVisible();
  } finally {
    await popup.close();
  }

  await expect(
    page.getByRole("button", { name: "Open help" })
  ).toBeVisible();
});`,
            command: "npx playwright test tests/popup.spec.ts",
            expected:
              "The help heading appears in the popup, which is then closed. The original page remains usable.",
            explanation:
              "This uses a local about:blank popup. A real application test should also verify its intended destination and content.",
          },
        },
        {
          title: "HTML modal behavior",
          paragraphs: [
            "For a DOM-based modal, verify its accessible name, visible state, supported dismissal actions, and focus behavior.",
            "Opening a modal and finding its text is only part of the contract. Check whether the intended controls work and focus returns appropriately after closing.",
          ],
        },
      ],
      mistakes: [
        "Registering a dialog or popup listener after the action.",
        "Logging a browser dialog without accepting or dismissing it.",
        "Using the original page's locators to inspect popup content.",
        "Treating an HTML modal as a browser alert.",
        "Assuming a new page event proves the destination finished loading.",
      ],
      exercise: {
        title: "Cancel a destructive action",
        tasks: [
          "Handle the confirmation by dismissing it.",
          "Verify that the page reports Kept.",
          "Verify that the expected dialog message was received.",
        ],
        solution: {
          title: "Dismissal exercise",
          filename: "tests/dialog-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("keeps the item when removal is cancelled", async ({ page }) => {
  await page.setContent(\`
    <button onclick="
      document.getElementById('result').textContent =
        confirm('Remove item?') ? 'Removed' : 'Kept';
    ">Remove</button>

    <p role="status" id="result"></p>
  \`);

  let message: string | undefined;

  page.once("dialog", async (dialog) => {
    message = dialog.message();
    await dialog.dismiss();
  });

  await page.getByRole("button", { name: "Remove" }).click();

  await expect(page.getByRole("status")).toHaveText("Kept");
  expect(message).toBe("Remove item?");
});`,
          command: "npx playwright test tests/dialog-exercise.spec.ts",
          expected: "The confirmation is dismissed and the page reports Kept.",
          explanation:
            "For a real application, also verify that cancellation did not modify the corresponding server-side record.",
        },
      },
      takeaway:
        "Prepare event handling before the trigger, resolve blocking dialogs, and verify outcomes on the correct page.",
    },
  },
  {
    number: 10,
    slug: "uploads-and-downloads",
    title: "Uploads and Downloads",
    description:
      "Supply controlled files, capture downloads, and inspect saved content.",
    content: {
      introduction:
        "File tests should verify more than a filename. Control the input, capture the output, and inspect the content or application outcome required by the contract.",
      objectives: [
        "Upload a file using an input locator.",
        "Use an in-memory file payload for a self-contained example.",
        "Capture a download before triggering it.",
        "Save and inspect downloaded content in a test-specific location.",
      ],
      sections: [
        {
          title: "Supply a file through an input",
          paragraphs: [
            "Use setInputFiles with a file input. You can supply a filesystem path or an in-memory file payload.",
            "The example creates a small text payload in memory, so no fixture file needs to be created first.",
            "Selecting a file does not prove that an application uploaded or processed it on the server.",
          ],
          example: {
            title: "Select an in-memory document",
            filename: "tests/upload.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("selects a document", async ({ page }) => {
  await page.setContent(\`
    <label for="document">Document</label>
    <input
      id="document"
      type="file"
      onchange="
        document.getElementById('status').textContent =
          this.files.length ? this.files[0].name : 'No file';
      "
    />
    <p role="status" id="status">No file</p>
  \`);

  await page.getByLabel("Document").setInputFiles({
    name: "notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("SDET practice document", "utf8"),
  });

  await expect(page.getByRole("status")).toHaveText("notes.txt");
});`,
            command: "npx playwright test tests/upload.spec.ts",
            expected: "The selected filename appears in the status message.",
            explanation:
              "This verifies the file-selection interaction and displayed filename. It does not send a network upload.",
          },
        },
        {
          title: "File chooser and validation scenarios",
          paragraphs: [
            "If an application creates its input dynamically through a file chooser, register a filechooser wait before clicking the trigger, then set files on the returned chooser.",
            "For a real upload feature, cover accepted formats, size boundaries, rejected files, server-side validation, and processing results.",
            "The accept attribute is a browser selection hint, not proof that the server enforces a file policy.",
          ],
          bullets: [
            "Use synthetic, non-sensitive files.",
            "Keep binary content and the declared format consistent.",
            "Use test-owned records for server-side uploads.",
            "Clean up uploaded resources when the scenario is complete.",
          ],
        },
        {
          title: "Capture and inspect a download",
          paragraphs: [
            "Start waiting for the download before clicking its trigger. Save it to a test-specific path and inspect the result.",
            "The example generates a text file in the browser. It needs no external server.",
            "testInfo.outputPath supplies a location associated with the test, reducing collisions between executions.",
          ],
          example: {
            title: "Download and verify a report",
            filename: "tests/download.spec.ts",
            code: `import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("downloads the expected report", async ({ page }, testInfo) => {
  await page.setContent('<a id="report">Download report</a>');

  await page.evaluate(() => {
    const link = document.getElementById("report");

    if (!(link instanceof HTMLAnchorElement)) {
      throw new Error("Report link is missing");
    }

    const blob = new Blob(
      ["Order O-101: total 500"],
      { type: "text/plain" }
    );

    link.href = URL.createObjectURL(blob);
    link.download = "order-report.txt";
  });

  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("link", {
    name: "Download report",
    exact: true,
  }).click();

  const download = await downloadPromise;
  const destination = testInfo.outputPath("order-report.txt");

  await download.saveAs(destination);

  expect(await download.failure()).toBeNull();
  expect(download.suggestedFilename()).toBe("order-report.txt");

  const text = await readFile(destination, "utf8");
  expect(text).toBe("Order O-101: total 500");
});`,
            command: "npx playwright test tests/download.spec.ts",
            expected:
              "The file is saved successfully and its content matches the expected order report.",
            explanation:
              "The test verifies the suggested filename and file content. The blob URL belongs to this short-lived test page.",
          },
        },
        {
          title: "Choose file assertions that match the format",
          paragraphs: [
            "Text files can be read directly. CSV, PDF, images, and spreadsheets may require format-aware parsing.",
            "A downloaded file existing does not prove that it contains the correct records or a valid document.",
            "Avoid treating a simplistic comma split as a complete CSV parser when quoted fields or embedded separators are permitted.",
          ],
        },
      ],
      mistakes: [
        "Waiting for a download only after clicking its trigger.",
        "Checking a filename without checking required content.",
        "Assuming file selection proves server-side upload success.",
        "Using shared output paths across parallel tests.",
        "Using real confidential documents as fixtures.",
      ],
      exercise: {
        title: "Clear a selected file",
        tasks: [
          "Select an in-memory text file.",
          "Verify that the file input contains one file.",
          "Clear the selection and verify that it contains no files.",
        ],
        solution: {
          title: "Clear file selection",
          filename: "tests/upload-exercise.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("clears the file selection", async ({ page }) => {
  await page.setContent(\`
    <label for="document">Document</label>
    <input id="document" type="file" />
  \`);

  const input = page.getByLabel("Document");

  await input.setInputFiles({
    name: "notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Practice", "utf8"),
  });

  const selectedCount = await input.evaluate(
    (element: HTMLInputElement) => element.files?.length ?? 0
  );

  expect(selectedCount).toBe(1);

  await input.setInputFiles([]);

  const clearedCount = await input.evaluate(
    (element: HTMLInputElement) => element.files?.length ?? 0
  );

  expect(clearedCount).toBe(0);
});`,
          command: "npx playwright test tests/upload-exercise.spec.ts",
          expected:
            "The input has one selected file before clearing and zero afterward.",
          explanation:
            "The reads occur after the awaited file-selection operations. A real UI may also need an assertion on its displayed cleared state.",
        },
      },
      takeaway:
        "Control file inputs and verify meaningful outputs. Capture events before actions and inspect content rather than relying only on filenames.",
    },
  },
  {
    number: 11,
    slug: "test-organization",
    title: "Test Organization",
    description:
      "Organize independent tests using suites, hooks, tags, and meaningful steps.",
    content: {
      introduction:
        "A useful test suite communicates what the application should do. Organize checks around behavior, keep prerequisites explicit, and make each test runnable on its own.",
      objectives: [
        "Group related behavior with test.describe.",
        "Prepare independent tests with beforeEach.",
        "Use tags to select useful subsets.",
        "Use steps to explain a workflow.",
        "Recognize the risks of shared state and focused tests.",
      ],
      sections: [
        {
          title: "Organize around behavior",
          paragraphs: [
            "Prefer names that describe an observable result, such as 'shows an empty cart', rather than implementation details such as 'clicks button two'.",
            "A describe block groups related tests. It does not make one test a prerequisite for another.",
          ],
          bullets: [
            "Group tests by feature or business capability.",
            "Give each test the data and browser state it needs.",
            "Avoid tests that depend on execution order.",
            "Use folders when a feature grows beyond one readable file.",
          ],
        },
        {
          title: "Hooks, tags, and steps",
          paragraphs: [
            "beforeEach prepares every test in its scope. The built-in page fixture gives each test an isolated browser page.",
            "Tags support filtering. Steps add readable workflow boundaries to reports without creating separate tests.",
            "This example uses a small simulated cart. It checks browser behavior without an application backend.",
          ],
          example: {
            title: "Organize cart checks",
            filename: "tests/organization.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(
      '<h1>Cart</h1>' +
      '<p role="status">Cart is empty</p>' +
      '<button onclick="document.querySelector(\\'p\\').textContent=\\'1 item\\'">' +
      'Add notebook</button>'
    );
  });

  test("starts empty", { tag: "@smoke" }, async ({ page }) => {
    await expect(page.getByRole("status"))
      .toHaveText("Cart is empty");
  });

  test("adds a notebook", async ({ page }) => {
    await test.step("Add a product", async () => {
      await page.getByRole("button", { name: "Add notebook" }).click();
    });

    await test.step("Verify the cart summary", async () => {
      await expect(page.getByRole("status")).toHaveText("1 item");
    });
  });
});`,
            command: "npx playwright test tests/organization.spec.ts",
            expected:
              "Both tests pass independently. Each receives a newly prepared cart.",
            explanation:
              "Shared preparation lives in the hook, while each test owns its expected outcome.",
          },
        },
        {
          title: "Focused execution and annotations",
          paragraphs: [
            "Use --grep to select tagged or named tests. For example, --grep @smoke selects the smoke check above.",
            "test.skip excludes a test, test.fixme marks work that needs fixing, and test.fail declares an expected failure. Record a reason and review these decisions.",
            "test.only is useful temporarily during investigation, but it can accidentally exclude the rest of a suite. Enable forbidOnly in CI.",
            "beforeAll runs at worker scope and may run again after worker restarts. Do not assume it runs exactly once for the entire execution.",
          ],
        },
      ],
      mistakes: [
        "Making one test create the cart that another test needs.",
        "Placing every action in beforeEach until test intent becomes unclear.",
        "Leaving test.only committed.",
        "Using skipped tests as a permanent substitute for fixing failures.",
        "Sharing a mutable page between otherwise independent tests.",
      ],
      exercise: {
        title: "Run the smoke check independently",
        tasks: [
          "Save the organization example.",
          "Run only the @smoke test.",
          "Confirm the add-product test is not selected.",
          "Run the full file again and confirm both tests pass.",
        ],
        solution: {
          title: "Filter by tag",
          filename: "Terminal — automation practice project",
          code: `npx playwright test tests/organization.spec.ts --grep @smoke
npx playwright test tests/organization.spec.ts`,
          command:
            "npx playwright test tests/organization.spec.ts --grep @smoke",
          expected:
            "The filtered command runs one test per configured project. The full command runs two per project.",
          explanation:
            "Filtering selects tests; it should not change whether their prerequisites are available.",
        },
      },
      takeaway:
        "Organize tests so their purpose is clear and each can run independently. Hooks reduce repetition; they should not introduce hidden dependencies.",
    },
  },
  {
    number: 12,
    slug: "configuration-and-projects",
    title: "Configuration and Projects",
    description:
      "Configure browser projects, timeouts, retries, and diagnostic evidence.",
    content: {
      introduction:
        "Configuration defines the conditions under which tests execute. Projects let the same checks run under named combinations of settings.",
      objectives: [
        "Understand shared configuration and project overrides.",
        "Run a selected browser project.",
        "Distinguish test timeouts from assertion timeouts.",
        "Use retries without treating them as a fix.",
      ],
      sections: [
        {
          title: "Shared settings and browser projects",
          paragraphs: [
            "Keep common settings at the top level and put browser-specific settings inside projects.",
            "The configuration below runs Chromium and Firefox. Install both browser binaries before executing it.",
            "Save this as a separate practice configuration so earlier examples can still use your original configuration.",
          ],
          example: {
            title: "Two browser projects",
            filename: "playwright.projects.config.ts",
            code: `import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: "list",
  use: {
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});`,
            command: "npx playwright install chromium firefox",
            expected:
              "The browser binaries required by the two projects are installed.",
            explanation:
              "The project names select configurations. Desktop Chrome here uses Playwright's Chromium browser with the device descriptor settings.",
          },
        },
        {
          title: "Timeouts and retries answer different questions",
          paragraphs: [
            "The test timeout limits a test's execution budget. The expect timeout controls how long retrying assertions wait for their condition.",
            "Increasing a timeout can accommodate legitimate latency, but it can also delay detection of a broken workflow.",
            "A retry reruns a failed test. Investigate tests that pass only after retrying; they still indicate unreliable feedback.",
          ],
        },
        {
          title: "Environment configuration",
          paragraphs: [
            "When testing an application, baseURL lets tests navigate using relative paths such as page.goto('/login').",
            "Setting baseURL does not start an application. Use an existing environment or configure webServer to start and wait for a local application.",
            "Read environment-specific values from environment variables. Keep credentials out of committed configuration.",
          ],
          bullets: [
            "Choose environments explicitly.",
            "Fail early when required configuration is missing.",
            "Use separate test data for independent runs.",
            "Review the contents of traces before sharing them.",
          ],
        },
      ],
      mistakes: [
        "Assuming baseURL starts a server.",
        "Running a browser project before installing its browser.",
        "Increasing every timeout when a locator is incorrect.",
        "Treating a retry pass as evidence that the first failure does not matter.",
        "Forgetting that multiple projects multiply the number of executions.",
      ],
      exercise: {
        title: "Run the same check in two browsers",
        tasks: [
          "Save the projects configuration.",
          "Save the test below.",
          "Run it with the separate configuration.",
          "Repeat the command with --project=firefox.",
        ],
        solution: {
          title: "Check the heading across browsers",
          filename: "tests/projects.spec.ts",
          code: `import { test, expect } from "@playwright/test";

test("shows the course heading", async ({ page }) => {
  await page.setContent("<h1>SDET Learning Hub</h1>");

  await expect(
    page.getByRole("heading", { name: "SDET Learning Hub" })
  ).toBeVisible();
});`,
          command:
            "npx playwright test tests/projects.spec.ts --config=playwright.projects.config.ts",
          expected:
            "The check passes once in Chromium and once in Firefox. Selecting Firefox runs only that project.",
          explanation:
            "The test expresses one behavior while projects vary its execution conditions.",
        },
      },
      takeaway:
        "Use configuration to make execution conditions explicit. Browser coverage, timeout budgets, retries, and evidence collection serve different purposes.",
    },
  },
  {
    number: 13,
    slug: "page-objects",
    title: "Page Objects and Components",
    description:
      "Use typed objects to organize cohesive interactions and reusable components.",
    content: {
      introduction:
        "As tests grow, repeated interactions can obscure their purpose. Page objects group related browser interactions behind a small, meaningful interface.",
      objectives: [
        "Inject a typed Page into an object.",
        "Declare reusable Locator properties.",
        "Keep business expectations visible in tests.",
        "Recognize when a component object is more useful than a whole-page object.",
      ],
      sections: [
        {
          title: "A small object with one responsibility",
          paragraphs: [
            "The object below owns the interactions for a search form. It receives its browser page rather than creating a browser itself.",
            "The class and test share a file for this exercise. In a larger project, move the class into a dedicated module and import it.",
            "The HTML is a simulated interface. It does not query a product service.",
          ],
          example: {
            title: "Model a search form",
            filename: "tests/page-objects.spec.ts",
            code: `import { test, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";

class SearchForm {
  readonly query: Locator;
  readonly submit: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.query = page.getByRole("textbox", { name: "Product" });
    this.submit = page.getByRole("button", { name: "Search", exact: true });
    this.result = page.getByRole("status");
  }

  async searchFor(product: string): Promise<void> {
    await this.query.fill(product);
    await this.submit.click();
  }
}

test("shows the submitted search", async ({ page }) => {
  await page.setContent(
    '<label for="product">Product</label>' +
    '<input id="product">' +
    '<button onclick="document.querySelector(\\'p\\').textContent=' +
    'document.querySelector(\\'input\\').value">Search</button>' +
    '<p role="status"></p>'
  );

  const search = new SearchForm(page);

  await search.searchFor("Keyboard");

  await expect(search.result).toHaveText("Keyboard");
});`,
            command: "npx playwright test tests/page-objects.spec.ts",
            expected:
              "The search object enters a product and submits it. The test verifies the displayed value.",
            explanation:
              "The object describes an interaction, while the test states the outcome that matters for this scenario.",
          },
        },
        {
          title: "Page objects versus component objects",
          paragraphs: [
            "A page object can represent a complete screen. A component object can represent a reusable part such as a navigation bar, address form, or cart summary.",
            "For repeated widgets, accept a root Locator and scope child locators to that root.",
            "Compose small objects when a page contains several independent areas. A large inheritance tree is rarely necessary for a few shared interactions.",
          ],
        },
        {
          title: "Choose an abstraction that earns its place",
          paragraphs: [
            "Prefer methods such as searchFor or enterShippingAddress when they communicate a cohesive user action.",
            "Avoid generic wrappers that merely rename every Playwright method. They can hide useful locator and error information.",
            "Objects may contain reusable assertions when that improves clarity. Keep scenario-specific business expectations easy to find.",
          ],
        },
      ],
      mistakes: [
        "Creating one object containing every screen in the application.",
        "Adding fixed sleeps inside reusable methods.",
        "Storing one global page object for all tests.",
        "Hiding unrelated actions behind a method with a vague name.",
        "Building abstractions before understanding the repeated behavior.",
      ],
      exercise: {
        title: "Add a clear operation",
        tasks: [
          "Add the method below inside SearchForm.",
          "Call it after the existing result assertion.",
          "Assert that the search textbox is empty.",
          "Keep the existing result assertion to preserve the original coverage.",
        ],
        solution: {
          title: "Extend the search object",
          filename: "tests/page-objects.spec.ts — additions",
          code: `// Add inside the SearchForm class:
async clear(): Promise<void> {
  await this.query.clear();
}

// Add inside the existing test, after its result assertion:
await search.clear();
await expect(search.query).toHaveValue("");`,
          command: "npx playwright test tests/page-objects.spec.ts",
          expected:
            "The test verifies the submitted search and then confirms the input can be cleared.",
          explanation:
            "The method belongs to the search form and exposes a single clear operation.",
        },
      },
      takeaway:
        "Use small, typed objects to express reusable interactions. Preserve readable tests and avoid abstractions that hide more than they explain.",
    },
  },
  {
    number: 14,
    slug: "fixtures",
    title: "Reusable Fixtures",
    description:
      "Provide typed test dependencies with explicit setup, scope, and teardown.",
    content: {
      introduction:
        "Fixtures supply the resources a test needs. A custom fixture can prepare a page, create test data, or provide a reusable object.",
      objectives: [
        "Extend Playwright Test with a typed fixture.",
        "Understand setup before use and teardown afterward.",
        "Distinguish test-scoped and worker-scoped resources.",
        "Choose fixtures for reusable dependencies.",
      ],
      sections: [
        {
          title: "Create a typed dependency",
          paragraphs: [
            "This fixture provides a prepared notes textbox. Each requesting test receives it through the test function's parameters.",
            "The example stays in one file for practice. Shared fixtures can later live in a module that exports the extended test function.",
          ],
          example: {
            title: "Provide an editable notes field",
            filename: "tests/fixtures.spec.ts",
            code: `import { test as base, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

type Fixtures = {
  notes: Locator;
};

const test = base.extend<Fixtures>({
  notes: async ({ page }, use) => {
    await page.setContent(
      '<label for="notes">Order notes</label>' +
      '<textarea id="notes"></textarea>'
    );

    const notes = page.getByRole("textbox", { name: "Order notes" });

    await use(notes);
  },
});

test("notes start empty", async ({ notes }) => {
  await expect(notes).toHaveValue("");
});

test("accepts delivery instructions", async ({ notes }) => {
  await notes.fill("Leave at reception");

  await expect(notes).toHaveValue("Leave at reception");
});`,
            command: "npx playwright test tests/fixtures.spec.ts",
            expected:
              "Both tests pass. The text entered in one test does not become another test's starting state.",
            explanation:
              "The fixture depends on the isolated page fixture and prepares its own interface for each test.",
          },
        },
        {
          title: "Setup, use, and cleanup",
          paragraphs: [
            "Code before await use prepares the resource. Code after it performs teardown.",
            "For a fixture that creates a remote record, place deletion in a finally block around await use. Make cleanup failures diagnosable.",
            "The built-in page fixture handles its page lifecycle. The notes fixture does not need to close that page itself.",
          ],
          bullets: [
            "Create only the resources the test needs.",
            "Track identifiers for records that require cleanup.",
            "Avoid cleanup that deletes another test's data.",
            "Keep setup errors visible rather than continuing with incomplete prerequisites.",
          ],
        },
        {
          title: "Choose the correct scope",
          paragraphs: [
            "Test-scoped fixtures are prepared separately for each test that requests them. Worker-scoped fixtures are shared within a worker process.",
            "A worker-scoped fixture cannot depend on a test-scoped page. Their lifetimes are different.",
            "Use worker scope for deliberately shared resources, not simply to make all setup faster. Shared mutable data can make tests interfere with each other.",
          ],
        },
      ],
      mistakes: [
        "Importing the base test instead of the extended test in a consuming file.",
        "Sharing mutable test data without considering parallel execution.",
        "Creating resources without an ownership and cleanup strategy.",
        "Using worker scope for a resource that depends on a test-scoped page.",
      ],
      exercise: {
        title: "Add another independent notes check",
        tasks: [
          "Append the test below to the fixture example.",
          "Run the entire file.",
          "Run only this test using --grep 'clears notes'.",
          "Confirm it succeeds without another test running first.",
        ],
        solution: {
          title: "Reuse the notes fixture",
          filename: "tests/fixtures.spec.ts — append",
          code: `test("clears notes", async ({ notes }) => {
  await notes.fill("Call before delivery");
  await notes.clear();

  await expect(notes).toHaveValue("");
});`,
          command:
            "npx playwright test tests/fixtures.spec.ts --grep 'clears notes'",
          expected:
            "The selected test receives its own prepared notes field and passes independently.",
          explanation:
            "The fixture supplies prerequisites directly; no earlier test needs to initialize them.",
        },
      },
      takeaway:
        "Fixtures make dependencies and lifetimes explicit. Choose scope based on isolation requirements and give created resources a cleanup strategy.",
    },
  },
  {
    number: 15,
    slug: "authentication",
    title: "Authentication and Storage State",
    description:
      "Understand reusable browser state, its security implications, and its limits.",
    content: {
      introduction:
        "Repeated login can slow a suite. Reusing browser storage can reduce setup work, but copied browser state does not guarantee a valid server session.",
      objectives: [
        "Capture and restore browser storage state.",
        "Distinguish browser isolation from account isolation.",
        "Recognize which storage needs special handling.",
        "Protect saved authentication artifacts.",
      ],
      sections: [
        {
          title: "What storage state contains",
          paragraphs: [
            "Storage state includes cookies and local storage. IndexedDB can be included with the indexedDB option; session storage needs separate handling.",
            "A stored session may expire or be revoked. Restoring it does not bypass server-side authentication.",
          ],
        },
        {
          title: "Practice the storage mechanism",
          paragraphs: [
            "This runnable example uses an intercepted page and a harmless preference cookie. It demonstrates storage restoration, not a real login.",
            "Routing supplies the practice HTML without a live server.",
          ],
          example: {
            title: "Restore state into another context",
            filename: "tests/storage-state.spec.ts",
            code: `import { test, expect } from "@playwright/test";
import type { BrowserContext } from "@playwright/test";

async function openPracticePage(context: BrowserContext) {
  await context.route("https://practice.example/**", async (route) => {
    await route.fulfill({
      contentType: "text/html",
      body: "<h1>Storage practice</h1>",
    });
  });

  const page = await context.newPage();
  await page.goto("https://practice.example/");
  return page;
}

test("restores a preference cookie", async ({ browser }) => {
  const original = await browser.newContext();

  try {
    await original.addCookies([
      {
        name: "theme",
        value: "cream",
        url: "https://practice.example/",
      },
    ]);

    const state = await original.storageState();

    const restored = await browser.newContext({
      storageState: state,
    });

    try {
      const page = await openPracticePage(restored);

      await expect(page.getByRole("heading"))
        .toHaveText("Storage practice");

      const cookies = await restored.cookies(
        "https://practice.example/"
      );

      expect(
        cookies.find((cookie) => cookie.name === "theme")?.value
      ).toBe("cream");
    } finally {
      await restored.close();
    }
  } finally {
    await original.close();
  }
});`,
            command: "npx playwright test tests/storage-state.spec.ts",
            expected:
              "A new context receives the saved cookie. Both manually created contexts are closed.",
            explanation:
              "The assertion checks a restored preference, not authentication or authorization.",
          },
        },
        {
          title: "Apply this to a real application",
          paragraphs: [
            "Authenticate in a setup project, verify a protected outcome, then save state for dependent projects.",
            "Keep state files out of version control. They may contain credentials capable of impersonating the account.",
            "Separate browser contexts can still share one account's server data. Use separate accounts or isolated records when tests modify shared resources.",
          ],
        },
      ],
      mistakes: [
        "Treating a saved cookie as proof of a successful login.",
        "Committing authentication state.",
        "Reusing expired state indefinitely.",
        "Assuming separate browser contexts isolate server-side account data.",
      ],
      exercise: {
        title: "Confirm a fresh context has no copied state",
        tasks: [
          "Append this test to the same file.",
          "Run both tests.",
          "Compare a fresh context with the restored context.",
        ],
        solution: {
          title: "Check the isolated starting state",
          filename: "tests/storage-state.spec.ts — append",
          code: `test("fresh context has no preference cookie", async ({ browser }) => {
  const fresh = await browser.newContext();

  try {
    await openPracticePage(fresh);

    const cookies = await fresh.cookies(
      "https://practice.example/"
    );

    expect(
      cookies.find((cookie) => cookie.name === "theme")
    ).toBeUndefined();
  } finally {
    await fresh.close();
  }
});`,
          command: "npx playwright test tests/storage-state.spec.ts",
          expected:
            "The restored context has the preference; the fresh context does not.",
          explanation:
            "State restoration is explicit. The previous test does not supply this test's browser state.",
        },
      },
      takeaway:
        "Reuse authentication state deliberately, protect it, and verify the real session. Browser isolation does not imply account-data isolation.",
    },
  },
  {
    number: 16,
    slug: "api-testing",
    title: "API Testing with Playwright",
    description:
      "Check HTTP responses, runtime data contracts, and business values using Playwright.",
    content: {
      introduction:
        "API checks exercise an HTTP interface directly. They can validate service behavior and prepare data for browser tests without repeating every setup action through the UI.",
      objectives: [
        "Send HTTP requests with the request fixture.",
        "Check status, headers, and response values.",
        "Validate unknown JSON before using it.",
        "Understand the difference between a practice service and a production API.",
      ],
      sections: [
        {
          title: "Check more than a successful status",
          paragraphs: [
            "A 200 response does not establish that its content is correct. Check the relevant response contract and the business values required by the scenario.",
            "TypeScript types disappear at runtime. Casting a response to Product does not validate the JSON returned by a service.",
          ],
          bullets: [
            "Check the exact expected status when it matters.",
            "Check relevant headers and body fields.",
            "Include invalid input and permission scenarios.",
            "Keep expected values independent of the implementation being tested.",
          ],
        },
        {
          title: "Run a self-contained API example",
          paragraphs: [
            "This example starts a small local HTTP service on an available port. No external account or running application is required.",
            "The service returns fixed practice data. Passing this test demonstrates the request and validation techniques, not the correctness of a real product service.",
            "The Node types installed during project setup are required for the HTTP server imports.",
          ],
          example: {
            title: "Validate a product response",
            filename: "tests/api.spec.ts",
            code: `import { test, expect } from "@playwright/test";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

type Product = {
  id: string;
  name: string;
  priceCents: number;
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.priceCents === "number" &&
    Number.isInteger(item.priceCents) &&
    item.priceCents >= 0
  );
}

test("returns a valid product", async ({ request }) => {
  const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.url === "/products/p1") {
      res.writeHead(200);
      res.end(JSON.stringify({
        id: "p1",
        name: "Keyboard",
        priceCents: 2500,
      }));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });

  try {
    const address = server.address() as AddressInfo;
    const baseURL = "http://127.0.0.1:" + address.port;

    const response = await request.get(baseURL + "/products/p1");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"])
      .toContain("application/json");

    const body: unknown = await response.json();

    if (!isProduct(body)) {
      throw new Error("Response does not match the product contract");
    }

    expect(body.id).toBe("p1");
    expect(body.name).toBe("Keyboard");
    expect(body.priceCents).toBe(2500);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});`,
            command: "npx playwright test tests/api.spec.ts",
            expected:
              "The test validates the HTTP response and product values, then closes the practice server.",
            explanation:
              "The runtime guard validates the data shape. Separate assertions check the specific product expected by this scenario.",
          },
        },
        {
          title: "Use APIs to support browser workflows",
          paragraphs: [
            "For a real application, an API can create a customer or order before a browser test verifies the relevant screen.",
            "Track created identifiers and clean up records owned by the test. Avoid deleting shared data.",
            "The built-in request fixture has its own cookie storage. page.request shares the browser context's cookie storage.",
          ],
        },
      ],
      mistakes: [
        "Checking only response.ok().",
        "Assuming a TypeScript cast validates JSON.",
        "Using production records as disposable test data.",
        "Checking an error message without checking the HTTP status.",
        "Treating a fixed practice response as real service coverage.",
      ],
      exercise: {
        title: "Check a missing product",
        tasks: [
          "Keep the existing successful response assertions.",
          "Insert the code below inside the try block, after those assertions.",
          "Run the test and verify both response paths.",
        ],
        solution: {
          title: "Validate the not-found response",
          filename: "tests/api.spec.ts — inside the try block",
          code: `const missing = await request.get(baseURL + "/products/missing");

expect(missing.status()).toBe(404);
expect(await missing.json()).toEqual({
  error: "Not found",
});`,
          command: "npx playwright test tests/api.spec.ts",
          expected:
            "The known product returns 200, and the unknown product returns the expected 404 body.",
          explanation:
            "Positive and negative checks establish different parts of the API contract.",
        },
      },
      takeaway:
        "Validate status, runtime structure, and meaningful values. Use APIs for focused coverage and controlled setup without confusing simulated behavior with real integration.",
    },
  },
  {
    number: 17,
    slug: "network-mocking",
    title: "Network Inspection and Mocking",
    description:
      "Observe browser requests and control dependency responses for focused UI checks.",
    content: {
      introduction:
        "Network interception helps you exercise UI states that are difficult to reproduce reliably. It also changes the scope of what a test establishes.",
      objectives: [
        "Register routes before triggering requests.",
        "Provide controlled HTTP responses.",
        "Observe a response without replacing it.",
        "Distinguish mocked UI checks from integration checks.",
      ],
      sections: [
        {
          title: "Observe or replace?",
          paragraphs: [
            "waitForResponse observes a matching response. route can fulfill, modify, continue, or abort an intercepted request.",
            "Register the listener or route before the action that triggers the request.",
            "Replacing a backend response lets you check the UI's reaction, but it does not validate the real backend.",
          ],
        },
        {
          title: "Control a service-unavailable response",
          paragraphs: [
            "This example intercepts both a practice HTML page and its product endpoint. It runs without an external server.",
            "The browser executes a real fetch, while the test supplies the response.",
          ],
          example: {
            title: "Show an error when products cannot load",
            filename: "tests/network.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("shows a product service error", async ({ page }) => {
  await page.route("https://shop.example/", async (route) => {
    await route.fulfill({
      contentType: "text/html",
      body:
        '<button id="load">Load products</button>' +
        '<p role="status">Ready</p>' +
        '<script>' +
        'document.getElementById("load").onclick = async () => {' +
        '  const status = document.querySelector("[role=status]");' +
        '  try {' +
        '    const response = await fetch("/api/products");' +
        '    if (!response.ok) throw new Error("Service unavailable");' +
        '    const data = await response.json();' +
        '    status.textContent = data.items.length + " products";' +
        '  } catch {' +
        '    status.textContent = "Products unavailable";' +
        '  }' +
        '};' +
        '</script>',
    });
  });

  await page.route("https://shop.example/api/products", async (route) => {
    await route.fulfill({
      status: 503,
      json: { error: "Service unavailable" },
    });
  });

  await page.goto("https://shop.example/");

  const responsePromise = page.waitForResponse((response) =>
    response.url() === "https://shop.example/api/products" &&
    response.request().method() === "GET"
  );

  await page.getByRole("button", { name: "Load products" }).click();

  const response = await responsePromise;

  expect(response.status()).toBe(503);
  await expect(page.getByRole("status"))
    .toHaveText("Products unavailable");
});`,
            command: "npx playwright test tests/network.spec.ts",
            expected:
              "The browser receives the controlled 503 response and displays the error message.",
            explanation:
              "The response assertion confirms the exercised HTTP condition. The UI assertion checks its visible consequence.",
          },
        },
        {
          title: "Choose realistic scenarios",
          paragraphs: [
            "Useful controlled scenarios include empty results, permission errors, slow dependencies, and malformed responses.",
            "An HTTP error response and a network failure are different. route.abort simulates a request failure rather than an HTTP 500 response.",
            "Keep some checks against real dependencies to detect contract and integration problems that mocked tests cannot reveal.",
          ],
          bullets: [
            "Match the intended endpoint precisely.",
            "Keep mocked payloads aligned with the documented contract.",
            "Avoid replacing unrelated requests.",
            "If a service worker handles a request, investigate whether it prevents the expected interception.",
          ],
        },
      ],
      mistakes: [
        "Installing the route after clicking the button.",
        "Waiting for any response instead of the intended endpoint.",
        "Mocking every dependency and calling the suite complete integration coverage.",
        "Returning an unrealistic payload just to make the UI pass.",
      ],
      exercise: {
        title: "Check the empty-results state",
        tasks: [
          "Duplicate the example into tests/network-empty.spec.ts.",
          "Rename the test to 'shows an empty product result'.",
          "Replace the API route with the response below.",
          "Change the response assertion to 200.",
          "Change the UI expectation to '0 products'.",
        ],
        solution: {
          title: "Return an empty product list",
          filename: "tests/network-empty.spec.ts — replacement API route",
          code: `await page.route("https://shop.example/api/products", async (route) => {
  await route.fulfill({
    status: 200,
    json: { items: [] },
  });
});

// Later in the test:
expect(response.status()).toBe(200);
await expect(page.getByRole("status")).toHaveText("0 products");`,
          command: "npx playwright test tests/network-empty.spec.ts",
          expected:
            "An empty successful response produces the empty-result message instead of an error.",
          explanation:
            "No data and failed loading are different states and should have distinct expectations.",
        },
      },
      takeaway:
        "Use interception to control specific conditions and observe meaningful UI behavior. Preserve separate coverage of real service integration.",
    },
  },
  {
    number: 18,
    slug: "parameterization-and-data",
    title: "Parameterization and Isolated Data",
    description:
      "Select meaningful data cases and keep each execution independent.",
    content: {
      introduction:
        "Parameterization runs the same behavior with different inputs. Its value comes from the cases you choose, not the size of the input list.",
      objectives: [
        "Declare typed test cases.",
        "Generate separately reported tests.",
        "Choose boundary and equivalence cases.",
        "Create unique identifiers for mutable test data.",
      ],
      sections: [
        {
          title: "Start with a rule",
          paragraphs: [
            "For a quantity field accepting whole numbers from 1 through 5, useful cases include the minimum, maximum, values outside those limits, and a fractional value.",
            "The expected result should come from the requirement. Avoid calculating it with the same algorithm used by the application.",
            "This exercise tests browser-native input constraints. It does not prove that a backend enforces the same rule.",
          ],
          example: {
            title: "Check quantity boundaries",
            filename: "tests/data-cases.spec.ts",
            code: `import { test, expect } from "@playwright/test";

type QuantityCase = {
  name: string;
  input: string;
  valid: boolean;
};

const cases: QuantityCase[] = [
  { name: "minimum", input: "1", valid: true },
  { name: "maximum", input: "5", valid: true },
  { name: "below minimum", input: "0", valid: false },
  { name: "above maximum", input: "6", valid: false },
  { name: "fraction", input: "1.5", valid: false },
];

for (const scenario of cases) {
  test("quantity: " + scenario.name, async ({ page }) => {
    await page.setContent(
      '<label for="quantity">Quantity</label>' +
      '<input id="quantity" type="number" min="1" max="5" step="1" required>'
    );

    const quantity = page.getByRole("spinbutton", { name: "Quantity" });

    await quantity.fill(scenario.input);

    await expect(quantity).toHaveValue(scenario.input);

    const valid = await quantity.evaluate(
      (element: HTMLInputElement) => element.validity.valid
    );

    expect(valid).toBe(scenario.valid);
  });
}`,
            command: "npx playwright test tests/data-cases.spec.ts",
            expected:
              "Five independently reported tests verify the selected quantity boundaries.",
            explanation:
              "Each test owns its input and expected validity, which makes failures easy to identify.",
          },
        },
        {
          title: "Separate case data from resource ownership",
          paragraphs: [
            "Static case data can be shared when it is not mutated. Created accounts, carts, and orders need an isolation strategy.",
            "Use unique record identifiers when tests create resources. Save returned identifiers for assertions and cleanup.",
            "A unique email address alone does not prevent collisions on shared inventory or a shared account's cart.",
          ],
          bullets: [
            "Generate identifiers inside the test or its fixture.",
            "Keep input values reproducible when they affect business behavior.",
            "Use randomness for identity only when the exact value is irrelevant.",
            "Clean up only records created by the current test.",
          ],
        },
        {
          title: "Make failures readable",
          paragraphs: [
            "Give every generated test a distinct name that identifies the scenario.",
            "Avoid one long test that loops over all cases. An early failure can prevent later cases from running and make reporting less useful.",
            "Do not mutate shared case objects as tests execute.",
          ],
        },
      ],
      mistakes: [
        "Adding many similar values while missing boundaries.",
        "Generating duplicate test titles.",
        "Using random business inputs without recording how to reproduce them.",
        "Sharing the same mutable order across parameterized tests.",
      ],
      exercise: {
        title: "Add the required-field boundary",
        tasks: [
          "Add the case below to the cases array.",
          "Run the file again.",
          "Confirm the empty input is invalid because the field is required.",
        ],
        solution: {
          title: "Include a missing value",
          filename: "tests/data-cases.spec.ts — add inside cases",
          code: `{ name: "missing quantity", input: "", valid: false },`,
          command: "npx playwright test tests/data-cases.spec.ts",
          expected:
            "Six tests run per configured project, including the required-field case.",
          explanation:
            "An omitted value is a separate input category from an out-of-range number.",
        },
      },
      takeaway:
        "Choose data from rules and risks. Report cases independently and isolate the mutable resources each execution owns.",
    },
  },
  {
    number: 19,
    slug: "parallelism-and-sharding",
    title: "Parallelism and Sharding",
    description:
      "Run independent tests concurrently and divide execution across jobs.",
    content: {
      introduction:
        "Concurrency can shorten feedback time, but it also exposes hidden dependencies. Establish test independence before increasing execution capacity.",
      objectives: [
        "Distinguish workers from shards.",
        "Enable parallel tests within a file.",
        "Recognize collisions outside the browser.",
        "Compare serial and concurrent execution.",
      ],
      sections: [
        {
          title: "Workers and shards",
          paragraphs: [
            "Workers are processes running tests within a Playwright invocation. Sharding divides a suite across separate invocations, often on different CI machines.",
            "By default, test files can run in parallel while tests inside a file run in order. Parallel mode enables concurrent execution within a file.",
            "With fullyParallel enabled, sharding can distribute individual tests more evenly instead of relying on file-level groups.",
          ],
        },
        {
          title: "Run independent tests concurrently",
          paragraphs: [
            "These tests use separate browser pages and create a unique reference inside each execution.",
            "The UUID illustrates data ownership. A real application must also isolate any shared records or accounts that the workflow changes.",
          ],
          example: {
            title: "Parallel reference checks",
            filename: "tests/parallel.spec.ts",
            code: `import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";

test.describe("Independent references", () => {
  test.describe.configure({ mode: "parallel" });

  for (const label of ["A", "B", "C", "D"]) {
    test("reference " + label, async ({ page }) => {
      const reference = "order-" + randomUUID();

      await page.setContent(
        '<label for="reference">Order reference</label>' +
        '<input id="reference">'
      );

      const input = page.getByRole("textbox", {
        name: "Order reference",
      });

      await input.fill(reference);

      await expect(input).toHaveValue(reference);
    });
  }
});`,
            command: "npx playwright test tests/parallel.spec.ts --workers=2",
            expected:
              "Four tests pass using up to two workers. Their completion order is not guaranteed.",
            explanation:
              "The tests do not depend on one another's browser state or generated identifiers.",
          },
        },
        {
          title: "Identify shared resources",
          paragraphs: [
            "Separate browser contexts do not isolate a shared database row, filesystem path, or account.",
            "Use test-specific output paths for files and isolated records for server mutations.",
            "Worker indexes alone are not globally unique across machines. Include a run or shard identifier when building a distributed naming scheme.",
          ],
          bullets: [
            "Avoid shared carts and shared mutable users.",
            "Do not assume beforeAll runs only once across the suite.",
            "Watch for rate limits and environment capacity.",
            "Investigate failures that appear only with multiple workers.",
          ],
        },
        {
          title: "Split the suite",
          paragraphs: [
            "Use --shard=1/2 and --shard=2/2 to select complementary portions of the same suite.",
            "Both invocations must use the same code, configuration, and test selection.",
            "Running the shard commands sequentially demonstrates selection. CI jobs can run them concurrently for a speed benefit.",
          ],
        },
      ],
      mistakes: [
        "Increasing workers before removing shared-state dependencies.",
        "Assuming sharding fixes a slow or unreliable environment.",
        "Using the same artifact filename for every test.",
        "Running different revisions in different shards.",
      ],
      exercise: {
        title: "Compare one worker, two workers, and two shards",
        tasks: [
          "Run the example with one worker.",
          "Run it with two workers.",
          "Run both shard commands below.",
          "Confirm the combined shards cover the four tests once per project.",
        ],
        solution: {
          title: "Select execution capacity and shards",
          filename: "Terminal — automation practice project",
          code: `npx playwright test tests/parallel.spec.ts --workers=1
npx playwright test tests/parallel.spec.ts --workers=2
npx playwright test tests/parallel.spec.ts --fully-parallel --shard=1/2
npx playwright test tests/parallel.spec.ts --fully-parallel --shard=2/2`,
          command: "npx playwright test tests/parallel.spec.ts --workers=2",
          expected:
            "All execution modes preserve the same test outcomes. Each shard runs its assigned subset.",
          explanation:
            "Concurrency should change execution scheduling, not the correctness of the tests.",
        },
      },
      takeaway:
        "Scale independent tests with workers and shards. Account for shared resources, environment capacity, and distributed identifiers.",
    },
  },
  {
    number: 20,
    slug: "debugging-and-traces",
    title: "Debugging and Traces",
    description:
      "Investigate failures using error details, interactive debugging, and execution traces.",
    content: {
      introduction:
        "A failed assertion is evidence to investigate. Find the earliest point where actual behavior diverges from the expected workflow before changing the test.",
      objectives: [
        "Read the failed action and locator details.",
        "Use the inspector for interactive investigation.",
        "Record and inspect a trace.",
        "Distinguish application, test, data, and environment problems.",
      ],
      sections: [
        {
          title: "Start with the failure",
          paragraphs: [
            "Read the assertion message, expected value, actual value, and call log.",
            "Check whether the intended element exists, whether the prerequisite action succeeded, and whether the expected outcome matches the requirement.",
            "A timeout is a symptom. It may indicate a missing element, blocked action, incorrect expectation, slow dependency, or failed setup.",
          ],
        },
        {
          title: "Capture a small workflow",
          paragraphs: [
            "The example below passes initially. Record a trace so you can inspect its actions and snapshots.",
            "The practice page changes its status synchronously after the button is clicked.",
          ],
          example: {
            title: "Trace a save interaction",
            filename: "tests/debugging.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("shows save confirmation", async ({ page }) => {
  await page.setContent(
    '<button onclick="document.querySelector(\\'p\\').textContent=\\'Saved\\'">' +
    'Save</button>' +
    '<p role="status">Not saved</p>'
  );

  await test.step("Save the changes", async () => {
    await page.getByRole("button", { name: "Save", exact: true }).click();
  });

  await test.step("Check the confirmation", async () => {
    await expect(page.getByRole("status")).toHaveText("Saved");
  });
});`,
            command:
              "npx playwright test tests/debugging.spec.ts --trace on --reporter=html",
            expected:
              "The test passes and the HTML report includes its recorded trace.",
            explanation:
              "The named steps provide useful boundaries when reviewing the execution.",
          },
        },
        {
          title: "Choose the investigation tool",
          paragraphs: [
            "Use --debug to step through a local run with the inspector. Debug mode changes execution conditions, so a debug pass does not establish that a timing issue is fixed.",
            "Use --ui for interactive test exploration.",
            "Use the HTML report to open a recorded trace. Inspect actions, DOM snapshots, logs, and relevant network activity.",
            "A trace records one execution. Compare evidence before concluding whether the application or the automation is responsible.",
          ],
          bullets: [
            "Application: the correct action produces the wrong business result.",
            "Test: the locator or expectation does not match the intended contract.",
            "Data: required records are missing or were changed by another test.",
            "Environment: a dependency is unavailable or incorrectly configured.",
          ],
        },
        {
          title: "Choose trace retention deliberately",
          paragraphs: [
            "Use --trace on for a targeted investigation. Recording everything continuously can create unnecessary overhead and large artifacts.",
            "retain-on-failure preserves traces for failed tests. on-first-retry records the retry attempt and requires retries to occur.",
            "Traces may contain sensitive page and network data. Control access and retention when collecting them from real environments.",
          ],
        },
      ],
      mistakes: [
        "Adding a fixed sleep before understanding the failure.",
        "Changing an expectation solely to match the current output.",
        "Assuming an inspector pass proves normal execution is reliable.",
        "Looking only at the last screenshot when the problem began earlier.",
        "Enabling on-first-retry while configuring zero retries.",
      ],
      exercise: {
        title: "Investigate a deliberate expectation mismatch",
        tasks: [
          "Temporarily change the expected text from 'Saved' to 'Published'.",
          "Run with tracing and confirm the assertion fails.",
          "Open the report and inspect the failed assertion's trace.",
          "Confirm the click changed the status to 'Saved'.",
          "Restore the expected text to 'Saved' and rerun the test.",
        ],
        solution: {
          title: "Record and inspect the failed attempt",
          filename: "Terminal — automation practice project",
          code: `npx playwright test tests/debugging.spec.ts --trace on --reporter=html
npx playwright show-report`,
          command:
            "npx playwright test tests/debugging.spec.ts --trace on --reporter=html",
          expected:
            "The deliberate mismatch fails. After restoring the correct expectation, the test passes.",
          explanation:
            "In this controlled exercise the expectation was changed intentionally. Real failures require checking the product requirement before changing assertions.",
        },
      },
      takeaway:
        "Use execution evidence to identify the cause of a failure. Fix the cause and rerun under normal conditions instead of masking the symptom.",
    },
  },
  {
    number: 21,
    slug: "reporting",
    title: "Reports and Failure Evidence",
    description:
      "Produce readable execution reports and attach evidence that helps explain results.",
    content: {
      introduction:
        "A useful report helps someone understand what was checked, what failed, and what evidence is available. A pass percentage alone cannot explain product risk.",
      objectives: [
        "Configure terminal, HTML, and JUnit reporters.",
        "Attach relevant diagnostic information.",
        "Distinguish failures, retries, and skipped coverage.",
        "Write a concise execution summary.",
      ],
      sections: [
        {
          title: "Choose reports for their audience",
          paragraphs: [
            "Terminal output supports immediate feedback. HTML supports investigation. JUnit XML can feed tools that ingest test results.",
            "Use the separate configuration below for this lesson and the CI lesson. It runs Chromium only.",
            "In the practice project's tsconfig.json, use an include array containing playwright*.config.ts and tests/**/*.ts so all practice configuration files are type-checked.",
          ],
          example: {
            title: "Configure reports and failure evidence",
            filename: "playwright.reporting.config.ts",
            code: `import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  globalTimeout: 10 * 60 * 1000,
  outputDir: "test-results",
  reporter: [
    ["list"],
    ["html", {
      outputFolder: "playwright-report",
      open: "never",
    }],
    ["junit", {
      outputFile: "reports/results.xml",
    }],
  ],
  use: {
    browserName: "chromium",
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});`,
            command:
              "npx playwright test --config=playwright.reporting.config.ts",
            expected:
              "The run produces terminal output, an HTML report, and JUnit XML. Failed browser tests retain configured evidence.",
            explanation:
              "Each reporter serves a different consumer. Report generation does not change the assertions being executed.",
          },
        },
        {
          title: "Attach focused context",
          paragraphs: [
            "Attach information that helps explain the scenario, such as a record identifier or sanitized response summary.",
            "Avoid attaching credentials, authentication state, or unnecessary personal data.",
            "Place useful context before an assertion when you want it available even if that assertion fails.",
          ],
          example: {
            title: "Attach a checked business value",
            filename: "tests/reporting.spec.ts",
            code: `import { test, expect } from "@playwright/test";

test("shows the expected total", async ({ page }, testInfo) => {
  await page.setContent(
    '<p data-testid="order-total">Total: $25.00</p>'
  );

  const total = page.getByTestId("order-total");

  await testInfo.attach("scenario-context", {
    body: Buffer.from(JSON.stringify({
      scenario: "single-keyboard-total",
      expectedTotalCents: 2500,
      displayedText: await total.textContent(),
    }, null, 2)),
    contentType: "application/json",
  });

  await expect(total).toHaveText("Total: $25.00");
});`,
            command:
              "npx playwright test tests/reporting.spec.ts --config=playwright.reporting.config.ts",
            expected:
              "The test passes and its HTML report includes the JSON attachment.",
            explanation:
              "The attachment provides context. The assertion remains responsible for deciding whether the result is correct.",
          },
        },
        {
          title: "Communicate the result accurately",
          paragraphs: [
            "Report failed and skipped scenarios alongside passes. If retries are enabled, identify tests that passed only after retrying.",
            "Summarize affected capabilities, the execution environment, and known coverage gaps.",
            "A screenshot can show a symptom. A trace and relevant request details can help explain how the test reached that state.",
          ],
          bullets: [
            "State the revision and environment tested.",
            "Describe failures using observable behavior.",
            "Link to evidence and tracked defects.",
            "Explain blocked or unexecuted coverage.",
            "Avoid interpreting a green suite as proof of complete product quality.",
          ],
        },
      ],
      mistakes: [
        "Reporting only a pass percentage.",
        "Uploading sensitive request bodies without review.",
        "Treating attachments as a replacement for assertions.",
        "Ignoring skipped or retry-dependent tests.",
      ],
      exercise: {
        title: "Inspect a controlled failure",
        tasks: [
          "Run the reporting example and open its HTML report.",
          "Temporarily change the expected text to 'Total: $30.00'.",
          "Run again and inspect the attachment, screenshot, and trace.",
          "Restore the expected text to 'Total: $25.00'.",
        ],
        solution: {
          title: "Open the report",
          filename: "Terminal — automation practice project",
          code: `npx playwright test tests/reporting.spec.ts --config=playwright.reporting.config.ts
npx playwright show-report playwright-report`,
          command: "npx playwright show-report playwright-report",
          expected:
            "The deliberately failing run contains the mismatch and configured failure evidence. Restoring the expectation makes the test pass.",
          explanation:
            "The exercise connects a reported result to the evidence needed to investigate it.",
        },
      },
      takeaway:
        "Make results understandable and actionable. Preserve relevant evidence and communicate uncertainty alongside test outcomes.",
    },
  },
  {
    number: 22,
    slug: "ci-execution",
    title: "CI Execution",
    description:
      "Run Playwright in GitHub Actions and Docker with repeatable setup and retained evidence.",
    content: {
      introduction:
        "Continuous integration runs checks when code changes. A dependable pipeline prepares the environment, checks TypeScript, executes tests, and preserves useful results. Docker can package the runtime used locally and in CI.",
      objectives: [
        "Run Playwright checks in GitHub Actions.",
        "Install dependencies from a committed lockfile.",
        "Check TypeScript separately from browser execution.",
        "Retain reports when tests fail.",
        "Build and run a Docker image for automation.",
        "Preserve container-generated reports on the host.",
        "Understand container networking and version alignment.",
      ],
      sections: [
        {
          title: "Prepare the automation repository",
          paragraphs: [
            "All executable examples in this lesson belong in the separate Playwright practice project, not the SDET Learning Hub application.",
            "Commit package.json and package-lock.json. npm ci installs locked dependencies and fails when the manifest and lockfile disagree.",
            "Create playwright.reporting.config.ts from lesson 21 before continuing. It configures Chromium, HTML and JUnit reports, and failure evidence.",
            "Restore any deliberately failing assertions from earlier exercises before running the entire suite.",
          ],
          bullets: [
            "Keep node_modules and generated reports out of version control.",
            "Keep credentials and saved authentication state out of version control.",
            "Use a Node version compatible with your dependencies.",
            "Confirm the tests pass locally before investigating CI-specific differences.",
          ],
        },
        {
          title: "Include configuration files in type checking",
          paragraphs: [
            "Playwright can execute TypeScript without performing a complete type check. Run tsc separately to catch type errors.",
            "In the practice project's tsconfig.json, replace the existing include property with the following value. Keep the other compiler settings.",
          ],
          example: {
            title: "Check all practice configurations",
            filename: "tsconfig.json — include property",
            code: `"include": [
  "playwright*.config.ts",
  "tests/**/*.ts"
]`,
            command: "npx tsc --noEmit",
            expected:
              "TypeScript checks the test files, support modules, and all matching Playwright configuration files.",
            explanation:
              "The wildcard includes playwright.config.ts and playwright.reporting.config.ts.",
          },
        },
        {
          title: "Run directly on a GitHub Actions runner",
          paragraphs: [
            "This first approach installs Node, project dependencies, Chromium, and browser system dependencies on the runner.",
            "Save the workflow below in the automation repository. It assumes package.json is at the repository root.",
            "The artifact upload is attempted after a failed step unless the job has been cancelled. Uploading evidence does not change a failed test run into a successful job.",
          ],
          example: {
            title: "Create the runner-based workflow",
            filename: ".github/workflows/playwright.yml",
            code: `name: Playwright checks

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
    timeout-minutes: 20

    steps:
      - name: Check out source
        uses: actions/checkout@v6

      - name: Set up Node
        uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Check TypeScript
        run: npx tsc --noEmit

      - name: Install Chromium and system dependencies
        run: npx playwright install --with-deps chromium

      - name: Run tests
        run: npx playwright test --config=playwright.reporting.config.ts

      - name: Upload execution evidence
        if: \${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: playwright-evidence
          path: |
            playwright-report/
            test-results/
            reports/
          retention-days: 7
          if-no-files-found: warn`,
            command:
              "npx playwright test --config=playwright.reporting.config.ts",
            expected:
              "A matching GitHub event starts the job. The runner installs dependencies, checks types, runs tests, and uploads available reports.",
            explanation:
              "The command runs the suite locally. The actual workflow runs after it is committed to a GitHub repository with Actions enabled.",
          },
        },
        {
          title: "Why use Docker?",
          paragraphs: [
            "A Docker image packages the operating-system environment used by the tests. A container is a running instance of that image.",
            "The official Playwright image includes browser binaries and their Linux system dependencies. Your project's npm packages still need to be installed.",
            "Docker standardizes the runtime. It does not automatically isolate remote accounts, database records, or other shared application resources.",
          ],
          bullets: [
            "Dockerfile describes how to build the image.",
            "docker build creates the image.",
            "docker run starts a container and executes its command.",
            "Mounted output folders preserve reports after the container exits.",
          ],
        },
        {
          title: "Align the Playwright package and Docker image",
          paragraphs: [
            "Install and start Docker Desktop before trying the local Docker examples.",
            "These examples use Playwright 1.64.1 for both the npm package and the image tag.",
            "If you choose a different release, update both versions together. A mismatch can leave Playwright unable to locate its expected browser binaries.",
            "Commit the updated package.json and package-lock.json after changing the dependency.",
          ],
          example: {
            title: "Prepare matching versions",
            filename: "Terminal — automation practice project",
            code: `npm install --save-dev --save-exact @playwright/test@1.64.1
npm ls @playwright/test
docker version`,
            command: "npm ls @playwright/test",
            expected:
              "The project reports @playwright/test version 1.64.1. docker version confirms that the Docker engine is reachable.",
            explanation:
              "Pinning the package and image together makes the browser runtime choice explicit.",
          },
        },
        {
          title: "Control the Docker build context",
          paragraphs: [
            "Docker sends a build context to its builder. Use .dockerignore to exclude local dependencies, generated evidence, and sensitive local configuration.",
            "Install dependencies inside the image instead of copying node_modules from your laptop.",
            "The example assumes public npm dependencies. Private registry credentials require a separate build-secret setup.",
          ],
          example: {
            title: "Exclude unnecessary files",
            filename: ".dockerignore",
            code: `node_modules
playwright-report
test-results
reports
blob-report
.git
.env
.env.*
.npmrc
playwright/.auth
.auth
npm-debug.log
`,
            command: "docker build -t sdet-playwright .",
            expected:
              "After creating the Dockerfile in the next section, Docker excludes these paths from the build context.",
            explanation:
              "Review other project-specific secret files before building. The ignore file only excludes the patterns listed.",
          },
        },
        {
          title: "Build the automation image",
          paragraphs: [
            "Save this Dockerfile at the root of the automation practice project.",
            "Copying package manifests before source files allows Docker to reuse the dependency layer when only test code changes.",
            "The image build checks TypeScript. Its default startup command executes the suite with the reporting configuration from lesson 21.",
            "This image is intended for trusted application tests and development, not production application hosting.",
          ],
          example: {
            title: "Create the Dockerfile",
            filename: "Dockerfile",
            code: `FROM mcr.microsoft.com/playwright:v1.64.1-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx tsc --noEmit

ENV CI=true

CMD ["npx", "playwright", "test", "--config=playwright.reporting.config.ts"]
`,
            command: "docker build -t sdet-playwright .",
            expected:
              "Docker installs locked dependencies, copies the project, checks TypeScript, and creates the sdet-playwright image.",
            explanation:
              "Building the image does not execute CMD. The test command runs when a container starts.",
          },
        },
        {
          title: "Run locally and retain reports",
          paragraphs: [
            "Run the commands below from the automation practice project's root directory on macOS or Linux.",
            "The mounted folders match the output paths configured in playwright.reporting.config.ts.",
            "--rm removes the stopped container. Files written to the mounted report folders remain on the host.",
            "--init helps manage child processes. --ipc=host provides the shared-memory arrangement recommended for Chromium in this trusted test setup.",
          ],
          example: {
            title: "Execute the suite in Docker",
            filename: "Terminal — automation practice project",
            code: `mkdir -p playwright-report test-results reports

docker build -t sdet-playwright .

docker run --rm --init --ipc=host -v "$PWD/playwright-report:/app/playwright-report" -v "$PWD/test-results:/app/test-results" -v "$PWD/reports:/app/reports" sdet-playwright

npx playwright show-report playwright-report`,
            command:
              'docker run --rm --init --ipc=host -v "$PWD/playwright-report:/app/playwright-report" -v "$PWD/test-results:/app/test-results" -v "$PWD/reports:/app/reports" sdet-playwright',
            expected:
              "The suite runs inside Docker. Available reports and failure artifacts remain in the mounted host directories.",
            explanation:
              "The container returns a nonzero exit status when the test command fails. Report preservation does not hide failures.",
          },
        },
        {
          title: "Understand container networking",
          paragraphs: [
            "Inside a container, localhost refers to that container, not your laptop.",
            "The shopping project from lesson 23 works because its fixture starts the application inside the same container as the tests.",
            "With Docker Desktop, a host application can usually be reached through host.docker.internal if it listens on an accessible interface.",
            "For separate application and test containers, use a shared Docker network and address the application by its service or container name.",
            "Passing BASE_URL only works when your Playwright configuration explicitly reads process.env.BASE_URL. Setting an environment variable alone does not change navigation.",
          ],
          bullets: [
            "Start the application and wait for readiness before testing.",
            "Choose a hostname that is reachable from the test container.",
            "Keep test data isolated even when containers are isolated.",
            "Use an appropriate test environment for workflows that create or modify records.",
          ],
        },
        {
          title: "Run Docker in GitHub Actions",
          paragraphs: [
            "This workflow is an alternative to the earlier runner-based workflow. Replace the contents of the same .github/workflows/playwright.yml file when choosing Docker.",
            "The Docker build installs npm dependencies and checks TypeScript. The container runs tests with its bundled browsers.",
            "The GitHub runner does not need separate setup-node or Playwright browser-install steps for this approach.",
            "The upload step retains available evidence after test failures without suppressing the failed job status.",
          ],
          example: {
            title: "Create the Docker-based workflow",
            filename: ".github/workflows/playwright.yml",
            code: `name: Playwright Docker checks

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
    timeout-minutes: 30

    steps:
      - name: Check out source
        uses: actions/checkout@v6

      - name: Prepare report folders
        run: mkdir -p playwright-report test-results reports

      - name: Build automation image
        run: docker build -t sdet-playwright .

      - name: Run tests in Docker
        run: |
          docker run --rm --init --ipc=host -v "$PWD/playwright-report:/app/playwright-report" -v "$PWD/test-results:/app/test-results" -v "$PWD/reports:/app/reports" sdet-playwright

      - name: Upload execution evidence
        if: \${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: playwright-docker-evidence
          path: |
            playwright-report/
            test-results/
            reports/
          retention-days: 7
          if-no-files-found: warn`,
            command: "docker build -t sdet-playwright .",
            expected:
              "GitHub Actions builds the image, runs the container, and uploads available evidence. Failed tests keep the job failed.",
            explanation:
              "Commit the Dockerfile, .dockerignore, workflow, package manifests, tests, and reporting configuration to the automation repository.",
          },
        },
        {
          title: "Diagnose failures by pipeline stage",
          paragraphs: [
            "Start with the first failing step. Dependency installation, type checking, image creation, browser startup, and test assertions are different failure categories.",
            "If a browser executable is missing in Docker, compare the installed Playwright package version with the image tag.",
            "If navigation fails, check application readiness and network reachability from the runner or container.",
            "For assertion failures, inspect the report and trace before changing expectations or timeouts.",
          ],
          bullets: [
            "Dependency failure: inspect the lockfile and package registry access.",
            "Type failure: run the same tsc command locally.",
            "Browser startup failure: inspect image versions and available resources.",
            "Connection failure: verify the application address and readiness.",
            "Assertion failure: inspect application behavior, prerequisites, and test expectations.",
          ],
        },
        {
          title: "Maintain the pipeline",
          paragraphs: [
            "Review dependency, Docker image, and GitHub Action updates deliberately. Teams may pin actions and images to reviewed immutable identifiers.",
            "Keep credentials in the CI secret store. Do not bake them into an image or print them in logs.",
            "Keep the Playwright global timeout below the CI job timeout so reporters have time to finish.",
            "Use artifact retention appropriate to the evidence collected. Reports and traces may contain sensitive application data.",
            "Increase parallel execution only after confirming that tests and their data are independent.",
          ],
        },
      ],
      mistakes: [
        "Running npm ci without a committed, matching lockfile.",
        "Assuming Playwright execution performs complete TypeScript checking.",
        "Installing browsers without their required Linux dependencies.",
        "Using a Docker image version that differs from the installed Playwright package.",
        "Copying the host's node_modules into the image.",
        "Assuming docker build also executes CMD.",
        "Removing a container without preserving its reports.",
        "Assuming localhost inside Docker refers to the host computer.",
        "Assuming container isolation also isolates remote application data.",
        "Using continue-on-error to hide failed quality checks.",
      ],
      exercise: {
        title: "Run the suite in Docker and inspect its evidence",
        tasks: [
          "Create the reporting configuration from lesson 21.",
          "Align the Playwright package and Docker image versions.",
          "Create .dockerignore and Dockerfile in the practice project.",
          "Build the image and run the suite with report mounts.",
          "Open the HTML report on your host computer.",
          "Temporarily introduce one incorrect assertion and run again.",
          "Confirm the test command fails while its report remains available.",
          "Restore the assertion and rerun successfully.",
          "Choose one GitHub workflow approach and verify an actual Actions run.",
        ],
        solution: {
          title: "Build, execute, and inspect",
          filename: "Terminal — automation practice project",
          code: `mkdir -p playwright-report test-results reports

docker build -t sdet-playwright .

docker run --rm --init --ipc=host -v "$PWD/playwright-report:/app/playwright-report" -v "$PWD/test-results:/app/test-results" -v "$PWD/reports:/app/reports" sdet-playwright

npx playwright show-report playwright-report`,
          command:
            'docker run --rm --init --ipc=host -v "$PWD/playwright-report:/app/playwright-report" -v "$PWD/test-results:/app/test-results" -v "$PWD/reports:/app/reports" sdet-playwright',
          expected:
            "The normal suite passes in Docker. A deliberate mismatch fails and preserves evidence. Rebuild after restoring the test, then confirm the suite passes again.",
          explanation:
            "Test source is copied into the image during build. Rebuild after changing tests so the container executes the updated code.",
        },
      },
      takeaway:
        "Make automation execution repeatable, observable, and honest about failures. Align container versions, preserve evidence, and verify networking and data isolation explicitly.",
    },
  },
  {
    number: 23,
    slug: "shopping-automation-project",
    title: "Practice: Shopping Application Automation",
    description:
      "Combine a local application, isolated fixtures, page objects, API checks, and reports.",
    content: {
      introduction:
        "Build a small integrated checkout test. The browser sends a real HTTP request to a local Node service, and the test independently reads the saved order through an API.",
      objectives: [
        "Translate a checkout rule into observable checks.",
        "Start and stop an isolated application for each test.",
        "Combine page objects, browser actions, and API assertions.",
        "Verify a rejected request does not create an order.",
        "Explain the project's coverage and limitations.",
      ],
      sections: [
        {
          title: "Define the contract",
          paragraphs: [
            "The practice shop sells a keyboard for 2500 cents. It accepts whole-number quantities from 1 through 5.",
            "A valid checkout creates one order and displays a confirmation. Invalid quantities return HTTP 400 without creating an order.",
            "Orders are stored in memory. This project covers the local UI-to-service workflow, but it does not cover a database, payment provider, authentication, or production deployment.",
          ],
          bullets: [
            "Verify the displayed confirmation.",
            "Read the saved order through a separate HTTP request.",
            "Check quantity and total against the stated rule.",
            "Check rejected input leaves order storage unchanged.",
            "Give each test its own server and order collection.",
          ],
        },
        {
          title: "Create the local practice application",
          paragraphs: [
            "Create the support folder inside tests, then save the module below.",
            "The server chooses an available local port. Each call to startShop creates a separate in-memory order collection.",
            "The HTML calls the backend directly; no request interception is used in this project.",
          ],
          example: {
            title: "Serve checkout and order endpoints",
            filename: "tests/support/shop-server.ts",
            code: `import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

type Order = {
  id: string;
  quantity: number;
  totalCents: number;
};

const html = [
  "<!doctype html>",
  '<html lang="en"><head><title>Practice shop</title></head><body>',
  "<h1>Keyboard shop</h1>",
  "<p>Unit price: $25.00</p>",
  '<form id="checkout">',
  '<label for="quantity">Quantity</label>',
  '<input id="quantity" type="number" min="1" max="5" step="1" value="1" required>',
  '<button type="submit">Place order</button>',
  "</form>",
  '<p role="status">Ready</p>',
  "<script>",
  'document.getElementById("checkout").addEventListener("submit", async (event) => {',
  "  event.preventDefault();",
  '  const status = document.querySelector("[role=status]");',
  '  const button = document.querySelector("button");',
  "  button.disabled = true;",
  "  try {",
  '    const response = await fetch("/api/orders", {',
  '      method: "POST",',
  '      headers: { "Content-Type": "application/json" },',
  '      body: JSON.stringify({ quantity: Number(document.getElementById("quantity").value) })',
  "    });",
  "    const data = await response.json();",
  "    if (!response.ok) throw new Error(data.error);",
  '    status.textContent = "Order " + data.id + " confirmed";',
  "  } catch {",
  '    status.textContent = "Unable to place order";',
  "  } finally {",
  "    button.disabled = false;",
  "  }",
  "});",
  "</script></body></html>",
].join("\\n");

export async function startShop() {
  const orders: Order[] = [];

  const server = createServer(async (req, res) => {
    const sendJSON = (status: number, value: unknown) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(value));
    };

    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }

    if (req.method === "GET" && req.url === "/api/orders") {
      sendJSON(200, orders);
      return;
    }

    if (req.method === "POST" && req.url === "/api/orders") {
      try {
        let raw = "";

        for await (const chunk of req) {
          raw += chunk.toString();
        }

        const body: unknown = JSON.parse(raw);
        const quantity =
          typeof body === "object" && body !== null && "quantity" in body
            ? body.quantity
            : undefined;

        if (
          typeof quantity !== "number" ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          quantity > 5
        ) {
          sendJSON(400, { error: "Quantity must be an integer from 1 to 5" });
          return;
        }

        const order: Order = {
          id: String(orders.length + 1),
          quantity,
          totalCents: quantity * 2500,
        };

        orders.push(order);
        sendJSON(201, order);
      } catch {
        sendJSON(400, { error: "Invalid request" });
      }

      return;
    }

    sendJSON(404, { error: "Not found" });
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });

  const address = server.address() as AddressInfo;

  return {
    url: "http://127.0.0.1:" + address.port,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      }),
  };
}`,
            command: "npx tsc --noEmit",
            expected:
              "The support module type-checks. The tests in the next section start the server when needed.",
            explanation:
              "The module exports lifecycle operations rather than starting a permanent server as soon as it is imported.",
          },
        },
        {
          title: "Automate the connected workflow",
          paragraphs: [
            "The fixture starts a fresh shop for each test and closes it afterward.",
            "The page object owns checkout interactions. The test checks both the visible result and the server's stored order.",
            "The .js import suffix is intentional for NodeNext-style module resolution; the source module is shop-server.ts.",
          ],
          example: {
            title: "Check successful and rejected orders",
            filename: "tests/shopping.spec.ts",
            code: `import { test as base, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { startShop } from "./support/shop-server.js";

type Fixtures = {
  shopURL: string;
};

const test = base.extend<Fixtures>({
  shopURL: async ({}, use) => {
    const shop = await startShop();

    try {
      await use(shop.url);
    } finally {
      await shop.close();
    }
  },
});

class CheckoutPage {
  readonly quantity: Locator;
  readonly placeOrder: Locator;
  readonly status: Locator;

  constructor(private readonly page: Page) {
    this.quantity = page.getByRole("spinbutton", { name: "Quantity" });
    this.placeOrder = page.getByRole("button", { name: "Place order" });
    this.status = page.getByRole("status");
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async buy(quantity: number): Promise<void> {
    await this.quantity.fill(String(quantity));
    await this.placeOrder.click();
  }
}

test("saves a two-keyboard order", async ({ page, request, shopURL }) => {
  const checkout = new CheckoutPage(page);

  await checkout.open(shopURL);
  await checkout.buy(2);

  await expect(checkout.status).toHaveText("Order 1 confirmed");

  const response = await request.get(shopURL + "/api/orders");

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual([
    {
      id: "1",
      quantity: 2,
      totalCents: 5000,
    },
  ]);
});

test("rejects an excessive quantity without saving", async ({
  request,
  shopURL,
}) => {
  const rejected = await request.post(shopURL + "/api/orders", {
    data: { quantity: 6 },
  });

  expect(rejected.status()).toBe(400);
  expect(await rejected.json()).toEqual({
    error: "Quantity must be an integer from 1 to 5",
  });

  const orders = await request.get(shopURL + "/api/orders");

  expect(orders.status()).toBe(200);
  expect(await orders.json()).toEqual([]);
});`,
            command:
              "npx playwright test tests/shopping.spec.ts --config=playwright.reporting.config.ts",
            expected:
              "The browser creates the expected order. The invalid API request is rejected and leaves its separate shop empty.",
            explanation:
              "The UI check and API read verify different observations of the same workflow. The rejection test bypasses browser constraints to check server validation directly.",
          },
        },
        {
          title: "Assess the coverage",
          paragraphs: [
            "The successful test checks one quantity and one product. The negative test checks one invalid input class.",
            "Expand coverage based on risk: minimum and maximum quantities, fractional input, malformed requests, repeated submission, and service failures.",
            "The practice service is intentionally small and is not production-ready. Real systems require persistent storage, access control, request limits, and other protections.",
            "To extend the course project, replace the practice service with an application you own and preserve the same explicit contracts and data isolation.",
          ],
        },
      ],
      mistakes: [
        "Checking only that the confirmation message appears.",
        "Mocking order creation while claiming the saved backend order was verified.",
        "Sharing the same server state across tests without resetting it.",
        "Assuming browser input limits replace server-side validation.",
        "Claiming payment or database coverage from this in-memory application.",
      ],
      exercise: {
        title: "Cover both accepted quantity boundaries",
        tasks: [
          "Append the parameterized tests below to shopping.spec.ts.",
          "Run all four shopping tests.",
          "Run them again with fully parallel execution and two workers.",
          "Review the HTML report and describe the remaining coverage gaps.",
        ],
        solution: {
          title: "Check the minimum and maximum",
          filename: "tests/shopping.spec.ts — append",
          code: `const boundaries = [
  { quantity: 1, expectedTotal: 2500 },
  { quantity: 5, expectedTotal: 12500 },
];

for (const scenario of boundaries) {
  test("accepts quantity " + scenario.quantity, async ({
    page,
    request,
    shopURL,
  }) => {
    const checkout = new CheckoutPage(page);

    await checkout.open(shopURL);
    await checkout.buy(scenario.quantity);

    await expect(checkout.status).toHaveText("Order 1 confirmed");

    const response = await request.get(shopURL + "/api/orders");

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([
      {
        id: "1",
        quantity: scenario.quantity,
        totalCents: scenario.expectedTotal,
      },
    ]);
  });
}`,
          command:
            "npx playwright test tests/shopping.spec.ts --config=playwright.reporting.config.ts --fully-parallel --workers=2",
          expected:
            "All four tests pass with isolated server state, including both accepted boundaries.",
          explanation:
            "Each fixture creates its own application instance, so concurrent tests do not compete for the same order collection.",
        },
      },
      takeaway:
        "Build automation around explicit rules, independently observable outcomes, and controlled test resources. Explain what the suite establishes and what remains untested.",
    },
  },
];
