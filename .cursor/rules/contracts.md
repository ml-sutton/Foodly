# Design by Contract (DbC) Rules

These rules apply to all Go, Hono (TypeScript), and Next.js code.

---

## Core Principles

Every non-trivial function MUST enforce:

- Preconditions (REQUIRE) → validate inputs
- Postconditions (ENSURE) → validate outputs
- Invariants (INVARIANT) → validate internal consistency

Contracts must:
- Be explicit
- Fail fast
- Never be silently ignored

---

## Global Rules

- No function may assume valid input
- No function may return unchecked output
- Invalid state must crash (backend) or return structured error (API boundary)
- Contracts must be deterministic and side-effect free

---

## GO RULES

### Preconditions
- Validate:
  - nil pointers
  - slice bounds
  - required struct fields

### Postconditions
- Validate:
  - returned structs are internally consistent
  - no partial/invalid data is returned

### Invariants
- Enforce inside:
  - loops
  - transformations
  - filtering logic

### Failure Mode
- Use panic for contract violations (internal only)
- NEVER panic in HTTP handlers

---

## HONO (API) RULES

### Preconditions
- Validate all request inputs at boundary
- Reject invalid JSON or missing fields

### Postconditions
- Responses must always include:
  - success: boolean
  - data OR error

### Invariants
- No business logic in handlers
- Handlers only orchestrate

### Failure Mode
- NEVER throw raw errors
- Return structured JSON errors

---

## NEXT.JS RULES

### Preconditions
- Validate props and API responses before rendering

### Postconditions
- UI must not render invalid or undefined states

### Invariants
- No direct backend assumptions
- All async data must be checked

---

## SOLVER-SPECIFIC RULES

- Must be a PURE function
- Must not mutate input
- Must enforce:
  - all constraints satisfied
  - no duplicate items
  - deterministic output

---

## PROHIBITED

- Skipping ENSURE checks
- Silent error handling
- Implicit assumptions about data
- Mixing validation with business logic unclearly

---

## PERFORMANCE

- Contracts may be disabled in production via flags
- Must not change program behavior when disabled