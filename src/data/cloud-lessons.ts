export type CloudExample = {
  title: string; filename: string; code: string;
  command: string; expected: string; explanation: string;
};
export type CloudSection = {
  title: string; paragraphs: string[]; bullets?: string[];
  example?: CloudExample;
  table?: { headers: string[]; rows: string[][] };
};
export type CloudLessonData = {
  number: number; slug: string; title: string; description: string;
  group: "Environment and identity" | "Services and test evidence" | "Release verification";
  content: {
    introduction: string; objectives: string[]; sections: CloudSection[];
    mistakes: string[];
    exercise: { title: string; tasks: string[]; solution: CloudExample };
    takeaway: string;
  };
};

export const cloudLessons: CloudLessonData[] = [
  {
    "number": 1,
    "slug": "order-export-journey",
    "title": "Map a cloud test to a user journey",
    "group": "Environment and identity",
    "description": "A shopper requests an order export. Decide what must be true before the UI can say it is ready.",
    "content": {
      "introduction": "A shopper requests an order export. Decide what must be true before the UI can say it is ready.",
      "objectives": [
        "Identify a failure a status-only API assertion misses.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "The example architecture accepts an HTTP request, places a message on SQS, runs a worker, and writes a CSV object to S3. The local lab supplies synthetic evidence from these boundaries.",
            "A 202 response means the service accepted work. Test acceptance separately from completion. Carry one request ID through the checks and verify the contents of the final file."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Map a cloud test to a user journey",
            "filename": "Map a cloud test to a user journey",
            "code": "POST /exports → 202 + request ID\nQueue → worker → CSV object\nRead result → check owner, rows and totals",
            "command": "Draw the flow on paper. Label each observation with its source.",
            "expected": "One request can be traced from acceptance to a verified file.",
            "explanation": "A 202 response means the service accepted work. Test acceptance separately from completion. Carry one request ID through the checks and verify the contents of the final file."
          }
        }
      ],
      "mistakes": [
        "Treating a healthy endpoint as proof that a particular export completed."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Identify a failure a status-only API assertion misses.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The queue consumer can fail after the API returns 202. The absence of a completed file for the returned ID exposes that failure.",
          "command": "Compare your notes with this example answer.",
          "expected": "One request can be traced from acceptance to a verified file.",
          "explanation": "Treating a healthy endpoint as proof that a particular export completed."
        }
      },
      "takeaway": "A shopper requests an order export. Decide what must be true before the UI can say it is ready."
    }
  },
  {
    "number": 2,
    "slug": "accounts-regions-and-availability",
    "title": "Accounts, Regions, and Availability Zones",
    "group": "Environment and identity",
    "description": "Identify the intended environment before attributing a result to the release.",
    "content": {
      "introduction": "Identify the intended environment before attributing a result to the release.",
      "objectives": [
        "Identify two ways a passing test could target the wrong deployment.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "An account provides an identity and resource boundary. A Region identifies a geographical service location. Availability Zones within a Region let an implementation place resources in distinct failure domains.",
            "A QA account and production account can use identical resource names. Capture the account, Region, resource identifier and release revision together. A successful single-zone test provides no failover evidence."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Accounts, Regions, and Availability Zones",
            "filename": "Accounts, Regions, and Availability Zones",
            "code": "Expected account: 111122223333 (fixture)\nExpected Region: ap-south-1\nExpected stage: qa\nExpected revision: candidate-42",
            "command": "Read fixtures/good.json in the practice folder. All identifiers are fictional.",
            "expected": "The fixture identifies the planned environment and revision.",
            "explanation": "A QA account and production account can use identical resource names. Capture the account, Region, resource identifier and release revision together. A successful single-zone test provides no failover evidence."
          }
        }
      ],
      "mistakes": [
        "Inferring account or Region from a display name."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Identify two ways a passing test could target the wrong deployment.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "A default CLI profile may select another account. A valid QA endpoint may still serve the previous revision. Check both before interpreting business assertions.",
          "command": "Compare your notes with this example answer.",
          "expected": "The fixture identifies the planned environment and revision.",
          "explanation": "Inferring account or Region from a display name."
        }
      },
      "takeaway": "Identify the intended environment before attributing a result to the release."
    }
  },
  {
    "number": 3,
    "slug": "cli-profiles-and-sso",
    "title": "AWS CLI, profiles, and temporary sessions",
    "group": "Environment and identity",
    "description": "Establish which identity will run the optional live checks.",
    "content": {
      "introduction": "Establish which identity will run the optional live checks.",
      "objectives": [
        "Describe what to do if the returned account is unexpected.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "For live examples, use AWS CLI v2 and an existing authorized QA account. A team using IAM Identity Center supplies its start URL or issuer, SSO Region, account and role. Local fixture exercises require only Node.js.",
            "Run the SSO wizard once to create a named profile. Login refreshes the session. Check the caller identity and select the service Region explicitly. Identity alone does not establish permission to read a specific object."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "AWS CLI, profiles, and temporary sessions",
            "filename": "AWS CLI, profiles, and temporary sessions",
            "code": "aws configure sso --profile sdet-qa\naws sso login --profile sdet-qa\naws sts get-caller-identity --profile sdet-qa --query '{Account:Account,Arn:Arn}'",
            "command": "Optional live exercise. Use your own authorized profile and compare the result with your environment record.",
            "expected": "The returned account and principal match the intended QA identity.",
            "explanation": "Run the SSO wizard once to create a named profile. Login refreshes the session. Check the caller identity and select the service Region explicitly. Identity alone does not establish permission to read a specific object."
          }
        }
      ],
      "mistakes": [
        "Pasting access keys, session tokens, or SSO responses into a test report."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Describe what to do if the returned account is unexpected.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Stop the live checks, inspect the selected profile and session, and rerun the identity check. Preserve the original comparison in the run notes.",
          "command": "Compare your notes with this example answer.",
          "expected": "The returned account and principal match the intended QA identity.",
          "explanation": "Pasting access keys, session tokens, or SSO responses into a test report."
        }
      },
      "takeaway": "Establish which identity will run the optional live checks."
    }
  },
  {
    "number": 4,
    "slug": "iam-permission-boundaries",
    "title": "IAM roles and permission checks",
    "group": "Environment and identity",
    "description": "Verify both permitted reads and denied operations with the intended role.",
    "content": {
      "introduction": "Verify both permitted reads and denied operations with the intended role.",
      "objectives": [
        "Explain why a failed read is insufficient evidence of access control.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "An IAM role has a trust policy governing who can assume it. Its permissions govern which actions the resulting session can perform. Other policy layers and explicit denies can further restrict access.",
            "For an export reader, object reads and bucket listing are separate permissions on different resource types. Decide whether the test truly needs bucket listing if the exact object key is already known."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "IAM roles and permission checks",
            "filename": "IAM roles and permission checks",
            "code": "Allow example: s3:GetObject on arn:aws:s3:::EXAMPLE-BUCKET/qa/exports/*\nSeparate action if required: s3:ListBucket on the bucket ARN\nNegative case: request a designated forbidden fixture with the same role",
            "command": "Design the permission matrix first. Use a designated denied fixture for an optional read-only negative check.",
            "expected": "The role can read the authorized fixture and cannot read the forbidden fixture.",
            "explanation": "For an export reader, object reads and bucket listing are separate permissions on different resource types. Decide whether the test truly needs bucket listing if the exact object key is already known."
          }
        }
      ],
      "mistakes": [
        "Treating every 403 or 404 as proof that a permission policy works."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Explain why a failed read is insufficient evidence of access control.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Verify the allowed control succeeds, verify independently that the denied fixture exists, then distinguish an authorization denial from a wrong key, Region, or expired session.",
          "command": "Compare your notes with this example answer.",
          "expected": "The role can read the authorized fixture and cannot read the forbidden fixture.",
          "explanation": "Treating every 403 or 404 as proof that a permission policy works."
        }
      },
      "takeaway": "Verify both permitted reads and denied operations with the intended role."
    }
  },
  {
    "number": 5,
    "slug": "network-path",
    "title": "VPCs, DNS, security groups, and runner access",
    "group": "Environment and identity",
    "description": "Trace the network path from the test runner to the target service.",
    "content": {
      "introduction": "Trace the network path from the test runner to the target service.",
      "objectives": [
        "Explain why adding AWS credentials might leave a timeout unchanged.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "A runner outside a VPC may resolve a hostname but lack a route to a private endpoint. Distinguish DNS, routing, TLS, application authorization, and response validation.",
            "Security groups are stateful. Network ACLs operate at subnet boundaries and are stateless. For private services use an approved runner or network path with appropriate rules."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "VPCs, DNS, security groups, and runner access",
            "filename": "VPCs, DNS, security groups, and runner access",
            "code": "Runner → DNS lookup → network connection → TLS → HTTP → application\nCompare: timeout / certificate error / 401 / wrong JSON",
            "command": "Classify each symptom before changing a security rule.",
            "expected": "The investigation narrows the failing layer.",
            "explanation": "Security groups are stateful. Network ACLs operate at subnet boundaries and are stateless. For private services use an approved runner or network path with appropriate rules."
          }
        }
      ],
      "mistakes": [
        "Opening an entire subnet or database to the internet to make a test pass."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Explain why adding AWS credentials might leave a timeout unchanged.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "A valid role cannot establish a missing network route. Confirm connectivity from the actual runner, then evaluate the application credential.",
          "command": "Compare your notes with this example answer.",
          "expected": "The investigation narrows the failing layer.",
          "explanation": "Opening an entire subnet or database to the internet to make a test pass."
        }
      },
      "takeaway": "Trace the network path from the test runner to the target service."
    }
  },
  {
    "number": 6,
    "slug": "compute-and-revisions",
    "title": "EC2, ECS, and Lambda release evidence",
    "group": "Services and test evidence",
    "description": "Choose a revision signal that matches the service running the workload.",
    "content": {
      "introduction": "Choose a revision signal that matches the service running the workload.",
      "objectives": [
        "Explain why one successful request is weak evidence during a weighted rollout.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "An EC2 instance, ECS task and Lambda function expose different release evidence. With ECS, compare the service deployment and task definition. With Lambda, check the alias target and any weighted routing.",
            "An image tag can move. Where available, capture the running image digest. A task definition or alias selection is configuration evidence and should be paired with a business probe."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "EC2, ECS, and Lambda release evidence",
            "filename": "EC2, ECS, and Lambda release evidence",
            "code": "aws ecs describe-services --cluster QA_CLUSTER --services QA_SERVICE --profile sdet-qa --region ap-south-1 --query '{services:services[].{status:status,task:taskDefinition,running:runningCount},failures:failures}'\naws lambda get-alias --function-name QA_FUNCTION --name qa --profile sdet-qa --region ap-south-1 --query '{version:FunctionVersion,weights:RoutingConfig}'",
            "command": "Optional alternatives. Substitute an existing service or function that your team owns.",
            "expected": "The observed revision and rollout state can be compared with the release plan.",
            "explanation": "An image tag can move. Where available, capture the running image digest. A task definition or alias selection is configuration evidence and should be paired with a business probe."
          }
        }
      ],
      "mistakes": [
        "Ignoring a non-empty ECS failures array because the CLI process succeeded."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Explain why one successful request is weak evidence during a weighted rollout.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "It may have reached the old revision. Correlate the response or request trace with the worker revision and account for traffic splitting.",
          "command": "Compare your notes with this example answer.",
          "expected": "The observed revision and rollout state can be compared with the release plan.",
          "explanation": "Ignoring a non-empty ECS failures array because the CLI process succeeded."
        }
      },
      "takeaway": "Choose a revision signal that matches the service running the workload."
    }
  },
  {
    "number": 7,
    "slug": "api-gateway-and-contracts",
    "title": "API Gateway, stages, and HTTP smoke tests",
    "group": "Services and test evidence",
    "description": "Check the deployed contract and capture a business correlation ID.",
    "content": {
      "introduction": "Check the deployed contract and capture a business correlation ID.",
      "objectives": [
        "Design a negative input test for an export endpoint.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "Identify the exact API stage and route before testing. Gates, throttles and application authorization can reject a request before the worker sees it.",
            "Use an approved synthetic order. Record response status, schema, business request ID and the service-generated request ID when supplied. Each identifier serves a different investigation."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "API Gateway, stages, and HTTP smoke tests",
            "filename": "API Gateway, stages, and HTTP smoke tests",
            "code": "Fixture response: {\"status\":202,\"requestId\":\"export-42\"}\nExpectation: status is 202 and the request ID is a nonempty string.\nThen locate evidence for that same export.",
            "command": "Inspect the acceptance record in fixtures/good.json.",
            "expected": "The accepted request is identifiable for downstream checks.",
            "explanation": "Use an approved synthetic order. Record response status, schema, business request ID and the service-generated request ID when supplied. Each identifier serves a different investigation."
          }
        }
      ],
      "mistakes": [
        "Finding an arbitrary recent worker message instead of the one for this request."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Design a negative input test for an export endpoint.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Use a designated invalid order in QA, assert the documented error and confirm no business job was created for the submitted correlation value.",
          "command": "Compare your notes with this example answer.",
          "expected": "The accepted request is identifiable for downstream checks.",
          "explanation": "Finding an arbitrary recent worker message instead of the one for this request."
        }
      },
      "takeaway": "Check the deployed contract and capture a business correlation ID."
    }
  },
  {
    "number": 8,
    "slug": "s3-output-validation",
    "title": "S3 keys, metadata, and exported file contents",
    "group": "Services and test evidence",
    "description": "Verify the correct object and its business contents independently.",
    "content": {
      "introduction": "Verify the correct object and its business contents independently.",
      "objectives": [
        "Explain how a present, non-empty CSV can still fail.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "S3 stores objects under keys in buckets. A prefix organizes keys. Knowing the exact key lets a test avoid scanning a shared bucket for the newest file.",
            "Check metadata with head-object, then read the expected object when body validation is required. An ETag is not universally the MD5 of an object. S3 provides strong read-after-write consistency for object reads after a successful write. An async worker may still be waiting to perform that write."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "S3 keys, metadata, and exported file contents",
            "filename": "S3 keys, metadata, and exported file contents",
            "code": "aws s3api head-object --bucket QA_BUCKET --key qa/exports/REQUEST_ID.csv --profile sdet-qa --region ap-south-1\naws s3api get-object --bucket QA_BUCKET --key qa/exports/REQUEST_ID.csv --profile sdet-qa --region ap-south-1 ./qa-export.csv",
            "command": "Optional live reads. Use a known synthetic object and a fresh local output path.",
            "expected": "The exact key, content type and CSV rows match independently prepared expectations.",
            "explanation": "Check metadata with head-object, then read the expected object when body validation is required. An ETag is not universally the MD5 of an object. S3 provides strong read-after-write consistency for object reads after a successful write. An async worker may still be waiting to perform that write."
          }
        }
      ],
      "mistakes": [
        "Using a file size or ETag as the only correctness assertion."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Explain how a present, non-empty CSV can still fail.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "The file may contain another order or the current catalog price instead of the purchase-time amount. Check each expected order ID and amount.",
          "command": "Compare your notes with this example answer.",
          "expected": "The exact key, content type and CSV rows match independently prepared expectations.",
          "explanation": "Using a file size or ETag as the only correctness assertion."
        }
      },
      "takeaway": "Verify the correct object and its business contents independently."
    }
  },
  {
    "number": 9,
    "slug": "sqs-retries-and-dlq",
    "title": "SQS retries, duplicate delivery, and dead-letter queues",
    "group": "Services and test evidence",
    "description": "Validate the business effect when a message is delivered more than once.",
    "content": {
      "introduction": "Validate the business effect when a message is delivered more than once.",
      "objectives": [
        "Evaluate two deliveries with one request ID but only one committed result.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "A standard SQS queue can deliver a message more than once. A consumer must handle duplicate work where the business contract requires one result.",
            "Visibility timeout temporarily hides a received message. If processing exceeds it, another consumer can receive that message. Redrive policies move repeatedly unsuccessful messages to a DLQ under configured conditions.",
            "Queue-depth attributes are approximate. They are useful operational context and insufficient to identify the outcome of a particular request. Receiving a live message also changes its visibility."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "SQS retries, duplicate delivery, and dead-letter queues",
            "filename": "SQS retries, duplicate delivery, and dead-letter queues",
            "code": "aws sqs get-queue-attributes --queue-url QA_QUEUE_URL --attribute-names VisibilityTimeout RedrivePolicy ApproximateNumberOfMessages --profile sdet-qa --region ap-south-1",
            "command": "Optional read-only inspection of a known QA queue.",
            "expected": "The queue configuration can be compared with retry and recovery expectations.",
            "explanation": "Queue-depth attributes are approximate. They are useful operational context and insufficient to identify the outcome of a particular request. Receiving a live message also changes its visibility."
          }
        }
      ],
      "mistakes": [
        "Polling receive-message on a shared queue merely to inspect traffic."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Evaluate two deliveries with one request ID but only one committed result.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Two delivery attempts can be valid. Require exactly one successful business effect and the expected final file. A second commit for the same request fails the test.",
          "command": "Compare your notes with this example answer.",
          "expected": "The queue configuration can be compared with retry and recovery expectations.",
          "explanation": "Polling receive-message on a shared queue merely to inspect traffic."
        }
      },
      "takeaway": "Validate the business effect when a message is delivered more than once."
    }
  },
  {
    "number": 10,
    "slug": "postgres-and-dynamodb",
    "title": "RDS PostgreSQL and DynamoDB validation",
    "group": "Services and test evidence",
    "description": "Pick a read path that supports the consistency contract of the assertion.",
    "content": {
      "introduction": "Pick a read path that supports the consistency contract of the assertion.",
      "objectives": [
        "Choose where to check an export immediately after a committed write.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "For RDS PostgreSQL, identify whether the connection targets the writer or a read replica. A replica can lag behind the write. Use the SQL track’s parameterized queries and bound the wait if delayed visibility is expected.",
            "For DynamoDB, read by the full primary key. A strongly consistent read can be requested on supported table reads. Global secondary indexes support eventually consistent reads."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "RDS PostgreSQL and DynamoDB validation",
            "filename": "RDS PostgreSQL and DynamoDB validation",
            "code": "aws dynamodb get-item --table-name QA_EXPORTS --key '{\"requestId\":{\"S\":\"export-42\"}}' --consistent-read --profile sdet-qa --region ap-south-1",
            "command": "Optional example for an existing table with exactly this key schema. Substitute your table and synthetic key.",
            "expected": "A matching item can be checked for owner and state; a successful response without Item means no item was returned.",
            "explanation": "For DynamoDB, read by the full primary key. A strongly consistent read can be requested on supported table reads. Global secondary indexes support eventually consistent reads."
          }
        }
      ],
      "mistakes": [
        "Treating a lagging read as proof of data loss."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Choose where to check an export immediately after a committed write.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Use the documented authoritative read path for an immediate assertion. If the user-facing contract is asynchronous, test that contract separately with a bounded deadline.",
          "command": "Compare your notes with this example answer.",
          "expected": "A matching item can be checked for owner and state; a successful response without Item means no item was returned.",
          "explanation": "Treating a lagging read as proof of data loss."
        }
      },
      "takeaway": "Pick a read path that supports the consistency contract of the assertion."
    }
  },
  {
    "number": 11,
    "slug": "cloudwatch-and-traces",
    "title": "CloudWatch logs, metrics, and trace correlation",
    "group": "Services and test evidence",
    "description": "Trace one failed export from the API through the worker.",
    "content": {
      "introduction": "Trace one failed export from the API through the worker.",
      "objectives": [
        "Diagnose an accepted request with a worker failure and no CSV.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "Logs capture events, metrics aggregate observations, and traces connect timed spans when instrumentation is present. Match a business request ID across services even when each service has its own execution ID.",
            "Use a bounded time interval and the expected log group. A missing log can indicate an incorrect query, delay, sampling, or missing instrumentation. Review the persisted output as independent evidence."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "CloudWatch logs, metrics, and trace correlation",
            "filename": "CloudWatch logs, metrics, and trace correlation",
            "code": "aws logs filter-log-events --log-group-name QA_LOG_GROUP --filter-pattern '{ $.requestId = \"export-42\" }' --start-time START_EPOCH_MS --end-time END_EPOCH_MS --profile sdet-qa --region ap-south-1 --query 'events[].message'",
            "command": "Optional live investigation. Replace both time boundaries with epoch milliseconds. This filter expects JSON logs.",
            "expected": "Matching events expose the request sequence and any failure classification.",
            "explanation": "Use a bounded time interval and the expected log group. A missing log can indicate an incorrect query, delay, sampling, or missing instrumentation. Review the persisted output as independent evidence."
          }
        }
      ],
      "mistakes": [
        "Logging credentials, entire customer records, or unrelated tenant data."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Diagnose an accepted request with a worker failure and no CSV.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Report acceptance as passed and completion as failed. Include the request ID, worker error category and time window. Preserve relevant sanitized evidence.",
          "command": "Compare your notes with this example answer.",
          "expected": "Matching events expose the request sequence and any failure classification.",
          "explanation": "Logging credentials, entire customer records, or unrelated tenant data."
        }
      },
      "takeaway": "Trace one failed export from the API through the worker."
    }
  },
  {
    "number": 12,
    "slug": "config-and-secrets",
    "title": "Environment configuration and secret handling",
    "group": "Services and test evidence",
    "description": "Detect configuration drift without exposing credential values.",
    "content": {
      "introduction": "Detect configuration drift without exposing credential values.",
      "objectives": [
        "Design a rotation check without printing the secret.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "Choose a configuration contract for each environment. For example, a QA worker may be required to use a QA export prefix and a particular secret reference.",
            "The tester can inspect secret metadata where authorized. The application role is the appropriate subject for a runtime connectivity test. Reading the plaintext secret as a tester answers a different question."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Environment configuration and secret handling",
            "filename": "Environment configuration and secret handling",
            "code": "aws secretsmanager describe-secret --secret-id QA_SECRET --profile sdet-qa --region ap-south-1 --query '{name:Name,rotation:RotationEnabled,changed:LastChangedDate}'",
            "command": "Optional metadata read. Keep identifiers within your team’s reporting policy.",
            "expected": "Metadata can be compared with the intended environment and rotation policy.",
            "explanation": "The tester can inspect secret metadata where authorized. The application role is the appropriate subject for a runtime connectivity test. Reading the plaintext secret as a tester answers a different question."
          }
        }
      ],
      "mistakes": [
        "Dumping Lambda environment variables or decrypted parameters into CI output."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Design a rotation check without printing the secret.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Perform a permitted end-to-end operation across the rotation window, verify service recovery and inspect sanitized errors or version metadata.",
          "command": "Compare your notes with this example answer.",
          "expected": "Metadata can be compared with the intended environment and rotation policy.",
          "explanation": "Dumping Lambda environment variables or decrypted parameters into CI output."
        }
      },
      "takeaway": "Detect configuration drift without exposing credential values."
    }
  },
  {
    "number": 13,
    "slug": "bounded-verification",
    "title": "Bounded polling and failure classification",
    "group": "Release verification",
    "description": "Wait for an asynchronous outcome while preserving useful failure signals.",
    "content": {
      "introduction": "Wait for an asynchronous outcome while preserving useful failure signals.",
      "objectives": [
        "Explain why retrying every exception until success can conceal a defect.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "Poll the record for the captured request ID. Stop when the required state appears, a terminal failure occurs, or the agreed deadline expires.",
            "Give each network attempt its own timeout within the remaining budget. Retry only classified transient conditions. Log attempt count and elapsed time without logging credentials."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Bounded polling and failure classification",
            "filename": "Bounded polling and failure classification",
            "code": "accepted → processing → ready: verify CSV\naccepted → failed: stop with worker reason\n403: surface authorization failure\nprocessing beyond deadline: report timeout and last state",
            "command": "Work through the timelines on paper. Choose the deadline from the stated requirement.",
            "expected": "A terminal failure is reported immediately and a stalled operation produces bounded evidence.",
            "explanation": "Give each network attempt its own timeout within the remaining budget. Retry only classified transient conditions. Log attempt count and elapsed time without logging credentials."
          }
        }
      ],
      "mistakes": [
        "Using a fixed long sleep then selecting the latest export."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Explain why retrying every exception until success can conceal a defect.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "A wrong role might produce repeated 403s. Retrying until the deadline hides the actionable authorization error and delays diagnosis.",
          "command": "Compare your notes with this example answer.",
          "expected": "A terminal failure is reported immediately and a stalled operation produces bounded evidence.",
          "explanation": "Using a fixed long sleep then selecting the latest export."
        }
      },
      "takeaway": "Wait for an asynchronous outcome while preserving useful failure signals."
    }
  },
  {
    "number": 14,
    "slug": "ci-oidc",
    "title": "GitHub Actions and short-lived AWS identity",
    "group": "Release verification",
    "description": "Separate local pull-request checks from an authorized cloud smoke job.",
    "content": {
      "introduction": "Separate local pull-request checks from an authorized cloud smoke job.",
      "objectives": [
        "Identify what must change if the job uses environment qa.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "The supplied CI workflow runs the fixture tests without an AWS identity. A live QA job additionally needs a preconfigured IAM OIDC provider and role.",
            "Restrict the role trust policy to the intended repository and branch or environment. A job requesting an OIDC token needs id-token: write. The AWS role permissions determine its permitted AWS operations."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "GitHub Actions and short-lived AWS identity",
            "filename": "GitHub Actions and short-lived AWS identity",
            "code": "permissions:\n  contents: read\n  id-token: write\n# Example trust conditions for a branch-based subject:\n# token.actions.githubusercontent.com:aud = sts.amazonaws.com\n# token.actions.githubusercontent.com:sub = repo:ORG/REPO:ref:refs/heads/main",
            "command": "Design fragment for a trusted live workflow. If using a GitHub environment, use its environment-form subject and configure deployment protection.",
            "expected": "An approved job assumes the scoped QA role and verifies the expected account before resource reads.",
            "explanation": "Restrict the role trust policy to the intended repository and branch or environment. A job requesting an OIDC token needs id-token: write. The AWS role permissions determine its permitted AWS operations."
          }
        }
      ],
      "mistakes": [
        "Exposing a privileged role to arbitrary pull-request code."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Identify what must change if the job uses environment qa.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Trust the exact repo:ORG/REPO:environment:qa subject and protect that environment. Verify the account and Region again after assuming the role.",
          "command": "Compare your notes with this example answer.",
          "expected": "An approved job assumes the scoped QA role and verifies the expected account before resource reads.",
          "explanation": "Exposing a privileged role to arbitrary pull-request code."
        }
      },
      "takeaway": "Separate local pull-request checks from an authorized cloud smoke job."
    }
  },
  {
    "number": 15,
    "slug": "cost-and-cleanup",
    "title": "Cost controls, test ownership, and cleanup",
    "group": "Release verification",
    "description": "Give each cloud exercise a resource owner, a limit, and a verifiable end state.",
    "content": {
      "introduction": "Give each cloud exercise a resource owner, a limit, and a verifiable end state.",
      "objectives": [
        "Explain why deleting all objects under qa/ is unsafe in a parallel suite.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "The optional CLI examples read existing resources. Live AWS requests and associated services can incur costs depending on the account and configuration. The local lab has no AWS runtime dependency.",
            "For provisioning exercises in your own team, tag resources with a run ID and owner, define retention, and check for leftovers after a failed run. A budget alert warns about spend and does not generally impose a hard cap."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Cost controls, test ownership, and cleanup",
            "filename": "Cost controls, test ownership, and cleanup",
            "code": "Run: qa-2026-001\nAllowed scope: named QA resources and owned output prefix\nRetention: agreed evidence window\nCleanup owner: test runner or lifecycle policy\nFinal check: inventory by run ID",
            "command": "Create an ownership checklist for an export produced by a live test.",
            "expected": "The team can identify what may be removed and which evidence must remain.",
            "explanation": "For provisioning exercises in your own team, tag resources with a run ID and owner, define retention, and check for leftovers after a failed run. A budget alert warns about spend and does not generally impose a hard cap."
          }
        }
      ],
      "mistakes": [
        "Running broad cleanup on shared QA infrastructure."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Explain why deleting all objects under qa/ is unsafe in a parallel suite.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Other runs share that prefix. Use a unique run-owned subprefix and verify ownership before removing anything.",
          "command": "Compare your notes with this example answer.",
          "expected": "The team can identify what may be removed and which evidence must remain.",
          "explanation": "Running broad cleanup on shared QA infrastructure."
        }
      },
      "takeaway": "Give each cloud exercise a resource owner, a limit, and a verifiable end state."
    }
  },
  {
    "number": 16,
    "slug": "cloud-export-project",
    "title": "Project: verify an AWS order-export release",
    "group": "Release verification",
    "description": "Combine identity, deployment, queue and file evidence into one release decision.",
    "content": {
      "introduction": "Combine identity, deployment, queue and file evidence into one release decision.",
      "objectives": [
        "Add a missing-file fixture, then write a release note that distinguishes the verified boundary from remaining uncertainty.",
        "Explain what the evidence establishes and which observation is still missing."
      ],
      "sections": [
        {
          "title": "The test decision",
          "paragraphs": [
            "Run the provided Node practice verifier against the good fixture and the supplied fault fixtures. The snapshots model the service evidence collected by a tester.",
            "The fixture acceptance criteria require the QA account, target Region, candidate revision, accepted request, one committed business effect and one CSV containing independently expected rows. The two delivery attempts in the good fixture are deliberate.",
            "The verifier reports all failed assertions so an investigator can distinguish a wrong environment, a duplicate commit and a wrong file. The optional live chapters explain where equivalent evidence could be collected."
          ]
        },
        {
          "title": "Worked example",
          "paragraphs": [],
          "example": {
            "title": "Project: verify an AWS order-export release",
            "filename": "Project: verify an AWS order-export release",
            "code": "node --test\nnode verify.mjs fixtures/good.json\nnode verify.mjs fixtures/wrong-account.json\nnode verify.mjs fixtures/duplicate-commit.json\nnode verify.mjs fixtures/wrong-total.json",
            "command": "Run in practice-project with Node.js 24. The last three commands are intentional negative controls and should exit nonzero.",
            "expected": "The good fixture passes. Each negative control fails for the specified reason.",
            "explanation": "The verifier reports all failed assertions so an investigator can distinguish a wrong environment, a duplicate commit and a wrong file. The optional live chapters explain where equivalent evidence could be collected."
          }
        }
      ],
      "mistakes": [
        "Claiming the fixture run tested real account access, network routes or cloud availability."
      ],
      "exercise": {
        "title": "Apply it to an order export",
        "tasks": [
          "Add a missing-file fixture, then write a release note that distinguishes the verified boundary from remaining uncertainty.",
          "Record the expected outcome before inspecting the result."
        ],
        "solution": {
          "title": "Example answer",
          "filename": "Example answer",
          "code": "Remove the matching object. Expect the object-count assertion to fail. Report the request ID, stage, candidate revision, missing artifact and whether the observations are live or synthetic.",
          "command": "Compare your notes with this example answer.",
          "expected": "The good fixture passes. Each negative control fails for the specified reason.",
          "explanation": "Claiming the fixture run tested real account access, network routes or cloud availability."
        }
      },
      "takeaway": "Combine identity, deployment, queue and file evidence into one release decision."
    }
  }
];
