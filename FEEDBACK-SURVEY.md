# Teacher feedback survey: protocol and data dictionary

The anonymous survey in section 14 of `teachers.html` collects teachers' experiences of using *Hidden Treasure in Your Pocket* with learners. It is designed to (1) improve the resource and (2) provide data for an education research paper, for example an Activity or Communication article in the *Journal of Chemical Education*. This document describes what is collected and why, and lists what must be in place before the survey goes live.

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
| Ethics statement: approval by a research ethics committee and informed consent | Consent boxes and the information for participants |

The learning objectives in section E are the ones stated in the teacher guide, so the results can be reported against them. The quiz is the same for everyone (10 questions from a bank of 60), which makes class averages comparable. A stronger design, if wanted later, would add an optional short before/after test that teachers give to their classes; that would need its own ethics review because it involves learners directly.

## Before the survey goes live

1. **Research ethics approval** from the relevant Queen's University Belfast research ethics committee, covering: an anonymous online survey of adult teachers; class-level information only (no data about individual learners, no new data collected from learners); publication of aggregated results and optional anonymous quotes. *J. Chem. Educ.* asks authors to state that informed consent was obtained and, where applicable, ethics/IRB approval.
2. **Data protection check** with the University's Information Compliance Unit: the lawful basis stated on the page (public task, UK GDPR Article 6(1)(e)), the data protection contact (`info.compliance@qub.ac.uk` is used; some QUB notices give `dpo@qub.ac.uk` for the Data Protection Officer), retention period, and whether a data protection impact assessment is needed.
3. **Choose the form service** and check it with the University (a data processing agreement, where the data is stored, whether it logs IP addresses and for how long). Prefer a University-approved service, or one that can switch off IP logging and stores data in the UK/EU.
4. **Fill in the settings** in `teachers.html` (`FEEDBACK`: endpoint, processor, contactEmail, ethicsCommittee, ethicsRef, retention), increase `VERSION` in `sw.js`, and send a test response.
5. **Check the participant information text** on the page against the wording the ethics committee approves, and update it if needed.

## Design choices for anonymity

- No names, email addresses, school names or exact dates (month and year only); location only as UK nation, Ireland, another European country or outside Europe.
- Only class-level information about learners; free-text boxes remind teachers not to include identifying details.
- No cookies, analytics or tracking; the request is sent without credentials or referrer. A hidden spam trap and a 5-second minimum time stop most automated submissions without a third-party CAPTCHA.
- Because answers are anonymous, they cannot be withdrawn after submission; the information for participants says so.
- Consent for publishing short anonymous quotes is a separate, optional box (`consent_quotes`). Only use quotes from responses where it is `yes`.

## Handling the data

- Download the responses from the form service as CSV (one column per key below), store them on University storage, and delete them from the form service afterwards.
- Before analysis or sharing, read the free-text answers and remove anything that could still identify a person or school.
- Report combined results (counts, medians and ranges for the 1–5 scales, total learners reached); avoid reporting small subgroups that could identify a school (e.g. a single response from one region and setting).
- If the data is shared openly with a paper, share only the cleaned, anonymised file.

## Data dictionary

Every question except the consent boxes is optional. Each response also contains `form_version` (currently `1.0`) and `consent_quotes` (`yes` or `no`). The four required consent boxes must be ticked before anything can be sent, so they are not stored separately.

**A. You and your setting**

| Column | Question | Answer format |
|---|---|---|
| `role` | Your role | one of: Secondary school teacher / Primary school teacher / Post-16 / college teacher / Teaching assistant or technician / Outreach, STEM ambassador or museum educator / University staff or student / Other |
| `subjects` | Subject(s) in which you used it | any of: Chemistry / General science / Physics / Geography / Design & technology / Citizenship / sustainability / Other (joined with "; ") |
| `experience` | Your teaching experience | one of: Less than 3 years / 3–10 years / More than 10 years |
| `region` | Where you teach | one of: Northern Ireland / England / Scotland / Wales / Republic of Ireland / Another European country / Outside Europe |
| `setting` | Setting | one of: State-funded school / Independent school / Further education or sixth-form college / Outreach event, science festival or museum / Home education / Other |
| `month_used` | When did you use it? (month and year) | year-month (YYYY-MM) |

**B. Your learners**

| Column | Question | Answer format |
|---|---|---|
| `age_groups` | Age group(s) of the learners | any of: Under 11 / 11–12 / 12–14 / 14–16 / 16–18 / Adults (joined with "; ") |
| `level` | Year group, level or course (e.g. Year 9, S2, GCSE Chemistry) | short text |
| `n_learners` | About how many learners took part in total? | number 1–5000 |
| `n_groups` | In how many classes or groups? | number 1–200 |
| `prior` | How much had the learners already learned about the periodic table? | one of: Very little / Some / A lot |

**C. How you used the resource**

| Column | Question | Answer format |
|---|---|---|
| `minutes` | About how many minutes did learners spend on it in total? | number 1–1000 |
| `format` | How was it used? | any of: Whole class, shown on a board or screen / Individually on devices / In pairs or small groups / As homework / At an event or exhibition (kiosk mode) / Other (joined with "; ") |
| `devices` | Devices | any of: Desktop computers or laptops / Chromebooks / Tablets / Phones / Interactive whiteboard or projector (joined with "; ") |
| `sections_used` | Which parts did learners use? | any of: 3D phone / exploded-view photo / Element cards / Periodic table / Element of the day / Quick question / Quiz / Recycling game / Drawer challenge / What Can YOU Do? / Printed worksheet / Lesson plan or discussion questions from this guide (joined with "; ") |
| `plan` | Which best describes your lesson? | one of: I followed the suggested lesson plan / I adapted the suggested lesson plan / I used my own lesson plan / Learners explored freely with little instruction |
| `instructions` | Briefly describe the instructions or tasks you gave the learners. | free text (max 2,000 characters) |

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
| `eng_best` | Which part worked best with your learners, and why? | free text (max 2,000 characters) |

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
| `quiz_avg` | If known: average quiz score | number 0–60 |
| `quiz_out_of` | out of (10 unless you changed it) | number 1–60 |
| `prepost` | Did you check learners' knowledge before and after (e.g. a short test or show of hands)? | one of: Yes / No |
| `prepost_results` | If yes: what did it show? (class-level results only) | free text (max 2,000 characters) |
| `evidence` | What evidence of learning did you notice (e.g. questions asked, discussions, worksheet answers)? | free text (max 2,000 characters) |

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
| `problems` | Did you have any technical or practical problems? | free text (max 2,000 characters) |

**G. Your views**

| Column | Question | Answer format |
|---|---|---|
| `improve` | What should be improved, added or changed? | free text (max 2,000 characters) |
| `learner_voice` | Comments, questions or ideas from your learners worth sharing (anonymous paraphrases, no names) | free text (max 2,000 characters) |
| `general` | Any other feedback | free text (max 2,000 characters) |

`quiz_out_of` is only sent when an average quiz score is given.
