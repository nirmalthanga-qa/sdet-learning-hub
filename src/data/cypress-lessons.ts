export type CypressExample = {
  title: string;
  filename: string;
  code: string;
  command: string;
  expected: string;
  explanation: string;
};

export type CypressSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: CypressExample;
};

export type CypressLessonData = {
  number: number;
  slug: string;
  title: string;
  description: string;
  content?: {
    introduction: string;
    objectives: string[];
    sections: CypressSection[];
    mistakes: string[];
    exercise: {
      title: string;
      tasks: string[];
      solution: CypressExample;
    };
    takeaway: string;
  };
};

export const cypressLessons: CypressLessonData[] = [
  {
    number: 1,
    slug: "introduction",
    title: "Introduction to Cypress",
    description:
      "Understand Cypress, TypeScript tests, and the difference between commands and outcomes.",
    content: {
      introduction:
        "Cypress helps automate browser behavior and inspect application interactions. This course uses TypeScript and builds toward reliable checks of connected user workflows.",
      objectives: [
        "Recognize the structure of a Cypress test.",
        "Understand the purpose of the command queue.",
        "Distinguish browser interaction from verified behavior.",
        "Understand where TypeScript helps and where runtime checks remain necessary.",
      ],
      sections: [
        {
          title: "What will we automate?",
          paragraphs: [
            "We will work with forms, lists, network responses, API requests, authentication state, and application data.",
            "Early exercises isolate individual techniques. Later exercises combine them into connected workflows.",
            "A browser check is not automatically a complete end-to-end test. Explain which application parts are real and which dependencies are replaced.",
          ],
          bullets: [
            "Check user-visible outcomes.",
            "Prepare controlled prerequisites.",
            "Exercise successful and unsuccessful scenarios.",
            "Investigate failures using useful evidence.",
          ],
        },
        {
          title: "Read a Cypress test",
          paragraphs: [
            "describe groups related checks. it declares a test. cy provides Cypress commands.",
            "The example below does not open an application. It introduces a command chain with a small object.",
            "Read it now and run it after completing the project setup lesson.",
          ],
          example: {
            title: "Inspect a value through a command chain",
            filename: "cypress/e2e/introduction.cy.ts",
            code: `describe("Cypress fundamentals", () => {
  it("reads a quantity from a yielded object", () => {
    cy.wrap({ quantity: 2 })
      .its("quantity")
      .should("equal", 2);
  });
});`,
            command: "npx cypress run --spec cypress/e2e/introduction.cy.ts",
            expected:
              "After project setup, one test passes. The chain yields the quantity and checks its value.",
            explanation:
              "This is a command-chain exercise, not an application test. The object is supplied directly by the test.",
          },
        },
        {
          title: "Commands are queued",
          paragraphs: [
            "Calling a Cypress command queues work. Cypress then executes queued commands in order.",
            "A command chain yields a subject to later commands. It does not return the final application value synchronously.",
            "Use Cypress chaining and callbacks to work with yielded values. Do not mark a test async just to await cy.get or cy.visit.",
            "We will examine chaining, retry behavior, and .then callbacks in dedicated lessons.",
          ],
        },
        {
          title: "Why TypeScript?",
          paragraphs: [
            "TypeScript helps describe test data, reusable functions, and custom command interfaces.",
            "Cypress includes TypeScript declarations, so the editor can offer command completion and check supported argument types.",
            "TypeScript cannot establish that a selector finds the right element or that an API response matches its declared type. Those require runtime checks.",
          ],
        },
        {
          title: "Actions need meaningful assertions",
          paragraphs: [
            "A successful click establishes that an interaction occurred. It does not prove the intended order was created.",
            "Choose an observable result tied to the requirement, such as a confirmation plus a saved order with the correct total.",
            "Keep checks specific enough to identify incorrect behavior without depending on unrelated presentation details.",
          ],
        },
        {
          title: "Keep the practice project separate",
          paragraphs: [
            "The Learning Hub displays lessons and examples. Learners run Cypress locally in a separate project.",
            "Use .cy.ts files for this course.",
            "Keeping Cypress separate from the Playwright practice project also makes their different configuration and global test types easier to manage.",
          ],
        },
      ],
      mistakes: [
        "Using await with Cypress commands as if they were ordinary promises.",
        "Expecting cy.get to immediately return a DOM element.",
        "Checking only that a click completed.",
        "Assuming TypeScript validates responses at runtime.",
        "Calling a mocked browser check complete backend coverage.",
      ],
      exercise: {
        title: "Check two properties of a yielded object",
        tasks: [
          "Read the example before completing project setup.",
          "Identify the object supplied by the test.",
          "Identify the expected product name and quantity.",
          "After lesson 2, save the file and execute it.",
          "Temporarily change the expected quantity to 3 and observe the failure.",
          "Restore the expected quantity to 2.",
        ],
        solution: {
          title: "Inspect the yielded object",
          filename: "cypress/e2e/introduction.cy.ts",
          code: `describe("Cypress fundamentals", () => {
  it("checks a practice cart item", () => {
    cy.wrap({
      product: "Keyboard",
      quantity: 2,
    }).should((item) => {
      expect(item.product).to.equal("Keyboard");
      expect(item.quantity).to.equal(2);
    });
  });
});`,
          command: "npx cypress run --spec cypress/e2e/introduction.cy.ts",
          expected:
            "The correct expectations pass. Changing the expected quantity to 3 produces a failure.",
          explanation:
            "The callback checks the yielded subject. Keep assertion callbacks free of side effects because Cypress may retry them.",
        },
      },
      takeaway:
        "Use Cypress commands to express interactions and assertions to establish outcomes. Learn its command queue instead of transferring Playwright's async/await pattern directly.",
    },
  },
  {
    number: 2,
    slug: "project-setup",
    title: "Project Setup with TypeScript",
    description:
      "Create a separate Cypress project, serve a local practice page, and run a TypeScript spec.",
    content: {
      introduction:
        "Set up a small, controlled practice environment. The application runs in one terminal while Cypress runs in another.",
      objectives: [
        "Install Cypress in a separate project.",
        "Configure TypeScript and Cypress.",
        "Serve a local HTML practice application.",
        "Run a spec interactively and headlessly.",
        "Check TypeScript independently.",
      ],
      sections: [
        {
          title: "Create the practice project",
          paragraphs: [
            "Use a separate folder outside the Learning Hub and Playwright projects.",
            "Use Node.js 24 for these examples. Check the installed Cypress release's operating-system requirements if installation fails.",
            "The explicit install command ensures the Cypress binary is downloaded even when package-manager lifecycle scripts are restricted.",
          ],
          example: {
            title: "Install the project dependencies",
            filename: "Terminal — parent folder for practice projects",
            code: `mkdir sdet-cypress-practice
cd sdet-cypress-practice
npm init -y
npm install --save-dev cypress typescript@5 @types/node@24
npx cypress install
npx cypress verify`,
            command: "npx cypress verify",
            expected: "Cypress verifies its installed application binary.",
            explanation:
              "Keep package.json and package-lock.json so subsequent installations can use npm ci.",
          },
        },
        {
          title: "Configure Cypress",
          paragraphs: [
            "Create cypress.config.ts at the practice project's root.",
            "baseUrl identifies the application address. It does not start the application.",
            "The support file is disabled for these initial lessons. We will introduce one when adding shared commands.",
          ],
          example: {
            title: "Define the E2E configuration",
            filename: "cypress.config.ts",
            code: `import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  retries: 0,
  e2e: {
    baseUrl: "http://127.0.0.1:4173",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: false,
    testIsolation: true,
  },
});`,
            command: "npx cypress open --e2e",
            expected:
              "After completing the remaining setup, Cypress opens the E2E project.",
            explanation:
              "The spec pattern identifies TypeScript test files. Each test starts with isolated browser state.",
          },
        },
        {
          title: "Configure TypeScript",
          paragraphs: [
            "Create tsconfig.json at the practice project's root.",
            "Explicit Cypress and Node types provide the globals used by specs and configuration.",
            "Run the compiler after creating at least the configuration file. Cypress execution does not replace complete type checking.",
          ],
          example: {
            title: "Check configuration and test files",
            filename: "tsconfig.json",
            code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM"],
    "types": ["cypress", "node"],
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": [
    "cypress.config.ts",
    "cypress/**/*.ts"
  ]
}`,
            command: "npx tsc --noEmit",
            expected:
              "The compiler checks project configuration and TypeScript specs without generating JavaScript files.",
            explanation:
              "This configuration belongs only to the Cypress practice project.",
          },
        },
        {
          title: "Create the practice page",
          paragraphs: [
            "Create practice.html at the project root.",
            "The page contains two product cards, a search field, and a delayed save confirmation.",
            "It has no backend persistence. The save interaction is a deliberate browser-only simulation.",
          ],
          example: {
            title: "Add a controlled application",
            filename: "practice.html",
            code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SDET Practice Shop</title>
  </head>
  <body>
    <main>
      <h1>SDET Practice Shop</h1>

      <nav aria-label="Page navigation">
        <a href="#products">Browse products</a>
      </nav>

      <section id="products" aria-label="Products">
        <article data-cy="product-card">
          <h2>Keyboard</h2>
          <p>$25.00</p>
          <button type="button" data-product="Keyboard">Add</button>
        </article>

        <article data-cy="product-card">
          <h2>Mouse</h2>
          <p>$15.00</p>
          <button type="button" data-product="Mouse">Add</button>
        </article>
      </section>

      <p data-cy="cart-status" role="status">Cart is empty</p>

      <label for="search">Search products</label>
      <input id="search" data-cy="search" type="text">

      <button type="button" data-cy="save">Save preferences</button>
      <p data-cy="save-status" role="status">Not saved</p>
    </main>

    <script>
      document.querySelectorAll("[data-product]").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelector('[data-cy="cart-status"]').textContent =
            button.dataset.product + " added";
        });
      });

      const saveButton = document.querySelector('[data-cy="save"]');
      const saveStatus = document.querySelector('[data-cy="save-status"]');

      saveButton.addEventListener("click", () => {
        saveButton.disabled = true;
        saveStatus.textContent = "Saving";

        setTimeout(() => {
          saveStatus.textContent = "Saved";
          saveButton.disabled = false;
        }, 600);
      });
    </script>
  </body>
</html>`,
            command: "node server.mjs",
            expected:
              "After creating the server module below, the page is available at http://127.0.0.1:4173.",
            explanation:
              "The timer simulates asynchronous application behavior. Tests will wait for its observable result rather than sleeping for a fixed duration.",
          },
        },
        {
          title: "Serve the page locally",
          paragraphs: [
            "Create server.mjs at the project root.",
            "Start it in terminal one and leave it running while using Cypress.",
            "If port 4173 is already occupied, change the port here and baseUrl in cypress.config.ts together.",
          ],
          example: {
            title: "Start a small HTTP server",
            filename: "server.mjs",
            code: `import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const pageFile = new URL("./practice.html", import.meta.url);

const server = createServer(async (req, res) => {
  const pathname = new URL(
    req.url ?? "/",
    "http://127.0.0.1:4173"
  ).pathname;

  if (pathname !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  try {
    const html = await readFile(pageFile);

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(html);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Unable to read practice.html");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Practice shop: http://127.0.0.1:4173");
});`,
            command: "node server.mjs",
            expected:
              "The server prints its address and continues running until stopped with Ctrl+C.",
            explanation:
              "This server exposes only the practice page. Cypress connects to it through the configured baseUrl.",
          },
        },
        {
          title: "Write the first browser check",
          paragraphs: [
            "Create the cypress/e2e folders and save the spec below.",
            "Use terminal two, opened in the same practice project, to run Cypress while the server continues in terminal one.",
            "You can also save and run the introduction spec from lesson 1.",
          ],
          example: {
            title: "Verify the practice page",
            filename: "cypress/e2e/setup.cy.ts",
            code: `describe("Practice project setup", () => {
  it("opens the practice shop", () => {
    cy.visit("/");

    cy.get("h1").should("have.text", "SDET Practice Shop");
    cy.get('[data-cy="product-card"]').should("have.length", 2);
  });
});`,
            command: "npx cypress run --spec cypress/e2e/setup.cy.ts",
            expected:
              "One browser test passes after verifying the heading and two product cards.",
            explanation:
              "This confirms the browser can reach the local application and execute the configured spec.",
          },
        },
      ],
      mistakes: [
        "Installing Cypress inside the Learning Hub instead of a separate practice project.",
        "Assuming baseUrl starts the application.",
        "Closing the server terminal before running browser tests.",
        "Saving specs outside the configured pattern.",
        "Assuming a successful Cypress run means TypeScript has been fully checked.",
      ],
      exercise: {
        title: "Run in interactive and headless modes",
        tasks: [
          "Create all files shown in the lesson.",
          "Start node server.mjs in terminal one.",
          "Run the TypeScript check in terminal two.",
          "Run the setup spec headlessly.",
          "Open Cypress, select an available browser, and run setup.cy.ts interactively.",
        ],
        solution: {
          title: "Verify the setup",
          filename: "Terminal two — automation practice project",
          code: `npx tsc --noEmit
npx cypress run --spec cypress/e2e/setup.cy.ts
npx cypress open --e2e`,
          command: "npx cypress run --spec cypress/e2e/setup.cy.ts",
          expected:
            "Type checking succeeds and the setup test passes in both execution modes.",
          explanation:
            "The application server must remain running during both browser executions.",
        },
      },
      takeaway:
        "Keep the application server, Cypress configuration, and TypeScript checks explicit. A controlled local application makes later examples reproducible.",
    },
  },
  {
    number: 3,
    slug: "command-queue",
    title: "Command Queue and Subjects",
    description:
      "Understand scheduled commands, yielded subjects, and working with values inside chains.",
    content: {
      introduction:
        "Cypress commands schedule work and yield subjects to later commands. Understanding that sequence prevents common timing and variable mistakes.",
      objectives: [
        "Distinguish command scheduling from execution.",
        "Read yielded values inside callbacks.",
        "Return a transformed value from .then.",
        "Avoid applying async/await directly to Cypress commands.",
      ],
      sections: [
        {
          title: "Read values when they are available",
          paragraphs: [
            "A variable assigned inside a command callback is not ready for synchronous code immediately after the chain is declared.",
            "Keep dependent work inside the chain. The following example waits until the page heading has been read before checking its value.",
            "Start the practice server from lesson 2 before running the browser examples.",
          ],
          example: {
            title: "Inspect text from the page",
            filename: "cypress/e2e/queue.cy.ts",
            code: `describe("Command queue", () => {
  it("reads the heading inside the chain", () => {
    cy.visit("/");

    cy.get("h1")
      .invoke("text")
      .then((heading) => {
        expect(heading).to.equal("SDET Practice Shop");
      });
  });
});`,
            command: "npx cypress run --spec cypress/e2e/queue.cy.ts",
            expected:
              "The callback receives the heading text after the preceding commands have executed.",
            explanation:
              "The expectation runs inside the callback, where the yielded value is available.",
          },
        },
        {
          title: "Transform a yielded value",
          paragraphs: [
            "Returning a value from .then supplies a new subject to the following command.",
            "The callback itself is not retried. Use it for deliberate one-time processing of a value that is ready.",
          ],
          example: {
            title: "Calculate from a yielded quantity",
            filename: "cypress/e2e/transform.cy.ts",
            code: `describe("Subject transformation", () => {
  it("calculates a practice total", () => {
    cy.wrap({ quantity: 2 })
      .its("quantity")
      .then((quantity) => {
        return quantity * 2500;
      })
      .should("equal", 5000);
  });
});`,
            command: "npx cypress run --spec cypress/e2e/transform.cy.ts",
            expected:
              "The chain yields quantity 2, transforms it into 5000 cents, and checks that result.",
            explanation:
              "This illustrates chaining with test-supplied data. It does not verify an application's pricing implementation.",
          },
        },
        {
          title: "Avoid mixing execution models",
          paragraphs: [
            "Cypress chains are not ordinary promises. Do not await cy.get or cy.visit.",
            "When a callback returns another Cypress chain, Cypress waits for that chain before continuing.",
            "Avoid callbacks that enqueue Cypress commands and also return an unrelated synchronous value.",
            "For changing UI conditions, prefer a retrying assertion rather than taking a one-time snapshot and expecting it to update.",
          ],
        },
      ],
      mistakes: [
        "Reading a variable synchronously before its command callback executes.",
        "Using async test callbacks to await Cypress commands.",
        "Assuming .then retries until its expectations pass.",
        "Returning an unrelated value while also enqueuing commands in the same callback.",
      ],
      exercise: {
        title: "Transform and check a product name",
        tasks: [
          "Save the example below.",
          "Identify the subject before and after .then.",
          "Run the spec.",
          "Change the expected result temporarily to observe the failure.",
        ],
        solution: {
          title: "Return a transformed subject",
          filename: "cypress/e2e/queue-exercise.cy.ts",
          code: `describe("Queue exercise", () => {
  it("normalizes a practice product name", () => {
    cy.wrap("  Keyboard  ")
      .then((name) => name.trim().toLowerCase())
      .should("equal", "keyboard");
  });
});`,
          command: "npx cypress run --spec cypress/e2e/queue-exercise.cy.ts",
          expected: "The transformed subject is the string keyboard.",
          explanation:
            "Returning the transformed string makes it available to the next assertion.",
        },
      },
      takeaway:
        "Keep dependent operations in the command chain. Know what each command yields and when its callback executes.",
    },
  },
  {
    number: 4,
    slug: "selectors-and-navigation",
    title: "Selectors and Navigation",
    description:
      "Choose stable selectors, scope repeated controls, and verify navigation.",
    content: {
      introduction:
        "A selector should identify the intended element clearly. Stable selection and meaningful assertions make failures easier to understand.",
      objectives: [
        "Query elements by a stable test attribute.",
        "Select visible text when that text matters.",
        "Scope repeated controls to a product card.",
        "Verify navigation through the URL and visible content.",
      ],
      sections: [
        {
          title: "Choose selectors deliberately",
          paragraphs: [
            "Use data-cy attributes for a deliberate test-facing selector contract.",
            "Use visible text when the wording is part of the behavior being checked.",
            "Avoid styling classes, generated identifiers, and positional selectors unless their meaning is genuinely stable.",
            "The examples use built-in CSS queries and contains, so no selector plugin is required.",
          ],
          example: {
            title: "Find a stable input",
            filename: "cypress/e2e/selectors.cy.ts",
            code: `describe("Selectors", () => {
  it("enters a search value", () => {
    cy.visit("/");

    cy.get('[data-cy="search"]').type("Keyboard");

    cy.get('[data-cy="search"]')
      .should("have.value", "Keyboard");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/selectors.cy.ts",
            expected: "The search field contains Keyboard.",
            explanation:
              "This checks input interaction only. The practice page does not implement product filtering.",
          },
        },
        {
          title: "Scope repeated buttons",
          paragraphs: [
            "Both product cards contain an Add button. A broad text query could select the wrong product.",
            "Find the intended card first, then scope the button query with within.",
            "After the action, query the status independently to check its result.",
          ],
          example: {
            title: "Add the intended product",
            filename: "cypress/e2e/scoping.cy.ts",
            code: `describe("Scoped product selection", () => {
  it("adds the keyboard", () => {
    cy.visit("/");

    cy.contains('[data-cy="product-card"]', "Keyboard").within(() => {
      cy.contains("button", /^Add$/).click();
    });

    cy.get('[data-cy="cart-status"]')
      .should("have.text", "Keyboard added");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/scoping.cy.ts",
            expected:
              "The keyboard's Add button is activated and the cart status identifies Keyboard.",
            explanation:
              "Scoping connects the selected control to the product named in the scenario.",
          },
        },
        {
          title: "Verify navigation",
          paragraphs: [
            "cy.visit('/') resolves against the configured baseUrl.",
            "The practice navigation link changes the URL fragment and targets the products section.",
            "Check both the relevant URL component and destination content when those observations matter.",
          ],
          example: {
            title: "Navigate to the product section",
            filename: "cypress/e2e/navigation.cy.ts",
            code: `describe("Page navigation", () => {
  it("navigates to products", () => {
    cy.visit("/");

    cy.contains("a", /^Browse products$/).click();

    cy.location("hash").should("equal", "#products");
    cy.get("#products").should("be.visible");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/navigation.cy.ts",
            expected:
              "The URL fragment becomes #products and the target section is visible.",
            explanation:
              "This is same-page anchor navigation, not a separate application route.",
          },
        },
      ],
      mistakes: [
        "Selecting the first Add button without identifying its product.",
        "Depending on styling classes that change during redesigns.",
        "Assuming a value assertion proves search results were filtered.",
        "Checking only that a navigation click completed.",
      ],
      exercise: {
        title: "Select the second product by meaning",
        tasks: [
          "Select the Mouse card by its content.",
          "Click Add within that card.",
          "Verify the cart status identifies Mouse.",
          "Avoid using an index such as eq(1).",
        ],
        solution: {
          title: "Add the mouse",
          filename: "cypress/e2e/selectors-exercise.cy.ts",
          code: `describe("Selector exercise", () => {
  it("adds the mouse", () => {
    cy.visit("/");

    cy.contains('[data-cy="product-card"]', "Mouse").within(() => {
      cy.contains("button", /^Add$/).click();
    });

    cy.get('[data-cy="cart-status"]')
      .should("have.text", "Mouse added");
  });
});`,
          command:
            "npx cypress run --spec cypress/e2e/selectors-exercise.cy.ts",
          expected:
            "The Mouse card's button is selected even if the product cards change order.",
          explanation:
            "The query expresses product identity rather than its current position.",
        },
      },
      takeaway:
        "Select elements by stable meaning, scope repeated controls, and verify the outcome of navigation or interaction.",
    },
  },
  {
    number: 5,
    slug: "assertions-and-retryability",
    title: "Assertions and Retry-ability",
    description:
      "Wait for observable conditions with retrying queries and assertions.",
    content: {
      introduction:
        "Application updates do not always happen immediately. Express the expected condition so Cypress can wait for it within a bounded time.",
      objectives: [
        "Use retrying assertions for asynchronous UI updates.",
        "Distinguish .should from .then.",
        "Keep retrying callbacks free of side effects.",
        "Separate command retry-ability from whole-test retries.",
      ],
      sections: [
        {
          title: "Wait for the result",
          paragraphs: [
            "The practice page displays Saved after a short timer.",
            "The test clicks once and queries the status with an assertion. No fixed delay is needed.",
          ],
          example: {
            title: "Observe the save confirmation",
            filename: "cypress/e2e/retryability.cy.ts",
            code: `describe("Retrying assertions", () => {
  it("shows a save confirmation", () => {
    cy.visit("/");

    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="save-status"]')
      .should("have.text", "Saved");

    cy.get('[data-cy="save"]').should("not.be.disabled");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/retryability.cy.ts",
            expected:
              "The assertions pass once the status is Saved and the button is enabled.",
            explanation:
              "The timer belongs to the simulated application. The test waits for behavior rather than duplicating the timer duration.",
          },
        },
        {
          title: "Understand what retries",
          paragraphs: [
            "Linked queries and assertions can retry until their condition passes or their timeout expires.",
            "Actions such as click wait for actionability but do not repeatedly click until a later assertion passes.",
            "Query the DOM again after actions that might replace elements.",
          ],
        },
        {
          title: "Choose .should or .then",
          paragraphs: [
            "A .should callback can run repeatedly. Keep it limited to assertions without side effects or Cypress commands.",
            "A .then callback runs once and is useful for one-time processing.",
          ],
          example: {
            title: "Check related conditions together",
            filename: "cypress/e2e/assertion-callback.cy.ts",
            code: `describe("Assertion callbacks", () => {
  it("checks the completed status", () => {
    cy.visit("/");

    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="save-status"]').should(($status) => {
      expect($status).to.be.visible;
      expect($status.text()).to.equal("Saved");
    });
  });
});`,
            command:
              "npx cypress run --spec cypress/e2e/assertion-callback.cy.ts",
            expected:
              "The callback succeeds when both visibility and text expectations hold.",
            explanation:
              "Reading the element and asserting its state is safe to repeat. Clicking or modifying data inside this callback would not be.",
          },
        },
        {
          title: "Timeouts and test retries",
          paragraphs: [
            "A query timeout bounds waiting for its condition. Whole-test retries rerun a failed test attempt.",
            "Keep test retries at zero while learning so failures remain obvious.",
            "A larger timeout cannot correct the wrong selector or expected result.",
          ],
        },
      ],
      mistakes: [
        "Adding cy.wait(1000) instead of checking the intended condition.",
        "Clicking or changing data inside a retrying assertion callback.",
        "Expecting .then to retry a failing assertion.",
        "Increasing timeouts before investigating incorrect prerequisites.",
      ],
      exercise: {
        title: "Use a bounded wait for the save result",
        tasks: [
          "Save the example below.",
          "Run it while the practice server is running.",
          "Temporarily change Saved to Published and observe the timeout failure.",
          "Restore Saved without adding a fixed wait.",
        ],
        solution: {
          title: "Set a focused timeout",
          filename: "cypress/e2e/retryability-exercise.cy.ts",
          code: `describe("Retry exercise", () => {
  it("waits for the save result", () => {
    cy.visit("/");

    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="save-status"]', { timeout: 5000 })
      .should("have.text", "Saved");
  });
});`,
          command:
            "npx cypress run --spec cypress/e2e/retryability-exercise.cy.ts",
          expected:
            "The correct condition passes when ready. An incorrect expectation fails after the allowed waiting period.",
          explanation:
            "The timeout is a maximum waiting budget, not a mandatory five-second pause.",
        },
      },
      takeaway:
        "Wait for meaningful conditions with bounded assertions. Keep retries safe and investigate failures instead of hiding them with delays.",
    },
  },
  {
    number: 6,
    slug: "forms-and-controls",
    title: "Forms and Controls",
    description:
      "Enter text and interact with checkboxes, radio buttons, and native select controls.",
    content: {
      introduction:
        "Form automation should express the user's choices and verify the resulting state. Use commands appropriate to each native control.",
      objectives: [
        "Enter and replace text.",
        "Check and uncheck a checkbox.",
        "Select a radio option.",
        "Choose a native select value.",
        "Distinguish control state from completed business behavior.",
      ],
      sections: [
        {
          title: "Extend the practice page",
          paragraphs: [
            "In the separate Cypress practice project, open practice.html from lesson 2.",
            "Insert this section immediately before the existing closing main tag. Keep the previous page content and scripts.",
            "This section demonstrates control state only. It does not submit data or save a delivery preference.",
          ],
          example: {
            title: "Add delivery controls",
            filename: "practice.html — insert before </main>",
            code: `<section aria-labelledby="delivery-heading" data-cy="delivery-form">
  <h2 id="delivery-heading">Delivery preferences</h2>

  <label for="customer-name">Customer name</label>
  <input id="customer-name" data-cy="customer-name" type="text">

  <label>
    <input data-cy="gift-wrap" type="checkbox">
    Gift wrap
  </label>

  <fieldset>
    <legend>Delivery speed</legend>
    <label>
      <input type="radio" name="speed" value="standard" checked>
      Standard
    </label>
    <label>
      <input type="radio" name="speed" value="express">
      Express
    </label>
  </fieldset>

  <label for="delivery-country">Delivery country</label>
  <select id="delivery-country" data-cy="delivery-country">
    <option value="">Choose a country</option>
    <option value="IN">India</option>
    <option value="GB">United Kingdom</option>
  </select>
</section>`,
            command: "node server.mjs",
            expected:
              "The practice page displays the new delivery controls after refreshing.",
            explanation:
              "If the server is already running, leave it running. It reads the updated HTML on each request.",
          },
        },
        {
          title: "Set and verify control values",
          paragraphs: [
            "Use type for text, check for checkboxes and radio buttons, and select for a native select element.",
            "Query controls again after actions before asserting their state.",
            "Selecting a control value does not establish that an application saved it.",
          ],
          example: {
            title: "Choose delivery preferences",
            filename: "cypress/e2e/forms.cy.ts",
            code: `describe("Delivery controls", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("accepts delivery preferences", () => {
    cy.get('[data-cy="customer-name"]').type("Nirmal");
    cy.get('[data-cy="customer-name"]').should("have.value", "Nirmal");

    cy.get('[data-cy="gift-wrap"]').check();
    cy.get('[data-cy="gift-wrap"]').should("be.checked");

    cy.get('input[name="speed"][value="express"]').check();
    cy.get('input[name="speed"][value="express"]').should("be.checked");
    cy.get('input[name="speed"][value="standard"]').should("not.be.checked");

    cy.get('[data-cy="delivery-country"]').select("IN");
    cy.get('[data-cy="delivery-country"]').should("have.value", "IN");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/forms.cy.ts",
            expected:
              "The name, gift-wrap choice, delivery speed, and country match the selected values.",
            explanation:
              "The assertions cover native control state. A real submission workflow also needs an observable saved result.",
          },
        },
        {
          title: "Native controls and custom widgets",
          paragraphs: [
            "select applies to an HTML select element. A custom dropdown built from buttons and lists needs its own interaction sequence.",
            "Avoid force: true as a default response to interaction failures. Investigate visibility, disabled state, overlays, and the intended user workflow.",
            "Use clear before replacing existing text instead of unintentionally appending another value.",
          ],
        },
      ],
      mistakes: [
        "Using select on a custom dropdown that is not an HTML select.",
        "Typing replacement text without clearing the previous value.",
        "Using force to bypass an unexplained blocked control.",
        "Treating selected values as proof of backend persistence.",
      ],
      exercise: {
        title: "Change existing preferences",
        tasks: [
          "Append the test below inside the existing describe block.",
          "Enter a name, then replace it.",
          "Check gift wrap, then remove it.",
          "Verify the final values.",
        ],
        solution: {
          title: "Replace and clear choices",
          filename: "cypress/e2e/forms.cy.ts — inside describe",
          code: `it("changes existing preferences", () => {
  cy.get('[data-cy="customer-name"]').type("First name");
  cy.get('[data-cy="customer-name"]').clear();
  cy.get('[data-cy="customer-name"]').type("Updated name");

  cy.get('[data-cy="gift-wrap"]').check();
  cy.get('[data-cy="gift-wrap"]').uncheck();

  cy.get('[data-cy="customer-name"]')
    .should("have.value", "Updated name");

  cy.get('[data-cy="gift-wrap"]').should("not.be.checked");
});`,
          command: "npx cypress run --spec cypress/e2e/forms.cy.ts",
          expected: "Both form tests pass with independently prepared pages.",
          explanation:
            "The beforeEach hook supplies a fresh page for the added test.",
        },
      },
      takeaway:
        "Use control-specific commands and verify the resulting state. Extend coverage to submission and persistence when the application implements them.",
    },
  },
  {
    number: 7,
    slug: "tables-and-dynamic-content",
    title: "Tables and Dynamic Content",
    description:
      "Identify table rows by meaning and verify asynchronously filtered content.",
    content: {
      introduction:
        "Dynamic interfaces require queries that identify the intended content and assertions that wait for the relevant state.",
      objectives: [
        "Scope a check to a row identified by content.",
        "Verify individual cells and row counts.",
        "Wait for asynchronous filtering.",
        "Distinguish hidden content from removed content.",
      ],
      sections: [
        {
          title: "Add a filterable inventory table",
          paragraphs: [
            "Insert the following section and script before the closing main tag in practice.html.",
            "Keep the earlier product cards, forms, and scripts.",
            "The filter deliberately updates after a short delay and hides nonmatching rows. It does not remove them from the DOM.",
          ],
          example: {
            title: "Add the inventory demo",
            filename: "practice.html — insert before </main>",
            code: `<section aria-labelledby="inventory-heading">
  <h2 id="inventory-heading">Inventory</h2>

  <label for="inventory-filter">Filter inventory</label>
  <input id="inventory-filter" data-cy="inventory-filter" type="text">

  <table data-cy="inventory">
    <caption>Available products</caption>
    <thead>
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Stock</th>
      </tr>
    </thead>
    <tbody>
      <tr data-name="keyboard"><td>Keyboard</td><td>12</td></tr>
      <tr data-name="mouse"><td>Mouse</td><td>7</td></tr>
    </tbody>
  </table>

  <p data-cy="inventory-status" role="status">2 products</p>
</section>

<script>
  const inventoryFilter = document.querySelector('[data-cy="inventory-filter"]');
  let inventoryTimer;

  inventoryFilter.addEventListener("input", () => {
    clearTimeout(inventoryTimer);

    const query = inventoryFilter.value.trim().toLowerCase();

    inventoryTimer = setTimeout(() => {
      const rows = document.querySelectorAll('[data-cy="inventory"] tbody tr');
      let visibleCount = 0;

      rows.forEach((row) => {
        row.hidden = !row.dataset.name.includes(query);
        if (!row.hidden) visibleCount += 1;
      });

      document.querySelector('[data-cy="inventory-status"]').textContent =
        visibleCount + " products";
    }, 300);
  });
</script>`,
            command: "node server.mjs",
            expected:
              "The refreshed page includes a filterable table with Keyboard and Mouse rows.",
            explanation:
              "Leave an existing server running. The browser loads the updated page on its next visit.",
          },
        },
        {
          title: "Identify the intended row",
          paragraphs: [
            "Locate the product cell by exact text and move to its row before checking the stock cell.",
            "The column index below represents the table's defined Stock column. Avoid using a row index to identify a product.",
          ],
          example: {
            title: "Check keyboard stock",
            filename: "cypress/e2e/tables.cy.ts",
            code: `describe("Inventory table", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows keyboard stock", () => {
    cy.get('[data-cy="inventory"]')
      .contains("td", /^Keyboard$/)
      .closest("tr")
      .within(() => {
        cy.get("td").eq(1).should("have.text", "12");
      });
  });

  it("filters to the mouse row", () => {
    cy.get('[data-cy="inventory-filter"]').type("Mouse");

    cy.get('[data-cy="inventory-status"]')
      .should("have.text", "1 products");

    cy.get('[data-cy="inventory"] tbody tr:visible')
      .should("have.length", 1)
      .and("contain.text", "Mouse");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/tables.cy.ts",
            expected:
              "The stock check passes, and filtering eventually leaves one visible Mouse row.",
            explanation:
              "The test waits on state assertions instead of copying the application's timer delay.",
          },
        },
        {
          title: "Know what your query counts",
          paragraphs: [
            "The demo keeps hidden rows in the DOM. Counting all rows would still return two after filtering.",
            "Use visibility when that is the intended observation. A removed row can instead be checked with not.exist.",
            "For virtualized tables, the DOM may contain only the rendered portion. Do not treat its row count as the full dataset size.",
          ],
        },
      ],
      mistakes: [
        "Selecting the first row and assuming it represents the intended product.",
        "Counting hidden rows as visible results.",
        "Using a fixed wait to accommodate filtering.",
        "Assuming a virtualized table renders every record.",
      ],
      exercise: {
        title: "Verify an empty search result",
        tasks: [
          "Append the test inside the existing describe block.",
          "Search for a product that is not present.",
          "Check both the result message and the visible row count.",
        ],
        solution: {
          title: "Check no matching products",
          filename: "cypress/e2e/tables.cy.ts — inside describe",
          code: `it("shows no matching products", () => {
  cy.get('[data-cy="inventory-filter"]').type("Monitor");

  cy.get('[data-cy="inventory-status"]')
    .should("have.text", "0 products");

  cy.get('[data-cy="inventory"] tbody tr:visible')
    .should("have.length", 0);

  cy.get('[data-cy="inventory"] tbody tr')
    .should("have.length", 2);
});`,
          command: "npx cypress run --spec cypress/e2e/tables.cy.ts",
          expected:
            "No rows are visible, while the two underlying rows still exist.",
          explanation:
            "The assertions distinguish the displayed result from the page's underlying DOM structure.",
        },
      },
      takeaway:
        "Query rows by meaning, wait for the intended state, and distinguish rendered content from the complete dataset.",
    },
  },
  {
    number: 8,
    slug: "test-organization-and-isolation",
    title: "Test Organization and Isolation",
    description:
      "Organize related checks while keeping prerequisites and browser state independent.",
    content: {
      introduction:
        "A test should establish its own prerequisites and remain useful when run alone. Grouping tests should improve readability without creating execution-order dependencies.",
      objectives: [
        "Use describe and beforeEach for clear organization.",
        "Understand browser test isolation.",
        "Distinguish browser cleanup from backend cleanup.",
        "Verify that a test does not require earlier tests.",
      ],
      sections: [
        {
          title: "Give each test a starting point",
          paragraphs: [
            "beforeEach runs before every test in its scope. Use it for prerequisites required by each test.",
            "With E2E testIsolation enabled, Cypress clears the page and browser storage between tests. Visit the application again for each scenario.",
            "This does not reset a remote database, shared files, or server-side account data.",
          ],
          example: {
            title: "Independent cart checks",
            filename: "cypress/e2e/isolation.cy.ts",
            code: `describe("Cart behavior", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("starts with an empty cart", () => {
    cy.get('[data-cy="cart-status"]')
      .should("have.text", "Cart is empty");
  });

  it("adds the keyboard", () => {
    cy.contains('[data-cy="product-card"]', "Keyboard").within(() => {
      cy.contains("button", /^Add$/).click();
    });

    cy.get('[data-cy="cart-status"]')
      .should("have.text", "Keyboard added");
  });

  it("adds the mouse", () => {
    cy.contains('[data-cy="product-card"]', "Mouse").within(() => {
      cy.contains("button", /^Add$/).click();
    });

    cy.get('[data-cy="cart-status"]')
      .should("have.text", "Mouse added");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/isolation.cy.ts",
            expected:
              "All three tests pass without depending on another test's cart state.",
            explanation:
              "Each test visits a fresh copy of the practice page and performs its own actions.",
          },
        },
        {
          title: "Choose hook scope carefully",
          paragraphs: [
            "Use beforeEach for per-test browser setup. A visit in before does not keep the page available after isolation resets it for subsequent tests.",
            "Keep scenario-specific actions in the test so its intent remains visible.",
            "For a real backend, establish data ownership and a reset or cleanup strategy. Browser isolation cannot prevent two tests from editing the same server record.",
          ],
        },
        {
          title: "Review skipped and focused tests",
          paragraphs: [
            "it.only helps investigate one test locally, but remove it before committing.",
            "it.skip excludes a check. Record why it is skipped and revisit it rather than allowing coverage to disappear silently.",
            "Run a suspect test independently when diagnosing hidden setup dependencies.",
          ],
        },
      ],
      mistakes: [
        "Having one test create the state another test needs.",
        "Visiting only in before while relying on that page across isolated tests.",
        "Assuming browser cleanup resets the application's database.",
        "Committing it.only and unintentionally excluding the rest of a suite.",
      ],
      exercise: {
        title: "Verify a test independently",
        tasks: [
          "Temporarily change the mouse test from it to it.only.",
          "Run the file and confirm the mouse test passes by itself.",
          "Remove .only.",
          "Run the file again and confirm all three tests pass.",
        ],
        solution: {
          title: "Run the isolation checks",
          filename: "Terminal — Cypress practice project",
          code: `npx cypress run --spec cypress/e2e/isolation.cy.ts`,
          command: "npx cypress run --spec cypress/e2e/isolation.cy.ts",
          expected:
            "The mouse test passes independently. After removing .only, all three tests execute.",
          explanation:
            "Independent execution helps reveal accidental reliance on earlier tests.",
        },
      },
      takeaway:
        "Make test prerequisites explicit. Isolate browser state and separately manage any mutable resources outside the browser.",
    },
  },
  {
    number: 9,
    slug: "variables-and-aliases",
    title: "Variables and Aliases",
    description:
      "Use closures and aliases to work with values at the correct point in execution.",
    content: {
      introduction:
        "Cypress values become available as commands execute. Closures and aliases provide ways to use those values without relying on synchronous assignment.",
      objectives: [
        "Read values inside command callbacks.",
        "Create and retrieve aliases.",
        "Distinguish a query alias from a static snapshot.",
        "Create aliases separately for each test.",
      ],
      sections: [
        {
          title: "Alias a reusable query",
          paragraphs: [
            "Use as to name a subject and cy.get with an @ prefix to retrieve it.",
            "The default query alias can re-run its query chain. Create an element alias before performing actions.",
            "Aliases reset before each test, so create shared aliases in beforeEach rather than before.",
          ],
          example: {
            title: "Name the search input",
            filename: "cypress/e2e/aliases.cy.ts",
            code: `describe("Query aliases", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="search"]').as("searchInput");
  });

  it("enters a search value", () => {
    cy.get("@searchInput").type("Keyboard");
    cy.get("@searchInput").should("have.value", "Keyboard");
  });

  it("starts with an empty search value", () => {
    cy.get("@searchInput").should("have.value", "");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/aliases.cy.ts",
            expected:
              "Both tests receive their own alias and page. Text entered in one test does not become the other's starting value.",
            explanation:
              "The alias gives the query a readable name without creating shared browser state.",
          },
        },
        {
          title: "Capture a value deliberately",
          paragraphs: [
            "Use a static alias when you want a value captured at that point rather than re-evaluated later.",
            "For before-and-after comparisons, a closure can also keep the initial value available.",
            "The example below captures a primitive string, avoiding ambiguity about mutation of a shared object.",
          ],
          example: {
            title: "Keep the original cart message",
            filename: "cypress/e2e/static-alias.cy.ts",
            code: `describe("Static aliases", () => {
  it("keeps the original message after adding a product", () => {
    cy.visit("/");

    cy.get('[data-cy="cart-status"]')
      .invoke("text")
      .as("initialMessage", { type: "static" });

    cy.contains('[data-cy="product-card"]', "Keyboard").within(() => {
      cy.contains("button", /^Add$/).click();
    });

    cy.get('[data-cy="cart-status"]')
      .should("have.text", "Keyboard added");

    cy.get("@initialMessage").should("equal", "Cart is empty");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/static-alias.cy.ts",
            expected:
              "The current UI says Keyboard added while the captured original message remains Cart is empty.",
            explanation:
              "The test distinguishes a captured historical value from a fresh query of the application.",
          },
        },
        {
          title: "Avoid premature variable reads",
          paragraphs: [
            "A synchronous statement after a queued command does not wait for that command's callback.",
            "Keep dependent assertions inside the callback or a later Cypress command.",
            "This course uses cy.get('@alias') instead of Mocha's this context, so arrow callbacks remain straightforward.",
          ],
        },
      ],
      mistakes: [
        "Reading an assigned variable before its callback has executed.",
        "Creating aliases only in before and expecting them in every test.",
        "Treating a static snapshot as a fresh application query.",
        "Aliasing an action chain when the intended reusable subject is an element query.",
      ],
      exercise: {
        title: "Clear an aliased input",
        tasks: [
          "Append the test inside the Query aliases describe block.",
          "Use the alias to type and clear a value.",
          "Assert the final input state through the alias.",
        ],
        solution: {
          title: "Reuse the input alias",
          filename: "cypress/e2e/aliases.cy.ts — inside describe",
          code: `it("clears the search value", () => {
  cy.get("@searchInput").type("Mouse");
  cy.get("@searchInput").clear();
  cy.get("@searchInput").should("have.value", "");
});`,
          command: "npx cypress run --spec cypress/e2e/aliases.cy.ts",
          expected:
            "All three alias tests pass with independent starting states.",
          explanation:
            "The beforeEach hook provides the page and alias for every test.",
        },
      },
      takeaway:
        "Use aliases and closures at the correct execution point. Decide explicitly whether you need a fresh query or a captured value.",
    },
  },
  {
    number: 10,
    slug: "fixtures-and-test-data",
    title: "Fixtures and Test Data",
    description:
      "Load controlled fixture data, validate its shape, and declare separately reported cases.",
    content: {
      introduction:
        "Test data should make a scenario clear and reproducible. Fixtures store reusable inputs, while parameterized tests provide distinct results for meaningful cases.",
      objectives: [
        "Load JSON from the fixtures folder.",
        "Validate fixture data before use.",
        "Distinguish Cypress fixture files from lifecycle fixtures.",
        "Declare independent parameterized tests.",
      ],
      sections: [
        {
          title: "Create a fixture file",
          paragraphs: [
            "In Cypress, a fixture commonly means a file containing test data. It is different from Playwright's setup-and-teardown fixture mechanism.",
            "Create the cypress/fixtures folder in the practice project and save the JSON below.",
            "The form examples require the delivery controls added in lesson 6.",
          ],
          example: {
            title: "Store a delivery profile",
            filename: "cypress/fixtures/delivery-profile.json",
            code: `{
  "name": "Sample Customer",
  "country": "IN"
}`,
            command: "npx cypress run --spec cypress/e2e/fixture-data.cy.ts",
            expected:
              "After creating the spec in the next section, Cypress loads this file by its fixture name.",
            explanation:
              "The file contains synthetic input data and no credentials or personal records.",
          },
        },
        {
          title: "Validate and use the data",
          paragraphs: [
            "A TypeScript annotation alone does not validate JSON. The guard below checks the fields used by this scenario.",
            "cy.fixture reads reusable test data. Do not rely on it to observe a file that changes during the test.",
            "Keep fixture data unchanged and create fresh objects when a test needs modified input.",
          ],
          example: {
            title: "Load a profile with runtime checks",
            filename: "cypress/e2e/fixture-data.cy.ts",
            code: `export {};

type DeliveryProfile = {
  name: string;
  country: "IN" | "GB";
};

function isDeliveryProfile(value: unknown): value is DeliveryProfile {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const profile = value as Record<string, unknown>;

  return (
    typeof profile.name === "string" &&
    profile.name.trim().length > 0 &&
    (profile.country === "IN" || profile.country === "GB")
  );
}

describe("Delivery fixture", () => {
  it("fills the delivery profile", () => {
    cy.visit("/");

    cy.fixture<unknown>("delivery-profile").then((profile) => {
      if (!isDeliveryProfile(profile)) {
        throw new Error("Invalid delivery profile fixture");
      }

      cy.get('[data-cy="customer-name"]').type(profile.name);
      cy.get('[data-cy="delivery-country"]').select(profile.country);

      cy.get('[data-cy="customer-name"]')
        .should("have.value", profile.name);

      cy.get('[data-cy="delivery-country"]')
        .should("have.value", profile.country);
    });
  });
});`,
            command: "npx cypress run --spec cypress/e2e/fixture-data.cy.ts",
            expected:
              "The fixture passes validation and supplies the displayed name and selected country.",
            explanation:
              "The guard establishes the input shape. UI assertions separately establish that the controls received those values.",
          },
        },
        {
          title: "Declare independent data cases",
          paragraphs: [
            "Define test cases synchronously when the spec loads so Cypress can discover a separate test for each scenario.",
            "Do not declare it blocks inside cy.fixture().then(). That callback executes after test discovery.",
            "Keep generated titles unique and choose cases from requirements rather than adding many similar values.",
          ],
          example: {
            title: "Check both supported countries",
            filename: "cypress/e2e/data-cases.cy.ts",
            code: `export {};

type CountryCase = {
  label: string;
  value: "IN" | "GB";
};

const countries: CountryCase[] = [
  { label: "India", value: "IN" },
  { label: "United Kingdom", value: "GB" },
];

describe("Delivery country cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  for (const country of countries) {
    it("selects " + country.label, () => {
      cy.get('[data-cy="delivery-country"]').select(country.value);

      cy.get('[data-cy="delivery-country"]')
        .should("have.value", country.value);

      cy.get('[data-cy="delivery-country"] option:selected')
        .should("have.text", country.label);
    });
  }
});`,
            command: "npx cypress run --spec cypress/e2e/data-cases.cy.ts",
            expected:
              "Two separately reported tests verify each supported country value and label.",
            explanation:
              "The cases are registered before execution, and each test prepares its own page.",
          },
        },
        {
          title: "Static data is not server isolation",
          paragraphs: [
            "A reusable JSON profile is useful input, but repeatedly creating the same backend account can still cause collisions.",
            "For workflows that create records, use unique identifiers and track ownership for cleanup.",
            "Keep business inputs deterministic when their exact value affects the expected result.",
          ],
        },
      ],
      mistakes: [
        "Assuming a generic type validates a fixture at runtime.",
        "Declaring tests inside an asynchronous fixture callback.",
        "Mutating a shared fixture object across scenarios.",
        "Using static account identifiers for conflicting server mutations.",
        "Treating fixture data as proof that the application's backend contains matching records.",
      ],
      exercise: {
        title: "Verify the initial country selection",
        tasks: [
          "Append the test below inside Delivery country cases.",
          "Confirm no country is selected initially.",
          "Run the file and verify three separately reported results.",
        ],
        solution: {
          title: "Check the unselected state",
          filename: "cypress/e2e/data-cases.cy.ts — inside describe",
          code: `it("starts without a selected country", () => {
  cy.get('[data-cy="delivery-country"]')
    .should("have.value", "");

  cy.get('[data-cy="delivery-country"] option:selected')
    .should("have.text", "Choose a country");
});`,
          command: "npx cypress run --spec cypress/e2e/data-cases.cy.ts",
          expected:
            "The initial-state test and both country-selection tests pass independently.",
          explanation:
            "The default state is a separate scenario from choosing either supported country.",
        },
      },
      takeaway:
        "Use controlled data, validate runtime inputs, and report meaningful cases independently. Manage backend data ownership separately.",
    },
  },
  {
    number: 11,
    slug: "typed-custom-commands",
    title: "Typed Custom Commands",
    description:
      "Register reusable Cypress commands with TypeScript declarations.",
    content: {
      introduction:
        "A custom command should express a repeated operation clearly. Keep its interface small and preserve Cypress chaining.",
      objectives: [
        "Register a custom command.",
        "Extend Cypress's Chainable interface.",
        "Load commands through the support file.",
        "Build a typed page object that preserves Cypress command chaining.",
      ],
      sections: [
        {
          title: "Enable the support file",
          paragraphs: [
            "In cypress.config.ts, replace supportFile: false with supportFile: 'cypress/support/e2e.ts'.",
            "Create both support files shown below.",
          ],
          example: {
            title: "Load command registration",
            filename: "cypress/support/e2e.ts",
            code: `import "./commands";`,
            command: "npx tsc --noEmit",
            expected: "After creating commands.ts, the import resolves.",
            explanation: "The support file is loaded before E2E specs.",
          },
        },
        {
          title: "Define a typed selector command",
          paragraphs: [
            "This helper selects a data-cy attribute. It accepts simple identifier tokens to keep selector construction predictable.",
            "A command is not automatically a custom retryable query. Return a Cypress chain and use assertions at the call site.",
          ],
          example: {
            title: "Register getByCy",
            filename: "cypress/support/commands.ts",
            code: `export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getByCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByCy", (value: string) => {
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    throw new Error("getByCy expects a simple data-cy token");
  }

  return cy.get<HTMLElement>('[data-cy="' + value + '"]');
});`,
            command: "npx tsc --noEmit",
            expected:
              "TypeScript recognizes cy.getByCy in the included spec files.",
            explanation:
              "The declaration describes the command while Commands.add supplies its implementation.",
          },
        },
        {
          title: "Choose helpers deliberately",
          paragraphs: [
            "Use ordinary functions for pure data transformations.",
            "Avoid wrapping every Cypress command or hiding unrelated business steps inside a generic helper.",
            "Custom commands should improve readability without swallowing useful failures.",
          ],
        },
        {
          title: "Page Objects with TypeScript",
          paragraphs: [
            "A page object groups related selectors and interactions behind a small interface. Custom commands extend cy; page objects are ordinary TypeScript classes imported by tests.",
            "Use Cypress chains inside page-object methods. Return the chain when callers need to continue from the operation. Do not use async/await with Cypress commands.",
            "This example uses the delivery controls added to practice.html in lesson 6. It fills controls but does not submit or persist a delivery preference.",
            "Create a pages folder inside the practice project's cypress folder and save the class below.",
          ],
          example: {
            title: "Model the delivery preferences",
            filename: "cypress/pages/DeliveryPage.ts",
            code: `export type DeliveryProfile = {
  name: string;
  country: "IN" | "GB";
  speed: "standard" | "express";
  giftWrap: boolean;
};

export class DeliveryPage {
  visit() {
    return cy.visit("/");
  }

  nameInput() {
    return cy.get<HTMLInputElement>('[data-cy="customer-name"]');
  }

  countrySelect() {
    return cy.get<HTMLSelectElement>('[data-cy="delivery-country"]');
  }

  giftWrapCheckbox() {
    return cy.get<HTMLInputElement>('[data-cy="gift-wrap"]');
  }

  speedRadio(value: DeliveryProfile["speed"]) {
    return cy.get<HTMLInputElement>(
      'input[name="speed"][value="' + value + '"]'
    );
  }

  enterName(name: string) {
    this.nameInput().clear();

    if (name.length > 0) {
      return this.nameInput().type(name);
    }

    return this.nameInput();
  }

  selectCountry(country: DeliveryProfile["country"]) {
    return this.countrySelect().select(country);
  }

  selectSpeed(speed: DeliveryProfile["speed"]) {
    return this.speedRadio(speed).check();
  }

  setGiftWrap(enabled: boolean) {
    return enabled
      ? this.giftWrapCheckbox().check()
      : this.giftWrapCheckbox().uncheck();
  }

  fill(profile: DeliveryProfile) {
    this.enterName(profile.name);
    this.selectCountry(profile.country);
    this.selectSpeed(profile.speed);
    return this.setGiftWrap(profile.giftWrap);
  }
}`,
            command: "npx tsc --noEmit",
            expected:
              "The class and its typed profile compile in the Cypress practice project.",
            explanation:
              "Each accessor creates a fresh query instead of storing a DOM element. Calls inside fill enqueue operations in order; returning the final chain allows the caller to continue after them.",
          },
        },
        {
          title: "Use the Page Object in a Test",
          paragraphs: [
            "Keep scenario-specific expectations in the test so the behavior being verified stays visible.",
            "The page object contains no shared mutable state. Each test visits the application and supplies its own inputs.",
            "For larger pages, compose focused objects for areas such as delivery details and cart summary instead of creating one class for the entire application.",
          ],
          example: {
            title: "Verify delivery preferences",
            filename: "cypress/e2e/delivery-page-object.cy.ts",
            code: `import {
  DeliveryPage,
  type DeliveryProfile,
} from "../pages/DeliveryPage";

describe("Delivery preferences with a page object", () => {
  const delivery = new DeliveryPage();

  beforeEach(() => {
    delivery.visit();
  });

  it("fills express delivery preferences", () => {
    const profile: DeliveryProfile = {
      name: "Sample Customer",
      country: "IN",
      speed: "express",
      giftWrap: true,
    };

    delivery.fill(profile);

    delivery.nameInput().should("have.value", "Sample Customer");
    delivery.countrySelect().should("have.value", "IN");
    delivery.speedRadio("express").should("be.checked");
    delivery.speedRadio("standard").should("not.be.checked");
    delivery.giftWrapCheckbox().should("be.checked");
  });

  it("replaces a name and removes gift wrapping", () => {
    delivery.enterName("Original Name");
    delivery.setGiftWrap(true);

    delivery.enterName("Updated Name");
    delivery.setGiftWrap(false);

    delivery.nameInput().should("have.value", "Updated Name");
    delivery.giftWrapCheckbox().should("not.be.checked");
  });
});`,
            command:
              "npx cypress run --spec cypress/e2e/delivery-page-object.cy.ts",
            expected:
              "Both tests pass with independently prepared pages while reusing the delivery interactions.",
            explanation:
              "Start node server.mjs in another terminal before running. These checks verify control state, not backend persistence.",
          },
        },
      ],
      mistakes: [
        "Adding declarations without registering the command.",
        "Forgetting to enable the support file.",
        "Hiding assertions and unrelated actions inside vague helpers.",
      ],
      exercise: {
        title: "Use the new command",
        tasks: [
          "Create the support files.",
          "Update supportFile in the configuration.",
          "Run the example spec.",
        ],
        solution: {
          title: "Check a search value",
          filename: "cypress/e2e/custom-command.cy.ts",
          code: `describe("Custom commands", () => {
  it("uses a typed selector helper", () => {
    cy.visit("/");
    cy.getByCy("search").type("Keyboard");
    cy.getByCy("search").should("have.value", "Keyboard");
  });
});`,
          command: "npx cypress run --spec cypress/e2e/custom-command.cy.ts",
          expected:
            "The typed helper locates the search input and the assertion passes.",
          explanation:
            "The spec retains the visible scenario and expected outcome.",
        },
      },
      takeaway:
        "Pair command registration with type declarations and keep reusable operations focused.",
    },
  },
  {
    number: 12,
    slug: "network-interception",
    title: "Network Interception",
    description:
      "Control browser responses and wait for specific network activity.",
    content: {
      introduction:
        "Interception makes difficult UI states reproducible. Be explicit about which dependencies a test replaces.",
      objectives: [
        "Register interception before a request.",
        "Alias and inspect an intercepted request.",
        "Check the UI consequence of a controlled response.",
      ],
      sections: [
        {
          title: "Create a controlled network scenario",
          paragraphs: [
            "This test replaces the practice page with a tiny demonstration UI and stubs its API response.",
            "Keep the practice server running because Cypress checks the configured baseUrl.",
            "This demonstrates browser request handling, not the correctness of a real product service.",
          ],
          example: {
            title: "Display an unavailable state",
            filename: "cypress/e2e/network.cy.ts",
            code: `describe("Network control", () => {
  it("shows an unavailable message", () => {
    cy.intercept("GET", "http://127.0.0.1:4173/", {
      headers: { "content-type": "text/html" },
      body:
        '<button id="load">Load</button><p data-cy="result">Ready</p>' +
        '<script>' +
        'document.getElementById("load").onclick = async () => {' +
        ' const response = await fetch("/api/products");' +
        ' document.querySelector("[data-cy=result]").textContent =' +
        ' response.ok ? "Loaded" : "Unavailable";' +
        '};' +
        '</script>',
    });

    cy.intercept("GET", "**/api/products", {
      statusCode: 503,
      body: { error: "Unavailable" },
    }).as("products");

    cy.visit("/");
    cy.contains("button", /^Load$/).click();

    cy.wait("@products").then(({ response }) => {
      expect(response?.statusCode).to.equal(503);
    });

    cy.get('[data-cy="result"]').should("have.text", "Unavailable");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/network.cy.ts",
            expected:
              "The controlled 503 response produces the unavailable message.",
            explanation:
              "The network assertion verifies the exercised condition; the DOM assertion verifies its visible consequence.",
          },
        },
        {
          title: "Observe versus replace",
          paragraphs: [
            "An intercept without a static response can observe matching browser traffic.",
            "Use precise method and URL matching. Register the intercept before the triggering action.",
            "cy.request executes outside browser interception. Do not expect cy.intercept to stub it.",
            "Keep separate real-service checks to detect integration problems hidden by mocked responses.",
          ],
        },
      ],
      mistakes: [
        "Registering an intercept after the request.",
        "Using a fixed delay instead of an aliased request.",
        "Claiming backend coverage from a stubbed response.",
      ],
      exercise: {
        title: "Check the successful response path",
        tasks: [
          "Copy the spec to network-success.cy.ts.",
          "Change the stub status to 200.",
          "Change both status and UI expectations.",
        ],
        solution: {
          title: "Successful response changes",
          filename: "cypress/e2e/network-success.cy.ts — changed lines",
          code: `// In the API intercept:
statusCode: 200,
body: { items: [] },

// In the response callback:
expect(response?.statusCode).to.equal(200);

// Final UI assertion:
cy.get('[data-cy="result"]').should("have.text", "Loaded");`,
          command: "npx cypress run --spec cypress/e2e/network-success.cy.ts",
          expected: "The successful response displays Loaded.",
          explanation:
            "The demo only checks status handling, not product rendering.",
        },
      },
      takeaway:
        "Control dependencies for focused UI checks and preserve separate coverage against real services.",
    },
  },
  {
    number: 13,
    slug: "api-testing",
    title: "API Testing",
    description:
      "Exercise a local HTTP API and verify response contracts and business values.",
    content: {
      introduction:
        "API checks validate behavior without browser interaction. We will extend the local practice server for API, authentication, and checkout lessons.",
      objectives: [
        "Send requests with cy.request.",
        "Check exact status and body values.",
        "Exercise negative responses.",
        "Understand the limits of an in-memory demo service.",
      ],
      sections: [
        {
          title: "Replace the local server",
          paragraphs: [
            "Replace server.mjs in the practice project with this complete module. Stop the old server and restart it.",
            "Keep practice.html from earlier lessons. checkout.html will be created in lesson 23.",
            "The server uses synthetic credentials and session-scoped in-memory orders. It is a local teaching application, not production authentication or persistent storage.",
          ],
          example: {
            title: "Practice API and session server",
            filename: "server.mjs",
            code: `import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const sessions = new Map();
const products = [{ id: "p1", name: "Keyboard", priceCents: 2500 }];

async function readJSON(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk.toString();
    if (raw.length > 10000) throw new Error("Request too large");
  }
  return JSON.parse(raw || "{}");
}

const server = createServer(async (req, res) => {
  const path = new URL(req.url ?? "/", "http://127.0.0.1:4173").pathname;

  const json = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };

  const cookie = (req.headers.cookie ?? "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("sid="));

  const sid = cookie?.slice(4);
  const session = sessions.get(sid);

  try {
    if (req.method === "GET" && (path === "/" || path === "/checkout")) {
      const file = path === "/" ? "./practice.html" : "./checkout.html";
      const html = await readFile(new URL(file, import.meta.url));
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(html);
      return;
    }

    if (req.method === "GET" && path === "/api/products") {
      json(200, products);
      return;
    }

    if (req.method === "POST" && path === "/api/login") {
      const body = await readJSON(req);

      if (body?.username !== "demo" || body?.password !== "local-demo") {
        json(401, { error: "Invalid credentials" });
        return;
      }

      const id = randomUUID();
      sessions.set(id, { username: "demo", orders: [] });
      res.setHeader("Set-Cookie", "sid=" + id + "; HttpOnly; SameSite=Lax; Path=/");
      json(200, { username: "demo" });
      return;
    }

    if (path === "/api/me" && req.method === "GET") {
      json(session ? 200 : 401,
        session ? { username: session.username } : { error: "Unauthorized" });
      return;
    }

    if (path === "/api/logout" && req.method === "POST") {
      sessions.delete(sid);
      res.setHeader("Set-Cookie", "sid=; Max-Age=0; Path=/");
      json(200, { loggedOut: true });
      return;
    }

    if (path === "/api/orders") {
      if (!session) {
        json(401, { error: "Unauthorized" });
        return;
      }

      if (req.method === "GET") {
        json(200, session.orders);
        return;
      }

      if (req.method === "POST") {
        const body = await readJSON(req);
        const quantity = body?.quantity;

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
          json(400, { error: "Quantity must be an integer from 1 to 5" });
          return;
        }

        const order = {
          id: randomUUID(),
          quantity,
          totalCents: quantity * 2500,
        };

        session.orders.push(order);
        json(201, order);
        return;
      }
    }

    json(404, { error: "Not found" });
  } catch {
    json(400, { error: "Unable to process request" });
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Practice server: http://127.0.0.1:4173");
});`,
            command: "node server.mjs",
            expected:
              "The restarted server exposes the practice page and API routes.",
            explanation:
              "Restarting clears all demo sessions and orders. Each login creates a new order collection.",
          },
        },
        {
          title: "Check status, headers, and values",
          paragraphs: [
            "Check the expected body as well as the status.",
            "A generic TypeScript response type does not validate JSON. This example compares the runtime body to the complete expected value.",
          ],
          example: {
            title: "Verify the product API",
            filename: "cypress/e2e/api.cy.ts",
            code: `describe("Product API", () => {
  it("returns the expected product", () => {
    cy.request("/api/products").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.deep.equal([
        { id: "p1", name: "Keyboard", priceCents: 2500 },
      ]);
    });
  });
});`,
            command: "npx cypress run --spec cypress/e2e/api.cy.ts",
            expected: "The HTTP response matches the product contract.",
            explanation:
              "This calls the real local server without browser interception.",
          },
        },
      ],
      mistakes: [
        "Checking only a successful status.",
        "Assuming response types validate runtime data.",
        "Forgetting to restart the changed server.",
      ],
      exercise: {
        title: "Check an unknown endpoint",
        tasks: [
          "Append this test inside the describe block.",
          "Allow the error response so its contract can be asserted.",
        ],
        solution: {
          title: "Verify a 404 response",
          filename: "cypress/e2e/api.cy.ts — inside describe",
          code: `it("returns a clear not-found response", () => {
  cy.request({
    url: "/api/missing",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ error: "Not found" });
  });
});`,
          command: "npx cypress run --spec cypress/e2e/api.cy.ts",
          expected: "Both API cases pass.",
          explanation:
            "failOnStatusCode: false permits inspection; assertions still enforce correctness.",
        },
      },
      takeaway:
        "Verify HTTP contracts and meaningful values against a controlled service.",
    },
  },
  {
    number: 14,
    slug: "authentication-and-sessions",
    title: "Authentication and Sessions",
    description:
      "Create validated sessions and distinguish browser state from server-side identity.",
    content: {
      introduction:
        "Session reuse can reduce repeated login work, but restored browser storage must still represent a valid server session.",
      objectives: [
        "Authenticate through an API.",
        "Cache and validate a session.",
        "Verify unauthorized access.",
      ],
      sections: [
        {
          title: "Reuse a validated demo session",
          paragraphs: [
            "Use the server from lesson 13. The credentials shown are intentionally public values for this local demo only.",
            "cy.session caches cookies and browser storage. Its validate callback checks whether the restored session remains usable.",
            "Visit the page after restoring the session. Cached browser state does not restore a page or isolate shared backend records.",
          ],
          example: {
            title: "Cache a session with validation",
            filename: "cypress/e2e/sessions.cy.ts",
            code: `describe("Demo sessions", () => {
  beforeEach(() => {
    cy.session(["demo-user", "v1"], () => {
      cy.request("POST", "/api/login", {
        username: "demo",
        password: "local-demo",
      }).its("status").should("equal", 200);
    }, {
      validate() {
        cy.request("/api/me")
          .its("body")
          .should("deep.equal", { username: "demo" });
      },
    });

    cy.visit("/");
  });

  it("has an authenticated identity", () => {
    cy.request("/api/me").its("status").should("equal", 200);
  });

  it("can read its orders", () => {
    cy.request("/api/orders").its("status").should("equal", 200);
  });
});`,
            command: "npx cypress run --spec cypress/e2e/sessions.cy.ts",
            expected: "Both tests run with a server-validated session.",
            explanation:
              "These are read-only checks. Mutation tests need their own data-ownership strategy.",
          },
        },
        {
          title: "Check access boundaries",
          paragraphs: [
            "Login success and authorization are different checks.",
            "Test protected endpoints without a session and with unsuitable roles when your application supports them.",
            "For real systems, load secrets through approved configuration and avoid exposing tokens in reports.",
          ],
        },
      ],
      mistakes: [
        "Restoring state without validating the server session.",
        "Assuming session reuse isolates backend data.",
        "Testing only authenticated success.",
      ],
      exercise: {
        title: "Reject an unauthenticated request",
        tasks: [
          "Save this separate spec.",
          "Remove cookies before calling the protected endpoint.",
        ],
        solution: {
          title: "Check unauthorized access",
          filename: "cypress/e2e/unauthorized.cy.ts",
          code: `it("rejects access without a session", () => {
  cy.clearAllCookies();

  cy.request({
    url: "/api/me",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ error: "Unauthorized" });
  });
});`,
          command: "npx cypress run --spec cypress/e2e/unauthorized.cy.ts",
          expected: "The protected endpoint returns 401.",
          explanation: "A real HTTP response verifies the access boundary.",
        },
      },
      takeaway:
        "Validate reused sessions and test access boundaries separately from successful login.",
    },
  },
  {
    number: 15,
    slug: "node-tasks",
    title: "Node Tasks and Backend Utilities",
    description:
      "Use explicit task boundaries for operations that run in Node.",
    content: {
      introduction:
        "Tasks connect browser-side test commands to controlled Node operations, such as filesystem utilities or test-data preparation.",
      objectives: [
        "Register a task in setupNodeEvents.",
        "Validate task inputs.",
        "Return serializable results.",
      ],
      sections: [
        {
          title: "Register a narrow task",
          paragraphs: [
            "Replace the practice project's cypress.config.ts with this configuration.",
            "It preserves the support file from lesson 11 and adds a digest task.",
            "Tasks must finish and return a value or a promise for one. Return null when there is intentionally no result; undefined is not a successful task result.",
          ],
          example: {
            title: "Configure a Node utility",
            filename: "cypress.config.ts",
            code: `import { defineConfig } from "cypress";
import { createHash } from "node:crypto";

export default defineConfig({
  video: false,
  retries: 0,
  e2e: {
    baseUrl: "http://127.0.0.1:4173",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: true,
    setupNodeEvents(on) {
      on("task", {
        sha256(value: unknown) {
          if (typeof value !== "string") {
            throw new Error("sha256 expects a string");
          }

          return createHash("sha256").update(value).digest("hex");
        },
      });
    },
  },
});`,
            command: "npx tsc --noEmit",
            expected: "The task-enabled configuration type-checks.",
            explanation:
              "Node's crypto module runs in the task process rather than in the browser.",
          },
        },
        {
          title: "Keep the boundary controlled",
          paragraphs: [
            "Pass JSON-serializable arguments. Do not send DOM elements or functions.",
            "For database tasks, keep credentials and database clients in Node, use parameterized statements, and restrict operations to owned test data.",
            "Do not expose arbitrary shell execution or unrestricted SQL through a generic task.",
          ],
        },
      ],
      mistakes: [
        "Returning undefined.",
        "Passing nonserializable arguments.",
        "Using a task as an unrestricted execution endpoint.",
      ],
      exercise: {
        title: "Verify a known digest",
        tasks: [
          "Save the spec.",
          "Run it and compare the digest with a fixed expected value.",
        ],
        solution: {
          title: "Call the Node task",
          filename: "cypress/e2e/tasks.cy.ts",
          code: `it("computes a known SHA-256 digest", () => {
  cy.task<string>("sha256", "abc").should(
    "equal",
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  );
});`,
          command: "npx cypress run --spec cypress/e2e/tasks.cy.ts",
          expected: "The task returns the expected digest.",
          explanation:
            "The fixed expected value provides an independent check of the utility.",
        },
      },
      takeaway:
        "Use small, validated task interfaces and keep backend capabilities appropriately scoped.",
    },
  },
  {
    number: 16,
    slug: "files-and-downloads",
    title: "Files, Uploads, and Downloads",
    description: "Supply controlled files and verify downloaded content.",
    content: {
      introduction:
        "File checks should verify relevant content and application behavior rather than only the existence of a filename.",
      objectives: [
        "Select an in-memory file.",
        "Inspect a file input.",
        "Read downloaded output.",
      ],
      sections: [
        {
          title: "Use a controlled file interface",
          paragraphs: [
            "This spec stubs a small page and download response. It demonstrates browser mechanics, not a real upload service.",
            "The practice server must remain running.",
          ],
          example: {
            title: "Select and download files",
            filename: "cypress/e2e/files.cy.ts",
            code: `describe("File interactions", () => {
  it("selects a file and reads a download", () => {
    cy.intercept("GET", "http://127.0.0.1:4173/", {
      headers: { "content-type": "text/html" },
      body:
        '<label for="upload">Upload</label><input id="upload" type="file">' +
        '<a href="/download.csv" download="practice-export.csv">Download</a>',
    });

    cy.intercept("GET", "**/download.csv", {
      headers: {
        "content-type": "text/csv",
        "content-disposition": 'attachment; filename="practice-export.csv"',
      },
      body: "product,quantity\\nKeyboard,2\\n",
    });

    cy.visit("/");

    cy.get("#upload").selectFile({
      contents: Cypress.Buffer.from("sample content"),
      fileName: "sample.txt",
      mimeType: "text/plain",
    });

    cy.get<HTMLInputElement>("#upload").should(($input) => {
      expect($input[0].files).to.have.length(1);
      expect($input[0].files?.[0].name).to.equal("sample.txt");
    });

    cy.contains("a", "Download").click();

    cy.readFile("cypress/downloads/practice-export.csv")
      .should("equal", "product,quantity\\nKeyboard,2\\n");
  });
});`,
            command: "npx cypress run --spec cypress/e2e/files.cy.ts",
            expected:
              "The input receives sample.txt and the download contains the expected CSV.",
            explanation:
              "Cypress run clears its downloads folder by default. Avoid stale output when repeating individual tests interactively.",
          },
        },
        {
          title: "Check the real boundary",
          paragraphs: [
            "For a real upload, also check the server response and visible acceptance or rejection.",
            "For exports, validate required columns, row values, and encoding.",
            "Use unique filenames or explicit cleanup when stale files could satisfy an assertion.",
          ],
        },
      ],
      mistakes: [
        "Checking only a downloaded filename.",
        "Mistaking file selection for successful upload.",
        "Reading stale output from a previous execution.",
      ],
      exercise: {
        title: "Inspect selected file size",
        tasks: [
          "Add this assertion after selectFile.",
          "Keep the original filename assertion.",
        ],
        solution: {
          title: "Check the selected payload",
          filename: "cypress/e2e/files.cy.ts — after selectFile",
          code: `cy.get<HTMLInputElement>("#upload").should(($input) => {
  expect($input[0].files?.[0].size).to.equal(
    Cypress.Buffer.byteLength("sample content")
  );
});`,
          command: "npx cypress run --spec cypress/e2e/files.cy.ts",
          expected: "The file size matches the supplied content.",
          explanation:
            "This adds a payload check without claiming backend processing occurred.",
        },
      },
      takeaway:
        "Control inputs, verify outputs, and distinguish file mechanics from complete service behavior.",
    },
  },
  {
    number: 17,
    slug: "spies-stubs-and-clocks",
    title: "Spies, Stubs, and Clocks",
    description:
      "Observe function calls and control selected time-dependent behavior.",
    content: {
      introduction:
        "Spies observe calls, stubs replace implementations, and fake clocks control timers. Each changes what evidence a test can provide.",
      objectives: [
        "Observe calls with a spy.",
        "Control application timers.",
        "Explain what stubbing excludes from coverage.",
      ],
      sections: [
        {
          title: "Control the save timer",
          paragraphs: [
            "Use the save interaction from the original practice page.",
            "Install the clock before visiting so the application receives the controlled timers.",
            "Advancing fake time does not automatically complete real network requests.",
          ],
          example: {
            title: "Verify the save transition",
            filename: "cypress/e2e/clock.cy.ts",
            code: `it("finishes saving after the timer", () => {
  cy.clock();
  cy.visit("/");

  cy.get('[data-cy="save"]').click();
  cy.get('[data-cy="save-status"]').should("have.text", "Saving");

  cy.tick(600);

  cy.get('[data-cy="save-status"]').should("have.text", "Saved");
  cy.get('[data-cy="save"]').should("not.be.disabled");
});`,
            command: "npx cypress run --spec cypress/e2e/clock.cy.ts",
            expected:
              "The test advances the application timer without waiting for wall-clock time.",
            explanation:
              "The 600ms value verifies this demo's known timer contract.",
          },
        },
        {
          title: "Observe versus replace a function",
          paragraphs: [
            "A spy records calls while allowing the original implementation to run.",
            "A stub replaces the implementation, which is useful for a controlled dependency but excludes that implementation from coverage.",
            "Prefer observable application outcomes unless the call itself is part of the contract.",
          ],
        },
      ],
      mistakes: [
        "Claiming a stubbed dependency was tested.",
        "Installing timer control after the relevant timer was scheduled.",
        "Assuming ticking a clock completes network traffic.",
      ],
      exercise: {
        title: "Observe a function call",
        tasks: [
          "Run this isolated spy example.",
          "Check both the call and the original function's effect.",
        ],
        solution: {
          title: "Record a call without replacing it",
          filename: "cypress/e2e/spy.cy.ts",
          code: `it("observes the original implementation", () => {
  const notifier = {
    last: "",
    send(message: string) {
      this.last = message;
    },
  };

  cy.spy(notifier, "send").as("send");

  cy.then(() => {
    notifier.send("Saved");
    expect(notifier.last).to.equal("Saved");
  });

  cy.get("@send").should("have.been.calledOnceWith", "Saved");
});`,
          command: "npx cypress run --spec cypress/e2e/spy.cy.ts",
          expected:
            "The spy records the call and the original function updates last.",
          explanation:
            "This demonstrates spy behavior using a test-owned object.",
        },
      },
      takeaway:
        "Choose observation or replacement deliberately and preserve clarity about what actually executed.",
    },
  },
  {
    number: 18,
    slug: "origins-and-browser-boundaries",
    title: "Origins and Browser Boundaries",
    description:
      "Understand shadow DOM, frames, origins, and multi-tab limitations.",
    content: {
      introduction:
        "Browser boundaries affect how tests can interact with content. Identify the boundary before selecting a workaround.",
      objectives: [
        "Query an open shadow root.",
        "Recognize same-origin frame access.",
        "Understand when cy.origin is needed.",
        "Avoid claiming multi-tab coverage from a same-tab workaround.",
      ],
      sections: [
        {
          title: "Query an open shadow root",
          paragraphs: [
            "This example serves a controlled page containing an open shadow root.",
            "Closed shadow roots do not expose the same query interface.",
          ],
          example: {
            title: "Read shadow content",
            filename: "cypress/e2e/shadow.cy.ts",
            code: `it("reads an open shadow root", () => {
  cy.intercept("GET", "http://127.0.0.1:4173/", {
    headers: { "content-type": "text/html" },
    body:
      '<div data-cy="host"></div>' +
      '<script>' +
      'document.querySelector("[data-cy=host]")' +
      '.attachShadow({mode:"open"}).innerHTML = "<button>Confirm</button>";' +
      '</script>',
  });

  cy.visit("/");

  cy.get('[data-cy="host"]')
    .shadow()
    .find("button")
    .should("have.text", "Confirm");
});`,
            command: "npx cypress run --spec cypress/e2e/shadow.cy.ts",
            expected: "The button inside the open shadow root is found.",
            explanation: "The test traverses an explicit DOM boundary.",
          },
        },
        {
          title: "Frames and origins",
          paragraphs: [
            "Same-origin iframe content can be accessed after its document has loaded. Re-query if navigation replaces that document.",
            "An origin includes scheme, hostname, and port. Use cy.origin for supported top-level cross-origin workflows, passing serializable data through args instead of assuming closure access.",
            "cy.origin is not a general solution for automating cross-origin iframes.",
          ],
        },
        {
          title: "Tabs and external services",
          paragraphs: [
            "Cypress's normal workflow does not manage multiple browser tabs like Playwright.",
            "Checking a link's destination or following it in the same tab can test part of a contract, but does not establish real new-tab behavior.",
            "Use controlled environments for external login flows and choose a suitable tool when the browser boundary is central to the requirement.",
          ],
        },
      ],
      mistakes: [
        "Treating shadow DOM as an ordinary descendant tree.",
        "Assuming cy.origin grants access to any cross-origin iframe.",
        "Removing target=_blank and claiming the new-tab workflow was verified.",
      ],
      exercise: {
        title: "Verify the shadow button is actionable",
        tasks: [
          "Add the assertion below to the shadow example.",
          "Explain why this still does not verify a business operation.",
        ],
        solution: {
          title: "Inspect control state",
          filename: "cypress/e2e/shadow.cy.ts — append inside the test",
          code: `cy.get('[data-cy="host"]')
  .shadow()
  .find("button")
  .should("be.visible")
  .and("not.be.disabled");`,
          command: "npx cypress run --spec cypress/e2e/shadow.cy.ts",
          expected: "The shadow button is visible and enabled.",
          explanation:
            "There is no application handler in this demo, so no business result is claimed.",
        },
      },
      takeaway:
        "Understand the browser boundary and state accurately what the chosen technique verifies.",
    },
  },
  {
    number: 19,
    slug: "debugging",
    title: "Debugging Cypress Tests",
    description:
      "Investigate failures using command logs and browser evidence.",
    content: {
      introduction:
        "Find the earliest divergence from the expected workflow before changing selectors, assertions, or timeouts.",
      objectives: [
        "Inspect a failing command.",
        "Distinguish test and application failures.",
        "Reproduce a controlled mismatch.",
      ],
      sections: [
        {
          title: "Start with a passing reference",
          paragraphs: [
            "Use open mode to inspect the command log and available snapshots.",
            "A command snapshot is evidence from execution, not a complete replay of the application.",
            "Browser developer tools help investigate console errors, DOM state, and requests.",
          ],
          example: {
            title: "Inspect a save workflow",
            filename: "cypress/e2e/debugging.cy.ts",
            code: `it("shows a save confirmation", () => {
  cy.visit("/");
  cy.get('[data-cy="save"]').click();
  cy.get('[data-cy="save-status"]').should("have.text", "Saved");
});`,
            command: "npx cypress open --e2e",
            expected: "Select debugging.cy.ts to observe the passing workflow.",
            explanation:
              "Inspect the click and subsequent status assertion in the command log.",
          },
        },
        {
          title: "Classify the evidence",
          paragraphs: [
            "Check prerequisites before blaming the final assertion.",
            "Investigate whether the problem is application behavior, test logic, data, or environment availability.",
            "cy.pause can help an interactive investigation; remove it before unattended execution.",
            "Do not globally suppress uncaught exceptions just to obtain a green run.",
          ],
        },
      ],
      mistakes: [
        "Adding waits before understanding the failure.",
        "Changing expected values solely to match current output.",
        "Suppressing application exceptions indiscriminately.",
      ],
      exercise: {
        title: "Investigate an incorrect expectation",
        tasks: [
          "Change Saved to Published temporarily.",
          "Run the spec and inspect expected versus actual text.",
          "Restore Saved and verify the normal run.",
        ],
        solution: {
          title: "Run the focused check",
          filename: "Terminal — Cypress practice project",
          code: `npx cypress run --spec cypress/e2e/debugging.cy.ts`,
          command: "npx cypress run --spec cypress/e2e/debugging.cy.ts",
          expected:
            "The deliberate mismatch fails; restoring the expected value passes.",
          explanation:
            "In a real failure, confirm the requirement before changing the expectation.",
        },
      },
      takeaway:
        "Use evidence to locate the cause, then verify the fix under normal execution conditions.",
    },
  },
  {
    number: 20,
    slug: "reporting",
    title: "Reports and Failure Evidence",
    description:
      "Collect machine-readable results and useful browser evidence.",
    content: {
      introduction:
        "Reports should explain what ran, what failed, and what remains uncertain.",
      objectives: [
        "Generate JUnit results.",
        "Collect screenshots.",
        "Separate evidence from assertions.",
      ],
      sections: [
        {
          title: "Generate JUnit XML",
          paragraphs: [
            "The built-in JUnit reporter can produce results for CI tools.",
            "The hash in the filename prevents different specs from overwriting the same result file.",
            "Clean or separate report directories between independent runs when aggregating results.",
          ],
          example: {
            title: "Generate report files",
            filename: "Terminal — Cypress practice project",
            code: `npx cypress run --reporter junit --reporter-options "mochaFile=reports/results-[hash].xml,toConsole=true"`,
            command:
              'npx cypress run --reporter junit --reporter-options "mochaFile=reports/results-[hash].xml,toConsole=true"',
            expected: "The run writes JUnit XML files under reports.",
            explanation: "JUnit is machine-readable XML, not an HTML report.",
          },
        },
        {
          title: "Capture relevant screenshots",
          paragraphs: [
            "Cypress normally captures screenshots for failures in run mode. Explicit screenshots can document a meaningful state.",
            "A screenshot does not replace an assertion and may expose application data.",
            "Report skipped and retry-dependent tests alongside failures and passes.",
          ],
          example: {
            title: "Capture the checked page",
            filename: "cypress/e2e/reporting.cy.ts",
            code: `it("captures the practice shop", () => {
  cy.visit("/");
  cy.get("h1").should("have.text", "SDET Practice Shop");
  cy.screenshot("practice-shop-ready");
});`,
            command: "npx cypress run --spec cypress/e2e/reporting.cy.ts",
            expected:
              "The test passes and writes a screenshot under cypress/screenshots.",
            explanation:
              "The screenshot records context after the heading assertion.",
          },
        },
      ],
      mistakes: [
        "Treating an image as proof of an unasserted outcome.",
        "Overwriting report files from multiple specs.",
        "Publishing sensitive screenshots without review.",
      ],
      exercise: {
        title: "Collect a failing result",
        tasks: [
          "Temporarily change the heading expectation.",
          "Run with the JUnit reporter.",
          "Inspect the XML and failure screenshot.",
          "Restore the correct expectation.",
        ],
        solution: {
          title: "Produce focused evidence",
          filename: "Terminal — Cypress practice project",
          code: `npx cypress run --spec cypress/e2e/reporting.cy.ts --reporter junit --reporter-options "mochaFile=reports/results-[hash].xml"`,
          command:
            'npx cypress run --spec cypress/e2e/reporting.cy.ts --reporter junit --reporter-options "mochaFile=reports/results-[hash].xml"',
          expected:
            "The deliberate failure produces a failing report and screenshot.",
          explanation:
            "Retain the failing status while preserving evidence for diagnosis.",
        },
      },
      takeaway:
        "Provide actionable results and relevant evidence without overstating coverage.",
    },
  },
  {
    number: 21,
    slug: "ci-execution",
    title: "CI Execution",
    description:
      "Start the application, run Cypress in GitHub Actions, and retain results.",
    content: {
      introduction:
        "A CI job must prepare dependencies and wait for the application before running browser tests.",
      objectives: [
        "Install locked dependencies.",
        "Coordinate server startup and shutdown.",
        "Run browser checks in GitHub Actions.",
        "Preserve artifacts after failures.",
      ],
      sections: [
        {
          title: "Add a server lifecycle helper",
          paragraphs: [
            "Install start-server-and-test in the practice project and commit the updated lockfile.",
            "The helper starts the server, waits for an HTTP response, executes tests, and stops the server afterward.",
            "Stop any manually running server on port 4173 before using this command.",
          ],
          example: {
            title: "Prepare an unattended run",
            filename: "Terminal — Cypress practice project",
            code: `npm install --save-dev start-server-and-test
npx start-server-and-test "node server.mjs" http-get://127.0.0.1:4173 "cypress run --browser chrome"`,
            command:
              'npx start-server-and-test "node server.mjs" http-get://127.0.0.1:4173 "cypress run --browser chrome"',
            expected:
              "The helper runs the application and tests, then stops the application.",
            explanation:
              "Chrome must be installed. The remaining examples explicitly select it.",
          },
        },
        {
          title: "Create a GitHub workflow",
          paragraphs: [
            "Place this workflow in the practice repository, not the Learning Hub.",
            "Keep synthetic demo credentials confined to the local application. Real credentials belong in the CI secret store.",
            "Ensure all deliberately failing exercises are restored before running the full suite.",
          ],
          example: {
            title: "Run and retain evidence",
            filename: ".github/workflows/cypress.yml",
            code: `name: Cypress checks

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
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: npm
      - run: npm ci
      - run: npx cypress install
      - run: npx cypress verify
      - run: npx tsc --noEmit
      - name: Run checks
        run: >
          npx start-server-and-test
          "node server.mjs"
          http-get://127.0.0.1:4173
          "cypress run --browser chrome --reporter junit --reporter-options mochaFile=reports/results-[hash].xml"
      - name: Upload evidence
        if: \${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: cypress-evidence
          path: |
            reports/
            cypress/screenshots/
            cypress/videos/
          if-no-files-found: warn
          retention-days: 7`,
            command:
              'npx start-server-and-test "node server.mjs" http-get://127.0.0.1:4173 "cypress run --browser chrome"',
            expected:
              "The workflow runs tests and uploads available evidence without masking failures.",
            explanation:
              "The GitHub-hosted Ubuntu runner supplies Chrome. Verify browser availability when changing runner types.",
          },
        },
      ],
      mistakes: [
        "Starting tests before the application is ready.",
        "Using npm ci without a matching lockfile.",
        "Ignoring type checking.",
        "Suppressing failed test exit codes.",
      ],
      exercise: {
        title: "Verify local and CI execution",
        tasks: [
          "Run the lifecycle command locally.",
          "Commit the workflow to the practice repository.",
          "Inspect the GitHub Actions run and its artifact.",
        ],
        solution: {
          title: "Check prerequisites",
          filename: "Terminal — Cypress practice project",
          code: `npm ci
npx tsc --noEmit
npx start-server-and-test "node server.mjs" http-get://127.0.0.1:4173 "cypress run --browser chrome"`,
          command:
            'npx start-server-and-test "node server.mjs" http-get://127.0.0.1:4173 "cypress run --browser chrome"',
          expected: "The application and suite complete successfully.",
          explanation:
            "Local success prepares the workflow; the actual CI run must also be checked.",
        },
      },
      takeaway:
        "Coordinate application readiness, preserve failure status, and retain useful evidence.",
    },
  },
  {
    number: 22,
    slug: "docker-and-execution-strategy",
    title: "Docker and Execution Strategy",
    description: "Package the browser runtime and plan independent execution.",
    content: {
      introduction:
        "Docker standardizes the runtime. Browser selection and parallel execution still need deliberate coverage and data-isolation decisions.",
      objectives: [
        "Build a Cypress test image.",
        "Run the application and tests together.",
        "Preserve reports outside the container.",
        "Distinguish browser coverage from parallel distribution.",
      ],
      sections: [
        {
          title: "Choose a browser image",
          paragraphs: [
            "The cypress/browsers image includes Node, browsers, and operating-system dependencies. This Dockerfile installs the project's locked Cypress package.",
            "The default latest tag is convenient for initial exploration but changes over time. Use a reviewed full tag or digest for repeatable CI.",
            "The build command below resolves the pulled image to a digest before building.",
          ],
          example: {
            title: "Create the test image",
            filename: "Dockerfile",
            code: `ARG CYPRESS_IMAGE=cypress/browsers:latest
FROM \${CYPRESS_IMAGE}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
RUN npx cypress install
RUN npx cypress verify

COPY . .
RUN npx tsc --noEmit

ENV CI=true

CMD ["npx", "start-server-and-test", "node server.mjs", "http-get://127.0.0.1:4173", "cypress run --browser chrome --reporter junit --reporter-options mochaFile=reports/results-[hash].xml"]
`,
            command: "docker build -t sdet-cypress .",
            expected:
              "Docker creates an image containing the practice project and Cypress runtime.",
            explanation:
              "Create .dockerignore before building. start-server-and-test must already be in the lockfile from lesson 21.",
          },
        },
        {
          title: "Exclude host files",
          paragraphs: [
            "Keep host dependencies, generated evidence, and secret files outside the build context.",
          ],
          example: {
            title: "Create Docker exclusions",
            filename: ".dockerignore",
            code: `node_modules
.git
.env
.env.*
.npmrc
reports
cypress/screenshots
cypress/videos
cypress/downloads
`,
            command: "docker build -t sdet-cypress .",
            expected:
              "The image uses container-installed dependencies and excludes listed local files.",
            explanation:
              "Review additional project-specific secret paths before building.",
          },
        },
        {
          title: "Build and run with retained output",
          paragraphs: [
            "Start Docker Desktop first. These commands use a macOS or Linux shell.",
            "The application starts inside the same container as Cypress, so its loopback address is reachable.",
            "A separately hosted application requires an address reachable from the container; localhost does not mean your laptop.",
          ],
          example: {
            title: "Run the container",
            filename: "Terminal — Cypress practice project",
            code: `docker pull cypress/browsers:latest
CYPRESS_IMAGE_REF=$(docker image inspect cypress/browsers:latest --format '{{index .RepoDigests 0}}')
docker build --build-arg CYPRESS_IMAGE="$CYPRESS_IMAGE_REF" -t sdet-cypress .
mkdir -p reports cypress/screenshots cypress/videos
docker run --rm --init --shm-size=2g -v "$PWD/reports:/app/reports" -v "$PWD/cypress/screenshots:/app/cypress/screenshots" -v "$PWD/cypress/videos:/app/cypress/videos" sdet-cypress`,
            command:
              'docker run --rm --init --shm-size=2g -v "$PWD/reports:/app/reports" -v "$PWD/cypress/screenshots:/app/cypress/screenshots" -v "$PWD/cypress/videos:/app/cypress/videos" sdet-cypress',
            expected:
              "The application and tests execute inside Docker, and available evidence remains on the host.",
            explanation:
              "Record the reviewed digest for later builds. Rebuild after changing test source.",
          },
        },
        {
          title: "Plan execution capacity",
          paragraphs: [
            "Running Chrome and Firefox checks browser compatibility. It does not automatically divide the suite.",
            "Cypress Cloud provides recorded-run orchestration for supported parallel workflows. Separate CI jobs can also run explicitly disjoint spec groups without that service.",
            "Do not assume a Playwright-style shard flag exists. Make coverage accounting and data ownership explicit.",
            "More workers cannot fix shared mutable accounts or an overloaded environment.",
          ],
        },
      ],
      mistakes: [
        "Copying host node_modules into the image.",
        "Using an unrecorded moving image tag for reproducible CI.",
        "Losing reports when the container exits.",
        "Confusing multiple browsers with suite sharding.",
      ],
      exercise: {
        title: "Inspect the container environment",
        tasks: [
          "Build the image.",
          "Inspect the available browsers.",
          "Run the normal container command.",
          "Confirm the report folder contains results.",
        ],
        solution: {
          title: "Inspect browser availability",
          filename: "Terminal — Cypress practice project",
          code: `docker run --rm --init sdet-cypress npx cypress info`,
          command: "docker run --rm --init sdet-cypress npx cypress info",
          expected:
            "Cypress reports the container's available browsers and environment.",
          explanation:
            "This overrides the image's normal test command for inspection.",
        },
      },
      takeaway:
        "Pin a reviewed runtime, preserve evidence, and scale only independently executable tests.",
    },
  },
  {
    number: 23,
    slug: "shopping-automation-project",
    title: "Practice: Shopping Application Automation",
    description:
      "Verify a connected checkout workflow with isolated sessions and API evidence.",
    content: {
      introduction:
        "Combine browser actions with a real local API. Verify both the confirmation and the order stored by the service.",
      objectives: [
        "Translate checkout rules into assertions.",
        "Prepare independent sessions.",
        "Observe a real order request without stubbing it.",
        "Verify saved values and rejected input.",
      ],
      sections: [
        {
          title: "Define the contract and scope",
          paragraphs: [
            "Use the server from lesson 13. A keyboard costs 2500 cents and quantities must be integers from 1 through 5.",
            "Each fresh login owns a separate in-memory order collection. Tests below log in independently rather than sharing a cached mutable session.",
            "This project covers the local UI, HTTP API, and in-memory storage. It does not cover a database, payment provider, or production authentication.",
          ],
        },
        {
          title: "Create the checkout page",
          paragraphs: [
            "Create checkout.html at the practice project root. The server exposes it at /checkout.",
            "The browser sends a real POST request. The tests will observe that request without replacing its response.",
          ],
          example: {
            title: "Local checkout interface",
            filename: "checkout.html",
            code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Practice checkout</title>
</head>
<body>
  <h1>Keyboard checkout</h1>
  <p>Unit price: $25.00</p>

  <form id="checkout">
    <label for="quantity">Quantity</label>
    <input id="quantity" data-cy="quantity" type="number"
      min="1" max="5" step="1" value="1" required>
    <button type="submit" data-cy="place-order">Place order</button>
  </form>

  <p data-cy="confirmation" role="status">Ready</p>

  <script>
    document.getElementById("checkout").addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = document.querySelector("[data-cy=place-order]");
      const status = document.querySelector("[data-cy=confirmation]");
      button.disabled = true;

      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: Number(document.getElementById("quantity").value)
          })
        });

        const order = await response.json();
        if (!response.ok) throw new Error("Order rejected");

        status.textContent = "Order confirmed";
        status.dataset.orderId = order.id;
      } catch {
        status.textContent = "Unable to place order";
      } finally {
        button.disabled = false;
      }
    });
  </script>
</body>
</html>`,
            command: "node server.mjs",
            expected:
              "The server can serve the checkout page. Tests establish the session before submitting.",
            explanation:
              "The form provides browser constraints, while the server independently validates quantity.",
          },
        },
        {
          title: "Verify both UI and stored order",
          paragraphs: [
            "The helper returns a Cypress chain. It does not use async/await.",
            "An observing intercept captures the created order ID. A separate API read checks the stored result.",
            "The afterEach logout releases the demo session during normal execution. Restarting the local server clears any resources left by an interrupted run.",
          ],
          example: {
            title: "Connected checkout checks",
            filename: "cypress/e2e/shopping.cy.ts",
            code: `export {};

function placeOrder(quantity: number) {
  cy.get('[data-cy="quantity"]').clear();
  cy.get('[data-cy="quantity"]').type(String(quantity));
  return cy.get('[data-cy="place-order"]').click();
}

describe("Shopping workflow", () => {
  beforeEach(() => {
    cy.request("POST", "/api/login", {
      username: "demo",
      password: "local-demo",
    }).its("status").should("equal", 200);
  });

  afterEach(() => {
    cy.request("POST", "/api/logout");
  });

  for (const scenario of [
    { quantity: 1, total: 2500 },
    { quantity: 2, total: 5000 },
    { quantity: 5, total: 12500 },
  ]) {
    it("saves quantity " + scenario.quantity, () => {
      cy.intercept("POST", "**/api/orders").as("createOrder");
      cy.visit("/checkout");

      placeOrder(scenario.quantity);

      cy.wait("@createOrder").then(({ request, response }) => {
        expect(request.body.quantity).to.equal(scenario.quantity);
        expect(response?.statusCode).to.equal(201);

        const id: unknown = response?.body.id;
        expect(id).to.be.a("string");

        if (typeof id !== "string") {
          throw new Error("Missing created order ID");
        }

        cy.get('[data-cy="confirmation"]')
          .should("have.text", "Order confirmed")
          .and("have.attr", "data-order-id", id);

        cy.request("/api/orders").then((saved) => {
          expect(saved.status).to.equal(200);
          expect(saved.body).to.deep.equal([
            {
              id,
              quantity: scenario.quantity,
              totalCents: scenario.total,
            },
          ]);
        });
      });
    });
  }

  it("rejects excessive quantity without saving", () => {
    cy.request({
      method: "POST",
      url: "/api/orders",
      body: { quantity: 6 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        error: "Quantity must be an integer from 1 to 5",
      });
    });

    cy.request("/api/orders").its("body").should("deep.equal", []);
  });
});`,
            command: "npx cypress run --spec cypress/e2e/shopping.cy.ts",
            expected:
              "Three valid quantities create correct orders. The invalid quantity creates none.",
            explanation:
              "The API rejection test bypasses browser constraints and directly checks server validation.",
          },
        },
        {
          title: "Assess remaining risks",
          paragraphs: [
            "Consider fractional quantities, malformed requests, unauthorized access, repeated submissions, and interrupted requests.",
            "The happy-path UI test does not establish duplicate-submission protection or retry idempotency.",
            "A real application needs persistent storage checks and resource isolation based on its actual business model.",
          ],
        },
      ],
      mistakes: [
        "Checking only the confirmation message.",
        "Stubbing order creation while claiming real storage coverage.",
        "Sharing a mutable cached session across checkout tests.",
        "Assuming browser validation protects the server.",
      ],
      exercise: {
        title: "Add fractional-quantity rejection",
        tasks: [
          "Append the test inside Shopping workflow.",
          "Run the full spec.",
          "Confirm five independently reported tests pass.",
        ],
        solution: {
          title: "Reject a fractional quantity",
          filename: "cypress/e2e/shopping.cy.ts — inside describe",
          code: `it("rejects a fractional quantity", () => {
  cy.request({
    method: "POST",
    url: "/api/orders",
    body: { quantity: 1.5 },
    failOnStatusCode: false,
  }).its("status").should("equal", 400);

  cy.request("/api/orders").its("body").should("deep.equal", []);
});`,
          command: "npx cypress run --spec cypress/e2e/shopping.cy.ts",
          expected:
            "The fractional request is rejected and its session remains free of orders.",
          explanation: "Independent session setup keeps the new case isolated.",
        },
      },
      takeaway:
        "Verify connected outcomes, own the test data, and explain exactly which system boundaries were exercised.",
    },
  },
];
