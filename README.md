# FoodlyAI — MVP Definition

## 1. Core Problem

Groups of people want to order food for events/parties without spending excessive time coordinating, **while respecting dietary constraints** and individual preferences.

---

## 2. Core Solution

An **AI-assisted menu planner** that:

1. Ensures **all dietary constraints are met**.
2. **Guarantees every participant has at least one item they can eat.**
3. Generates a menu **maximizing user satisfaction** (based on votes or likes).
4. Provides **actionable outputs**: a ready-to-order menu list or suggestions.

---

## 3. Target Users

- Small to medium groups (friends, offices, events).
- Early adopters: tech-savvy users who care about dietary restrictions.
- Optional: restaurants or catering services for later B2B validation.

---

## 4. Core MVP Features

| Feature | Description | Priority |
| --- | --- | --- |
| **User registration / login** | Minimal auth (Clerk or similar) | ✅ Must-have |
| **Menu input** | Users or admin input a set of available items | ✅ Must-have |
| **Constraint input** | Users specify dietary restrictions (allergies, vegan, etc.) | ✅ Must-have |
| **Voting / preference capture** | Users vote for liked/disliked items | ✅ Must-have |
| **Constraint solver** | Generates feasible menu satisfying all constraints | ✅ Must-have |
| **Individual coverage guarantee** | Every participant must have ≥1 item they can eat; solver rejects any plan that leaves a participant with zero options | ✅ Must-have |
| **Preference optimization** | Greedily maximize total votes within feasible items | ✅ Must-have |
| **Menu output / display** | Show final plan with per-person coverage + satisfaction score | ✅ Must-have |
| **Infeasibility explanation** | If no menu can cover all participants, clearly identify which participants have no options and why | ✅ Must-have |
| **Basic API endpoints** | Optional: for potential integration with apps or frontend | ⚪ Nice-to-have |
| **Health checks / monitoring** | Optional: only if deploying microservices | ⚪ Nice-to-have |

---

## 5. MVP Scope Decisions

- **Exclude for MVP**:
  - Full multi-restaurant ordering integration (Uber/DoorDash)
  - AI tagging of menu items (manual tagging is fine initially)
  - Advanced fairness weighting or complex ILP optimizations (start greedy)
  - Multi-tenant, enterprise architecture
- **Include for MVP**:
  - Fully deterministic, **testable constraint engine**
  - **Per-person coverage check**: solver verifies ≥1 edible item per participant before finalising any menu
  - Voting aggregation per group
  - Coverage guarantees and clear **infeasibility explanations** (including identifying which participant(s) cannot be covered and which constraints conflict)

---

## 6. Architecture for MVP

```text
[Frontend (Next.js)]
        |
        v
[API Layer (Hono.js)]
  ├── Auth (Clerk)
  ├── Voting Module
  └── Planning Module
        ├── Constraint Solver
        ├── Individual Coverage Checker
        └── Preference Optimizer
```

- **Individual Coverage Checker** runs as a mandatory pre-pass inside the Planning Module. It validates that the candidate menu contains at least one item each participant can eat before the preference optimiser runs.
- If coverage cannot be satisfied, the module returns an infeasibility report identifying the affected participant(s) and the conflicting constraints.

---

## 7. Success Criteria for MVP

- The solver **always produces a menu if feasible**, and explains if infeasible.
- **Every participant in the group has at least one item they can eat** in the final menu.
- Preferences are reflected in the final plan.
- Users can **enter dietary restrictions** and see them respected.
- MVP runs **entirely end-to-end** for a single group without errors.
- Can demonstrate **proof-of-value** in a live test (1–5 groups).

---

> **FoodlyAI MVP = the smallest system that guarantees feasible menus for groups with dietary constraints — where every participant can eat at least one item — while maximizing expressed preferences, and can be demonstrated in a real test scenario.**
