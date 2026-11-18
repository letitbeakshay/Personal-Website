# Majority Standard Bible (MSB): where it came from and how it was checked

The files in this folder are the text the Bible app shows when the Majority Standard Bible is selected. The MSB is dedicated to the public domain (Berean Bible Translation Committee, 30 April 2023). See https://berean.bible/terms.htm and https://ebible.org/engmsb/copyright.htm.

## The rule: the words are exactly the translators' published file

- **Words:** every verse is taken character for character from the translators' own published text file, https://majoritybible.com/msb.txt (last modified 31 July 2026, SHA-256 `99ca452c23fb901a0f5a814b16d9a52fd61015e2e80987d9bf26dfb2ea850d24`). The file is saved in Windows-1252 and was decoded accordingly, so the curly quotes and dashes are correct.
- **Nothing was reworded.** The build script asserts, for all 31,102 verses, that removing only the paragraph mark and the italics brackets gives back the published text exactly.

## What was added from the translators' latest release (format only, never words)

The translators' repository, https://github.com/BSB-publishing/bsb2usfm , release v5.22 (18 November 2026), supplies:

- **Italics:** words the translators supplied, shown here as [square brackets]. They are applied only where the release's words match the published text word for word. Two verses are left without italics because the release's conversion has a flaw there: 1 Samuel 13:1 and Jeremiah 22:24 (the release prints "evenif").
- **Paragraph starts** and the translators' own **section headings** (3,100).

The release is also published in two formats (USFM and USJ). Both were parsed independently and agree on all 31,102 verses and all headings.

## Results of the checks

- 66 books, 1,189 chapters, 31,102 verses.
- Against the latest official release: identical words in 31,101 of 31,102 verses (the one exception is the release's missing space in Jeremiah 22:24).
- Corruption scan: no stray symbols, broken characters, doubled or missing spaces.
- The app was run against every one of the 1,189 chapters, and every verse displayed equals these files exactly, including the italics.

## Things to know

- **Four verses have no text** in this translation, because the Majority Text does not contain them: Luke 17:36, Acts 8:37, Acts 15:34, Acts 24:7. The app shows the verse number and "not in this text".
- **Romans:** the closing praise (Now to Him who is able...) sits at the end of chapter 14 (Romans 14:24-26), as in the Majority Text. Romans 14 has 26 verses and Romans 16 has 24. This is the only chapter-length difference from the KJV, so a note saved on Romans 16:25-27 in the KJV has no matching verse in the MSB.
- **Dashes and quotes:** the translation uses long dashes and curly quotes throughout. They are kept as published.
- **Psalm titles** are part of verse 1, as in the translation.
- **Not included:** the translators' footnotes on textual variants (for example "CT reads ..."). They are in the release and can be added later.

## Other copies differ slightly (the translation is still being revised)

The translators' published file and their latest release agree. Two other copies of the MSB differ from them:

- **eBible.org package** (https://ebible.org/Scriptures/engmsb_usfm.zip, built 30 October 2026): 23 verses differ by words, and the Romans closing praise is numbered 16:25-27. The verses are: Exodus 26:37; Numbers 25:8; Matthew 21:1; Mark 9:38; Mark 11:1; Mark 11:18; Luke 2:22; Luke 18:29; Luke 19:29; Acts 5:39; Acts 8:38; Acts 17:5; Acts 20:28; Acts 22:2; 1 Corinthians 12:25; 2 Corinthians 1:6; 2 Corinthians 1:7; 2 Timothy 1:15; 2 Peter 1:21; 1 John 3:1; Jude 1:11; Revelation 6:17; Revelation 9:16.
- **Bible Hub live pages** (https://biblehub.com/msb/): on 18 November 2026, of those verses it matched the published file in some and the eBible package in others (for example Revelation 9:16 reads "a hundred million" there, and "myriads of myriads" in the published file).

If you would rather follow one of the other copies, say so; the text can be rebuilt from it.

## Verifying the files

`SHA256SUMS` lists a checksum for every file. From this folder, `shasum -a 256 -c SHA256SUMS` confirms the files have not changed.
