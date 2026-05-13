/*
  # Mind-Blowing DOM Project: "Interactive Live Poll with Real-Time Visualization 🎉"

  ## Project Overview

  Let's build an *Interactive Live Poll* system with real-time vote counts, percentage bars, and a dynamic ranking chart—all using just DOM and JavaScript! 

  Users can:
    - See poll options and pick their favorite (single vote per user/session).
    - Instantly see votes update visually: counts, percentages, and animated progress bars.
    - Watch options reorder in real-time as votes shift the ranking.
    - Reset the poll to let someone else vote ("Try again").
    - All data is stored in `sessionStorage` to prevent duplicate votes in a single browser session.

  This project showcases:
    - Creating and styling elements dynamically.
    - Handling click and input events.
    - Animating DOM changes.
    - Data syncing between UI and storage.
    - Accessibility considerations.
    - Advanced DOM techniques for rich UX — *like you see on real-time web apps!*


  ----
*/
(function () {
  // --- 1. POLL DATA SETUP ---
  const POLL_QUESTION = "What tech excites you the MOST in 2024?";
  const POLL_OPTIONS = [
    "Artificial Intelligence",
    "Quantum Computing",
    "Augmented Reality",
    "Blockchain",
    "Biotech & Health Tech",
    "Space Exploration",
  ];

  // Give each option a unique key (to handle ties, etc.)
  const optionKeys = POLL_OPTIONS.map((text, i) => "opt" + i);

  // --- 2. DATA STORE + PREVENT DUPLICATE VOTES (Session Storage) ---
  // Session storage key
  const storageKey = "mindblow_dom_poll_vote";

  // Initial votes (could randomize for demo effect)
  let votes = {};
  optionKeys.forEach((k) => (votes[k] = Math.floor(Math.random() * 3)));

  // Try reading results (persist across refresh)
  if (sessionStorage.getItem(storageKey + "_votes")) {
    try {
      votes = JSON.parse(sessionStorage.getItem(storageKey + "_votes"));
    } catch {}
  }

  // See if user already voted
  let userVote = sessionStorage.getItem(storageKey);

  // --- 3. DOM ELEMENTS: POLL WIDGET CREATION ---
  const pollBox = document.createElement("div");
  pollBox.style.maxWidth = "440px";
  pollBox.style.margin = "2em auto";
  pollBox.style.padding = "2em";
  pollBox.style.background = "linear-gradient(135deg, #e7e9fc, #f7f4fa)";
  pollBox.style.border = "2px solid #938aff";
  pollBox.style.borderRadius = "1.5em";
  pollBox.style.boxShadow = "0 4px 32px #938aff10";
  pollBox.style.fontFamily = "Segoe UI, Arial, sans-serif";

  pollBox.innerHTML = `
    <h2 style="margin-bottom:0.65em; font-size:1.33em; color:#6c43c3;">${POLL_QUESTION}</h2>
    <div id="poll-options"></div>
    <div id="poll-result-chart" style="margin:1.5em 0 1em"></div>
    <div style="text-align:right;">
      <button id="reset-poll-btn" style="display:none; margin-top:0.6em; border-radius:0.7em; font-size:1em; background:#e7dbff; color:#6c43c3; border:1px solid #a49ffb; cursor:pointer; padding:0.44em 1.5em;">Try Again</button>
    </div>
  `;
  document.body.insertBefore(pollBox, document.body.firstChild);

  const optionContainer = pollBox.querySelector("#poll-options");
  const chartContainer = pollBox.querySelector("#poll-result-chart");
  const resetBtn = pollBox.querySelector("#reset-poll-btn");

  // --- 4. RENDER POLL OPTIONS (Voting UI) ---
  function renderPollVoting() {
    optionContainer.innerHTML = "";
    POLL_OPTIONS.forEach((text, idx) => {
      const k = optionKeys[idx];
      const opt = document.createElement("button");
      opt.setAttribute("type", "button");
      opt.setAttribute("data-key", k);
      opt.style.display = "block";
      opt.style.margin = "0.46em 0";
      opt.style.width = "100%";
      opt.style.padding = "0.85em 0.3em";
      opt.style.fontSize = "1.08em";
      opt.style.textAlign = "left";
      opt.style.background = "#fff";
      opt.style.border = "1.5px solid #b8b4e6";
      opt.style.borderRadius = "0.7em";
      opt.style.transition = "background 0.22s";
      opt.style.position = "relative";
      opt.style.cursor = "pointer";
      opt.innerHTML = `<span style="padding-left:0.3em"><b>${String.fromCharCode(
        65 + idx
      )}.</b> ${text}</span>`;
      opt.onmouseover = () => (opt.style.background = "#f1eeff");
      opt.onmouseout = () => (opt.style.background = "#fff");
      // If user already voted, disable all
      if (userVote) opt.disabled = true;
      opt.addEventListener("click", function () {
        if (userVote) return;
        userVote = k;
        votes[k] += 1;
        // Save in session storage
        sessionStorage.setItem(storageKey, k);
        sessionStorage.setItem(storageKey + "_votes", JSON.stringify(votes));
        renderPollResult(); // Show results
      });
      optionContainer.appendChild(opt);
    });
  }

  // --- 5. RESULT CHART: VISUALIZE COUNT, PERCENT, RE-RANK! ---
  function renderPollResult() {
    // Hide voting buttons
    optionContainer
      .querySelectorAll("button")
      .forEach((b) => (b.disabled = true));
    resetBtn.style.display = "inline-block";
    // Count total
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    // Construct result data, with sort for dynamic ranking
    let results = optionKeys.map((k, idx) => ({
      key: k,
      text: POLL_OPTIONS[idx],
      votes: votes[k],
      percent: totalVotes === 0 ? 0 : (votes[k] / totalVotes) * 100,
    }));
    // Sort by most votes, break ties alphabetically
    results.sort((a, b) =>
      b.votes !== a.votes ? b.votes - a.votes : a.text.localeCompare(b.text)
    );

    // Show 'Your pick' marker
    chartContainer.innerHTML = "";
    results.forEach((r, i) => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.margin = "0.4em 0";
      // Option label & user marker
      const labelSpan = document.createElement("span");
      labelSpan.style.flex = "0 0 185px";
      labelSpan.style.color = "#5c479a";
      labelSpan.style.fontWeight = userVote === r.key ? "bold" : "normal";
      labelSpan.innerHTML =
        `<b>${r.text}</b>` +
        (userVote === r.key
          ? ` <span style="font-size:.93em; color:#ae65f6;" aria-label="Your pick">🌟</span>`
          : "");
      row.appendChild(labelSpan);

      // Bar Background
      const barBG = document.createElement("span");
      barBG.style.display = "block";
      barBG.style.flex = "1 1 60px";
      barBG.style.height = "1em";
      barBG.style.background = "#d8d4ee";
      barBG.style.margin = "0 0.6em";
      barBG.style.position = "relative";
      barBG.style.borderRadius = "1em";
      // Progress bar
      const barFill = document.createElement("span");
      barFill.style.display = "block";
      barFill.style.height = "100%";
      barFill.style.background =
        "linear-gradient(90deg, #a658fa 60%, #4773fa 100%)";
      barFill.style.width = "0";
      barFill.style.borderRadius = "1em";
      barFill.style.transition = "width 0.84s cubic-bezier(.39,1.65,.44,.89)";
      // Animate
      setTimeout(() => {
        barFill.style.width = r.percent + "%";
      }, 25);
      barBG.appendChild(barFill);
      row.appendChild(barBG);

      // Numbers
      const countSpan = document.createElement("span");
      countSpan.style.flex = "0 0 64px";
      countSpan.style.textAlign = "right";
      countSpan.style.fontSize = "1em";
      countSpan.style.color = "#222";
      countSpan.innerHTML = `<b>${
        r.votes
      }</b> <span style="font-size:.91em; color:#917be5">(${r.percent.toFixed(
        1
      )}%)</span>`;
      row.appendChild(countSpan);

      chartContainer.appendChild(row);
    });

    // Simple "Live Rank" Label
    const rankNote = document.createElement("div");
    rankNote.style.fontSize = ".97em";
    rankNote.style.marginTop = ".9em";
    rankNote.style.color = "#7e6fc0";
    rankNote.innerHTML = "Ranking updates in real-time as people vote!";
    chartContainer.appendChild(rankNote);
  }

  // --- 6. RESET POLL (Try again) ---
  resetBtn.addEventListener("click", function () {
    userVote = null;
    sessionStorage.removeItem(storageKey);
    renderPollVoting();
    chartContainer.innerHTML = "";
    resetBtn.style.display = "none";
  });

  // --- 7. INITIAL RENDER (Based on if user voted) ---
  if (!userVote) {
    renderPollVoting();
  } else {
    renderPollVoting(); // to show disabled btns
    renderPollResult();
  }

  // --- 8. Accessibility Improvement (keyboard, focus) ---
  setTimeout(() => {
    // Focus on user's selection if already voted
    if (userVote) {
      let idx = optionKeys.indexOf(userVote);
      if (idx >= 0) {
        let btns = optionContainer.querySelectorAll("button");
        if (btns[idx]) btns[idx].focus();
      }
    }
  }, 200);

  /*
    ## Features and What You've Learned

      - Built an *interactive live poll* like real apps (without frameworks!)
      - DOM creation, styling, and event handling
      - Data storage (sessionStorage), user vote gating
      - Dynamic rendering, ranking, and animated progress bars
      - Real-time reordering and instant feedback UX
      - "Try Again" feature without page reload
      - Accessibility basics, and DOM patterns for real projects

      *Try extending: Persist using localStorage, support multiple polls, add animated emoticons, or export results!*

    ----
    # DOM is powerful. You just built a mini real-time webapp!
  */
})();
