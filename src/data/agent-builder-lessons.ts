export type AgentBuilderExample = {
  title: string; filename: string; code: string;
  command: string; expected: string; explanation: string;
};
export type AgentBuilderSection = {
  title: string; paragraphs: string[]; bullets?: string[];
  example?: AgentBuilderExample;
  table?: { headers: string[]; rows: string[][] };
};
export type AgentBuilderLessonData = {
  number: number; slug: string; title: string; description: string;
  group: "Design" | "Build" | "Evaluate and repair";
  content: {
    introduction: string; objectives: string[]; sections: AgentBuilderSection[];
    mistakes: string[];
    exercise: { title: string; tasks: string[]; solution: AgentBuilderExample };
    takeaway: string;
  };
};

export const agentBuilderLessons: AgentBuilderLessonData[] = [
  {
    "number": 1,
    "slug": "agent-boundaries",
    "title": "Choose the agent’s responsibility",
    "description": "Build a planner that drafts scenarios from a story and hands validated cases to a TypeScript generator.",
    "group": "Design",
    "content": {
      "introduction": "Build a planner that drafts scenarios from a story and hands validated cases to a TypeScript generator.",
      "objectives": [
        "Identify one decision to delegate and one to enforce in code."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The learner owns a keyboard-cart story. A useful model decision is which business risk to explain and which acceptance cases to propose. Software checks the amounts and emits the executable code.",
            "The local fixture path supplies predictable proposals for development. The optional LangChain path lets a model select a read tool and return a structured proposal. Both paths pass the same acceptance gate."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Choose the agent’s responsibility",
            "filename": "Choose the agent’s responsibility",
            "code": "Issue → normalized story → proposed strategy → contract check → candidate spec → review → execution",
            "command": "Read fixtures/issue.json and core.ts.",
            "expected": "Each stage has a named input and an observable output.",
            "explanation": "The local fixture path supplies predictable proposals for development. The optional LangChain path lets a model select a read tool and return a structured proposal. Both paths pass the same acceptance gate."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Identify one decision to delegate and one to enforce in code.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Delegate drafting risk descriptions. Enforce that two units at 2500 cents produce an expected total of 5000 cents.",
          "command": "Compare this reasoning with your result.",
          "expected": "Each stage has a named input and an observable output.",
          "explanation": "Letting a model redefine the expected price from the broken UI."
        }
      },
      "mistakes": [
        "Letting a model redefine the expected price from the broken UI."
      ],
      "takeaway": "Build a planner that drafts scenarios from a story and hands validated cases to a TypeScript generator."
    }
  },
  {
    "number": 2,
    "slug": "typescript-contracts",
    "title": "Model the workflow in TypeScript",
    "description": "Define a small interchange format that humans, tools and workflow nodes can inspect.",
    "group": "Design",
    "content": {
      "introduction": "Define a small interchange format that humans, tools and workflow nodes can inspect.",
      "objectives": [
        "Identify a well-typed proposal that must fail business validation."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Story carries the issue identity and normalized text. Plan carries risk, requirement IDs, quantities and expected amounts. Validate unknown input at the boundary before constructing a trusted plan.",
            "Static types catch errors inside your program. They cannot guarantee that JSON returned by Jira, an HTTP endpoint, or a text model matches those types."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Model the workflow in TypeScript",
            "filename": "Model the workflow in TypeScript",
            "code": "type Plan = { risk: string; cases: Array<{requirement: string; quantity: number; expectedCents: number}> };",
            "command": "Open core.ts and follow validatePlan.",
            "expected": "Only checked, canonical cases reach the spec renderer.",
            "explanation": "Static types catch errors inside your program. They cannot guarantee that JSON returned by Jira, an HTTP endpoint, or a text model matches those types."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Identify a well-typed proposal that must fail business validation.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "AC-2 with quantity 2 and expectedCents 4800 has valid types but contradicts the approved contract.",
          "command": "Compare this reasoning with your result.",
          "expected": "Only checked, canonical cases reach the spec renderer.",
          "explanation": "Using an as Plan cast to approve external JSON."
        }
      },
      "mistakes": [
        "Using an as Plan cast to approve external JSON."
      ],
      "takeaway": "Define a small interchange format that humans, tools and workflow nodes can inspect."
    }
  },
  {
    "number": 3,
    "slug": "jira-ingestion",
    "title": "Read and normalize Jira stories",
    "description": "Extract the fields needed for test design and retain the source issue key.",
    "group": "Design",
    "content": {
      "introduction": "Extract the fields needed for test design and retain the source issue key.",
      "objectives": [
        "Explain how to handle an issue with acceptance criteria stored in a custom field."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The offline issue contains a Jira-style document description. normalize handles plain text and the paragraph/text structure used by the fixture. For richer production documents, preserve lists, tables, links and custom acceptance fields intentionally.",
            "The optional read-only Jira Cloud adapter requests summary and description. Configure the authorized site, account email and an API token appropriate for that site-based REST endpoint. The local fixture remains the input to the packaged model exercise."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Read and normalize Jira stories",
            "filename": "Read and normalize Jira stories",
            "code": "node jira.ts SHOP-42",
            "command": "Optional live read. Set JIRA_SITE, JIRA_EMAIL and JIRA_API_TOKEN in the local environment.",
            "expected": "A normalized record includes key, summary and description.",
            "explanation": "The optional read-only Jira Cloud adapter requests summary and description. Configure the authorized site, account email and an API token appropriate for that site-based REST endpoint. The local fixture remains the input to the packaged model exercise."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Explain how to handle an issue with acceptance criteria stored in a custom field.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Discover the project’s field ID, request it explicitly, normalize it and submit it for oracle review. Keep the original issue association.",
          "command": "Compare this reasoning with your result.",
          "expected": "A normalized record includes key, summary and description.",
          "explanation": "Assuming all Jira projects use the same custom acceptance field."
        }
      },
      "mistakes": [
        "Assuming all Jira projects use the same custom acceptance field."
      ],
      "takeaway": "Extract the fields needed for test design and retain the source issue key."
    }
  },
  {
    "number": 4,
    "slug": "oracle-and-traceability",
    "title": "Create an independently reviewed test oracle",
    "description": "Link each expected result to an approved acceptance criterion.",
    "group": "Design",
    "content": {
      "introduction": "Link each expected result to an approved acceptance criterion.",
      "objectives": [
        "Design a negative control for a plausible generated plan."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "For SHOP-42 the owner supplies two expectations: one keyboard totals 2500 cents, two total 5000. The oracle in core.ts represents this reviewed contract.",
            "The lab is deliberately scoped to one issue. A new story requires a new reviewed oracle and a fixture update. It is unsafe to reuse this price table for unrelated issues."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Create an independently reviewed test oracle",
            "filename": "Create an independently reviewed test oracle",
            "code": "AC-1 → 1 unit → 2500 cents\nAC-2 → 2 units → 5000 cents",
            "command": "Read the oracle and run node --test core.test.ts.",
            "expected": "A duplicated requirement or incorrect total fails verification.",
            "explanation": "The lab is deliberately scoped to one issue. A new story requires a new reviewed oracle and a fixture update. It is unsafe to reuse this price table for unrelated issues."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Design a negative control for a plausible generated plan.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Submit AC-1 twice. Length alone is two, but AC-2 has no matching case and validation must fail.",
          "command": "Compare this reasoning with your result.",
          "expected": "A duplicated requirement or incorrect total fails verification.",
          "explanation": "Checking the number of cases without checking their requirement IDs."
        }
      },
      "mistakes": [
        "Checking the number of cases without checking their requirement IDs."
      ],
      "takeaway": "Link each expected result to an approved acceptance criterion."
    }
  },
  {
    "number": 5,
    "slug": "fixture-mode",
    "title": "Build the offline workflow first",
    "description": "Run the full draft and render path before introducing model variability.",
    "group": "Build",
    "content": {
      "introduction": "Run the full draft and render path before introducing model variability.",
      "objectives": [
        "Explain which stage this run exercises and which stage uses a model."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The fixture runner reads the local issue, fixes the supported story identity, validates a proposed plan and creates an isolated output directory.",
            "Each run writes strategy.json and cart.spec.ts under its own unique ID. Review the artifacts before copying a candidate into the test-discovery directory."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Build the offline workflow first",
            "filename": "Build the offline workflow first",
            "code": "node --test core.test.ts\nnode fixture-run.ts",
            "command": "Use Node.js 24 in practice-project. These two commands use built-in Node modules.",
            "expected": "The CLI prints a distinct runs directory containing the checked strategy and test.",
            "explanation": "Each run writes strategy.json and cart.spec.ts under its own unique ID. Review the artifacts before copying a candidate into the test-discovery directory."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Explain which stage this run exercises and which stage uses a model.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "This run exercises ingestion, validation and rendering. agent.ts supplies the optional model-generated strategy in the next lessons.",
          "command": "Compare this reasoning with your result.",
          "expected": "The CLI prints a distinct runs directory containing the checked strategy and test.",
          "explanation": "Calling a deterministic fixture response a live model run."
        }
      },
      "mistakes": [
        "Calling a deterministic fixture response a live model run."
      ],
      "takeaway": "Run the full draft and render path before introducing model variability."
    }
  },
  {
    "number": 6,
    "slug": "langchain-tools",
    "title": "Build a LangChain agent with a narrow tool",
    "description": "Give the model one useful capability for planning a cart test.",
    "group": "Build",
    "content": {
      "introduction": "Give the model one useful capability for planning a cart test.",
      "objectives": [
        "Name the exact side effects the lookup tool can perform."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "agent.ts creates a LangChain agent with a chat model, an acceptance-contract lookup tool and a structured response schema. The tool takes no user-selected URL, path or shell command.",
            "The story is supplied as data. Its description does not grant tools new permissions. A model provider receives the supplied synthetic story when you choose the live path.",
            "Use a model that supports tool calling and structured output with your installed provider integration. A model call can incur provider charges."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Build a LangChain agent with a narrow tool",
            "filename": "Build a LangChain agent with a narrow tool",
            "code": "npm install\n# Set MODEL_NAME and OPENAI_API_KEY locally.\nnpm run agent",
            "command": "Run in the practice folder. Inspect agent.ts before the optional provider call.",
            "expected": "A validated model strategy is written to a unique runs/model-plan file, or the run fails with a visible error.",
            "explanation": "Use a model that supports tool calling and structured output with your installed provider integration. A model call can incur provider charges."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Name the exact side effects the lookup tool can perform.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "It returns the local approved contract. It cannot edit Jira, run commands, browse the web, or modify the application.",
          "command": "Compare this reasoning with your result.",
          "expected": "A validated model strategy is written to a unique runs/model-plan file, or the run fails with a visible error.",
          "explanation": "Giving the planner a general-purpose shell for a read-only planning task."
        }
      },
      "mistakes": [
        "Giving the planner a general-purpose shell for a read-only planning task."
      ],
      "takeaway": "Give the model one useful capability for planning a cart test."
    }
  },
  {
    "number": 7,
    "slug": "structured-strategy",
    "title": "Validate structured strategy output",
    "description": "Use separate schema and business checks before trusting model output.",
    "group": "Build",
    "content": {
      "introduction": "Use separate schema and business checks before trusting model output.",
      "objectives": [
        "Explain why a valid JSON response can still be unsafe to run."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The response schema describes the shape of the model output. The application then validates that each required case matches the owner-approved quantity and price.",
            "The renderer uses only canonical checked values in executable code. Free-form risk text remains a report field. Keeping it outside the executable template reduces the risk of generated text changing control flow."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Validate structured strategy output",
            "filename": "Validate structured strategy output",
            "code": "node fixture-run.ts runs/model-plan-REPLACE_WITH_ID.json",
            "command": "Use the path actually returned by npm run agent.",
            "expected": "A strategy passing both gates produces a reviewable candidate test.",
            "explanation": "The renderer uses only canonical checked values in executable code. Free-form risk text remains a report field. Keeping it outside the executable template reduces the risk of generated text changing control flow."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Explain why a valid JSON response can still be unsafe to run.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Valid JSON may describe an incorrect business expectation or contain extraneous instructions. Whitelist required values and render only controlled operations.",
          "command": "Compare this reasoning with your result.",
          "expected": "A strategy passing both gates produces a reviewable candidate test.",
          "explanation": "Executing shell or JavaScript copied from an unconstrained model response."
        }
      },
      "mistakes": [
        "Executing shell or JavaScript copied from an unconstrained model response."
      ],
      "takeaway": "Use separate schema and business checks before trusting model output."
    }
  },
  {
    "number": 8,
    "slug": "langgraph-routing",
    "title": "Use LangGraph to route workflow state",
    "description": "Make the transition after validation visible and testable.",
    "group": "Build",
    "content": {
      "introduction": "Make the transition after validation visible and testable.",
      "objectives": [
        "Choose a route for an unrecognized requirement ID."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "LangGraph can represent steps as nodes and transitions as edges. For this exercise the planner is a producer, validation is a deterministic node, and the route selects rendering or human review.",
            "The included optional graph example consumes a proposal JSON file and returns a decision. Its state lives for one invocation. A durable production workflow would additionally require a checkpointer, run ID and a defined resume policy."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Use LangGraph to route workflow state",
            "filename": "Use LangGraph to route workflow state",
            "code": "node graph.ts runs/RUN_ID/strategy.json",
            "command": "Run after installing the lab dependencies. Replace RUN_ID with an actual fixture run.",
            "expected": "The graph returns render for an approved plan and review for a semantic mismatch.",
            "explanation": "The included optional graph example consumes a proposal JSON file and returns a decision. Its state lives for one invocation. A durable production workflow would additionally require a checkpointer, run ID and a defined resume policy."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Choose a route for an unrecognized requirement ID.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Route to review, preserve the proposal and explain which criterion failed. Avoid retrying an ambiguous requirement indefinitely.",
          "command": "Compare this reasoning with your result.",
          "expected": "The graph returns render for an approved plan and review for a semantic mismatch.",
          "explanation": "Treating a validation failure as permission to rewrite the oracle."
        }
      },
      "mistakes": [
        "Treating a validation failure as permission to rewrite the oracle."
      ],
      "takeaway": "Make the transition after validation visible and testable."
    }
  },
  {
    "number": 9,
    "slug": "generate-playwright",
    "title": "Generate a reviewable Playwright script",
    "description": "Translate a validated strategy into a reproducible TypeScript test.",
    "group": "Build",
    "content": {
      "introduction": "Translate a validated strategy into a reproducible TypeScript test.",
      "objectives": [
        "Locate the assertion that protects the two-item total."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "For this teaching domain the renderer emits a fixed action and assertions derived from reviewed cases. That lets a reviewer compare the generated spec with the strategy line by line.",
            "Use the printed run path. Inspect the file before copying it into tests. The default locator depends on the baseline accessible button name and deliberately fails under the rename experiment."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Generate a reviewable Playwright script",
            "filename": "Generate a reviewable Playwright script",
            "code": "node fixture-run.ts\n# Inspect the new directory, then copy the reviewed spec:\ncp runs/RUN_ID/cart.spec.ts tests/generated-cart.spec.ts\nnpx playwright test --list",
            "command": "Install dependencies first. Replace RUN_ID and check the target filename before copying.",
            "expected": "Test discovery shows AC-1 and AC-2 as distinct cases.",
            "explanation": "Use the printed run path. Inspect the file before copying it into tests. The default locator depends on the baseline accessible button name and deliberately fails under the rename experiment."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Locate the assertion that protects the two-item total.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The second case checks the independently required string Quantity 2 · Total $50.00. A count-only assertion would miss a pricing defect.",
          "command": "Compare this reasoning with your result.",
          "expected": "Test discovery shows AC-1 and AC-2 as distinct cases.",
          "explanation": "Approving a test only because it was generated without a syntax error."
        }
      },
      "mistakes": [
        "Approving a test only because it was generated without a syntax error."
      ],
      "takeaway": "Translate a validated strategy into a reproducible TypeScript test."
    }
  },
  {
    "number": 10,
    "slug": "n8n-workflow",
    "title": "Orchestrate the draft with n8n",
    "description": "Connect a manual workflow trigger to a local TypeScript service.",
    "group": "Build",
    "content": {
      "introduction": "Connect a manual workflow trigger to a local TypeScript service.",
      "objectives": [
        "Explain how you would avoid duplicate provider calls after workflow retries."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Start the supplied HTTP adapter. Import n8n/fixture-draft.json into a local n8n editor and execute the manual trigger. The HTTP Request node reads the controlled SHOP-42 draft.",
            "Use a native n8n instance on the same machine for the supplied loopback URL. In a container, localhost belongs to the container; use an explicitly configured private service network if adapting the lab.",
            "The sample intentionally runs in fixture mode. To introduce model calls, design a separate authenticated job submission and result retrieval path with a deduplication key and a bounded budget."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Orchestrate the draft with n8n",
            "filename": "Orchestrate the draft with n8n",
            "code": "node draft-service.ts\n# In another terminal:\ncurl --fail http://127.0.0.1:4192/draft/SHOP-42",
            "command": "Import the JSON through the n8n workflow editor. Inspect the HTTP node output.",
            "expected": "The response explicitly reports mode fixture and includes the validated cases.",
            "explanation": "The sample intentionally runs in fixture mode. To introduce model calls, design a separate authenticated job submission and result retrieval path with a deduplication key and a bounded budget."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Explain how you would avoid duplicate provider calls after workflow retries.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Store a job keyed by issue revision, oracle version and workflow version. Reuse its terminal result or resume the existing job before issuing another provider call.",
          "command": "Compare this reasoning with your result.",
          "expected": "The response explicitly reports mode fixture and includes the validated cases.",
          "explanation": "Putting provider secrets directly into an exported workflow JSON file."
        }
      },
      "mistakes": [
        "Putting provider secrets directly into an exported workflow JSON file."
      ],
      "takeaway": "Connect a manual workflow trigger to a local TypeScript service."
    }
  },
  {
    "number": 11,
    "slug": "run-and-collect",
    "title": "Run the candidate and capture evidence",
    "description": "Separate generated artifacts, executed tests and observed results.",
    "group": "Evaluate and repair",
    "content": {
      "introduction": "Separate generated artifacts, executed tests and observed results.",
      "objectives": [
        "Classify a server startup failure separately from a checkout failure."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The browser suite uses the local cart from the preceding course. Each test starts a fresh page. The runner owns the server unless a separate exercise explicitly asks you to start it.",
            "Capture the selected tests, variant, exit code and first failing assertion. A plan or a discovered spec is insufficient evidence that the browser interaction passed."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Run the candidate and capture evidence",
            "filename": "Run the candidate and capture evidence",
            "code": "npx playwright install chromium\nnpx playwright test tests/generated-cart.spec.ts --project=chromium\nLAB_VARIANT=rename npx playwright test tests/generated-cart.spec.ts --max-failures=1",
            "command": "Stop any manually running cart server before invoking Playwright Test.",
            "expected": "Baseline should pass. The rename experiment should fail at the stale locator.",
            "explanation": "Capture the selected tests, variant, exit code and first failing assertion. A plan or a discovered spec is insufficient evidence that the browser interaction passed."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Classify a server startup failure separately from a checkout failure.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Record environment failure and rerun after resolving the port or dependency. A browser assertion did not yet establish cart behavior.",
          "command": "Compare this reasoning with your result.",
          "expected": "Baseline should pass. The rename experiment should fail at the stale locator.",
          "explanation": "Reporting an expected outcome as an observed passing run."
        }
      },
      "mistakes": [
        "Reporting an expected outcome as an observed passing run."
      ],
      "takeaway": "Separate generated artifacts, executed tests and observed results."
    }
  },
  {
    "number": 12,
    "slug": "healer",
    "title": "Build an evidence-gated locator healer",
    "description": "Propose a narrowly scoped repair only after observing the approved rename.",
    "group": "Evaluate and repair",
    "content": {
      "introduction": "Propose a narrowly scoped repair only after observing the approved rename.",
      "objectives": [
        "Explain why an old locator timeout alone cannot justify a repair."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The probe checks the old accessible locator, the uniqueness of the supported test ID, the approved new label and the visible amount after a click. The classifier requires these observations before emitting a repair candidate.",
            "The repair is generated into a new run directory. A reviewer decides whether to promote it. A wrong total routes to a product-failure report even if a locator also changed."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Build an evidence-gated locator healer",
            "filename": "Build an evidence-gated locator healer",
            "code": "npm start\n# Separate terminal in the practice folder:\nnode heal.ts rename\nnode heal.ts defect",
            "command": "Install Chromium first. The probe uses the manually started local app.",
            "expected": "Rename produces a proposed candidate. The wrong-price variant produces a product-failure decision.",
            "explanation": "The repair is generated into a new run directory. A reviewer decides whether to promote it. A wrong total routes to a product-failure report even if a locator also changed."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Explain why an old locator timeout alone cannot justify a repair.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The page could be unavailable, permission denied, or in the wrong state. Verify the replacement control and its independent behavior before changing the selector.",
          "command": "Compare this reasoning with your result.",
          "expected": "Rename produces a proposed candidate. The wrong-price variant produces a product-failure decision.",
          "explanation": "Weakening the expected price or skipping the failing case to produce green CI."
        }
      },
      "mistakes": [
        "Weakening the expected price or skipping the failing case to produce green CI."
      ],
      "takeaway": "Propose a narrowly scoped repair only after observing the approved rename."
    }
  },
  {
    "number": 13,
    "slug": "evaluation",
    "title": "Evaluate agent and healer decisions",
    "description": "Measure whether the workflow distinguishes useful proposals from false repairs.",
    "group": "Evaluate and repair",
    "content": {
      "introduction": "Measure whether the workflow distinguishes useful proposals from false repairs.",
      "objectives": [
        "Define a metric for the healer on a labeled defect set."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Keep a small labeled set: supported rename, wrong amount, ambiguous hook, repeated case, missing criterion. Compare the expected classification with the observed decision after changing prompts, models or policy.",
            "False repairs are particularly costly because they can turn a real regression into a passing test. Track them separately from invalid drafts, inconclusive probes and ordinary test failures.",
            "The included tests exercise deterministic boundaries. Evaluate actual model output across repeated controlled runs separately and retain the model identifier and input revision."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Evaluate agent and healer decisions",
            "filename": "Evaluate agent and healer decisions",
            "code": "node --test core.test.ts",
            "command": "Inspect the named tests and introduce one disposable incorrect expected value to confirm the check fails.",
            "expected": "The test output identifies which workflow decision was violated.",
            "explanation": "The included tests exercise deterministic boundaries. Evaluate actual model output across repeated controlled runs separately and retain the model identifier and input revision."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Define a metric for the healer on a labeled defect set.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Count defect examples incorrectly classified as repairable, and report that count with the number of actual defects. Keep inconclusive examples visible.",
          "command": "Compare this reasoning with your result.",
          "expected": "The test output identifies which workflow decision was violated.",
          "explanation": "Reporting one overall pass percentage without identifying false repairs."
        }
      },
      "mistakes": [
        "Reporting one overall pass percentage without identifying false repairs."
      ],
      "takeaway": "Measure whether the workflow distinguishes useful proposals from false repairs."
    }
  },
  {
    "number": 14,
    "slug": "capstone",
    "title": "Project: Jira story to reviewed test and repair",
    "description": "Deliver a traceable strategy, an executable test, and a defensible repair decision.",
    "group": "Evaluate and repair",
    "content": {
      "introduction": "Deliver a traceable strategy, an executable test, and a defensible repair decision.",
      "objectives": [
        "Write a release note for a valid rename repair."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Start from the synthetic Jira record. Produce a fixture draft, optionally compare a live LangChain draft, and inspect the same strategy through the n8n adapter.",
            "Generate and review a Playwright spec. Run the baseline, investigate the approved rename, propose a locator repair, and prove that the repaired test still catches the wrong-price variant.",
            "The next roadmap section applies these components to broader AI-driven testing. This project focuses on building the individual agents, tools and validation boundaries."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Project: Jira story to reviewed test and repair",
            "filename": "Project: Jira story to reviewed test and repair",
            "code": "Deliverables: issue key → approved oracle → strategy JSON → reviewed spec → run outcome → decision JSON → repair diff → negative-control result",
            "command": "Follow the practice README. Attach only observed evidence and record the mode of each stage.",
            "expected": "A reviewer can follow each assertion back to an acceptance criterion and distinguish the product defect from the locator repair.",
            "explanation": "The next roadmap section applies these components to broader AI-driven testing. This project focuses on building the individual agents, tools and validation boundaries."
          }
        }
      ],
      "exercise": {
        "title": "Try it in VS Code",
        "tasks": [
          "Write a release note for a valid rename repair.",
          "Record the evidence that supports your decision."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Identify the changed label, retained amount contract, reviewed locator and actual test evidence. If Chromium or the model provider was unavailable, record the unexecuted step.",
          "command": "Compare this reasoning with your result.",
          "expected": "A reviewer can follow each assertion back to an acceptance criterion and distinguish the product defect from the locator repair.",
          "explanation": "Automatically merging an unreviewed candidate or posting unverified results to Jira."
        }
      },
      "mistakes": [
        "Automatically merging an unreviewed candidate or posting unverified results to Jira."
      ],
      "takeaway": "Deliver a traceable strategy, an executable test, and a defensible repair decision."
    }
  }
];
