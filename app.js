const titleEl = document.getElementById("title");
const descEl = document.getElementById("desc");
const choicesEl = document.getElementById("choices");
const statusEl = document.getElementById("status");
const pathEl = document.getElementById("path");
const restartBtn = document.getElementById("restartBtn");

// 三条主线故事 × 多分支伦理抉择 (共 20+ 节点)
const NODES = {
  // === 开局：选择故事线 ===
  start: {
    title: "📋 选择你的伦理困境",
    desc: "你是一名刚入职的调查记者。今天，编辑部给了你三个选题。每个选题都将考验你的伦理判断。",
    choices: [
      { text: "📸 故事A：灾难现场报道", next: "A1", note: "进入灾难报道伦理线" },
      { text: "🔐 故事B：匿名举报人", next: "B1", note: "进入信源保护伦理线" },
      { text: "🤖 故事C：AI 生成内容审核", next: "C1", note: "进入AI伦理与真实性线" }
    ]
  },

  // ========== 故事线 A：灾难现场报道 ==========
  A1: {
    title: "📸 灾难前线",
    desc: "一座工厂爆炸，你赶到现场。浓烟滚滚，有伤者在呼救。你手中的相机可以拍下珍贵的第一手独家画面。",
    choices: [
      { text: "放下相机，先救人", next: "A2a", note: "选择生命优先于报道。" },
      { text: "先拍摄记录，再报警施救", next: "A2b", note: "选择记录优先，认为报道也是一种拯救。" }
    ]
  },
  A2a: {
    title: "错过独家",
    desc: "你成功帮助了两名伤者撤离。但其他媒体记者已经赶到，你错过了独家视角。编辑来电催稿。",
    choices: [
      { text: "如实告诉编辑你选择了救人", next: "A3a1", note: "坦诚面对职业与人性的冲突。" },
      { text: "用手机补拍现场残余画面，假装是第一手的", next: "A3a2", note: "为了完成任务，模糊了时间线。" }
    ]
  },
  A3a1: {
    title: "🏆 结局 A1：伦理标杆",
    desc: "编辑理解了你的选择，并在社论中提到了你的行为。你失去了本期封面，但赢得了同行和受众的尊重。一年后，你获得了\"年度伦理记者\"提名。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "回到主线选择" }]
  },
  A3a2: {
    title: "⚠️ 结局 A2：信用危机",
    desc: "稿件发布后，一位网友比对了你的照片元数据(EXIF)时间戳，发现你的'第一手'画面实际上是爆炸发生 40 分钟之后拍摄的。你被网暴，编辑部要求你做出解释。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "回到主线选择" }]
  },
  A2b: {
    title: "独家画面",
    desc: "你拍下了极具冲击力的爆炸瞬间和求救画面。一名伤者的家属在社交媒体上认出了你的镜头，指责你见死不救。",
    choices: [
      { text: "公开道歉，承认当时的犹豫", next: "A3b1", note: "面对公众质疑，选择透明。" },
      { text: "辩称'记录真相本身就是一种救援'", next: "A3b2", note: "坚持新闻记录的职业立场。" }
    ]
  },
  A3b1: {
    title: "⚖️ 结局 A3：反思者",
    desc: "你的道歉文章引起了广泛讨论,推动了行业内关于'记者身份与公民责任冲突'的伦理研讨会。你被邀请在新闻学院做客座讲师。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "回到主线选择" }]
  },
  A3b2: {
    title: "💔 结局 A4：冷血标签",
    desc: "你的申辩在法律上站得住脚，但舆论已经给你贴上了'冷血记者'标签。后续采访中，受访者合作意愿显著下降。独家虽然拿到了，但失去了更重要的东西——信任。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "回到主线选择" }]
  },

  // ========== 故事线 B：匿名举报人 ==========
  B1: {
    title: "🔐 深喉来电",
    desc: "一位自称政府官员的人通过加密通讯联系你，声称掌握了一家上市公司严重污染河流的内部文件。他要求你绝对不能透露他的身份。",
    choices: [
      { text: "接受条件，开始调查", next: "B2a", note: "承诺保密，启动深度调查。" },
      { text: "要求他用实名提供材料", next: "B2b", note: "认为匿名消息不可靠。" }
    ]
  },
  B2a: {
    title: "铁证如山",
    desc: "你花了三周时间交叉验证文件，发现一切属实。报道引起轩然大波，受害村民联名感谢。但检察机关来电，要求你交出信源。",
    choices: [
      { text: "以新闻记者特权拒绝透露信源", next: "B3a1", note: "坚守'信源保护'底线。" },
      { text: "在律师建议下有条件配合", next: "B3a2", note: "权衡法律风险与职业伦理。" }
    ]
  },
  B3a1: {
    title: "🛡️ 结局 B1：信源守护者",
    desc: "你成功援引了《新闻从业者信源保护条例》，法官裁定你不需要交出信源。这个案例成为新闻伦理教科书的经典章节。你的举报人安全了。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },
  B3a2: {
    title: "😔 结局 B2：灰色妥协",
    desc: "你在律师的斡旋下提供了'模糊化信息',但足以让调查人员通过排除法锁定举报人。他被解职并遭到报复。你的报道获了奖，但你知道代价是什么。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },
  B2b: {
    title: "线索中断",
    desc: "举报人拒绝用实名，沟通中断。两个月后，另一家媒体发表了同一题材的调查报道，影响巨大。你的编辑问你为什么错过了这条大鱼。",
    choices: [
      { text: "坦承当时对匿名信源过于谨慎", next: "B3b1", note: "反思自己的判断标准。" },
      { text: "坚持匿名消息不符合你的报道标准", next: "B3b2", note: "维持原则，但付出了新闻竞争力的代价。" }
    ]
  },
  B3b1: {
    title: "📚 结局 B3：成长之痛",
    desc: "你调整了自己的信源评估框架，学会了在'保护信源'和'验证信息'之间找到平衡。下一次面对匿名深喉时，你更加从容了。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },
  B3b2: {
    title: "🧱 结局 B4：原则之墙",
    desc: "你的原则没有错，但错失了一次重大公共利益报道。这件事让你明白：伦理判断不是非黑即白，而是在复杂情境中寻找'最不坏'的选择。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },

  // ========== 故事线 C：AI 生成内容审核 ==========
  C1: {
    title: "🤖 AI 陷阱",
    desc: "你收到一份自媒体投稿，文章写得深入翔实。但你的直觉告诉你这可能是 AI 生成的。编辑催你今天必须上线。",
    choices: [
      { text: "立即用检测工具分析", next: "C2a", note: "先验证真伪再决定。" },
      { text: "文章质量高就行，不必纠结是否AI写的", next: "C2b", note: "认为内容质量比生成方式更重要。" }
    ]
  },
  C2a: {
    title: "检测结果模糊",
    desc: "AIGC 检测器显示 65% 概率为 AI 生成(困惑度偏低，突发性中等)。这个结果不够确定。你联系了投稿人，他声称'只是用AI辅助润色过'。",
    choices: [
      { text: "要求投稿人提供原始草稿和修改记录", next: "C3a1", note: "追求完整的创作链条可追溯性。" },
      { text: "在文末标注'本文可能经AI辅助创作'后发布", next: "C3a2", note: "在透明度和效率间取折中。" }
    ]
  },
  C3a1: {
    title: "🔍 结局 C1：严谨守门人",
    desc: "投稿人无法提供草稿，承认全文由 ChatGPT 完成。你拒绝了稿件，虽然错过了流量，但维护了平台对原创内容的承诺。同事开始效仿你的核查流程。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },
  C3a2: {
    title: "⚖️ 结局 C2：透明折中",
    desc: "文章上线后获得不错的阅读量。部分读者感谢你标注了AI参与信息，认为这种透明度值得推广。但也有保守派批评你'降低了编辑标准'。你推动编辑部制定了《AI辅助内容标注指南》。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },
  C2b: {
    title: "深度伪造",
    desc: "文章上线后大获好评。但三天后，有读者发现文中引用的'学术论文'在学术数据库中根本不存在——这是AI'幻觉'编造的虚假引用。",
    choices: [
      { text: "立即撤稿并发布更正声明", next: "C3b1", note: "承认失误，及时止损。" },
      { text: "悄悄删除错误引用，不发更正", next: "C3b2", note: "试图掩盖问题。" }
    ]
  },
  C3b1: {
    title: "🛠️ 结局 C3：亡羊补牢",
    desc: "你的更正声明写得坦诚而专业,详细解释了AI幻觉的机制。文章虽然被撤, 但你的态度赢得了读者的理解。编辑部因此建立了AI内容的强制事实核查流程。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  },
  C3b2: {
    title: "💣 结局 C4：信任崩塌",
    desc: "有人用网页快照工具保存了原文,你的悄然修改被曝光。社交媒体上'XX媒体偷改稿件'的话题冲上热搜。平台信誉受到严重打击, 你也被停职检查。",
    choices: [{ text: "🔄 重新开始", next: "start", note: "" }]
  }
};

let current = "start";
let path = [];

function setStatus(text) {
  statusEl.textContent = `状态: ${text}`;
}

function render() {
  const node = NODES[current];
  titleEl.textContent = node.title;
  descEl.textContent = node.desc;
  choicesEl.innerHTML = "";
  node.choices.forEach(c => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = c.text;
    btn.addEventListener("click", () => {
      path.push(c.note);
      const li = document.createElement("li");
      li.textContent = c.note;
      pathEl.appendChild(li);
      current = c.next;
      render();
    });
    choicesEl.appendChild(btn);
  });
  if (!node.choices.length) setStatus("剧情结束，可重开");
  else setStatus("进行中");
}

restartBtn.addEventListener("click", () => {
  current = "start";
  path = [];
  pathEl.innerHTML = "";
  render();
});

render();

// === PM Metrics Integration ===
(function () {
  try {
    if (!window.pmMetrics) return;
    // Auto mark task start on first meaningful interaction
    let taskStarted = false;
    document.addEventListener('click', function (e) {
      if (taskStarted) return;
      const btn = e.target.closest('button');
      if (btn) {
        taskStarted = true;
        window.pmMetrics.markTaskStart('ethics_choice_task');
      }
    }, { once: false });
  } catch (_e) { }
})();
