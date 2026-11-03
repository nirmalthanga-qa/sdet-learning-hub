import { apiCourseLessons } from "./api-course-lessons";

export type ApiExample = {
  title: string;
  filename: string;
  code: string;
  command: string;
  expected: string;
  explanation: string;
};

export type ApiSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: ApiExample;
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type ApiLessonData = {
  number: number;
  slug: string;
  title: string;
  description: string;
  content?: {
    introduction: string;
    objectives: string[];
    sections: ApiSection[];
    mistakes: string[];
    exercise: {
      title: string;
      tasks: string[];
      solution: ApiExample;
    };
    takeaway: string;
  };
};

export const apiLessons: ApiLessonData[] = [
  {
    number: 1,
    slug: "introduction",
    title: "Introduction to API Testing",
    description:
      "Understand API boundaries, contracts, and meaningful service checks.",
    content: {
      introduction:
        "An API exposes operations that other software can use. API testing checks those operations directly, including their inputs, outputs, access rules, and effects on application state.",
      objectives: [
        "Explain what an API exposes.",
        "Identify the parts of an HTTP request and response.",
        "Distinguish contract checks from business checks.",
        "Understand the roles of Postman, OpenAPI, and Swagger UI.",
        "Select positive, negative, and access-control scenarios.",
      ],
      sections: [
        {
          title: "What happens behind a user action?",
          paragraphs: [
            "When a shopper opens a product page, the browser may request product information from a service. When the shopper places an order, another request may ask the service to create it.",
            "An API test sends requests without using the application's browser controls. This makes it possible to exercise inputs that the UI might prevent.",
            "API checks do not replace browser testing. They cannot establish that a button is accessible, a page renders correctly, or a complete user journey works through the interface.",
          ],
          bullets: [
            "Read product information.",
            "Create and retrieve an order.",
            "Reject an invalid quantity.",
            "Prevent access to another customer's order.",
          ],
        },
        {
          title: "Read a request and response",
          paragraphs: [
            "The request identifies an operation and supplies any required inputs. The response communicates the result through a status, headers, and sometimes a body.",
            "The following exchange is illustrative. practice.example is a reserved example hostname, not a running course service.",
            "We will set up a controlled practice API in a later lesson before sending real requests.",
          ],
          example: {
            title: "Retrieve a product",
            filename: "Illustrative HTTP exchange — not executable",
            code: `REQUEST

GET /api/products/p1 HTTP/1.1
Host: practice.example
Accept: application/json


RESPONSE

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "p1",
  "name": "Keyboard",
  "priceCents": 2500,
  "currency": "USD",
  "inStock": true
}`,
            command:
              "Read the exchange and identify its method, path, status, headers, and body.",
            expected:
              "You can explain what was requested and which product values were returned.",
            explanation:
              "The example describes a successful retrieval. It does not demonstrate that a real service implements this contract.",
          },
        },
        {
          title: "Check the contract and the business behavior",
          paragraphs: [
            "A contract describes the interface: accepted inputs, response shapes, status codes, and other agreed behavior.",
            "Business checks ask whether the result is correct for the scenario. A numeric price can satisfy the schema while still being the wrong price.",
            "For an order-creation request, useful checks may include the response, the stored order, and whether inventory changed according to the requirement.",
          ],
          bullets: [
            "Transport: did the request reach the expected service?",
            "HTTP: are the status and relevant headers correct?",
            "Structure: do required fields have valid types and constraints?",
            "Business values: are price, quantity, and totals correct?",
            "State: did the operation create or change the intended records?",
            "Access: was the caller permitted to perform the operation?",
          ],
        },
        {
          title: "Know the role of each tool",
          paragraphs: [
            "Postman lets us construct requests, organize collections, and write assertions about responses.",
            "OpenAPI is a machine-readable description of an HTTP API.",
            "Swagger UI presents an OpenAPI document as interactive documentation. Its Try it out capability can call a configured server.",
            "A successful documentation example is not a complete regression suite. We still need explicit scenarios, assertions, and controlled data.",
          ],
        },
        {
          title: "Start with useful scenarios",
          paragraphs: [
            "For retrieving a product, consider a known identifier, an unknown identifier, malformed input, and any relevant access restrictions.",
            "For operations that change data, consider missing fields, boundary values, repeated requests, and unauthorized callers.",
            "Choose expected outcomes from the agreed contract. Do not assume every API uses the same status codes or error format.",
          ],
        },
        {
          title: "Practice with controlled resources",
          paragraphs: [
            "The Learning Hub displays lessons. Requests and scripts run in Postman or the learner's local tools.",
            "Use a dedicated practice environment and synthetic records. Track created identifiers so cleanup affects only records owned by the test.",
            "This course concentrates on HTTP APIs, especially REST-style interfaces. Other API styles exist and may require different techniques.",
          ],
        },
      ],
      mistakes: [
        "Treating a 200 response as complete proof of correctness.",
        "Checking the response schema without checking business values.",
        "Assuming Swagger UI verifies the implementation automatically.",
        "Using shared mutable records without an ownership strategy.",
        "Claiming browser or database coverage from an API response alone.",
      ],
      exercise: {
        title: "Design checks for product retrieval",
        tasks: [
          "Review the illustrative product exchange.",
          "List the HTTP and response-structure checks.",
          "Identify business values that need an independent expected result.",
          "Add an unknown-product scenario.",
          "State which behaviors this retrieval test does not cover.",
        ],
        solution: {
          title: "Example scenario checklist",
          filename: "Practice notes",
          code: `Scenario: Retrieve a known product

Prerequisite:
- Product p1 exists with an agreed price of 2500 cents.

Checks:
- The response uses the agreed success status.
- The Content-Type identifies JSON.
- The product ID is p1.
- The name is Keyboard.
- priceCents is an integer and equals 2500.
- currency is USD.
- inStock is a boolean with the expected value.

Negative scenario:
- Request an unknown product ID.
- Check the status and error body defined by the contract.
- Confirm the response does not contain another product's data.

Not established by this test:
- Browser rendering or accessibility.
- Order creation.
- Payment processing.
- Correct database storage through independent inspection.`,
          command:
            "Write your own checklist, then compare its coverage with this example.",
          expected:
            "The checklist distinguishes response structure, business correctness, and coverage limits.",
          explanation:
            "A test strategy starts with explicit expectations rather than a tool-specific script.",
        },
      },
      takeaway:
        "Test APIs through explicit contracts, meaningful business outcomes, and controlled prerequisites. Tools help execute checks; they do not decide what correctness means.",
    },
  },
  ...apiCourseLessons,
];
