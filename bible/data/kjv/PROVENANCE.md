# King James Version text: where it came from and how it was checked

The files in this folder are the text the Bible app shows. They are public domain (KJV, 1769 standard text).

## How the text was built

1. **Base text:** the King James Version from eBible.org (the `eng-kjv` USFM archive, https://ebible.org/Scriptures/eng-kjv_usfm.zip). It carries paragraph marks, the translators' italics (shown here as [square brackets]), the Psalm titles, the Hebrew-letter headings in Psalm 119 and the notes printed after the epistles.
2. **Cross-checked word by word against four other independent digital copies:**
   - farskipper/kjv (1769, plain text): the second full copy
   - scrollmapper/bible_databases (KJV with Strong's numbers)
   - bibleapi/bibleapi-bibles-json
   - thiagobodruk/bible (en_kjv)
3. **Disputed spellings and punctuation were checked on Bible Hub** (https://biblehub.com/kjv/), which prints the KJV verbatim.

## Results of the checks

- 66 books, 1,189 chapters, 31,102 verses. Every book has exactly the standard KJV verse count.
- The final text agrees word for word with the base text in 99.88% of verses and with the second full copy in 99.68%. No verse is unmatched by all the other copies.
- Corruption scan: no stray symbols, digits, double spaces, broken characters or unbalanced square brackets.
- The app was run against every one of the 1,189 chapters, and every verse displayed equals these files exactly.

## Corrections applied on top of the base text

| What | Where | Why |
|---|---|---|
| Capital S in LORD'S | 105 verses | the printed text uses LORD'S; the base text had a lowercase s |
| Capitals restored in LORD / JAH | 10 verses and Psalm 68:4 | the base text lost the capitals; Bible Hub and the second copy keep them |
| One-word spellings: cannot, whatsoever, whereunto, wherein | 13 verses | the base text splits them; the other copies and Bible Hub do not |
| Hyphens dropped from proper names (Abiezer, Rabshakeh, Selahammahlekoth and similar) | 23 verses | Bible Hub prints them without hyphens |
| Abidah changed to Abida | Genesis 25:4 | Blue Letter Bible, Bible Hub and two copies read Abida |
| "And Joseph" capitalised | Genesis 41:56 | Bible Hub and two copies |
| instructers changed to instructors | 1 Corinthians 4:15 | Bible Hub and two copies |
| (but) in round brackets | 1 John 2:23 | Bible Hub |
| Paragraph mark added | 5 verses | marked in one copy only |

## Conventions you may notice

- Curly apostrophes and the ligature in proper names (Judæa, Cæsar, Cæsarea) follow the printed text.
- "theirs", "ours" and "yours" are written without an apostrophe, as on Bible Hub.
- Exodus 32:32 contains one true dash.
- Psalm titles, Psalm 119 headings and the notes after the epistles are stored separately (`titles`, `heads`, `subs`) and shown outside the verse numbering, as in a printed KJV.

## What this does not prove

This is a careful digital cross-check. It is not a comparison against a physical Pure Cambridge Edition. A few spellings differ between print editions (for example "ankles" and "ancles", "floats" and "flotes", "soap" and "sope"); the more common modern spelling was used.

## Verifying the files

`SHA256SUMS` lists a checksum for every file. From this folder, `shasum -a 256 -c SHA256SUMS` confirms the files have not changed.
