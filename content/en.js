/*
 * English text for "Hidden Treasure in Your Pocket".
 * This file is the template for translations – see content/languages.js.
 *
 *   ui       – interface text, by key. {name} placeholders are filled in by the page.
 *   elements – element / material names, by symbol.
 *   layers   – the phone parts: title, element texts, statistics and facts.
 *   quiz     – quiz questions. The FIRST option is always the correct answer
 *              (the quiz shuffles the options). img: [file, alt text, credit HTML].
 *
 * Facts and figures are referenced under "Sources & image credits" on the main page.
 */
window.SITE_CONTENT = window.SITE_CONTENT || {};
window.SITE_CONTENT.en = (function () {
    const VALUE_NOTE = 'Value = metals contained, at 2021 prices (converted from US$ at the 2021 average rate of $1.38 = £1), averaged over 15 phones made 2002–2015 (Gómez et al., 2023). Recycling costs not included.';

    return {
        ui: {
            // Header & page
            'doc.title': 'Hidden Treasure in Your Pocket – critical elements in smartphones',
            'header.eyebrow': 'An interactive guide to critical elements',
            'header.title': 'Hidden <span class="gold">Treasure</span> in Your Pocket',
            'header.sub': 'Discover the elements hidden inside a smartphone – what they do, where they come from, and why they matter.',
            'nav.quiz': 'Take the quiz',
            'nav.teachers': 'For teachers',
            'nav.explore': 'Explore the phone',
            'nav.ptable': 'Periodic table',
            'theme.toDark': 'Switch to dark mode',
            'theme.toLight': 'Switch to light mode',
            'lang.label': 'Language',

            // Phone image & parts
            'step1': 'Tap a part of the phone',
            'img.alt': 'Exploded view of a smartphone: display, camera, circuit board, casing and battery',
            'part.screen': 'Display (Screen)',
            'part.cameraFront': 'Front Camera',
            'part.cameraRear': 'Rear Camera',
            'part.pcb': 'Circuit Board (PCB)',
            'part.speaker': 'Speaker & Magnets',
            'part.battery': 'Li-Ion Battery',
            'part.casing': 'Casing',
            'short.screen': 'Display',
            'short.camera': 'Camera',
            'short.pcb': 'Circuit board',
            'short.speaker': 'Speaker',
            'short.battery': 'Battery',
            'short.casing': 'Casing',

            // Exploration progress
            'progress.title': 'Parts explored:',
            'progress.count': '{n} of {total}',
            'progress.visited': 'explored',
            'progress.done': 'You have explored every part – ready for the quiz?',

            // Legend
            'legend.precious': 'Precious metals',
            'legend.tech': 'Technology metals',
            'legend.rare': 'Rare earth elements',
            'legend.base': 'Common metals & materials',
            'legend.crm': 'On EU or US critical list',

            // Welcome panel
            'welcome.title': "What's hidden inside your phone?",
            'welcome.lead': 'Your phone is a treasure chest of chemistry. Many of its elements are <strong>critical raw materials</strong> – vital for modern technology, but with supplies at risk.',
            'welcome.stat1.num': '60–70',
            'welcome.stat1': 'chemical elements can be found in a smartphone',
            'welcome.stat2.num': '93%',
            'welcome.stat2': 'of the metal value comes from gold, silver, platinum and palladium – under 1.5% of the metal',
            'welcome.stat3.num': '22%',
            'welcome.stat3': "of the world's e-waste was properly recycled in 2022",
            'welcome.step1': '<strong>Tap a part</strong> of the phone',
            'welcome.step2': '<strong>Tap an element</strong> to reveal its secrets',
            'welcome.step3': '<strong>Take the quiz</strong> to test yourself',

            // Info cards
            'card.step2': 'Tap an element to inspect',
            'card.instruction': 'Tap a tile above to see image & details',
            'card.crit': 'On critical-materials lists:',
            'card.eu': 'EU',
            'card.us': 'USA',
            'card.photo': 'Photo:',
            'card.prev': 'Previous',
            'card.next': 'Next',
            'card.pos': '{n} / {total}',

            // Periodic table
            'pt.title': 'Your phone on the periodic table',
            'pt.intro': 'The {n} elements in this guide are highlighted. Tap one to find out where it is used in a phone. (Plastics are not elements, so they are not on the table.)',
            'pt.label': 'Periodic table of the elements',
            'pt.scroll': 'Scroll sideways to see the whole table',
            'pt.pick': 'Tap a highlighted element above to see where it is in the phone.',
            'pt.foundIn': 'Found in:',
            'pt.close': 'Close',
            'pt.mini': 'Where is {name} on the periodic table? Open the full table',
            'pt.miniCaption': 'Periodic table',
            'pt.lanthanides': 'Lanthanides',
            'pt.actinides': 'Actinides',

            // What can you do?
            'action.title': 'What Can YOU Do?',
            'action.recycle.title': 'Recycle Your Old Phones',
            'action.recycle.desc': 'Take them to a certified e-waste collection point. Never put phones or batteries in the household bin – damaged lithium-ion batteries can start fires.',
            'action.repair.title': "Repair, Don't Replace",
            'action.repair.desc': 'Keep phones longer by repairing instead of buying new.',
            'action.donate.title': 'Donate or Resell',
            'action.donate.desc': 'Working phones can have a second life with someone else.',
            'action.spread.title': 'Spread Awareness',
            'action.spread.desc': 'Tell others about the value hidden in electronic waste!',
            'action.value': 'The 5 billion phones expected to be thrown away in 2022 contained metals worth an estimated £6.7 billion (US$9.25 billion) – value we only get back if phones are collected and recycled.',
            'action.recycled': "Yet in 2022 only 22% of the world's electronic waste was documented as properly collected and recycled.",

            // Sources
            'sources.summary': 'Sources & image credits',
            'sources.main': 'Main data source',
            'sources.mainNote': 'Component values, weights and metal contents on this page come from this study: 15 phones made between 2002 and 2015, with metal prices from 2021. Batteries were not analysed in the study.',
            'sources.other': 'Other sources',
            'sources.illustration': 'Phone illustration',
            'sources.illustrationText': 'Exploded-view phone illustration created by Peter Nockemann using Google Gemini (AI image generation).',
            'sources.photos': 'Element photos',
            'sources.photosText': 'From Wikimedia Commons, resized and cropped for display. Click a name to see the original file and its licence.',

            // Footer
            'footer.source': 'Main data source:',
            'footer.copyright': '© 2025–2026 Prof. Peter Nockemann. Licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, except element photos, which keep their own licences (see credits).',

            // Exhibition mode
            'kiosk.title': 'Still exploring?',
            'kiosk.text': 'Tap anywhere to carry on. Otherwise the display restarts for the next visitor in:',

            // Quiz page
            'quiz.doc.title': 'Phone Elements Quiz',
            'quiz.title': 'Phone Elements Quiz',
            'quiz.start.title': 'How much do you know about your phone?',
            'quiz.start.text': 'Answer <strong>{n}</strong> multiple-choice questions about the elements hidden inside a smartphone. After each answer you\'ll find out why.',
            'quiz.start.hint': "Haven't explored the phone yet? Do that first – every answer can be found there!",
            'quiz.best': 'Your best score on this device: {score}',
            'quiz.startBtn': 'Start the quiz',
            'quiz.exploreFirst': 'Explore the phone first',
            'quiz.progress': 'Question {n} of {total}',
            'quiz.score': 'Score:',
            'quiz.correct': 'Correct!',
            'quiz.wrong': 'Not quite – the answer is: {answer}',
            'quiz.next': 'Next',
            'quiz.finish': 'See my score',
            'quiz.outOf': 'out of {total}',
            'quiz.res.perfect': 'Perfect score!',
            'quiz.res.perfect.msg': 'You are a true critical-elements expert. Could you explain to a friend why recycling phones matters?',
            'quiz.res.great': 'Excellent!',
            'quiz.res.great.msg': 'You really know what is hidden inside a phone. Check the review below to see what you missed.',
            'quiz.res.good': 'Good effort!',
            'quiz.res.good.msg': 'You know quite a lot already. Explore the phone layers again and see if you can beat your score.',
            'quiz.res.keep': 'Keep exploring!',
            'quiz.res.keep.msg': 'Tap through the phone layers and elements again – all the answers are there. Then have another go!',
            'quiz.again': 'Play again',
            'quiz.back': 'Back to the phone',
            'quiz.review': 'Review your answers',

            // Quiz certificate
            'cert.label': 'Your name for the certificate (optional)',
            'cert.button': 'Print a certificate',
            'cert.title': 'Certificate of Achievement',
            'cert.certify': 'This is to certify that',
            'cert.body': 'has explored the hidden treasure inside a smartphone and scored',
            'cert.score': '{score} out of {total}',
            'cert.quiz': 'in the Phone Elements Quiz',
            'cert.date': 'Date',
            'cert.footer': 'Hidden Treasure in Your Pocket – an interactive guide to critical elements in smartphones'
        },

        elements: {
            In: 'Indium', Sn: 'Tin', Si: 'Silicon', Ir: 'Iridium', Au: 'Gold', Cu: 'Copper',
            Ag: 'Silver', Pd: 'Palladium', Ta: 'Tantalum', Ga: 'Gallium', Nd: 'Neodymium',
            Dy: 'Dysprosium', Fe: 'Iron', W: 'Tungsten', Li: 'Lithium', Co: 'Cobalt',
            C: 'Graphite', Al: 'Aluminium', Mg: 'Magnesium', Eu: 'Europium', Tb: 'Terbium', Plastic: 'Plastics'
        },

        layers: [
            {
                id: 'screen', title: '🖥️ Display (Screen)',
                intro: 'Older and cheaper phones use LCD screens lit from behind by LEDs. About 6 in 10 new smartphones now have OLED screens, where every pixel makes its own light.',
                elements: [
                    ['In', '🔍 The Invisible Wires', `<strong>Indium</strong> is combined with tin and oxygen to make <strong>indium tin oxide (ITO)</strong>: a see-through material that conducts electricity. Thin ITO layers act as invisible wires that switch the pixels and, in many phones, help detect your finger.<br><br><strong>Fun fact:</strong> Indium is so soft you can scratch it with a fingernail, and a bent bar of it makes a faint crackling "cry".<br><br><strong>Where from?</strong> Indium is a by-product of zinc mining. China refined about 70% of the world's indium in 2025.`],
                    ['Sn', '🤝 Indium\'s Partner', `<strong>Tin</strong> is the other metal in indium tin oxide (about 90% indium oxide, 10% tin oxide). The tin atoms add free electrons, which is what lets the see-through film conduct electricity.<br><br><strong>Fun fact:</strong> Tin is also the main ingredient of the solder that holds every chip onto the circuit board.`],
                    ['Si', '🏖️ From Sand to Screen', `<strong>Silicon</strong> is the second most common element in Earth's crust, after oxygen. Sand is mostly silica: silicon combined with oxygen. Silica is the backbone of the tough cover glass.<br><br><strong>Fun fact:</strong> To toughen the glass it is dipped in hot molten potassium salt. Big potassium atoms swap places with smaller sodium atoms and squeeze the surface, so cracks struggle to start.`],
                    ['Ir', '✨ The Light Maker', `In <strong>OLED</strong> screens, the red and green pixels in most displays use tiny amounts of <strong>iridium</strong>-containing molecules that turn electricity into light very efficiently.<br><br><strong>Fun fact:</strong> Iridium is one of the rarest elements in Earth's crust and about twice as dense as lead. A thin iridium-rich layer of rock found all over the world is evidence for the asteroid impact that wiped out the dinosaurs 66 million years ago.`],
                    ['Eu', '🌈 The Colour Maker', `Many LCD screens are lit from behind by white LEDs: a blue LED coated with <em>phosphors</em> that glow green and red. Some of the best of these phosphors contain a pinch of <strong>europium</strong> – the study found less than 1 g per tonne of screens.<br><br><strong>Fun fact:</strong> Europium is named after Europe. Under UV light, euro banknotes glow red thanks to a europium-containing ink that helps to stop forgers.<br><br><strong>Where from?</strong> Most of the world's rare earths, including europium, are refined in China.`]
                ],
                stats: [['£2,750', 'Metal value per tonne of screens'], ['~50%', 'of screen weight is the LCD panel']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Surprise!</strong> Gold makes up 73% of the metal value of a screen. Old phone screens hold 65–263 g of indium per tonne – more than the zinc ores indium is normally extracted from (20–50 g per tonne).']
            },
            {
                id: 'camera', title: '📸 Camera Module',
                elements: [
                    ['Au', '🏆 The Corrosion-Proof Connector', `<strong>Gold</strong> doesn't rust or tarnish, so it coats connectors and forms ultra-fine wires that link chips such as the image sensor.<br><br><strong>Fun fact:</strong> Cameras are the most gold-rich part of a phone: on average about 1.2 kg of gold per tonne of camera modules. Typical gold ore holds only 1–3 g per tonne!`],
                    ['Cu', '⚡ The Signal Highway', `<strong>Copper</strong> tracks and flexible cables carry the signals from the camera sensor to the phone's processor.<br><br><strong>Fun fact:</strong> Copper can be recycled again and again without losing any of its properties.`],
                    ['Si', '📷 The Light Catcher', `The image sensor is a <strong>silicon</strong> chip covered in millions of light-sensitive pixels (a CMOS sensor). When light hits the silicon it frees electrons, which the chip counts to build up your photo.<br><br><strong>Fun fact:</strong> Silicon for chips is purified to 99.9999999% ("nine nines") or better.`],
                    ['Nd', '🎯 The Focus Motor', `Tiny <strong>neodymium</strong> magnets in a "voice-coil motor" move the lens back and forth to focus. In many phones they also shift the lens to cancel out shaky hands (optical image stabilisation).<br><br><strong>Fun fact:</strong> Neodymium is also used in powerful lasers (Nd:YAG lasers) that doctors use for eye surgery and to remove tattoos.`]
                ],
                stats: [['£63,100', 'Metal value per tonne of cameras – the highest of any part'], ['31.8%', 'Metal content (smartphone cameras)']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Where\'s the value?</strong> Gold makes up 93% of the metal value of a camera module.'],
                trend: '📈 Smartphone cameras contain more metal (31.8%) than the cameras of older phones (21.5%), linked to their higher-resolution technology.'
            },
            {
                id: 'pcb', title: '🔌 Circuit Board (PCB)',
                elements: [
                    ['Cu', '🛣️ The Wiring', `<strong>Copper</strong> makes up about 28% of a circuit board's weight, in thin tracks connecting thousands of components. That's 10 to 50 times richer than copper ore, which contains only 0.5–3% copper.<br><br><strong>Fun fact:</strong> The Statue of Liberty is covered in copper sheets just 2.4 mm thick. Its famous green colour is a thin layer of copper compounds that formed in the air.<br><br><strong>Where from?</strong> Chile mines about a quarter of the world's copper; China refines nearly half of it.`],
                    ['Au', '💎 Hidden Treasure', `<strong>Gold</strong> plates the contacts and connectors so they never corrode. A tonne of phone circuit boards can contain up to 678 g of gold – hundreds of times more than typical gold ore (1–3 g per tonne).<br><br><strong>Fun fact:</strong> Gold is not on the critical lists, but it is the most valuable metal in a phone: about three-quarters of its metal value.`],
                    ['Ag', '🥈 The Best Conductor', `<strong>Silver</strong> conducts electricity better than any other metal. It is in the lead-free solder that holds chips in place (a common type is 96.5% tin, 3% silver and 0.5% copper) and in many tiny components.<br><br><strong>Fun fact:</strong> A tonne of phone circuit boards can contain up to 1.3 kg of silver.`],
                    ['Pd', '🧽 The Hydrogen Sponge', `<strong>Palladium</strong> plates some connectors and is used in some of the hundreds of tiny ceramic capacitors on the board (most of these now use cheaper nickel instead). A tonne of circuit boards can contain up to 98 g of palladium and 38 g of its sister metal, platinum.<br><br><strong>Fun fact:</strong> Palladium can soak up to 900 times its own volume of hydrogen gas – like a metal sponge. It is named after the asteroid Pallas, discovered a year before the metal.<br><br><strong>Where from?</strong> Russia and South Africa mined over 80% of the world's palladium in 2025.`],
                    ['Ta', '🛑 The Power Smoother', `<strong>Tantalum</strong> capacitors store and release tiny amounts of electricity to smooth the power supply. They pack a lot of storage into a very small space – ideal for phones.<br><br><strong>Fun fact:</strong> It is named after Tantalus from Greek myth, who was punished by standing in water he could never drink. Tantalum sits in acid without absorbing any of it.<br><br><strong>Where from?</strong> About half of the world's tantalum was mined in DR Congo in 2025. As a "conflict mineral", companies must check it isn't funding armed groups.`],
                    ['Ga', '📡 The Signal Booster', `<strong>Gallium arsenide</strong> chips amplify your phone's radio signal so it can reach the mobile mast. Gallium is also in the LEDs of the camera flash and LCD backlights.<br><br><strong>Fun fact:</strong> Gallium melts at 29.8 °C – a piece will melt in your hand!<br><br><strong>Where from?</strong> Gallium is a by-product of aluminium ore. China produced 99% of the world's primary gallium in 2025.`]
                ],
                stats: [['£40,300', 'Metal value per tonne of circuit boards'], ['18%', 'of phone weight']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Most metal-rich part:</strong> Circuit boards are on average 43% metal by weight – 52% in the smartphones studied.']
            },
            {
                id: 'speaker', title: '🔊 Speakers, Magnets & Vibration',
                elements: [
                    ['Nd', '🧲 The Super Magnet', `<strong>Neodymium</strong>-iron-boron magnets are the strongest permanent magnets you can buy. In a speaker, the magnet pushes against a coil of wire to move a thin membrane that makes sound. Speaker parts in the study were 7–10% neodymium by weight.<br><br><strong>Fun fact:</strong> A neodymium magnet the size of a coin can hold up 5–8 kg.<br><br><strong>Where from?</strong> China mined about 69% of the world's rare earths in 2025, and refines most of them.`],
                    ['Dy', '🌡️ The Heat Shield', `A little <strong>dysprosium</strong> (0.3–0.8% of the speaker parts studied) keeps the magnet strong when it gets hot.<br><br><strong>Fun fact:</strong> Its name comes from the Greek <em>dysprositos</em>, "hard to get at", because it was so difficult to separate from the other rare earths.<br><br><strong>Where from?</strong> Almost all dysprosium is refined in China, much of it from ore mined in China and Myanmar.`],
                    ['Tb', '💪 The Magnet Booster', `Like dysprosium, a little <strong>terbium</strong> helps neodymium magnets stay strong when they get hot – it works even better, but is rarer and more expensive. In the phones studied, most terbium was in the speakers (up to about 1.6 kg per tonne of speaker parts), while the screens contained less than 1 g per tonne.<br><br><strong>Fun fact:</strong> Terbium is one of four elements named after the same small village – Ytterby in Sweden – along with yttrium, erbium and ytterbium. Terbium also makes the bright green glow in energy-saving fluorescent lamps.<br><br><strong>Where from?</strong> Almost all terbium is refined in China, much of it from ore mined in China and Myanmar.`],
                    ['Fe', '🧱 The Backbone', `A neodymium magnet (Nd<sub>2</sub>Fe<sub>14</sub>B) is mostly <strong>iron</strong> – about two-thirds to three-quarters of its weight.<br><br><strong>Fun fact:</strong> Thanks to Earth's metal core, iron is the most common element in our planet as a whole.`],
                    ['W', '📳 The Buzz', `Your phone vibrates thanks to a tiny motor that shakes a small, heavy weight – often made of <strong>tungsten</strong>, one of the densest metals.<br><br><strong>Fun fact:</strong> Tungsten has the highest melting point of any metal: 3,422 °C.<br><br><strong>Where from?</strong> China mined about 79% of the world's tungsten in 2025.`]
                ],
                stats: [['£15,900', 'Metal value per tonne of speakers'], ['47%', 'Metal content']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Rare earth power:</strong> Neodymium, praseodymium and dysprosium make up 53% of the metal value of a speaker. Yet only about 1% of the world\'s rare earth demand is met by recycling e-waste.']
            },
            {
                id: 'battery', title: '🔋 Li-Ion Battery',
                elements: [
                    ['Li', '🪶 The Lightweight Champion', `<strong>Lithium</strong> is the lightest metal. Your battery holds no lithium metal, though: lithium <em>ions</em> shuttle from the graphite side to the cobalt-oxide side as the battery powers your phone, and back again when you charge it.<br><br><strong>Fun fact:</strong> Lithium is so light it floats on water (while fizzing as it reacts!), and lithium compounds give some fireworks a bright crimson-red colour.<br><br><strong>Where from?</strong> In 2025 about a third of mined lithium came from Australia, followed by China and Chile.`],
                    ['Co', '⚙️ The Stabiliser', `Lithium cobalt oxide forms the positive side of most phone batteries. <strong>Cobalt</strong> helps it keep its layered structure as lithium moves in and out, so a lot of energy fits into a small space. A phone battery contains a few grams of cobalt.<br><br><strong>Fun fact:</strong> Cobalt is named after the <em>kobold</em>, a goblin of German folklore. Miners blamed kobolds for ores that gave off poisonous arsenic fumes when smelted.<br><br><strong>Where from?</strong> DR Congo mined 73% of the world's cobalt in 2025. Some is dug by hand in dangerous conditions, sometimes by children.`],
                    ['C', '🅿️ The Ion Parking Garage', `The negative side of the battery is <strong>graphite</strong> – the same form of carbon as pencil "lead". Lithium ions park between its flat layers of carbon atoms when you charge.<br><br><strong>Fun fact:</strong> Battery graphite must be over 99.95% pure. Synthetic graphite is baked at around 3,000 °C.<br><br><strong>Where from?</strong> China mined about 80% of the world's natural graphite in 2025 and makes most battery graphite.`]
                ],
                stats: [['~24%', 'of phone weight'], ['73%', 'of mined cobalt came from DR Congo (2025)']],
                facts: ['💡 <strong>Handle with care:</strong> Batteries are removed before phones are recycled (and were not part of the study above). Never put phones or batteries in the household bin – damaged lithium-ion batteries can start fires in bin lorries and recycling plants.']
            },
            {
                id: 'casing', title: '📦 Casing & Frame',
                elements: [
                    ['Al', '🏗️ The Frame', `Many phones have an <strong>aluminium</strong> frame: light, strong and easy to shape. Making new aluminium from ore takes huge amounts of electricity – around 14–15 MWh per tonne.<br><br><strong>Fun fact:</strong> Recycling aluminium saves about 95% of the energy needed to make it new.<br><br><strong>Where from?</strong> China made about 61% of the world's new aluminium in 2025.`],
                    ['Mg', '🪶 The Lightest Structural Metal', `<strong>Magnesium</strong> is about one-third less dense than aluminium, and its alloys are strong for their weight. It is used in some phones' internal frames, as well as in laptops, cars and aircraft.<br><br><strong>Fun fact:</strong> Magnesium burns with a dazzling white light, and is used in flares, fireworks and sparklers.<br><br><strong>Where from?</strong> China produced about 86% of the world's magnesium metal in 2025.`],
                    ['Plastic', '🛢️ Made from Oil and Gas', `<strong>Plastics</strong> are long chains of mostly carbon and hydrogen atoms, made mostly from oil and natural gas. The phone casings in the study were mainly polycarbonate/ABS blends.<br><br><strong>Fun fact:</strong> Plastics make up about 40% of a phone's weight, metals about 35% and glass and ceramics about 25%.`]
                ],
                stats: [['39%', 'of phone weight'], ['95%', 'Energy saved by recycling aluminium']],
                facts: ['💡 <strong>Close the loop:</strong> Older phones may contain brominated flame retardants in their plastics. Proper recycling keeps these chemicals out of the environment.']
            }
        ],

        quiz: [
            {
                q: 'Roughly how many different chemical elements can a smartphone contain?',
                options: ['60 to 70', 'About 5', 'About 15', 'More than 200'],
                explain: 'A phone can contain 60–70 different elements – most of the stable elements in the periodic table. (There are only 118 known elements in total.)'
            },
            {
                q: 'Which element in the display forms see-through "invisible wires" that conduct electricity?',
                options: ['Indium', 'Gold', 'Iron', 'Lithium'],
                explain: 'Indium tin oxide (ITO) is transparent but conducts electricity, so it can carry signals across the screen without blocking the picture.'
            },
            {
                q: 'Which metal makes up more than half of all the metal in a phone (by weight)?',
                options: ['Copper', 'Gold', 'Silver', 'Tin'],
                explain: 'Copper is about 58% of the metal in a phone – in wires, tracks on the circuit board and cables.'
            },
            {
                q: 'Which metal is responsible for about three-quarters of the value of the metals in a phone?',
                options: ['Gold', 'Copper', 'Aluminium', 'Iron'],
                explain: 'Gold is only a tiny fraction of the weight, but it is so valuable that it makes up about 74% of the metal value.'
            },
            {
                q: 'Gold is NOT on the EU or US critical-materials lists. Why is it still important to recycle phones for gold?',
                options: ['Old phones are far richer in gold than gold ore', 'Gold is radioactive', 'Gold makes the battery work', 'Gold is the heaviest part of the phone'],
                explain: 'A tonne of phone circuit boards can hold hundreds of times more gold than a tonne of typical gold ore (1–3 g per tonne).'
            },
            {
                q: 'Which part of a phone is the most gold-rich, per tonne?',
                options: ['The camera module', 'The battery', 'The plastic casing', 'The cover glass'],
                explain: 'Camera modules hold on average about 1.2 kg of gold per tonne, used in connectors and fine wires.'
            },
            {
                q: 'Inside the battery, which element travels back and forth as ions when you charge and use your phone?',
                options: ['Lithium', 'Cobalt', 'Neodymium', 'Gallium'],
                explain: 'Lithium ions move from the graphite side to the cobalt-oxide side as the battery powers the phone, and back again when it charges.'
            },
            {
                q: 'Which country mined about 73% of the world\'s cobalt in 2025?',
                options: ['DR Congo', 'Australia', 'Chile', 'Canada'],
                explain: 'DR Congo dominates cobalt mining. Some cobalt there is dug by hand in dangerous conditions, sometimes by children.'
            },
            {
                q: 'Which element melts at 29.8 °C – so a piece would melt in your hand?',
                options: ['Gallium', 'Tungsten', 'Tantalum', 'Magnesium'],
                explain: 'Gallium has a very low melting point. In phones, gallium arsenide chips boost the radio signal.'
            },
            {
                q: 'Where in a phone would you find neodymium magnets?',
                options: ['In the speakers and the camera focus motor', 'In the battery', 'In the cover glass', 'In the plastic casing'],
                explain: 'Neodymium-iron-boron magnets are the strongest permanent magnets. They drive the speakers and move the camera lens to focus.'
            },
            {
                q: 'Which element is added to magnets to stop them losing strength when they get hot?',
                options: ['Dysprosium', 'Iron', 'Silver', 'Indium'],
                explain: 'Dysprosium keeps magnets strong at high temperatures. Its name means "hard to get at" in Greek.'
            },
            {
                q: 'What makes your phone vibrate?',
                options: ['A tiny motor shaking a heavy tungsten weight', 'A magnesium spring', 'Liquid gallium sloshing around', 'The battery expanding and shrinking'],
                explain: 'Tungsten is one of the densest metals, so a tiny weight made of it gives a strong buzz.'
            },
            {
                q: 'Tantalum is named after Tantalus from Greek myth. Why?',
                options: ['It sits in acid without absorbing any – like Tantalus, who could never drink', 'It is tantalisingly hard to find', 'It glows in the dark', 'It was discovered in Greece'],
                explain: 'Anders Ekeberg named it in 1802 because tantalum could be dipped in acid without taking up any of it.'
            },
            {
                q: 'Which country produced 99% of the world\'s primary gallium in 2025?',
                options: ['China', 'USA', 'Germany', 'Brazil'],
                explain: 'Gallium is a by-product of aluminium ore, and almost all primary gallium is produced in China.'
            },
            {
                q: 'Silicon is the second most common element in Earth\'s crust. Which element is the most common?',
                options: ['Oxygen', 'Iron', 'Aluminium', 'Carbon'],
                explain: 'Oxygen comes first. Sand is mostly silica – silicon combined with oxygen – which is used to make the cover glass.'
            },
            {
                q: 'In OLED screens, the red and green pixels often use molecules containing which rare metal?',
                options: ['Iridium', 'Lead', 'Sodium', 'Copper'],
                explain: 'Iridium-containing molecules turn electricity into light very efficiently. Iridium is one of the rarest elements in Earth\'s crust.'
            },
            {
                q: 'This reddish metal carries signals all through your phone. What is it?',
                img: ['element-Cu.jpg', 'A reddish metal nugget', 'Photo: <a href="https://commons.wikimedia.org/wiki/File:Copper_(29_Cu).jpg" target="_blank" rel="noopener">Hi-Res Images of Chemical Elements</a>, <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">CC BY 3.0</a>'],
                options: ['Copper', 'Gold', 'Iron', 'Lithium'],
                explain: 'Copper conducts electricity very well and can be recycled again and again without losing its properties.'
            },
            {
                q: 'This shiny grey form of carbon is also used in pencils. Which part of the phone is it in?',
                img: ['element-C-graphite.jpg', 'A shiny grey mineral specimen', 'Photo: <a href="https://commons.wikimedia.org/wiki/File:Graphite-233436.jpg" target="_blank" rel="noopener">Robert M. Lavinsky</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>'],
                options: ['The battery', 'The camera', 'The speaker', 'The cover glass'],
                explain: 'Graphite forms the negative side of the battery. Lithium ions park between its flat layers of carbon atoms when you charge.'
            },
            {
                q: 'Which of these elements, found in some phone screens, is named after a continent?',
                options: ['Europium', 'Germanium', 'Francium', 'Polonium'],
                explain: 'Europium is named after Europe. The others are named after countries: Germany, France and Poland.'
            },
            {
                q: 'Terbium is one of four elements named after the same small village. Where is it?',
                options: ['Ytterby, Sweden', 'Stockholm, Sweden', 'Oxford, England', 'Paris, France'],
                explain: 'Yttrium, terbium, erbium and ytterbium are all named after Ytterby, where an unusual mineral containing them was found.'
            },
            {
                q: 'How much energy does recycling aluminium save, compared with making new aluminium from ore?',
                options: ['About 95%', 'About 10%', 'About 50%', 'None – it uses more energy'],
                explain: 'Making new aluminium takes huge amounts of electricity. Recycling it saves about 95% of that energy.'
            },
            {
                q: 'In 2022, how much of the world\'s electronic waste was documented as properly collected and recycled?',
                options: ['About 22%', 'About 5%', 'About 50%', 'About 90%'],
                explain: 'Only about a fifth was documented as properly recycled – the rest of the valuable materials were mostly lost.'
            },
            {
                q: 'Why are many of the elements in a phone called "critical"?',
                options: ['They are important for technology and their supply could be disrupted', 'They are radioactive', 'They are poisonous', 'They are the most common elements on Earth'],
                explain: 'Critical raw materials are economically important, and their supply is at risk – often because one or a few countries produce most of them.'
            },
            {
                q: 'What should you do with an old phone you no longer use?',
                options: ['Reuse, repair or take it to an e-waste collection point', 'Put it in the household bin', 'Put it in the plastic recycling bin', 'Take the battery out with a screwdriver'],
                explain: 'Never put phones or batteries in the bin – damaged lithium-ion batteries can start fires. Pass working phones on, and recycle the rest properly.'
            }
        ]
    };
})();
