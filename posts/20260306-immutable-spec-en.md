---
title: "Immutable Spec: Converging Requirements, Design, Execution, and Acceptance into a Single Document"
date: "2026-03-06"
author: "Martin"
excerpt: "In traditional development workflows, requirements, designs, development plans, and test records are often scattered across multiple places. Immutable Spec offers a clearer approach: each requirement corresponds to a single spec that carries requirement details, solution design, execution plan, and test acceptance criteria—and only allows appending, never overwriting history."
tags: ["Software Engineering", "Development Process", "Documentation"]
coverImage: "/images/blog/immutable-spec-cover.jpg"
---

## Introduction

In traditional development workflows, requirements, designs, development plans, test records, deployment notes, and rollback strategies are often scattered across multiple places. Some parts are in PR descriptions, some in documentation systems, and others in chat logs. After a project progresses for a while, a very practical question emerges:

What standard should we follow to continue?

This problem becomes even more pronounced in the AI era. `Immutable Spec` provides a clearer approach: each requirement corresponds to a single spec that carries requirement details, solution design, execution plan, and test acceptance criteria—and only allows appending, never overwriting history.

It is both a documentation organization method and a delivery mechanism.

---

## Why We Need Immutable Spec

Much of the chaos in software development doesn't come from technology itself, but from inconsistent collaboration standards. Common situations include:

- After requirements change, old documents aren't synced, and development continues based on outdated understanding
- Design and implementation are disconnected, and inconsistencies are only discovered during acceptance
- A task appears complete, but no one can accurately confirm whether it truly passed acceptance
- When problems require rollback, only ad-hoc handling is possible, lacking clear records
- As iterations accumulate, historical decisions, change reasons, and validation evidence become difficult to trace

All these problems ultimately point to the same root cause: the lack of a single, stable, traceable execution standard.

The value of Immutable Spec lies in establishing such a standard.

---

## Core Principles of Immutable Spec

### One spec per requirement delivery

Every clear requirement should have a corresponding spec.  
This spec should cover at least four aspects:

- Requirement details
- Solution design
- Execution plan
- Test and acceptance criteria

This way, development, testing, acceptance, and rollback all revolve around the same document, and the team's understanding of the current goal becomes more consistent.

### Documents are append-only, never rewrite history

The "immutable" here means history cannot be overwritten.

Allowed to append:

- Execution logs
- Validation evidence
- Change notes
- Status records

Direct modification of already recorded requirements, designs, and conclusions is not recommended. History should be preserved for future traceability.

### Only one active spec at a time

Historical specs should be retained because they are part of the audit trail.  
However, to maintain linear flow and reduce complexity, only one `active spec` is allowed at any given time.

This means current execution can only follow a single document. Old specs can be retained, completed, or deprecated, but cannot coexist with new execution standards.

---

## What Should an Immutable Spec Contain

It's recommended that each spec uses a unified structure, for example:

```md
# <Spec Title>

## 1. Requirement Details
- Background
- Scope
- Constraints
- Non-goals

## 2. Outline Design
- Architecture / modules impacted
- Data model and interfaces
- Risk and rollback strategy

## 3. Execution Plan
- [ ] pX-1 <deliverable>
- [ ] pX-2 <deliverable>

## 4. Test And Acceptance Criteria
- TC-1 ...
- TC-2 ...

## 5. Execution Log (append-only)
- <date> pX-1 started ...
- <date> pX-1 completed ...

## 6. Validation Evidence (append-only)
- TC-1 | stack: ... | command: ... | result: ... | note: ...

## 7. Change Log (append-only)
- <date> new requirement / scope change / rollback note
```

This structure has a very direct benefit: requirements, design, execution, and acceptance are placed in the same context, and the team doesn't need to search across multiple places for the current standard.

---

## Why Insist on Linear Progression

Immutable Spec is particularly suitable for teams hoping to reduce collaboration complexity.

If multiple specs are active simultaneously, problems multiply rapidly: how to judge priorities, how to handle dependencies, which spec test evidence belongs to, which state rollback should target, which chain commits should link to. These issues consume significant collaboration costs.

A more stable approach is to advance only one `active spec` at any given stage. If requirements change, create a new spec to become the new execution standard; keep the old spec as historical record and clearly state it's no longer in use.

This approach introduces some content duplication but significantly improves clarity of execution boundaries.

---

## Task Management: What Does "Complete" Mean

In Immutable Spec, task status can be kept very simple:

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed

The key is that the definition of "completed" must be strict enough.

A task should only be marked as complete when all the following conditions are met:

- Implementation is complete
- Corresponding acceptance criteria have been verified
- Validation evidence has been appended to the spec

This avoids a common misconception: code is written, so the task is assumed complete.  
In engineering delivery, completion typically means "implementation + verification + documentation" are all closed.

---

## Task-Level Commits: Aligning Commits with Specs

If the spec is the execution standard, then commits should become the implementation record of that standard.

Recommended practices:

- One task corresponds to one commit
- Commit message includes spec filename and task ID
- Tasks without acceptance evidence are not submitted as completed

For example:

```text
spec(2026-03-06-phase3-runtime-probe.md): p3-1 add runtime probe command
```

The body can be further standardized as:

```text
Spec: docs/specs/2026-03-06-phase3-runtime-probe.md
Item: p3-1
Acceptance: TC-1, TC-2
```

The benefit is very clear: code history and documentation history naturally align. During retrospectives, you can quickly locate which task, requirement background, and acceptance criteria a commit corresponds to.

---

## Acceptance Evidence Needs Unified Format, But Shouldn't Be Tied to Tech Stack

Different projects have different tech stacks, and acceptance commands will differ.  
Rust projects might use `cargo test`, Node projects might use `pnpm build`, Python projects might use `pytest`, and deployment pipelines might involve Ansible, Shell, or manual verification.

Therefore, a more reasonable constraint is to unify the evidence format rather than fixing the commands themselves.

Recommended format:

```text
TC-<n> | stack: <rust|node|python|ansible|ui|other> | command: <cmd or manual step> | result: <pass|fail> | note: <short observation>
```

For example:

- `TC-1 | stack: rust | command: cargo test -q | result: pass | note: deploy payload defaults covered`
- `TC-2 | stack: node | command: pnpm build | result: pass | note: UI renders correctly`
- `TC-3 | stack: ansible | command: ansible-playbook --syntax-check ... | result: pass | note: syntax valid`
- `TC-4 | stack: ui | command: manual validation | result: pass | note: warning banner displayed`

This preserves both unified recording methods and adaptability to different project forms.

---

## How to Handle Requirement Changes

When requirements change, directly rewriting the core content of the current spec is not recommended.  
A more stable approach is to create a new spec with the new scope, design, execution plan, and acceptance criteria fully documented.

Keep the old spec as-is, only append a change record stating it has stopped being the current execution standard and pointing to the new spec. All subsequent execution switches to the new spec.

This approach has two advantages:

- Historical decisions are fully preserved
- Current execution standard remains clear, avoiding multiple documents taking effect simultaneously

---

## How to Handle Rollbacks

If a change needs to be rolled back, it should also be incorporated into the same workflow.

For changes that have been committed, integrated, deployed, or externally validated, rollback should be treated as a new change and have a separate rollback spec created. The rollback reason, impact scope, execution steps, and post-rollback acceptance criteria should all be documented in this new spec.

At the code level, prefer `git revert`. After rollback is complete, acceptance evidence should also be supplemented, and a rollback record should be appended to the original spec, pointing to the new rollback spec.

After doing this, the team can clearly answer these questions:

- Why rollback
- What was rolled back
- How to verify after rollback
- What subsequent tasks were affected by the rollback

---

## What Can Immutable Spec Bring

After adopting Immutable Spec, teams typically gain several clear benefits:

- More unified requirement standards
- Easier alignment between design, implementation, and acceptance
- Clear completion conditions for each task
- Acceptance evidence and code history can correspond to each other
- Historical decisions can be continuously traced
- Rollback processes are easier to institutionalize

More importantly, the team's communication style changes.  
Discussions no longer rely on scattered verbal context but return to the current `active spec`. Completion conclusions no longer depend on subjective judgment but on whether acceptance criteria and evidence have been completed.

---

## Suitable Scenarios

Immutable Spec is particularly suitable for these situations:

- Requirements change frequently but require strong traceability
- Engineering tasks span frontend, backend, deployment, and integration
- Tasks need to support retrospectives and audits after completion
- Want to incorporate development, acceptance, deployment, and rollback into the same set of rules
- Teams want to reduce dependence on verbal synchronization

For very lightweight, completely exploratory tasks, this approach may seem heavy.  
But for projects requiring long-term maintenance, multi-person collaboration, and emphasis on acceptance quality, it typically brings higher stability and lower collaboration costs.

---

## Conclusion

The core value of Immutable Spec lies in using a clear, traceable, executable document to converge requirements, design, execution, verification, and rollback into the same coordinate system.

It requires teams to adhere to a few simple rules:

- One requirement corresponds to one spec
- Only one `active spec` at any point in time
- One task corresponds to one commit
- One completion conclusion corresponds to one piece of evidence
- One rollback enters a new spec workflow

These constraints add some upfront discipline but typically significantly reduce rework, misunderstandings, and historical chaos. For long-term projects, this convergence is usually worthwhile.
