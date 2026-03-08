# P31 Spec - 电车难题新闻干预与记录 AVG

## 1. Summary

- **Project ID**: P31
- **Project Name**: 电车难题新闻干预与记录 AVG
- **Goal**: 文字冒险游戏，将新闻伦理困境情景化，玩家决策影响结局
- **User Persona**: 新闻学生 / 培训讲师

## 2. Scope

- **In scope**:
  - 文字冒险游戏
  - 将新闻伦理困境情景化
  - 玩家决策影响结局
- **Out of scope**:
  - 后端代理或服务端逻辑
  - API Key 持久化存储

## 3. UX

- **Core workflow**: 用户输入 → 前端处理 → 结果展示
- **Inputs**: 选择分支
- **Outputs**: 多结局 + 选择树记录
- **States**: empty (初始) / loading (处理中) / error (失败) / success (完成)

## 4. Functional Requirements

1. FR-1: 文字冒险游戏
2. FR-2: 结果可视化展示
3. FR-3: 错误状态可见提示

## 5. Non-Functional Requirements

- **Performance**: 核心任务 3 分钟内完成
- **Accessibility**: 键盘导航、aria-label、焦点可见、WCAG AA 对比度
- **Privacy**: 本地处理优先，不默认上传数据
- **Browser support**: 现代 Chromium (Chrome 110+)

## 6. Dependencies

- **Libraries/CDNs**: 无外部依赖
- **Local data**: 无

## 7. Risks & Mitigations

- **Risk**: 剧情分支覆盖有限
- **Mitigation**: 支持 JSON 扩展剧本

## 8. Acceptance Criteria

- [ ] 分支剧情
- [ ] 选择记录
- [ ] 多结局
- [ ] 纯静态页面可部署 GitHub Pages
- [ ] 移动端可用
- [ ] 隐私提示清晰可见
