/* DEMO DATA: replace with your own. Every entry below is a placeholder.
   kind: "thought" | "resource" | "memory" | "faith"  (shown as a small label next to each note).
   Add a new note by copying one block and changing the id, date, title, summary and body. */
window.ENTRIES = [
  { id:"why-this-site", kind:"thought", date:"2026-11-02", title:"Why I made this site", summary:"A place to keep what I think, in one spot.", read:1,
    body:["Demo entry. Write what you think here, in a few plain sentences. There is no need to write often."] },
  { id:"a-book", kind:"resource", date:"2026-10-12", title:"A book I keep coming back to", summary:"One line on why it is worth your time.", read:1,
    body:["Demo entry. Name the book, and say in a sentence or two why it stayed with you."] },
  { id:"a-small-memory", kind:"memory", date:"2026-09-30", title:"A small memory worth keeping", summary:"Something you do not want to forget.", read:1,
    body:["Demo entry. A moment, a place, a person. Short is fine."] },

  { id:"faith-verse", kind:"faith", date:"2026-11-08", title:"A verse I am sitting with", summary:"What it says, and what it means for me.", read:1,
    body:["Demo entry. Write the verse, then a few lines on what it says and what it is changing in you."] },
  { id:"faith-reflection", kind:"faith", date:"2026-10-20", title:"A reflection from this week", summary:"Something I learned about following Jesus.", read:1,
    body:["Demo entry. Write your own notes here. Short is fine, and it does not need to be polished."] }
];

/* Site-wide settings. Fill in email to show the Copy email button on the Let's talk page. */
window.SITE = {
  since: 2002, // shown as "Est. 2002" at the top of the home page
  updated: "2026-11-11",
  email: "",
  socials: [   // Only entries with a url are shown on the Let's talk page.
    { name: "LinkedIn", handle: "", url: "" },
    { name: "X", handle: "", url: "" },
    { name: "Instagram", handle: "", url: "" }
  ]
};
