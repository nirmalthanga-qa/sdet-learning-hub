export type NftExample = {
  title: string; filename: string; code: string;
  command: string; expected: string; explanation: string;
};
export type NftSection = {
  title: string; paragraphs: string[]; bullets?: string[];
  example?: NftExample;
  table?: { headers: string[]; rows: string[][] };
};
export type NftLessonData = {
  number: number; slug: string; title: string; description: string;
  group: "Accessibility" | "Performance";
  content: {
    introduction: string; objectives: string[]; sections: NftSection[];
    mistakes: string[];
    exercise: { title: string; tasks: string[]; solution: NftExample };
    takeaway: string;
  };
};

export const nonFunctionalLessons: NftLessonData[] = [
  {
    "number": 1,
    "slug": "non-functional-foundations",
    "title": "Accessibility and Performance Foundations",
    "description": "Translate usability and responsiveness needs into observable quality requirements.",
    "group": "Accessibility",
    "content": {
      "introduction": "Translate usability and responsiveness needs into observable quality requirements.",
      "objectives": [
        "Distinguish functional and non-functional evidence.",
        "Write one accessibility and one performance requirement."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Functional checks ask whether an operation works. Non-functional checks investigate qualities such as whether users can operate it and whether it remains responsive under a defined workload.",
            "Accessibility is about people and barriers, not only scanner scores. Performance is about an explicit workload, environment, and acceptance criteria, not a single fast request.",
            "This course uses a separate local practice app. The website displays lessons; learners run checks locally. Load only systems you own or have authorization to test.",
            "The two halves share a learning structure but produce different evidence: assistive-technology observations and interaction checks versus timing distributions, errors, throughput, and resource observations."
          ]
        },
        {
          "title": "Example 1: Define a measurable requirement",
          "paragraphs": [],
          "example": {
            "title": "Define a measurable requirement",
            "filename": "Define a measurable requirement",
            "code": "Accessibility: a keyboard user can open help, close it, and continue from the opener.\nPerformance: in the controlled lab, the product endpoint meets an agreed latency and error budget at a specified arrival rate.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "Requirements identify users or workload, expected behavior, and evidence.",
            "explanation": "Avoid calling a passing scanner complete accessibility compliance or a local timing production capacity."
          }
        }
      ],
      "mistakes": [
        "Using scores without scope.",
        "Treating accessibility as a cosmetic check."
      ],
      "exercise": {
        "title": "Practice: Accessibility and Performance Foundations",
        "tasks": [
          "Distinguish functional and non-functional evidence.",
          "Write one accessibility and one performance requirement."
        ],
        "solution": {
          "title": "Evidence plan",
          "filename": "Evidence plan",
          "code": "Record build, environment, tool versions, test scope, observed result, and limitations.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "A reviewer can reproduce and interpret the result.",
          "explanation": "Keep assumptions explicit."
        }
      },
      "takeaway": "Translate usability and responsiveness needs into observable quality requirements."
    }
  },
  {
    "number": 2,
    "slug": "accessibility-principles",
    "title": "Accessibility Principles and WCAG Scope",
    "description": "Use accessibility criteria to organize tests without claiming more coverage than was evaluated.",
    "group": "Accessibility",
    "content": {
      "introduction": "Use accessibility criteria to organize tests without claiming more coverage than was evaluated.",
      "objectives": [
        "Define the target and tested states.",
        "Explain why a scan cannot establish conformance."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Organize checks around perceivable information, operable controls, understandable interactions, and robust semantics. A complete evaluation needs representative pages, states, tasks, and technologies.",
            "WCAG has A, AA, and AAA success criteria. A chosen target such as WCAG 2.2 AA includes applicable A and AA criteria; it is not satisfied by averaging scores.",
            "Examples of WCAG 2.2 additions include focus not entirely obscured at AA and minimum target sizing with defined exceptions. Do not confuse the AA focus-obscuring rule with the stricter enhanced AAA criterion.",
            "Use the actual criterion text and applicable exceptions when recording findings. This course teaches testing practice, not a legal compliance determination."
          ]
        },
        {
          "title": "Example 1: Scope worksheet",
          "paragraphs": [],
          "example": {
            "title": "Scope worksheet",
            "filename": "Scope worksheet",
            "code": "Target: WCAG 2.2 A and AA\nPages: preferences form and help dialog\nStates: initial, invalid submission, successful save, dialog open\nManual: keyboard, zoom, contrast, screen reader\nAutomated: axe scans and interaction assertions",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The scope includes dynamic states and manual work.",
            "explanation": "The practice scope is smaller than a whole-site conformance assessment."
          }
        }
      ],
      "mistakes": [
        "Calling a zero-violation scan compliant.",
        "Ignoring overlays and error states."
      ],
      "exercise": {
        "title": "Practice: Accessibility Principles and WCAG Scope",
        "tasks": [
          "Define the target and tested states.",
          "Explain why a scan cannot establish conformance."
        ],
        "solution": {
          "title": "Coverage record",
          "filename": "Coverage record",
          "code": "For each applicable criterion: tested / failed / not tested / not applicable, with evidence and rationale.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "Unassessed criteria remain visible.",
          "explanation": "Do not label unknown coverage as passed."
        }
      },
      "takeaway": "Use accessibility criteria to organize tests without claiming more coverage than was evaluated."
    }
  },
  {
    "number": 3,
    "slug": "semantics-and-names",
    "title": "Semantic HTML, Accessible Names, and Landmarks",
    "description": "Inspect the structure exposed to assistive technologies.",
    "group": "Accessibility",
    "content": {
      "introduction": "Inspect the structure exposed to assistive technologies.",
      "objectives": [
        "Inspect headings, landmarks, and button names.",
        "Start the practice app and identify each interactive control."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Prefer native links, buttons, headings, labels, and inputs. ARIA can describe semantics but does not implement keyboard behavior.",
            "An accessible name tells the user what a control is. It should match its purpose and normally include visible label wording for consistent voice and screen-reader operation.",
            "Landmarks and heading structure help users navigate. Check meaningful hierarchy instead of choosing heading levels only for visual size.",
            "Install the separate practice files shown below. Use fictional data. The form intentionally stores nothing beyond the current page."
          ]
        },
        {
          "title": "Example 1: index.html",
          "paragraphs": [],
          "example": {
            "title": "index.html",
            "filename": "index.html",
            "code": "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>Quality Lab — Delivery preferences</title>\n<style>\n* { box-sizing: border-box; }\nbody { margin: 0; color: #2a1a0e; background: #fff8f0; font: 1rem/1.6 system-ui,sans-serif; }\nheader,main,footer { max-width: 48rem; margin: auto; padding: 1rem; }\nlabel { display: block; font-weight: 600; }\ninput,button { font: inherit; padding: .65rem; max-width: 100%; }\nbutton { background: #4d2a00; color: white; border: 2px solid #4d2a00; border-radius: .4rem; cursor: pointer; }\ninput { border: 2px solid #665548; width: 100%; }\na { color: #4d2a00; }\n:focus-visible { outline: 3px solid #005fcc; outline-offset: 3px; }\n.skip { position: absolute; left: 1rem; top: -10rem; background: white; padding: .5rem; }\n.skip:focus { top: 0; }\n.error { color: #8b0000; font-weight: 600; }\ndialog { max-width: min(30rem, calc(100% - 2rem)); color: inherit; background: #fff8f0; }\ndialog::backdrop { background: rgb(0 0 0 / .5); }\n@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }\n</style></head>\n<body>\n<a class=\"skip\" href=\"#main\">Skip to main content</a>\n<header><nav aria-label=\"Primary\"><a href=\"/\">Quality Lab home</a></nav></header>\n<main id=\"main\" tabindex=\"-1\">\n<h1>Delivery preferences</h1>\n<p>Practice keyboard access, form errors, and status announcements.</p>\n<form id=\"delivery\" novalidate>\n<label for=\"customer\">Customer name (required)</label>\n<p id=\"name-hint\">Use a fictional name for this practice exercise.</p>\n<input id=\"customer\" name=\"customer\" autocomplete=\"name\" required aria-describedby=\"name-hint name-error\">\n<p id=\"name-error\" class=\"error\"></p>\n<button type=\"submit\">Save preferences</button>\n</form>\n<p id=\"save-status\" role=\"status\" aria-live=\"polite\"></p>\n<button id=\"help\" type=\"button\">Delivery help</button>\n<dialog id=\"help-dialog\" aria-labelledby=\"help-title\">\n<h2 id=\"help-title\">Delivery help</h2>\n<p>Preferences are stored only in this page demonstration.</p>\n<button id=\"close-help\" type=\"button\" autofocus>Close help</button>\n</dialog>\n</main>\n<footer><p>Local SDET practice application</p></footer>\n<script>\nconst customer = document.querySelector('#customer');\nconst error = document.querySelector('#name-error');\nconst status = document.querySelector('#save-status');\ndocument.querySelector('#delivery').addEventListener('submit', event => {\n event.preventDefault(); status.textContent = '';\n if (!customer.value.trim()) {\n  error.textContent = 'Enter a customer name.';\n  customer.setAttribute('aria-invalid', 'true'); customer.focus(); return;\n }\n error.textContent = ''; customer.removeAttribute('aria-invalid');\n status.textContent = 'Preferences saved.';\n});\nconst help = document.querySelector('#help');\nconst dialog = document.querySelector('#help-dialog');\nhelp.addEventListener('click', () => dialog.showModal());\ndocument.querySelector('#close-help').addEventListener('click', () => dialog.close());\ndialog.addEventListener('close', () => help.focus());\n</script>\n</body></html>",
            "command": "Run npm start after saving server.mjs.",
            "expected": "A form and native modal dialog provide controlled practice states.",
            "explanation": "This teaching page is not a certified accessible product; manual evaluation remains necessary."
          }
        },
        {
          "title": "Example 2: server.mjs",
          "paragraphs": [],
          "example": {
            "title": "server.mjs",
            "filename": "server.mjs",
            "code": "import http from 'node:http';\nimport { readFile } from 'node:fs/promises';\nconst html = await readFile(new URL('./index.html', import.meta.url));\nconst products = [\n { id: 'p1', name: 'Keyboard', priceCents: 2500 },\n { id: 'p2', name: 'Mouse', priceCents: 1500 },\n];\nconst server = http.createServer(async (req, res) => {\n const url = new URL(req.url, 'http://localhost');\n const send = (code, body) => { res.writeHead(code, {'Content-Type':'application/json'}); res.end(JSON.stringify(body)); };\n if (req.method === 'POST' && url.pathname === '/api/session') {\n   // Deliberately public demo token, not a real authentication implementation.\n   req.resume(); return send(200, { token: 'local-practice-token' });\n }\n if (req.method !== 'GET') return send(405, {error:'METHOD_NOT_ALLOWED'});\n if (url.pathname === '/') { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); return res.end(html); }\n if (url.pathname === '/health') return send(200, {status:'ok'});\n if (url.pathname === '/api/profile') {\n   return req.headers.authorization === 'Bearer local-practice-token'\n     ? send(200,{name:'Demo learner'}) : send(401,{error:'UNAUTHORIZED'});\n }\n if (url.pathname === '/api/products') {\n   const delay = Number(url.searchParams.get('delayMs') ?? 0);\n   if (!Number.isInteger(delay) || delay < 0 || delay > 200) return send(400,{error:'INVALID_DELAY'});\n   await new Promise(resolve => setTimeout(resolve,delay));\n   return send(200,{items:products});\n }\n if (url.pathname.startsWith('/api/products/')) {\n   const item = products.find(p => p.id === url.pathname.split('/').pop());\n   return item ? send(200,item) : send(404,{error:'NOT_FOUND'});\n }\n return send(404,{error:'NOT_FOUND'});\n});\nserver.listen(4180,process.env.APP_HOST ?? '127.0.0.1',()=>console.log('Quality Lab: http://127.0.0.1:4180'));\nprocess.once('SIGTERM',()=>server.close());\nprocess.once('SIGINT',()=>server.close());",
            "command": "node server.mjs",
            "expected": "The page and controlled endpoints run locally on port 4180.",
            "explanation": "The server has no database and no real authentication. Artificial delay demonstrates measurement, not production capacity."
          }
        }
      ],
      "mistakes": [
        "Using a clickable div instead of a button.",
        "Adding ARIA labels that contradict visible wording."
      ],
      "exercise": {
        "title": "Practice: Semantic HTML, Accessible Names, and Landmarks",
        "tasks": [
          "Inspect headings, landmarks, and button names.",
          "Start the practice app and identify each interactive control."
        ],
        "solution": {
          "title": "Expected semantic inventory",
          "filename": "Expected semantic inventory",
          "code": "Title: Quality Lab — Delivery preferences\nMain heading: Delivery preferences\nPrimary navigation, main, footer\nTextbox: Customer name (required)\nButtons: Save preferences, Delivery help\nDialog name: Delivery help",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "Each control has a meaningful role and name.",
          "explanation": "Inspect browser accessibility tools and also verify the experience with a real screen reader."
        }
      },
      "takeaway": "Inspect the structure exposed to assistive technologies."
    }
  },
  {
    "number": 4,
    "slug": "keyboard-and-focus",
    "title": "Keyboard Navigation, Focus, and Skip Links",
    "description": "Verify that a user can complete the workflow without a pointer.",
    "group": "Accessibility",
    "content": {
      "introduction": "Verify that a user can complete the workflow without a pointer.",
      "objectives": [
        "Complete the form with keyboard only.",
        "Check the skip link and reverse navigation."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Use Tab and Shift+Tab to follow interactive elements. Activate controls using their normal keyboard behavior and inspect a visible focus indicator.",
            "The skip link should move navigation past repeated content. Test where focus actually moves, not just whether the URL fragment changes.",
            "Native controls provide a strong starting point, but focus order and visibility depend on the whole page. Check sticky headers or overlays that could cover focused content.",
            "Browser and OS keyboard settings can affect which elements receive Tab focus. Record those settings when reproducing an issue."
          ]
        },
        {
          "title": "Example 1: Keyboard-only walkthrough",
          "paragraphs": [],
          "example": {
            "title": "Keyboard-only walkthrough",
            "filename": "Keyboard-only walkthrough",
            "code": "Reload the page.\nTab to the skip link and activate it.\nContinue to the customer field and buttons.\nSubmit an empty form and inspect focus.\nOpen and close help, then continue navigating.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "Focus remains visible and the task is possible without a mouse.",
            "explanation": "Avoid clicking controls during a keyboard-only verification pass."
          }
        }
      ],
      "mistakes": [
        "Removing outlines without an equivalent indicator.",
        "Testing only forward Tab order."
      ],
      "exercise": {
        "title": "Practice: Keyboard Navigation, Focus, and Skip Links",
        "tasks": [
          "Complete the form with keyboard only.",
          "Check the skip link and reverse navigation."
        ],
        "solution": {
          "title": "Failure evidence",
          "filename": "Failure evidence",
          "code": "Record the control, preceding key sequence, expected focus, actual focus, and task impact.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "A developer can reproduce the exact lost-focus or trapped-focus sequence.",
          "explanation": "A screenshot alone may not explain the keyboard sequence."
        }
      },
      "takeaway": "Verify that a user can complete the workflow without a pointer."
    }
  },
  {
    "number": 5,
    "slug": "forms-and-errors",
    "title": "Labels, Instructions, Validation, and Status Messages",
    "description": "Make form errors discoverable and successful outcomes understandable.",
    "group": "Accessibility",
    "content": {
      "introduction": "Make form errors discoverable and successful outcomes understandable.",
      "objectives": [
        "Verify invalid and successful submissions.",
        "Explain label versus description."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "A placeholder is not a persistent label. Inspect programmatic label association, required-state information, instructions, and error relationships.",
            "After an invalid submission, the field should expose its invalid state and explain how to correct it. Focus movement and announcements should support recovery without unnecessary repetition.",
            "A success status can be announced without moving focus. Verify actual screen-reader behavior; the presence of aria-live is not proof of a useful announcement.",
            "The practice form validates a fictional name. It uses aria-describedby for the error and focuses the invalid field."
          ]
        },
        {
          "title": "Example 1: Form state checks",
          "paragraphs": [],
          "example": {
            "title": "Form state checks",
            "filename": "Form state checks",
            "code": "Submit empty → field focused, aria-invalid true, useful error.\nEnter a name → submit → error cleared, invalid state removed, success status.\nRepeat the task using a screen reader.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "Both error recovery and success are understandable.",
            "explanation": "Check labels and messages in context rather than only checking attribute existence."
          }
        }
      ],
      "mistakes": [
        "Replacing labels with placeholders.",
        "Using color as the only error signal."
      ],
      "exercise": {
        "title": "Practice: Labels, Instructions, Validation, and Status Messages",
        "tasks": [
          "Verify invalid and successful submissions.",
          "Explain label versus description."
        ],
        "solution": {
          "title": "Expected relationships",
          "filename": "Expected relationships",
          "code": "label[for=customer] identifies input#customer.\naria-describedby references hint and error.\nSave status is separate from the field error.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The relationships reflect the intended experience.",
          "explanation": "An automation assertion can verify relationships; a manual pass checks announcement quality."
        }
      },
      "takeaway": "Make form errors discoverable and successful outcomes understandable."
    }
  },
  {
    "number": 6,
    "slug": "dialogs-and-dynamic-ui",
    "title": "Dialogs, Dynamic Content, and Focus Restoration",
    "description": "Test the full lifecycle of a modal interaction.",
    "group": "Accessibility",
    "content": {
      "introduction": "Test the full lifecycle of a modal interaction.",
      "objectives": [
        "Check both closing paths.",
        "Verify focus restoration and background blocking."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "A modal should move focus inside when opened, keep interaction within its active content, allow an appropriate close action, and restore focus to a logical place afterward.",
            "The native dialog showModal method establishes modal behavior, but naming, initial focus, and task context still need testing.",
            "Check Escape, the close button, reverse navigation, and background interaction. Do not infer a modal from visual shading alone.",
            "For complex widgets, follow a documented interaction pattern. Adding role=dialog to a div does not implement focus management."
          ]
        },
        {
          "title": "Example 1: Modal scenario",
          "paragraphs": [],
          "example": {
            "title": "Modal scenario",
            "filename": "Modal scenario",
            "code": "Focus Delivery help → activate.\nConfirm dialog name and close button.\nTry Tab and Shift+Tab within dialog.\nPress Escape → confirm focus returns to Delivery help.\nRepeat using Close help.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The modal lifecycle preserves task continuity.",
            "explanation": "The practice dialog has only one interactive control; test richer dialogs separately when they have more controls."
          }
        }
      ],
      "mistakes": [
        "Scanning only the closed state.",
        "Losing focus after removing a dialog."
      ],
      "exercise": {
        "title": "Practice: Dialogs, Dynamic Content, and Focus Restoration",
        "tasks": [
          "Check both closing paths.",
          "Verify focus restoration and background blocking."
        ],
        "solution": {
          "title": "Expected focus sequence",
          "filename": "Expected focus sequence",
          "code": "Opener → Close help inside dialog → opener after close.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "No focus disappears into the document body or an inactive control.",
          "explanation": "A result from one browser/assistive-technology combination is not universal coverage."
        }
      },
      "takeaway": "Test the full lifecycle of a modal interaction."
    }
  },
  {
    "number": 7,
    "slug": "contrast-zoom-and-motion",
    "title": "Contrast, Zoom, Reflow, Targets, and Motion",
    "description": "Evaluate visual usability across enlarged and reduced-motion presentations.",
    "group": "Accessibility",
    "content": {
      "introduction": "Evaluate visual usability across enlarged and reduced-motion presentations.",
      "objectives": [
        "Measure contrast rather than guessing.",
        "Record reflow results for initial and dialog states."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Normal text generally needs at least 4.5:1 contrast at AA; qualifying large text needs 3:1. Evaluate the actual foreground/background combination and the criterion exceptions.",
            "Test text resizing and reflow. For ordinary vertically scrolling content, evaluate a width equivalent to 320 CSS pixels; some inherently two-dimensional content has exceptions.",
            "Target sizing and spacing should be assessed against the chosen criterion, not a blanket rule that every target must be 44 pixels. WCAG 2.2 AA minimum target sizing has a 24 CSS pixel criterion with defined exceptions.",
            "Honor reduced-motion preferences where relevant and check that essential content remains available. Also consider forced-colors settings and non-color cues."
          ]
        },
        {
          "title": "Example 1: Visual checks",
          "paragraphs": [],
          "example": {
            "title": "Visual checks",
            "filename": "Visual checks",
            "code": "Measure text and control contrast.\nZoom to 200% and inspect text.\nEvaluate narrow/reflow layout at 320 CSS pixels.\nOpen help and trigger validation at that width.\nEnable reduced motion and inspect functionality.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "No essential content or controls disappear at the tested settings.",
            "explanation": "A narrow viewport test is not a replacement for all real browser zoom behavior."
          }
        }
      ],
      "mistakes": [
        "Checking only the default desktop layout.",
        "Assuming a CSS preference rule proves reduced-motion usability."
      ],
      "exercise": {
        "title": "Practice: Contrast, Zoom, Reflow, Targets, and Motion",
        "tasks": [
          "Measure contrast rather than guessing.",
          "Record reflow results for initial and dialog states."
        ],
        "solution": {
          "title": "Result record",
          "filename": "Result record",
          "code": "Setting → page state → expected → observed → screenshot or measurements.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "Evidence names the actual setting and state.",
          "explanation": "Document criterion-specific exceptions rather than silently ignoring issues."
        }
      },
      "takeaway": "Evaluate visual usability across enlarged and reduced-motion presentations."
    }
  },
  {
    "number": 8,
    "slug": "screen-readers",
    "title": "Screen Reader Testing: NVDA, JAWS, and VoiceOver",
    "description": "Evaluate the spoken interaction rather than relying only on DOM inspection.",
    "group": "Accessibility",
    "content": {
      "introduction": "Evaluate the spoken interaction rather than relying only on DOM inspection.",
      "objectives": [
        "Complete a task using one supported combination.",
        "Record exact announcements and missing information."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Choose browser and assistive-technology combinations based on supported users. NVDA and JAWS are Windows tools; VoiceOver is built into macOS and iOS. On a Mac, use VoiceOver locally and arrange Windows coverage separately.",
            "Record OS, browser, screen-reader version, keyboard layout, and navigation mode. Shortcuts and mode behavior differ, so use the installed tool documentation rather than assuming one universal sequence.",
            "Navigate by headings and controls, read labels and descriptions, submit invalid data, and inspect the success announcement and dialog lifecycle.",
            "Browser automation can inspect roles and names, but it does not replace listening to announcements and evaluating task usability with the assistive technology."
          ]
        },
        {
          "title": "Example 1: Screen reader session",
          "paragraphs": [],
          "example": {
            "title": "Screen reader session",
            "filename": "Screen reader session",
            "code": "Read page title and heading structure.\nFind Customer name and hear required/hint information.\nSubmit empty and recover from the error.\nSave a fictional name and hear the result.\nOpen help and verify its name, contents, and return focus.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The task can be understood and completed with meaningful announcements.",
            "explanation": "Do not run two screen readers simultaneously during a controlled session."
          }
        }
      ],
      "mistakes": [
        "Calling accessibility tree inspection a screen-reader test.",
        "Assuming VoiceOver results establish NVDA/JAWS coverage."
      ],
      "exercise": {
        "title": "Practice: Screen Reader Testing: NVDA, JAWS, and VoiceOver",
        "tasks": [
          "Complete a task using one supported combination.",
          "Record exact announcements and missing information."
        ],
        "solution": {
          "title": "Assistive-technology evidence",
          "filename": "Assistive-technology evidence",
          "code": "Environment: exact OS/browser/reader versions\nMode: browse or focus context\nSteps: keys and navigation used\nActual announcement: observed wording\nImpact: what task became difficult or impossible",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The finding can be reproduced in the same environment.",
          "explanation": "Use an actual observed transcript; do not invent speech output from HTML."
        }
      },
      "takeaway": "Evaluate the spoken interaction rather than relying only on DOM inspection."
    }
  },
  {
    "number": 9,
    "slug": "axe-playwright",
    "title": "Automated Accessibility Scans with Playwright and axe-core",
    "description": "Scan meaningful UI states and retain inspectable findings.",
    "group": "Accessibility",
    "content": {
      "introduction": "Scan meaningful UI states and retain inspectable findings.",
      "objectives": [
        "Scan three page states.",
        "Inspect the attached JSON for violations and incomplete results."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Install @axe-core/playwright in the practice project and use AxeBuilder after the relevant state is ready.",
            "A scan analyzes the rendered state at that moment. Opening a modal, revealing validation, or changing content can expose additional issues.",
            "Retain rule identifiers, affected nodes, help information, and incomplete findings. Incomplete results need review rather than being counted as automatic passes.",
            "The example uses the installed axe defaults; it does not claim a complete WCAG 2.2 AA rule set or a conformance decision."
          ]
        },
        {
          "title": "Example 1: package.json",
          "paragraphs": [],
          "example": {
            "title": "package.json",
            "filename": "package.json",
            "code": "{\n  \"name\": \"sdet-non-functional-practice\",\n  \"private\": true,\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node server.mjs\",\n    \"typecheck\": \"tsc --noEmit\",\n    \"test:a11y\": \"playwright test\"\n  },\n  \"devDependencies\": {\n    \"@playwright/test\": \"1.64.1\",\n    \"@axe-core/playwright\": \"^4.11.0\",\n    \"@types/node\": \"^24.0.0\",\n    \"typescript\": \"^5.9.0\",\n    \"start-server-and-test\": \"^2.0.0\"\n  }\n}",
            "command": "npm install",
            "expected": "A lockfile records the installed test dependencies.",
            "explanation": "Save only in the separate practice project."
          }
        },
        {
          "title": "Example 2: playwright.config.ts",
          "paragraphs": [],
          "example": {
            "title": "playwright.config.ts",
            "filename": "playwright.config.ts",
            "code": "import { defineConfig } from '@playwright/test';\nexport default defineConfig({\n testDir: './tests', retries: 0, workers: 1,\n reporter: [['list'],['html',{open:'never'}]],\n use: {baseURL:'http://127.0.0.1:4180',trace:'retain-on-failure'},\n webServer: {command:'npm start',url:'http://127.0.0.1:4180/health',reuseExistingServer:false},\n});",
            "command": "npm install\nnpx playwright install chromium\nnpm run test:a11y",
            "expected": "Playwright starts and stops the local app.",
            "explanation": "Commit the generated lockfile. Do not run another copy on port 4180 during these tests."
          }
        },
        {
          "title": "Example 3: tests/axe.spec.ts",
          "paragraphs": [],
          "example": {
            "title": "tests/axe.spec.ts",
            "filename": "tests/axe.spec.ts",
            "code": "import { test, expect } from '@playwright/test';\nimport { AxeBuilder } from '@axe-core/playwright';\n\ntest('scan initial, validation, and dialog states', async ({ page }, testInfo) => {\n await page.goto('/');\n const scan = async (state: string) => {\n   const result = await new AxeBuilder({ page }).analyze();\n   await testInfo.attach('axe-' + state, {\n     body: JSON.stringify(result, null, 2), contentType: 'application/json',\n   });\n   expect(result.violations, 'axe violations in ' + state).toEqual([]);\n };\n await scan('initial');\n await page.getByRole('button', {name:'Save preferences'}).click();\n await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid','true');\n await scan('validation');\n await page.getByRole('button', {name:'Delivery help', exact:true}).click();\n await expect(page.getByRole('dialog')).toBeVisible();\n await scan('dialog');\n});",
            "command": "npm run test:a11y",
            "expected": "The selected page states have no violations detected by the configured axe version.",
            "explanation": "Inspect incomplete results and manual coverage separately; no automated tool covers every accessibility requirement."
          }
        }
      ],
      "mistakes": [
        "Scanning before dynamic content is ready.",
        "Treating zero violations as full compliance."
      ],
      "exercise": {
        "title": "Practice: Automated Accessibility Scans with Playwright and axe-core",
        "tasks": [
          "Scan three page states.",
          "Inspect the attached JSON for violations and incomplete results."
        ],
        "solution": {
          "title": "Triage an automated finding",
          "filename": "Triage an automated finding",
          "code": "Confirm the node and page state.\nReproduce manually.\nExplain user impact.\nFix the cause, rerun the scan, and retest the affected task.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The fix addresses a real barrier.",
          "explanation": "Do not exclude a whole page to make the scan green."
        }
      },
      "takeaway": "Scan meaningful UI states and retain inspectable findings."
    }
  },
  {
    "number": 10,
    "slug": "accessibility-regressions",
    "title": "Keyboard and Accessibility Regression Tests",
    "description": "Use interaction assertions alongside automated scans.",
    "group": "Accessibility",
    "content": {
      "introduction": "Use interaction assertions alongside automated scans.",
      "objectives": [
        "Run a keyboard path regression.",
        "Explain what a focus assertion does not cover."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Test focus, accessible names, state changes, and error recovery as product behavior. Choose assertions tied to user actions rather than internal implementation details alone.",
            "The keyboard walkthrough proves a particular path. Manually inspect visibility and obscuring because a focused element can still be difficult to see.",
            "A programmatic focus call can be useful to isolate a widget test, but does not prove the control is discoverable through normal keyboard navigation.",
            "Keep automated and manual evidence distinct. A role=status text assertion does not prove how every screen reader announces it."
          ]
        },
        {
          "title": "Example 1: tests/interactions.spec.ts",
          "paragraphs": [],
          "example": {
            "title": "tests/interactions.spec.ts",
            "filename": "tests/interactions.spec.ts",
            "code": "import { test, expect } from '@playwright/test';\n\ntest('keyboard error recovery and save status', async ({ page }) => {\n await page.goto('/');\n await page.keyboard.press('Tab');\n await expect(page.getByRole('link',{name:'Skip to main content'})).toBeFocused();\n await page.keyboard.press('Enter');\n await expect(page.locator('#main')).toBeFocused();\n await page.keyboard.press('Tab');\n const name = page.getByRole('textbox',{name:'Customer name (required)'});\n await expect(name).toBeFocused();\n await page.keyboard.press('Tab');\n await page.keyboard.press('Enter');\n await expect(name).toBeFocused();\n await expect(name).toHaveAttribute('aria-invalid','true');\n await expect(page.locator('#name-error')).toHaveText('Enter a customer name.');\n await page.keyboard.type('Demo learner');\n await page.keyboard.press('Tab');\n await page.keyboard.press('Enter');\n await expect(page.getByRole('status')).toHaveText('Preferences saved.');\n});\n\ntest('help dialog returns focus', async ({ page }) => {\n await page.goto('/');\n const opener = page.getByRole('button',{name:'Delivery help',exact:true});\n await opener.focus();\n await page.keyboard.press('Enter');\n const close = page.getByRole('button',{name:'Close help'});\n await expect(close).toBeFocused();\n await page.keyboard.press('Tab');\n await expect(close).toBeFocused();\n await page.keyboard.press('Escape');\n await expect(page.getByRole('dialog')).not.toBeVisible();\n await expect(opener).toBeFocused();\n});",
            "command": "npm run test:a11y",
            "expected": "The declared focus and status behaviors pass.",
            "explanation": "The second test sets initial focus directly to isolate the widget lifecycle; the first checks keyboard discovery from the page start."
          }
        }
      ],
      "mistakes": [
        "Clicking through a test described as keyboard-only.",
        "Using focus assertions as proof of visible focus."
      ],
      "exercise": {
        "title": "Practice: Keyboard and Accessibility Regression Tests",
        "tasks": [
          "Run a keyboard path regression.",
          "Explain what a focus assertion does not cover."
        ],
        "solution": {
          "title": "Regression scope",
          "filename": "Regression scope",
          "code": "Automated: focus target, error text, state removal, status text.\nManual: visible focus, spoken announcements, zoom, task clarity.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The evidence is complementary.",
          "explanation": "Avoid presenting a DOM assertion as a complete assistive-technology test."
        }
      },
      "takeaway": "Use interaction assertions alongside automated scans."
    }
  },
  {
    "number": 11,
    "slug": "accessibility-defects-ci",
    "title": "Accessibility Defects, Prioritization, and CI",
    "description": "Report barriers with reproducible evidence and an explicit scope.",
    "group": "Accessibility",
    "content": {
      "introduction": "Report barriers with reproducible evidence and an explicit scope.",
      "objectives": [
        "Write a reproducible accessibility finding.",
        "Separate scanner severity from task impact."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Describe the affected user task, environment, steps, expected behavior, actual behavior, and relevant criterion where verified.",
            "Prioritize by impact, reach, frequency, and available workarounds. Scanner severity is useful input but is not the entire product risk decision.",
            "Exceptions to an automated rule need an owner, rationale, narrowly scoped selector, and expiry or review date. Do not globally disable rules to hide a backlog.",
            "CI can block new detected violations and behavior regressions. Scheduled manual assessments and user testing still have a separate role."
          ]
        },
        {
          "title": "Example 1: Example defect template",
          "paragraphs": [],
          "example": {
            "title": "Example defect template",
            "filename": "Example defect template",
            "code": "Title: Help dialog closes without returning keyboard focus\nEnvironment: exact browser/OS/build\nSteps: open help with keyboard, close with Escape\nActual: record observed focus destination\nExpected: logical focus returns to opener\nImpact: user loses position in the task\nEvidence: video, DOM focus observation, verified criterion",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The report is actionable without assuming an unobserved failure exists.",
            "explanation": "This is a template; the supplied app explicitly restores focus."
          }
        }
      ],
      "mistakes": [
        "Filing scanner output without context.",
        "Equating one passed test with full-site conformance."
      ],
      "exercise": {
        "title": "Practice: Accessibility Defects, Prioritization, and CI",
        "tasks": [
          "Write a reproducible accessibility finding.",
          "Separate scanner severity from task impact."
        ],
        "solution": {
          "title": "Retest record",
          "filename": "Retest record",
          "code": "Original reproduction passes after fix.\nRelated keyboard and screen-reader flows checked.\nRelevant automated check added.\nScope limitations retained.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The fix is verified beyond a screenshot.",
          "explanation": "Do not close a finding only because an attribute changed."
        }
      },
      "takeaway": "Report barriers with reproducible evidence and an explicit scope."
    }
  },
  {
    "number": 12,
    "slug": "accessibility-project",
    "title": "Accessibility Assessment Project",
    "description": "Combine manual evaluation and automated evidence for a small complete task.",
    "group": "Accessibility",
    "content": {
      "introduction": "Combine manual evaluation and automated evidence for a small complete task.",
      "objectives": [
        "Produce a scoped accessibility report.",
        "Run and inspect both automated suites.",
        "Record manual coverage honestly."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Assess initial, invalid, successful, dialog-open, and dialog-closed states of the practice page.",
            "Run the axe and interaction tests, then manually verify keyboard visibility, zoom/reflow, contrast, and at least one real screen-reader combination.",
            "On this Mac, VoiceOver can support local practice. Record Windows NVDA/JAWS coverage as not tested until it actually occurs.",
            "The delivered result is a scoped assessment with unresolved items and limitations, not a blanket accessibility certificate."
          ]
        },
        {
          "title": "Example 1: Assessment deliverable",
          "paragraphs": [],
          "example": {
            "title": "Assessment deliverable",
            "filename": "Assessment deliverable",
            "code": "Scope and environment\nState coverage matrix\nAutomated report and tool versions\nManual task notes and screen-reader observations\nConfirmed findings and retests\nNot-tested areas and next actions",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "Another tester can repeat the same scope.",
            "explanation": "Keep actual observations separate from planned checks."
          }
        }
      ],
      "mistakes": [
        "Skipping manual work after automation passes.",
        "Reporting planned screen-reader combinations as tested."
      ],
      "exercise": {
        "title": "Practice: Accessibility Assessment Project",
        "tasks": [
          "Produce a scoped accessibility report.",
          "Run and inspect both automated suites.",
          "Record manual coverage honestly."
        ],
        "solution": {
          "title": "Completion checklist",
          "filename": "Completion checklist",
          "code": "All selected states visited.\nAutomated failures investigated.\nManual results recorded.\nOpen barriers assigned.\nNo unsupported conformance claim.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The assessment communicates evidence and remaining uncertainty.",
          "explanation": "A small complete task is better than an unexplained scanner score."
        }
      },
      "takeaway": "Combine manual evaluation and automated evidence for a small complete task."
    }
  },
  {
    "number": 13,
    "slug": "performance-foundations",
    "title": "Performance Requirements and Test Boundaries",
    "description": "Define workload and service objectives before measuring latency.",
    "group": "Performance",
    "content": {
      "introduction": "Define workload and service objectives before measuring latency.",
      "objectives": [
        "Write an explicit performance charter.",
        "Separate HTTP and browser measurements."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Latency, error rate, throughput, and resource use describe different aspects of behavior. A service can respond quickly while returning incorrect data.",
            "Identify target operations, traffic mix, expected arrival pattern, data volume, environment, duration, and acceptance criteria before execution.",
            "A browser journey includes rendering and interaction work; an HTTP test exercises protocol-level requests. One does not stand in for the other.",
            "The local lab is useful for learning instrumentation and failure gates. It cannot establish the capacity of a deployed production system."
          ]
        },
        {
          "title": "Example 1: Performance test charter",
          "paragraphs": [],
          "example": {
            "title": "Performance test charter",
            "filename": "Performance test charter",
            "code": "Operation: product browse\nTarget: local lab only\nModel: 3 iterations/second, 1 request each\nDuration: 20 seconds for teaching\nCorrectness: seeded product present\nBudget: illustrative p95 < 500 ms, errors < 1%, no dropped iterations\nEvidence: script, environment, summary, logs",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The test has an interpretable scope.",
            "explanation": "Real targets must come from requirements, traffic evidence, and controlled baselines."
          }
        }
      ],
      "mistakes": [
        "Choosing a universal latency target without context.",
        "Calling a local toy service production-ready."
      ],
      "exercise": {
        "title": "Practice: Performance Requirements and Test Boundaries",
        "tasks": [
          "Write an explicit performance charter.",
          "Separate HTTP and browser measurements."
        ],
        "solution": {
          "title": "Before comparing results",
          "filename": "Before comparing results",
          "code": "Record build, hardware, OS, tool version, workload, dataset, warm-up, network path, and competing processes.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "Comparisons use compatible conditions.",
          "explanation": "Different environments can dominate the observed difference."
        }
      },
      "takeaway": "Define workload and service objectives before measuring latency."
    }
  },
  {
    "number": 14,
    "slug": "performance-test-types",
    "title": "Smoke, Load, Stress, Spike, Soak, and Capacity Tests",
    "description": "Choose a workload shape that answers a specific question.",
    "group": "Performance",
    "content": {
      "introduction": "Choose a workload shape that answers a specific question.",
      "objectives": [
        "Map a performance question to a test type.",
        "Define stop and recovery conditions."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "A performance smoke test checks the script and basic response at tiny load. Load testing evaluates expected traffic. Stress testing explores behavior beyond normal expectations.",
            "Spike tests change arrival rate sharply. Soak tests sustain a workload long enough to investigate time-dependent degradation. Capacity tests locate a sustainable operating point under stated constraints.",
            "The names do not define exact numbers. Agree on limits, duration, stop conditions, monitoring, and recovery before running heavier tests.",
            "This course executes only modest local workloads. Longer and higher-volume profiles require an appropriate isolated environment and authorization."
          ]
        },
        {
          "title": "Example 1: Select the right test",
          "paragraphs": [],
          "example": {
            "title": "Select the right test",
            "filename": "Select the right test",
            "code": "New script → smoke\nExpected business traffic → load\nSudden campaign traffic → spike\nSuspected resource leak → soak with monitoring\nFind a sustainable limit → controlled capacity investigation",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The test shape follows the question.",
            "explanation": "A 20-second demo is not meaningful leak-detection coverage."
          }
        }
      ],
      "mistakes": [
        "Calling every run a load test.",
        "Increasing load without monitoring or boundaries."
      ],
      "exercise": {
        "title": "Practice: Smoke, Load, Stress, Spike, Soak, and Capacity Tests",
        "tasks": [
          "Map a performance question to a test type.",
          "Define stop and recovery conditions."
        ],
        "solution": {
          "title": "Stop conditions",
          "filename": "Stop conditions",
          "code": "Unexpected error rate, resource exhaustion, data corruption risk, external dependency overload, or test-generator saturation.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The run can stop before uncontrolled impact.",
          "explanation": "Stopping early is an observed outcome to report, not a passing result."
        }
      },
      "takeaway": "Choose a workload shape that answers a specific question."
    }
  },
  {
    "number": 15,
    "slug": "k6-setup",
    "title": "k6 Setup and First Local Test",
    "description": "Run k6 as its own runtime against the controlled practice API.",
    "group": "Performance",
    "content": {
      "introduction": "Run k6 as its own runtime against the controlled practice API.",
      "objectives": [
        "Run the smoke script.",
        "Inspect its resolved options and nonzero failure behavior."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "k6 is not Node.js. Scripts import k6 modules and use its execution model; ordinary Node APIs and arbitrary npm packages are not automatically available.",
            "Install k6 using its official platform instructions and record k6 version. The included Docker example pins version 2.3.0.",
            "Start node server.mjs in a separate terminal. Create results before using the supplied summary writer. Run k6 inspect to inspect script configuration before execution.",
            "The practice project package.json installs browser-testing dependencies, not the k6 executable."
          ]
        },
        {
          "title": "Example 1: k6/helpers.js",
          "paragraphs": [],
          "example": {
            "title": "k6/helpers.js",
            "filename": "k6/helpers.js",
            "code": "import http from 'k6/http';\nimport { check } from 'k6';\nexport const baseUrl = __ENV.BASE_URL || 'http://127.0.0.1:4180';\n// These supplied exercises intentionally target the local lab only.\nif (!/^http:\\/\\/(127\\.0\\.0\\.1|localhost|app):4180$/.test(baseUrl)) {\n throw new Error('Use the local practice app on port 4180');\n}\nexport function productRequest(delayMs = 0) {\n const res = http.get(baseUrl + '/api/products?delayMs=' + delayMs,\n   {timeout:'5s',tags:{name:'GET products'}});\n let body;\n try { body = res.json(); } catch { body = null; }\n check(res, {\n   'products status 200': r => r.status === 200,\n   'expected product present': () => Array.isArray(body?.items) &&\n     body.items.some(p => p.id === 'p1' && p.priceCents === 2500),\n });\n return res;\n}\nexport function summary(data) {\n return { 'results/summary.json': JSON.stringify(data,null,2) };\n}",
            "command": "Imported by the supplied k6 scripts.",
            "expected": "Requests validate both transport and a known business value.",
            "explanation": "The host guard keeps this package scoped to its local practice app; change targets only as part of an authorized test plan."
          }
        },
        {
          "title": "Example 2: k6/smoke.js",
          "paragraphs": [],
          "example": {
            "title": "k6/smoke.js",
            "filename": "k6/smoke.js",
            "code": "import { productRequest, summary } from './helpers.js';\nexport const options = {\n vus: 1, iterations: 5,\n thresholds: { checks:['rate==1'], http_req_failed:['rate==0'], http_req_duration:['p(95)<500'] },\n};\nexport default function () { productRequest(); }\nexport const handleSummary = summary;",
            "command": "mkdir -p results\nk6 run k6/smoke.js",
            "expected": "Five local requests pass functional checks and the illustrative smoke thresholds.",
            "explanation": "Five samples cannot establish stable production tail latency or capacity."
          }
        }
      ],
      "mistakes": [
        "Running k6 code with node.",
        "Testing an external site instead of the local lab."
      ],
      "exercise": {
        "title": "Practice: k6 Setup and First Local Test",
        "tasks": [
          "Run the smoke script.",
          "Inspect its resolved options and nonzero failure behavior."
        ],
        "solution": {
          "title": "Local commands",
          "filename": "Local commands",
          "code": "k6 version\nk6 inspect k6/smoke.js\nmkdir -p results\nk6 run k6/smoke.js",
          "command": "Run while the local server is listening on port 4180.",
          "expected": "The script performs five iterations and writes results/summary.json.",
          "explanation": "Use separate output directories or archive summaries before later runs overwrite them."
        }
      },
      "takeaway": "Run k6 as its own runtime against the controlled practice API."
    }
  },
  {
    "number": 16,
    "slug": "checks-metrics-thresholds",
    "title": "Checks, Metrics, and Thresholds",
    "description": "Turn observed correctness and timing into explicit pass/fail rules.",
    "group": "Performance",
    "content": {
      "introduction": "Turn observed correctness and timing into explicit pass/fail rules.",
      "objectives": [
        "Explain checks versus thresholds.",
        "Identify a business failure with HTTP 200."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "A check records whether a condition passed. Failed checks alone do not necessarily make the k6 process exit unsuccessfully; attach a threshold to the checks metric when failures must gate the run.",
            "http_req_failed describes request failure classification, while a status-200 response with the wrong product can still fail a custom check.",
            "Thresholds evaluate metrics and cause a nonzero exit when they fail. Keep correctness and timing thresholds distinct.",
            "Trend, Rate, Counter, and Gauge metrics serve different purposes. Select an aggregation that reflects the requirement rather than averaging everything."
          ]
        },
        {
          "title": "Example 1: Core smoke thresholds",
          "paragraphs": [],
          "example": {
            "title": "Core smoke thresholds",
            "filename": "Core smoke thresholds",
            "code": "thresholds: {\n  checks: ['rate==1'],\n  http_req_failed: ['rate==0'],\n  http_req_duration: ['p(95)<500'],\n}",
            "command": "This is the thresholds property inside an options object, not a standalone script.",
            "expected": "Any failed functional check fails this small deterministic smoke run.",
            "explanation": "Production error budgets may differ; the lab uses exact correctness for known fixed data."
          }
        }
      ],
      "mistakes": [
        "Assuming all check failures fail CI automatically.",
        "Checking only status code."
      ],
      "exercise": {
        "title": "Practice: Checks, Metrics, and Thresholds",
        "tasks": [
          "Explain checks versus thresholds.",
          "Identify a business failure with HTTP 200."
        ],
        "solution": {
          "title": "Negative control",
          "filename": "Negative control",
          "code": "In a disposable script copy, change the expected product price.\nRun the script.\nConfirm checks fail and the process exits nonzero.\nRestore the assertion.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The gate proves it can detect an incorrect result.",
          "explanation": "Do not weaken the assertion to accommodate a real defect."
        }
      },
      "takeaway": "Turn observed correctness and timing into explicit pass/fail rules."
    }
  },
  {
    "number": 17,
    "slug": "workload-models",
    "title": "Virtual Users, Arrival Rates, and Dropped Iterations",
    "description": "Choose a model that represents how traffic reaches the service.",
    "group": "Performance",
    "content": {
      "introduction": "Choose a model that represents how traffic reaches the service.",
      "objectives": [
        "Explain open versus closed workload models.",
        "Inspect achieved iterations and dropped iterations."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "A closed model starts another iteration when a virtual user finishes its previous iteration. As responses slow, achieved arrival rate can drop.",
            "An arrival-rate executor schedules iteration starts independently of completion, subject to available VUs and execution limits.",
            "Iterations per second are not requests per second when an iteration sends several requests. Sleep and think time have different roles in closed and open models.",
            "Dropped iterations indicate scheduled work was not started. Investigate insufficient VUs, slower responses, and generator resource limits instead of silently ignoring the missing traffic."
          ]
        },
        {
          "title": "Example 1: k6/load.js",
          "paragraphs": [],
          "example": {
            "title": "k6/load.js",
            "filename": "k6/load.js",
            "code": "import { productRequest, summary } from './helpers.js';\nexport const options = {\n scenarios: { browse: { executor:'constant-arrival-rate', rate:3, timeUnit:'1s', duration:'20s', preAllocatedVUs:5, maxVUs:10 } },\n thresholds: { checks:['rate==1'], http_req_failed:['rate<0.01'], 'http_req_duration{name:GET products}':['p(95)<500'], dropped_iterations:['count==0'] },\n};\nexport default function () { productRequest(20); }\nexport const handleSummary = summary;",
            "command": "mkdir -p results\nk6 run k6/load.js",
            "expected": "The lab schedules three iterations per second for twenty seconds, with one request per iteration.",
            "explanation": "The 20 ms artificial delay is not a realistic production bottleneck. The workload is intentionally small."
          }
        }
      ],
      "mistakes": [
        "Equating VUs with requests per second.",
        "Adding arbitrary sleep to an arrival-rate workload."
      ],
      "exercise": {
        "title": "Practice: Virtual Users, Arrival Rates, and Dropped Iterations",
        "tasks": [
          "Explain open versus closed workload models.",
          "Inspect achieved iterations and dropped iterations."
        ],
        "solution": {
          "title": "Workload sanity check",
          "filename": "Workload sanity check",
          "code": "Configured rate: 3 iterations/s\nRequests per iteration: 1\nDuration: 20s\nExpected scheduled work: about 60 iterations\nCompare completed, interrupted, and dropped counts.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The report states actual achieved work.",
          "explanation": "Do not call a lower achieved rate the requested load without explaining the shortfall."
        }
      },
      "takeaway": "Choose a model that represents how traffic reaches the service."
    }
  },
  {
    "number": 18,
    "slug": "data-and-authentication",
    "title": "Test Data, Correlation, and Authentication Under Load",
    "description": "Keep request data valid and distinguish shared setup from per-user behavior.",
    "group": "Performance",
    "content": {
      "introduction": "Keep request data valid and distinguish shared setup from per-user behavior.",
      "objectives": [
        "Run the data-driven demo.",
        "Explain why a shared demo token is not a real multi-user login model."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Parameterize data and correlate server-issued values. Reusing one account can distort contention, cache behavior, and permission coverage.",
            "SharedArray helps share immutable fixture data in a k6 process. Each VU still has its own execution state; it is not a global mutable coordination mechanism.",
            "setup runs before VU execution and can return serializable initialization data. One shared token is suitable only when the test model calls for it.",
            "For real identity providers, model token expiry and acquisition cost intentionally. Do not log secrets or overload a third-party authentication service accidentally."
          ]
        },
        {
          "title": "Example 1: k6/products.json",
          "paragraphs": [],
          "example": {
            "title": "k6/products.json",
            "filename": "k6/products.json",
            "code": "[{\"id\":\"p1\"},{\"id\":\"p2\"}]",
            "command": "Read by k6/data-auth.js.",
            "expected": "The fixture contains two valid product IDs.",
            "explanation": "The file path is relative to the importing script."
          }
        },
        {
          "title": "Example 2: k6/data-auth.js",
          "paragraphs": [],
          "example": {
            "title": "k6/data-auth.js",
            "filename": "k6/data-auth.js",
            "code": "import http from 'k6/http';\nimport { check } from 'k6';\nimport { SharedArray } from 'k6/data';\nimport { baseUrl, summary } from './helpers.js';\nconst products = new SharedArray('product ids', () => JSON.parse(open('./products.json')));\nexport const options = { vus:1, iterations:4, thresholds:{checks:['rate==1'],http_req_failed:['rate==0']} };\nexport function setup() {\n const res = http.post(baseUrl + '/api/session', null, {timeout:'5s'});\n if (res.status !== 200) throw new Error('Demo session setup failed');\n const token = res.json('token');\n if (typeof token !== 'string') throw new Error('Missing token');\n return { token };\n}\nexport default function(data) {\n const item = products[__ITER % products.length];\n const res = http.get(baseUrl + '/api/products/' + item.id, {tags:{name:'GET product by id'},timeout:'5s'});\n check(res, {'product found':r => r.status === 200});\n const profile = http.get(baseUrl + '/api/profile', {headers:{Authorization:'Bearer '+data.token},timeout:'5s'});\n check(profile, {'profile allowed':r => r.status === 200});\n}\nexport const handleSummary = summary;",
            "command": "k6 run k6/data-auth.js",
            "expected": "Four iterations read products and an authenticated demo profile.",
            "explanation": "The server issues a public fixed demo token. This does not test real password authentication, OAuth, expiry, or per-user isolation."
          }
        }
      ],
      "mistakes": [
        "Hard-coding production secrets.",
        "Using unique URLs as high-cardinality metric tags."
      ],
      "exercise": {
        "title": "Practice: Test Data, Correlation, and Authentication Under Load",
        "tasks": [
          "Run the data-driven demo.",
          "Explain why a shared demo token is not a real multi-user login model."
        ],
        "solution": {
          "title": "Real-service data plan",
          "filename": "Real-service data plan",
          "code": "Identify account ownership, token lifetime, data uniqueness, cleanup, correlation IDs, and rate limits.\nSeparate login traffic from browse traffic if they have different requirements.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The plan reflects the intended user population.",
          "explanation": "Do not substitute a single shared account without documenting the effect."
        }
      },
      "takeaway": "Keep request data valid and distinguish shared setup from per-user behavior."
    }
  },
  {
    "number": 19,
    "slug": "latency-and-budgets",
    "title": "Percentiles, Error Budgets, and Performance Gates",
    "description": "Interpret distribution-based targets with enough context to avoid false confidence.",
    "group": "Performance",
    "content": {
      "introduction": "Interpret distribution-based targets with enough context to avoid false confidence.",
      "objectives": [
        "Explain why averages hide tails.",
        "Define a latency and error gate for a stated workload."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "The median describes the middle; p95 and p99 describe tails of the observed sample. An average can hide a slow subset.",
            "Small sample sizes produce unstable tail estimates. A five-request smoke run should not be used to claim reliable p99 performance.",
            "An error-rate budget and a latency budget answer different questions. Decide whether failed requests are included and how metric tags scope each threshold.",
            "The course thresholds are teaching values, not universal SLOs. Establish realistic gates from requirements and repeatable baselines."
          ]
        },
        {
          "title": "Example 1: Endpoint-specific threshold",
          "paragraphs": [],
          "example": {
            "title": "Endpoint-specific threshold",
            "filename": "Endpoint-specific threshold",
            "code": "'http_req_duration{name:GET products}': ['p(95)<500'],\nhttp_req_failed: ['rate<0.01'],\ndropped_iterations: ['count==0']",
            "command": "These entries belong inside options.thresholds in the load script.",
            "expected": "The product latency gate is scoped to its stable request-name tag.",
            "explanation": "A metric filter must match the actual emitted tag; a missing population can invalidate interpretation."
          }
        }
      ],
      "mistakes": [
        "Claiming stable p99 from a handful of requests.",
        "Changing thresholds only to make a regression pass."
      ],
      "exercise": {
        "title": "Practice: Percentiles, Error Budgets, and Performance Gates",
        "tasks": [
          "Explain why averages hide tails.",
          "Define a latency and error gate for a stated workload."
        ],
        "solution": {
          "title": "Threshold review",
          "filename": "Threshold review",
          "code": "Requirement source → metric → aggregation → population → duration/sample count → failure action.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "Every gate has a defensible meaning.",
          "explanation": "Separate an aspirational target from an observed baseline."
        }
      },
      "takeaway": "Interpret distribution-based targets with enough context to avoid false confidence."
    }
  },
  {
    "number": 20,
    "slug": "analysis-and-observability",
    "title": "Results, Bottlenecks, and Observability",
    "description": "Correlate client measurements with service and generator evidence.",
    "group": "Performance",
    "content": {
      "introduction": "Correlate client measurements with service and generator evidence.",
      "objectives": [
        "Explain a result using more than one metric.",
        "Distinguish synthetic delay from capacity behavior."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Inspect latency, errors, achieved throughput, and dropped work together. Then correlate the same time interval with server CPU, memory, connection pools, database behavior, and dependency errors.",
            "High client latency alone does not identify a database bottleneck. Queueing, networking, connection setup, rendering, or a saturated generator can contribute.",
            "The local practice server uses a synthetic asynchronous delay. It demonstrates timing measurement but is not a model of CPU saturation or realistic database contention.",
            "When using shared hosted CI runners, report variability and avoid strong capacity claims from one noisy run."
          ]
        },
        {
          "title": "Example 1: Investigation sequence",
          "paragraphs": [],
          "example": {
            "title": "Investigation sequence",
            "filename": "Investigation sequence",
            "code": "Validate workload achieved.\nCheck correctness and error classifications.\nInspect percentile distribution and time trend.\nCorrelate application logs and resource metrics.\nCheck generator saturation.\nChange one hypothesis at a time.",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The investigation identifies evidence for a cause.",
            "explanation": "Correlation is a starting point, not proof of causation."
          }
        }
      ],
      "mistakes": [
        "Blaming the database from one latency value.",
        "Ignoring the load generator resource limits."
      ],
      "exercise": {
        "title": "Practice: Results, Bottlenecks, and Observability",
        "tasks": [
          "Explain a result using more than one metric.",
          "Distinguish synthetic delay from capacity behavior."
        ],
        "solution": {
          "title": "Result summary",
          "filename": "Result summary",
          "code": "Run ID/build/environment\nWorkload configured and achieved\nLatency distribution and errors\nDropped/interrupted work\nSupporting resource observations\nLimitations and next experiment",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "A reviewer can judge the conclusion.",
          "explanation": "Do not invent CPU or database measurements that were not captured."
        }
      },
      "takeaway": "Correlate client measurements with service and generator evidence."
    }
  },
  {
    "number": 21,
    "slug": "browser-performance",
    "title": "Browser Performance and User Experience",
    "description": "Distinguish protocol timings from rendering and interaction experience.",
    "group": "Performance",
    "content": {
      "introduction": "Distinguish protocol timings from rendering and interaction experience.",
      "objectives": [
        "Explain what HTTP tests omit.",
        "Inspect a browser performance recording of a user action."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "HTTP response duration does not include the entire browser experience. Scripts, layout, rendering, images, and interaction handlers can add user-visible delay.",
            "Use browser performance tooling to investigate navigation, rendering, long tasks, and interactions. Field measurements describe actual user populations; laboratory runs describe controlled conditions.",
            "Core Web Vitals include LCP, INP, and CLS. Use appropriate instrumentation and population definitions; do not relabel a Playwright page.goto duration as one of those metrics.",
            "The diagnostic snippet below reads navigation timing only. It is not a Core Web Vitals collector or a performance acceptance test."
          ]
        },
        {
          "title": "Example 1: Navigation timing diagnostic — inside a Playwright test",
          "paragraphs": [],
          "example": {
            "title": "Navigation timing diagnostic — inside a Playwright test",
            "filename": "Navigation timing diagnostic — inside a Playwright test",
            "code": "await page.goto('/');\nconst navigation = await page.evaluate(() => {\n  const entry = performance.getEntriesByType('navigation')[0];\n  return entry ? entry.toJSON() : null;\n});\nconsole.log(navigation);",
            "command": "Use in a separate diagnostic test or browser developer tools.",
            "expected": "Navigation timing entries help investigate the page load.",
            "explanation": "Do not assert a fixed universal duration on a shared runner."
          }
        }
      ],
      "mistakes": [
        "Calling page.goto time LCP or INP.",
        "Comparing runs with different throttling settings."
      ],
      "exercise": {
        "title": "Practice: Browser Performance and User Experience",
        "tasks": [
          "Explain what HTTP tests omit.",
          "Inspect a browser performance recording of a user action."
        ],
        "solution": {
          "title": "Browser investigation",
          "filename": "Browser investigation",
          "code": "Record a navigation and Save preferences interaction.\nInspect network, scripting, layout, and rendering.\nCompare consistent device/network settings.\nState which user metric was actually measured.",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The report distinguishes observed timings from inferred user experience.",
          "explanation": "The tiny local page is not representative of a production application."
        }
      },
      "takeaway": "Distinguish protocol timings from rendering and interaction experience."
    }
  },
  {
    "number": 22,
    "slug": "non-functional-ci",
    "title": "Docker and CI for Accessibility and Performance",
    "description": "Run bounded automated checks while preserving their limits and evidence.",
    "group": "Performance",
    "content": {
      "introduction": "Run bounded automated checks while preserving their limits and evidence.",
      "objectives": [
        "Explain why PR checks use bounded smoke load.",
        "Preserve a failing run and its artifacts."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "The final practice workflow separates accessibility automation from a very small performance smoke check. It does not run a stress or soak test on every pull request.",
            "Use the generated npm lockfile for browser dependencies. The k6 container version is pinned separately because k6 is not an npm dependency.",
            "The Compose test reaches the app through service DNS; localhost inside k6 would refer to the k6 container. Its results directory is mounted for artifact collection.",
            "Passing this workflow proves only the configured automated assertions and budgets. Manual accessibility and representative performance evaluations remain separate."
          ]
        },
        {
          "title": "Example 1: Dockerfile",
          "paragraphs": [],
          "example": {
            "title": "Dockerfile",
            "filename": "Dockerfile",
            "code": "FROM node:24-bookworm-slim\nWORKDIR /app\nCOPY server.mjs index.html ./\nENV APP_HOST=0.0.0.0\nUSER node\nEXPOSE 4180\nCMD [\"node\", \"server.mjs\"]",
            "command": "docker compose up -d --build --wait app",
            "expected": "The dependency-free practice app runs in a container.",
            "explanation": "No browser or k6 dependency is installed in the app image."
          }
        },
        {
          "title": "Example 2: compose.yaml",
          "paragraphs": [],
          "example": {
            "title": "compose.yaml",
            "filename": "compose.yaml",
            "code": "services:\n  app:\n    build: .\n    ports: [\"127.0.0.1:4180:4180\"]\n    healthcheck:\n      test: [\"CMD\", \"node\", \"-e\", \"fetch('http://127.0.0.1:4180/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\"]\n      interval: 2s\n      timeout: 5s\n      retries: 15\n  k6:\n    image: grafana/k6:2.3.0\n    profiles: [tests]\n    working_dir: /work\n    environment:\n      BASE_URL: http://app:4180\n    volumes:\n      - ./k6:/work/k6:ro\n      - ./results:/work/results\n    depends_on:\n      app:\n        condition: service_healthy\n    command: [\"run\", \"k6/smoke.js\"]",
            "command": "mkdir -p results\ndocker compose up -d --build --wait app\ndocker compose run --rm --user \"$(id -u):$(id -g)\" k6",
            "expected": "The smoke script writes host-owned evidence.",
            "explanation": "Stop a native local server first so port 4180 is free."
          }
        },
        {
          "title": "Example 3: .github/workflows/non-functional.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/non-functional.yml",
            "filename": ".github/workflows/non-functional.yml",
            "code": "name: Non-functional checks\non:\n  push:\n    branches: [main]\n  pull_request:\n  workflow_dispatch:\npermissions:\n  contents: read\njobs:\n  accessibility:\n    runs-on: ubuntu-latest\n    timeout-minutes: 15\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n          cache: npm\n      - run: npm ci\n      - run: npm run typecheck\n      - run: npx playwright install --with-deps chromium\n      - run: npm run test:a11y\n      - uses: actions/upload-artifact@v7\n        if: ${{ !cancelled() }}\n        with:\n          name: accessibility-evidence\n          path: |\n            playwright-report/\n            test-results/\n          retention-days: 7\n          if-no-files-found: warn\n  performance-smoke:\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    env:\n      COMPOSE_PROJECT_NAME: nft-${{ github.run_id }}-${{ github.run_attempt }}\n    steps:\n      - uses: actions/checkout@v7\n      - run: mkdir -p results\n      - run: docker compose up -d --build --wait --wait-timeout 90 app\n      - name: Run bounded performance smoke\n        run: docker compose run --rm --user \"$(id -u):$(id -g)\" k6\n      - name: Capture app logs\n        if: ${{ !cancelled() }}\n        run: docker compose logs --no-color > results/app.log\n      - uses: actions/upload-artifact@v7\n        if: ${{ !cancelled() }}\n        with:\n          name: performance-smoke-evidence\n          path: results/\n          retention-days: 7\n      - name: Clean up disposable services\n        if: ${{ always() }}\n        run: docker compose down --remove-orphans",
            "command": "Commit the separate practice project and generated package-lock.json to your own GitHub repository.",
            "expected": "Two jobs execute their automated checks and retain evidence.",
            "explanation": "Do not copy this practice workflow or package.json into Learning Hub."
          }
        }
      ],
      "mistakes": [
        "Running uncontrolled load in every PR.",
        "Calling a smoke check a production performance certification."
      ],
      "exercise": {
        "title": "Practice: Docker and CI for Accessibility and Performance",
        "tasks": [
          "Explain why PR checks use bounded smoke load.",
          "Preserve a failing run and its artifacts."
        ],
        "solution": {
          "title": "Local cleanup",
          "filename": "Local cleanup",
          "code": "docker compose logs --no-color\ndocker compose down --remove-orphans",
          "command": "Run after collecting the desired evidence.",
          "expected": "Owned app and test resources are removed.",
          "explanation": "The workflow retains failure status; cleanup should not hide a failed threshold."
        }
      },
      "takeaway": "Run bounded automated checks while preserving their limits and evidence."
    }
  },
  {
    "number": 23,
    "slug": "baselines-and-regressions",
    "title": "Baselines, Regression Analysis, and Repeatability",
    "description": "Compare compatible runs and communicate uncertainty.",
    "group": "Performance",
    "content": {
      "introduction": "Compare compatible runs and communicate uncertainty.",
      "objectives": [
        "Compare runs under controlled conditions.",
        "Separate a measured difference from a causal claim."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Build a baseline from repeated runs under comparable conditions. Record warm-up, workload, data, environment, and tool versions.",
            "A slower run can reflect product change, cache state, background load, or generator variation. Investigate before assigning a cause.",
            "Compare percentile distributions and correctness alongside throughput. Do not average percentiles from different runs and call the result a pooled percentile.",
            "Keep raw summaries with unique names because the supplied handleSummary path is overwritten by the next run."
          ]
        },
        {
          "title": "Example 1: Archive two local runs",
          "paragraphs": [],
          "example": {
            "title": "Archive two local runs",
            "filename": "Archive two local runs",
            "code": "mkdir -p results\nk6 run k6/load.js\ncp results/summary.json results/baseline.json\n# After one deliberate, documented change:\nk6 run k6/load.js\ncp results/summary.json results/candidate.json",
            "command": "Run against the local app only, recording each change.",
            "expected": "Both summaries remain available.",
            "explanation": "A single before/after pair is exploratory evidence, not statistical proof."
          }
        }
      ],
      "mistakes": [
        "Averaging percentile values across runs.",
        "Changing several variables at once."
      ],
      "exercise": {
        "title": "Practice: Baselines, Regression Analysis, and Repeatability",
        "tasks": [
          "Compare runs under controlled conditions.",
          "Separate a measured difference from a causal claim."
        ],
        "solution": {
          "title": "Comparison report",
          "filename": "Comparison report",
          "code": "Same workload and sample count?\nSame environment and versions?\nCorrectness unchanged?\nLatency distribution changed?\nAchieved traffic and errors changed?\nRepeated observations support the conclusion?",
          "command": "Apply this checklist to the local practice application and record observed results.",
          "expected": "The report avoids overclaiming.",
          "explanation": "Do not discard unfavorable runs without a documented reason."
        }
      },
      "takeaway": "Compare compatible runs and communicate uncertainty."
    }
  },
  {
    "number": 24,
    "slug": "non-functional-project",
    "title": "Complete Non-Functional Quality Assessment",
    "description": "Combine scoped accessibility evidence and a defensible performance report.",
    "group": "Performance",
    "content": {
      "introduction": "Combine scoped accessibility evidence and a defensible performance report.",
      "objectives": [
        "Complete the selected manual accessibility checks.",
        "Run the three supplied k6 scripts.",
        "Produce one report with explicit limitations."
      ],
      "sections": [
        {
          "title": "Concepts and testing approach",
          "paragraphs": [
            "Complete the accessibility assessment from Chapter 12, then run the smoke, data/auth, and modest arrival-rate scripts against the local app.",
            "Keep browser automation separate from load execution so background work does not accidentally distort a small baseline.",
            "Produce a report with observed outcomes, untested areas, repeatability limits, open defects, and prioritized next work.",
            "The expected deliverable is a transparent quality assessment. It is not a legal compliance statement, production capacity benchmark, or exhaustive non-functional certification."
          ]
        },
        {
          "title": "Example 1: Final report structure",
          "paragraphs": [],
          "example": {
            "title": "Final report structure",
            "filename": "Final report structure",
            "code": "1. Build and environment\n2. Accessibility scope and state matrix\n3. Automated results and manual observations\n4. Performance model, budgets, and achieved workload\n5. Summaries, errors, and observations\n6. Confirmed findings and retest results\n7. Limitations and recommended next experiments",
            "command": "Apply this checklist to the local practice application and record observed results.",
            "expected": "The reader can see what was actually tested.",
            "explanation": "Attach actual evidence instead of copying expected outcomes from lessons."
          }
        }
      ],
      "mistakes": [
        "Reporting expected outcomes as observed evidence.",
        "Combining unrelated scores into one unexplained quality grade."
      ],
      "exercise": {
        "title": "Practice: Complete Non-Functional Quality Assessment",
        "tasks": [
          "Complete the selected manual accessibility checks.",
          "Run the three supplied k6 scripts.",
          "Produce one report with explicit limitations."
        ],
        "solution": {
          "title": "Suggested execution order",
          "filename": "Suggested execution order",
          "code": "npm run typecheck\nnpm run test:a11y\n# Now start npm start in a separate terminal.\nmkdir -p results\nk6 run k6/smoke.js\ncp results/summary.json results/smoke.json\nk6 run k6/data-auth.js\ncp results/summary.json results/data-auth.json\nk6 run k6/load.js\ncp results/summary.json results/load.json",
          "command": "Perform the manual checklist separately and record your environment.",
          "expected": "Evidence is retained for each performance run.",
          "explanation": "The browser tests own their server; the later k6 runs use your separately started server."
        }
      },
      "takeaway": "Combine scoped accessibility evidence and a defensible performance report."
    }
  }
];
