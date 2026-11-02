import { programmingPracticalLessons } from "./programming-practical-lessons";

export type ProgrammingExample = {
  title: string;
  filename: string;
  code: string;
  command: string;
  output: string;
  explanation: string;
};

export type ProgrammingSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: ProgrammingExample;
};

export type ProgrammingContent = {
  introduction: string;
  objectives: string[];
  sections: ProgrammingSection[];
  mistakes: string[];
  exercise: {
    title: string;
    instructions: string[];
    filename: string;
    solution: string;
    command: string;
    output: string;
    explanation: string;
  };
  takeaway: string;
};

export type ProgrammingLessonData = {
  number: number;
  slug: string;
  title: string;
  description: string;
  content?: ProgrammingContent;
};

export const programmingLessons: ProgrammingLessonData[] = [
  {
    number: 1,
    slug: "javascript-typescript-and-sdet",
    title: "JavaScript, TypeScript, and the SDET Role",
    description:
      "Understand how programming supports test automation and how JavaScript relates to TypeScript.",
    content: {
      introduction:
        "Programming helps an SDET express checks, prepare data, investigate failures, and build reusable tools. Start with small programs whose behavior you can explain.",
      objectives: [
        "Understand the roles of JavaScript and TypeScript.",
        "Distinguish a language from its runtime.",
        "Recognize how programming supports testing.",
        "Understand the difference between printing a result and checking it.",
      ],
      sections: [
        {
          title: "What is JavaScript?",
          paragraphs: [
            "JavaScript is a programming language used to describe behavior and work with data. It can run in browsers and in environments such as Node.js.",
            "The runtime supplies capabilities around the language. Browsers provide page and DOM APIs. Node.js provides capabilities such as filesystem access. Not every API exists in every runtime.",
          ],
        },
        {
          title: "What does TypeScript add?",
          paragraphs: [
            "TypeScript adds a type system to JavaScript. It can identify many incompatible values and incorrect usages before a program runs.",
            "Type information does not automatically validate external data at runtime. A response from an API still needs appropriate checks.",
            "We will learn JavaScript behavior first, then use TypeScript to describe and check the shapes of our test data and helper functions.",
          ],
        },
        {
          title: "How does an SDET use programming?",
          paragraphs: [
            "Automation combines actions, data, and checks. Programming also helps you understand why a test failed and whether its result is trustworthy.",
          ],
          bullets: [
            "Calculate expected totals and compare them with actual results.",
            "Create and clean up test data.",
            "Send API requests and inspect responses.",
            "Organize reusable helpers and page objects.",
            "Handle asynchronous actions and report useful failures.",
          ],
        },
        {
          title: "Your first small program",
          paragraphs: [
            "This example stores a quantity and unit price, calculates a total, and prints the result. Lesson 2 explains the local setup needed to run it.",
            "Printing is useful for learning and investigation, but printing a value alone does not make a test pass or fail.",
          ],
          example: {
            title: "Calculate an order total",
            filename: "lesson-01.js",
            code: `const quantity = 2;
const unitPrice = 250;
const total = quantity * unitPrice;

console.log("Total:", total);`,
            command: "node lesson-01.js",
            output: "Total: 500",
            explanation:
              "The multiplication expression produces 500. console.log displays that value in the terminal.",
          },
        },
        {
          title: "From a calculation to a check",
          paragraphs: [
            "A meaningful automated check compares an observed result with an expected outcome. A mismatch needs to produce a failure that the runner can detect.",
            "Later, testing libraries will provide assertions with helpful diagnostics. For now, a conditional statement and an Error are enough to illustrate the idea.",
          ],
          example: {
            title: "Fail when a result is incorrect",
            filename: "lesson-01-check.js",
            code: `const expectedTotal = 500;
const actualTotal = 2 * 250;

if (actualTotal !== expectedTotal) {
  throw new Error("Order total is incorrect");
}

console.log("Total check passed");`,
            command: "node lesson-01-check.js",
            output: "Total check passed",
            explanation:
              "The values match, so execution reaches the success message. Change actualTotal to 450 and run again to observe an intentional failure. This demonstrates a check; it does not test a real shopping application.",
          },
        },
      ],
      mistakes: [
        "Assuming TypeScript automatically validates API responses.",
        "Expecting browser APIs such as document to exist in a plain Node.js script.",
        "Treating console output as an assertion.",
        "Copying a program without understanding its expected result.",
      ],
      exercise: {
        title: "Check a three-item order",
        instructions: [
          "Set quantity to 3 and unit price to 200.",
          "Calculate the total and verify that it equals 600.",
          "Print a success message only when the check passes.",
        ],
        filename: "lesson-01-exercise.js",
        solution: `const quantity = 3;
const unitPrice = 200;
const actualTotal = quantity * unitPrice;
const expectedTotal = 600;

if (actualTotal !== expectedTotal) {
  throw new Error("Expected the total to be 600");
}

console.log("Order total verified:", actualTotal);`,
        command: "node lesson-01-exercise.js",
        output: "Order total verified: 600",
        explanation:
          "The expected value is explicit. If the calculated value differs, throwing an error prevents the success message from running.",
      },
      takeaway:
        "Learn to explain the data, action, and expected outcome in a small program. TypeScript will later help describe valid usage, while runtime checks verify actual behavior.",
    },
  },
  {
    number: 2,
    slug: "local-programming-setup",
    title: "Setup: Node.js, VS Code, and Running Code",
    description:
      "Create a separate practice folder and run JavaScript programs from the terminal.",
    content: {
      introduction:
        "Prepare a small local workspace for programming exercises. Keep it separate from the Learning Hub application so practice files remain easy to find.",
      objectives: [
        "Check that Node.js and npm are available.",
        "Create and open a practice folder.",
        "Run a saved JavaScript file.",
        "Read common terminal errors.",
      ],
      sections: [
        {
          title: "Tools and their responsibilities",
          paragraphs: [
            "VS Code is an editor. Node.js executes JavaScript outside the browser. npm manages packages and project scripts.",
            "You do not need additional packages for Lessons 1–5. If Node.js already runs your Learning Hub locally, you can use that installation for these exercises.",
          ],
          bullets: [
            "Run node --version to check that Node.js is accessible.",
            "Run npm --version to check that npm is accessible.",
            "If a command is not found, check installation and terminal configuration before continuing.",
            "If installation is needed, use the official Node.js website at https://nodejs.org and choose a supported LTS release.",
          ],
        },
        {
          title: "Create a separate practice folder",
          paragraphs: [
            "Create a folder called sdet-programming-practice in a location you can easily find.",
            "In VS Code, use File → Open Folder to open it. Then use Terminal → New Terminal. Confirm the terminal is working in that folder.",
            "Create hello.js inside the folder and save it before running the command below.",
          ],
          example: {
            title: "Run a JavaScript file",
            filename: "hello.js",
            code: `console.log("Hello, SDET!");
console.log("My local setup works.");`,
            command: "node hello.js",
            output: `Hello, SDET!
My local setup works.`,
            explanation:
              "Node reads the saved hello.js file and executes its statements in order. Terminal prompts and command text are not part of the expected output.",
          },
        },
        {
          title: "Understand the feedback loop",
          paragraphs: [
            "Edit the file, save it, run it, and inspect the result. Running node hello.js executes the saved version once; it does not continuously watch for changes.",
            "If the output seems unchanged, first confirm you saved the file and ran the correct file from the correct folder.",
          ],
        },
        {
          title: "Read common errors",
          paragraphs: [
            "An error is evidence about what happened. Read the message, filename, and location before changing code.",
          ],
          bullets: [
            "SyntaxError: JavaScript could not parse the code. Check quotes, brackets, and the indicated statement.",
            "ReferenceError: code tried to use a name that is not available, such as a misspelled variable.",
            "Cannot find module or a missing-file error: verify the filename and terminal working folder.",
            "Command not found: the executable may be missing or unavailable on the terminal's PATH.",
          ],
        },
      ],
      mistakes: [
        "Pasting JavaScript statements into a shell instead of saving them in a .js file.",
        "Saving the file as hello.js.txt.",
        "Running the command from a different folder.",
        "Expecting unsaved changes to appear in the output.",
      ],
      exercise: {
        title: "Run your own introduction",
        instructions: [
          "Create lesson-02-exercise.js in your practice folder.",
          "Print your learner name and the course name on separate lines.",
          "Save the file and execute it using Node.js.",
        ],
        filename: "lesson-02-exercise.js",
        solution: `console.log("Learner: Nirmal");
console.log("Course: JavaScript and TypeScript for SDETs");`,
        command: "node lesson-02-exercise.js",
        output: `Learner: Nirmal
Course: JavaScript and TypeScript for SDETs`,
        explanation:
          "You can replace the learner name with your own. Running the file confirms that the editor, saved file, terminal location, and runtime are working together.",
      },
      takeaway:
        "Use a repeatable edit–save–run–inspect workflow. Small local programs make it easier to understand errors before introducing test frameworks.",
    },
  },
  {
    number: 3,
    slug: "variables-types-and-operators",
    title: "Variables, Data Types, and Operators",
    description:
      "Store values, understand basic JavaScript types, and compare results deliberately.",
    content: {
      introduction:
        "Variables give names to values. Types and operators determine how those values behave when you calculate, compare, and combine them.",
      objectives: [
        "Choose between const and let.",
        "Recognize common primitive values.",
        "Use arithmetic and strict comparisons.",
        "Understand conversion and truthiness pitfalls.",
      ],
      sections: [
        {
          title: "const and let",
          paragraphs: [
            "Use const when you do not need to reassign a variable. Use let when reassignment is part of the program.",
            "const prevents reassignment of the binding. It does not make an object or array immutable; we will examine that distinction in Lesson 6.",
            "Both const and let are block-scoped. Prefer them over var in this course.",
          ],
          example: {
            title: "Store and update a quantity",
            filename: "lesson-03-variables.js",
            code: `const productName = "Keyboard";
let quantity = 1;

quantity = quantity + 1;

console.log(productName);
console.log("Quantity:", quantity);`,
            command: "node lesson-03-variables.js",
            output: `Keyboard
Quantity: 2`,
            explanation:
              "The product name remains assigned to the same value. The quantity is reassigned from 1 to 2.",
          },
        },
        {
          title: "Common JavaScript values",
          paragraphs: [
            "Strings represent text, numbers represent ordinary numeric values, and booleans represent true or false.",
            "undefined commonly represents a value that has not been assigned or is absent. null is often used to represent an intentionally empty value.",
            "JavaScript also has bigint and symbol primitives, plus objects. We will focus first on the values commonly used in test data.",
          ],
          example: {
            title: "Inspect value types",
            filename: "lesson-03-types.js",
            code: `const email = "tester@example.com";
const quantity = 2;
const inStock = true;
let orderId;
const selectedDiscount = null;

console.log(typeof email);
console.log(typeof quantity);
console.log(typeof inStock);
console.log(typeof orderId);
console.log(selectedDiscount === null);`,
            command: "node lesson-03-types.js",
            output: `string
number
boolean
undefined
true`,
            explanation:
              "Use a direct comparison to check for null. A historical JavaScript quirk makes typeof null return 'object'.",
          },
        },
        {
          title: "Arithmetic and strict comparisons",
          paragraphs: [
            "Arithmetic operators include +, -, *, /, and %. Comparison operators include ===, !==, >, >=, <, and <=.",
            "Strict equality compares without converting one operand to another type. A number and its text representation are different values.",
          ],
          example: {
            title: "Calculate and compare",
            filename: "lesson-03-operators.js",
            code: `const unitPrice = 250;
const quantity = 2;
const total = unitPrice * quantity;

console.log(total);
console.log(total === 500);
console.log(2 === "2");
console.log(7 % 2);`,
            command: "node lesson-03-operators.js",
            output: `500
true
false
1`,
            explanation:
              "The remainder operator % returns 1 for 7 divided by 2. Strict equality does not convert the string '2' into the number 2.",
          },
        },
        {
          title: "Convert values deliberately",
          paragraphs: [
            "Text entered into a form often needs explicit conversion before numeric calculations. The + operator can concatenate strings, which may produce surprising results.",
            "Conversion is not the same as validation. Number of an empty string is 0, and Number of invalid numeric text produces NaN. Check the input contract and acceptable range.",
          ],
          example: {
            title: "Convert a quantity from text",
            filename: "lesson-03-conversion.js",
            code: `const rawQuantity = "2";
const quantity = Number(rawQuantity);

console.log(rawQuantity + 1);
console.log(quantity + 1);
console.log(Number.isNaN(Number("two")));`,
            command: "node lesson-03-conversion.js",
            output: `21
3
true`,
            explanation:
              "The first expression joins text. The second adds numbers. Number.isNaN checks whether the resulting value is NaN.",
          },
        },
        {
          title: "Logical operators and truthiness",
          paragraphs: [
            "&& represents logical AND, || represents logical OR, and ! negates truthiness. With arbitrary operands, && and || return operand values rather than always returning booleans.",
            "A non-empty string such as 'false' is truthy. Do not interpret text-based settings as booleans without defining the conversion.",
            "JavaScript numbers use floating-point arithmetic. For simple currency exercises, store integer minor units such as paise or cents instead of assuming every decimal calculation is exact.",
          ],
          example: {
            title: "Combine boolean conditions",
            filename: "lesson-03-logic.js",
            code: `const isLoggedIn = true;
const hasStock = false;

console.log(isLoggedIn && hasStock);
console.log(isLoggedIn || hasStock);
console.log(!hasStock);
console.log(Boolean("false"));`,
            command: "node lesson-03-logic.js",
            output: `false
true
true
true`,
            explanation:
              "Checkout readiness requires both conditions. The text 'false' remains truthy because it is a non-empty string.",
          },
        },
      ],
      mistakes: [
        "Reassigning a const variable.",
        "Using = when you intended an equality comparison.",
        "Adding numeric strings without converting them.",
        "Treating any successfully converted number as valid business input.",
        "Assuming decimal arithmetic is always exact.",
      ],
      exercise: {
        title: "Calculate a cart total in paise",
        instructions: [
          "Use a unit price of 19900 paise and quantity text '3'.",
          "Convert the quantity to a number.",
          "Verify that the total equals 59700 paise.",
        ],
        filename: "lesson-03-exercise.js",
        solution: `const unitPricePaise = 19900;
const rawQuantity = "3";
const quantity = Number(rawQuantity);
const totalPaise = unitPricePaise * quantity;

console.log("Total paise:", totalPaise);
console.log("Matches expected:", totalPaise === 59700);`,
        command: "node lesson-03-exercise.js",
        output: `Total paise: 59700
Matches expected: true`,
        explanation:
          "This exercise uses known input. A reusable function would also validate whether the quantity is an allowed integer and whether the numbers remain within supported limits.",
      },
      takeaway:
        "Choose clear variable names and deliberate conversions. Know whether you are working with text, numbers, or booleans before comparing results.",
    },
  },
  {
    number: 4,
    slug: "conditions-and-loops",
    title: "Conditions and Loops",
    description:
      "Choose execution paths and repeat controlled actions using conditions and loops.",
    content: {
      introduction:
        "Conditions let a program make decisions. Loops repeat work while keeping the stopping rules visible.",
      objectives: [
        "Use if, else if, and else.",
        "Choose between switch and simple conditional expressions.",
        "Write for and while loops with clear termination.",
        "Recognize off-by-one errors and misleading test branching.",
      ],
      sections: [
        {
          title: "Choose a path with if and else",
          paragraphs: [
            "An if statement executes its block when the condition is truthy. Additional branches let you handle alternative outcomes.",
            "Order matters. Validate basic input before applying business rules that depend on it.",
          ],
          example: {
            title: "Validate a quantity",
            filename: "lesson-04-conditions.js",
            code: `const quantity = 4;
const stock = 3;

if (!Number.isInteger(quantity) || quantity < 1) {
  console.log("Enter a positive whole number");
} else if (quantity > 5) {
  console.log("Maximum quantity is 5");
} else if (quantity > stock) {
  console.log("Not enough stock");
} else {
  console.log("Quantity accepted");
}`,
            command: "node lesson-04-conditions.js",
            output: "Not enough stock",
            explanation:
              "Quantity 4 passes the basic and maximum checks but exceeds available stock. Only the matching branch executes.",
          },
        },
        {
          title: "switch and conditional expressions",
          paragraphs: [
            "switch is useful when comparing one value against several specific cases. A break prevents execution from continuing into the following case.",
            "The conditional operator chooses between two expressions. Keep it short; use if statements when the logic needs more explanation.",
          ],
          example: {
            title: "Describe an order state",
            filename: "lesson-04-switch.js",
            code: `const status = "paid";

switch (status) {
  case "pending":
    console.log("Awaiting payment");
    break;
  case "paid":
    console.log("Ready for fulfilment");
    break;
  default:
    console.log("Review order state");
}

const hasItems = true;
const label = hasItems ? "View cart" : "Start shopping";
console.log(label);`,
            command: "node lesson-04-switch.js",
            output: `Ready for fulfilment
View cart`,
            explanation:
              "The paid case matches. The conditional expression selects View cart because hasItems is true.",
          },
        },
        {
          title: "Repeat a known number of times",
          paragraphs: [
            "A for loop has initialization, a continuation condition, and an update expression.",
            "Check the first and last values carefully. Using < instead of <= can change how many times the body executes.",
          ],
          example: {
            title: "Generate three labels",
            filename: "lesson-04-for.js",
            code: `for (let index = 1; index <= 3; index += 1) {
  console.log("Test case " + index);
}`,
            command: "node lesson-04-for.js",
            output: `Test case 1
Test case 2
Test case 3`,
            explanation:
              "The loop starts at 1 and stops after 3. Updating index ensures it eventually reaches the stopping condition.",
          },
        },
        {
          title: "while, break, and continue",
          paragraphs: [
            "A while loop checks its condition before each iteration. Its body must make progress toward termination unless an explicit exit is guaranteed.",
            "break exits the loop. continue skips the remaining statements in the current iteration and proceeds to the next iteration.",
            "These synchronous loops are for ordinary computation. Do not use a busy loop to wait for a page or an API response; asynchronous waiting comes later.",
          ],
          example: {
            title: "Count remaining items",
            filename: "lesson-04-while.js",
            code: `let remaining = 2;

while (remaining > 0) {
  console.log("Remaining:", remaining);
  remaining -= 1;
}

console.log("Finished");`,
            command: "node lesson-04-while.js",
            output: `Remaining: 2
Remaining: 1
Finished`,
            explanation:
              "remaining decreases on every iteration, so the loop terminates when it reaches 0.",
          },
        },
        {
          title: "Keep expected test behavior explicit",
          paragraphs: [
            "Conditional code is useful for data handling and setup, but tests should not silently skip expected behavior when the application is broken.",
            "If a required checkout button is missing, a test should report the failure rather than use an if statement to skip the checkout check and appear successful.",
          ],
        },
      ],
      mistakes: [
        "Using an assignment inside a condition by accident.",
        "Forgetting to update a while-loop counter.",
        "Using the wrong inclusive or exclusive boundary.",
        "Forgetting break in a switch when fall-through is not intended.",
        "Using conditional skips to hide a failed expectation.",
      ],
      exercise: {
        title: "Classify quantities from 0 through 6",
        instructions: [
          "Loop through the integers 0 to 6 inclusive.",
          "Accept only quantities from 1 to 5 inclusive.",
          "Print each quantity followed by accepted or rejected.",
        ],
        filename: "lesson-04-exercise.js",
        solution: `for (let quantity = 0; quantity <= 6; quantity += 1) {
  if (quantity >= 1 && quantity <= 5) {
    console.log(quantity + ": accepted");
  } else {
    console.log(quantity + ": rejected");
  }
}`,
        command: "node lesson-04-exercise.js",
        output: `0: rejected
1: accepted
2: accepted
3: accepted
4: accepted
5: accepted
6: rejected`,
        explanation:
          "The loop covers values immediately outside both boundaries as well as the permitted range. Stock validation is a separate rule.",
      },
      takeaway:
        "Make every decision and loop boundary explainable. In automation, branching should support clear checks rather than conceal failures.",
    },
  },
  {
    number: 5,
    slug: "functions-and-scope",
    title: "Functions and Scope",
    description:
      "Create reusable behavior with explicit inputs, return values, and controlled access to variables.",
    content: {
      introduction:
        "Functions turn repeated logic into named operations. Clear inputs and outputs make them easier to reuse, review, and test.",
      objectives: [
        "Define and call functions with parameters.",
        "Distinguish returning a value from printing it.",
        "Read function declarations and arrow functions.",
        "Understand block scope, defaults, and pure helpers.",
      ],
      sections: [
        {
          title: "Parameters, arguments, and return values",
          paragraphs: [
            "Parameters are names declared by the function. Arguments are the actual values supplied when calling it.",
            "return sends a value back to the caller and ends that function invocation. A function that completes without returning a value returns undefined.",
          ],
          example: {
            title: "Calculate a total",
            filename: "lesson-05-functions.js",
            code: `function calculateTotal(unitPricePaise, quantity) {
  return unitPricePaise * quantity;
}

const total = calculateTotal(25000, 2);

console.log(total);
console.log(calculateTotal(10000, 3));`,
            command: "node lesson-05-functions.js",
            output: `50000
30000`,
            explanation:
              "The function returns its result. The caller can print it, compare it, or pass it into another function.",
          },
        },
        {
          title: "Function declarations and arrow functions",
          paragraphs: [
            "A function declaration uses the function keyword. An arrow function is an expression that can be assigned to a variable.",
            "An arrow with a single expression can return that expression implicitly. An arrow with braces needs an explicit return when it should return a value.",
            "These forms differ in additional ways, including how they handle this. For now, use them for small helpers with explicit inputs.",
          ],
          example: {
            title: "Write a quantity helper",
            filename: "lesson-05-arrow.js",
            code: `const isAllowedQuantity = (quantity) =>
  Number.isInteger(quantity) &&
  quantity >= 1 &&
  quantity <= 5;

console.log(isAllowedQuantity(3));
console.log(isAllowedQuantity(0));
console.log(isAllowedQuantity(1.5));`,
            command: "node lesson-05-arrow.js",
            output: `true
false
false`,
            explanation:
              "The expression returns a boolean. It checks whole-number input and both limits.",
          },
        },
        {
          title: "Scope: where a name is available",
          paragraphs: [
            "Variables declared inside a function are local to that function. let and const declared inside a block are limited to that block.",
            "Inner functions can access names from enclosing scopes. This is useful, but hidden dependencies and mutable shared state can make tests harder to understand.",
          ],
          example: {
            title: "Keep temporary values local",
            filename: "lesson-05-scope.js",
            code: `const courseName = "Programming";

function createLabel(lessonNumber) {
  const prefix = "Lesson";
  return courseName + " - " + prefix + " " + lessonNumber;
}

console.log(createLabel(5));`,
            command: "node lesson-05-scope.js",
            output: "Programming - Lesson 5",
            explanation:
              "createLabel can read courseName from its enclosing scope. prefix and lessonNumber are local to the function.",
          },
        },
        {
          title: "Default parameters",
          paragraphs: [
            "A default parameter is used when the argument is omitted or explicitly undefined. It is not used for every falsy value.",
            "Passing 0 or null does not automatically select the default. Validate those values according to the function's contract.",
          ],
          example: {
            title: "Use an optional quantity",
            filename: "lesson-05-defaults.js",
            code: `function calculateTotal(unitPricePaise, quantity = 1) {
  return unitPricePaise * quantity;
}

console.log(calculateTotal(20000));
console.log(calculateTotal(20000, 3));
console.log(calculateTotal(20000, 0));`,
            command: "node lesson-05-defaults.js",
            output: `20000
60000
0`,
            explanation:
              "Only the first call uses the default quantity. This calculation helper does not enforce a positive-quantity rule.",
          },
        },
        {
          title: "Prefer explicit inputs and predictable results",
          paragraphs: [
            "A pure function produces the same result for the same inputs and does not change state outside itself. Such helpers are usually easy to test.",
            "Page actions, file writes, and API requests necessarily involve effects. Keep those responsibilities clear instead of mixing unrelated work into a calculation helper.",
            "Returning data lets the caller choose what to do with it. Logging inside a helper is not a replacement for returning its result.",
          ],
        },
      ],
      mistakes: [
        "Forgetting return inside a function body.",
        "Expecting console.log to return the printed value.",
        "Using a variable outside the scope where it was declared.",
        "Assuming a default parameter validates input.",
        "Reading or changing shared test state when explicit arguments would be clearer.",
      ],
      exercise: {
        title: "Build a reusable order-quantity check",
        instructions: [
          "Create canOrder(quantity, stock).",
          "Return true only for integer quantities from 1 to 5 that do not exceed stock.",
          "Require stock to be a non-negative integer.",
          "Try valid, insufficient-stock, and decimal-quantity examples.",
        ],
        filename: "lesson-05-exercise.js",
        solution: `function canOrder(quantity, stock) {
  return (
    Number.isInteger(quantity) &&
    Number.isInteger(stock) &&
    stock >= 0 &&
    quantity >= 1 &&
    quantity <= 5 &&
    quantity <= stock
  );
}

console.log(canOrder(2, 3));
console.log(canOrder(4, 3));
console.log(canOrder(1.5, 3));
console.log(canOrder(1, 0));`,
        command: "node lesson-05-exercise.js",
        output: `true
false
false
false`,
        explanation:
          "The helper combines input validation with the quantity and stock rules. It returns a boolean without changing any external state.",
      },
      takeaway:
        "Small functions with explicit inputs and useful return values are the foundation of reusable test utilities.",
    },
  },
  {
    number: 6,
    slug: "arrays-and-objects",
    title: "Arrays and Objects",
    description:
      "Represent collections and structured test data, then select and transform values.",
    content: {
      introduction:
        "Arrays represent ordered collections. Objects group related properties. Together, they help you model products, users, API responses, and test scenarios.",
      objectives: [
        "Create arrays and objects and access their values.",
        "Use map, filter, find, some, every, and reduce.",
        "Understand mutation, references, and shallow copies.",
        "Use destructuring and spread syntax.",
      ],
      sections: [
        {
          title: "Arrays: ordered collections",
          paragraphs: [
            "An array stores values in order. Its first index is 0, and its length describes the number of elements.",
            "Reading an index that is not present normally returns undefined. Check your assumptions before using the value.",
          ],
          example: {
            title: "Read and extend an array",
            filename: "lesson-06-arrays.js",
            code: `const browsers = ["chromium", "firefox"];

console.log(browsers[0]);
console.log(browsers.length);

browsers.push("webkit");

console.log(browsers.join(", "));
console.log(browsers[10]);`,
            command: "node lesson-06-arrays.js",
            output: `chromium
2
chromium, firefox, webkit
undefined`,
            explanation:
              "push changes the existing array. A const binding prevents reassignment of browsers, but it does not prevent changes to its contents.",
          },
        },
        {
          title: "Objects: related properties",
          paragraphs: [
            "An object stores named properties. Use dot notation for a known property name or bracket notation when the property name comes from a variable.",
            "Destructuring extracts selected properties into local variables.",
          ],
          example: {
            title: "Describe a product",
            filename: "lesson-06-objects.js",
            code: `const product = {
  id: "P-101",
  name: "Keyboard",
  pricePaise: 25000,
  stock: 3,
};

const propertyName = "stock";
const { name, pricePaise } = product;

console.log(product.id);
console.log(product[propertyName]);
console.log(name);
console.log(pricePaise);`,
            command: "node lesson-06-objects.js",
            output: `P-101
3
Keyboard
25000`,
            explanation:
              "The object describes one product. Destructuring creates local bindings for name and pricePaise.",
          },
        },
        {
          title: "Transform and select array elements",
          paragraphs: [
            "map creates an array from transformed values. filter creates an array containing matching elements. find returns the first matching element, or undefined when nothing matches.",
            "These methods do not automatically deep-copy their elements. If an element is an object, references to that object can still be shared.",
          ],
          example: {
            title: "Select available products",
            filename: "lesson-06-selection.js",
            code: `const products = [
  { id: "P1", name: "Keyboard", stock: 3 },
  { id: "P2", name: "Mouse", stock: 0 },
  { id: "P3", name: "Monitor", stock: 2 },
];

const available = products.filter((product) => product.stock > 0);
const names = available.map((product) => product.name);
const selected = products.find((product) => product.id === "P2");

console.log(names.join(", "));
console.log(selected?.name ?? "Not found");`,
            command: "node lesson-06-selection.js",
            output: `Keyboard, Monitor
Mouse`,
            explanation:
              "Optional chaining avoids reading name from null or undefined. The nullish coalescing operator supplies a fallback only for null or undefined.",
          },
        },
        {
          title: "Check collections and calculate totals",
          paragraphs: [
            "some checks whether at least one element matches. every checks whether all elements match. reduce accumulates a result across the collection.",
            "For an empty array, some returns false and every returns true. If a test requires at least one result, check length as well.",
          ],
          example: {
            title: "Inspect a cart",
            filename: "lesson-06-cart.js",
            code: `const cart = [
  { pricePaise: 10000, quantity: 2 },
  { pricePaise: 5000, quantity: 1 },
];

const total = cart.reduce(
  (sum, item) => sum + item.pricePaise * item.quantity,
  0
);

console.log(total);
console.log(cart.some((item) => item.quantity > 1));
console.log(cart.every((item) => item.quantity >= 1));
console.log([].every((item) => item.quantity >= 1));`,
            command: "node lesson-06-cart.js",
            output: `25000
true
true
true`,
            explanation:
              "The initial reduce value is 0, so an empty cart also produces a defined total. The last result demonstrates why every alone does not establish that a collection contains items.",
          },
        },
        {
          title: "References and shallow copies",
          paragraphs: [
            "Assigning an object to another variable copies the reference, not the object. Changing the object through one reference is visible through the other.",
            "Object spread creates a shallow copy. Nested objects remain shared unless you copy those levels as well.",
          ],
          example: {
            title: "Prepare independent test data",
            filename: "lesson-06-copies.js",
            code: `const original = {
  name: "Customer",
  address: { city: "Bengaluru" },
};

const shallowCopy = { ...original };
shallowCopy.address.city = "Chennai";

console.log(original.address.city);

const independentCopy = {
  ...original,
  address: { ...original.address },
};

independentCopy.address.city = "Mysuru";

console.log(original.address.city);
console.log(independentCopy.address.city);`,
            command: "node lesson-06-copies.js",
            output: `Chennai
Chennai
Mysuru`,
            explanation:
              "The first copy shares the nested address. The second explicitly copies address, so changing its city does not affect original.",
          },
        },
        {
          title: "Sort without changing the original array",
          paragraphs: [
            "sort changes the array on which it is called. Its default ordering compares string representations, which is often wrong for numbers.",
            "Copy the array first when you need to preserve its original order, and provide a numeric comparator.",
          ],
          example: {
            title: "Sort numeric prices",
            filename: "lesson-06-sort.js",
            code: `const prices = [100, 20, 3];
const sortedPrices = [...prices].sort((a, b) => a - b);

console.log(sortedPrices.join(", "));
console.log(prices.join(", "));`,
            command: "node lesson-06-sort.js",
            output: `3, 20, 100
100, 20, 3`,
            explanation:
              "The spread copies the array before sorting. Because these elements are numbers, there are no nested object references to consider.",
          },
        },
      ],
      mistakes: [
        "Using index 1 when you intend to read the first element.",
        "Assuming find always returns an object.",
        "Expecting const to make an array or object immutable.",
        "Treating an object spread as a deep copy.",
        "Using every without checking that required results exist.",
        "Sorting numbers without a numeric comparator.",
      ],
      exercise: {
        title: "Select valid cart items and calculate their total",
        instructions: [
          "Use the provided cart containing quantities 2, 0, and 1.",
          "Keep items whose quantity is greater than 0.",
          "Calculate the total in paise.",
          "Leave the original array unchanged.",
        ],
        filename: "lesson-06-exercise.js",
        solution: `const cart = [
  { name: "Keyboard", pricePaise: 20000, quantity: 2 },
  { name: "Mouse", pricePaise: 10000, quantity: 0 },
  { name: "Cable", pricePaise: 5000, quantity: 1 },
];

const selected = cart.filter((item) => item.quantity > 0);
const totalPaise = selected.reduce(
  (sum, item) => sum + item.pricePaise * item.quantity,
  0
);

console.log(selected.map((item) => item.name).join(", "));
console.log(totalPaise);
console.log(cart.length);`,
        command: "node lesson-06-exercise.js",
        output: `Keyboard, Cable
45000
3`,
        explanation:
          "filter creates a new array, and reduce calculates the total. This exercise selects known data; a production validator should report invalid inputs according to its contract rather than silently discard them.",
      },
      takeaway:
        "Use arrays and objects to express clear data models. Understand which operations change data and where references remain shared.",
    },
  },
  {
    number: 7,
    slug: "strings-dates-and-json",
    title: "Strings, Dates, and JSON",
    description:
      "Transform text, handle timestamps explicitly, and parse JSON without confusing parsing with validation.",
    content: {
      introduction:
        "Tests frequently compare text, inspect timestamps, and exchange JSON. Small differences in normalization, timezone, and data shape can change the result.",
      objectives: [
        "Use common string operations deliberately.",
        "Create and compare explicit timestamps.",
        "Serialize and parse JSON.",
        "Validate important properties after parsing.",
      ],
      sections: [
        {
          title: "Normalize text only when the requirement allows it",
          paragraphs: [
            "trim removes whitespace from the beginning and end of a string. toLowerCase creates a lowercase string. includes checks whether a substring occurs.",
            "Strings are immutable: these operations produce values without changing the original string.",
            "Do not normalize away a real defect. If exact capitalization or spacing matters, compare the original text.",
          ],
          example: {
            title: "Prepare a search term",
            filename: "lesson-07-strings.js",
            code: `const rawSearch = "  Keyboard  ";
const search = rawSearch.trim().toLowerCase();

console.log(search);
console.log(search.includes("board"));
console.log(rawSearch.length);
console.log(search.length);`,
            command: "node lesson-07-strings.js",
            output: `keyboard
true
12
8`,
            explanation:
              "The original text contains four surrounding spaces. Normalization is suitable only if the search contract ignores those spaces and letter case.",
          },
        },
        {
          title: "Split and combine simple text",
          paragraphs: [
            "split divides a string into an array using a separator. join combines array elements into a string.",
            "A simple comma split is appropriate for a controlled list, but it is not a complete CSV parser. CSV can contain quoted separators and line breaks.",
          ],
          example: {
            title: "Read a simple browser list",
            filename: "lesson-07-split.js",
            code: `const setting = "chromium, firefox, webkit";

const browsers = setting
  .split(",")
  .map((browser) => browser.trim());

console.log(browsers.length);
console.log(browsers.join(" | "));`,
            command: "node lesson-07-split.js",
            output: `3
chromium | firefox | webkit`,
            explanation:
              "Each item is trimmed after splitting. For this controlled input, the resulting array has three browser names.",
          },
        },
        {
          title: "Use explicit timestamps",
          paragraphs: [
            "A JavaScript Date represents a timestamp in milliseconds relative to the Unix epoch. Local display methods can produce different results in different timezones.",
            "For deterministic examples, use an explicit offset or Z for UTC. toISOString displays a valid timestamp in UTC.",
            "An invalid date has a getTime result of NaN. Check validity before formatting or comparing untrusted date input.",
          ],
          example: {
            title: "Compare an expiry instant",
            filename: "lesson-07-dates.js",
            code: `const now = new Date("2026-01-01T12:00:00Z");
const expiresAt = new Date("2026-01-01T12:05:00Z");

const remainingMilliseconds =
  expiresAt.getTime() - now.getTime();

console.log(expiresAt.toISOString());
console.log(remainingMilliseconds / 60000);
console.log(now.getTime() >= expiresAt.getTime());`,
            command: "node lesson-07-dates.js",
            output: `2026-01-01T12:05:00.000Z
5
false`,
            explanation:
              "This example defines expiry as now being at or after the expiry instant. The timestamps are fixed so the output does not depend on the day you run it.",
          },
        },
        {
          title: "Understand JSON",
          paragraphs: [
            "JSON is a text format for exchanging structured data. It supports objects, arrays, strings, numbers, booleans, and null.",
            "JSON uses double-quoted property names and strings. It does not support comments, functions, undefined, or trailing commas.",
            "JSON.stringify produces JSON text. JSON.parse reads JSON text and returns a JavaScript value.",
          ],
          example: {
            title: "Serialize and parse an order",
            filename: "lesson-07-json.js",
            code: `const order = {
  id: "O-101",
  totalPaise: 45000,
  paid: true,
};

const text = JSON.stringify(order);
const parsed = JSON.parse(text);

console.log(text);
console.log(parsed.id);
console.log(typeof parsed.totalPaise);`,
            command: "node lesson-07-json.js",
            output: `{"id":"O-101","totalPaise":45000,"paid":true}
O-101
number`,
            explanation:
              "The serialized value is text. Parsing recreates JavaScript data, but it does not prove that the data satisfies your order contract.",
          },
        },
        {
          title: "Parsing is not validation",
          paragraphs: [
            "Valid JSON can represent an unexpected shape, including null, a number, an array, or an object with incorrect property types.",
            "Check the shape and business rules you depend on. A TypeScript annotation alone will not validate parsed data at runtime.",
            "Date values serialized to JSON normally become strings. Parsing does not automatically restore Date instances.",
          ],
          example: {
            title: "Validate selected order properties",
            filename: "lesson-07-validation.js",
            code: `const value = JSON.parse(
  '{"id":"O-101","totalPaise":45000}'
);

const valid =
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  typeof value.id === "string" &&
  value.id.length > 0 &&
  Number.isSafeInteger(value.totalPaise) &&
  value.totalPaise >= 0;

console.log(valid);`,
            command: "node lesson-07-validation.js",
            output: "true",
            explanation:
              "These checks validate the selected properties for this example. A complete application contract may require additional fields and constraints.",
          },
        },
      ],
      mistakes: [
        "Trimming or lowercasing values when exact text is required.",
        "Treating split(',') as a complete CSV parser.",
        "Using ambiguous date strings without an agreed timezone.",
        "Using the current time when a fixed timestamp would make a test predictable.",
        "Assuming valid JSON must be a valid domain object.",
        "Expecting JSON.parse to restore Date instances.",
      ],
      exercise: {
        title: "Read a scheduled order",
        instructions: [
          "Parse the supplied JSON.",
          "Trim the customer's name for display.",
          "Convert createdAt to a Date and verify it is valid.",
          "Print the name and UTC timestamp.",
        ],
        filename: "lesson-07-exercise.js",
        solution: `const text =
  '{"customer":"  Nirmal  ","createdAt":"2026-01-01T10:00:00Z"}';

const order = JSON.parse(text);

if (
  order === null ||
  typeof order !== "object" ||
  Array.isArray(order) ||
  typeof order.customer !== "string" ||
  typeof order.createdAt !== "string"
) {
  throw new Error("Invalid order shape");
}

const createdAt = new Date(order.createdAt);

if (Number.isNaN(createdAt.getTime())) {
  throw new Error("Invalid creation timestamp");
}

console.log(order.customer.trim());
console.log(createdAt.toISOString());`,
        command: "node lesson-07-exercise.js",
        output: `Nirmal
2026-01-01T10:00:00.000Z`,
        explanation:
          "The shape is checked before accessing string methods, and the date is checked before formatting. The trimming rule is explicitly part of this exercise.",
      },
      takeaway:
        "Be explicit about text normalization, timestamp interpretation, and data validation. Parsing a value is only the beginning of checking it.",
    },
  },
  {
    number: 8,
    slug: "modules-npm-and-project-structure",
    title: "Modules, npm, and Project Structure",
    description:
      "Separate reusable helpers from callers and understand package manifests, scripts, and lockfiles.",
    content: {
      introduction:
        "As practice code grows, modules help you organize responsibilities. npm provides a standard way to describe dependencies and repeatable commands.",
      objectives: [
        "Export and import a reusable function.",
        "Understand named and default exports.",
        "Recognize the roles of package.json and the lockfile.",
        "Organize a small practice project.",
      ],
      sections: [
        {
          title: "Why use modules?",
          paragraphs: [
            "A module is a file with its own scope that exposes selected values to other modules.",
            "Keep calculation helpers separate from scripts that display results. This makes it easier to reuse and test behavior without duplicating it.",
            "For this lesson, use .mjs files so Node treats them as ECMAScript modules without requiring a package.json change.",
          ],
        },
        {
          title: "Create a named export",
          paragraphs: [
            "Inside your practice folder, create a folder named lesson-08. Add pricing.mjs and run.mjs inside it.",
            "Save the helper below as pricing.mjs first. The next section supplies its caller.",
          ],
          example: {
            title: "Export a calculation helper",
            filename: "lesson-08/pricing.mjs",
            code: `export function calculateTotal(unitPricePaise, quantity) {
  return unitPricePaise * quantity;
}`,
            command: "node lesson-08/pricing.mjs",
            output: "(No output)",
            explanation:
              "This file exports a function but does not call it. Executing it directly therefore produces no console output.",
          },
        },
        {
          title: "Import and call the helper",
          paragraphs: [
            "A relative import is resolved from the importing file, not from the terminal's working folder.",
            "Use the matching exported name inside braces. Include the file extension for this Node ESM example.",
            "Run the command from the root of your practice folder.",
          ],
          example: {
            title: "Use the named export",
            filename: "lesson-08/run.mjs",
            code: `import { calculateTotal } from "./pricing.mjs";

console.log(calculateTotal(15000, 2));`,
            command: "node lesson-08/run.mjs",
            output: "30000",
            explanation:
              "Both files are in lesson-08, so ./pricing.mjs refers to the sibling helper file.",
          },
        },
        {
          title: "Named and default exports",
          paragraphs: [
            "A module can have multiple named exports. A default export provides one default value, imported without braces.",
            "For example, export default function calculateTotal(...) would be imported with import calculateTotal from './pricing.mjs'. Do not change only one side of the existing example.",
            "This course uses named exports for helpers so the imported names remain easy to recognize.",
          ],
        },
        {
          title: "What does npm manage?",
          paragraphs: [
            "package.json describes a package, including its scripts and dependency declarations. npm init -y creates a basic manifest in the current folder.",
            "package-lock.json records a resolved dependency tree. Commit it with an application project so dependency installation can be reproduced more consistently.",
            "node_modules contains installed dependencies. It is generally generated rather than committed to version control.",
            "The examples in this lesson do not require a third-party dependency.",
          ],
          bullets: [
            "npm install installs dependencies and can update the lockfile.",
            "npm install -D package-name declares a development dependency.",
            "npm ci requires an existing compatible lockfile and performs a clean installation without updating it.",
            "npm run script-name executes a script defined in package.json.",
          ],
        },
        {
          title: "Add a repeatable project command",
          paragraphs: [
            "In your separate practice folder, run npm init -y if package.json does not exist.",
            "In its scripts object, add an entry named lesson:08 whose value is node lesson-08/run.mjs.",
            "You can then run npm run lesson:08. npm may print a script banner before the program's output.",
            "Make this change in the practice project, not in the Learning Hub application.",
          ],
          bullets: [
            "Keep lesson exercises in clearly named folders.",
            "Use descriptive helper filenames such as pricing.mjs.",
            "Keep real credentials out of examples and source control.",
            "Introduce dependencies when they solve an identified problem.",
          ],
        },
      ],
      mistakes: [
        "Mixing a named export with default-import syntax.",
        "Omitting the relative path prefix or required extension.",
        "Assuming imports are relative to the terminal working folder.",
        "Running npm init in the wrong project.",
        "Running npm ci before a compatible lockfile exists.",
        "Committing node_modules instead of the manifest and lockfile.",
      ],
      exercise: {
        title: "Add a reusable quantity validator",
        instructions: [
          "Create quantity.mjs inside lesson-08.",
          "Export isAllowedQuantity, accepting only whole numbers from 1 to 5.",
          "Create exercise.mjs beside it and import the function.",
          "Print the results for quantities 3 and 6.",
        ],
        filename:
          "Two files: lesson-08/quantity.mjs and lesson-08/exercise.mjs",
        solution: `// File: lesson-08/quantity.mjs
export function isAllowedQuantity(quantity) {
  return (
    Number.isInteger(quantity) &&
    quantity >= 1 &&
    quantity <= 5
  );
}

// File: lesson-08/exercise.mjs
// Save this part in its own file.
import { isAllowedQuantity } from "./quantity.mjs";

console.log(isAllowedQuantity(3));
console.log(isAllowedQuantity(6));`,
        command: "node lesson-08/exercise.mjs",
        output: `true
false`,
        explanation:
          "Create two separate files at the indicated comments. The helper owns the validation rule; the caller imports and uses it.",
      },
      takeaway:
        "Use modules to make responsibilities clear and npm scripts to make commands repeatable. Keep dependency and configuration changes in the intended project.",
    },
  },
  {
    number: 9,
    slug: "async-await-and-error-handling",
    title: "Promises, Async/Await, and Error Handling",
    description:
      "Wait for asynchronous results, handle failures deliberately, and coordinate independent work.",
    content: {
      introduction:
        "Browser actions, network requests, and many file operations finish asynchronously. Promises describe their eventual results, and async/await helps you coordinate them.",
      objectives: [
        "Understand pending, fulfilled, and rejected promises.",
        "Use async functions and await.",
        "Handle expected failures without hiding unexpected ones.",
        "Choose between sequential execution and Promise.all.",
      ],
      sections: [
        {
          title: "What is a Promise?",
          paragraphs: [
            "A Promise represents the eventual result of an operation. It begins pending and can settle as fulfilled with a value or rejected with a reason.",
            "Returning a Promise does not mean the result is already available. Code that needs its value must coordinate with its completion.",
            "An async function always returns a Promise, even when its return statement contains a plain value.",
          ],
          example: {
            title: "Await an async function",
            filename: "lesson-09-promise.mjs",
            code: `async function getOrderId() {
  return "O-101";
}

const result = getOrderId();

console.log(result instanceof Promise);
console.log(await result);`,
            command: "node lesson-09-promise.mjs",
            output: `true
O-101`,
            explanation:
              "The async function wraps its returned value in a Promise. The .mjs file allows top-level await.",
          },
        },
        {
          title: "await pauses the current async flow",
          paragraphs: [
            "await waits for a Promise to settle before continuing the current async function or module. It does not block the entire JavaScript runtime while waiting.",
            "These examples simulate delayed work locally. The timer demonstrates asynchronous behavior; it is not a recommendation to use fixed sleeps in browser tests.",
          ],
          example: {
            title: "Observe execution order",
            filename: "lesson-09-order.mjs",
            code: `function loadOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: "O-101" });
    }, 20);
  });
}

console.log("Before");
const order = await loadOrder();
console.log(order.id);
console.log("After");`,
            command: "node lesson-09-order.mjs",
            output: `Before
O-101
After`,
            explanation:
              "The code after await uses the resolved order. The exact timer duration is not an assertion or a guaranteed scheduling deadline.",
          },
        },
        {
          title: "Handle a known failure",
          paragraphs: [
            "Use try/catch around an awaited operation when you intend to handle its failure. finally runs after the try/catch path and is useful for cleanup.",
            "A catch block should recover deliberately, add useful context and rethrow, or report failure to the caller. Logging an unexpected error and continuing can make a broken test look successful.",
          ],
          example: {
            title: "Handle an intentionally missing order",
            filename: "lesson-09-errors.mjs",
            code: `async function loadOrder(id) {
  if (id !== "O-101") {
    throw new Error("Order not found");
  }

  return { id };
}

try {
  await loadOrder("missing");
} catch (error) {
  if (
    !(error instanceof Error) ||
    error.message !== "Order not found"
  ) {
    throw error;
  }

  console.log("Handled expected missing order");
} finally {
  console.log("Finished attempt");
}`,
            command: "node lesson-09-errors.mjs",
            output: `Handled expected missing order
Finished attempt`,
            explanation:
              "The example handles only the failure it deliberately requested. Other failures are rethrown instead of being silently accepted.",
          },
        },
        {
          title: "Sequential work and independent work",
          paragraphs: [
            "Use sequential awaits when a later operation depends on an earlier result.",
            "Promise.all coordinates independent operations. It returns results in input order and rejects if one input rejects. It does not automatically cancel the other operations.",
            "Do not run stateful operations concurrently merely to make a test faster. They may share data or require a particular order.",
          ],
          example: {
            title: "Load independent values",
            filename: "lesson-09-all.mjs",
            code: `async function loadUser() {
  return { name: "Nirmal" };
}

async function loadProducts() {
  return ["Keyboard", "Mouse"];
}

const [user, products] = await Promise.all([
  loadUser(),
  loadProducts(),
]);

console.log(user.name);
console.log(products.length);`,
            command: "node lesson-09-all.mjs",
            output: `Nirmal
2`,
            explanation:
              "The two operations do not depend on each other's results. In a real application they might perform independent requests.",
          },
        },
        {
          title: "Await work inside collections",
          paragraphs: [
            "Array.forEach does not wait for Promises returned by an async callback.",
            "Use a for...of loop with await for sequential work. For independent work, use Promise.all with map and await the combined result.",
            "A for...of loop visits array values. A for...in loop visits enumerable property keys and is usually not the intended choice for this task.",
          ],
          example: {
            title: "Process identifiers in order",
            filename: "lesson-09-loop.mjs",
            code: `async function verifyOrder(id) {
  return "Verified " + id;
}

const ids = ["O-101", "O-102"];

for (const id of ids) {
  console.log(await verifyOrder(id));
}

console.log("All checks finished");`,
            command: "node lesson-09-loop.mjs",
            output: `Verified O-101
Verified O-102
All checks finished`,
            explanation:
              "The completion message runs after both awaited operations finish.",
          },
        },
        {
          title: "Apply this to test automation",
          paragraphs: [
            "Await asynchronous actions and assertions when the framework requires it. Otherwise, a test can finish before its intended checks complete.",
            "For browser tests, wait for observable page conditions rather than using arbitrary delays.",
            "With fetch, an HTTP error status such as 404 does not by itself reject the Promise. Inspect the response status or ok property and validate the body according to the contract.",
          ],
        },
      ],
      mistakes: [
        "Forgetting await and treating a Promise as the resolved value.",
        "Using async callbacks with forEach and assuming the loop waits.",
        "Catching every failure and printing a success message afterward.",
        "Running dependent actions concurrently.",
        "Assuming Promise.all cancels remaining work after a rejection.",
        "Treating a completed HTTP request as proof of a successful business outcome.",
      ],
      exercise: {
        title: "Validate an asynchronously loaded order",
        instructions: [
          "Create an async function returning an order with totalPaise 50000.",
          "Await the order and verify its total.",
          "Throw an error when the total is incorrect.",
          "Print success only after verification.",
        ],
        filename: "lesson-09-exercise.mjs",
        solution: `async function loadOrder() {
  return {
    id: "O-101",
    totalPaise: 50000,
  };
}

const order = await loadOrder();

if (order.totalPaise !== 50000) {
  throw new Error("Unexpected order total");
}

console.log("Verified order:", order.id);`,
        command: "node lesson-09-exercise.mjs",
        output: "Verified order: O-101",
        explanation:
          "The check runs after the Promise resolves. Change the returned total to observe an intentional failure. This is a local simulation, not a call to a real order service.",
      },
      takeaway:
        "Coordinate asynchronous work explicitly. Await completion, preserve meaningful failures, and run operations concurrently only when their dependencies allow it.",
    },
  },
  {
    number: 10,
    slug: "typescript-types-and-unions",
    title: "TypeScript Types, Inference, and Unions",
    description:
      "Set up TypeScript, describe valid values, and catch incompatible usage.",
    content: {
      introduction:
        "TypeScript checks how your code uses values before execution. Learn how to compile small examples, understand inferred types, and represent values with more than one permitted form.",
      objectives: [
        "Compile and run a small TypeScript program.",
        "Understand type annotations and inference.",
        "Use literal unions to represent permitted values.",
        "Distinguish compile-time checks from runtime validation.",
      ],
      sections: [
        {
          title: "Set up TypeScript in your practice project",
          paragraphs: [
            "Use the separate sdet-programming-practice folder, not the Learning Hub application.",
            "If that folder does not contain package.json, run npm init -y. Then run npm install -D typescript to install the compiler locally.",
            "Run npx tsc --version to confirm the local compiler is available.",
            "For Lessons 10–15, save examples with the .cts extension. The commands compile them to .cjs files so their execution does not depend on the package's JavaScript module setting.",
            "Each example ends with export {} to give it its own module scope. Keep that line when copying the example.",
          ],
          bullets: [
            "Write the .cts source file in your practice folder.",
            "Run the displayed compiler command.",
            "Only if compilation succeeds, run the generated .cjs file.",
            "Edit the source file rather than the generated file.",
            "The --strict option enables stricter type checking.",
            "The --noEmitOnError option prevents new output when compilation has errors.",
          ],
        },
        {
          title: "Type annotations and inference",
          paragraphs: [
            "An annotation explicitly describes a value's type. Inference lets TypeScript determine a type from the code.",
            "You do not need to annotate every obvious local variable. Function inputs and public contracts are useful places for explicit types.",
          ],
          example: {
            title: "Describe inputs and a return value",
            filename: "lesson-10-types.cts",
            code: `function calculateTotal(
  unitPricePaise: number,
  quantity: number
): number {
  return unitPricePaise * quantity;
}

const productName = "Keyboard";
const total = calculateTotal(20000, 2);

console.log(productName);
console.log(total);

export {};`,
            command:
              "npx tsc lesson-10-types.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-10-types.cjs",
            output: `Keyboard
40000`,
            explanation:
              "productName and total have inferred types. Passing a string as quantity would produce a compiler error.",
          },
        },
        {
          title: "Primitive types and arrays",
          paragraphs: [
            "Common annotations include string, number, boolean, and arrays such as string[]. Use the lowercase primitive names.",
            "The number type does not mean positive integer or valid money. Values such as negative numbers, decimals, and NaN still require runtime checks when the contract excludes them.",
          ],
          example: {
            title: "Type a browser list",
            filename: "lesson-10-arrays.cts",
            code: `const browsers: string[] = ["chromium", "firefox"];
const retries: number = 2;
const enabled: boolean = true;

console.log(browsers.join(", "));
console.log(retries);
console.log(enabled);

export {};`,
            command:
              "npx tsc lesson-10-arrays.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-10-arrays.cjs",
            output: `chromium, firefox
2
true`,
            explanation:
              "The array accepts strings. A number annotation alone does not enforce a sensible retry count.",
          },
        },
        {
          title: "Literal unions",
          paragraphs: [
            "A union permits values from more than one type. A literal union can restrict a value to specific strings.",
            "This is useful for known statuses, roles, and configuration choices. It catches spelling mistakes in typed code.",
          ],
          example: {
            title: "Represent an order status",
            filename: "lesson-10-unions.cts",
            code: `type OrderStatus = "pending" | "paid" | "cancelled";

function canShip(status: OrderStatus): boolean {
  return status === "paid";
}

console.log(canShip("paid"));
console.log(canShip("pending"));

export {};`,
            command:
              "npx tsc lesson-10-unions.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-10-unions.cjs",
            output: `true
false`,
            explanation:
              "Calling canShip with 'unknown-status' would fail type checking. External status values must still be validated.",
          },
        },
        {
          title: "Type checking does not validate external data",
          paragraphs: [
            "Type annotations and type assertions do not automatically check incoming JSON. They describe what the compiler should believe about values.",
            "A type assertion using as is not a conversion or validation step. Use runtime checks when data enters your program from an API, file, environment variable, or user input.",
            "We will use unknown and narrowing in Lesson 14 to handle external values more safely.",
          ],
        },
      ],
      mistakes: [
        "Expecting type annotations to validate an API response.",
        "Using as to silence a mismatch without checking the data.",
        "Assuming number means a positive integer.",
        "Running a TypeScript example without following its compilation instructions.",
        "Editing generated JavaScript instead of the TypeScript source.",
      ],
      exercise: {
        title: "Define supported browsers",
        instructions: [
          "Create a BrowserName union for chromium, firefox, and webkit.",
          "Write a function accepting BrowserName and returning a label.",
          "Call it with firefox.",
          "Temporarily try an unsupported value to observe the compiler error.",
        ],
        filename: "lesson-10-exercise.cts",
        solution: `type BrowserName = "chromium" | "firefox" | "webkit";

function browserLabel(browser: BrowserName): string {
  return "Run on " + browser;
}

console.log(browserLabel("firefox"));

export {};`,
        command:
          "npx tsc lesson-10-exercise.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-10-exercise.cjs",
        output: "Run on firefox",
        explanation:
          "The union documents supported values and rejects unsupported string literals in typed calls.",
      },
      takeaway:
        "TypeScript helps detect incompatible usage before execution. Keep runtime validation for values and business rules that static types cannot establish.",
    },
  },
  {
    number: 11,
    slug: "type-aliases-and-interfaces",
    title: "Type Aliases, Interfaces, and Optional Properties",
    description:
      "Model reusable test-data contracts and handle optional values deliberately.",
    content: {
      introduction:
        "Named types make test data and helper contracts easier to understand. Learn how interfaces and type aliases describe shapes without creating runtime objects.",
      objectives: [
        "Describe object shapes with interfaces and type aliases.",
        "Handle optional properties and null deliberately.",
        "Understand readonly and structural typing.",
        "Compose related contracts.",
      ],
      sections: [
        {
          title: "Interfaces describe object contracts",
          paragraphs: [
            "An interface describes the properties and methods an object must provide. It does not create the object or validate incoming data.",
            "Use clear names that describe the role of the data rather than the file where it happens to be used.",
          ],
          example: {
            title: "Model a test user",
            filename: "lesson-11-interface.cts",
            code: `interface TestUser {
  id: string;
  email: string;
  active: boolean;
}

function describeUser(user: TestUser): string {
  return user.id + ": " + user.email;
}

const user: TestUser = {
  id: "U-101",
  email: "tester@example.com",
  active: true,
};

console.log(describeUser(user));

export {};`,
            command:
              "npx tsc lesson-11-interface.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-11-interface.cjs",
            output: "U-101: tester@example.com",
            explanation:
              "The interface makes required properties visible. Missing email or supplying a boolean ID would produce a type error.",
          },
        },
        {
          title: "Type aliases can name different kinds of types",
          paragraphs: [
            "A type alias can name an object shape, a union, a function type, or another type expression.",
            "Interfaces can extend object contracts and support declaration merging. Type aliases can express unions and intersections. Choose a consistent convention rather than assuming one is always superior.",
          ],
          example: {
            title: "Combine a role and a user shape",
            filename: "lesson-11-alias.cts",
            code: `type Role = "customer" | "admin";

type User = {
  id: string;
  role: Role;
};

type UserPredicate = (user: User) => boolean;

const isAdmin: UserPredicate = (user) =>
  user.role === "admin";

console.log(isAdmin({ id: "U-1", role: "admin" }));

export {};`,
            command:
              "npx tsc lesson-11-alias.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-11-alias.cjs",
            output: "true",
            explanation:
              "The function type describes the input and output expected from isAdmin.",
          },
        },
        {
          title: "Optional properties and nullable values",
          paragraphs: [
            "A question mark marks a property as optional. Reading it may produce undefined, so the caller must handle absence.",
            "An optional property and a property whose value may be null express different contracts. Reflect the actual domain instead of using them interchangeably.",
            "Use ?? when the fallback should apply only to null or undefined. Unlike ||, it preserves values such as an empty string or 0.",
          ],
          example: {
            title: "Handle optional display names",
            filename: "lesson-11-optional.cts",
            code: `interface Profile {
  email: string;
  displayName?: string;
  avatarUrl: string | null;
}

function label(profile: Profile): string {
  return profile.displayName ?? profile.email;
}

console.log(label({
  email: "tester@example.com",
  avatarUrl: null,
}));

console.log(label({
  email: "tester@example.com",
  displayName: "Nirmal",
  avatarUrl: null,
}));

export {};`,
            command:
              "npx tsc lesson-11-optional.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-11-optional.cjs",
            output: `tester@example.com
Nirmal`,
            explanation:
              "displayName may be absent. avatarUrl is required, but null is an allowed value.",
          },
        },
        {
          title: "Readonly and structural typing",
          paragraphs: [
            "readonly prevents assignment through that typed property during type checking. It does not freeze the object at runtime or automatically make nested objects deeply immutable.",
            "TypeScript commonly compares compatibility by structure: a value can satisfy a contract by having the required members.",
            "Fresh object literals receive additional excess-property checks. Types are not a guarantee that an object contains only the listed keys at runtime.",
          ],
          example: {
            title: "Extend an object contract",
            filename: "lesson-11-extends.cts",
            code: `interface Entity {
  readonly id: string;
}

interface Product extends Entity {
  name: string;
}

const product: Product = {
  id: "P-101",
  name: "Keyboard",
};

product.name = "Mechanical Keyboard";
console.log(product.id);
console.log(product.name);

export {};`,
            command:
              "npx tsc lesson-11-extends.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-11-extends.cjs",
            output: `P-101
Mechanical Keyboard`,
            explanation:
              "name can be reassigned through Product, while id is readonly in this contract.",
          },
        },
      ],
      mistakes: [
        "Treating an interface as a runtime validator.",
        "Using an optional property without handling undefined.",
        "Using || when 0 or an empty string should be preserved.",
        "Assuming readonly freezes nested objects.",
        "Assuming structural typing guarantees an exact runtime key set.",
      ],
      exercise: {
        title: "Model a product with an optional description",
        instructions: [
          "Create Product with readonly id, name, pricePaise, and optional description.",
          "Write a function returning the description or 'No description'.",
          "Call it for a product without a description.",
        ],
        filename: "lesson-11-exercise.cts",
        solution: `interface Product {
  readonly id: string;
  name: string;
  pricePaise: number;
  description?: string;
}

function describe(product: Product): string {
  return product.description ?? "No description";
}

const product: Product = {
  id: "P-101",
  name: "Keyboard",
  pricePaise: 25000,
};

console.log(describe(product));

export {};`,
        command:
          "npx tsc lesson-11-exercise.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-11-exercise.cjs",
        output: "No description",
        explanation:
          "The optional field is handled explicitly. The interface describes structure; price validity remains a separate runtime concern.",
      },
      takeaway:
        "Use named contracts to clarify required data, optional values, and intended usage. Keep their compile-time guarantees separate from runtime validation.",
    },
  },
  {
    number: 12,
    slug: "oop-concepts-in-typescript",
    title: "OOP Concepts in TypeScript",
    description:
      "Learn classes, objects, encapsulation, abstraction, inheritance, polymorphism, and composition.",
    content: {
      introduction:
        "Object-oriented programming organizes related state and behavior. Learn the concepts first, then apply them to page objects in the next lesson.",
      objectives: [
        "Create classes, objects, constructors, and methods.",
        "Explain encapsulation and access modifiers.",
        "Understand abstraction, inheritance, and polymorphism.",
        "Compare composition with inheritance.",
      ],
      sections: [
        {
          title: "Classes and objects",
          paragraphs: [
            "A class defines how its instances are initialized and which behavior they provide. An object is a particular instance with its own state.",
            "A constructor initializes an instance. A method is a function associated with the object. this refers to the current receiver when a normal method is called through the object.",
            "Passing a method as an unbound callback can lose the intended this value. Keep the call context explicit when introducing callbacks.",
          ],
          example: {
            title: "Create two product objects",
            filename: "lesson-12-classes.cts",
            code: `class Product {
  readonly name: string;
  readonly pricePaise: number;

  constructor(name: string, pricePaise: number) {
    this.name = name;
    this.pricePaise = pricePaise;
  }

  label(): string {
    return this.name + ": " + this.pricePaise;
  }
}

const keyboard = new Product("Keyboard", 25000);
const mouse = new Product("Mouse", 10000);

console.log(keyboard.label());
console.log(mouse.label());

export {};`,
            command:
              "npx tsc lesson-12-classes.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-12-classes.cjs",
            output: `Keyboard: 25000
Mouse: 10000`,
            explanation:
              "Both instances use the same class behavior but hold different values.",
          },
        },
        {
          title: "Encapsulation",
          paragraphs: [
            "Encapsulation keeps related state and behavior together while controlling how state can change.",
            "Public methods can enforce rules instead of allowing callers to assign arbitrary values directly.",
            "TypeScript public, protected, and private control access during type checking. JavaScript #private fields additionally enforce private access at runtime.",
          ],
          example: {
            title: "Protect quantity with a validated method",
            filename: "lesson-12-encapsulation.cts",
            code: `class CartItem {
  #quantity = 1;

  setQuantity(value: number): void {
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error("Quantity must be an integer from 1 to 5");
    }

    this.#quantity = value;
  }

  getQuantity(): number {
    return this.#quantity;
  }
}

const item = new CartItem();
item.setQuantity(3);

console.log(item.getQuantity());

export {};`,
            command:
              "npx tsc lesson-12-encapsulation.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-12-encapsulation.cjs",
            output: "3",
            explanation:
              "Callers use setQuantity, which validates the update. The #quantity field is private at runtime.",
          },
        },
        {
          title: "Access modifiers",
          paragraphs: [
            "public members are accessible to callers and are the default. protected members are accessible within the class and its subclasses. TypeScript private members are accessible within their declaring class.",
            "protected supports subclass implementation; it is not a security boundary. Likewise, TypeScript private is not the same mechanism as a JavaScript #private field.",
            "readonly expresses assignment restrictions in the type system. It is different from private access.",
          ],
        },
        {
          title: "Abstraction",
          paragraphs: [
            "Abstraction exposes the operations a caller needs while hiding implementation details that do not belong in that interaction.",
            "An abstract class can define shared behavior and require subclasses to implement particular methods. It cannot be instantiated directly in checked TypeScript code.",
            "An interface can describe a capability without providing an implementation. It is erased from the generated JavaScript.",
          ],
        },
        {
          title: "Inheritance and method overriding",
          paragraphs: [
            "Inheritance lets a subclass specialize a base class using extends. A subclass can override inherited behavior while preserving the expected contract.",
            "Use inheritance for a meaningful is-a relationship. Deep hierarchies can make behavior harder to trace.",
          ],
          example: {
            title: "Implement an abstract shipping policy",
            filename: "lesson-12-inheritance.cts",
            code: `abstract class ShippingPolicy {
  abstract feePaise(): number;

  describe(): string {
    return "Shipping: " + this.feePaise();
  }
}

class StandardShipping extends ShippingPolicy {
  override feePaise(): number {
    return 5000;
  }
}

class FreeShipping extends ShippingPolicy {
  override feePaise(): number {
    return 0;
  }
}

const policies: ShippingPolicy[] = [
  new StandardShipping(),
  new FreeShipping(),
];

for (const policy of policies) {
  console.log(policy.describe());
}

export {};`,
            command:
              "npx tsc lesson-12-inheritance.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-12-inheritance.cjs",
            output: `Shipping: 5000
Shipping: 0`,
            explanation:
              "Both subclasses provide feePaise. The shared describe method calls the implementation belonging to the current instance.",
          },
        },
        {
          title: "Polymorphism",
          paragraphs: [
            "Polymorphism lets code work through a common contract while different implementations provide different behavior.",
            "The shipping-policy loop is polymorphic: it uses ShippingPolicy without needing a branch for each concrete subclass.",
            "Polymorphism does not require class inheritance. Different objects can implement the same interface.",
          ],
        },
        {
          title: "Composition and dependency injection",
          paragraphs: [
            "Composition builds behavior by giving an object collaborators. It models a has-a relationship.",
            "Dependency injection supplies a collaborator from outside instead of constructing a fixed dependency internally. This makes alternative implementations easier to use in tests.",
            "Choose composition when behavior should vary independently. Do not create a base class merely to share a few unrelated utility methods.",
          ],
          example: {
            title: "Supply a reporter to a runner",
            filename: "lesson-12-composition.cts",
            code: `interface Reporter {
  write(message: string): void;
}

class ConsoleReporter implements Reporter {
  write(message: string): void {
    console.log(message);
  }
}

class CheckRunner {
  constructor(private readonly reporter: Reporter) {}

  finish(name: string): void {
    this.reporter.write("Finished: " + name);
  }
}

const runner = new CheckRunner(new ConsoleReporter());
runner.finish("checkout");

export {};`,
            command:
              "npx tsc lesson-12-composition.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-12-composition.cjs",
            output: "Finished: checkout",
            explanation:
              "CheckRunner has a Reporter. The constructor parameter property declares and assigns the field. Another reporter could collect messages without printing them.",
          },
        },
      ],
      mistakes: [
        "Using inheritance for every kind of reuse.",
        "Assuming TypeScript private is a runtime security mechanism.",
        "Making state public when updates need validation.",
        "Confusing an interface contract with an implementation.",
        "Creating deep hierarchies that hide simple behavior.",
        "Passing methods around without considering their this binding.",
      ],
      exercise: {
        title: "Implement two notification behaviors",
        instructions: [
          "Define a Notifier interface with send(message).",
          "Implement a console notifier and a collecting notifier.",
          "Pass each implementation to the same announce function.",
        ],
        filename: "lesson-12-exercise.cts",
        solution: `interface Notifier {
  send(message: string): void;
}

class ConsoleNotifier implements Notifier {
  send(message: string): void {
    console.log(message);
  }
}

class CollectingNotifier implements Notifier {
  readonly messages: string[] = [];

  send(message: string): void {
    this.messages.push(message);
  }
}

function announce(notifier: Notifier): void {
  notifier.send("Checks complete");
}

announce(new ConsoleNotifier());

const collector = new CollectingNotifier();
announce(collector);
console.log(collector.messages.join(", "));

export {};`,
        command:
          "npx tsc lesson-12-exercise.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-12-exercise.cjs",
        output: `Checks complete
Checks complete`,
        explanation:
          "announce depends on the interface rather than a concrete class. This demonstrates polymorphism without a shared base class. readonly prevents reassigning messages, but the array can still be updated.",
      },
      takeaway:
        "Use objects to organize cohesive responsibilities, encapsulation to control state, and common contracts to support different implementations. Prefer a simple design over unnecessary hierarchy.",
    },
  },
  {
    number: 13,
    slug: "classes-and-composition",
    title: "Classes and Composition for Page Objects",
    description:
      "Apply object-oriented concepts to page objects and reusable page components.",
    content: {
      introduction:
        "A page object gives tests a focused interface to part of the application. This lesson teaches its structure using a small local simulation before we introduce Playwright in the E2E course.",
      objectives: [
        "Separate page interaction from scenario orchestration.",
        "Compose reusable page components.",
        "Inject a page dependency through a constructor.",
        "Keep business assertions and failure evidence clear.",
      ],
      sections: [
        {
          title: "What a page object represents",
          paragraphs: [
            "A page object groups selectors and interactions for a page or cohesive section of a page. Its methods express meaningful actions such as searchForProduct.",
            "The test still describes the scenario and expected result. Shared readiness checks may live in helpers, but avoid hiding the entire test inside one opaque page-object method.",
            "Our BrowserPort below is a teaching interface. It is not the Playwright API and the simulation does not open a real browser.",
          ],
        },
        {
          title: "Inject the interaction dependency",
          paragraphs: [
            "The constructor receives the object used for interactions. This avoids creating a browser or global page inside every page object.",
            "In the later Playwright course, a fixture will provide the actual Page dependency.",
          ],
          example: {
            title: "Create a small search page object",
            filename: "lesson-13-page-object.cts",
            code: `interface BrowserPort {
  fill(selector: string, value: string): Promise<void>;
  click(selector: string): Promise<void>;
}

class SearchPage {
  constructor(private readonly browser: BrowserPort) {}

  async searchForProduct(name: string): Promise<void> {
    await this.browser.fill("#search", name);
    await this.browser.click("#search-button");
  }
}

const events: string[] = [];

const browser: BrowserPort = {
  async fill(selector, value) {
    events.push("fill " + selector + " = " + value);
  },
  async click(selector) {
    events.push("click " + selector);
  },
};

async function main(): Promise<void> {
  const search = new SearchPage(browser);
  await search.searchForProduct("Keyboard");
  console.log(events.join("\\n"));
}

void main().catch((error) => {
  console.error(error);
  throw error;
});

export {};`,
            command:
              "npx tsc lesson-13-page-object.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-13-page-object.cjs",
            output: `fill #search = Keyboard
click #search-button`,
            explanation:
              "The injected object records actions. This verifies the structure of the example, not the behavior of a real search page.",
          },
        },
        {
          title: "Compose reusable components",
          paragraphs: [
            "A header, cart panel, or search widget may appear on several pages. Model it as a collaborator when it has cohesive reusable behavior.",
            "A ShopPage can have a HeaderComponent without inheriting all of the header's methods.",
          ],
          example: {
            title: "Compose a shop page with a header",
            filename: "lesson-13-components.cts",
            code: `interface BrowserPort {
  click(selector: string): Promise<void>;
}

class HeaderComponent {
  constructor(private readonly browser: BrowserPort) {}

  async openCart(): Promise<void> {
    await this.browser.click("#cart-button");
  }
}

class ShopPage {
  readonly header: HeaderComponent;

  constructor(browser: BrowserPort) {
    this.header = new HeaderComponent(browser);
  }
}

async function main(): Promise<void> {
  const browser: BrowserPort = {
    async click(selector) {
      console.log("click " + selector);
    },
  };

  const shop = new ShopPage(browser);
  await shop.header.openCart();
}

void main().catch((error) => {
  console.error(error);
  throw error;
});

export {};`,
            command:
              "npx tsc lesson-13-components.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-13-components.cjs",
            output: "click #cart-button",
            explanation:
              "The page delegates header behavior to a component. Both use the same supplied interaction dependency.",
          },
        },
        {
          title: "Keep responsibilities clear",
          paragraphs: [
            "A page object should not silently create unrelated business data, change global configuration, or suppress failures.",
            "Prefer methods that communicate user intent. Avoid methods whose names hide an entire scenario with many unrelated assertions.",
          ],
          bullets: [
            "Keep selectors close to the interactions that use them.",
            "Await asynchronous interactions.",
            "Let unexpected failures reach the test runner.",
            "Use fixtures or dedicated helpers for test-data setup.",
            "Avoid arbitrary sleeps and automatic retries around every action.",
            "Choose stable accessible locators when using the actual browser framework.",
          ],
        },
        {
          title: "Inheritance is optional",
          paragraphs: [
            "A base page is useful only when the shared contract and behavior are meaningful. A large base class with unrelated utilities creates coupling.",
            "Small functions, focused components, and injected collaborators often provide simpler reuse.",
            "An API client should usually have its own responsibility instead of being added to a universal page superclass.",
          ],
        },
      ],
      mistakes: [
        "Assuming the local recording object tests a real website.",
        "Putting every utility in a large BasePage class.",
        "Catching interaction failures and continuing silently.",
        "Creating a new browser internally for each page object.",
        "Hiding an entire test scenario inside a vaguely named method.",
      ],
      exercise: {
        title: "Create a reusable cart component",
        instructions: [
          "Define a click-only BrowserPort.",
          "Create CartComponent with a proceedToCheckout method.",
          "Inject a recorder and verify that the expected selector was clicked.",
        ],
        filename: "lesson-13-exercise.cts",
        solution: `interface BrowserPort {
  click(selector: string): Promise<void>;
}

class CartComponent {
  constructor(private readonly browser: BrowserPort) {}

  async proceedToCheckout(): Promise<void> {
    await this.browser.click("#checkout-button");
  }
}

async function main(): Promise<void> {
  const clicks: string[] = [];

  const browser: BrowserPort = {
    async click(selector) {
      clicks.push(selector);
    },
  };

  const cart = new CartComponent(browser);
  await cart.proceedToCheckout();

  if (clicks.length !== 1 || clicks[0] !== "#checkout-button") {
    throw new Error("Unexpected interaction");
  }

  console.log("Cart interaction verified");
}

void main().catch((error) => {
  console.error(error);
  throw error;
});

export {};`,
        command:
          "npx tsc lesson-13-exercise.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-13-exercise.cjs",
        output: "Cart interaction verified",
        explanation:
          "This checks the component's delegation to its collaborator. Later browser tests must additionally verify navigation and application outcomes.",
      },
      takeaway:
        "Build page objects around cohesive interactions, inject their dependencies, and compose reusable components. Keep the test scenario and expected business outcome visible.",
    },
  },
  {
    number: 14,
    slug: "generics-utility-types-and-narrowing",
    title: "Generics, Utility Types, and Type Narrowing",
    description:
      "Create reusable typed helpers and safely inspect values from external sources.",
    content: {
      introduction:
        "Generics preserve relationships between types. Utility types derive related contracts, and narrowing lets you safely work with uncertain values.",
      objectives: [
        "Use generics without discarding type information.",
        "Apply Partial, Pick, Omit, and Readonly.",
        "Narrow unknown values with runtime checks.",
        "Represent outcomes with discriminated unions.",
      ],
      sections: [
        {
          title: "Generics preserve type relationships",
          paragraphs: [
            "A generic type parameter describes a relationship that should hold across inputs and outputs.",
            "Use a generic when preserving that relationship helps the caller. It is not a reason to make every function more abstract.",
          ],
          example: {
            title: "Return the first item without losing its type",
            filename: "lesson-14-generics.cts",
            code: `function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

const browser = first(["chromium", "firefox"]);
const quantity = first([2, 3]);

console.log(browser?.toUpperCase());
console.log(quantity);
console.log(first([]));

export {};`,
            command:
              "npx tsc lesson-14-generics.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-14-generics.cjs",
            output: `CHROMIUM
2
undefined`,
            explanation:
              "The return type follows the element type and includes undefined because the array may be empty.",
          },
        },
        {
          title: "Constrain a generic when behavior requires properties",
          paragraphs: [
            "A constraint expresses the properties a generic value must provide.",
            "This lets a helper use the required property while preserving the caller's more specific type.",
          ],
          example: {
            title: "Find an entity by ID",
            filename: "lesson-14-constraints.cts",
            code: `function findById<T extends { id: string }>(
  items: readonly T[],
  id: string
): T | undefined {
  return items.find((item) => item.id === id);
}

const products = [
  { id: "P1", name: "Keyboard", stock: 3 },
  { id: "P2", name: "Mouse", stock: 0 },
];

const product = findById(products, "P1");
console.log(product?.name);
console.log(product?.stock);

export {};`,
            command:
              "npx tsc lesson-14-constraints.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-14-constraints.cjs",
            output: `Keyboard
3`,
            explanation:
              "The constraint requires id. The result still retains the product's name and stock properties.",
          },
        },
        {
          title: "Utility types derive related contracts",
          paragraphs: [
            "Partial makes properties optional. Pick selects properties. Omit excludes properties. Readonly prevents assignment through the resulting property declarations.",
            "These transformations are generally shallow. Partial does not recursively make every nested property optional, and Readonly does not deeply freeze data.",
          ],
          example: {
            title: "Describe creation and update inputs",
            filename: "lesson-14-utilities.cts",
            code: `interface User {
  id: string;
  email: string;
  active: boolean;
}

type NewUser = Omit<User, "id">;
type UserSummary = Pick<User, "id" | "email">;
type UserUpdate = Partial<Pick<User, "email" | "active">>;

const input: NewUser = {
  email: "tester@example.com",
  active: true,
};

const update: UserUpdate = { active: false };

const summary: Readonly<UserSummary> = {
  id: "U-1",
  email: input.email,
};

console.log(summary.id);
console.log(update.active);

export {};`,
            command:
              "npx tsc lesson-14-utilities.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-14-utilities.cjs",
            output: `U-1
false`,
            explanation:
              "The update contract deliberately excludes id. These types describe allowed usage but do not remove extra keys from runtime objects.",
          },
        },
        {
          title: "Use unknown at uncertain boundaries",
          paragraphs: [
            "unknown requires you to establish how a value can be used. any bypasses many checks and can let mistakes spread.",
            "Narrow with checks such as typeof, null comparisons, Array.isArray, and property inspection.",
            "A custom type predicate tells the compiler what your checks establish. Its implementation must actually validate that claim.",
          ],
          example: {
            title: "Validate parsed user data",
            filename: "lesson-14-narrowing.cts",
            code: `interface User {
  id: string;
  active: boolean;
}

function isUser(value: unknown): value is User {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    "active" in value &&
    typeof value.active === "boolean"
  );
}

const value: unknown = JSON.parse(
  '{"id":"U-1","active":true}'
);

if (!isUser(value)) {
  throw new Error("Invalid user data");
}

console.log(value.id);
console.log(value.active);

export {};`,
            command:
              "npx tsc lesson-14-narrowing.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-14-narrowing.cjs",
            output: `U-1
true`,
            explanation:
              "The runtime checks establish the required properties. Additional properties are allowed by this validator.",
          },
        },
        {
          title: "Discriminated unions",
          paragraphs: [
            "A discriminated union represents alternatives with a shared literal property. Checking that property narrows the remaining fields.",
            "This can express success and failure without pretending that every outcome has the same data.",
          ],
          example: {
            title: "Model a lookup result",
            filename: "lesson-14-result.cts",
            code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

function describe(result: Result<string>): string {
  if (result.ok) {
    return "Found: " + result.value;
  }

  return "Failed: " + result.message;
}

console.log(describe({ ok: true, value: "O-101" }));
console.log(describe({ ok: false, message: "Not found" }));

export {};`,
            command:
              "npx tsc lesson-14-result.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-14-result.cjs",
            output: `Found: O-101
Failed: Not found`,
            explanation:
              "The ok property determines whether value or message is available.",
          },
        },
      ],
      mistakes: [
        "Using any when runtime checks could narrow unknown.",
        "Writing a type predicate that returns true without validating its claim.",
        "Forgetting undefined when a lookup may find nothing.",
        "Expecting utility types to transform runtime data.",
        "Assuming Partial or Readonly recursively affects nested values.",
      ],
      exercise: {
        title: "Find a typed test case",
        instructions: [
          "Create a generic findByName helper constrained by a name property.",
          "Use it with test cases containing name and priority.",
          "Handle the possibility of no match.",
        ],
        filename: "lesson-14-exercise.cts",
        solution: `function findByName<T extends { name: string }>(
  items: readonly T[],
  name: string
): T | undefined {
  return items.find((item) => item.name === name);
}

const cases = [
  { name: "login", priority: 1 },
  { name: "checkout", priority: 2 },
];

const selected = findByName(cases, "checkout");

if (!selected) {
  throw new Error("Test case not found");
}

console.log(selected.name);
console.log(selected.priority);

export {};`,
        command:
          "npx tsc lesson-14-exercise.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-14-exercise.cjs",
        output: `checkout
2`,
        explanation:
          "The generic preserves priority even though the helper only requires name. The missing-result case is handled before accessing properties.",
      },
      takeaway:
        "Preserve useful type relationships with generics, derive focused contracts with utility types, and validate uncertain values before narrowing them.",
    },
  },
  {
    number: 15,
    slug: "build-typed-test-data-utilities",
    title: "Practice: Build Typed Test-Data Utilities",
    description:
      "Combine factories, validation, isolation, and meaningful checks in a small TypeScript project.",
    content: {
      introduction:
        "Build a reusable test-user factory with predictable inputs and independent object state. Validate external data and verify the behavior of your utility.",
      objectives: [
        "Design a typed factory with controlled overrides.",
        "Avoid shared mutable nested data.",
        "Validate external values at runtime.",
        "Write checks that fail when a utility breaks its contract.",
      ],
      sections: [
        {
          title: "Define the assignment",
          paragraphs: [
            "Create a factory for test users with an ID, email, role, and nested address. The caller supplies a non-empty key for the ID and email.",
            "Each invocation must create an independent address object. Updating one user's address must not change another user's data.",
            "The factory should accept selected overrides while keeping ID generation under its own control.",
          ],
          bullets: [
            "Roles are customer or admin.",
            "Default city is Bengaluru.",
            "Default role is customer.",
            "The caller provides distinct keys when unique users are required.",
            "Generated addresses use the reserved example.com domain.",
            "These are local objects; creating one does not register a real account.",
          ],
        },
        {
          title: "Build a typed factory",
          paragraphs: [
            "A factory is a function that creates an object. It can apply defaults, validate inputs, and centralize how test data is constructed.",
            "Explicitly construct nested values rather than returning a shared default object.",
          ],
          example: {
            title: "Create independent users",
            filename: "lesson-15-factory.cts",
            code: `type Role = "customer" | "admin";

interface TestUser {
  id: string;
  email: string;
  role: Role;
  address: {
    city: string;
  };
}

type UserOverrides = {
  role?: Role;
  address?: {
    city?: string;
  };
};

function createUser(
  key: string,
  overrides: UserOverrides = {}
): TestUser {
  if (!/^[a-z0-9-]+$/.test(key)) {
    throw new Error("Use a non-empty lowercase alphanumeric key");
  }

  const city = overrides.address?.city ?? "Bengaluru";

  if (city.trim().length === 0) {
    throw new Error("City must not be empty");
  }

  return {
    id: "user-" + key,
    email: key + "@example.com",
    role: overrides.role ?? "customer",
    address: { city },
  };
}

const first = createUser("checkout-1");
const second = createUser("checkout-2", {
  role: "admin",
});

first.address.city = "Chennai";

console.log(first.address.city);
console.log(second.address.city);
console.log(second.role);

export {};`,
            command:
              "npx tsc lesson-15-factory.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-15-factory.cjs",
            output: `Chennai
Bengaluru
admin`,
            explanation:
              "Each call constructs a new address. The key rule permits lowercase letters, digits, and hyphens. Uniqueness depends on the supplied keys.",
          },
        },
        {
          title: "Plan identifiers and lifecycle",
          paragraphs: [
            "Do not assume a constant default email is safe for every test. Parallel tests may compete for the same account.",
            "For real integration tests, derive suitable keys from a run identifier and test identifier, or use another collision-resistant strategy supported by the system.",
            "Track the actual resource IDs returned by the application and clean up only resources owned by the test.",
            "A local factory creates data, not server state. Keep API creation, cleanup, and local object construction as distinct responsibilities.",
          ],
        },
        {
          title: "Validate data entering from outside",
          paragraphs: [
            "A factory called by checked TypeScript code can use typed overrides. Data from JSON remains unknown until appropriate runtime validation.",
            "Validate every property required by your contract before using that external value as a TestUser.",
          ],
          example: {
            title: "Validate a minimal external user",
            filename: "lesson-15-validation.cts",
            code: `type Role = "customer" | "admin";

interface ExternalUser {
  id: string;
  role: Role;
}

function isExternalUser(value: unknown): value is ExternalUser {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    "role" in value &&
    (value.role === "customer" || value.role === "admin")
  );
}

console.log(isExternalUser({ id: "U-1", role: "admin" }));
console.log(isExternalUser({ id: "U-2", role: "owner" }));

export {};`,
            command:
              "npx tsc lesson-15-validation.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-15-validation.cjs",
            output: `true
false`,
            explanation:
              "The validator checks this smaller ExternalUser contract. It must not claim to validate email or address because it does not inspect them.",
          },
        },
        {
          title: "Test the utility's behavior",
          paragraphs: [
            "Useful checks cover default behavior, overrides, invalid input, and independence between results.",
            "A test should report a failure when the behavior is wrong. Merely printing two values and visually comparing them is not sufficient for automated execution.",
          ],
          bullets: [
            "Default role and city are applied.",
            "A valid override changes only the intended field.",
            "Different keys produce different IDs and emails.",
            "Invalid keys are rejected.",
            "Updating one nested address does not affect another user.",
            "Repeated use of the same key has an understood, documented result.",
          ],
        },
        {
          title: "Organize the finished utility project",
          paragraphs: [
            "After the single-file exercise works, split contracts, factories, validators, and checks into focused modules.",
            "Keep defaults and validators close to the domain they describe. Avoid a large universal helper file with unrelated responsibilities.",
            "In the E2E course, we will connect factories to fixtures and application APIs, then use a test runner for richer assertions and reporting.",
          ],
        },
      ],
      mistakes: [
        "Returning the same default object from every factory call.",
        "Sharing nested objects through shallow copies.",
        "Assuming a generated local object already exists in the application.",
        "Using the same account identifier in independent parallel tests.",
        "Claiming a validator checks fields it never inspects.",
        "Cleaning up unrelated records in a shared environment.",
      ],
      exercise: {
        title: "Verify a product factory",
        instructions: [
          "Create a product factory with an ID and nested inventory.",
          "Default stock to 3 and allow a stock override.",
          "Reject negative or non-integer stock.",
          "Verify that two products have independent inventory objects.",
          "Make a failed check throw an error.",
        ],
        filename: "lesson-15-exercise.cts",
        solution: `interface Product {
  id: string;
  inventory: {
    stock: number;
  };
}

function createProduct(id: string, stock = 3): Product {
  if (id.trim().length === 0) {
    throw new Error("ID must not be empty");
  }

  if (!Number.isSafeInteger(stock) || stock < 0) {
    throw new Error("Stock must be a non-negative safe integer");
  }

  return {
    id,
    inventory: { stock },
  };
}

function check(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const first = createProduct("P-1");
const second = createProduct("P-2", 5);

check(first.inventory.stock === 3, "Default stock is incorrect");
check(second.inventory.stock === 5, "Stock override failed");

first.inventory.stock = 0;
check(second.inventory.stock === 5, "Inventory is shared");

let rejected = false;

try {
  createProduct("P-3", -1);
} catch (error) {
  if (
    !(error instanceof Error) ||
    error.message !== "Stock must be a non-negative safe integer"
  ) {
    throw error;
  }

  rejected = true;
}

check(rejected, "Negative stock should be rejected");

console.log("Product factory checks passed");

export {};`,
        command:
          "npx tsc lesson-15-exercise.cts --strict --target ES2022 --module NodeNext --outDir build --noEmitOnError && node build/lesson-15-exercise.cjs",
        output: "Product factory checks passed",
        explanation:
          "The exercise checks defaults, overrides, isolation, and rejection behavior. The factory validates creation; later direct property assignments are not guarded by a class or setter.",
      },
      takeaway:
        "You can now build typed helpers with explicit contracts, independent data, runtime validation, and meaningful checks. These skills provide the foundation for your automation framework.",
    },
  },
  ...programmingPracticalLessons,
];
