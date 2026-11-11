/* DEMO DATA: replace with your own. Every entry below is a placeholder.
   kind: "thought" | "resource" | "memory"   tag: a short category shown on the entry.
   Add featured:true to pin an entry to "Start here" on the home page.
   This is easy to move to Supabase later. */
window.ENTRIES = [
  { id:"decide-fast-reverse-fast", kind:"thought", tag:"Decision", date:"2026-11-02", title:"Decide fast, reverse fast", summary:"Why we stopped waiting for perfect information on two-way-door decisions.", read:3,
    body:["Demo entry. Most product decisions are two-way doors: if we are wrong, we can walk back through. Treating them like one-way doors costs weeks.",
          "The rule we tried: if reversing costs less than a week, decide in the meeting, write down the assumption, and set a date to check it.",
          "What changed: fewer debates, more written assumptions, and a visible record of which bets paid off."] },
  { id:"on-saying-no", kind:"thought", tag:"Product", date:"2026-10-24", title:"On saying no to good ideas", summary:"The backlog is not a promise. Constraints are the strategy.", read:4,
    body:["Demo entry. Every good idea has a cost: the thing we did not build instead.",
          "A short list of what we are not doing is more useful than a long list of what we might do.",
          "I keep a 'not now' list on the About page for this reason."] },
  { id:"why-build-in-public", kind:"thought", tag:"Reflection", date:"2026-08-21", title:"Why I build in public", summary:"Writing things down in the open changes what I decide.", read:5,
    body:["Demo entry. When I know a decision will be written down, I make it more carefully and explain it more honestly.",
          "This site is evidence for me first, and for everyone else second."] },
  { id:"pricing-recruiter-pilot", kind:"thought", tag:"Decision", date:"2026-08-04", title:"Recruiter pilot: charge from day one", summary:"We stopped giving the pilot away. What happened next.", read:4,
    body:["Demo entry. Free pilots attracted curiosity, not commitment. A small fee filtered for teams with a real hiring problem.",
          "Result: fewer pilots, much higher usage per pilot."] },

  { id:"book-the-mom-test", kind:"resource", tag:"Book", date:"2026-10-12", title:"The Mom Test", summary:"How to ask customer questions that cannot be answered with a polite lie.", read:2,
    body:["Demo entry. Talk about their life, not your idea. Ask about specifics in the past, not opinions about the future.",
          "Useful for: discovery calls, recruiter interviews, and any conversation where you want the truth instead of encouragement."] },
  { id:"weekly-review-template", kind:"resource", tag:"Template", date:"2026-09-18", title:"My weekly review template", summary:"Five questions, fifteen minutes, every Friday.", read:2,
    body:["Demo entry. 1) What moved? 2) What stalled? 3) What did I learn? 4) What am I avoiding? 5) What is the one thing next week?",
          "The point is not the answers. It is having a time-indexed record you can scan months later."] },
  { id:"tool-issue-tracker", kind:"resource", tag:"Tool", date:"2026-07-09", title:"The tool I use to run the roadmap", summary:"Placeholder: one tool, one line on why it earned its place.", read:1,
    body:["Demo entry. Name the tool, say what you use it for, and say what you tried before it."] },

  { id:"first-office-chai", kind:"memory", tag:"Moment", date:"2026-09-30", title:"The first week of the first office", summary:"A tiny room, one whiteboard, and far too much chai.", read:2,
    body:["Demo entry. A small memory worth keeping: the whiteboard filled up on day one and we never erased the first corner.",
          "I want a place to keep moments like this, so they do not get lost between launches."] },
  { id:"year-end-2025", kind:"memory", tag:"Year-end", date:"2025-12-30", title:"Year-end note to self, 2025", summary:"Placeholder: what the year taught, what to carry into the next one.", read:3,
    body:["Demo entry. A short letter to future you. What happened, what you learned, and what you want to remember about how it felt."] },

  { id:"exp-paid-pilot", kind:"experiment", tag:"Running", date:"2026-10-15", title:"Charging for the recruiter pilot", summary:"A small fee filters for teams with a real hiring problem.", read:2,
    hypothesis:"A small pilot fee will filter for teams with a real hiring problem and raise usage per pilot.",
    result:"Demo: usage per pilot is up so far. Sample size is still small, so this stays open.",
    body:["Demo entry. Started in October. Success means fewer pilots, but higher weekly usage in each one."] },
  { id:"exp-weekly-log", kind:"experiment", tag:"Learned", date:"2026-08-01", title:"A weekly public log", summary:"Does writing one note a week improve our decisions?", read:2,
    hypothesis:"Writing one public note a week will reduce repeated debates and make decisions faster.",
    result:"Demo: fewer repeated debates. Kept, and it became this website.",
    body:["Demo entry. Ran for eight weeks. The habit stuck, so it moved from experiment to routine."] },
  { id:"exp-five-minute-check", kind:"experiment", tag:"Shelved", date:"2026-06-12", title:"A five-minute skill check", summary:"Can a candidate prove one skill in five minutes?", read:2,
    hypothesis:"A five-minute check is enough for a candidate to show one real skill.",
    result:"Demo: candidates dropped off at the third step. Shelved until the flow is simpler.",
    body:["Demo entry. Worth revisiting once the verification flow is shorter."] }
];

/* Shared demo values for the About page ("Right now"). */
window.NOW = {
  updated: "2026-11-10",
  focus: [
    { title:"Recruiter pilots", note:"Get five recruiter teams hiring through verified skills end to end.", pct:60 },
    { title:"Skill verification flow", note:"Cut the time to a verified skill from days to minutes.", pct:35 },
    { title:"Writing in the open", note:"One honest entry a week. Decisions first.", pct:80 }
  ],
  notDoing: ["A mobile app", "Custom enterprise integrations", "New hiring verticals"],
  learning: ["Sales conversations that start from the buyer's problem", "Writing shorter and plainer"],
  questions: ["Where does trust break first: the candidate or the recruiter?", "What should be public and what should stay private?"]
};

/* Site-wide settings. Fill in email to enable the "Press C to copy my email" shortcut. */
window.SITE = {
  born: "2002-05-31", horizonAge: 60, // drives the "days left" counter on the home page
  since: 2002, // shown as "Est. 2002" at the top of the home page
  updated: "2026-11-10",
  email: "",   // e.g. "you@example.com". Enables the Copy email button and the "Press C" shortcut.
  socials: [   // Only entries with a url are shown on the Let's talk page.
    { name: "LinkedIn", handle: "", url: "" },
    { name: "X", handle: "", url: "" },
    { name: "Instagram", handle: "", url: "" }
  ]
};
