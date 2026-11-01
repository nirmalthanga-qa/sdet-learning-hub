export type FoundationSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type FoundationLessonData = {
  number: number;
  slug: string;
  title: string;
  introduction: string;
  objectives: string[];
  sections: FoundationSection[];
  exercise: {
    title: string;
    scenario: string;
    tasks: string[];
    answers: string[];
  };
  takeaway: string;
  previousSlug: string;
  nextSlug?: string;
};

export const foundationLessons: FoundationLessonData[] = [
  {
    number: 5,
    slug: "test-design-techniques",
    title: "Test Design Techniques",
    introduction:
      "Turn requirements into useful test cases by selecting inputs, combinations, and sequences systematically.",
    objectives: [
      "Apply equivalence partitioning and boundary value analysis.",
      "Use decision tables for combinations of business rules.",
      "Model valid and invalid state transitions.",
      "Combine systematic techniques with exploratory testing.",
    ],
    sections: [
      {
        title: "Why use test design techniques?",
        paragraphs: [
          "Most features allow more inputs and workflows than we can test exhaustively. Test design techniques help us select cases that represent different behaviors and likely failure points.",
          "Start with the expected behavior. If the requirement is unclear, clarify it before deciding which results count as correct.",
        ],
        example:
          "Instead of trying random quantities in the cart, identify the permitted range, invalid input categories, boundaries, and stock-related rules.",
      },
      {
        title: "Equivalence partitioning",
        paragraphs: [
          "Divide inputs into groups expected to receive similar treatment. Select representative values from each relevant group, including invalid groups.",
          "For an integer quantity that must be between 1 and 10 inclusive, values below 1, values from 1 to 10, and values above 10 form useful partitions.",
        ],
        table: {
          headers: ["Partition", "Example", "Expected behavior"],
          rows: [
            ["Below the minimum", "0", "Reject the quantity."],
            [
              "Within the permitted range",
              "5",
              "Accept if stock is sufficient.",
            ],
            ["Above the maximum", "11", "Reject the quantity."],
            [
              "Unsupported input format",
              "1.5 or text",
              "Handle according to the input contract.",
            ],
          ],
        },
        example:
          "A valid-range test does not cover missing input, decimals, or malformed API payloads. Consider those categories separately when the interface permits them.",
      },
      {
        title: "Boundary value analysis",
        paragraphs: [
          "Boundary value analysis focuses on the edges of ordered partitions, where off-by-one errors often occur.",
          "For the integer range 1–10, a useful boundary-focused set is 0, 1, 2, 9, 10, and 11. This checks each limit and its immediate neighbors.",
          "Use meaningful neighbors for the data type. For money, that may be the smallest supported currency unit. For timestamps, clarify precision and timezone.",
        ],
        example:
          "If free shipping begins at ₹500, check totals just below ₹500, exactly ₹500, and just above ₹500 using the application's supported currency precision.",
      },
      {
        title: "Decision table testing",
        paragraphs: [
          "Use a decision table when an outcome depends on combinations of conditions. Each rule describes a combination and its expected action.",
          "Suppose a discount applies only when the code is valid and the minimum spend is met.",
        ],
        table: {
          headers: [
            "Rule",
            "Valid code?",
            "Minimum spend met?",
            "Expected action",
          ],
          rows: [
            ["R1", "Yes", "Yes", "Apply discount."],
            ["R2", "Yes", "No", "Do not apply discount."],
            ["R3", "No", "Yes", "Do not apply discount."],
            ["R4", "No", "No", "Do not apply discount."],
          ],
        },
        example:
          "If two conditions fail together, clarify which message appears. Do not assume the product's error-message priority.",
      },
      {
        title: "State transition testing",
        paragraphs: [
          "Model the states an entity can occupy and the events that move it between states. Test permitted transitions and relevant forbidden transitions.",
          "A successful response alone is insufficient: verify the resulting state and any important side effects.",
        ],
        table: {
          headers: ["Current state", "Event", "Expected result"],
          rows: [
            ["Pending", "Payment succeeds", "Move to Paid."],
            ["Pending", "Customer cancels", "Move to Cancelled."],
            ["Paid", "Order ships", "Move to Shipped."],
            ["Cancelled", "Attempt shipment", "Reject; remain Cancelled."],
          ],
        },
        example:
          "Attempt to ship a cancelled order through the API as well as the UI. Hiding a button does not establish that the server enforces the rule.",
      },
      {
        title: "Exploration and error guessing",
        paragraphs: [
          "Experience can suggest additional checks: repeated clicks, interrupted connections, stale pages, unusual characters, and conflicting actions.",
          "Exploratory testing combines learning, test design, and execution. Give it a focused charter and record observations, evidence, and follow-up questions.",
        ],
        example:
          "Explore cart updates in two tabs. Investigate whether a stale tab can overwrite a newer quantity or display an incorrect total.",
      },
    ],
    exercise: {
      title: "Design tests for a quantity selector",
      scenario:
        "A product allows whole-number quantities from 1 to 5. The current stock is 3. Customers must not order more than the available stock.",
      tasks: [
        "Identify useful valid and invalid partitions.",
        "Choose boundary-focused values.",
        "Describe a test where the catalogue limit passes but the stock rule fails.",
        "Add one exploratory scenario.",
      ],
      answers: [
        "With stock at 3, quantities 1–3 are acceptable, 4–5 exceed stock, and values below 1 or above 5 violate the quantity range. Missing and non-integer input need separate consideration.",
        "Use 0, 1, 2 around the minimum; 2, 3, 4 around stock; and 4, 5, 6 around the catalogue maximum.",
        "Quantity 4 is within 1–5 but exceeds stock 3. Verify rejection and that no order or stock reduction occurs.",
        "Reduce stock after an item enters the cart, then attempt checkout. Verify the system revalidates availability.",
      ],
    },
    takeaway:
      "Choose cases that expose different rules, boundaries, combinations, and state changes. A small, well-designed set can provide more useful evidence than many repetitive checks.",
    previousSlug: "test-levels-and-test-types",
    nextSlug: "requirements-and-acceptance-criteria",
  },
  {
    number: 6,
    slug: "requirements-and-acceptance-criteria",
    title: "Requirements and Acceptance Criteria",
    introduction:
      "Improve quality before implementation by turning vague expectations into clear, testable examples.",
    objectives: [
      "Recognize ambiguity and missing requirements.",
      "Write observable acceptance criteria.",
      "Use Given–When–Then examples appropriately.",
      "Connect requirements to tests and results.",
    ],
    sections: [
      {
        title: "What makes a requirement testable?",
        paragraphs: [
          "A testable requirement describes behavior or a measurable quality condition with enough context to determine whether the outcome is correct.",
          "Words such as fast, easy, secure, or appropriate need clarification. Ask who performs the action, under what conditions, and what outcome is expected.",
        ],
        table: {
          headers: ["Vague statement", "Question to clarify"],
          rows: [
            [
              "Checkout must be fast.",
              "What response-time target, workload, and measurement boundary apply?",
            ],
            [
              "Users can cancel orders.",
              "Which users, which order states, and what refund or stock effects?",
            ],
            [
              "Show an appropriate error.",
              "Which message, where, and how is it announced accessibly?",
            ],
            [
              "Discounts expire at midnight.",
              "Which timezone, and is the expiry instant inclusive or exclusive?",
            ],
          ],
        },
      },
      {
        title: "User stories and acceptance criteria",
        paragraphs: [
          "A user story expresses a need from a user's perspective and provides a starting point for discussion. A sentence alone rarely defines every rule needed for implementation.",
          "Acceptance criteria describe observable conditions for a particular item. Include relevant successful outcomes, rejected actions, boundaries, and side effects.",
        ],
        example:
          "Story: As a customer, I want to cancel an unshipped order so that I can correct a mistaken purchase. Clarify ownership, eligible states, payment handling, inventory restoration, and repeated cancellation requests.",
      },
      {
        title: "Given–When–Then examples",
        paragraphs: [
          "Given describes relevant context, When describes an event, and Then describes observable outcomes. This structure can help people discuss examples consistently.",
          "Using this wording does not require a BDD automation tool. The examples are valuable during conversations and reviews.",
        ],
        table: {
          headers: ["Part", "Example"],
          rows: [
            ["Given", "A customer owns a Paid order that has not shipped."],
            ["When", "The customer cancels the order."],
            ["Then", "The order becomes Cancelled and a confirmation appears."],
            [
              "Additional agreed outcome",
              "The payment reversal is initiated according to the cancellation policy.",
            ],
          ],
        },
        example:
          "Write a separate example for a shipped order: cancellation is refused and the order remains Shipped. Clarify whether a return process should be offered.",
      },
      {
        title: "Questions an SDET should ask",
        paragraphs: [
          "Review requirements with product, development, design, and other relevant specialists. Make unresolved assumptions visible.",
        ],
        bullets: [
          "Who is allowed to perform the action?",
          "What happens with empty, invalid, duplicate, or expired input?",
          "What happens if a dependency times out?",
          "Can users repeat the action or perform it concurrently?",
          "What data must change, and what must stay unchanged?",
          "How should keyboard and assistive-technology users complete the flow?",
          "Which performance, security, or operational expectations apply?",
        ],
      },
      {
        title: "Traceability",
        paragraphs: [
          "Traceability connects a requirement or risk to its test coverage and supporting results. A simple mapping can be enough; it does not require a complicated document.",
          "A linked test is evidence of planned coverage. It does not mean the test has passed or the requirement is fully satisfied.",
        ],
        table: {
          headers: ["Requirement", "Coverage", "Evidence"],
          rows: [
            [
              "Owner can cancel an eligible order.",
              "API and focused UI checks.",
              "Execution results and resulting order state.",
            ],
            [
              "Another user cannot cancel the order.",
              "Authorization checks.",
              "Denied response and unchanged order.",
            ],
            [
              "Shipped orders cannot be cancelled.",
              "State-based checks.",
              "Rejection and unchanged shipment state.",
            ],
          ],
        },
      },
    ],
    exercise: {
      title: "Clarify a password-reset story",
      scenario:
        "The story says: Users should be able to reset their password easily.",
      tasks: [
        "Write four clarification questions.",
        "Write one successful acceptance example.",
        "Write one rejected-action example.",
      ],
      answers: [
        "Ask how identity is verified, how long reset links last, whether a link can be reused, and which password rules apply.",
        "Given a valid unused reset link, when the user submits a compliant password, then the password is updated and the link becomes unusable.",
        "Given an expired link, when the user submits a new password, then the change is rejected and the existing password remains unchanged.",
        "Also discuss account enumeration, session handling, rate limiting, and accessible feedback with the relevant team members.",
      ],
    },
    takeaway:
      "Useful acceptance criteria make expected behavior observable. Clarifying a rule early is often cheaper than discovering conflicting interpretations after implementation.",
    previousSlug: "test-design-techniques",
    nextSlug: "test-strategy-planning-and-risk",
  },
  {
    number: 7,
    slug: "test-strategy-planning-and-risk",
    title: "Test Strategy, Planning, and Risk",
    introduction:
      "Decide what evidence matters, how to obtain it, and where to spend limited testing time.",
    objectives: [
      "Distinguish testing strategy from a delivery-specific plan.",
      "Prioritize coverage using product risk.",
      "Define environments, responsibilities, and completion conditions.",
      "Communicate residual risk when testing is constrained.",
    ],
    sections: [
      {
        title: "Strategy and plan",
        paragraphs: [
          "A test strategy explains the overall approach: important risks, suitable test levels, techniques, automation, environments, and feedback channels.",
          "A test plan applies that approach to a particular scope or delivery period, including activities, responsibilities, dependencies, estimates, and reporting.",
          "Teams may combine these in one lightweight document. The value comes from shared decisions and usable guidance.",
        ],
        example:
          "Strategy: prioritize order and payment integrity using component, API, and selected UI coverage. Release plan: validate the new discount feature on staging with agreed data, owners, and completion conditions.",
      },
      {
        title: "Product risk and project risk",
        paragraphs: [
          "Product risk concerns problems in the delivered software and their consequences. Project risk concerns problems that may prevent effective delivery or testing.",
        ],
        table: {
          headers: ["Risk category", "Example", "Possible response"],
          rows: [
            [
              "Product",
              "Repeated requests create duplicate orders.",
              "Test idempotency and concurrent submissions.",
            ],
            [
              "Product",
              "Users can view another customer's orders.",
              "Prioritize authorization coverage.",
            ],
            [
              "Project",
              "The payment sandbox is frequently unavailable.",
              "Arrange controlled alternatives and reserve real integration validation.",
            ],
            [
              "Project",
              "Only one person understands the test framework.",
              "Pair on maintenance and document essential workflows.",
            ],
          ],
        },
      },
      {
        title: "Prioritize by likelihood and impact",
        paragraphs: [
          "Discuss how likely a failure is and how serious its consequences would be. Consider change size, technical complexity, usage, defect history, and affected users.",
          "A simple score can help compare risks, but it is not a precise probability or a substitute for judgment.",
        ],
        table: {
          headers: ["Failure", "Likelihood", "Impact", "Testing priority"],
          rows: [
            ["Duplicate payment", "Medium", "High", "High"],
            ["Another user's order exposed", "Medium", "High", "High"],
            [
              "Incorrect promotional spacing",
              "Medium",
              "Low",
              "Lower unless it blocks use",
            ],
          ],
        },
        example:
          "A rarely used operation may still deserve high priority if failure causes irreversible data loss.",
      },
      {
        title: "What belongs in a practical test plan?",
        paragraphs: [
          "Keep the plan specific enough to guide execution and short enough to maintain.",
        ],
        bullets: [
          "Objectives, included scope, and explicit exclusions.",
          "Product risks and the reasoning behind priorities.",
          "Test levels, techniques, and manual or automated coverage.",
          "Environment, data, access, and dependency requirements.",
          "Owners, estimates, schedule, and coordination needs.",
          "Conditions for starting, pausing, resuming, and completing testing.",
          "Defect handling, evidence collection, and reporting.",
        ],
      },
      {
        title: "Entry criteria, exit criteria, and residual risk",
        paragraphs: [
          "Entry criteria describe conditions needed to start an activity meaningfully. Examples include an accessible build, usable data, and sufficiently clear requirements.",
          "Exit criteria describe the evidence expected before an activity is considered complete. Examples include completed critical scenarios and reviewed unresolved defects.",
          "When criteria are not met, make the gap visible. The accountable stakeholders should understand remaining risk and any mitigation before making a release decision.",
        ],
        example:
          "The release may have passing core checkout checks but incomplete payment-recovery testing. Report that gap explicitly rather than treating unexecuted checks as passed.",
      },
    ],
    exercise: {
      title: "Plan a release with half the usual test time",
      scenario:
        "A release changes discount calculation, payment retries, and the footer. You have half the normal testing window.",
      tasks: [
        "Identify two high-impact risks.",
        "Choose the first tests to run.",
        "Explain what you would report if testing remains incomplete.",
      ],
      answers: [
        "High-impact risks include duplicate charges during retries and incorrect totals after discounts.",
        "Run targeted payment and calculation checks, relevant integration tests, and critical checkout workflows first.",
        "Assess the footer change for functional or accessibility impact before assigning it lower priority.",
        "Report completed checks, failures, blocked or omitted scenarios, affected risks, and mitigation options. Do not claim complete regression coverage.",
      ],
    },
    takeaway:
      "A good plan connects product risks to evidence, ownership, and decisions. When time changes, revise scope transparently rather than silently dropping coverage.",
    previousSlug: "requirements-and-acceptance-criteria",
    nextSlug: "defect-management",
  },
  {
    number: 8,
    slug: "defect-management",
    title: "Defect Management",
    introduction:
      "Turn unexpected behavior into actionable reports and collaborate on resolution using clear evidence.",
    objectives: [
      "Write reproducible defect reports.",
      "Distinguish severity from priority.",
      "Understand triage and a typical defect lifecycle.",
      "Confirm fixes and assess regression needs.",
    ],
    sections: [
      {
        title: "From observation to defect report",
        paragraphs: [
          "An unexpected result needs investigation. Compare it with the agreed behavior and check whether the cause is a product defect, unclear requirement, test issue, data problem, or environment issue.",
          "You do not need to prove the root cause before reporting a problem. Separate observed facts from your hypotheses.",
        ],
        example:
          "Report that the checkout total differs from the confirmed pricing rule. If you suspect a rounding error, label that as a hypothesis and include the values used.",
      },
      {
        title: "What a useful report contains",
        paragraphs: [
          "A useful defect report helps someone understand the impact and reproduce or investigate the behavior.",
        ],
        bullets: [
          "A concise title naming the action and failure.",
          "Build, environment, browser or client, and relevant configuration.",
          "Preconditions and non-sensitive test data.",
          "Minimal numbered reproduction steps.",
          "Expected and actual results.",
          "Frequency and affected scope, if known.",
          "Relevant screenshots, traces, request IDs, or logs with secrets removed.",
          "Suggested severity, business impact, and related requirements.",
        ],
        table: {
          headers: ["Field", "Example"],
          rows: [
            ["Title", "Expired discount reduces checkout total."],
            [
              "Precondition",
              "Test code SAVE10 expired before the current test time.",
            ],
            ["Steps", "Add a ₹1,000 product; apply SAVE10; inspect total."],
            [
              "Expected",
              "Code is rejected and total remains ₹1,000 before other charges.",
            ],
            ["Actual", "Total becomes ₹900 before other charges."],
            [
              "Evidence",
              "Build identifier, expiry timezone, request/response, and screenshot.",
            ],
          ],
        },
      },
      {
        title: "Severity versus priority",
        paragraphs: [
          "Severity describes the impact of the defect. Priority describes how urgently the team should address it relative to other work.",
          "Use the team's agreed definitions. Neither field should be assigned using appearance alone.",
        ],
        table: {
          headers: [
            "Example",
            "Severity consideration",
            "Priority consideration",
          ],
          rows: [
            [
              "Payment is captured twice.",
              "Financial harm and reconciliation impact.",
              "Usually requires urgent attention.",
            ],
            [
              "Campaign headline contains a typo.",
              "May have limited functional impact.",
              "May be urgent before a major campaign.",
            ],
            [
              "Rare administrative action loses records.",
              "Potentially severe data loss.",
              "Assess exposure, access, and mitigation immediately.",
            ],
          ],
        },
      },
      {
        title: "A typical defect lifecycle",
        paragraphs: [
          "Workflows vary, but a common sequence is Reported → Triaged → In progress → Ready for verification → Closed.",
          "Other outcomes may include Duplicate, Deferred, Not a defect, or Cannot reproduce. Record the reasoning and supporting evidence.",
          "Reopen a defect when verification shows the agreed fix is incomplete. If investigation finds a separate issue, follow the team's policy for linking a new report.",
        ],
        example:
          "When a developer cannot reproduce a discount failure, compare build versions, test account, code expiry, timezone, and request payload together.",
      },
      {
        title: "Triage and fix verification",
        paragraphs: [
          "Triage aligns the team on impact, urgency, ownership, and next actions. Include relevant product and engineering perspectives.",
          "After a fix, rerun the original failing scenario and relevant variations. Select regression checks based on the changed code and affected behavior.",
        ],
        bullets: [
          "Verify the fix on the intended build.",
          "Check important boundaries and rejected actions.",
          "Confirm expected data changes and absence of unwanted side effects.",
          "Attach verification evidence and communicate remaining concerns.",
        ],
      },
    ],
    exercise: {
      title: "Report a duplicate order",
      scenario:
        "Clicking Place order twice quickly creates two orders for the same checkout.",
      tasks: [
        "Write a clear defect title.",
        "Identify the evidence needed.",
        "Describe fix verification and one regression check.",
      ],
      answers: [
        "Title: Repeated Place order submission creates duplicate orders for one checkout.",
        "Capture the build, test account, timestamps, request identifiers, returned order IDs, and reproducible steps. Use test payments.",
        "Repeat rapid submissions and verify the agreed duplicate-prevention behavior, including server-side handling.",
        "Check that a normal single submission still creates an order and that a legitimate later purchase is not incorrectly blocked.",
      ],
    },
    takeaway:
      "Describe observable behavior, demonstrate impact, and provide useful evidence. Defect management is a collaboration process that continues through verification.",
    previousSlug: "test-strategy-planning-and-risk",
    nextSlug: "test-data-and-environments",
  },
  {
    number: 9,
    slug: "test-data-and-environments",
    title: "Test Data and Environments",
    introduction:
      "Create predictable test conditions so results reflect product behavior instead of accidental data and configuration differences.",
    objectives: [
      "Plan representative, isolated test data.",
      "Understand environment configuration and dependency needs.",
      "Manage setup and cleanup safely.",
      "Investigate failures caused by shared state or environment differences.",
    ],
    sections: [
      {
        title: "What is a test environment?",
        paragraphs: [
          "A test environment combines the application, infrastructure, configuration, integrations, accounts, and data needed for testing.",
          "An environment should represent the characteristics relevant to the test. It does not always need to duplicate production completely.",
        ],
        bullets: [
          "Application and service versions.",
          "Database schema and seed data.",
          "Configuration, feature flags, and permissions.",
          "Dependency endpoints and network access.",
          "Browser, operating system, timezone, and locale where relevant.",
        ],
        example:
          "A payment integration test needs a suitable sandbox and credentials. A calculation unit test can run without a payment service.",
      },
      {
        title: "Design representative test data",
        paragraphs: [
          "Choose data to exercise business rules, boundaries, permissions, and state transitions. A single happy-path account rarely covers all relevant behavior.",
          "Prefer synthetic data. If production-derived data is necessary, follow the organization's authorization, minimization, and de-identification requirements.",
        ],
        table: {
          headers: ["Entity", "Useful variations"],
          rows: [
            [
              "User",
              "Different roles, inactive accounts, and separate ownership.",
            ],
            [
              "Product",
              "In stock, out of stock, stock boundary, and inactive listing.",
            ],
            [
              "Discount",
              "Valid, expired, minimum spend unmet, and usage limit reached.",
            ],
            ["Order", "Pending, paid, cancelled, and shipped."],
          ],
        },
      },
      {
        title: "Isolation and parallel execution",
        paragraphs: [
          "Independent tests should control their own mutable data. Shared accounts, carts, files, or orders can cause failures when tests run together.",
          "Use unique identifiers and track the records created by each test or worker. Avoid relying on another test to prepare required state.",
        ],
        example:
          "Two checkout tests using one account may modify the same cart. Separate users or isolated carts prevent that collision.",
      },
      {
        title: "Setup and cleanup",
        paragraphs: [
          "Create prerequisites through approved APIs, fixtures, seed scripts, or other controlled mechanisms. Keep setup failures distinguishable from failures of the feature being tested.",
          "Clean up only records owned by the test. Cleanup should tolerate partially completed setup and should not hide the original failure.",
          "For disposable environments, a controlled reset may be appropriate. Database transactions help only when the test's writes participate in the same transaction boundary.",
        ],
        bullets: [
          "Record created resource identifiers.",
          "Avoid broad deletion in shared environments.",
          "Retain enough evidence to investigate failures.",
          "Use a fallback cleanup process for interrupted runs.",
        ],
      },
      {
        title: "Dependencies, secrets, and environment health",
        paragraphs: [
          "Controlled stubs are useful for deterministic failure scenarios. Real integration checks are still needed to validate relevant behavior against actual dependencies.",
          "Store credentials in suitable secret storage and inject them at runtime. Do not commit them in fixtures or include them in reports.",
          "Before running a dependent suite, check relevant service readiness. A running process is not necessarily ready to accept requests.",
        ],
        example:
          "If checkout fails only in CI, compare the base URL, feature flags, browser versions, test data, network access, timezone, and resource limits before increasing timeouts.",
      },
    ],
    exercise: {
      title: "Fix a parallel-test collision",
      scenario:
        "Two tests pass individually but fail together because both use the same customer account and cart.",
      tasks: [
        "Identify the shared state.",
        "Propose an isolated data strategy.",
        "Describe cleanup after a partially failed test.",
      ],
      answers: [
        "The account's cart contents and quantities are shared mutable state.",
        "Create a dedicated user or cart for each independent test, and use unique data identifiers.",
        "Track resources created successfully and remove only those resources. Preserve the failure evidence even if cleanup also encounters a problem.",
        "If unique accounts are unavailable, explicitly serialize dependent tests as a temporary limitation and document the reduced parallelism.",
      ],
    },
    takeaway:
      "Reliable tests need controlled prerequisites, isolated mutable state, and appropriate environments. Treat data setup and cleanup as maintained engineering code.",
    previousSlug: "defect-management",
    nextSlug: "test-reporting-and-quality-metrics",
  },
  {
    number: 10,
    slug: "test-reporting-and-quality-metrics",
    title: "Test Reporting and Quality Metrics",
    introduction:
      "Explain what the test evidence shows, what remains uncertain, and which decisions require attention.",
    objectives: [
      "Write a useful test execution summary.",
      "Interpret metrics with clear denominators and context.",
      "Distinguish test results from release readiness.",
      "Communicate untested areas and residual risks.",
    ],
    sections: [
      {
        title: "What should a test report answer?",
        paragraphs: [
          "A report should help its audience understand the scope, results, important findings, and remaining uncertainty.",
          "A technical reader may need traces and logs. A release stakeholder needs the affected user journeys, impact, and available options.",
        ],
        bullets: [
          "Which build and environment were tested?",
          "What scope and risks were covered?",
          "What passed, failed, was blocked, or was not run?",
          "Which defects affect important workflows?",
          "What remains untested, and why?",
          "What follow-up, mitigation, or decision is needed?",
        ],
      },
      {
        title: "Useful metrics and their limits",
        paragraphs: [
          "Define each metric before comparing it across runs or teams. Changes in scope, environment, and measurement rules can change its meaning.",
        ],
        table: {
          headers: ["Metric", "What it describes", "Important limitation"],
          rows: [
            [
              "Pass rate",
              "Passed tests divided by an explicitly defined executed-test count.",
              "Does not describe the importance or completeness of coverage.",
            ],
            [
              "Execution completion",
              "Executed tests compared with planned tests.",
              "A high completion rate does not mean the software is acceptable.",
            ],
            [
              "Requirement or risk coverage",
              "Items mapped to relevant tests or evidence.",
              "A link alone does not establish adequate testing.",
            ],
            [
              "First-run failure rate",
              "Failures before retries across a defined set of executions.",
              "Includes both real failures and unstable tests unless classified.",
            ],
            [
              "Escaped defects",
              "Defects found after the relevant test or release stage.",
              "Interpret with severity, usage, and observation period.",
            ],
            [
              "Time to feedback",
              "Elapsed time until useful results are available.",
              "Fast feedback must still be reliable and actionable.",
            ],
          ],
        },
      },
      {
        title: "Calculate and report results clearly",
        paragraphs: [
          "Suppose 100 tests are planned: 80 pass, 5 fail, 10 are blocked, and 5 are not run. If executed means passed or failed, 85 tests executed.",
          "The executed-test pass rate is 80 ÷ 85 × 100, approximately 94.1%. Execution completion is 85 ÷ 100 × 100, or 85%. Report blocked and unrun tests separately.",
          "Neither number alone establishes release readiness. One failed test may represent a duplicate-payment defect.",
        ],
        example:
          "Say: 80 passed, 5 failed, 10 blocked, and 5 not run. Payment retry coverage is blocked by sandbox access. A confirmed duplicate-order defect remains open.",
      },
      {
        title: "Coverage is more than a percentage",
        paragraphs: [
          "Code coverage records which code structures were exercised under a particular measurement. It does not prove that outcomes were asserted correctly.",
          "Requirement coverage, risk coverage, browser coverage, and data coverage describe different things. State which kind you mean.",
          "Avoid treating total test count as a standalone measure of quality. Hundreds of repetitive checks can miss one important authorization rule.",
        ],
      },
      {
        title: "A practical release summary",
        paragraphs: [
          "Connect results to user impact and make a recommendation with its supporting evidence. Release authority depends on the organization's responsibilities.",
        ],
        table: {
          headers: ["Area", "Example summary"],
          rows: [
            [
              "Scope",
              "Discount calculation and checkout regression on build X.",
            ],
            ["Evidence", "Calculation and normal checkout checks pass."],
            ["Open issue", "Repeated submission can create duplicate orders."],
            [
              "Coverage gap",
              "Payment recovery under timeout remains untested.",
            ],
            [
              "Recommendation",
              "Resolve the duplicate-order issue and complete recovery checks before promotion.",
            ],
          ],
        },
      },
    ],
    exercise: {
      title: "Interpret a test run",
      scenario:
        "A suite has 50 planned tests: 40 pass, 2 fail, 5 are blocked, and 3 are not run. One failure allows a user to view another customer's order.",
      tasks: [
        "Calculate the pass rate among executed tests.",
        "Calculate execution completion.",
        "Write a short release-risk statement.",
      ],
      answers: [
        "Executed tests: 40 + 2 = 42. Pass rate: 40 ÷ 42 × 100, approximately 95.2%.",
        "Execution completion: 42 ÷ 50 × 100 = 84%. Report the 5 blocked and 3 unrun checks separately.",
        "A confirmed authorization failure exposes another customer's order. Escalate the issue and recommend resolving it before release; the high pass percentage does not offset this risk.",
      ],
    },
    takeaway:
      "Metrics support decisions when their definitions and limitations are visible. Report important failures and missing evidence alongside successful results.",
    previousSlug: "test-data-and-environments",
    nextSlug: "choosing-what-to-automate",
  },
  {
    number: 11,
    slug: "choosing-what-to-automate",
    title: "Choosing What to Automate",
    introduction:
      "Select automation that delivers dependable feedback and useful coverage at a sustainable maintenance cost.",
    objectives: [
      "Evaluate automation candidates by value and feasibility.",
      "Choose an appropriate test layer.",
      "Understand implementation and maintenance costs.",
      "Keep human judgment and exploration in the testing approach.",
    ],
    sections: [
      {
        title: "Start with the problem automation should solve",
        paragraphs: [
          "Automation is useful when repeatable checks can provide timely, reliable evidence. Begin with the risk or feedback need rather than a target number of automated tests.",
          "A good candidate has an observable expected outcome, controllable prerequisites, and enough repeat value or risk reduction to justify its cost.",
        ],
        example:
          "Automating repeated order-total calculations can provide fast feedback on pricing changes. A one-time visual experiment may benefit more from focused human review.",
      },
      {
        title: "Evaluate candidates",
        paragraphs: [
          "Consider business impact, execution frequency, stability, data control, observability, and maintenance effort together.",
        ],
        table: {
          headers: ["Candidate", "Assessment", "Likely approach"],
          rows: [
            [
              "Pricing rules",
              "High repeat value and precise expected results.",
              "Component or service-level automation.",
            ],
            [
              "Order authorization",
              "High impact and clear permission rules.",
              "API checks with selected UI coverage.",
            ],
            [
              "Critical checkout journey",
              "Important integration and user workflow.",
              "Focused end-to-end checks.",
            ],
            [
              "Rapidly changing prototype",
              "Unstable flow and evolving expectations.",
              "Exploration, then automate stable behavior.",
            ],
            [
              "Visual clarity and ease of use",
              "Requires contextual human judgment.",
              "Human evaluation supported by selected tools.",
            ],
          ],
        },
      },
      {
        title: "Choose the lowest effective test layer",
        paragraphs: [
          "Place a check at a layer that can detect the intended problem with appropriate confidence. Lower-level checks are often faster and easier to diagnose, but they cannot replace all integration or user-flow evidence.",
          "Avoid repeating every business-rule combination through the UI. Test combinations close to the rule and keep selected end-to-end coverage for the connected journey.",
        ],
        example:
          "Test discount boundary values in calculation or API checks. Use a smaller UI set to confirm the customer can apply a code and see the correct total.",
      },
      {
        title: "Think about total cost",
        paragraphs: [
          "Automation cost includes understanding requirements, implementation, review, test data, execution infrastructure, maintenance, and failure investigation.",
          "An illustrative calculation: a manual check takes 10 minutes and runs 30 times, totaling 300 minutes. If automation takes 120 minutes to build and another 60 minutes to maintain and investigate, the simple labor difference is 120 minutes.",
          "This estimate excludes other costs and benefits, such as infrastructure, feedback speed, missed defects, and expanded coverage. Revisit assumptions using actual experience.",
        ],
      },
      {
        title: "Build maintainable automation",
        paragraphs: [
          "A test should fail for a meaningful reason and provide enough evidence to investigate. Passing after repeated retries is not the same as reliable first-run feedback.",
        ],
        bullets: [
          "Use stable selectors, contracts, and domain-level assertions.",
          "Control data and avoid dependencies between tests.",
          "Wait for observable conditions rather than arbitrary delays.",
          "Keep shared abstractions understandable and purposeful.",
          "Collect useful diagnostics while protecting sensitive data.",
          "Assign owners and review recurring failures.",
          "Remove or revise obsolete and redundant tests.",
        ],
      },
      {
        title: "When human testing remains valuable",
        paragraphs: [
          "Exploration, usability evaluation, ambiguous requirements, and new risks benefit from human investigation. Automated accessibility checks also need complementary human checks.",
          "Some behaviors are technically automatable but poor investments at the current stage. Document that decision and revisit it when risk, stability, or execution frequency changes.",
        ],
        example:
          "Use automated checks for form labels and selected keyboard interactions, then evaluate the full purchasing journey with keyboard and relevant assistive technology.",
      },
      {
        title: "Introduce automation incrementally",
        paragraphs: [
          "Start with a small valuable set, run it consistently, and inspect its reliability before expanding.",
        ],
        bullets: [
          "Select a high-value workflow or rule.",
          "Agree on expected behavior and data setup.",
          "Implement focused assertions at suitable layers.",
          "Run locally and in the intended CI environment.",
          "Measure feedback time, failure causes, and maintenance effort.",
          "Expand coverage based on remaining risks.",
        ],
      },
    ],
    exercise: {
      title: "Choose your first automation investment",
      scenario:
        "Your team has a stable pricing API, a critical checkout flow, a frequently redesigned promotional page, and recurring complaints about confusing navigation.",
      tasks: [
        "Choose two strong initial automation candidates.",
        "Choose appropriate test layers.",
        "Identify work that needs human evaluation.",
      ],
      answers: [
        "Prioritize the pricing rules and selected critical checkout behavior based on their impact and repeat value.",
        "Cover pricing combinations at component or API level and use a focused end-to-end checkout test for the connected flow.",
        "Investigate confusing navigation through usability evaluation and exploratory testing.",
        "Keep targeted checks for important promotional behavior, but avoid investing heavily in unstable presentation details until the design settles.",
      ],
    },
    takeaway:
      "Automate valuable, observable behavior at suitable layers. Maintain a balanced approach that includes reliable checks, exploration, and human judgment.",
    previousSlug: "test-reporting-and-quality-metrics",
    nextSlug: "plan-testing-shopping-application",
  },
  {
    number: 12,
    slug: "plan-testing-shopping-application",
    title: "Practice: Plan Testing for a Shopping Application",
    introduction:
      "Bring the course together by creating a practical test plan for a shopping application. Turn requirements into risks, scenarios, data, and release evidence.",
    objectives: [
      "Define scope and clarify assumptions.",
      "Prioritize shopping workflows by product risk.",
      "Apply test design techniques to realistic rules.",
      "Plan data, environments, automation, and reporting.",
      "Create a small test plan you can explain and maintain.",
    ],
    sections: [
      {
        title: "Your assignment",
        paragraphs: [
          "You are the quality engineer for a shopping application preparing its next release. Customers can browse products, manage a cart, sign in, place orders through simulated checkout, and view their order history.",
          "The requirements below describe a fictional exercise. They are the agreed rules for this lesson, rather than a claim about the current behavior of any live application.",
          "Create your own plan before opening the example answers. Use a Markdown document, spreadsheet, or another format your team can maintain.",
        ],
        bullets: [
          "Product listings support search, category filtering, and sorting.",
          "Guests can add products to a cart.",
          "After login, the guest cart merges with the customer's existing cart.",
          "Product quantities must be whole numbers from 1 to 5, inclusive.",
          "Customers cannot order more than the available stock.",
          "Checkout requires authentication and uses simulated payment outcomes.",
          "Successful checkout creates an order and reduces stock.",
          "Customers can view only their own order history.",
        ],
      },
      {
        title: "Clarify the rules before planning",
        paragraphs: [
          "Even this short feature list leaves important questions unanswered. Record the answers with the team before treating them as test expectations.",
          "For this exercise, use the assumptions below. In a real project, confirm them with the responsible stakeholders.",
        ],
        table: {
          headers: ["Area", "Agreed exercise rule"],
          rows: [
            [
              "Search",
              "Matches product names without case sensitivity. Leading and trailing spaces are ignored.",
            ],
            [
              "Combined controls",
              "Search and category filtering apply together. Sorting orders the resulting products.",
            ],
            [
              "Guest-cart merge",
              "Quantities for the same product are added, then capped at the smaller of available stock and 5. Any adjustment is explained to the user.",
            ],
            [
              "Out-of-stock merge",
              "An item with zero available stock is excluded from the merged cart, and the user is informed.",
            ],
            [
              "Stock validation",
              "Stock is checked again during checkout. Adding an item to the cart does not reserve it.",
            ],
            [
              "Failed simulated payment",
              "No order is created, stock is unchanged, and the cart remains available.",
            ],
            [
              "Successful checkout",
              "One order is created, stock is reduced once, and purchased items are removed from the cart.",
            ],
            [
              "Duplicate submission",
              "Repeated submission of the same checkout operation must not create another order or reduce stock again.",
            ],
            [
              "Totals",
              "Use the latest server-side product prices. Taxes, shipping charges, and discounts are outside this exercise.",
            ],
          ],
        },
      },
      {
        title: "Define scope and exclusions",
        paragraphs: [
          "Describe both what you will evaluate and what you will leave out. Exclusions help stakeholders understand what the test evidence cannot establish.",
          "An excluded area can still create a dependency or risk. Explain that relationship when it affects your conclusions.",
        ],
        table: {
          headers: ["In scope", "Outside this exercise"],
          rows: [
            [
              "Search, category filters, and price sorting.",
              "Search-engine ranking and recommendation algorithms.",
            ],
            [
              "Guest cart, account cart, and login-time merge.",
              "Third-party identity-provider integration.",
            ],
            [
              "Simulated checkout, totals, orders, and stock changes.",
              "Real payment processing, refunds, and settlement.",
            ],
            [
              "Order ownership and basic authorization checks.",
              "A comprehensive penetration test.",
            ],
            [
              "Keyboard operation and selected accessibility checks.",
              "A complete accessibility conformance assessment.",
            ],
            [
              "Agreed response-time checks in a controlled environment.",
              "A production-capacity claim.",
            ],
          ],
        },
      },
      {
        title: "Identify and prioritize product risks",
        paragraphs: [
          "Prioritize by likely failure and consequence. Give special attention to ownership, order integrity, and stock consistency.",
          "The priorities below are illustrative. Revise them using actual implementation changes, incidents, and product needs.",
        ],
        table: {
          headers: ["Risk", "Impact", "Priority"],
          rows: [
            [
              "A customer can access another customer's orders.",
              "Unauthorized disclosure of customer information.",
              "High",
            ],
            [
              "Repeated checkout creates duplicate orders.",
              "Incorrect order records and repeated stock reduction.",
              "High",
            ],
            [
              "Concurrent purchases oversell the last item.",
              "Orders cannot be fulfilled as promised.",
              "High",
            ],
            [
              "Cart merge loses items or applies incorrect quantities.",
              "Customers receive an incorrect cart after login.",
              "High",
            ],
            [
              "Displayed totals differ from the created order.",
              "Customers cannot trust the purchase amount.",
              "High",
            ],
            [
              "Search and category filtering return incorrect products.",
              "Customers struggle to find suitable products.",
              "Medium",
            ],
          ],
        },
      },
      {
        title: "Derive meaningful test scenarios",
        paragraphs: [
          "Connect each scenario to a requirement or risk. Include successful behavior, rejected actions, boundaries, and important side effects.",
          "Write expected outcomes before execution. Avoid a vague instruction such as verify checkout works.",
        ],
        table: {
          headers: ["ID", "Scenario", "Expected outcome"],
          rows: [
            [
              "SEARCH-01",
              "Search using mixed case and surrounding spaces.",
              "Matching product names appear according to the search rule.",
            ],
            [
              "FILTER-01",
              "Apply a search term and category together, then sort by price.",
              "Only matching products appear, ordered by price.",
            ],
            [
              "CART-01",
              "Submit quantity 0, 1, 5, and 6 with sufficient stock.",
              "1 and 5 are accepted; 0 and 6 are rejected.",
            ],
            [
              "MERGE-01",
              "Merge guest quantity 2 with account quantity 2 when stock is 3.",
              "Merged quantity is 3 and an adjustment message appears.",
            ],
            [
              "CHECKOUT-01",
              "Complete an authenticated checkout successfully.",
              "One correct order is created; stock reduces once; purchased cart items are removed.",
            ],
            [
              "CHECKOUT-02",
              "Trigger a simulated payment failure.",
              "No order is created; stock and cart remain unchanged.",
            ],
            [
              "CHECKOUT-03",
              "Repeat the same checkout submission.",
              "No additional order or stock reduction occurs.",
            ],
            [
              "STOCK-01",
              "Two customers attempt to buy the final unit.",
              "Only one purchase succeeds; stock never becomes negative.",
            ],
            [
              "AUTH-01",
              "Request another customer's order through the API.",
              "Access is denied according to the contract; no order data is exposed.",
            ],
          ],
        },
      },
      {
        title: "Apply the test design techniques",
        paragraphs: [
          "Use several techniques together. Each technique helps expose a different class of behavior.",
        ],
        bullets: [
          "Equivalence partitioning: valid quantities, quantities below 1, quantities above 5, and unsupported input formats.",
          "Boundary value analysis: check 0, 1, 2, 4, 5, and 6 with sufficient stock; separately exercise the available-stock boundary.",
          "Decision tables: combine authentication state, stock availability, and simulated payment outcome.",
          "State transitions: evaluate the cart before checkout, after a failed attempt, and after a successful order.",
          "Exploration: investigate stale tabs, rapid actions, interrupted requests, and stock changes while the cart is open.",
        ],
        example:
          "Quantity 4 passes the 1–5 range rule but must fail when only 3 units are available. Treat the quantity limit and stock limit as separate conditions.",
      },
      {
        title: "Choose test levels and automation",
        paragraphs: [
          "Test detailed rule combinations close to their implementation, then use selected end-to-end checks to validate connected customer journeys.",
          "A mocked dependency helps control a scenario, but it does not establish that the real integration behaves correctly.",
        ],
        table: {
          headers: ["Layer or activity", "Suggested coverage"],
          rows: [
            [
              "Component or unit",
              "Total calculations, quantity validation, and cart-merge rules.",
            ],
            [
              "API",
              "Authorization, rejected payloads, duplicate submissions, and order outcomes.",
            ],
            [
              "Integration",
              "Order persistence, stock updates, rollback behavior, and concurrency.",
            ],
            [
              "UI end-to-end",
              "Browse to checkout, login-time cart merge, and order-history confirmation.",
            ],
            [
              "Accessibility",
              "Keyboard flow, labels, visible focus, and announcements for errors and cart updates.",
            ],
            [
              "Exploration",
              "Unexpected action sequences, confusing feedback, and recovery from interruption.",
            ],
          ],
        },
      },
      {
        title: "Prepare test data and environments",
        paragraphs: [
          "Use a controlled local or dedicated test environment for scenarios that change stock, create orders, or exercise concurrent requests.",
          "Give independent tests their own mutable data. Record the application version, relevant configuration, and dependency behavior with the results.",
        ],
        bullets: [
          "Customer A and Customer B with separate carts and order histories.",
          "Products with stock levels 0, 1, 3, and enough stock to test the quantity maximum.",
          "Products in different categories with known prices and searchable names.",
          "Existing account-cart items and guest-cart items that overlap.",
          "A controlled way to select simulated payment success and failure.",
          "A way to prepare, inspect, and clean up only the records owned by the tests.",
        ],
        example:
          "For the final-unit concurrency test, create a dedicated product with stock 1. Prevent unrelated tests from purchasing it during the scenario.",
      },
      {
        title: "Define execution and completion conditions",
        paragraphs: [
          "Before execution, confirm the build is accessible, required data exists, expected behavior is agreed, and dependencies are ready.",
          "Define completion conditions around important evidence. A green test count alone does not establish that every important risk was evaluated.",
        ],
        bullets: [
          "Critical checkout, authorization, and stock scenarios have executed.",
          "Confirmed high-impact defects are resolved and verified, or explicitly reviewed by accountable stakeholders.",
          "Blocked and unexecuted scenarios are listed with their risk implications.",
          "Relevant accessibility checks have completed.",
          "Results, defects, environment details, and supporting evidence are available.",
          "A release recommendation explains remaining uncertainty and possible mitigation.",
        ],
      },
      {
        title: "Create your final deliverable",
        paragraphs: [
          "Write a compact plan that another engineer could use. Keep assumptions separate from confirmed requirements.",
          "Attach a scenario list and use a short execution summary to communicate results after testing.",
        ],
        table: {
          headers: ["Section", "What to include"],
          rows: [
            ["Objective", "What this testing should establish."],
            ["Scope", "Included features and explicit exclusions."],
            [
              "Requirements",
              "Confirmed rules, assumptions, and open questions.",
            ],
            ["Risks", "Important failures, impact, and priorities."],
            ["Coverage", "Scenarios, test techniques, and appropriate layers."],
            [
              "Data and environment",
              "Accounts, records, configuration, setup, and cleanup.",
            ],
            [
              "Execution",
              "Owners, sequence, dependencies, and available time.",
            ],
            [
              "Completion",
              "Required evidence and handling of unresolved issues.",
            ],
            [
              "Reporting",
              "Results, defects, coverage gaps, and recommendation.",
            ],
          ],
        },
      },
    ],
    exercise: {
      title: "Prepare a release recommendation",
      scenario:
        "You planned 30 tests. During execution, 24 passed, 2 failed, 3 were blocked, and 1 was not run. One failure allows repeated checkout submissions to create duplicate orders. The other failure affects price sorting. The concurrency checks are blocked by a test-environment problem.",
      tasks: [
        "Calculate the pass rate among executed tests.",
        "Calculate execution completion.",
        "Identify the most important confirmed defect and coverage gap.",
        "Write a release recommendation with next actions.",
        "Describe one regression area to check after the duplicate-order fix.",
      ],
      answers: [
        "Executed tests: 24 + 2 = 26. Pass rate: 24 ÷ 26 × 100, approximately 92.3%.",
        "Execution completion: 26 ÷ 30 × 100, approximately 86.7%. Report the 3 blocked tests and 1 unrun test separately.",
        "Duplicate-order creation is a high-impact confirmed defect. Stock behavior under concurrent purchasing remains unknown because the relevant checks were blocked.",
        "Recommend resolving and verifying duplicate-order prevention and restoring the environment to complete concurrency coverage before promotion. Explain the sorting failure and other unexecuted coverage as well.",
        "After the fix, verify normal checkout, recovery after a failed attempt, stock updates, and a legitimate new purchase. Duplicate prevention must not block a genuinely separate order.",
      ],
    },
    takeaway:
      "You can now turn a feature set into a practical quality plan: clarify behavior, assess risks, design coverage, control data, evaluate results, and communicate a supported recommendation.",
    previousSlug: "choosing-what-to-automate",
  },
];
