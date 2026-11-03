export type AiDrivenExample = {
  title: string; filename: string; code: string;
  command: string; expected: string; explanation: string;
};
export type AiDrivenSection = {
  title: string; paragraphs: string[]; bullets?: string[];
  example?: AiDrivenExample;
  table?: { headers: string[]; rows: string[][] };
};
export type AiDrivenLessonData = {
  number: number; slug: string; title: string; description: string;
  group: "Plan" | "Execute" | "Decide";
  content: {
    introduction: string; objectives: string[]; sections: AiDrivenSection[];
    mistakes: string[];
    exercise: { title: string; tasks: string[]; solution: AiDrivenExample };
    takeaway: string;
  };
};

export const aiDrivenLessons: AiDrivenLessonData[] = [
  {
    "number": 1,
    "slug": "release-question",
    "title": "Set the release question",
    "description": "Decide what evidence would justify recommending a checkout change for review.",
    "group": "Plan",
    "content": {
      "introduction": "Decide what evidence would justify recommending a checkout change for review.",
      "objectives": [
        "Identify a condition that should prevent a ready recommendation."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "SHOP-77 adds free shipping when a subtotal reaches 5000 cents. A one-cent boundary error could charge every shopper at exactly that amount.",
            "The AI assistant drafts risks and classifies evidence. A human owns the acceptance criteria and the release decision. The lab’s decision tool produces a recommendation scoped to the tested variant."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Set the release question",
            "filename": "Set the release question",
            "code": "Question: does the candidate calculate and display the approved fee below, at, and above the threshold?",
            "command": "Read fixtures/story.json. Write a release question before opening the application.",
            "expected": "The question names a business outcome and a bounded scope.",
            "explanation": "The AI assistant drafts risks and classifies evidence. A human owns the acceptance criteria and the release decision. The lab’s decision tool produces a recommendation scoped to the tested variant."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Identify a condition that should prevent a ready recommendation.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "If the UI test was skipped, API results still leave the shopper-facing criterion unverified.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "The question names a business outcome and a bounded scope.",
          "explanation": "Equating a successful API request with complete checkout coverage."
        }
      },
      "mistakes": [
        "Equating a successful API request with complete checkout coverage."
      ],
      "takeaway": "Decide what evidence would justify recommending a checkout change for review."
    }
  },
  {
    "number": 2,
    "slug": "story-intake",
    "title": "Intake a Jira story and freeze its revision",
    "description": "Keep the source story, review assumptions and expected fee table together.",
    "group": "Plan",
    "content": {
      "introduction": "Keep the source story, review assumptions and expected fee table together.",
      "objectives": [
        "Identify one assumption outside the approved criteria."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The lab includes a normalized synthetic Jira story. Section 10 provides the read-only Jira adapter if you need to collect a real issue in an authorized project.",
            "Store the key and revision with the proposal and execution evidence. If a product owner changes the threshold after planning, refresh the strategy and rerun the affected cases."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Intake a Jira story and freeze its revision",
            "filename": "Intake a Jira story and freeze its revision",
            "code": "SHOP-77 revision 3\n4999 → 500 cents shipping\n5000 → 0\n5001 → 0",
            "command": "Compare story.json and oracle.json. Both use integer cents.",
            "expected": "A reviewer can reproduce each expectation independently of application output.",
            "explanation": "Store the key and revision with the proposal and execution evidence. If a product owner changes the threshold after planning, refresh the strategy and rerun the affected cases."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Identify one assumption outside the approved criteria.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The story does not specify negative subtotals or currency conversion. Raise those as questions rather than inventing expected behavior.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "A reviewer can reproduce each expectation independently of application output.",
          "explanation": "Accepting a strategy for an older revision without re-review."
        }
      },
      "mistakes": [
        "Accepting a strategy for an older revision without re-review."
      ],
      "takeaway": "Keep the source story, review assumptions and expected fee table together."
    }
  },
  {
    "number": 3,
    "slug": "risk-strategy",
    "title": "Use AI to draft a risk-based strategy",
    "description": "Give the planner enough context to propose discriminating scenarios.",
    "group": "Plan",
    "content": {
      "introduction": "Give the planner enough context to propose discriminating scenarios.",
      "objectives": [
        "Explain the additional value of the exact-threshold case."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Use the supplied prompt in your local assistant. Give it only the synthetic issue and reviewed oracle. The fixture proposal makes the exercise repeatable without a provider account.",
            "Ask for a reason for each case. A suite using 4000 and 6000 alone would pass both an inclusive and an exclusive threshold implementation. Exactly 5000 distinguishes them."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Use AI to draft a risk-based strategy",
            "filename": "Use AI to draft a risk-based strategy",
            "code": "Read prompts/strategy.md. Save a candidate using the shape of fixtures/strategy.json.\nnode prepare.mjs path/to/reviewed-strategy.json",
            "command": "Review risk language and coverage before rendering.",
            "expected": "An accepted proposal includes the four approved case IDs for the correct revision.",
            "explanation": "Ask for a reason for each case. A suite using 4000 and 6000 alone would pass both an inclusive and an exclusive threshold implementation. Exactly 5000 distinguishes them."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Explain the additional value of the exact-threshold case.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "It detects an accidental > comparison where the requirement needs >=. Both neighboring cases can still pass.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "An accepted proposal includes the four approved case IDs for the correct revision.",
          "explanation": "Ranking scenarios by quantity without assessing which defect each can reveal."
        }
      },
      "mistakes": [
        "Ranking scenarios by quantity without assessing which defect each can reveal."
      ],
      "takeaway": "Give the planner enough context to propose discriminating scenarios."
    }
  },
  {
    "number": 4,
    "slug": "traceability",
    "title": "Choose the right test layer",
    "description": "Assign calculation checks to the API and one user-facing check to the browser.",
    "group": "Plan",
    "content": {
      "introduction": "Assign calculation checks to the API and one user-facing check to the browser.",
      "objectives": [
        "Decide whether three passing API checks cover AC-SCREEN."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "API checks exercise the fee rule directly and run quickly. The browser check catches incorrect rendering or failure to request the quote even if the API is correct.",
            "Map each approved requirement ID to its expected value and layer. The oracle defines these fields. The proposal supplies a rationale but cannot overwrite executable expectations."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Choose the right test layer",
            "filename": "Choose the right test layer",
            "code": "AC-BELOW: API, 4999 → 500\nAC-AT: API, 5000 → 0\nAC-ABOVE: API, 5001 → 0\nAC-SCREEN: browser, 5000 → Shipping: $0.00",
            "command": "Inspect the four entries in fixtures/oracle.json.",
            "expected": "The release report can identify a missing layer by its case ID.",
            "explanation": "Map each approved requirement ID to its expected value and layer. The oracle defines these fields. The proposal supplies a rationale but cannot overwrite executable expectations."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Decide whether three passing API checks cover AC-SCREEN.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "No. A rendering defect can show a stale fee. Record the screen case as pending until it runs.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "The release report can identify a missing layer by its case ID.",
          "explanation": "Counting a case as covered merely because a generated test file exists."
        }
      },
      "mistakes": [
        "Counting a case as covered merely because a generated test file exists."
      ],
      "takeaway": "Assign calculation checks to the API and one user-facing check to the browser."
    }
  },
  {
    "number": 5,
    "slug": "generate-and-review",
    "title": "Generate and review the Playwright candidate",
    "description": "Render executable tests from a reviewed plan with independent assertions.",
    "group": "Execute",
    "content": {
      "introduction": "Render executable tests from a reviewed plan with independent assertions.",
      "objectives": [
        "Find the assertion that would detect a 200 response containing the wrong fee."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "prepare.mjs checks strategy identity, revision, coverage and case rationales before emitting a TypeScript spec. Values and operations come from the approved local oracle.",
            "The output path is tests/shipping.generated.spec.ts. Rerunning the renderer replaces that generated file. Copy a candidate before experimenting with repairs."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Generate and review the Playwright candidate",
            "filename": "Generate and review the Playwright candidate",
            "code": "node prepare.mjs\ncat tests/shipping.generated.spec.ts\nnpm install\nnpm run typecheck\nnpx playwright test --list",
            "command": "Use Node.js 24 in practice-project. Review the expected values, request method and UI locator.",
            "expected": "Four tests are discovered with their requirement IDs as titles.",
            "explanation": "The output path is tests/shipping.generated.spec.ts. Rerunning the renderer replaces that generated file. Copy a candidate before experimenting with repairs."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Find the assertion that would detect a 200 response containing the wrong fee.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The API tests compare both subtotal and fee with the reviewed expected object. Status 200 alone would miss the defect.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "Four tests are discovered with their requirement IDs as titles.",
          "explanation": "Letting generated code read its expected amount from the actual response."
        }
      },
      "mistakes": [
        "Letting generated code read its expected amount from the actual response."
      ],
      "takeaway": "Render executable tests from a reviewed plan with independent assertions."
    }
  },
  {
    "number": 6,
    "slug": "baseline-execution",
    "title": "Execute a baseline and retain evidence",
    "description": "Run the prepared suite against a known application variant.",
    "group": "Execute",
    "content": {
      "introduction": "Run the prepared suite against a known application variant.",
      "objectives": [
        "Explain why an API-only run must remain incomplete."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The reference app runs locally on port 4193. Playwright starts and stops it using webServer. The request-only tests need no browser process. The UI test additionally requires installed Chromium.",
            "Each run writes a separate evidence.json. Use the path printed by the reporter and retain the matching trace when investigating a failure."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Execute a baseline and retain evidence",
            "filename": "Execute a baseline and retain evidence",
            "code": "npx playwright install chromium\nnpx playwright test\nnode gate.mjs runs/RUN_ID/evidence.json baseline",
            "command": "Replace RUN_ID with the actual path for this run.",
            "expected": "A complete passing baseline is eligible for human review.",
            "explanation": "Each run writes a separate evidence.json. Use the path printed by the reporter and retain the matching trace when investigating a failure."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Explain why an API-only run must remain incomplete.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "A grep-filtered run omits AC-SCREEN. The gate must reject a ready recommendation even if all selected cases pass.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "A complete passing baseline is eligible for human review.",
          "explanation": "Using the newest file in a shared directory without checking run identity."
        }
      },
      "mistakes": [
        "Using the newest file in a shared directory without checking run identity."
      ],
      "takeaway": "Run the prepared suite against a known application variant."
    }
  },
  {
    "number": 7,
    "slug": "failure-triage",
    "title": "Triage a boundary regression",
    "description": "Distinguish a failing product assertion from an unavailable test environment.",
    "group": "Execute",
    "content": {
      "introduction": "Distinguish a failing product assertion from an unavailable test environment.",
      "objectives": [
        "Write a defect title with the triggering subtotal and incorrect fee."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The boundary-bug variant changes the free-shipping comparison to strictly greater than 5000. The exact-threshold API case should distinguish the defect from a global outage.",
            "Use the triage prompt to summarize a real run. Compare failing and passing neighbors, inspect the assertion and identify the smallest reproducible request. A runner launch failure has a different remediation path."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Triage a boundary regression",
            "filename": "Triage a boundary regression",
            "code": "VARIANT=boundary-bug npx playwright test --grep 'AC-(BELOW|AT|ABOVE)'\nnode gate.mjs runs/RUN_ID/evidence.json boundary-bug",
            "command": "The first command intentionally returns a failing status. Run the reporting command separately.",
            "expected": "The exact boundary fails while adjacent cases pass. The gate returns HOLD.",
            "explanation": "Use the triage prompt to summarize a real run. Compare failing and passing neighbors, inspect the assertion and identify the smallest reproducible request. A runner launch failure has a different remediation path."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Write a defect title with the triggering subtotal and incorrect fee.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "At 5000 cents the quote returns a 500-cent shipping fee although SHOP-77 revision 3 requires free shipping. Attach the actual response and case ID.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "The exact boundary fails while adjacent cases pass. The gate returns HOLD.",
          "explanation": "Describing a missing browser binary as a product pricing defect."
        }
      },
      "mistakes": [
        "Describing a missing browser binary as a product pricing defect."
      ],
      "takeaway": "Distinguish a failing product assertion from an unavailable test environment."
    }
  },
  {
    "number": 8,
    "slug": "repair-policy",
    "title": "Evaluate a healer proposal",
    "description": "Accept an approved copy-change repair only when the business assertion survives.",
    "group": "Execute",
    "content": {
      "introduction": "Accept an approved copy-change repair only when the business assertion survives.",
      "objectives": [
        "Reject a proposed repair that changes the expected fee to $5.00."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The copy-change variant renames Quote shipping to Calculate shipping and leaves the fee rule intact. The exercise explicitly approves both labels and supplies the stable quote test ID.",
            "Ask the section 10 healer or a local assistant for a candidate diff. Review the element role and approved name, then compare the price assertion before and after. Keep the original generated spec available."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Evaluate a healer proposal",
            "filename": "Evaluate a healer proposal",
            "code": "Original: page.getByRole(\"button\",{name:\"Quote shipping\"})\nCandidate: page.getByTestId(\"quote\")\nAdditional check: expect(button).toHaveAccessibleName(/^(Quote|Calculate) shipping$/)\nPreserve: expect(status).toHaveText(\"Shipping: $0.00\")",
            "command": "Make the edit only in a reviewed copy or on a practice branch. Run the repaired test against copy-change, then boundary-bug.",
            "expected": "The copy change should pass after a valid repair, while the pricing defect should still fail.",
            "explanation": "Ask the section 10 healer or a local assistant for a candidate diff. Review the element role and approved name, then compare the price assertion before and after. Keep the original generated spec available."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Reject a proposed repair that changes the expected fee to $5.00.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The story still requires free shipping. Preserve the failed assertion and route the defect to the application owner.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "The copy change should pass after a valid repair, while the pricing defect should still fail.",
          "explanation": "Skipping the UI case or accepting whichever amount happens to appear."
        }
      },
      "mistakes": [
        "Skipping the UI case or accepting whichever amount happens to appear."
      ],
      "takeaway": "Accept an approved copy-change repair only when the business assertion survives."
    }
  },
  {
    "number": 9,
    "slug": "coverage-and-gates",
    "title": "Aggregate evidence into a review recommendation",
    "description": "Use distinct outcomes for failed, incomplete and complete evidence.",
    "group": "Decide",
    "content": {
      "introduction": "Use distinct outcomes for failed, incomplete and complete evidence.",
      "objectives": [
        "Predict the decision for four green rows containing AC-AT twice and no AC-SCREEN."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "The gate validates the story, revision and expected variant. It requires one passed result for each of the four distinct cases. A partial green run cannot satisfy the full release scope.",
            "HOLD asks a reviewer to investigate a failing run. It does not automatically classify the product as defective. INCOMPLETE signals scope or identity gaps. READY FOR REVIEW still requires a human decision."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Aggregate evidence into a review recommendation",
            "filename": "Aggregate evidence into a review recommendation",
            "code": "node --test gate.test.mjs\nnode gate.mjs runs/RUN_ID/evidence.json baseline",
            "command": "Inspect the fixture tests for missing, repeated, skipped and stale evidence.",
            "expected": "Incomplete or failed evidence produces a nonzero gate exit.",
            "explanation": "HOLD asks a reviewer to investigate a failing run. It does not automatically classify the product as defective. INCOMPLETE signals scope or identity gaps. READY FOR REVIEW still requires a human decision."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Predict the decision for four green rows containing AC-AT twice and no AC-SCREEN.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "INCOMPLETE. The duplicate has no additional coverage value and the screen observation is missing.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "Incomplete or failed evidence produces a nonzero gate exit.",
          "explanation": "Using a raw count of passing rows as the release criterion."
        }
      },
      "mistakes": [
        "Using a raw count of passing rows as the release criterion."
      ],
      "takeaway": "Use distinct outcomes for failed, incomplete and complete evidence."
    }
  },
  {
    "number": 10,
    "slug": "release-communication",
    "title": "Write an evidence-backed release report",
    "description": "Turn runner output into a useful engineering decision record.",
    "group": "Decide",
    "content": {
      "introduction": "Turn runner output into a useful engineering decision record.",
      "objectives": [
        "Write a report when API checks pass but browser access fails."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Provide issue revision, variant, exact test selection, observed outcomes, unresolved risks and the next owner. Mark synthetic data and actual execution clearly.",
            "Have the assistant draft from the selected evidence file. Verify every claim against the runner or a trace. Keep the report local until its audience and contents have been reviewed."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Write an evidence-backed release report",
            "filename": "Write an evidence-backed release report",
            "code": "SHOP-77 rev 3 | variant | run path\nObserved: case ID, status, expected and actual when available\nRecommendation: HOLD / INCOMPLETE / READY FOR REVIEW\nNext action and owner",
            "command": "Use prompts/triage.md and the supplied reporting template.",
            "expected": "A reviewer can distinguish a business defect from unexecuted coverage.",
            "explanation": "Have the assistant draft from the selected evidence file. Verify every claim against the runner or a trace. Keep the report local until its audience and contents have been reviewed."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Write a report when API checks pass but browser access fails.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Record the successful API observations and browser environment failure. Assign the missing UI verification before recommending release.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "A reviewer can distinguish a business defect from unexecuted coverage.",
          "explanation": "Presenting a planned result or an assistant summary as observed evidence."
        }
      },
      "mistakes": [
        "Presenting a planned result or an assistant summary as observed evidence."
      ],
      "takeaway": "Turn runner output into a useful engineering decision record."
    }
  },
  {
    "number": 11,
    "slug": "evaluate-the-workflow",
    "title": "Evaluate workflow quality and false passes",
    "description": "Measure the decisions that matter when a prompt, model or policy changes.",
    "group": "Decide",
    "content": {
      "introduction": "Measure the decisions that matter when a prompt, model or policy changes.",
      "objectives": [
        "Define a useful denominator for a false-ready metric."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Keep a labeled evaluation set with passing evidence, stale revisions, missing UI checks, duplicate coverage, copy drift and a real price defect. Compare both recommendations and explanations.",
            "Track false-ready decisions separately from unnecessary holds. For model outputs record the input revision and model configuration. Repeat representative cases when assessing variability."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Evaluate workflow quality and false passes",
            "filename": "Evaluate workflow quality and false passes",
            "code": "Experiment: remove the exact-threshold case from a proposal.\nExpected planning result: reject incomplete strategy.\nExperiment: run only API tests.\nExpected gate result: INCOMPLETE.",
            "command": "Use copies of the provided JSON inputs. Keep expected labels independent of the candidate policy.",
            "expected": "The evaluation catches missing coverage before it becomes a release recommendation.",
            "explanation": "Track false-ready decisions separately from unnecessary holds. For model outputs record the input revision and model configuration. Repeat representative cases when assessing variability."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Define a useful denominator for a false-ready metric.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Divide incorrect ready recommendations by the number of labeled examples that should have been held or incomplete. Show raw counts as well.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "The evaluation catches missing coverage before it becomes a release recommendation.",
          "explanation": "Reporting overall accuracy while hiding a false pass on a real pricing defect."
        }
      },
      "mistakes": [
        "Reporting overall accuracy while hiding a false pass on a real pricing defect."
      ],
      "takeaway": "Measure the decisions that matter when a prompt, model or policy changes."
    }
  },
  {
    "number": 12,
    "slug": "final-capstone",
    "title": "Final project: review the shipping release",
    "description": "Follow one story from intake to a defensible final handoff.",
    "group": "Decide",
    "content": {
      "introduction": "Follow one story from intake to a defensible final handoff.",
      "objectives": [
        "Present a decision for the defective variant and name one scope limitation."
      ],
      "sections": [
        {
          "title": "Design decision",
          "paragraphs": [
            "Draft a strategy with the provided local assistant prompt or replay the fixture. Review it, generate the cases, run a baseline and investigate the two controlled variants.",
            "Require a before-and-after diff for a locator repair and a failed negative control for the real defect. Attach the relevant run records. The learner owns the final recommendation and remaining uncertainty.",
            "This final project connects requirements, programming, UI and API automation, CI evidence and AI-assisted reasoning in a single release review."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Final project: review the shipping release",
            "filename": "Final project: review the shipping release",
            "code": "Deliver: story revision → strategy → reviewed spec → baseline evidence → defect reproduction → reviewed copy-change repair → negative control → release note",
            "command": "Follow the practice README in sequence. The supplied workflow runs the reviewed fixture suite in CI.",
            "expected": "Every claimed result maps back to a requirement and an actual run.",
            "explanation": "This final project connects requirements, programming, UI and API automation, CI evidence and AI-assisted reasoning in a single release review."
          }
        }
      ],
      "exercise": {
        "title": "Apply it to SHOP-77",
        "tasks": [
          "Present a decision for the defective variant and name one scope limitation.",
          "Record the supporting requirement or observed result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Hold for the incorrect exact-threshold fee if reproduced. Payment capture and production deployment behavior are outside this lab’s scope.",
          "command": "Compare the reasoning with your evidence.",
          "expected": "Every claimed result maps back to a requirement and an actual run.",
          "explanation": "Claiming an untested environment or a broader product release is ready."
        }
      },
      "mistakes": [
        "Claiming an untested environment or a broader product release is ready."
      ],
      "takeaway": "Follow one story from intake to a defensible final handoff."
    }
  }
];
