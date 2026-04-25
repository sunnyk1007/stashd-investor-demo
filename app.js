
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((t) => t.classList.toggle("active", t === tab));
    panels.forEach((p) => p.classList.toggle("active", p.id === target));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const screens = {
  home: `
    <div class="teen-home">
      <div class="soft-orb mint-orb"></div><div class="soft-orb blue-orb"></div>
      ${topBar("Hey, Maya", "Friday allowance is ready")}
      <main class="phone-content">
        <section class="balance-card">
          <div class="card-top"><span>Total stash</span><b>+ $11.40</b></div>
          <div class="big-money">$487.70</div>
          <p>Spend some. Save some. Grow some. You decide the rules.</p>
          <div class="quick-actions"><button>Add</button><button>Move</button><button>Ask</button></div>
        </section>
        <section class="bucket-grid">
          <div class="bucket"><i class="ink-line"></i><span>Spend</span><strong>$42.80</strong></div>
          <div class="bucket"><i class="blue-line"></i><span>Save</span><strong>$318.40</strong></div>
          <div class="bucket"><i class="violet-line"></i><span>Grow</span><strong>$126.50</strong></div>
        </section>
        <section class="grow-card" style="margin:18px 0 0;padding:16px;border-radius:32px">
          <b>Money plan</b>
          <p style="margin:4px 0 12px;color:rgba(15,23,42,.55);font-size:12px">Auto-splits every payday</p>
          <div style="display:grid;grid-template-columns:.5fr .35fr .15fr;overflow:hidden;border-radius:999px;background:#e5e7eb">
            <span style="height:14px;background:#0B1020"></span><span style="height:14px;background:#245BFF"></span><span style="height:14px;background:#7C3AED"></span>
          </div>
        </section>
      </main>${phoneNav("home")}
    </div>`,
  earn: `
    <div class="earn-screen">
      ${topBar("Earn", "$31 available this week", true)}
      <section class="white-card"><div class="eyelabel">This week</div><div class="amount">$31</div><p>$16 allowance + $15 chores</p><button class="primary-btn">Request payout</button></section>
      <section class="task-list">
        <div class="task"><div><b>Walk Milo</b><br><span>Ready</span></div><div class="pay">$5</div></div>
        <div class="task"><div><b>Kitchen reset</b><br><span>Review</span></div><div class="pay">$8</div></div>
        <div class="task"><div><b>Money lesson</b><br><span>Bonus</span></div><div class="pay">$3</div></div>
      </section>
      <section class="cream-note"><b>Mastery tasks</b><p>Teens can earn for chores, habits, and financial lessons — creating confidence, not just card access.</p></section>
      ${phoneNav("earn")}
    </div>`,
  grow: `
    <div class="grow-screen">
      ${topBar("Grow", "Parent-approved rewards")}
      <section class="grow-card">
        <div class="topline"><span>Future stash</span><span class="badge">USDC rewards</span></div>
        <div class="amount">$126.50</div>
        <p>Earn target rewards on money not planned for this week.</p>
        <div class="reward-box"><div><b style="font-size:14px">Target cash back</b><p style="margin:4px 0 0;color:rgba(255,255,255,.45);font-size:12px">Variable. Partner-powered.</p></div><b>3–6%</b></div>
      </section>
      <section class="goal-list">
        ${goal("Concert fund", "$144 / $200", 72)}
        ${goal("Future stash", "$126 / $450", 28)}
        ${goal("Emergency", "$54 / $100", 54)}
      </section>
      ${phoneNav("grow")}
    </div>`,
  card: `
    <div class="card-screen">
      ${topBar("Card", "Virtual debit")}
      <section class="virtual-card">
        <div class="card-meta"><span>Virtual card</span><span>Stashd</span></div>
        <div class="card-number">•••• 8137</div>
        <div class="card-bottom"><div><small>Teen</small><br><b>Maya D.</b></div><div style="text-align:right"><small>Spend limit</small><br><b>$60 / week</b></div></div>
      </section>
      <section class="card-actions"><button><span style="font-size:24px">❄</span><br><b>Freeze</b><br><small>Instant pause</small></button><button><span style="font-size:24px">🛡</span><br><b>Rules</b><br><small>Parent controls</small></button></section>
      <section class="spend-box"><b>Recent spending</b><div class="spend-row"><span>Boba Guys</span><b>$6.80</b></div><div class="spend-row"><span>Spotify</span><b>$5.99</b></div><div class="spend-row"><span>Target</span><b>$12.40</b></div></section>
      ${phoneNav("card")}
    </div>`,
  parent: `
    <div class="parent-screen">
      ${topBar("Parent hub", "Maya's account", true)}
      <section class="white-card"><div class="eyelabel">Status</div><div style="display:flex;align-items:end;justify-content:space-between"><div><div class="amount" style="font-size:42px">Healthy</div><p>3 chores complete. No blocked purchases. Saving streak: 18 days.</p></div><div class="plant">🌱</div></div></section>
      <section class="control-list">
        ${control("Allowance", "$16 every Friday")}
        ${control("Weekly card limit", "$60")}
        ${control("Savings match", "25% up to $20")}
        ${control("Grow access", "Approval required")}
      </section>${phoneNav("earn")}
    </div>`,
  approval: `
    <div class="approval-screen">
      ${topBar("Approve", "One pending task")}
      <section class="approval-main"><div class="label">Kitchen reset</div><div class="amount">$8</div><p style="color:rgba(255,255,255,.55);line-height:1.55">Maya submitted this task 12 minutes ago. Approve to pay into her money plan.</p><div class="approval-actions"><button>Approve</button><button>Ask photo</button></div></section>
      <section class="split-card"><b>Payout split</b><div class="split-row"><span>Spend</span><b>$4.00</b></div><div class="split-row"><span>Save</span><b>$2.80</b></div><div class="split-row"><span>Grow</span><b>$1.20</b></div></section>${phoneNav("earn")}
    </div>`
};

function topBar(title, sub, dark=false) {
  return `<div class="app-top ${dark ? "dark" : "light"}"><div><div class="app-brand">Stashd</div><div class="app-title">${title}</div>${sub ? `<div class="app-subtitle">${sub}</div>` : ""}</div><button class="round-btn">◎</button></div>`;
}
function phoneNav(active) {
  const items = [["home","⌂"],["earn","✦"],["card","▰"],["grow","↗"]];
  return `<nav class="phone-nav">${items.map(([key,icon]) => `<button class="${key===active ? "active" : ""}">${icon}</button>`).join("")}</nav>`;
}
function goal(name, amount, pct) {
  return `<div class="goal"><div class="goal-top"><span>${name}</span><span>${amount}</span></div><div class="bar"><span style="width:${pct}%"></span></div></div>`;
}
function control(title, value) {
  return `<div class="control"><div><b>${title}</b><br><span>${value}</span></div><button class="edit-btn">Edit</button></div>`;
}

document.querySelectorAll("[data-screen]").forEach((el) => {
  el.innerHTML = screens[el.dataset.screen] || "";
});
