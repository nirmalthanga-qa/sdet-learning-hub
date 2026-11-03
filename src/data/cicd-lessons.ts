export type CiCdExample = {
  title: string; filename: string; code: string;
  command: string; expected: string; explanation: string;
};
export type CiCdSection = {
  title: string; paragraphs: string[]; bullets?: string[];
  example?: CiCdExample;
  table?: { headers: string[]; rows: string[][] };
};
export type CiCdLessonData = {
  number: number; slug: string; title: string; description: string;
  group: "Git" | "GitHub Actions" | "Docker and integration";
  content: {
    introduction: string; objectives: string[]; sections: CiCdSection[];
    mistakes: string[];
    exercise: { title: string; tasks: string[]; solution: CiCdExample };
    takeaway: string;
  };
};

export const cicdLessons: CiCdLessonData[] = [
  {
    "number": 1,
    "slug": "git-github-and-cicd",
    "title": "Git, GitHub, and CI/CD Fundamentals",
    "description": "Connect version-controlled test changes to repeatable quality checks.",
    "group": "Git",
    "content": {
      "introduction": "Connect version-controlled test changes to repeatable quality checks.",
      "objectives": [
        "Distinguish Git from GitHub.",
        "Identify worktree, index, commit, and remote."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Git records local snapshots; GitHub hosts repositories and collaboration. GitHub Actions executes workflows. Docker packages an execution environment. Each has a different responsibility.",
            "Continuous integration validates frequent changes. Continuous delivery keeps a release ready for an approval or release step. Continuous deployment automatically releases passing changes. This course builds verification pipelines, not a production deployment.",
            "Run all examples in a separate sdet-ci-practice repository. Git exercises use a disposable notes file before Chapter 13 introduces the runnable test application. The Learning Hub is teaching material and does not run these commands.",
            "Worktree means current files; index means the staged snapshot; HEAD identifies the current commit. A commit remains local until pushed."
          ]
        },
        {
          "title": "Quick reference",
          "paragraphs": [],
          "table": {
            "headers": [
              "Layer",
              "Purpose"
            ],
            "rows": [
              [
                "Git",
                "Version changes locally"
              ],
              [
                "GitHub",
                "Review and host changes"
              ],
              [
                "Actions",
                "Run automated checks"
              ],
              [
                "Docker",
                "Package runtime dependencies"
              ]
            ]
          }
        },
        {
          "title": "Example 1: Create the practice repository",
          "paragraphs": [],
          "example": {
            "title": "Create the practice repository",
            "filename": "Create the practice repository",
            "code": "mkdir sdet-ci-practice\ncd sdet-ci-practice\ngit init -b main\ngit status",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "An empty repository on main.",
            "explanation": "Do not run git init inside the Learning Hub for this exercise."
          }
        }
      ],
      "mistakes": [
        "Assuming commit means upload.",
        "Confusing a passing pipeline with complete product quality."
      ],
      "exercise": {
        "title": "Apply it: Git, GitHub, and CI/CD Fundamentals",
        "tasks": [
          "Distinguish Git from GitHub.",
          "Identify worktree, index, commit, and remote."
        ],
        "solution": {
          "title": "Inspect the repository",
          "filename": "Inspect the repository",
          "code": "git rev-parse --show-toplevel\ngit status --short --branch",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The root is sdet-ci-practice; main has no commits yet.",
          "explanation": "Always confirm which repository you are operating on."
        }
      },
      "takeaway": "Connect version-controlled test changes to repeatable quality checks."
    }
  },
  {
    "number": 2,
    "slug": "setup-identity-and-cloning",
    "title": "Git Setup, Identity, SSH, and Cloning",
    "description": "Configure identity and authenticate without embedding credentials in source code.",
    "group": "Git",
    "content": {
      "introduction": "Configure identity and authenticate without embedding credentials in source code.",
      "objectives": [
        "Set and verify repository identity.",
        "Explain which SSH key can be shared."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Commit author identity and remote authentication are separate. Configure the repository identity using your name and an email associated with your GitHub account, or its provided no-reply address.",
            "Use HTTPS with an approved credential manager or SSH. Never put a token into a remote URL committed to documentation or scripts.",
            "If generating an SSH key, choose a new filename and do not overwrite an existing key. Add only the public .pub key to GitHub. Verify a new host fingerprint against GitHub documentation before accepting it.",
            "Cloning an existing repository is an alternative to initializing a new one. The commands show both cases; do not clone into an already populated practice directory."
          ]
        },
        {
          "title": "Example 1: Repository identity",
          "paragraphs": [],
          "example": {
            "title": "Repository identity",
            "filename": "Repository identity",
            "code": "git config user.name \"YOUR NAME\"\ngit config user.email \"YOUR VERIFIED EMAIL\"\ngit config --show-origin --get user.email",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The configured email and its source are displayed.",
            "explanation": "Omit --global to keep this exercise scoped to the current repository."
          }
        },
        {
          "title": "Example 2: SSH and clone alternatives",
          "paragraphs": [],
          "example": {
            "title": "SSH and clone alternatives",
            "filename": "SSH and clone alternatives",
            "code": "ssh -T git@github.com\n# Clone only if starting from an existing remote:\ngit clone git@github.com:YOUR_ACCOUNT/sdet-ci-practice.git",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "SSH identifies your account; cloning creates a local checkout. GitHub SSH authentication can succeed while returning a nonzero exit status because shell access is not provided.",
            "explanation": "For a new key: ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_sdet_practice -C \"YOUR EMAIL\". Configure that identity in your SSH config and add its public key to GitHub."
          }
        }
      ],
      "mistakes": [
        "Sharing a private SSH key.",
        "Overwriting an existing key.",
        "Assuming user.email authenticates a push."
      ],
      "exercise": {
        "title": "Apply it: Git Setup, Identity, SSH, and Cloning",
        "tasks": [
          "Set and verify repository identity.",
          "Explain which SSH key can be shared."
        ],
        "solution": {
          "title": "Inspect remotes",
          "filename": "Inspect remotes",
          "code": "git remote -v\ngit config --get user.name",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Remote URLs contain no embedded password or token. A new local-only repository may have no remote yet.",
          "explanation": "Authentication is configured separately from author metadata."
        }
      },
      "takeaway": "Configure identity and authenticate without embedding credentials in source code."
    }
  },
  {
    "number": 3,
    "slug": "daily-git-workflow",
    "title": "Daily Workflow: status, diff, add, commit, push",
    "description": "Review, stage, and commit a focused automation change.",
    "group": "Git",
    "content": {
      "introduction": "Review, stage, and commit a focused automation change.",
      "objectives": [
        "Create a focused first commit.",
        "Explain staged versus unstaged changes."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "git diff compares unstaged tracked-file changes with the index. git diff --staged compares the index with HEAD. New untracked files appear in status but not the usual unstaged diff.",
            "Stage explicit paths or use git add -p for selected hunks. Review the staged patch before committing so generated reports or unrelated edits do not slip into a test change.",
            "The example creates the first local commit. Pushing requires an existing empty GitHub repository you own; create that repository before adding its remote.",
            "A focused commit should explain the test behavior being added, such as a missing required-field assertion, rather than saying only \"updates\"."
          ]
        },
        {
          "title": "Example 1: First reviewed commit",
          "paragraphs": [],
          "example": {
            "title": "First reviewed commit",
            "filename": "First reviewed commit",
            "code": "printf 'Checkout smoke test plan\n' > test-plan.md\ngit status --short\ngit add test-plan.md\ngit diff --staged\ngit commit -m \"docs: add checkout smoke test plan\"\ngit show --stat HEAD",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "One commit containing the reviewed file.",
            "explanation": "After Chapter 13, apply the same workflow to test files and run relevant checks before committing."
          }
        },
        {
          "title": "Example 2: Publish to your empty repository",
          "paragraphs": [],
          "example": {
            "title": "Publish to your empty repository",
            "filename": "Publish to your empty repository",
            "code": "git remote add origin git@github.com:YOUR_ACCOUNT/sdet-ci-practice.git\ngit push -u origin main",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "main tracks origin/main.",
            "explanation": "If origin already exists, inspect it instead of blindly adding or replacing it."
          }
        }
      ],
      "mistakes": [
        "Running git add . without reviewing its scope.",
        "Committing reports, node_modules, or credentials.",
        "Pushing before inspecting the remote URL."
      ],
      "exercise": {
        "title": "Apply it: Daily Workflow: status, diff, add, commit, push",
        "tasks": [
          "Create a focused first commit.",
          "Explain staged versus unstaged changes."
        ],
        "solution": {
          "title": "Review before the next commit",
          "filename": "Review before the next commit",
          "code": "git status --short\ngit diff\ngit diff --staged\ngit log -1 --oneline",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "You can identify exactly what will enter the next commit.",
          "explanation": "Run these inspections before staging or pushing."
        }
      },
      "takeaway": "Review, stage, and commit a focused automation change."
    }
  },
  {
    "number": 4,
    "slug": "branches",
    "title": "Branches: Create, Switch, Rename, and Delete",
    "description": "Keep one testing task isolated on a descriptive branch.",
    "group": "Git",
    "content": {
      "introduction": "Keep one testing task isolated on a descriptive branch.",
      "objectives": [
        "Create a descriptive test branch.",
        "Verify the current branch before editing."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "A branch is a movable reference to a commit. A new feature branch initially points to the same commit as its starting point.",
            "Create a branch from an updated main. git switch changes branches; git switch -c creates and switches. Uncommitted changes can follow the switch or block it if they conflict.",
            "Delete merged local branches with -d after switching away. -D bypasses that check and can discard the branch reference to unmerged work.",
            "After a squash merge, Git may not recognize the original branch as merged. Inspect its commits and the pull request before deciding what to delete."
          ]
        },
        {
          "title": "Example 1: Create a test branch",
          "paragraphs": [],
          "example": {
            "title": "Create a test branch",
            "filename": "Create a test branch",
            "code": "git switch main\ngit pull --ff-only\ngit switch -c test/checkout-validation\ngit branch --show-current",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The active branch is test/checkout-validation.",
            "explanation": "pull requires the upstream configured in Chapter 3."
          }
        },
        {
          "title": "Example 2: Rename a local branch",
          "paragraphs": [],
          "example": {
            "title": "Rename a local branch",
            "filename": "Rename a local branch",
            "code": "git branch -m test/checkout-required-fields\ngit branch -vv",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The local branch has the new name.",
            "explanation": "Renaming locally does not rename or remove a remote branch."
          }
        }
      ],
      "mistakes": [
        "Editing directly on main by habit.",
        "Deleting a branch without checking unmerged commits.",
        "Assuming branch rename also renames the remote."
      ],
      "exercise": {
        "title": "Apply it: Branches: Create, Switch, Rename, and Delete",
        "tasks": [
          "Create a descriptive test branch.",
          "Verify the current branch before editing."
        ],
        "solution": {
          "title": "After the pull request is merged",
          "filename": "After the pull request is merged",
          "code": "git switch main\ngit pull --ff-only\ngit branch -d test/checkout-required-fields",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The branch is removed only if Git considers it merged.",
          "explanation": "If deletion is refused, inspect its history rather than forcing it automatically."
        }
      },
      "takeaway": "Keep one testing task isolated on a descriptive branch."
    }
  },
  {
    "number": 5,
    "slug": "syncing-remotes",
    "title": "Syncing Changes: fetch, pull, and Remote Tracking",
    "description": "Inspect incoming changes before integrating them into your test branch.",
    "group": "Git",
    "content": {
      "introduction": "Inspect incoming changes before integrating them into your test branch.",
      "objectives": [
        "Fetch without integrating.",
        "Recognize an ahead/behind branch."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "git fetch updates remote-tracking references without merging into the current branch. git pull fetches and then integrates according to its options and configuration.",
            "Use pull --ff-only on main to fail visibly if local and remote histories have diverged. It does not resolve divergence for you.",
            "origin/main is your last fetched view of the remote branch, not a live view. Fetch before comparing.",
            "On a feature branch, choose the team-approved merge or rebase approach in Chapter 7. Do not assume pulling main automatically updates every feature branch."
          ]
        },
        {
          "title": "Example 1: Inspect incoming main changes",
          "paragraphs": [],
          "example": {
            "title": "Inspect incoming main changes",
            "filename": "Inspect incoming main changes",
            "code": "git fetch --prune origin\ngit log --oneline HEAD..origin/main\ngit diff HEAD...origin/main\ngit branch -vv",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Incoming commits and differences are visible without changing your worktree.",
            "explanation": "Three-dot diff compares the merge base with the right-hand side; it is not the same as comparing both current snapshots."
          }
        }
      ],
      "mistakes": [
        "Confusing fetch with merge.",
        "Using a stale remote-tracking reference.",
        "Force pushing to resolve divergence without understanding it."
      ],
      "exercise": {
        "title": "Apply it: Syncing Changes: fetch, pull, and Remote Tracking",
        "tasks": [
          "Fetch without integrating.",
          "Recognize an ahead/behind branch."
        ],
        "solution": {
          "title": "Fast-forward local main",
          "filename": "Fast-forward local main",
          "code": "git switch main\ngit pull --ff-only origin main\ngit status --short --branch",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "main advances if it can fast-forward; divergence is reported otherwise.",
          "explanation": "Preserve local work before switching branches."
        }
      },
      "takeaway": "Inspect incoming changes before integrating them into your test branch."
    }
  },
  {
    "number": 6,
    "slug": "pull-requests",
    "title": "Pull Requests and Reviewing Automation Changes",
    "description": "Make test changes understandable and reviewable before merging.",
    "group": "Git",
    "content": {
      "introduction": "Make test changes understandable and reviewable before merging.",
      "objectives": [
        "Write a pull request explaining a test gap.",
        "Inspect its checks and diff."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Push your feature branch and open a pull request against the intended base. The pull request should state the defect or coverage gap, what the test verifies, and how it was validated.",
            "Review assertions, data ownership, selectors, cleanup, and potential flakiness. A test that only clicks through a flow without checking outcomes provides weak evidence.",
            "The gh commands require the GitHub CLI and authentication. The web interface provides the same collaboration workflow.",
            "Do not merge solely because checks are green. Required review and branch rules remain part of the team process."
          ]
        },
        {
          "title": "Example 1: Prepare a pull request",
          "paragraphs": [],
          "example": {
            "title": "Prepare a pull request",
            "filename": "Prepare a pull request",
            "code": "git diff --check\ngit diff --stat origin/main...HEAD\ngit push -u origin HEAD\ngh pr create --base main --fill",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "A pull request is created for the pushed branch.",
            "explanation": "Review the generated title and description before submitting; --fill derives defaults from commits."
          }
        },
        {
          "title": "Example 2: Inspect review and checks",
          "paragraphs": [],
          "example": {
            "title": "Inspect review and checks",
            "filename": "Inspect review and checks",
            "code": "gh pr view --web\ngh pr checks\ngh pr diff",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "You can inspect the patch and current check results.",
            "explanation": "Check names and links help reviewers locate validation evidence."
          }
        }
      ],
      "mistakes": [
        "Using a PR description that only lists filenames.",
        "Reviewing generated reports instead of test logic.",
        "Treating an unrelated passing job as evidence for the changed test."
      ],
      "exercise": {
        "title": "Apply it: Pull Requests and Reviewing Automation Changes",
        "tasks": [
          "Write a pull request explaining a test gap.",
          "Inspect its checks and diff."
        ],
        "solution": {
          "title": "Suggested pull request description",
          "filename": "Suggested pull request description",
          "code": "Problem: checkout accepted an empty delivery name.\nChange: add a negative UI check and verify no order is submitted.\nValidation: targeted test passed locally; CI result linked.\nData: isolated cart created per test; cleanup included.",
          "command": "Use this structure in your actual PR; replace claims with evidence you collected.",
          "expected": "A reviewer can understand the trigger and expected behavior.",
          "explanation": "Do not claim tests passed if they were not run."
        }
      },
      "takeaway": "Make test changes understandable and reviewable before merging."
    }
  },
  {
    "number": 7,
    "slug": "merge-rebase-and-conflicts",
    "title": "Merge, Rebase, and Conflict Resolution",
    "description": "Integrate upstream work while preserving the intended test behavior.",
    "group": "Git",
    "content": {
      "introduction": "Integrate upstream work while preserving the intended test behavior.",
      "objectives": [
        "Explain merge versus rebase.",
        "Resolve a conflict and validate the resulting behavior."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Merge combines histories and may create a merge commit. Rebase replays your commits onto another base, changing commit IDs.",
            "Prefer the team workflow. Rebase a private feature branch only when you understand who else relies on its history. Never rewrite shared main history as a routine update.",
            "When a conflict occurs, inspect both behaviors and edit a correct combined result. Do not blindly choose ours or theirs, particularly during rebase where the interpretation can be surprising.",
            "After resolving a conflict, run affected checks. A syntactically clean merge can still duplicate hooks, weaken assertions, or remove cleanup."
          ]
        },
        {
          "title": "Example 1: Merge upstream into the feature branch",
          "paragraphs": [],
          "example": {
            "title": "Merge upstream into the feature branch",
            "filename": "Merge upstream into the feature branch",
            "code": "git fetch origin\ngit merge origin/main\n# If conflicts occur: edit the listed files, then:\ngit status\ngit add test-plan.md\ngit merge --continue",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The feature branch contains upstream work and your changes.",
            "explanation": "If you choose to abandon an in-progress merge, use git merge --abort."
          }
        },
        {
          "title": "Example 2: Rebase alternative — do not run after the merge example blindly",
          "paragraphs": [],
          "example": {
            "title": "Rebase alternative — do not run after the merge example blindly",
            "filename": "Rebase alternative — do not run after the merge example blindly",
            "code": "git fetch origin\ngit rebase origin/main\n# Resolve a conflict, then:\ngit add test-plan.md\ngit rebase --continue\n# To abandon the rebase instead:\n# git rebase --abort",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Your commits are replayed on the fetched main.",
            "explanation": "A previously pushed private branch may require --force-with-lease, after coordination. It still rewrites history and is not safe for arbitrary shared branches."
          }
        }
      ],
      "mistakes": [
        "Running merge and rebase as one mandatory sequence.",
        "Staging unresolved conflict markers.",
        "Using plain --force on shared history."
      ],
      "exercise": {
        "title": "Apply it: Merge, Rebase, and Conflict Resolution",
        "tasks": [
          "Explain merge versus rebase.",
          "Resolve a conflict and validate the resulting behavior."
        ],
        "solution": {
          "title": "Inspect resolved history",
          "filename": "Inspect resolved history",
          "code": "git status\ngit diff --check\ngit log --graph --oneline --decorate -12",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "No conflict markers or unfinished operation remain.",
          "explanation": "Use the affected test suite as a separate behavior check."
        }
      },
      "takeaway": "Integrate upstream work while preserving the intended test behavior."
    }
  },
  {
    "number": 8,
    "slug": "stashing",
    "title": "Stashing Work and Switching Tasks",
    "description": "Temporarily preserve unfinished work while handling another task.",
    "group": "Git",
    "content": {
      "introduction": "Temporarily preserve unfinished work while handling another task.",
      "objectives": [
        "Save and restore unfinished work.",
        "Explain why apply can be safer than immediate deletion."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "A stash saves tracked changes; -u also includes untracked files, but not ignored files. It is local storage, not a remote backup.",
            "Use a descriptive stash message. Inspect the stash list before applying because indexes such as stash@{0} can change as new stashes are created.",
            "apply restores a stash while keeping it in the list; pop attempts to restore and remove it on success. Both can produce conflicts.",
            "For substantial work, a temporary commit on a private branch can be easier to recover and share than a long-lived stash."
          ]
        },
        {
          "title": "Example 1: Preserve unfinished tests",
          "paragraphs": [],
          "example": {
            "title": "Preserve unfinished tests",
            "filename": "Preserve unfinished tests",
            "code": "git status --short\ngit stash push -u -m \"WIP checkout validation\"\ngit stash list\ngit switch main",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The worktree is clean enough to switch, and the stash is listed.",
            "explanation": "Ignored files such as reports are not included by -u."
          }
        },
        {
          "title": "Example 2: Return to the task",
          "paragraphs": [],
          "example": {
            "title": "Return to the task",
            "filename": "Return to the task",
            "code": "git switch test/checkout-required-fields\ngit stash show --stat \"stash@{0}\"\ngit stash apply \"stash@{0}\"\ngit status",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The selected changes return while the stash remains available.",
            "explanation": "After validating the restored changes, explicitly drop only the correct stash."
          }
        }
      ],
      "mistakes": [
        "Assuming untracked files are included without -u.",
        "Dropping a stash before verifying restoration.",
        "Treating a stash as a remote backup."
      ],
      "exercise": {
        "title": "Apply it: Stashing Work and Switching Tasks",
        "tasks": [
          "Save and restore unfinished work.",
          "Explain why apply can be safer than immediate deletion."
        ],
        "solution": {
          "title": "Remove a verified stash",
          "filename": "Remove a verified stash",
          "code": "git stash list\ngit stash drop \"stash@{0}\"",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Only the verified selected stash is removed.",
          "explanation": "Do this after confirming its contents were successfully restored; do not use clear as routine cleanup."
        }
      },
      "takeaway": "Temporarily preserve unfinished work while handling another task."
    }
  },
  {
    "number": 9,
    "slug": "undoing-changes",
    "title": "Undoing Changes: restore, reset, and revert",
    "description": "Choose an undo operation based on whether work is staged, committed, or shared.",
    "group": "Git",
    "content": {
      "introduction": "Choose an undo operation based on whether work is staged, committed, or shared.",
      "objectives": [
        "Choose an undo command for staged versus shared work.",
        "Explain which commands can discard data."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "restore --staged removes a path from the index without discarding its worktree edits. restore without --staged replaces worktree content from the index by default and can discard edits.",
            "reset --soft HEAD~1 moves the current branch back one commit while retaining its changes staged. Use only on your own unpublished history and only when a parent commit exists.",
            "revert creates a new inverse commit. It is the usual starting point for undoing an already shared change. Reverting a merge needs additional mainline reasoning.",
            "reset --hard can discard tracked work; clean -fd deletes untracked files. They are not routine prerequisites for fixing a test. Preview clean with -nd and avoid broad deletion."
          ]
        },
        {
          "title": "Quick reference",
          "paragraphs": [],
          "table": {
            "headers": [
              "Situation",
              "Typical command",
              "Effect"
            ],
            "rows": [
              [
                "Unstage file",
                "git restore --staged FILE",
                "Keeps worktree edits"
              ],
              [
                "Discard unstaged tracked edits",
                "git restore -- FILE",
                "Replaces worktree content; review first"
              ],
              [
                "Undo unpublished commit",
                "git reset --soft HEAD~1",
                "Moves branch; changes stay staged"
              ],
              [
                "Undo shared commit",
                "git revert SHA",
                "Creates an inverse commit"
              ]
            ]
          }
        },
        {
          "title": "Example 1: Unstage without losing edits",
          "paragraphs": [],
          "example": {
            "title": "Unstage without losing edits",
            "filename": "Unstage without losing edits",
            "code": "git diff --staged\ngit restore --staged test-plan.md\ngit diff -- test-plan.md",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The edits remain in the worktree but are unstaged.",
            "explanation": "This differs from discarding worktree edits."
          }
        },
        {
          "title": "Example 2: Undo a shared commit",
          "paragraphs": [],
          "example": {
            "title": "Undo a shared commit",
            "filename": "Undo a shared commit",
            "code": "git log --oneline -8\ngit revert BAD_COMMIT_SHA\ngit show --stat HEAD",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "A new commit records the inverse change.",
            "explanation": "Replace BAD_COMMIT_SHA with the reviewed commit. Resolve conflicts and rerun affected tests."
          }
        }
      ],
      "mistakes": [
        "Confusing unstage with discard.",
        "Using hard reset to undo a shared commit.",
        "Assuming reflog stores every unsaved edit."
      ],
      "exercise": {
        "title": "Apply it: Undoing Changes: restore, reset, and revert",
        "tasks": [
          "Choose an undo command for staged versus shared work.",
          "Explain which commands can discard data."
        ],
        "solution": {
          "title": "Recover a branch reference after a mistaken move",
          "filename": "Recover a branch reference after a mistaken move",
          "code": "git reflog --date=local\ngit branch recovery/test-work RECOVERABLE_COMMIT_SHA\ngit show --stat recovery/test-work",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "A new branch references the identified commit.",
          "explanation": "Reflog recovery does not guarantee recovery of never-committed file edits."
        }
      },
      "takeaway": "Choose an undo operation based on whether work is staged, committed, or shared."
    }
  },
  {
    "number": 10,
    "slug": "investigating-history",
    "title": "Investigating Failures: log, show, blame, and bisect",
    "description": "Trace a failing behavior to a change using repeatable evidence.",
    "group": "Git",
    "content": {
      "introduction": "Trace a failing behavior to a change using repeatable evidence.",
      "objectives": [
        "Inspect the history of one test file.",
        "Explain a reliable bisect predicate."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "log finds commits; show inspects one commit; blame identifies the last commit touching each line. Blame is a navigation tool, not evidence of who caused a bug.",
            "bisect narrows a known-good to known-bad range. The failure must be reproducible and the test command must work across candidate revisions.",
            "During automated bisect, exit 0 means good, typical nonzero values mean bad, and 125 means skip. Setup failures must not be mistaken for the target defect.",
            "Use a clean worktree or separate worktree and finish with bisect reset. A flaky predicate can identify the wrong commit."
          ]
        },
        {
          "title": "Example 1: Inspect a test change",
          "paragraphs": [],
          "example": {
            "title": "Inspect a test change",
            "filename": "Inspect a test change",
            "code": "git log --oneline -- test-plan.md\ngit show COMMIT_SHA -- test-plan.md\ngit blame -L 1,20 -- test-plan.md",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Relevant history and line attribution are displayed.",
            "explanation": "Replace COMMIT_SHA and choose a valid line range for your file."
          }
        },
        {
          "title": "Example 2: Manual bisect",
          "paragraphs": [],
          "example": {
            "title": "Manual bisect",
            "filename": "Manual bisect",
            "code": "git bisect start\ngit bisect bad BAD_COMMIT_SHA\ngit bisect good GOOD_COMMIT_SHA\n# Run the known regression check, then mark this revision:\ngit bisect good\n# Or use git bisect bad when it reproduces.\n# When finished:\ngit bisect reset",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Git narrows the responsible range as you classify revisions.",
            "explanation": "Do not mark a revision good unless the regression check actually passed."
          }
        }
      ],
      "mistakes": [
        "Blaming a person based on line attribution.",
        "Bisecting with a flaky test.",
        "Classifying dependency installation failures as the product regression."
      ],
      "exercise": {
        "title": "Apply it: Investigating Failures: log, show, blame, and bisect",
        "tasks": [
          "Inspect the history of one test file.",
          "Explain a reliable bisect predicate."
        ],
        "solution": {
          "title": "Find a related message",
          "filename": "Find a related message",
          "code": "git log --all --oneline --grep=\"checkout\"\ngit show --stat COMMIT_SHA",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Matching commits provide investigation starting points.",
          "explanation": "Commit messages are clues; inspect and reproduce the behavior."
        }
      },
      "takeaway": "Trace a failing behavior to a change using repeatable evidence."
    }
  },
  {
    "number": 11,
    "slug": "daily-git-scenarios",
    "title": "Cherry-picking, Tags, .gitignore, and Daily Git Scenarios",
    "description": "Handle selective fixes and keep generated automation output out of history.",
    "group": "Git",
    "content": {
      "introduction": "Handle selective fixes and keep generated automation output out of history.",
      "objectives": [
        "Apply a reviewed fix to another branch.",
        "Explain why ignore rules do not remove tracked files."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "cherry-pick applies the change from an existing commit to the current branch, usually creating a new commit ID. Check dependencies before moving a fix to a release branch.",
            "Annotated tags can identify a tested revision. Tagging does not prove that revision passed; retain the corresponding CI evidence.",
            ".gitignore affects untracked files. It does not remove already tracked content or erase secrets from history. Revoke an exposed secret even if the file is subsequently deleted.",
            "A worktree allows another checkout without stashing the current one. Review which branches and files belong to each checkout before cleanup."
          ]
        },
        {
          "title": "Quick reference",
          "paragraphs": [],
          "table": {
            "headers": [
              "Daily task",
              "Command"
            ],
            "rows": [
              [
                "See current work",
                "git status --short --branch"
              ],
              [
                "Review unstaged / staged",
                "git diff / git diff --staged"
              ],
              [
                "Stage selected hunks",
                "git add -p"
              ],
              [
                "Fetch latest remote view",
                "git fetch --prune origin"
              ],
              [
                "Create a task branch",
                "git switch -c test/TICKET-topic"
              ],
              [
                "Publish a new branch",
                "git push -u origin HEAD"
              ],
              [
                "Inspect last commit",
                "git show --stat HEAD"
              ],
              [
                "Undo shared change",
                "git revert SHA"
              ],
              [
                "Temporary second checkout",
                "git worktree add ../sdet-review -b review/task origin/main"
              ]
            ]
          }
        },
        {
          "title": "Example 1: Move one reviewed fix",
          "paragraphs": [],
          "example": {
            "title": "Move one reviewed fix",
            "filename": "Move one reviewed fix",
            "code": "git switch RELEASE_BRANCH\ngit cherry-pick FIX_COMMIT_SHA\n# If abandoning a conflict:\n# git cherry-pick --abort",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The reviewed fix appears on the intended branch.",
            "explanation": "Resolve conflicts and validate behavior in the release branch context."
          }
        },
        {
          "title": "Example 2: Tag and inspect a tested revision",
          "paragraphs": [],
          "example": {
            "title": "Tag and inspect a tested revision",
            "filename": "Tag and inspect a tested revision",
            "code": "git tag -a v0.1.0-tests -m \"Validated practice test baseline\"\ngit show v0.1.0-tests\n# Publish only when intended:\n# git push origin v0.1.0-tests",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "An annotated tag identifies the current commit.",
            "explanation": "Do not retag a published release silently."
          }
        },
        {
          "title": "Example 3: .gitignore",
          "paragraphs": [],
          "example": {
            "title": ".gitignore",
            "filename": ".gitignore",
            "code": "node_modules/\n.env\n.env.*\n!.env.example\nplaywright-report/\ntest-results/\ncypress/screenshots/\ncypress/videos/\nartifacts/\n.DS_Store",
            "command": "Save in the practice repository. Commit package-lock.json.",
            "expected": "Generated output stays untracked.",
            "explanation": "Keep reusable environment templates free of actual secrets."
          }
        }
      ],
      "mistakes": [
        "Cherry-picking without dependent changes.",
        "Committing credentials or generated reports.",
        "Assuming .gitignore rewrites history."
      ],
      "exercise": {
        "title": "Apply it: Cherry-picking, Tags, .gitignore, and Daily Git Scenarios",
        "tasks": [
          "Apply a reviewed fix to another branch.",
          "Explain why ignore rules do not remove tracked files."
        ],
        "solution": {
          "title": "Inspect why a file is ignored",
          "filename": "Inspect why a file is ignored",
          "code": "git check-ignore -v playwright-report/index.html\ngit ls-files .env\n# Only if a tracked local .env must be untracked:\n# git rm --cached .env",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "You can distinguish ignored files from already tracked files.",
          "explanation": "Untracking does not erase previous commits; rotate any exposed secret."
        }
      },
      "takeaway": "Handle selective fixes and keep generated automation output out of history."
    }
  },
  {
    "number": 12,
    "slug": "actions-fundamentals",
    "title": "GitHub Actions: Workflows, Events, Jobs, Steps, and Runners",
    "description": "Read a workflow as an event-triggered graph of jobs and ordered steps.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Read a workflow as an event-triggered graph of jobs and ordered steps.",
      "objectives": [
        "Identify workflow, job, runner, and step.",
        "Explain how a failed command affects the job."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "A workflow is a YAML file under .github/workflows. An event starts a run. Jobs normally run independently; needs creates dependencies. Steps within a job share its runner workspace and execute sequentially.",
            "A runner is the machine executing a job. Hosted runners are convenient disposable environments. Self-hosted runners need explicit isolation, patching, cleanup, and access controls.",
            "A step uses an action or runs a shell command. A nonzero shell exit normally fails the step and stops later ordinary steps in that job.",
            "The initial workflow below needs the practice project introduced in Chapter 13. Do not expect npm ci to work before package.json and package-lock.json exist."
          ]
        },
        {
          "title": "Example 1: .github/workflows/quality.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/quality.yml",
            "filename": ".github/workflows/quality.yml",
            "code": "name: Quality checks\non:\n  push:\n    branches: [main]\n  pull_request:\n  workflow_dispatch:\npermissions:\n  contents: read\njobs:\n  quality:\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm test",
            "command": "Add after Chapter 13 setup; commit and push to your practice repository.",
            "expected": "A quality job installs locked dependencies and runs three checks.",
            "explanation": "The example uses current major action tags for readability. For stronger supply-chain immutability, use reviewed full commit SHAs and maintain them deliberately."
          }
        }
      ],
      "mistakes": [
        "Confusing steps with separate machines.",
        "Assuming every job shares files automatically.",
        "Ignoring the command exit code."
      ],
      "exercise": {
        "title": "Apply it: GitHub Actions: Workflows, Events, Jobs, Steps, and Runners",
        "tasks": [
          "Identify workflow, job, runner, and step.",
          "Explain how a failed command affects the job."
        ],
        "solution": {
          "title": "Find a workflow run",
          "filename": "Find a workflow run",
          "code": "gh run list --limit 5\ngh run view RUN_ID --log-failed",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Failed-step logs identify the failing command.",
          "explanation": "RUN_ID comes from the run list; you need authenticated GitHub CLI access."
        }
      },
      "takeaway": "Read a workflow as an event-triggered graph of jobs and ordered steps."
    }
  },
  {
    "number": 13,
    "slug": "first-quality-pipeline",
    "title": "First Pipeline: Install, Lint, Type-check, and Test",
    "description": "Build a real practice project that the remaining pipeline lessons can execute.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Build a real practice project that the remaining pipeline lessons can execute.",
      "objectives": [
        "Create the practice project files.",
        "Commit a generated lockfile.",
        "Make one expected assertion fail and observe a nonzero exit."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Save these files in sdet-ci-practice, not in the Next.js tutorial project. Create the parent directories shown in the filenames.",
            "Install once with npm install, inspect and commit package-lock.json. CI uses npm ci, which requires the manifest and lockfile to agree.",
            "Add the Playwright configuration and specs from Chapter 14 before running typecheck; they are the TypeScript inputs selected by this tsconfig.",
            "The application is intentionally small. It exposes a browser interaction and an API contract so pipelines can produce real success and failure evidence. It does not model payment or checkout persistence."
          ]
        },
        {
          "title": "Example 1: package.json",
          "paragraphs": [],
          "example": {
            "title": "package.json",
            "filename": "package.json",
            "code": "{\n  \"name\": \"sdet-ci-practice\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node server.mjs\",\n    \"lint\": \"eslint .\",\n    \"typecheck\": \"tsc --noEmit\",\n    \"test\": \"node --test tests/unit/*.test.mjs\",\n    \"test:pw\": \"playwright test\",\n    \"test:cy\": \"start-server-and-test start http-get://127.0.0.1:4173/health \\\"cypress run --browser chrome\\\"\"\n  },\n  \"dependencies\": {\n    \"pg\": \"^8.16.3\"\n  },\n  \"devDependencies\": {\n    \"@playwright/test\": \"1.64.1\",\n    \"@types/node\": \"^24.0.0\",\n    \"typescript\": \"^5.9.0\",\n    \"eslint\": \"^9.0.0\",\n    \"cypress\": \"^15.0.0\",\n    \"start-server-and-test\": \"^2.0.0\"\n  }\n}",
            "command": "npm install\nnpx playwright install chromium",
            "expected": "package-lock.json is generated; commit it with package.json.",
            "explanation": "Node 24 and npm are prerequisites. Cypress also requires a supported browser and OS dependencies; use the Chapter 23 image if local prerequisites are unavailable."
          }
        },
        {
          "title": "Example 2: money.mjs",
          "paragraphs": [],
          "example": {
            "title": "money.mjs",
            "filename": "money.mjs",
            "code": "export function totalCents(unitCents, quantity) {\n  if (!Number.isSafeInteger(unitCents) || unitCents < 0 ||\n      !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {\n    throw new Error(\"Invalid order input\");\n  }\n  const total = unitCents * quantity;\n  if (!Number.isSafeInteger(total)) throw new Error(\"Total exceeds safe range\");\n  return total;\n}",
            "command": "Imported by the unit test.",
            "expected": "Two units at 2500 cents produce 5000.",
            "explanation": "The function validates boundaries and integer precision."
          }
        },
        {
          "title": "Example 3: tests/unit/money.test.mjs",
          "paragraphs": [],
          "example": {
            "title": "tests/unit/money.test.mjs",
            "filename": "tests/unit/money.test.mjs",
            "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { totalCents } from \"../../money.mjs\";\n\ntest(\"calculates an order total\", () => {\n  assert.equal(totalCents(2500, 2), 5000);\n});\n\ntest(\"rejects invalid quantities\", () => {\n  for (const quantity of [0, 6, 1.5, \"2\"]) {\n    assert.throws(() => totalCents(2500, quantity));\n  }\n});",
            "command": "npm test",
            "expected": "Two unit tests pass.",
            "explanation": "These checks run before slower browser checks."
          }
        },
        {
          "title": "Example 4: server.mjs",
          "paragraphs": [],
          "example": {
            "title": "server.mjs",
            "filename": "server.mjs",
            "code": "import http from \"node:http\";\nimport { Pool } from \"pg\";\n\nconst pool = process.env.DATABASE_URL\n  ? new Pool({ connectionString: process.env.DATABASE_URL,\n      connectionTimeoutMillis: 5000, statement_timeout: 5000 })\n  : null;\nconst seed = [{ id: \"p1\", name: \"Keyboard\", price_cents: 2500 }];\nconst html = `<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">\n<title>Quality Shop</title></head><body>\n<h1>Quality Shop</h1>\n<button type=\"button\" data-cy=\"add-item\">Add keyboard</button>\n<p role=\"status\" data-cy=\"cart-count\">Cart: 0</p>\n<script>\nlet quantity = 0;\ndocument.querySelector('button').addEventListener('click', () => {\n  quantity += 1;\n  document.querySelector('[role=\"status\"]').textContent = 'Cart: ' + quantity;\n});\n</script></body></html>`;\n\nconst server = http.createServer(async (req, res) => {\n  const url = new URL(req.url, \"http://localhost\");\n  const send = (status, body) => {\n    res.writeHead(status, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify(body));\n  };\n  try {\n    if (req.method !== \"GET\") return send(405, { error: \"METHOD_NOT_ALLOWED\" });\n    if (url.pathname === \"/health\") {\n      if (pool) await pool.query(\"SELECT id FROM products LIMIT 1\");\n      return send(200, { status: \"ok\", storage: pool ? \"postgres\" : \"memory\" });\n    }\n    if (url.pathname === \"/api/products\") {\n      const items = pool\n        ? (await pool.query(\"SELECT id, name, price_cents FROM products ORDER BY id\")).rows\n        : seed;\n      return send(200, { items });\n    }\n    if (url.pathname === \"/\") {\n      res.writeHead(200, { \"Content-Type\": \"text/html; charset=utf-8\" });\n      return res.end(html);\n    }\n    return send(404, { error: \"NOT_FOUND\" });\n  } catch {\n    return send(503, { error: \"DEPENDENCY_UNAVAILABLE\" });\n  }\n});\nserver.listen(4173, process.env.APP_HOST ?? \"127.0.0.1\", () => {\n  console.log(\"Quality Shop listening on port 4173\");\n});\nfunction stop() {\n  server.close(() => { if (pool) pool.end().catch(() => { process.exitCode = 1; }); });\n}\nprocess.once(\"SIGTERM\", stop);\nprocess.once(\"SIGINT\", stop);",
            "command": "npm start",
            "expected": "A small page, health endpoint, and products endpoint run on port 4173.",
            "explanation": "Initially products come from memory. Chapter 24 supplies DATABASE_URL to use real PostgreSQL. The cart is intentionally browser-local, not a checkout or persistence implementation."
          }
        },
        {
          "title": "Example 5: eslint.config.mjs",
          "paragraphs": [],
          "example": {
            "title": "eslint.config.mjs",
            "filename": "eslint.config.mjs",
            "code": "export default [\n  { ignores: [\"node_modules/**\", \"playwright-report/**\", \"test-results/**\",\n      \"cypress/**\", \"artifacts/**\"] },\n  { files: [\"**/*.mjs\"], languageOptions: {\n      ecmaVersion: \"latest\", sourceType: \"module\",\n      globals: { process: \"readonly\", console: \"readonly\", URL: \"readonly\" }\n    }, rules: { \"no-unused-vars\": \"error\", \"no-undef\": \"error\" } }\n];",
            "command": "npm run lint",
            "expected": "The JavaScript practice source passes configured rules.",
            "explanation": "This deliberately small lint configuration does not lint TypeScript; type checking handles the included TS files."
          }
        },
        {
          "title": "Example 6: tsconfig.json",
          "paragraphs": [],
          "example": {
            "title": "tsconfig.json",
            "filename": "tsconfig.json",
            "code": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"NodeNext\",\n    \"moduleResolution\": \"NodeNext\",\n    \"strict\": true,\n    \"noEmit\": true,\n    \"skipLibCheck\": true,\n    \"types\": [\n      \"node\"\n    ]\n  },\n  \"include\": [\n    \"playwright.config.ts\",\n    \"tests/playwright/**/*.ts\"\n  ]\n}",
            "command": "npm run typecheck",
            "expected": "The Playwright TypeScript configuration and specs type-check after Chapter 14 is added.",
            "explanation": "Cypress globals are kept outside this configuration to avoid mixing assertion types."
          }
        },
        {
          "title": "Example 7: .github/workflows/quality.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/quality.yml",
            "filename": ".github/workflows/quality.yml",
            "code": "name: Quality checks\non:\n  push:\n    branches: [main]\n  pull_request:\n  workflow_dispatch:\npermissions:\n  contents: read\njobs:\n  quality:\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm test",
            "command": "Save the Chapter 12 workflow after the project is complete.",
            "expected": "Lint, type checking, and unit tests run in order.",
            "explanation": "Do not use continue-on-error on checks that are intended to block merging."
          }
        }
      ],
      "mistakes": [
        "Running npm ci without a lockfile.",
        "Copying practice dependencies into Learning Hub.",
        "Treating a placeholder echo command as a real test."
      ],
      "exercise": {
        "title": "Apply it: First Pipeline: Install, Lint, Type-check, and Test",
        "tasks": [
          "Create the practice project files.",
          "Commit a generated lockfile.",
          "Make one expected assertion fail and observe a nonzero exit."
        ],
        "solution": {
          "title": "Local quality checks",
          "filename": "Local quality checks",
          "code": "npm ci\nnpm run lint\nnpm run typecheck\nnpm test",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "All checks pass after Chapter 14 supplies the TypeScript files.",
          "explanation": "An intentionally wrong expected total should fail npm test; restore it after observing the failure."
        }
      },
      "takeaway": "Build a real practice project that the remaining pipeline lessons can execute."
    }
  },
  {
    "number": 14,
    "slug": "browser-tests-in-ci",
    "title": "Running Playwright and Cypress in CI",
    "description": "Run real browser suites with an explicit application lifecycle.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Run real browser suites with an explicit application lifecycle.",
      "objectives": [
        "Run both frameworks locally where prerequisites are installed.",
        "Explain which process starts and stops the app."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Playwright browser binaries and Linux libraries must match the installed package. Install them explicitly on a hosted runner or use the matching Docker image later.",
            "The supplied Playwright webServer owns the local application when BASE_URL is unset. Do not start a second server on the same port.",
            "Cypress uses the start-server-and-test script from package.json. Chrome must be installed in the environment; the Chapter 23 browser image makes that dependency explicit.",
            "Run frameworks in separate jobs when both are required. Avoid duplicating every test merely because two frameworks exist; these small parallel examples teach integration."
          ]
        },
        {
          "title": "Example 1: playwright.config.ts",
          "paragraphs": [],
          "example": {
            "title": "playwright.config.ts",
            "filename": "playwright.config.ts",
            "code": "import { defineConfig, devices } from \"@playwright/test\";\nconst external = process.env.BASE_URL;\nexport default defineConfig({\n  testDir: \"./tests/playwright\",\n  fullyParallel: true,\n  forbidOnly: Boolean(process.env.CI),\n  retries: 0,\n  workers: process.env.CI ? 2 : undefined,\n  reporter: [[\"list\"], [\"html\", { open: \"never\" }]],\n  outputDir: \"test-results\",\n  use: {\n    baseURL: external ?? \"http://127.0.0.1:4173\",\n    trace: \"retain-on-failure\",\n    screenshot: \"only-on-failure\",\n  },\n  projects: [{ name: \"chromium\", use: { ...devices[\"Desktop Chrome\"] } }],\n  webServer: external ? undefined : {\n    command: \"npm start\", url: \"http://127.0.0.1:4173/health\",\n    reuseExistingServer: false, timeout: 30000,\n  },\n});",
            "command": "npm run test:pw",
            "expected": "Playwright starts and stops its local server when BASE_URL is not provided.",
            "explanation": "When BASE_URL points at Compose, the workflow owns readiness and cleanup instead."
          }
        },
        {
          "title": "Example 2: tests/playwright/shop.spec.ts",
          "paragraphs": [],
          "example": {
            "title": "tests/playwright/shop.spec.ts",
            "filename": "tests/playwright/shop.spec.ts",
            "code": "import { test, expect } from \"@playwright/test\";\n\ntest(\"cart displays the added quantity\", async ({ page }) => {\n  await page.goto(\"/\");\n  await expect(page.getByRole(\"heading\", { name: \"Quality Shop\" })).toBeVisible();\n  await page.getByRole(\"button\", { name: \"Add keyboard\" }).click();\n  await expect(page.getByRole(\"status\")).toHaveText(\"Cart: 1\");\n});\n\ntest(\"API returns the seeded product\", async ({ request }) => {\n  const response = await request.get(\"/api/products\");\n  expect(response.status()).toBe(200);\n  expect(await response.json()).toEqual({\n    items: [{ id: \"p1\", name: \"Keyboard\", price_cents: 2500 }],\n  });\n});",
            "command": "npm run test:pw",
            "expected": "Both UI and API assertions pass.",
            "explanation": "Each UI test has its own browser context; no shared mutable cart state is needed."
          }
        },
        {
          "title": "Example 3: cypress.config.ts",
          "paragraphs": [],
          "example": {
            "title": "cypress.config.ts",
            "filename": "cypress.config.ts",
            "code": "import { defineConfig } from \"cypress\";\nexport default defineConfig({\n  video: false,\n  retries: 0,\n  e2e: { baseUrl: \"http://127.0.0.1:4173\", supportFile: false },\n});",
            "command": "npm run test:cy",
            "expected": "The helper starts the application, waits for health, runs Chrome, and stops the application.",
            "explanation": "Use a separate terminal only if invoking Cypress directly instead of the helper."
          }
        },
        {
          "title": "Example 4: cypress/e2e/shop.cy.ts",
          "paragraphs": [],
          "example": {
            "title": "cypress/e2e/shop.cy.ts",
            "filename": "cypress/e2e/shop.cy.ts",
            "code": "describe(\"Quality Shop\", () => {\n  it(\"updates the cart\", () => {\n    cy.visit(\"/\");\n    cy.get(\"[data-cy=add-item]\").click();\n    cy.get(\"[data-cy=cart-count]\").should(\"have.text\", \"Cart: 1\");\n  });\n  it(\"returns the expected product\", () => {\n    cy.request(\"/api/products\").then((response) => {\n      expect(response.status).to.equal(200);\n      expect(response.body.items).to.deep.equal([\n        { id: \"p1\", name: \"Keyboard\", price_cents: 2500 },\n      ]);\n    });\n  });\n});",
            "command": "npm run test:cy",
            "expected": "The two Cypress checks pass in Chrome.",
            "explanation": "Use cy.request assertions for the service result rather than only checking that the browser opened."
          }
        },
        {
          "title": "Example 5: .github/workflows/browser.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/browser.yml",
            "filename": ".github/workflows/browser.yml",
            "code": "name: Browser checks\non:\n  push:\n    branches: [main]\n  pull_request:\n  workflow_dispatch:\npermissions:\n  contents: read\njobs:\n  playwright:\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n          cache: npm\n      - run: npm ci\n      - run: npx playwright install --with-deps chromium\n      - run: npm run test:pw",
            "command": "Save after all practice files and the lockfile are committed.",
            "expected": "The hosted runner executes the Playwright browser and API tests.",
            "explanation": "Chapter 16 adds evidence upload; Chapter 23 covers explicit Cypress browser dependencies."
          }
        }
      ],
      "mistakes": [
        "Testing before readiness.",
        "Installing a browser version unrelated to the Playwright package.",
        "Leaving a background server running after a failed test."
      ],
      "exercise": {
        "title": "Apply it: Running Playwright and Cypress in CI",
        "tasks": [
          "Run both frameworks locally where prerequisites are installed.",
          "Explain which process starts and stops the app."
        ],
        "solution": {
          "title": "Target a Playwright test",
          "filename": "Target a Playwright test",
          "code": "npx playwright test --grep \"API returns\"",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The API scenario runs independently.",
          "explanation": "It still uses webServer unless BASE_URL points at an external service."
        }
      },
      "takeaway": "Run real browser suites with an explicit application lifecycle."
    }
  },
  {
    "number": 15,
    "slug": "configuration-and-permissions",
    "title": "Variables, Secrets, Permissions, and Environments",
    "description": "Provide configuration without granting test code unnecessary access.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Provide configuration without granting test code unnecessary access.",
      "objectives": [
        "Distinguish variables, secrets, and token permissions.",
        "Explain fork PR restrictions."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Use ordinary variables for non-sensitive configuration and secrets for credentials. A secret is not safe merely because a log masker might hide its exact value.",
            "Use contents: read when the job only needs to check out and test code. Give write permissions only to a job that actually needs them.",
            "Fork pull requests usually do not receive repository secrets. Do not switch to pull_request_target and execute untrusted PR code to bypass that boundary.",
            "Environment protection rules can gate access to deployment environments. Their availability depends on repository settings and plan; ordinary test jobs need not imply deployment.",
            "Pass untrusted text through environment variables, then quote it in shell. Do not interpolate PR titles or branch names directly into executable shell text."
          ]
        },
        {
          "title": "Example 1: Safe step inputs — workflow fragment",
          "paragraphs": [],
          "example": {
            "title": "Safe step inputs — workflow fragment",
            "filename": "Safe step inputs — workflow fragment",
            "code": "- name: Print PR title as data\n  env:\n    PR_TITLE: ${{ github.event.pull_request.title }}\n  run: printf '%s\n' \"$PR_TITLE\"\n\n# Only for a trusted environment that actually needs a token:\n# - name: Run authenticated checks\n#   env:\n#     API_TOKEN: ${{ secrets.TEST_API_TOKEN }}\n#   run: npm run test:pw",
            "command": "Insert the first step in an existing job. The commented authenticated step is a pattern, not a requirement for this public local app.",
            "expected": "The title is treated as data; no token is printed.",
            "explanation": "The practice app does not need a secret. Do not invent one to make the workflow look realistic."
          }
        }
      ],
      "mistakes": [
        "Printing secrets for debugging.",
        "Running untrusted PR code with privileged secrets.",
        "Granting write-all permissions to every job."
      ],
      "exercise": {
        "title": "Apply it: Variables, Secrets, Permissions, and Environments",
        "tasks": [
          "Distinguish variables, secrets, and token permissions.",
          "Explain fork PR restrictions."
        ],
        "solution": {
          "title": "Minimal job permissions",
          "filename": "Minimal job permissions",
          "code": "permissions:\n  contents: read",
          "command": "Place at workflow level for this course.",
          "expected": "The repository token has read access to contents.",
          "explanation": "A tested application credential is separate from the workflow GITHUB_TOKEN."
        }
      },
      "takeaway": "Provide configuration without granting test code unnecessary access."
    }
  },
  {
    "number": 16,
    "slug": "artifacts-and-cache",
    "title": "Reports, Screenshots, Traces, Artifacts, and Caching",
    "description": "Keep useful failure evidence and distinguish it from reusable dependency caches.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Keep useful failure evidence and distinguish it from reusable dependency caches.",
      "objectives": [
        "Capture evidence from a deliberate assertion failure.",
        "Explain why a cache hit does not prove tests passed."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Artifacts preserve outputs for inspection, such as reports and traces. Caches accelerate reuse of dependencies; they are not the permanent record of a test result.",
            "The supplied setup-node cache stores npm package-manager data, not a replacement for npm ci. The lockfile influences the cache key.",
            "Traces and screenshots can contain application data. Upload only expected report directories and use a retention period appropriate to the data.",
            "Upload evidence after failures without hiding the test exit code. !cancelled() allows the upload after an ordinary failure while avoiding a cancelled run."
          ]
        },
        {
          "title": "Example 1: Add after the Playwright run step",
          "paragraphs": [],
          "example": {
            "title": "Add after the Playwright run step",
            "filename": "Add after the Playwright run step",
            "code": "- name: Upload browser evidence\n        if: ${{ !cancelled() }}\n        uses: actions/upload-artifact@v7\n        with:\n          name: playwright-evidence\n          path: |\n            playwright-report/\n            test-results/\n          retention-days: 7\n          if-no-files-found: warn",
            "command": "Insert into the browser job at the same steps indentation.",
            "expected": "Available reports are uploaded even when an assertion fails.",
            "explanation": "If setup failed before tests, missing reports can be expected; inspect the earlier failure."
          }
        },
        {
          "title": "Example 2: Open local evidence",
          "paragraphs": [],
          "example": {
            "title": "Open local evidence",
            "filename": "Open local evidence",
            "code": "npx playwright show-report playwright-report\n# For a specific trace:\n# npx playwright show-trace test-results/PATH/trace.zip",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The report or selected trace opens.",
            "explanation": "Use the actual trace path; successful tests do not necessarily retain a trace."
          }
        }
      ],
      "mistakes": [
        "Caching reports instead of uploading artifacts.",
        "Assuming npm cache restores node_modules.",
        "Using continue-on-error to make failed tests look green."
      ],
      "exercise": {
        "title": "Apply it: Reports, Screenshots, Traces, Artifacts, and Caching",
        "tasks": [
          "Capture evidence from a deliberate assertion failure.",
          "Explain why a cache hit does not prove tests passed."
        ],
        "solution": {
          "title": "Cypress evidence upload — workflow fragment",
          "filename": "Cypress evidence upload — workflow fragment",
          "code": "- uses: actions/upload-artifact@v7\n  if: ${{ !cancelled() }}\n  with:\n    name: cypress-evidence\n    path: |\n      cypress/screenshots/\n      cypress/videos/\n    retention-days: 7\n    if-no-files-found: warn",
          "command": "Use after a Cypress run. Videos are absent with video: false.",
          "expected": "Failure screenshots are available when Cypress produces them.",
          "explanation": "Do not enable video solely to populate an artifact; choose evidence based on debugging needs."
        }
      },
      "takeaway": "Keep useful failure evidence and distinguish it from reusable dependency caches."
    }
  },
  {
    "number": 17,
    "slug": "matrices-and-sharding",
    "title": "Matrices, Parallel Execution, and Test Sharding",
    "description": "Choose between coverage multiplication and splitting one suite.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Choose between coverage multiplication and splitting one suite.",
      "objectives": [
        "Explain a matrix versus a shard.",
        "Verify each test belongs to one shard."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "A matrix creates jobs for combinations such as operating system and browser. Sharding distributes a suite across jobs. Running the entire suite on every shard is duplication, not sharding.",
            "The supplied Playwright configuration enables fullyParallel, allowing test-level distribution. With a small suite, the setup overhead may cost more than the time saved.",
            "Use unique artifact names per matrix job. This example preserves one report per shard; it does not merge them into one report.",
            "Cypress Cloud orchestration is a separate service. Without it, use explicitly disjoint spec groups rather than pretending --parallel alone provides free local orchestration."
          ]
        },
        {
          "title": "Example 1: .github/workflows/shards.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/shards.yml",
            "filename": ".github/workflows/shards.yml",
            "code": "name: Sharded browser checks\non:\n  workflow_dispatch:\npermissions:\n  contents: read\njobs:\n  playwright:\n    runs-on: ubuntu-latest\n    timeout-minutes: 15\n    strategy:\n      fail-fast: false\n      matrix:\n        shard: [1, 2]\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n          cache: npm\n      - run: npm ci\n      - run: npx playwright install --with-deps chromium\n      - run: npx playwright test --shard=${{ matrix.shard }}/2\n      - uses: actions/upload-artifact@v7\n        if: ${{ !cancelled() }}\n        with:\n          name: playwright-shard-${{ matrix.shard }}\n          path: |\n            playwright-report/\n            test-results/\n          retention-days: 7",
            "command": "Save as an optional manually triggered workflow.",
            "expected": "Two jobs run different Playwright shards.",
            "explanation": "fail-fast: false allows evidence from both jobs when one fails."
          }
        }
      ],
      "mistakes": [
        "Multiplying tests accidentally across matrix dimensions.",
        "Mutating shared data from parallel jobs.",
        "Uploading every shard to the same artifact name."
      ],
      "exercise": {
        "title": "Apply it: Matrices, Parallel Execution, and Test Sharding",
        "tasks": [
          "Explain a matrix versus a shard.",
          "Verify each test belongs to one shard."
        ],
        "solution": {
          "title": "Inspect shard selection locally",
          "filename": "Inspect shard selection locally",
          "code": "npx playwright test --list --shard=1/2\nnpx playwright test --list --shard=2/2",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The two lists cover the suite without intentional duplication.",
          "explanation": "Keep test discovery deterministic across workers."
        }
      },
      "takeaway": "Choose between coverage multiplication and splitting one suite."
    }
  },
  {
    "number": 18,
    "slug": "triggers-and-reuse",
    "title": "Scheduled Runs, Manual Triggers, and Reusable Workflows",
    "description": "Reuse meaningful checks without duplicating every workflow step.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Reuse meaningful checks without duplicating every workflow step.",
      "objectives": [
        "Identify the workflow_call interface.",
        "Explain schedule time zone and default-branch behavior."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "workflow_dispatch provides manual runs. schedule runs according to UTC cron and is not an exact-time delivery guarantee; runs can be delayed.",
            "Scheduled workflows use the default branch. The workflow must be present there; repository inactivity or policy can also affect schedules.",
            "A reusable workflow is called at job level with uses, not as a normal step. Inputs and permissions form its interface.",
            "The example schedule is 02:17 UTC on weekdays, which is 07:47 in India. It is illustrative lesson code, not a reminder created by this tutorial."
          ]
        },
        {
          "title": "Example 1: .github/workflows/reusable-quality.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/reusable-quality.yml",
            "filename": ".github/workflows/reusable-quality.yml",
            "code": "name: Reusable quality checks\non:\n  workflow_call:\n    inputs:\n      node-version:\n        type: string\n        default: \"24\"\npermissions:\n  contents: read\njobs:\n  quality:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: ${{ inputs.node-version }}\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm test",
            "command": "Save this reusable workflow in the practice repository.",
            "expected": "Callers can execute the quality job with a selected Node version.",
            "explanation": "Local reusable workflow paths use the same commit as the caller."
          }
        },
        {
          "title": "Example 2: .github/workflows/scheduled-quality.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/scheduled-quality.yml",
            "filename": ".github/workflows/scheduled-quality.yml",
            "code": "name: Scheduled quality checks\non:\n  workflow_dispatch:\n  schedule:\n    - cron: \"17 2 * * 1-5\"\npermissions:\n  contents: read\njobs:\n  quality:\n    uses: ./.github/workflows/reusable-quality.yml\n    with:\n      node-version: \"24\"",
            "command": "Add only if you want scheduled runs in your own practice repository.",
            "expected": "A manual or scheduled event calls the reusable workflow.",
            "explanation": "Avoid adding redundant scheduled runs before the checks are useful."
          }
        }
      ],
      "mistakes": [
        "Calling a reusable workflow as a step.",
        "Assuming cron is local time or exact-time execution.",
        "Passing every repository secret through secrets: inherit without need."
      ],
      "exercise": {
        "title": "Apply it: Scheduled Runs, Manual Triggers, and Reusable Workflows",
        "tasks": [
          "Identify the workflow_call interface.",
          "Explain schedule time zone and default-branch behavior."
        ],
        "solution": {
          "title": "Trigger and inspect a manual run",
          "filename": "Trigger and inspect a manual run",
          "code": "gh workflow run scheduled-quality.yml\ngh run list --workflow scheduled-quality.yml --limit 5",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "A manual run appears when the workflow exists on the default branch.",
          "explanation": "This command actually starts a run in your repository when you execute it."
        }
      },
      "takeaway": "Reuse meaningful checks without duplicating every workflow step."
    }
  },
  {
    "number": 19,
    "slug": "quality-gates-and-debugging",
    "title": "Quality Gates, Required Checks, and Pipeline Troubleshooting",
    "description": "Make failures actionable and keep merge decisions tied to stable checks.",
    "group": "GitHub Actions",
    "content": {
      "introduction": "Make failures actionable and keep merge decisions tied to stable checks.",
      "objectives": [
        "Classify a pipeline failure.",
        "Configure a stable required check in repository settings."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "A workflow result becomes a merge gate only when repository rules require its check. Configure the exact job/check name after its first run.",
            "Do not skip a required workflow through broad path filters without considering pending checks. Required checks must reliably report a result for applicable pull requests.",
            "Classify failures: application assertion, flaky test, environment readiness, dependency install, permissions, or runner resource exhaustion. Fix the category rather than rerunning indefinitely.",
            "Use bounded retries only for understood cases. A passing retry should remain visible as flakiness instead of erasing evidence.",
            "Limit outdated concurrent branch runs with a group. Do not use the same concurrency policy blindly for deployment jobs where interrupting a release may be unsafe."
          ]
        },
        {
          "title": "Example 1: Workflow concurrency fragment",
          "paragraphs": [],
          "example": {
            "title": "Workflow concurrency fragment",
            "filename": "Workflow concurrency fragment",
            "code": "concurrency:\n  group: quality-${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true",
            "command": "Place at workflow level for verification-only runs.",
            "expected": "A newer run supersedes an older run for the same workflow and ref.",
            "explanation": "This saves verification resources without mixing unrelated branches."
          }
        },
        {
          "title": "Example 2: Investigate before rerunning",
          "paragraphs": [],
          "example": {
            "title": "Investigate before rerunning",
            "filename": "Investigate before rerunning",
            "code": "gh run view RUN_ID --log-failed\ngh run view RUN_ID --web\n# After understanding the failure:\n# gh run rerun RUN_ID --failed",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Logs identify the first meaningful failure and link to artifacts.",
            "explanation": "A rerun is an experiment, not proof that the defect vanished."
          }
        }
      ],
      "mistakes": [
        "Required checks that never run on some PRs.",
        "Renaming a job without updating branch rules.",
        "Suppressing failures with || true or continue-on-error."
      ],
      "exercise": {
        "title": "Apply it: Quality Gates, Required Checks, and Pipeline Troubleshooting",
        "tasks": [
          "Classify a pipeline failure.",
          "Configure a stable required check in repository settings."
        ],
        "solution": {
          "title": "Failure triage checklist",
          "filename": "Failure triage checklist",
          "code": "1. Identify the first failed step.\n2. Record commit, runner, Node, browser, and image versions.\n3. Inspect the assertion and failure artifact.\n4. Reproduce the same command locally or in the same image.\n5. Fix the root cause and verify a clean run.",
          "command": "Use on a deliberately failing practice branch.",
          "expected": "The investigation leads to evidence rather than repeated blind reruns.",
          "explanation": "Keep checks failing until the underlying requirement is satisfied."
        }
      },
      "takeaway": "Make failures actionable and keep merge decisions tied to stable checks."
    }
  },
  {
    "number": 20,
    "slug": "docker-fundamentals",
    "title": "Docker Fundamentals: Images, Containers, and Registries",
    "description": "Separate an application image from each running container instance.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Separate an application image from each running container instance.",
      "objectives": [
        "Explain image, container, registry, and volume.",
        "Identify why a tag is not an immutable version."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "An image is a packaged filesystem and configuration. A container is a running or stopped instance created from that image. A registry distributes images.",
            "Containers share the host kernel through the container runtime; they are not full virtual machines. Browser binaries still depend on compatible operating system libraries and CPU architecture.",
            "Tags such as latest or node:24 are mutable labels. A digest identifies image content. Record versions and pin approved digests when repeatability requires immutable inputs.",
            "Container writable layers are disposable. Use intentional volumes for persistent database data, and bind mounts or copied artifacts for test evidence."
          ]
        },
        {
          "title": "Example 1: Run a short-lived Node container",
          "paragraphs": [],
          "example": {
            "title": "Run a short-lived Node container",
            "filename": "Run a short-lived Node container",
            "code": "docker version\ndocker run --rm node:24-bookworm-slim node --version\ndocker image ls",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The Node command runs inside a container that is removed afterward.",
            "explanation": "Docker must be installed and its engine running; image downloads require network access."
          }
        }
      ],
      "mistakes": [
        "Expecting files in a removed container to persist.",
        "Assuming an image tag can never change.",
        "Using a browser image built for an incompatible architecture."
      ],
      "exercise": {
        "title": "Apply it: Docker Fundamentals: Images, Containers, and Registries",
        "tasks": [
          "Explain image, container, registry, and volume.",
          "Identify why a tag is not an immutable version."
        ],
        "solution": {
          "title": "Inspect an image identity",
          "filename": "Inspect an image identity",
          "code": "docker image inspect node:24-bookworm-slim --format \"{{json .RepoDigests}}\"",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The pulled image content digest is displayed.",
          "explanation": "Use an actual returned digest; do not invent one."
        }
      },
      "takeaway": "Separate an application image from each running container instance."
    }
  },
  {
    "number": 21,
    "slug": "daily-docker-commands",
    "title": "Daily Docker Commands, Logs, Ports, Volumes, and Networks",
    "description": "Inspect a test container before changing or deleting it.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Inspect a test container before changing or deleting it.",
      "objectives": [
        "Inspect logs and running processes.",
        "Explain host ports versus container ports."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "docker ps shows running containers; ps -a includes stopped ones. logs reads captured process output. exec starts another process in a running container.",
            "Port publishing maps a host port to a container port. localhost inside one container refers to that container, not a sibling service.",
            "On a user-defined network, containers can address each other by network aliases or Compose service names. Bind host ports to 127.0.0.1 for local-only exercises.",
            "Remove only resources owned by the exercise. docker system prune and volume deletion are broad cleanup operations and can remove unrelated work."
          ]
        },
        {
          "title": "Quick reference",
          "paragraphs": [],
          "table": {
            "headers": [
              "Daily task",
              "Command"
            ],
            "rows": [
              [
                "Running / all containers",
                "docker ps / docker ps -a"
              ],
              [
                "Recent logs",
                "docker logs --tail 100 NAME"
              ],
              [
                "Follow logs",
                "docker logs -f NAME"
              ],
              [
                "Run a diagnostic process",
                "docker exec NAME COMMAND"
              ],
              [
                "Resource use",
                "docker stats --no-stream"
              ],
              [
                "Stop then remove",
                "docker stop NAME / docker rm NAME"
              ],
              [
                "Compose status",
                "docker compose ps -a"
              ]
            ]
          }
        },
        {
          "title": "Example 1: Observe a disposable container",
          "paragraphs": [],
          "example": {
            "title": "Observe a disposable container",
            "filename": "Observe a disposable container",
            "code": "docker run -d --name sdet-node-demo node:24-bookworm-slim node -e \"setInterval(() => console.log('alive'), 1000)\"\ndocker ps\ndocker logs --tail 10 sdet-node-demo\ndocker exec sdet-node-demo node --version\ndocker stop sdet-node-demo\ndocker rm sdet-node-demo",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "You inspect logs and Node version, then stop and remove only this container.",
            "explanation": "Stopping and removing are different operations; logs remain available for a stopped container until removal."
          }
        }
      ],
      "mistakes": [
        "Using localhost to reach a sibling container.",
        "Deleting all volumes to fix one test.",
        "Confusing container and image removal."
      ],
      "exercise": {
        "title": "Apply it: Daily Docker Commands, Logs, Ports, Volumes, and Networks",
        "tasks": [
          "Inspect logs and running processes.",
          "Explain host ports versus container ports."
        ],
        "solution": {
          "title": "Inspect networks and mounts",
          "filename": "Inspect networks and mounts",
          "code": "docker network ls\ndocker volume ls\n# For an actual existing container:\n# docker inspect CONTAINER_NAME",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Docker lists networks and volumes without deleting them.",
          "explanation": "Inspect the Mounts and NetworkSettings sections when troubleshooting."
        }
      },
      "takeaway": "Inspect a test container before changing or deleting it."
    }
  },
  {
    "number": 22,
    "slug": "dockerfiles",
    "title": "Dockerfiles, Build Context, and .dockerignore",
    "description": "Build a small application image with explicit dependencies and runtime behavior.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Build a small application image with explicit dependencies and runtime behavior.",
      "objectives": [
        "Build and run the application image.",
        "Explain why EXPOSE does not publish a host port."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "The build context is the directory sent to the builder. COPY reads from that context, not arbitrary host locations.",
            "Copy manifests before source so an unchanged dependency layer can be reused. npm ci requires the committed lockfile.",
            "This application runs JavaScript directly, so it does not need a compilation stage. A TypeScript application with emitted output could use a build stage and copy only runtime output into a final image.",
            "Use runtime environment variables for configuration. Do not bake secrets into Dockerfile ENV, build arguments, or copied .env files; build secrets require a proper secret mount when genuinely needed."
          ]
        },
        {
          "title": "Example 1: Dockerfile.app",
          "paragraphs": [],
          "example": {
            "title": "Dockerfile.app",
            "filename": "Dockerfile.app",
            "code": "FROM node:24-bookworm-slim\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci --omit=dev\nCOPY server.mjs ./\nENV APP_HOST=0.0.0.0\nEXPOSE 4173\nUSER node\nCMD [\"node\", \"server.mjs\"]",
            "command": "docker build -f Dockerfile.app -t sdet-ci-app .\ndocker run --rm --name sdet-ci-app -p 127.0.0.1:4173:4173 sdet-ci-app",
            "expected": "The practice app is reachable on the host at port 4173.",
            "explanation": "EXPOSE documents the container port; -p publishes it. The process must listen on 0.0.0.0 inside the container."
          }
        },
        {
          "title": "Example 2: .dockerignore",
          "paragraphs": [],
          "example": {
            "title": ".dockerignore",
            "filename": ".dockerignore",
            "code": "node_modules\n.git\n.env\n.env.*\n!.env.example\nplaywright-report\ntest-results\ncypress/screenshots\ncypress/videos\nartifacts\n.DS_Store",
            "command": "Save before building images.",
            "expected": "Local dependencies, secrets, and reports stay out of the build context.",
            "explanation": "A .gitignore does not replace .dockerignore. COPY instructions should still be narrow."
          }
        }
      ],
      "mistakes": [
        "Copying host node_modules into a Linux image.",
        "Baking credentials into layers.",
        "Binding the app to container loopback and expecting published ports to work."
      ],
      "exercise": {
        "title": "Apply it: Dockerfiles, Build Context, and .dockerignore",
        "tasks": [
          "Build and run the application image.",
          "Explain why EXPOSE does not publish a host port."
        ],
        "solution": {
          "title": "Verify the running app from another terminal",
          "filename": "Verify the running app from another terminal",
          "code": "curl --fail http://127.0.0.1:4173/health\n# Stop the named container when finished:\ndocker stop sdet-ci-app",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Health reports ok using memory storage.",
          "explanation": "Stop any local npm start process first so the host port is available."
        }
      },
      "takeaway": "Build a small application image with explicit dependencies and runtime behavior."
    }
  },
  {
    "number": 23,
    "slug": "browser-test-containers",
    "title": "Running Playwright and Cypress in Containers",
    "description": "Package browser dependencies while preserving test exit codes and evidence.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Package browser dependencies while preserving test exit codes and evidence.",
      "objectives": [
        "Run one browser suite in its image.",
        "Retain reports outside the container."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "The Playwright image includes browsers and Linux dependencies, but npm ci still installs the project package. Match the package and image version.",
            "Cypress browsers images provide browsers and OS dependencies; npm ci installs the project Cypress version and its binary. Choose a supported architecture and verify the selected image contains Chrome.",
            "latest is used only as an exploratory starting point for the Cypress browser image. Resolve and record a digest for the actual build; a new pull can select different content.",
            "Bind report directories when you need evidence after a --rm container exits. Avoid masking dependency directories with a host source bind mount."
          ]
        },
        {
          "title": "Example 1: Dockerfile.playwright",
          "paragraphs": [],
          "example": {
            "title": "Dockerfile.playwright",
            "filename": "Dockerfile.playwright",
            "code": "ARG PW_VERSION=1.64.1\nFROM mcr.microsoft.com/playwright:v${PW_VERSION}-noble\nWORKDIR /work\nENV CI=true\nENV CYPRESS_INSTALL_BINARY=0\nCOPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npx\", \"playwright\", \"test\"]",
            "command": "docker build -f Dockerfile.playwright --build-arg PW_VERSION=1.64.1 -t sdet-pw .\ndocker run --rm --init --ipc=host sdet-pw",
            "expected": "Playwright runs the tests and starts the app inside the same container.",
            "explanation": "The image browsers and installed Playwright package must have the same version. This example uses trusted local app content; it is not a sandbox for arbitrary external sites."
          }
        },
        {
          "title": "Example 2: Dockerfile.cypress",
          "paragraphs": [],
          "example": {
            "title": "Dockerfile.cypress",
            "filename": "Dockerfile.cypress",
            "code": "ARG CYPRESS_BASE=cypress/browsers:latest\nFROM ${CYPRESS_BASE}\nWORKDIR /work\nENV CI=true\nCOPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npm\", \"run\", \"test:cy\"]",
            "command": "Pull a browser image, resolve its digest, and build using the commands in the next example.",
            "expected": "The installed Cypress package runs against Chrome included in the selected image.",
            "explanation": "Unlike the Playwright image build, this build must not set CYPRESS_INSTALL_BINARY=0."
          }
        },
        {
          "title": "Example 3: Resolve the Cypress image and run",
          "paragraphs": [],
          "example": {
            "title": "Resolve the Cypress image and run",
            "filename": "Resolve the Cypress image and run",
            "code": "docker pull cypress/browsers:latest\nCYPRESS_IMAGE_REF=$(docker image inspect cypress/browsers:latest --format \"{{index .RepoDigests 0}}\")\ndocker build -f Dockerfile.cypress --build-arg CYPRESS_BASE=\"$CYPRESS_IMAGE_REF\" -t sdet-cy .\ndocker run --rm --init sdet-cy",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "The run uses the image content resolved for this build.",
            "explanation": "The shell variable is task-specific. Record its value alongside the lockfile for reproduction."
          }
        }
      ],
      "mistakes": [
        "Using a mismatched Playwright image.",
        "Skipping the Cypress binary in the Cypress test image.",
        "Ignoring the container exit code."
      ],
      "exercise": {
        "title": "Apply it: Running Playwright and Cypress in Containers",
        "tasks": [
          "Run one browser suite in its image.",
          "Retain reports outside the container."
        ],
        "solution": {
          "title": "Keep Playwright evidence",
          "filename": "Keep Playwright evidence",
          "code": "mkdir -p playwright-report test-results\ndocker run --rm --init --ipc=host \\\n  -v \"$PWD/playwright-report:/work/playwright-report\" \\\n  -v \"$PWD/test-results:/work/test-results\" \\\n  sdet-pw",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "Report output survives container removal.",
          "explanation": "Host file ownership can differ on Linux; choose a deliberate user/ownership strategy for shared environments."
        }
      },
      "takeaway": "Package browser dependencies while preserving test exit codes and evidence."
    }
  },
  {
    "number": 24,
    "slug": "compose-environment",
    "title": "Docker Compose: Application, API, and PostgreSQL",
    "description": "Run the same application against a real database-backed service environment.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Run the same application against a real database-backed service environment.",
      "objectives": [
        "Start healthy app and database services.",
        "Explain service DNS and host port mapping."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Compose defines related services, networks, volumes, and readiness conditions. Our one app process serves both HTML and API routes; PostgreSQL is a separate service.",
            "The app health check queries the products table. A listening database socket alone does not prove initialization and schema readiness.",
            "The browser test services have a tests profile so ordinary compose up starts only db and app. Explicitly running a test service enables that service.",
            "The practice credentials are disposable local values. Use an appropriate secret mechanism and restricted roles for real environments.",
            "The existing tests work in both memory and PostgreSQL modes, but passing them does not by itself prove the source was PostgreSQL. Verify /health reports postgres and use additional persistence-specific assertions for richer applications."
          ]
        },
        {
          "title": "Example 1: db/init.sql",
          "paragraphs": [],
          "example": {
            "title": "db/init.sql",
            "filename": "db/init.sql",
            "code": "CREATE TABLE products (\n  id text PRIMARY KEY,\n  name text NOT NULL,\n  price_cents integer NOT NULL CHECK (price_cents >= 0)\n);\nINSERT INTO products VALUES ('p1', 'Keyboard', 2500);",
            "command": "Mounted into the PostgreSQL image initialization directory by Compose.",
            "expected": "The database contains the product expected by both test frameworks.",
            "explanation": "Initialization scripts run only when the database data directory is first initialized, not on every restart."
          }
        },
        {
          "title": "Example 2: compose.yaml",
          "paragraphs": [],
          "example": {
            "title": "compose.yaml",
            "filename": "compose.yaml",
            "code": "services:\n  db:\n    image: postgres:18\n    environment:\n      POSTGRES_USER: sdet\n      POSTGRES_PASSWORD: local-demo\n      POSTGRES_DB: ci_shop\n    volumes:\n      - pgdata:/var/lib/postgresql\n      - ./db/init.sql:/docker-entrypoint-initdb.d/001-init.sql:ro\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U sdet -d ci_shop\"]\n      interval: 2s\n      timeout: 5s\n      retries: 20\n\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile.app\n    environment:\n      DATABASE_URL: postgresql://sdet:local-demo@db:5432/ci_shop\n      APP_HOST: 0.0.0.0\n    ports:\n      - \"127.0.0.1:4173:4173\"\n    depends_on:\n      db:\n        condition: service_healthy\n    healthcheck:\n      test: [\"CMD\", \"node\", \"-e\", \"fetch('http://127.0.0.1:4173/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\"]\n      interval: 2s\n      timeout: 5s\n      retries: 20\n\n  playwright:\n    profiles: [tests]\n    init: true\n    shm_size: 1gb\n    build:\n      context: .\n      dockerfile: Dockerfile.playwright\n      args:\n        PW_VERSION: ${PW_VERSION:-1.64.1}\n    environment:\n      BASE_URL: http://app:4173\n      CI: \"true\"\n    volumes:\n      - ./playwright-report:/work/playwright-report\n      - ./test-results:/work/test-results\n    depends_on:\n      app:\n        condition: service_healthy\n\n  cypress:\n    profiles: [tests]\n    init: true\n    build:\n      context: .\n      dockerfile: Dockerfile.cypress\n      args:\n        CYPRESS_BASE: ${CYPRESS_BASE:-cypress/browsers:latest}\n    environment:\n      CYPRESS_BASE_URL: http://app:4173\n      CI: \"true\"\n    command: [\"npx\", \"cypress\", \"run\", \"--browser\", \"chrome\"]\n    volumes:\n      - ./cypress/screenshots:/work/cypress/screenshots\n      - ./cypress/videos:/work/cypress/videos\n    depends_on:\n      app:\n        condition: service_healthy\n\nvolumes:\n  pgdata:",
            "command": "docker compose up -d --build --wait db app\ncurl --fail http://127.0.0.1:4173/health",
            "expected": "Health reports storage: postgres.",
            "explanation": "The app uses the db service name on the internal network. The database port is not published to the host."
          }
        }
      ],
      "mistakes": [
        "Using localhost for app-to-database traffic.",
        "Assuming depends_on without health checks means readiness.",
        "Expecting init.sql changes to rerun on an existing volume."
      ],
      "exercise": {
        "title": "Apply it: Docker Compose: Application, API, and PostgreSQL",
        "tasks": [
          "Start healthy app and database services.",
          "Explain service DNS and host port mapping."
        ],
        "solution": {
          "title": "Run the Playwright service",
          "filename": "Run the Playwright service",
          "code": "docker compose build playwright\ndocker compose run --rm --no-deps playwright\ndocker compose ps",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The test container reaches http://app:4173 and verifies the seeded API contract.",
          "explanation": "Run after the app is healthy. BASE_URL prevents Playwright from starting a second local server."
        }
      },
      "takeaway": "Run the same application against a real database-backed service environment."
    }
  },
  {
    "number": 25,
    "slug": "container-debugging",
    "title": "Container Readiness, Test Data, Cleanup, and Debugging",
    "description": "Diagnose environment failures while preserving useful evidence.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Diagnose environment failures while preserving useful evidence.",
      "objectives": [
        "Collect logs before teardown.",
        "Explain when volume deletion is appropriate."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "An unhealthy app may indicate an unavailable database, missing schema, or invalid configuration. Inspect service logs before rebuilding everything.",
            "Use a unique Compose project name per isolated CI run. This separates default networks and named volumes, but fixed published host ports can still conflict on the same machine.",
            "Local compose down removes the project containers and network while retaining named data volumes by default. down --volumes intentionally deletes this project data; reserve it for disposable environments or a deliberate reset.",
            "Readiness is not a permanent guarantee. Services can fail after startup, so assertions and requests still need bounded timeouts.",
            "On assertion failure, collect logs before removing containers. On process termination, automatic cleanup may not run; scope resources so subsequent cleanup is identifiable."
          ]
        },
        {
          "title": "Example 1: Inspect before cleanup",
          "paragraphs": [],
          "example": {
            "title": "Inspect before cleanup",
            "filename": "Inspect before cleanup",
            "code": "docker compose ps -a\ndocker compose logs --no-color --tail 100 app db\ndocker compose exec db psql -U sdet -d ci_shop -c \"SELECT * FROM products;\"\ndocker compose exec app node -e \"fetch('http://127.0.0.1:4173/health').then(r=>r.text()).then(console.log)\"",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Logs and direct checks distinguish schema, networking, and application failures.",
            "explanation": "Do not print the complete environment when it may contain credentials."
          }
        },
        {
          "title": "Example 2: Normal local shutdown",
          "paragraphs": [],
          "example": {
            "title": "Normal local shutdown",
            "filename": "Normal local shutdown",
            "code": "docker compose down",
            "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
            "expected": "Containers and network stop; the named database volume remains.",
            "explanation": "For an intentional disposable reset only: docker compose down --volumes. This deletes the practice database data."
          }
        }
      ],
      "mistakes": [
        "Deleting volumes before diagnosing a failure.",
        "Waiting a fixed sleep instead of checking readiness.",
        "Assuming container running means application ready."
      ],
      "exercise": {
        "title": "Apply it: Container Readiness, Test Data, Cleanup, and Debugging",
        "tasks": [
          "Collect logs before teardown.",
          "Explain when volume deletion is appropriate."
        ],
        "solution": {
          "title": "Isolation checklist",
          "filename": "Isolation checklist",
          "code": "Unique test data IDs\nUnique Compose project name per CI run\nNo fixed published ports shared by simultaneous local runs\nBounded health checks and test timeouts\nReports copied before cleanup\nExplicit ownership of resources to remove",
          "command": "Use when adding concurrency or self-hosted runners.",
          "expected": "Isolation prevents one test run from contaminating another.",
          "explanation": "A unique project name alone does not make shared external services or published ports unique."
        }
      },
      "takeaway": "Diagnose environment failures while preserving useful evidence."
    }
  },
  {
    "number": 26,
    "slug": "complete-sdet-pipeline",
    "title": "Complete SDET Pipeline with GitHub Actions and Docker",
    "description": "Bring reviewed Git changes, quality checks, browser containers, and PostgreSQL into one verification pipeline.",
    "group": "Docker and integration",
    "content": {
      "introduction": "Bring reviewed Git changes, quality checks, browser containers, and PostgreSQL into one verification pipeline.",
      "objectives": [
        "Run the complete pipeline from a feature branch.",
        "Introduce a wrong product price expectation and inspect the failing job.",
        "Restore the assertion and verify a passing run.",
        "Identify the exact check names to require before merge."
      ],
      "sections": [
        {
          "title": "Concepts and daily use",
          "paragraphs": [
            "Complete the practice files from Chapters 13, 14, and 22–24. Generate package-lock.json with npm install and commit it. This final workflow replaces the earlier basic verification workflows to avoid duplicate runs.",
            "The quality job validates source before slower browser jobs. Each browser job receives its own fresh hosted runner and Compose project, so both can use the same published port without sharing a host.",
            "The workflow derives the Playwright image version from the lockfile. The Cypress image digest is captured for each exploratory run; pin an approved digest to make future runs use the same base.",
            "Assertions must fail the job. Evidence steps run after ordinary failures, and the final cleanup deletes only the disposable Compose project resources.",
            "This pipeline does not deploy an application, publish images, or validate a production environment. It verifies the supplied practice application and its database-backed product read.",
            "The practice bundle includes only this final workflow enabled. Earlier workflow examples remain in the lessons and can be added deliberately when learning each topic."
          ]
        },
        {
          "title": "Example 1: .github/workflows/sdet-pipeline.yml",
          "paragraphs": [],
          "example": {
            "title": ".github/workflows/sdet-pipeline.yml",
            "filename": ".github/workflows/sdet-pipeline.yml",
            "code": "name: SDET pipeline\non:\n  push:\n    branches: [main]\n  pull_request:\n  workflow_dispatch:\npermissions:\n  contents: read\nconcurrency:\n  group: sdet-${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true\njobs:\n  quality:\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    env:\n      CYPRESS_INSTALL_BINARY: \"0\"\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm test\n\n  browser:\n    needs: quality\n    runs-on: ubuntu-latest\n    timeout-minutes: 30\n    strategy:\n      fail-fast: false\n      matrix:\n        framework: [playwright, cypress]\n    env:\n      COMPOSE_PROJECT_NAME: sdet-${{ github.run_id }}-${{ github.run_attempt }}-${{ matrix.framework }}\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-node@v7\n        with:\n          node-version: \"24\"\n      - name: Read Playwright version from lockfile\n        run: |\n          version=$(node -p \"require('./package-lock.json').packages['node_modules/@playwright/test'].version\")\n          echo \"PW_VERSION=$version\" >> \"$GITHUB_ENV\"\n      - name: Resolve Cypress browser image\n        if: matrix.framework == 'cypress'\n        run: |\n          docker pull cypress/browsers:latest\n          image=$(docker image inspect cypress/browsers:latest --format '{{index .RepoDigests 0}}')\n          echo \"CYPRESS_BASE=$image\" >> \"$GITHUB_ENV\"\n          echo \"Browser image: $image\"\n      - name: Prepare evidence directories\n        run: mkdir -p artifacts playwright-report test-results cypress/screenshots cypress/videos\n      - name: Start database and app\n        run: docker compose up -d --build --wait --wait-timeout 120 db app\n      - name: Verify database-backed readiness\n        run: |\n          node --input-type=module -e \"import assert from 'node:assert/strict'; const r=await fetch('http://127.0.0.1:4173/health'); assert.equal(r.status,200); assert.equal((await r.json()).storage,'postgres');\"\n      - name: Build test image\n        run: docker compose build ${{ matrix.framework }}\n      - name: Run test suite\n        run: docker compose run --rm --no-deps ${{ matrix.framework }}\n      - name: Collect service logs\n        if: ${{ !cancelled() }}\n        run: docker compose logs --no-color > artifacts/services.log\n      - name: Upload evidence\n        if: ${{ !cancelled() }}\n        uses: actions/upload-artifact@v7\n        with:\n          name: evidence-${{ matrix.framework }}\n          path: |\n            artifacts/\n            playwright-report/\n            test-results/\n            cypress/screenshots/\n            cypress/videos/\n          retention-days: 7\n          if-no-files-found: warn\n      - name: Remove disposable CI resources\n        if: ${{ always() }}\n        run: docker compose down --volumes --remove-orphans",
            "command": "Commit the complete practice project including its generated package-lock.json and push a branch or open a PR.",
            "expected": "Quality checks precede isolated Playwright and Cypress jobs; evidence is preserved and CI resources are removed.",
            "explanation": "The matrix values are hard-coded trusted identifiers. For immutable Cypress base selection across runs, replace exploratory latest resolution with an approved recorded digest."
          }
        }
      ],
      "mistakes": [
        "Publishing only the workflow without the source and lockfile.",
        "Letting test failure disappear behind cleanup or || true.",
        "Calling the sample a production deployment or complete security validation."
      ],
      "exercise": {
        "title": "Apply it: Complete SDET Pipeline with GitHub Actions and Docker",
        "tasks": [
          "Run the complete pipeline from a feature branch.",
          "Introduce a wrong product price expectation and inspect the failing job.",
          "Restore the assertion and verify a passing run.",
          "Identify the exact check names to require before merge."
        ],
        "solution": {
          "title": "Review and publish the pipeline change",
          "filename": "Review and publish the pipeline change",
          "code": "git switch -c ci/sdet-pipeline\ngit status --short\ngit add .github/workflows/sdet-pipeline.yml compose.yaml Dockerfile.app Dockerfile.playwright Dockerfile.cypress\ngit diff --staged\ngit commit -m \"ci: verify browser suites against PostgreSQL app\"\ngit push -u origin HEAD",
          "command": "Run in the disposable practice repository. Replace uppercase placeholders with your actual values; commands are examples, not a single script to run blindly.",
          "expected": "The focused pipeline commit is available for a pull request.",
          "explanation": "Commit the prerequisite source, test files, and package lock beforehand. Review all paths rather than blindly staging unrelated files."
        }
      },
      "takeaway": "Bring reviewed Git changes, quality checks, browser containers, and PostgreSQL into one verification pipeline."
    }
  }
];
