export type AiPlaywrightExample = {
  title: string; filename: string; code: string;
  command: string; expected: string; explanation: string;
};
export type AiPlaywrightSection = {
  title: string; paragraphs: string[]; bullets?: string[];
  example?: AiPlaywrightExample;
  table?: { headers: string[]; rows: string[][] };
};
export type AiPlaywrightLessonData = {
  number: number; slug: string; title: string; description: string;
  group: "Explore" | "Plan and execute" | "Diagnose and heal";
  content: {
    introduction: string; objectives: string[]; sections: AiPlaywrightSection[];
    mistakes: string[];
    exercise: { title: string; tasks: string[]; solution: AiPlaywrightExample };
    takeaway: string;
  };
};

export const aiPlaywrightLessons: AiPlaywrightLessonData[] = [
  {
    "number": 1,
    "slug": "what-ai-contributes",
    "title": "What AI contributes to a Playwright test",
    "description": "Separate a story, a model suggestion, a browser observation and a test result.",
    "group": "Explore",
    "content": {
      "introduction": "Separate a story, a model suggestion, a browser observation and a test result.",
      "objectives": [
        "Name a defect a generated click-only test would miss."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Our story sells a keyboard at 2,500 cents per unit. One activation adds one unit. The screen must show the count and total. These requirements give the reviewer an independent basis for deciding whether a generated assertion is correct.",
            "A language model can propose steps. A tool can inspect a running page. The Playwright runner can execute saved assertions. Each produces a different kind of evidence. Keep the story and observed behavior separate in your notes."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "What AI contributes to a Playwright test",
            "filename": "What AI contributes to a Playwright test",
            "code": "Story: add one keyboard.\nExpected: quantity 1, total $25.00.\nAgent hypothesis: the button might submit a form.\nObservation to collect: control name, role and resulting status.",
            "command": "Read STORY.md and start the practice app.",
            "expected": "The planned test can fail even if the button is clickable.",
            "explanation": "A language model can propose steps. A tool can inspect a running page. The Playwright runner can execute saved assertions. Each produces a different kind of evidence. Keep the story and observed behavior separate in your notes."
          }
        }
      ],
      "mistakes": [
        "Accepting the first output seen on screen as the expected result."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Name a defect a generated click-only test would miss.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "A click can succeed while the total becomes $24.00. Assert the amount against the story.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The planned test can fail even if the button is clickable.",
          "explanation": "Accepting the first output seen on screen as the expected result."
        }
      },
      "takeaway": "Separate a story, a model suggestion, a browser observation and a test result."
    }
  },
  {
    "number": 2,
    "slug": "local-lab",
    "title": "Set up the local VS Code lab",
    "description": "Prepare a reproducible browser target and a small TypeScript test suite.",
    "group": "Explore",
    "content": {
      "introduction": "Prepare a reproducible browser target and a small TypeScript test suite.",
      "objectives": [
        "Confirm the seed can enter the correct page."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Open practice-project as a separate VS Code workspace. Install Node.js 24 and the package dependencies. Install the Chromium binary that matches the Playwright package.",
            "The app listens on 127.0.0.1:4189. Use npm start for interactive exploration. Stop that server before npm test because the runner starts its own instance. Use a new browser context to reset the cart."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Set up the local VS Code lab",
            "filename": "Set up the local VS Code lab",
            "code": "npm install\nnpx playwright install chromium\nnpm run typecheck\nnpx playwright test --list\nnpm start",
            "command": "Run in the practice folder. Open http://127.0.0.1:4189.",
            "expected": "The cart starts at quantity zero and total $0.00.",
            "explanation": "The app listens on 127.0.0.1:4189. Use npm start for interactive exploration. Stop that server before npm test because the runner starts its own instance. Use a new browser context to reset the cart."
          }
        }
      ],
      "mistakes": [
        "Installing the practice dependencies in the Learning Hub website."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Confirm the seed can enter the correct page.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Run npx playwright test tests/seed.spec.ts after stopping the manually launched app. A successful seed establishes initial state; it does not exercise a purchase.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The cart starts at quantity zero and total $0.00.",
          "explanation": "Installing the practice dependencies in the Learning Hub website."
        }
      },
      "takeaway": "Prepare a reproducible browser target and a small TypeScript test suite."
    }
  },
  {
    "number": 3,
    "slug": "mcp-vscode",
    "title": "Connect Playwright MCP to VS Code",
    "description": "Let an authorized coding assistant inspect the local page through browser tools.",
    "group": "Explore",
    "content": {
      "introduction": "Let an authorized coding assistant inspect the local page through browser tools.",
      "objectives": [
        "Give the assistant a bounded first exploration task."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "MCP is the protocol through which the assistant host discovers and calls tools. The Playwright MCP server provides the browser operations. The model reasons over their results and may request the next operation.",
            "Use the supplied VS Code servers configuration and an MCP-capable assistant. The server starts through npx in an isolated browser profile. Review the package version and host permission prompts before starting it. Model access and provider setup depend on the chosen assistant.",
            "For the lab, restrict the task to the local page and synthetic cart. Isolated storage prevents reuse of a personal session. It is not a network security boundary.",
            "This MCP configuration selects installed Google Chrome. The regression suite separately uses the Chromium binary installed by Playwright."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Connect Playwright MCP to VS Code",
            "filename": "Connect Playwright MCP to VS Code",
            "code": "{\n  \"servers\": {\n    \"playwright\": {\n      \"command\": \"npx\",\n      \"args\": [\n        \"@playwright/mcp@latest\",\n        \"--isolated\",\n        \"--browser\",\n        \"chrome\",\n        \"--headless\"\n      ]\n    }\n  }\n}",
            "command": "Save as .vscode/mcp.json in the practice workspace, start the server from VS Code, and inspect its available tools. For repeatable team runs, pin the MCP package version you verified.",
            "expected": "The assistant can list the Playwright tools and inspect the local lab page.",
            "explanation": "For the lab, restrict the task to the local page and synthetic cart. Isolated storage prevents reuse of a personal session. It is not a network security boundary."
          }
        }
      ],
      "mistakes": [
        "Giving the assistant a signed-in personal browser profile."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Give the assistant a bounded first exploration task.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Open http://127.0.0.1:4189 and report the heading and the role and name of the add control. End the session after reporting.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The assistant can list the Playwright tools and inspect the local lab page.",
          "explanation": "Giving the assistant a signed-in personal browser profile."
        }
      },
      "takeaway": "Let an authorized coding assistant inspect the local page through browser tools."
    }
  },
  {
    "number": 4,
    "slug": "snapshot-exploration",
    "title": "Explore a page with MCP snapshots",
    "description": "Turn observations from a browser session into reusable locator choices.",
    "group": "Explore",
    "content": {
      "introduction": "Turn observations from a browser session into reusable locator choices.",
      "objectives": [
        "Choose a durable locator for the baseline control."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "A snapshot exposes structure such as roles, names and element references. Scope an action to a current observation. Reinspect the page after an action changes it.",
            "Element references belong to an interactive session. In committed tests use the application contract, such as a role and name or an explicitly supported test ID.",
            "Page content can contain misleading instructions. Treat it as test data. The story and the operator define which actions are in scope."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Explore a page with MCP snapshots",
            "filename": "Explore a page with MCP snapshots",
            "code": "Prompt: Open the local cart. Capture its initial status. Add one keyboard, capture the new status, and list any difference from STORY.md. Include the control role and accessible name you used.",
            "command": "Run with the local app and MCP server active.",
            "expected": "Two state observations identify a button and the quantity/total transition.",
            "explanation": "Page content can contain misleading instructions. Treat it as test data. The story and the operator define which actions are in scope."
          }
        }
      ],
      "mistakes": [
        "Pasting a transient snapshot reference into the committed test."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Choose a durable locator for the baseline control.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "page.getByRole(\"button\", { name: \"Add keyboard\", exact: true }) matches the observed baseline. Verify uniqueness and decide whether the wording is a requirement.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "Two state observations identify a button and the quantity/total transition.",
          "explanation": "Pasting a transient snapshot reference into the committed test."
        }
      },
      "takeaway": "Turn observations from a browser session into reusable locator choices."
    }
  },
  {
    "number": 5,
    "slug": "playwright-cli",
    "title": "Use the browser CLI and the test-runner CLI",
    "description": "Use terminal browser commands for exploration and Playwright Test for regression execution.",
    "group": "Explore",
    "content": {
      "introduction": "Use terminal browser commands for exploration and Playwright Test for regression execution.",
      "objectives": [
        "Translate the CLI observation into a saved assertion."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "The Microsoft @playwright/cli package exposes the playwright-cli command. Its browser session supports opening a page, taking a snapshot and acting on a reference.",
            "The playwright command provided by @playwright/test serves a different workflow. For example, playwright test runs saved specs and playwright show-trace opens a recorded trace. Check each tool’s help for its installed version."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Use the browser CLI and the test-runner CLI",
            "filename": "Use the browser CLI and the test-runner CLI",
            "code": "npm install -g @playwright/cli@latest\nplaywright-cli --help\nplaywright-cli open http://127.0.0.1:4189\nplaywright-cli snapshot\n# Replace CURRENT_REF with the current button reference\nplaywright-cli click CURRENT_REF\nplaywright-cli snapshot\nplaywright-cli close",
            "command": "Start the app first. Install the browser selected by your CLI if the tool requests it. Record the CLI version used.",
            "expected": "The second snapshot shows one keyboard and $25.00.",
            "explanation": "The playwright command provided by @playwright/test serves a different workflow. For example, playwright test runs saved specs and playwright show-trace opens a recorded trace. Check each tool’s help for its installed version."
          }
        }
      ],
      "mistakes": [
        "Confusing playwright-cli click with npx playwright test."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Translate the CLI observation into a saved assertion.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "await expect(page.getByRole(\"status\")).toHaveText(\"Quantity 1 · Total $25.00\");",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The second snapshot shows one keyboard and $25.00.",
          "explanation": "Confusing playwright-cli click with npx playwright test."
        }
      },
      "takeaway": "Use terminal browser commands for exploration and Playwright Test for regression execution."
    }
  },
  {
    "number": 6,
    "slug": "initialize-agents",
    "title": "Initialize Planner, Generator and Healer",
    "description": "Install the official agent definitions for the coding assistant used in the lab.",
    "group": "Plan and execute",
    "content": {
      "introduction": "Install the official agent definitions for the coding assistant used in the lab.",
      "objectives": [
        "Identify who owns the plan, code, execution and repair proposal."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Playwright names its supplied test agents planner, generator and healer. The generator produces test code from a plan. Execution in this course is a separate responsibility fulfilled by the Playwright test runner.",
            "From the separate practice repository initialize definitions for your assistant host. Review the files written by the command. Generated definitions and tool availability depend on the installed version and host.",
            "Supply the seed spec, app URL and story to the planner. Keep model-assisted exploration local to the learner workspace."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Initialize Planner, Generator and Healer",
            "filename": "Initialize Planner, Generator and Healer",
            "code": "npx playwright --version\nnpx playwright init-agents --help\nnpx playwright init-agents --loop=vscode\ngit status --short",
            "command": "Run in a practice repository with Playwright installed. Inspect the definitions and any generated files before committing.",
            "expected": "The host exposes the generated test-agent definitions after its required reload or activation step.",
            "explanation": "Supply the seed spec, app URL and story to the planner. Keep model-assisted exploration local to the learner workspace."
          }
        }
      ],
      "mistakes": [
        "Assuming an official agent named Executor is required to run the tests."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Identify who owns the plan, code, execution and repair proposal.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Planner → scenarios; Generator → TypeScript spec; Playwright Test → execution evidence; Healer → proposed change for review.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The host exposes the generated test-agent definitions after its required reload or activation step.",
          "explanation": "Assuming an official agent named Executor is required to run the tests."
        }
      },
      "takeaway": "Install the official agent definitions for the coding assistant used in the lab."
    }
  },
  {
    "number": 7,
    "slug": "planner",
    "title": "Planner: derive scenarios from a story",
    "description": "Produce a test plan with independent expected results and explicit assumptions.",
    "group": "Plan and execute",
    "content": {
      "introduction": "Produce a test plan with independent expected results and explicit assumptions.",
      "objectives": [
        "Review the proposed plan for an invented requirement."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Give the planner the story, seed test, target, initial state and allowed actions. Ask it to explore and write Markdown. Distinguish observed behavior from inferred or unspecified requirements.",
            "For the lab, one unit adds $25.00 and two add $50.00. Multiple activations exercise accumulation. Reload resets state in this local demonstration. Authentication, stock and payment are outside the story."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Planner: derive scenarios from a story",
            "filename": "Planner: derive scenarios from a story",
            "code": "Use STORY.md and tests/seed.spec.ts. Explore only http://127.0.0.1:4189. Draft specs/cart-plan.md with preconditions, steps, expected quantity and total, evidence, and unresolved questions. Do not edit the application.",
            "command": "Select the planner in your configured host and attach the named files.",
            "expected": "The plan contains independently checkable one-add and two-add scenarios.",
            "explanation": "For the lab, one unit adds $25.00 and two add $50.00. Multiple activations exercise accumulation. Reload resets state in this local demonstration. Authentication, stock and payment are outside the story."
          }
        }
      ],
      "mistakes": [
        "Mistaking undocumented observed behavior for an approved business requirement."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Review the proposed plan for an invented requirement.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Reject a proposed payment assertion because there is no payment action or payment contract. Keep the two-add scenario with its independently calculated $50.00 total.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The plan contains independently checkable one-add and two-add scenarios.",
          "explanation": "Mistaking undocumented observed behavior for an approved business requirement."
        }
      },
      "takeaway": "Produce a test plan with independent expected results and explicit assumptions."
    }
  },
  {
    "number": 8,
    "slug": "generator",
    "title": "Generator: turn a reviewed plan into TypeScript",
    "description": "Generate a test whose inputs, actions and assertions can be reviewed in a diff.",
    "group": "Plan and execute",
    "content": {
      "introduction": "Generate a test whose inputs, actions and assertions can be reviewed in a diff.",
      "objectives": [
        "Find an assertion that could pass with the wrong price."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Pass the approved plan and seed to the generator. Request one isolated test per scenario, accessible locators and web-first assertions.",
            "Review the generated code for excessive timeouts, control flow that allows a missing assertion, and expectations calculated from the same UI output being tested."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Generator: turn a reviewed plan into TypeScript",
            "filename": "Generator: turn a reviewed plan into TypeScript",
            "code": "Generate tests/generated-cart.spec.ts from specs/cart-plan.md. Use baseURL and a fresh page per test. Assert both quantity and total. Preserve the expected amounts from STORY.md. Run only the generated file and report failures.",
            "command": "Use the generator in your local host. Compare its output with tests/cart.spec.ts.",
            "expected": "The generated test checks a user-visible business outcome after each relevant action.",
            "explanation": "Review the generated code for excessive timeouts, control flow that allows a missing assertion, and expectations calculated from the same UI output being tested."
          }
        }
      ],
      "mistakes": [
        "Using a conditional assertion that silently skips when the expected element is missing."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Find an assertion that could pass with the wrong price.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "A check for text containing “Quantity 2” allows an incorrect total. Check the full required state or independently assert both fields.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The generated test checks a user-visible business outcome after each relevant action.",
          "explanation": "Using a conditional assertion that silently skips when the expected element is missing."
        }
      },
      "takeaway": "Generate a test whose inputs, actions and assertions can be reviewed in a diff."
    }
  },
  {
    "number": 9,
    "slug": "execution",
    "title": "Execute a focused test and preserve evidence",
    "description": "Distinguish test discovery, execution, a skipped test and an actual pass.",
    "group": "Plan and execute",
    "content": {
      "introduction": "Distinguish test discovery, execution, a skipped test and an actual pass.",
      "objectives": [
        "Explain what a skipped test proves about cart behavior."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Listing tests verifies discovery. Running a selected file executes its assertions. Capture the selected test, project, exit code and retry information.",
            "The shipped spec is a deterministic reference test. A generated spec can still contain a real failure. Preserve its initial trace and classification before proposing a change."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Execute a focused test and preserve evidence",
            "filename": "Execute a focused test and preserve evidence",
            "code": "npx playwright test --list\nnpx playwright test tests/cart.spec.ts --project=chromium\nnpx playwright show-report",
            "command": "Stop any manually started server before running the suite.",
            "expected": "The selected tests run in Chromium against the controlled baseline.",
            "explanation": "The shipped spec is a deterministic reference test. A generated spec can still contain a real failure. Preserve its initial trace and classification before proposing a change."
          }
        }
      ],
      "mistakes": [
        "Treating discovery or a zero exit from a different test as proof that the target passed."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Explain what a skipped test proves about cart behavior.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "It gives no passing execution evidence. Report it as skipped and record why its required scenario is uncovered.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The selected tests run in Chromium against the controlled baseline.",
          "explanation": "Treating discovery or a zero exit from a different test as proof that the target passed."
        }
      },
      "takeaway": "Distinguish test discovery, execution, a skipped test and an actual pass."
    }
  },
  {
    "number": 10,
    "slug": "trace-triage",
    "title": "Read a trace before asking for a repair",
    "description": "Classify a failure as a locator issue, environment issue, or product defect.",
    "group": "Plan and execute",
    "content": {
      "introduction": "Classify a failure as a locator issue, environment issue, or product defect.",
      "objectives": [
        "Record a minimal diagnosis before editing a file."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "The trace captures actions, locator resolution and page state. Inspect the first meaningful failed action and compare it with the approved expected behavior.",
            "An assertion failure after a successful click points to a different investigation from an unresolved button locator. A server startup failure provides no cart behavior evidence."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Read a trace before asking for a repair",
            "filename": "Read a trace before asking for a repair",
            "code": "LAB_VARIANT=rename npx playwright test tests/cart.spec.ts --project=chromium --max-failures=1\n# Open the trace path printed in the failure output:\nnpx playwright show-trace PATH_TO_TRACE",
            "command": "Run in the local practice project. This intentional experiment changes the button wording.",
            "expected": "The original role/name locator fails while the renamed control still exists.",
            "explanation": "An assertion failure after a successful click points to a different investigation from an unresolved button locator. A server startup failure provides no cart behavior evidence."
          }
        }
      ],
      "mistakes": [
        "Increasing timeout or retries before inspecting why the locator failed."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Record a minimal diagnosis before editing a file.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Capture the failed locator, observed accessible name and approved copy-change requirement. Distinguish these facts from a guess about timing.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The original role/name locator fails while the renamed control still exists.",
          "explanation": "Increasing timeout or retries before inspecting why the locator failed."
        }
      },
      "takeaway": "Classify a failure as a locator issue, environment issue, or product defect."
    }
  },
  {
    "number": 11,
    "slug": "healer",
    "title": "Healer: repair an approved locator change",
    "description": "Constrain an agent repair to a confirmed test-maintenance problem.",
    "group": "Diagnose and heal",
    "content": {
      "introduction": "Constrain an agent repair to a confirmed test-maintenance problem.",
      "objectives": [
        "Decide when a test ID is acceptable for this change."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "The rename variant changes “Add keyboard” to “Add one keyboard”. The business requirement still expects one unit at $25.00. In this lab the owner approves the new label.",
            "Provide the failing spec, trace and approved copy change to the healer. Inspect the patch. Reject any change that weakens amount or quantity checks, skips the test, or edits application behavior.",
            "The reference repaired spec is kept in repairs/ so normal discovery excludes it. Copy it into tests only when comparing the repaired behavior."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Healer: repair an approved locator change",
            "filename": "Healer: repair an approved locator change",
            "code": "In the rename variant the new button label is approved. Fix only the stale locator. Keep the quantity and amount assertions, preserve the failure evidence, and rerun against rename. Report the diff and actual result.",
            "command": "Use the healer on a disposable branch. The supplied repaired test uses the stable test ID and separately checks that the control remains a named button.",
            "expected": "An approved locator repair can handle the wording change while preserving business assertions.",
            "explanation": "The reference repaired spec is kept in repairs/ so normal discovery excludes it. Copy it into tests only when comparing the repaired behavior."
          }
        }
      ],
      "mistakes": [
        "Accepting a healer-generated test.skip as a successful repair."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Decide when a test ID is acceptable for this change.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Use the contractually maintained add-keyboard ID for the action if wording may vary. Check accessible naming separately. If exact wording is itself required, preserve that requirement instead.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "An approved locator repair can handle the wording change while preserving business assertions.",
          "explanation": "Accepting a healer-generated test.skip as a successful repair."
        }
      },
      "takeaway": "Constrain an agent repair to a confirmed test-maintenance problem."
    }
  },
  {
    "number": 12,
    "slug": "reject-false-healing",
    "title": "Reject false healing when the product is wrong",
    "description": "Use a negative control to prove the test still detects a price defect.",
    "group": "Diagnose and heal",
    "content": {
      "introduction": "Use a negative control to prove the test still detects a price defect.",
      "objectives": [
        "Review a proposed patch that changes the expected amount to $24.00."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "The defect variant deliberately displays $24.00 after one keyboard even though the catalog contract says $25.00. The button remains operable.",
            "Run the same business assertion against this variant. A correct test must fail. Keep the failing evidence and report the application defect."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Reject false healing when the product is wrong",
            "filename": "Reject false healing when the product is wrong",
            "code": "LAB_VARIANT=defect npx playwright test tests/cart.spec.ts --project=chromium --max-failures=1",
            "command": "Run with the reference spec and inspect the failing amount.",
            "expected": "The assertion expects $25.00 and sees $24.00.",
            "explanation": "Run the same business assertion against this variant. A correct test must fail. Keep the failing evidence and report the application defect."
          }
        }
      ],
      "mistakes": [
        "Updating expectations or snapshots to agree with a known defect."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Review a proposed patch that changes the expected amount to $24.00.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Reject the patch. The story still requires 2500 cents. Reproducing a defective result does not change the requirement. Attach the failing trace and leave the regression visible.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The assertion expects $25.00 and sees $24.00.",
          "explanation": "Updating expectations or snapshots to agree with a known defect."
        }
      },
      "takeaway": "Use a negative control to prove the test still detects a price defect."
    }
  },
  {
    "number": 13,
    "slug": "ci-and-review",
    "title": "Review generated tests and run them in CI",
    "description": "Commit reviewed deterministic tests with evidence for their assertions.",
    "group": "Diagnose and heal",
    "content": {
      "introduction": "Commit reviewed deterministic tests with evidence for their assertions.",
      "objectives": [
        "Write a concise review note for a valid repair."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Use a normal test job to execute reviewed specs. Record agent prompts and findings separately from the checked-in deterministic assertions.",
            "Inspect changes to test configuration, skips, timeouts, retries, fixtures and assertion scope. A tiny locator edit can be hidden inside a broad generated diff."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Review generated tests and run them in CI",
            "filename": "Review generated tests and run them in CI",
            "code": "git status --short\ngit diff -- tests playwright.config.ts\nnpm run typecheck\nnpx playwright test tests/cart.spec.ts --project=chromium --forbid-only",
            "command": "Run after reviewing a candidate patch. The example workflow runs the baseline suite after a lockfile has been committed.",
            "expected": "Reviewers can see which requirement was preserved and which test actually ran.",
            "explanation": "Inspect changes to test configuration, skips, timeouts, retries, fixtures and assertion scope. A tiny locator edit can be hidden inside a broad generated diff."
          }
        }
      ],
      "mistakes": [
        "Allowing a green build that silently removed or skipped the affected scenario."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Write a concise review note for a valid repair.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "The approved button label changed. The action now uses the supported locator. The rename case passed and the price-defect negative control still failed on the amount assertion. Supply actual run links before making this claim.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "Reviewers can see which requirement was preserved and which test actually ran.",
          "explanation": "Allowing a green build that silently removed or skipped the affected scenario."
        }
      },
      "takeaway": "Commit reviewed deterministic tests with evidence for their assertions."
    }
  },
  {
    "number": 14,
    "slug": "capstone",
    "title": "Project: plan, execute and evaluate a repair",
    "description": "Demonstrate the difference between a maintained test and a concealed product defect.",
    "group": "Diagnose and heal",
    "content": {
      "introduction": "Demonstrate the difference between a maintained test and a concealed product defect.",
      "objectives": [
        "Submit a review decision for both variants."
      ],
      "sections": [
        {
          "title": "How it works",
          "paragraphs": [
            "Start from the supplied story and use the planner to draft a plan. Review it, generate a spec, and execute the baseline. Keep the prompt, plan, code diff and runner output.",
            "Run the rename variant and review a healer proposal. Then run the defect variant using the repaired test. The final submission should include a passing rename case and a failing price-defect case.",
            "Classify missing infrastructure, unsupported hosts and skipped tests explicitly. A model description of a successful run is insufficient evidence of execution."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Project: plan, execute and evaluate a repair",
            "filename": "Project: plan, execute and evaluate a repair",
            "code": "Baseline: expected pass\nApproved rename: old locator fails; reviewed repair passes\nWrong total: repaired test still fails\nEvidence: plan, before/after diff, commands, exit status and trace",
            "command": "Use the practice README for the exact variant commands. Record observed outcomes yourself.",
            "expected": "The learner can justify accepting one repair and rejecting another.",
            "explanation": "Classify missing infrastructure, unsupported hosts and skipped tests explicitly. A model description of a successful run is insufficient evidence of execution."
          }
        }
      ],
      "mistakes": [
        "Reporting planned outcomes as if they were observed runs."
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Submit a review decision for both variants.",
          "Save the observation that supports your decision."
        ],
        "solution": {
          "title": "Review your result",
          "filename": "Review your result",
          "code": "Accept a repair only when it preserves the independent price contract. Route the wrong-total finding to the application owner with reproducible evidence.",
          "command": "Compare this reasoning with your observed result.",
          "expected": "The learner can justify accepting one repair and rejecting another.",
          "explanation": "Reporting planned outcomes as if they were observed runs."
        }
      },
      "takeaway": "Demonstrate the difference between a maintained test and a concealed product defect."
    }
  }
];
