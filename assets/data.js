/* DEMO DATA — replace with your own. Everything marked demo:true is placeholder.
   The archive is built entirely from this array, so it is easy to move to Supabase later. */
window.ARCHIVE = [
  { id:"decide-fast-reverse-fast", featured:true, kind:"decision", date:"2026-11-02", title:"Decide fast, reverse fast", summary:"Why we stopped waiting for perfect information on two-way-door decisions.", read:3,
    body:["Demo entry. Most product decisions are two-way doors: if we are wrong, we can walk back through. Treating them like one-way doors costs weeks.",
          "The rule we tried: if reversing costs less than a week, decide in the meeting, write down the assumption, and set a date to check it.",
          "What changed: fewer debates, more written assumptions, and a visible record of which bets paid off."] },
  { id:"on-saying-no", featured:true, kind:"thought", date:"2026-10-24", title:"On saying no to good ideas", summary:"The backlog is not a promise. Constraints are the strategy.", read:4,
    body:["Demo entry. Every good idea has a cost: the thing we did not build instead.",
          "A short list of what we are not doing is more useful than a long list of what we might do.",
          "I keep a 'not now' list on the Now page for this reason."] },
  { id:"book-the-mom-test", kind:"resource", date:"2026-10-12", title:"The Mom Test — notes", summary:"How to ask customer questions that cannot be answered with a polite lie.", read:2,
    body:["Demo entry. Talk about their life, not your idea. Ask about specifics in the past, not opinions about the future.",
          "Useful for: discovery calls, recruiter interviews, and any conversation where you want the truth instead of encouragement."] },
  { id:"first-office-chai", kind:"memory", date:"2026-09-30", title:"The first week of the first office", summary:"A tiny room, one whiteboard, and far too much chai.", read:2,
    body:["Demo entry. A small memory worth keeping: the whiteboard filled up on day one and we never erased the first corner.",
          "I want a place to keep moments like this, so they do not get lost between launches."] },
  { id:"weekly-review-template", kind:"resource", date:"2026-09-18", title:"My weekly review template", summary:"Five questions, fifteen minutes, every Friday.", read:2,
    body:["Demo entry. 1) What moved? 2) What stalled? 3) What did I learn? 4) What am I avoiding? 5) What is the one thing next week?",
          "The point is not the answers. It is having a time-indexed record you can scan months later."] },
  { id:"why-build-in-public", featured:true, kind:"thought", date:"2026-08-21", title:"Why I build in public", summary:"Writing things down in the open changes what I decide.", read:5,
    body:["Demo entry. When I know a decision will be written down, I make it more carefully and explain it more honestly.",
          "The archive is evidence for me first, and for everyone else second."] },
  { id:"pricing-recruiter-pilot", kind:"decision", date:"2026-08-04", title:"Recruiter pilot: charge from day one", summary:"We stopped giving the pilot away. What happened next.", read:4,
    body:["Demo entry. Free pilots attracted curiosity, not commitment. A small fee filtered for teams with a real hiring problem.",
          "Result: fewer pilots, much higher usage per pilot."] }
];

/* Home "Right now" and Now page share these demo values. */
window.NOW = {
  updated: "2026-11-10",
  focus: [
    { title:"Recruiter pilots", note:"Get five recruiter teams hiring through verified skills end to end.", pct:60 },
    { title:"Skill verification flow", note:"Cut the time to a verified skill from days to minutes.", pct:35 },
    { title:"Writing in the archive", note:"One honest entry a week. Decisions first.", pct:80 }
  ],
  notDoing: ["A mobile app", "Custom enterprise integrations", "New hiring verticals"],
  learning: ["Sales conversations that start from the buyer's problem", "Writing shorter and plainer"],
  questions: ["Where does trust break first: the candidate or the recruiter?", "What should be public and what should stay private?"]
};

/* Site-wide settings. Fill in email to enable the "Press C to copy my email" shortcut. */
window.SITE = { since: 2023, tz: "Asia/Kolkata", tzLabel: "IST", email: "", updated: "2026-11-10" };
