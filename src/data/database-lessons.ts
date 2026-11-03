import { databaseCourseLessons } from "./database-course-lessons";

export type DatabaseExample = {
  title: string;
  filename: string;
  code: string;
  command: string;
  expected: string;
  explanation: string;
};

export type DatabaseSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: DatabaseExample;
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type DatabaseLessonData = {
  number: number;
  slug: string;
  title: string;
  description: string;
  content?: {
    introduction: string;
    objectives: string[];
    sections: DatabaseSection[];
    mistakes: string[];
    exercise: {
      title: string;
      tasks: string[];
      solution: DatabaseExample;
    };
    takeaway: string;
  };
};

export const databaseLessons: DatabaseLessonData[] = [
  {
    number: 1,
    slug: "introduction",
    title: "Introduction to Database Testing",
    description:
      "Understand how database checks help verify application behavior and data integrity.",
    content: {
      introduction:
        "A successful screen or API response does not always prove that the application saved the correct data. Database testing checks stored values, relationships, constraints, and changes against explicit requirements.",
      objectives: [
        "Explain the purpose of database testing.",
        "Distinguish SQL from PostgreSQL.",
        "Identify tables, rows, columns, and relationships.",
        "Plan database checks for a shopping workflow.",
        "Recognize when direct database access is appropriate.",
      ],
      sections: [
        {
          title: "SQL and PostgreSQL",
          paragraphs: [
            "SQL is a language used to define, query, and modify relational data. PostgreSQL is a database management system that supports SQL along with its own features.",
            "A table contains rows and named columns. Each column has a data type. For example, a products table might contain an identifier, a name, and a price for every product.",
            "A query's row order is not guaranteed unless you request an appropriate ORDER BY. Tests should not depend on an accidental display order.",
          ],
        },
        {
          title: "The shopping data model",
          paragraphs: [
            "Throughout this course, we will use customers, products, orders, and order items. The following is a conceptual model; we will create the actual schema in later lessons.",
            "An order item records the purchased quantity and the price at the time of purchase. Historical order totals should not change simply because a product's current price changes.",
          ],
          table: {
            headers: ["Table", "Purpose", "Example validation"],
            rows: [
              [
                "customers",
                "Stores customer records.",
                "An order belongs to the intended customer.",
              ],
              [
                "products",
                "Stores product information.",
                "A product has the expected price and stock.",
              ],
              [
                "orders",
                "Stores order-level information.",
                "The order has the correct customer and status.",
              ],
              [
                "order_items",
                "Stores the products purchased in an order.",
                "Quantity and purchase-time price are correct.",
              ],
            ],
          },
        },
        {
          title: "What should an SDET validate?",
          paragraphs: [
            "Begin with a requirement and identify the stored evidence needed to verify it. Checking that a row exists is useful, but it is rarely sufficient.",
          ],
          bullets: [
            "Correctness: stored values match the expected business outcome.",
            "Relationships: related records point to the correct entities.",
            "Constraints: invalid data is rejected at the appropriate boundary.",
            "Atomicity: operations that must succeed together do not leave partial results.",
            "Persistence: committed data can be retrieved through an appropriate independent read.",
            "Rejected operations: invalid requests leave no unintended changes.",
          ],
        },
        {
          title: "Example: placing an order",
          paragraphs: [
            "Suppose the requirement says that purchasing two keyboards priced at 2,500 cents each creates one order worth 5,000 cents, excluding tax and shipping.",
            "Capture the order identifier returned by the application. Use it to locate the relevant records instead of selecting the newest order or counting every order in a shared database.",
          ],
          example: {
            title: "Turn a requirement into database checks",
            filename: "Order validation plan — no SQL setup required",
            code: `Given:
  Customer: customer-101
  Product: keyboard-101
  Unit price: 2500 cents
  Quantity: 2

Expected:
  One order for customer-101
  One order item for keyboard-101
  Stored quantity: 2
  Purchase-time unit price: 2500 cents
  Total: 5000 cents

Correlation:
  Use the order ID returned by the application.`,
            command:
              "Read the scenario and identify which table provides evidence for each expected result.",
            expected:
              "Checks cover the order, its owner, its item, quantity, and monetary values.",
            explanation:
              "Expected values come from the requirement and controlled inputs. Copying the actual database result into the expected result would not independently verify correctness.",
          },
        },
        {
          title: "Choosing the right testing boundary",
          paragraphs: [
            "Direct database checks are useful for integration tests when the test environment grants appropriate access. They also couple tests to the database schema, so use them intentionally.",
            "An API test can verify a public service contract without reading internal tables. Add database assertions when persistence, relationships, or internal data rules are specifically part of the test objective.",
            "Database credentials belong in a controlled server or test-runner environment. They must not be embedded in browser code or this tutorial website.",
            "Our earlier API practice server stores orders in memory. It does not currently write to PostgreSQL. A later integration lesson will explicitly introduce a database-backed service.",
          ],
        },
      ],
      mistakes: [
        "Assuming an HTTP success response proves the correct data was saved.",
        "Reading an arbitrary latest row instead of using the test's identifier.",
        "Depending on row order without an appropriate ORDER BY.",
        "Using current product prices to validate historical purchase prices.",
        "Changing shared data that the test does not own.",
        "Assuming a rollback on one connection undoes application writes committed through another connection.",
      ],
      exercise: {
        title: "Design checks for an accepted and rejected order",
        tasks: [
          "List the records to inspect after purchasing two keyboards.",
          "Calculate the expected total using a price of 2,500 cents.",
          "Explain how you will locate only the order created by your test.",
          "Plan a check for quantity zero, assuming the API contract rejects it.",
        ],
        solution: {
          title: "Example validation plan",
          filename: "Database test scenarios",
          code: `Scenario 1: Valid order
- Capture the returned order ID.
- Find that order and confirm its customer.
- Find its order item.
- Assert product, quantity 2, and unit price 2500.
- Assert total 5000 cents.

Scenario 2: Rejected quantity
- Use a unique request correlation value if supported.
- Submit quantity 0.
- Assert the documented rejection.
- Verify no order or order item was created for that request.
- Verify any related stock change did not occur.`,
          command:
            "Compare your plan with this example. No database installation is needed for this lesson.",
          expected:
            "The plan covers correct stored data and the absence of unintended changes after rejection.",
          explanation:
            "A reliable test identifies its own records and verifies both positive and negative outcomes against explicit requirements.",
        },
      },
      takeaway:
        "Database testing connects requirements to stored evidence. Use controlled data, precise identifiers, and independent expected results.",
    },
  },
  ...databaseCourseLessons,
];
