---
title: "Immutable Spec：让需求、设计、执行和验收收敛到同一份文档"
date: "2026-03-06"
author: "Martin"
excerpt: "在传统的开发流程中，需求、设计、开发计划、测试记录往往分散在多个地方。Immutable Spec 提供了一种更清晰的做法：每一个需求对应一份 spec，这份 spec 同时承载需求详情、方案设计、执行计划和测试验收标准，并且只允许追加，不允许覆盖历史。"
tags: ["软件工程", "开发流程", "文档管理"]
---

## 引言

在传统的开发流程中，需求、设计、开发计划、测试记录、上线说明、回退方案往往分散在多个地方。PR 描述里有一部分，文档系统里有一部分，聊天记录里还有一部分。项目推进一段时间后，一个很现实的问题就会出现：

当前到底该按什么标准继续做？

而这个问题，到了AI时代会更加突出。`Immutable Spec` 提供了一种更清晰的做法：每一个需求对应一份 spec，这份 spec 同时承载需求详情、方案设计、执行计划和测试验收标准，并且只允许追加，不允许覆盖历史。

它既是一种文档组织方式，也是一种交付机制。

---

## 为什么需要 Immutable Spec

软件开发中的许多混乱，并不来自技术本身，而是来自协作标准的不统一。常见情况包括：

- 需求改动后，旧文档没有同步，开发继续按旧理解推进
- 设计和实现脱节，到了验收阶段才发现标准不一致
- 某个事项看起来已经完成，但没人能准确说明是否真正通过验收
- 出现问题需要回退时，只能临时处理，缺少清晰记录
- 迭代越来越多之后，历史决策、变更原因和验证证据难以追溯

这些问题最终都会指向同一个根源：缺少一个唯一、稳定、可追溯的执行标准。

Immutable Spec 的价值，就在于建立这样一个标准。

---

## Immutable Spec 的核心思路

### 一份 spec 对应一次需求交付

每一个明确的需求，都应该有一份对应的 spec。  
这份 spec 至少覆盖四个方面：

- 需求详情
- 方案设计
- 执行计划
- 测试与验收标准

这样，开发、测试、验收和回退都围绕同一份文档展开，团队对当前目标的理解也会更一致。

### 文档只追加，不改写历史

这里的 "immutable" 指的是历史不可覆盖。

允许追加：

- 执行日志
- 验证证据
- 变更说明
- 状态记录

不建议直接修改已经记录的需求、设计和结论。历史保留下来，后续追溯才有依据。

### 同一时间只允许一个 active spec

历史 spec 应该保留，因为它们本身就是审计链路的一部分。  
但为了保持流程线性、降低复杂度，同一时间只允许一个 `active spec`。

这意味着当前执行只能跟随唯一的一份文档。旧 spec 可以保留、可以完成、也可以停止使用，但不能与新的执行标准并行生效。

---

## 一份 Immutable Spec 应该包含什么

推荐每份 spec 使用统一结构，例如：

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

这样的结构有一个很直接的好处：需求、设计、执行和验收被放进了同一个上下文里，团队不需要在多个地方来回查找当前标准。

---

## 为什么要坚持线性推进

Immutable Spec 特别适合希望降低协作复杂度的团队。

如果多个 spec 同时处于活跃状态，问题会迅速增加：优先级如何判断、依赖如何处理、测试证据归属哪一份 spec、回退应该针对哪个状态、commit 应该关联哪条链路。这些问题会消耗大量协作成本。

更稳妥的方式，是在同一阶段只推进一个 `active spec`。如果需求变化，就新建一份 spec，让它成为新的执行标准；旧 spec 保留历史记录，并明确说明当前已停止使用。

这种做法会带来少量重复内容，但会显著提升执行边界的清晰度。

---

## 事项管理：什么叫"完成"

在 Immutable Spec 中，事项状态可以保持得很简单：

- `[ ]` 未开始
- `[~]` 进行中
- `[x]` 已完成

关键在于对"已完成"的定义要足够严格。

一个事项只有在以下条件全部满足后，才应当标记为完成：

- 实现已经完成
- 对应验收标准已经验证
- 验证证据已经追加到 spec

这样可以避免一种常见误区：代码写完了，就默认事情完成了。  
在工程交付中，完成通常意味着"实现 + 验证 + 记录"三者都已经闭合。

---

## 事项级提交：让 commit 与 spec 对齐

如果 spec 是执行标准，那么 commit 就应该成为这份标准的实现记录。

推荐做法是：

- 一个事项对应一个 commit
- commit message 包含 spec 文件名和事项 ID
- 没有验收证据的事项，不作为完成项提交

例如：

```text
spec(2026-03-06-phase3-runtime-probe.md): p3-1 add runtime probe command
```

正文可以进一步统一为：

```text
Spec: docs/specs/2026-03-06-phase3-runtime-probe.md
Item: p3-1
Acceptance: TC-1, TC-2
```

这样做的好处非常明显：代码历史和文档历史自然对齐。后续复盘时，可以快速定位某个 commit 对应的事项、需求背景和验收标准。

---

## 验收证据需要统一格式，但不应绑定技术栈

不同项目的技术栈不同，验收命令也会不同。  
Rust 项目可能是 `cargo test`，Node 项目可能是 `pnpm build`，Python 项目可能是 `pytest`，部署链路可能还涉及 Ansible、Shell 或手工验证。

因此，更合理的约束方式是统一证据格式，而不是固定命令本身。

推荐格式如下：

```text
TC-<n> | stack: <rust|node|python|ansible|ui|other> | command: <cmd or manual step> | result: <pass|fail> | note: <short observation>
```

例如：

- `TC-1 | stack: rust | command: cargo test -q | result: pass | note: deploy payload defaults covered`
- `TC-2 | stack: node | command: pnpm build | result: pass | note: UI renders correctly`
- `TC-3 | stack: ansible | command: ansible-playbook --syntax-check ... | result: pass | note: syntax valid`
- `TC-4 | stack: ui | command: manual validation | result: pass | note: warning banner displayed`

这样既保留了统一的记录方式，也保留了对不同项目形态的适配能力。

---

## 需求变更时应该如何处理

当需求发生变化时，不建议直接改写当前 spec 的核心内容。  
更稳妥的方式，是新建一份 spec，把新的范围、设计、执行计划和验收标准完整写清楚。

旧 spec 保留原样，只追加一条变更记录，说明它已经停止作为当前执行标准，并指向新的 spec。后续执行全部切换到新 spec。

这种处理方式有两个优点：

- 历史决策会被完整保留
- 当前执行标准始终清晰，不会出现多份文档交叉生效的情况

---

## 回退时应该如何处理

如果某项改动需要回退，也应该纳入同一套流程。

对于已经提交、已经联调、已经上线，或者已经被外部验证过的改动，回退应当被视为一次新的变更，并单独创建一份 rollback spec。回退原因、影响范围、执行步骤和回退后的验收标准，都应写在这份新文档中。

代码层优先使用 `git revert`。回退完成后，同样要补充验收证据，并在原 spec 中追加一条回退记录，指向新的 rollback spec。

这样做之后，团队可以清楚回答这些问题：

- 为什么回退
- 回退了哪些内容
- 回退后如何验证
- 回退影响了哪些后续事项

---

## Immutable Spec 能带来什么

采用 Immutable Spec 之后，团队通常会获得几项明显收益：

- 需求标准更加统一
- 设计、实现、验收之间更容易对齐
- 每个事项都有清晰的完成条件
- 验收证据和代码历史可以互相对应
- 历史决策能够被持续追溯
- 回退流程更容易制度化

更重要的是，团队的沟通方式会发生变化。  
讨论不再依赖零散的口头上下文，而是回到当前 `active spec`。完成结论也不再依赖主观判断，而是看验收标准和证据是否已经补齐。

---

## 适合哪些场景

Immutable Spec 特别适合这些情况：

- 需求变化频繁，但要求强追溯
- 工程任务跨越前端、后端、部署、联调多个环节
- 事项完成后需要支持复盘和审计
- 希望把开发、验收、上线、回退纳入同一套规则
- 团队希望减少对口头同步的依赖

对于非常轻量、完全临时性的探索任务，这套方法可能会显得偏重。  
但对于需要长期维护、多人协作、强调验收质量的项目，它通常会带来更高的稳定性和更低的协作成本。

---

## 结语

Immutable Spec 的核心价值，在于用一份清晰、可追溯、可执行的文档，把需求、设计、执行、验证和回退收敛到同一个坐标系中。

它要求团队坚持几条简单规则：

- 一个需求对应一份 spec
- 一个时间点只保留一个 `active spec`
- 一个事项对应一个 commit
- 一个完成结论对应一份证据
- 一次回退进入新的 spec 流程

这些约束会增加一定的前期纪律，但通常能显著减少返工、误解和历史混乱。对于长期项目来说，这种收敛通常是值得的。
