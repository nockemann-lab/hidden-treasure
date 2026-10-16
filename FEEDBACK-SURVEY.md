# Teacher feedback survey: protocol and data dictionary

The anonymous survey collects teachers' experiences of using *Hidden Treasure in Your Pocket* with learners. It is designed to (1) improve the resource and (2) provide data for an education research paper. It runs in Microsoft Forms through the University's Microsoft 365 (link: https://forms.cloud.microsoft/e/F84fj7GCvW) and is embedded in section 14 of `teachers.html`, with a button to open it in a new tab and a QR code (`survey-qr.png`). This document describes what is collected and why, and lists what must be in place before the results are used for research.

## What an education paper typically needs, and where it comes from

| Typically reported | Survey sections |
|---|---|
| Context: level and age of learners, type of setting, country or curriculum | A, B |
| Sample: number of learners, classes, teachers (responses) | B, plus the number of responses |
| Implementation: time, format, devices, which components were used, instructions given | C |
| Engagement and learner perceptions (usually rated on a 1–5 scale) | D |
| Learning: achievement of the stated objectives, quiz scores, any before/after check, observed evidence | E |
| Usability and fit with the curriculum (teacher perceptions) | F |
| Open comments: strengths, problems, improvements, learner voice (for short quotes) | C, D, F, G |
| Ethics statement: approval by a research ethics committee and informed consent | Consent questions and the information for participants |

The learning objectives in section E are the ones stated in the teacher guide, so the results can be reported against them. The quiz is the same for everyone (10 questions from a bank of 60), which makes class averages comparable. A stronger design, if wanted later, would add an optional short before/after test that teachers give to their classes; that would need its own ethics review because it involves learners directly.

## Before the results are used for research

1. **Research ethics approval** from the relevant Queen's University Belfast research ethics committee, covering: an anonymous online survey of adult teachers; class-level information only (no data about individual learners, no new data collected from learners); publication of aggregated results and optional anonymous quotes. Education journals typically ask authors to state that informed consent was obtained and, where applicable, ethics approval.
2. **Data protection check** with the University's Information Compliance Unit: the lawful basis stated on the page (public task, UK GDPR Article 6(1)(e)), the data protection contact (the page refers participants to the Information Compliance Unit's details on the QUB website), retention period, and whether a data protection impact assessment is needed.
3. **Confirm with the University** that an "Anyone can respond" Microsoft form is allowed for this purpose (the form was set up this way on 2026-10-16).
4. **Fill in the remaining settings** in `teachers.html` (`FEEDBACK`: ethicsCommittee, ethicsRef, retention; contactEmail is already set), increase `VERSION` in `sw.js`, and send a test response.
5. **Check the participant information text** on the page against the wording the ethics committee approves, and update it if needed.

## The form in Microsoft Forms

The form ("Hidden Treasure in Your Pocket: teacher feedback survey") has the same 36 questions as `survey/Teacher-survey-for-Microsoft-Forms.docx`:

- **Sections:** Consent first, then A–G, each shown as a separate page.
- **Consent:** questions 1–4 are **Required**, each with the single choice "I agree", so a response cannot be sent without all four. Question 5 (quotes) is an optional Yes/No.
- **Tick-all-that-apply questions** (7, 12, 18, 19, 20) allow **Multiple answers**.
- **Rating tables** (23, 25 and 32, in D, E and F) are **Likert** questions: the statements are the rows, and the columns are 1 to 5 with their labels plus "Not used", "Not observed" or "Not sure".
- **Number questions** (14, 15, 17, 27, 28) have the **Number** restriction; the free-text questions use **Long answer**.
- **Settings:** **Anyone can respond**, so teachers outside the University can answer and Forms records no names or email addresses. Email notifications for each response go to the University account; do not forward them to other mailboxes.
- **Continuity:** a form belongs to the account that created it. Add a co-owner or move it to a Microsoft 365 group, so the responses are not lost if the account changes.

If the form is ever replaced, update the `iframe` address and the link in section 14 of `teachers.html`, replace `survey-qr.png` (from **Collect responses** > QR code), and increase `VERSION` in `sw.js`. Rebuilding the form with Quick import from the Word file needs careful checking: it does not set up the Likert questions, required questions or restrictions.

## Design choices for anonymity

- No names, email addresses, school names or exact dates (month and year only); location only as UK nation, Ireland, another European country or outside Europe.
- Only class-level information about learners; free-text boxes remind teachers not to include identifying details.
- The resource website itself uses no cookies, analytics or tracking. Microsoft Forms uses its own cookies; with "Anyone can respond" it does not record names or email addresses.
- Because answers are anonymous, they cannot be withdrawn after submission; the information for participants says so.
- Consent for publishing short anonymous quotes is a separate, optional question (5, `consent_quotes`). Only use quotes from responses where it is "Yes".

## Handling the data

- Download the responses with **Open results in Excel** in Microsoft Forms, keep the file on University storage, and delete the responses from the form at the end of the retention period.
- Before analysis or sharing, read the free-text answers and remove anything that could still identify a person or school.
- Report combined results (counts, medians and ranges for the 1–5 scales, total learners reached); avoid reporting small subgroups that could identify a school (e.g. a single response from one region and setting).
- If the data is shared openly with a paper, share only the cleaned, anonymised file.

## Data dictionary

The Excel export has one column per question, headed by the question text (for the rating tables, one column per row), plus Forms' own ID and start and completion times. The short names below are suggested column names for analysis; the questions are in the same order as in the form. Multiple answers are separated by semicolons. Every question except consent questions 1–4 is optional.

**Consent**

| Column | Question | Answer format |
|---|---|---|
| `consent_read`, `consent_adult`, `consent_use`, `consent_noid` | Questions 1–4 (read the information; 18 or over; use of answers; no identifying details) | "I agree" (required) |
| `consent_quotes` | Do you agree that short anonymous quotes from your written answers may be published? | one of: Yes / No |

**A. You and your setting**

| Column | Question | Answer format |
|---|---|---|
| `role` | Your role | one of: Secondary school teacher / Primary school teacher / Post-16 / college teacher / Teaching assistant or technician / Outreach, STEM ambassador or museum educator / University staff or student / Other |
| `subjects` | Subject(s) in which you used it (tick all that apply) | any of: Chemistry / General science / Physics / Geography / Design & technology / Citizenship / sustainability / Other |
| `experience` | Your teaching experience | one of: Less than 3 years / 3–10 years / More than 10 years |
| `region` | Where you teach | one of: Northern Ireland / England / Scotland / Wales / Republic of Ireland / Another European country / Outside Europe |
| `setting` | Setting | one of: State-funded school / Independent school / Further education or sixth-form college / Outreach event, science festival or museum / Home education / Other |
| `month_used` | When did you use it? Month and year only (e.g. March 2026) | short text |

**B. Your learners**

| Column | Question | Answer format |
|---|---|---|
| `age_groups` | Age group(s) of the learners (tick all that apply) | any of: Under 11 / 11–12 / 12–14 / 14–16 / 16–18 / Adults |
| `level` | Year group, level or course (e.g. Year 9, S2, GCSE Chemistry) | short text |
| `n_learners` | About how many learners took part in total? | number |
| `n_groups` | In how many classes or groups? | number |
| `prior` | How much had the learners already learned about the periodic table? | one of: Very little / Some / A lot |

**C. How you used the resource**

| Column | Question | Answer format |
|---|---|---|
| `minutes` | About how many minutes did learners spend on it in total? | number |
| `format` | How was it used? (tick all that apply) | any of: Whole class, shown on a board or screen / Individually on devices / In pairs or small groups / As homework / At an event or exhibition (kiosk mode) / Other |
| `devices` | Devices (tick all that apply) | any of: Desktop computers or laptops / Chromebooks / Tablets / Phones / Interactive whiteboard or projector |
| `sections_used` | Which parts did learners use? (tick all that apply) | any of: 3D phone / exploded-view photo / Element cards / Periodic table / Element of the day / Quick question / Quiz / Recycling game / Drawer challenge / What Can YOU Do? / Printed worksheet / Lesson plan or discussion questions from this guide |
| `plan` | Which best describes your lesson? | one of: I followed the suggested lesson plan / I adapted the suggested lesson plan / I used my own lesson plan / Learners explored freely with little instruction |
| `instructions` | Briefly describe the instructions or tasks you gave the learners. | free text |

**D. Engagement** (How engaged were your learners with each part? (1 = very low, 5 = very high))

| Column | Question | Answer format |
|---|---|---|
| `eng_explorer` | 3D phone / photo | 1–5 (very low to very high) or "Not used" |
| `eng_cards` | Element cards | 1–5 (very low to very high) or "Not used" |
| `eng_ptable` | Periodic table | 1–5 (very low to very high) or "Not used" |
| `eng_welcome` | Element of the day / Quick question | 1–5 (very low to very high) or "Not used" |
| `eng_quiz` | Quiz | 1–5 (very low to very high) or "Not used" |
| `eng_game` | Recycling game | 1–5 (very low to very high) or "Not used" |
| `eng_drawer` | Drawer challenge / What Can YOU Do? | 1–5 (very low to very high) or "Not used" |
| `eng_worksheet` | Worksheet | 1–5 (very low to very high) or "Not used" |
| `eng_overall` | Overall | 1–5 (very low to very high) or "Not used" |
| `eng_best` | Which part worked best with your learners, and why? | free text |

**E. Learning** (In your judgement, how well did learners achieve these learning objectives? (1 = not at all, 5 = fully))

| Column | Question | Answer format |
|---|---|---|
| `lo_parts` | Name the main parts of a phone and some elements in each | 1–5 (not at all to fully) or "Not observed" |
| `lo_properties` | Link properties of elements to their uses | 1–5 (not at all to fully) or "Not observed" |
| `lo_critical` | Explain what makes a raw material "critical" | 1–5 (not at all to fully) or "Not observed" |
| `lo_ethics` | Describe environmental, social and ethical issues of mining | 1–5 (not at all to fully) or "Not observed" |
| `lo_urbanmine` | Explain the "urban mine" and why reuse, repair and recycling matter | 1–5 (not at all to fully) or "Not observed" |
| `lo_data` | Interpret and compare data | 1–5 (not at all to fully) or "Not observed" |
| `quiz_taken` | Did learners take the quiz? | one of: All of them / Most of them / Some of them / No |
| `quiz_avg` | If known: average quiz score | number |
| `quiz_out_of` | The average quiz score was out of how many questions? (10 unless you changed it) | number |
| `prepost` | Did you check learners' knowledge before and after (e.g. a short test or show of hands)? | one of: Yes / No |
| `prepost_results` | If yes: what did it show? (class-level results only) | free text |
| `evidence` | What evidence of learning did you notice (e.g. questions asked, discussions, worksheet answers)? | free text |

**F. Using the resource** (How far do you agree? (1 = strongly disagree, 5 = strongly agree))

| Column | Question | Answer format |
|---|---|---|
| `use_easy` | It was easy to set up and use in class | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `use_level` | The content was at the right level for my learners | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `use_curriculum` | It fits my curriculum | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `use_clear` | The information is clear and accurate | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `use_devices` | It worked well on our devices | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `use_again` | I would use it again | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `use_recommend` | I would recommend it to colleagues | 1–5 (strongly disagree to strongly agree) or "Not sure" |
| `problems` | Did you have any technical or practical problems? | free text |

**G. Your views**

| Column | Question | Answer format |
|---|---|---|
| `improve` | What should be improved, added or changed? | free text |
| `learner_voice` | Comments, questions or ideas from your learners worth sharing (anonymous paraphrases, no names) | free text |
| `general` | Any other feedback | free text |

