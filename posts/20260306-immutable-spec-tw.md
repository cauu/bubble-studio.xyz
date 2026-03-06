---
id: 10
title: "Immutable Spec：讓需求、設計、執行和驗收收斂到同一份文檔"
date: "2026-03-06"
time: "11:30"
image: "/images/blog/immutable-spec-cover.jpg"
author: Martin
language: tw
tags:
  - "軟體工程"
  - "開發流程"
  - "文檔管理"
---

## 引言

在傳統的開發流程中，需求、設計、開發計劃、測試記錄、上線說明、回退方案往往分散在多個地方。PR 描述裡有一部分，文檔系統裡有一部分，聊天記錄裡還有一部分。項目推進一段時間後，一個很現實的問題就會出現：

當前到底該按什麼標準繼續做？

而這個問題，到了AI時代會更加突出。`Immutable Spec` 提供了一種更清晰的做法：每一個需求對應一份 spec，這份 spec 同時承載需求詳情、方案設計、執行計劃和測試驗收標準，並且只允許追加，不允許覆蓋歷史。

它既是一種文檔組織方式，也是一種交付機制。

---

## 為什麼需要 Immutable Spec

軟體開發中的許多混亂，並不來自技術本身，而是來自協作標準的不統一。常見情況包括：

- 需求改動後，舊文檔沒有同步，開發繼續按舊理解推進
- 設計和實現脫節，到了驗收階段才發現標準不一致
- 某個事項看起來已經完成，但沒人能準確說明是否真正通過驗收
- 出現問題需要回退時，只能臨時處理，缺少清晰記錄
- 迭代越來越多之後，歷史決策、變更原因和驗證證據難以追溯

這些問題最終都會指向同一個根源：缺少一個唯一、穩定、可追溯的執行標準。

Immutable Spec 的價值，就在於建立這樣一個標準。

---

## Immutable Spec 的核心思路

### 一份 spec 對應一次需求交付

每一個明確的需求，都應該有一份對應的 spec。  
這份 spec 至少覆蓋四個方面：

- 需求詳情
- 方案設計
- 執行計劃
- 測試與驗收標準

這樣，開發、測試、驗收和回退都圍繞同一份文檔展開，團隊對當前目標的理解也會更一致。

### 文檔只追加，不改寫歷史

這裡的 "immutable" 指的是歷史不可覆蓋。

允許追加：

- 執行日誌
- 驗證證據
- 變更說明
- 狀態記錄

不建議直接修改已經記錄的需求、設計和結論。歷史保留下來，後續追溯才有依據。

### 同一時間只允許一個 active spec

歷史 spec 應該保留，因為它們本身就是審計鏈路的一部分。  
但為了保持流程線性、降低複雜度，同一時間只允許一個 `active spec`。

這意味著當前執行只能跟隨唯一的一份文檔。舊 spec 可以保留、可以完成、也可以停止使用，但不能與新的執行標準並行生效。

---

## 一份 Immutable Spec 應該包含什麼

推薦每份 spec 使用統一結構，例如：

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

這樣的結構有一個很直接的好處：需求、設計、執行和驗收被放進了同一個上下文裡，團隊不需要在多個地方來回查找當前標準。

---

## 為什麼要堅持線性推進

Immutable Spec 特別適合希望降低協作複雜度的團隊。

如果多個 spec 同時處於活躍狀態，問題會迅速增加：優先級如何判斷、依賴如何處理、測試證據歸屬哪一份 spec、回退應該針對哪個狀態、commit 應該關聯哪條鏈路。這些問題會消耗大量協作成本。

更穩妥的方式，是在同一階段只推進一個 `active spec`。如果需求變化，就新建一份 spec，讓它成為新的執行標準；舊 spec 保留歷史記錄，並明確說明當前已停止使用。

這種做法會帶來少量重複內容，但會顯著提升執行邊界的清晰度。

---

## 事項管理：什麼叫「完成」

在 Immutable Spec 中，事項狀態可以保持得很簡單：

- `[ ]` 未開始
- `[~]` 進行中
- `[x]` 已完成

關鍵在於對「已完成」的定義要足夠嚴格。

一個事項只有在以下條件全部滿足後，才應當標記為完成：

- 實現已經完成
- 對應驗收標準已經驗證
- 驗證證據已經追加到 spec

這樣可以避免一種常見誤區：代碼寫完了，就默認事情完成了。  
在工程交付中，完成通常意味著「實現 + 驗證 + 記錄」三者都已經閉合。

---

## 事項級提交：讓 commit 與 spec 對齊

如果 spec 是執行標準，那麼 commit 就應該成為這份標準的實現記錄。

推薦做法是：

- 一個事項對應一個 commit
- commit message 包含 spec 文件名和事項 ID
- 沒有驗收證據的事項，不作為完成項提交

例如：

```text
spec(2026-03-06-phase3-runtime-probe.md): p3-1 add runtime probe command
```

正文可以進一步統一為：

```text
Spec: docs/specs/2026-03-06-phase3-runtime-probe.md
Item: p3-1
Acceptance: TC-1, TC-2
```

這樣做的好處非常明顯：代碼歷史和文檔歷史自然對齊。後續復盤時，可以快速定位某個 commit 對應的事項、需求背景和驗收標準。

---

## 驗收證據需要統一格式，但不應綁定技術棧

不同項目的技術棧不同，驗收命令也會不同。  
Rust 項目可能是 `cargo test`，Node 項目可能是 `pnpm build`，Python 項目可能是 `pytest`，部署鏈路可能還涉及 Ansible、Shell 或手工驗證。

因此，更合理的約束方式是統一證據格式，而不是固定命令本身。

推薦格式如下：

```text
TC-<n> | stack: <rust|node|python|ansible|ui|other> | command: <cmd or manual step> | result: <pass|fail> | note: <short observation>
```

例如：

- `TC-1 | stack: rust | command: cargo test -q | result: pass | note: deploy payload defaults covered`
- `TC-2 | stack: node | command: pnpm build | result: pass | note: UI renders correctly`
- `TC-3 | stack: ansible | command: ansible-playbook --syntax-check ... | result: pass | note: syntax valid`
- `TC-4 | stack: ui | command: manual validation | result: pass | note: warning banner displayed`

這樣既保留了統一的記錄方式，也保留了對不同項目形態的適配能力。

---

## 需求變更時應該如何處理

當需求發生變化時，不建議直接改寫當前 spec 的核心內容。  
更穩妥的方式，是新建一份 spec，把新的範圍、設計、執行計劃和驗收標準完整寫清楚。

舊 spec 保留原樣，只追加一條變更記錄，說明它已經停止作為當前執行標準，並指向新的 spec。後續執行全部切換到新 spec。

這種處理方式有兩個優點：

- 歷史決策會被完整保留
- 當前執行標準始終清晰，不會出現多份文檔交叉生效的情況

---

## 回退時應該如何處理

如果某項改動需要回退，也應該納入同一套流程。

對於已經提交、已經聯調、已經上線，或者已經被外部驗證過的改動，回退應當被視為一次新的變更，並單獨創建一份 rollback spec。回退原因、影響範圍、執行步驟和回退後的驗收標準，都應寫在這份新文檔中。

代碼層優先使用 `git revert`。回退完成後，同樣要補充驗收證據，並在原 spec 中追加一條回退記錄，指向新的 rollback spec。

這樣做之後，團隊可以清楚回答這些問題：

- 為什麼回退
- 回退了哪些內容
- 回退後如何驗證
- 回退影響了哪些後續事項

---

## Immutable Spec 能帶來什麼

採用 Immutable Spec 之後，團隊通常會獲得幾項明顯收益：

- 需求標準更加統一
- 設計、實現、驗收之間更容易對齊
- 每個事項都有清晰的完成條件
- 驗收證據和代碼歷史可以互相對應
- 歷史決策能夠被持續追溯
- 回退流程更容易制度化

更重要的是，團隊的溝通方式會發生變化。  
討論不再依賴零散的口頭上下文，而是回到當前 `active spec`。完成結論也不再依賴主觀判斷，而是看驗收標準和證據是否已經補齊。

---

## 適合哪些場景

Immutable Spec 特別適合這些情況：

- 需求變化頻繁，但要求強追溯
- 工程任務跨越前端、後端、部署、聯調多個環節
- 事項完成後需要支持復盤和審計
- 希望把開發、驗收、上線、回退納入同一套規則
- 團隊希望減少對口頭同步的依賴

對於非常輕量、完全臨時性的探索任務，這套方法可能會顯得偏重。  
但對於需要長期維護、多人協作、強調驗收質量的項目，它通常會帶來更高的穩定性和更低的協作成本。

---

## 結語

Immutable Spec 的核心價值，在於用一份清晰、可追溯、可執行的文檔，把需求、設計、執行、驗證和回退收斂到同一個坐標系中。

它要求團隊堅持幾條簡單規則：

- 一個需求對應一份 spec
- 一個時間點只保留一個 `active spec`
- 一個事項對應一個 commit
- 一個完成結論對應一份證據
- 一次回退進入新的 spec 流程

這些約束會增加一定的前期紀律，但通常能顯著減少返工、誤解和歷史混亂。對於長期項目來說，這種收斂通常是值得的。
