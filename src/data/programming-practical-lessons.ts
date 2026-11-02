import type { ProgrammingLessonData } from "./programming-lessons";

export const programmingPracticalLessons: ProgrammingLessonData[] = [
  {
    number: 16,
    slug: "debugging-javascript-and-typescript",
    title: "Debugging JavaScript and TypeScript",
    description:
      "Use breakpoints, stack traces, and small reproductions to investigate failures.",
    content: {
      introduction:
        "Debugging is a structured investigation. Identify what happened, compare it with the expected behavior, and collect evidence before changing the code.",
      objectives: [
        "Read error messages and stack traces.",
        "Use breakpoints and stepping in VS Code.",
        "Separate compile-time errors from runtime failures.",
        "Reduce a failure to a small reproducible example.",
      ],
      sections: [
        {
          title: "Start with the observed failure",
          paragraphs: [
            "Write down the expected result, actual result, input, and command used. Confirm that you are running the intended file and saved version.",
            "Read the first relevant error and its stack trace. Later failures may be consequences of the first problem.",
            "A stack trace shows the chain of function calls associated with an error. Locate your own code within it rather than assuming the first dependency frame contains the defect.",
          ],
        },
        {
          title: "Use the VS Code debugger",
          paragraphs: [
            "Open the practice folder in VS Code. Use the command palette to create a JavaScript Debug Terminal, then run your Node.js example there.",
            "Click beside a line number to set a breakpoint. Execution pauses before that statement, allowing you to inspect local variables and the call stack.",
            "Step Over runs the next statement without entering a called function. Step Into enters a function. Step Out resumes until the current function returns. Continue resumes until another breakpoint or completion.",
            "Use a conditional breakpoint when the failure occurs only for a particular input. Avoid repeatedly adding large amounts of logging when a focused breakpoint can reveal the state.",
          ],
        },
        {
          title: "Investigate a numeric conversion",
          paragraphs: [
            "The following program deliberately contains a bug. Predict the result, then pause inside addOne and inspect the value and its type.",
            "The + operator concatenates when one operand is a string. Fix the boundary where text should become a validated number.",
          ],
          example: {
            title: "Inspect a surprising result",
            filename: "lesson-16-debug.js",
            code: `function addOne(quantity) {
  return quantity + 1;
}

const rawQuantity = "2";
const result = addOne(rawQuantity);

console.log(result);
console.log(typeof result);`,
            command: "node lesson-16-debug.js",
            output: `21
string`,
            explanation:
              "The output is intentionally incorrect for numeric addition. Convert and validate the input rather than changing the expected result to match the bug.",
          },
        },
        {
          title: "Debug compiled TypeScript",
          paragraphs: [
            "Type errors are reported by the compiler. Runtime errors occur when generated code executes. Passing compilation does not prove business correctness.",
            "When compiling the earlier .cts examples, add --sourceMap to generate mappings from JavaScript back to TypeScript.",
            "For example, compile with npx tsc lesson-10-types.cts --strict --target ES2022 --module NodeNext --outDir build --sourceMap --noEmitOnError.",
            "Run node --enable-source-maps build/lesson-10-types.cjs to improve source locations in stack traces. Run that command in the JavaScript Debug Terminal when using breakpoints.",
          ],
        },
        {
          title: "Use a repeatable investigation process",
          paragraphs: [
            "Reproduce the failure, reduce the inputs, inspect the state, form a hypothesis, and change one relevant thing at a time.",
            "After a fix, rerun the original failing case and nearby cases. A fix that handles one input may still fail at a boundary.",
          ],
          bullets: [
            "Check versions, configuration, and working directory.",
            "Inspect values and types at the failing boundary.",
            "Compare the earliest incorrect state with the expected state.",
            "Avoid logging passwords, tokens, and private data.",
            "Preserve unexpected failures instead of catching and ignoring them.",
          ],
        },
      ],
      mistakes: [
        "Changing expected results just to make a check pass.",
        "Debugging generated output while editing a different source file.",
        "Treating every failure as a timing problem.",
        "Adding retries before identifying the underlying cause.",
        "Ignoring the difference between string and numeric inputs.",
      ],
      exercise: {
        title: "Fix and verify quantity conversion",
        instructions: [
          "Accept text representing a quantity.",
          "Reject empty text, non-integers, and quantities outside 1–5.",
          "Return one more than the validated quantity.",
          "Verify the result for input '2'.",
        ],
        filename: "lesson-16-exercise.js",
        solution: `function incrementQuantity(raw) {
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new Error("Quantity text is required");
  }

  const quantity = Number(raw);

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 5
  ) {
    throw new Error("Quantity must be an integer from 1 to 5");
  }

  return quantity + 1;
}

const result = incrementQuantity("2");

if (result !== 3) {
  throw new Error("Expected numeric result 3");
}

console.log(result);`,
        command: "node lesson-16-exercise.js",
        output: "3",
        explanation:
          "The input contract is validated before arithmetic. The returned increment is a calculation result, not a newly validated cart quantity.",
      },
      takeaway:
        "Use evidence to locate the first incorrect state. Verify both the original failure and relevant boundaries after changing the code.",
    },
  },
  {
    number: 17,
    slug: "files-and-configuration",
    title: "Working with Files and Configuration",
    description:
      "Read JSON fixtures, resolve paths, and validate environment-based configuration.",
    content: {
      introduction:
        "Automation depends on test data and environment settings. Read them deliberately, validate them at the boundary, and make configuration failures easy to diagnose.",
      objectives: [
        "Read and parse a JSON file.",
        "Distinguish module-relative paths from working-directory paths.",
        "Validate environment variables.",
        "Keep credentials out of source files and reports.",
      ],
      sections: [
        {
          title: "Create a JSON fixture",
          paragraphs: [
            "Create a folder named lesson-17 inside your practice project.",
            "Inside it, create users.json containing the text shown below. JSON is data: it cannot contain JavaScript comments or trailing commas.",
            "The following example reads the file and validates the properties it uses.",
          ],
          bullets: [
            'users.json content: [{"id":"U-1","email":"tester@example.com"}]',
            "Use synthetic accounts and reserved example domains in learning fixtures.",
            "Do not put real passwords or access tokens in the fixture.",
          ],
          example: {
            title: "Read a fixture relative to the module",
            filename: "lesson-17/read-users.mjs",
            code: `import { readFile } from "node:fs/promises";

const fileUrl = new URL("./users.json", import.meta.url);
const text = await readFile(fileUrl, "utf8");
const users = JSON.parse(text);

if (
  !Array.isArray(users) ||
  !users.every(
    (user) =>
      user !== null &&
      typeof user === "object" &&
      !Array.isArray(user) &&
      typeof user.id === "string" &&
      typeof user.email === "string"
  )
) {
  throw new Error("Invalid users fixture");
}

for (const user of users) {
  console.log(user.id + ": " + user.email);
}`,
            command: "node lesson-17/read-users.mjs",
            output: "U-1: tester@example.com",
            explanation:
              "The URL resolves relative to read-users.mjs. Parsing establishes valid JSON; the following checks establish the fields this script requires.",
          },
        },
        {
          title: "Understand paths",
          paragraphs: [
            "A relative filesystem path commonly resolves from the process working directory. That directory can differ between an editor, terminal, and CI runner.",
            "For an ES module, new URL('./file.json', import.meta.url) expresses a location relative to the module itself.",
            "When TypeScript is compiled into another directory, fixture files are not automatically copied there by the compiler. Plan how fixtures are located or copied.",
            "Use Node's path utilities when joining filesystem paths instead of manually concatenating platform-specific separators.",
          ],
        },
        {
          title: "Environment variables are text",
          paragraphs: [
            "Environment variables are usually strings or undefined. Convert and validate them before use.",
            "Boolean('false') evaluates to true because it is a non-empty string. Parse boolean settings according to an explicit allowed-value contract.",
            "A TypeScript assertion such as process.env.BASE_URL as string does not prove the variable exists.",
          ],
          example: {
            title: "Validate numeric configuration",
            filename: "lesson-17/config.mjs",
            code: `const rawRetries = process.env.TEST_RETRIES ?? "2";
const retries = Number(rawRetries);

if (
  rawRetries.trim() === "" ||
  !Number.isInteger(retries) ||
  retries < 0 ||
  retries > 5
) {
  throw new Error("TEST_RETRIES must be an integer from 0 to 5");
}

console.log("Retries:", retries);`,
            command: "node lesson-17/config.mjs",
            output: "Retries: 2",
            explanation:
              "This output assumes TEST_RETRIES is unset. An explicitly empty value is rejected rather than silently converted to zero.",
          },
        },
        {
          title: "Separate configuration and secrets",
          paragraphs: [
            "Store non-sensitive defaults in reviewed configuration. Supply credentials through the intended local or CI secret mechanism.",
            "A .env file is not automatically loaded by every program. Use an explicit loading mechanism supported by the runtime or framework.",
            "Ignoring a file in Git does not remove credentials that were already committed. Exposed credentials need to be revoked or rotated.",
          ],
          bullets: [
            "Keep secret values out of console output and test reports.",
            "Provide an example configuration containing placeholders.",
            "Validate required settings before starting dependent tests.",
            "Keep environment-specific URLs separate from test logic.",
          ],
        },
      ],
      mistakes: [
        "Assuming JSON.parse validates the domain contract.",
        "Depending on an accidental terminal working directory.",
        "Assuming compiled code automatically includes fixture files.",
        "Converting a string setting with Boolean without checking its meaning.",
        "Using type assertions instead of checking required configuration.",
      ],
      exercise: {
        title: "Parse a boolean setting",
        instructions: [
          "Create a parser accepting only the strings 'true' and 'false'.",
          "Reject any other supplied value.",
          "Demonstrate both accepted values.",
        ],
        filename: "lesson-17-exercise.mjs",
        solution: `function parseBooleanSetting(value) {
  if (value === "true") return true;
  if (value === "false") return false;

  throw new Error("Expected 'true' or 'false'");
}

console.log(parseBooleanSetting("true"));
console.log(parseBooleanSetting("false"));`,
        command: "node lesson-17-exercise.mjs",
        output: `true
false`,
        explanation:
          "The parser has an explicit contract. Whitespace or mixed-case values are rejected unless you deliberately add normalization.",
      },
      takeaway:
        "Treat fixtures and configuration as external inputs. Resolve their location deliberately and validate the values your tests depend on.",
    },
  },
  {
    number: 18,
    slug: "sdet-coding-practice",
    title: "SDET Coding Practice",
    description:
      "Practise collection checks, duplicate detection, frequency counting, and complexity reasoning.",
    content: {
      introduction:
        "Practise small problems that appear in automation utilities and interviews. Explain the input contract, expected result, edge cases, and cost of your solution.",
      objectives: [
        "Use Set for membership and duplicate detection.",
        "Use Map to count occurrences.",
        "Compare collections without losing duplicate information.",
        "Explain basic time and space complexity.",
      ],
      sections: [
        {
          title: "Detect duplicate identifiers",
          paragraphs: [
            "A Set stores unique values. It is useful for checking whether an identifier has already appeared.",
            "Object values are compared by identity. Two separately created objects with identical properties are still different Set entries.",
          ],
          example: {
            title: "Find duplicate order IDs",
            filename: "lesson-18-duplicates.js",
            code: `const ids = ["O-1", "O-2", "O-1", "O-3", "O-2"];
const seen = new Set();
const duplicates = new Set();

for (const id of ids) {
  if (seen.has(id)) {
    duplicates.add(id);
  }

  seen.add(id);
}

console.log([...duplicates].join(", "));`,
            command: "node lesson-18-duplicates.js",
            output: "O-1, O-2",
            explanation:
              "The second Set ensures each duplicated ID appears once in the result.",
          },
        },
        {
          title: "Count occurrences with Map",
          paragraphs: [
            "A Map associates keys with values. Unlike a plain object dictionary, it supports keys of different types and has explicit get, set, and has operations.",
            "A missing count can default to zero before incrementing.",
          ],
          example: {
            title: "Count result statuses",
            filename: "lesson-18-counts.js",
            code: `const statuses = ["passed", "failed", "passed", "blocked"];
const counts = new Map();

for (const status of statuses) {
  counts.set(status, (counts.get(status) ?? 0) + 1);
}

console.log(counts.get("passed"));
console.log(counts.get("failed"));
console.log(counts.get("blocked"));`,
            command: "node lesson-18-counts.js",
            output: `2
1
1`,
            explanation:
              "The frequency map preserves how often each status occurs.",
          },
        },
        {
          title: "Define what equal collections means",
          paragraphs: [
            "An ordered comparison checks both values and positions. A set comparison ignores duplicate counts. A multiset comparison ignores order but preserves how many times each value appears.",
            "Choose the comparison that matches the requirement. Converting to Set can conceal an extra or missing duplicate.",
            "JSON.stringify is not a general-purpose deep-equality algorithm. Representation details and unsupported values can make it unsuitable.",
          ],
        },
        {
          title: "Explain complexity",
          paragraphs: [
            "A single pass over n values performs linear work apart from the cost of operations inside the loop.",
            "Map-based counting is commonly analyzed as expected O(n) time with O(k) space for k distinct keys, assuming efficient average key operations.",
            "Repeatedly scanning the full collection inside another full scan can lead to O(n squared) work.",
            "State assumptions and choose a clear solution. Do not sacrifice correctness for a claimed complexity improvement.",
          ],
        },
        {
          title: "Practise beyond the happy path",
          paragraphs: [
            "Include empty collections, repeated values, missing values, and differing lengths.",
            "For API-derived data, validate the shape before running collection logic.",
          ],
          bullets: [
            "Find missing expected IDs.",
            "Compare sorted prices while preserving the source list.",
            "Count failures by category.",
            "Validate that all required response fields exist.",
            "Explain whether order and duplicate counts matter.",
          ],
        },
      ],
      mistakes: [
        "Using Set when duplicate counts are part of the requirement.",
        "Comparing objects with === and expecting structural equality.",
        "Sorting an input array that another check still needs unchanged.",
        "Ignoring empty inputs and missing results.",
        "Claiming an algorithm is linear while repeatedly scanning inside a loop.",
      ],
      exercise: {
        title: "Compare two lists while preserving duplicate counts",
        instructions: [
          "Write sameMembers for arrays of strings.",
          "Ignore order but preserve the number of occurrences.",
          "Compare one matching pair and one mismatching pair.",
        ],
        filename: "lesson-18-exercise.js",
        solution: `function sameMembers(left, right) {
  if (left.length !== right.length) return false;

  const counts = new Map();

  for (const value of left) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  for (const value of right) {
    const count = counts.get(value);

    if (count === undefined) return false;

    if (count === 1) {
      counts.delete(value);
    } else {
      counts.set(value, count - 1);
    }
  }

  return counts.size === 0;
}

console.log(sameMembers(["A", "A", "B"], ["B", "A", "A"]));
console.log(sameMembers(["A", "A", "B"], ["A", "B", "B"]));`,
        command: "node lesson-18-exercise.js",
        output: `true
false`,
        explanation:
          "The count map tracks unmatched occurrences. The inputs are not mutated. This implementation assumes arrays of strings.",
      },
      takeaway:
        "Clarify the comparison contract, choose suitable data structures, and verify edge cases. Explain correctness before discussing optimization.",
    },
  },
];
