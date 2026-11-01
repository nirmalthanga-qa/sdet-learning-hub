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
    description: "Represent collections and structured test data.",
  },
  {
    number: 7,
    slug: "strings-dates-and-json",
    title: "Strings, Dates, and JSON",
    description:
      "Transform text, handle time deliberately, and work with JSON.",
  },
  {
    number: 8,
    slug: "modules-npm-and-project-structure",
    title: "Modules, npm, and Project Structure",
    description: "Organize reusable code and understand project dependencies.",
  },
  {
    number: 9,
    slug: "async-await-and-error-handling",
    title: "Promises, Async/Await, and Error Handling",
    description: "Coordinate asynchronous work and report failures clearly.",
  },
  {
    number: 10,
    slug: "typescript-types-and-unions",
    title: "TypeScript Types, Inference, and Unions",
    description: "Describe valid values and catch incompatible usage.",
  },
  {
    number: 11,
    slug: "type-aliases-and-interfaces",
    title: "Type Aliases, Interfaces, and Optional Properties",
    description: "Model reusable test-data and response shapes.",
  },
  {
    number: 12,
    slug: "classes-and-composition",
    title: "Classes and Composition for Page Objects",
    description:
      "Understand object-oriented structure and compose reusable behavior.",
  },
  {
    number: 13,
    slug: "generics-utility-types-and-narrowing",
    title: "Generics, Utility Types, and Type Narrowing",
    description:
      "Build flexible helpers while retaining useful type information.",
  },
  {
    number: 14,
    slug: "build-typed-test-data-utilities",
    title: "Practice: Build Typed Test-Data Utilities",
    description: "Combine the course concepts in a practical utility project.",
  },
];
