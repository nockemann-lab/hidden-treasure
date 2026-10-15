/*
 * English text for "Hidden Treasure in Your Pocket".
 * This file is the template for translations (see content/languages.js).
 *
 *   ui       : interface text, by key. {name} placeholders are filled in by the page.
 *   elements : element / material names, by symbol.
 *   layers   : the phone parts: title, element texts, statistics and facts.
 *   quiz     : quiz questions. The FIRST option is always the correct answer
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
            'doc.title': 'Hidden Treasure in Your Pocket: critical elements in smartphones',
            'header.eyebrow': 'An interactive guide to critical elements',
            'header.title': 'Hidden <span class="gold">Treasure</span> in Your Pocket',
            'header.sub': 'Discover the elements hidden inside a smartphone: what they do, where they come from, and why they matter.',
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
            'part.battery': 'Lithium-ion battery',
            'part.casing': 'Casing',
            'part.frame': 'Mid-frame',
            'part.vapor': 'Vapour chamber',
            'part.rearGlass': 'Rear glass',
            'part.coil': 'Wireless charging coil',
            'part.usb': 'USB-C port',
            'part.vibration': 'Vibration motor',
            'part.flash': 'Camera flash',
            'short.screen': 'Display',
            'short.camera': 'Camera',
            'short.pcb': 'Circuit board',
            'short.speaker': 'Speaker',
            'short.battery': 'Battery',
            'short.casing': 'Casing',

            // 3D model
            '3d.label': 'Interactive 3D model of a smartphone. You can also choose the parts with the buttons under "Parts explored".',
            '3d.apart': 'Take apart',
            '3d.together': 'Put together',
            '3d.assembled': 'Assembled',
            '3d.exploded': 'Exploded',
            '3d.slider': 'Take the phone apart',
            '3d.diagonal': 'Diagonal view',
            '3d.back': 'Back view',
            'layer.display': 'Display',
            'layer.frame': 'Frame',
            'layer.board': 'Circuit boards',
            'layer.cameras': 'Cameras & speaker',
            'layer.battery': 'Battery',
            'layer.charging': 'Charging coil',
            'layer.back': 'Back cover',
            '3d.reset': 'Reset view',
            '3d.photo': 'Photo',
            '3d.model': '3D model',
            '3d.hint': 'Drag sideways to turn the phone. Tap a part to explore it.',
            '3d.hintPhoto': 'Tap a part of the photo to explore it.',

            // Exploration progress
            'progress.title': 'Parts explored:',
            'progress.count': '{n} of {total}',
            'progress.visited': 'explored',
            'progress.done': 'You have explored every part. Ready for the quiz?',

            // Legend
            'legend.precious': 'Precious metals',
            'legend.tech': 'Technology metals',
            'legend.rare': 'Rare earth elements',
            'legend.base': 'Common metals & materials',
            'legend.crm': 'On EU, US or UK critical list',

            // Welcome panel
            'welcome.title': "What's hidden inside your phone?",
            'welcome.lead': 'Your phone is a treasure chest of chemistry. Many of its elements are <strong>critical raw materials</strong>: vital for modern technology, but with supplies at risk.',
            'welcome.stat1.num': '60–70',
            'welcome.stat1': 'chemical elements can be found in a smartphone',
            'welcome.stat2.num': '93%',
            'welcome.stat2': 'of the metal value is in gold, silver, platinum and palladium: under 1.5% of the metal',
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
            'card.uk': 'UK',
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
            'action.intro': "The treasure in your phone can only be recovered if the phone comes back. Here's what you can do, best first:",
            'action.keep.title': 'Keep it longer',
            'action.keep.desc': 'Use a case and a screen protector, and look after the battery. For the Fairphone 5, about three-quarters of its carbon footprint comes from making it, so every extra year of use counts.',
            'action.repair.title': 'Repair it',
            'action.repair.desc': 'A cracked screen or a tired battery can usually be replaced. Since June 2025, new phones sold in the EU and Northern Ireland must have spare parts for 7 years and show a repair score from A to E on their label.',
            'action.reuse.title': 'Pass it on',
            'action.reuse.desc': 'Sell, donate or hand down a phone that still works, or buy a refurbished one. Before passing a phone on, back it up, sign out, do a factory reset, and remove the SIM and memory card.',
            'action.recycle.title': 'Recycle it',
            'action.recycle.desc': "Many shops that sell electricals will take back your old phone when you buy a new one, and some large electrical shops take small electricals for free, even if you don't buy anything. Council recycling centres take them too.",
            'action.recycle.link': 'Find your nearest drop-off point',
            'action.bin.title': 'Never bin it',
            'action.bin.desc': 'Phones, vapes and batteries in the bin can start fires. In the year to March 2026, UK waste companies recorded 1,518 fires at their sites, and more than 700 were caused by lithium-ion batteries.',
            'action.share.title': 'Spread the word',
            'action.share.desc': 'Check the drawers at home, try the drawer challenge below, and tell friends and family what is hidden inside old phones.',

            // Drawer challenge
            'drawer.title': 'Drawer challenge',
            'drawer.question': 'How many unused phones are hiding in your home?',
            'drawer.less': 'One phone fewer',
            'drawer.more': 'One phone more',
            'drawer.one': 'One old phone could contain up to:',
            'drawer.many': 'Together, {n} old phones could contain up to:',
            'drawer.cu': 'copper',
            'drawer.ag': 'silver',
            'drawer.au': 'gold',
            'drawer.pd': 'palladium',
            'drawer.ree': 'rare earth elements',
            'drawer.gold': 'You would need about 70 old phones to collect just 1 g of gold, so every phone counts!',
            'drawer.note': 'Estimate based on up to 53 kg of copper, 270 g of silver, 141 g of gold, 18 g of palladium and 3.3 kg of rare earth elements per tonne of old phones (Gómez et al., 2023), with about 100 g per phone. Never take phones or batteries apart yourself!',

            // Recycling game ("Urban Mine: Repair Rush")
            'nav.game': 'Recycling game',
            'game.title': 'Urban Mine: Repair Rush',
            'spot.title': 'Element of the day',
            'spot.another': 'Another one',
            'spot.anotherLabel': 'Show another element',
            'qq.title': 'Quick question',
            'qq.anotherLabel': 'Show another question',
            'qq.more': 'Try the full quiz',
            'spot.go': 'Explore {name}',
            'game.teaser.title': 'Run your own repair shop',
            'game.teaser.text': 'Fix, sell or recycle old phones in a 2½-minute game.',
            'game.teaser.button': 'Play',
            'game.cta.title': 'Can you run a repair and recycling shop?',
            'game.cta.text': 'Play Urban Mine: old phones come down the conveyor belt. Repair them, sell them or recycle them before they end up in landfill, and watch out for swollen batteries!',
            'game.cta.button': 'Play the recycling game',
            'game.sign': 'REPAIR · REUSE · RECYCLE',
            'game.collection': 'Collection',
            'game.landfill': 'Landfill',
            'game.st.repair': 'Repair bench',
            'game.st.repair.hint': 'Cracked screens, dead batteries',
            'game.st.repair.guide': 'Cracked screens and dead batteries. Each repair uses a spare part: buy them on the bench.',
            'game.st.sell': 'Refurbish & sell',
            'game.st.sell.hint': 'Phones that still work',
            'game.st.sell.guide': 'Phones that still work: give them a second life.',
            'game.st.recycle': 'Battery out & recycle',
            'game.st.recycle.hint': 'Water damage, very old phones',
            'game.st.recycle.guide': 'Water-damaged and very old phones that cannot be saved: the metals are recovered.',
            'game.st.safety': 'Battery safety bin',
            'game.st.safety.hint': 'Swollen batteries, fast!',
            'game.st.safety.guide': 'Swollen batteries: get them here fast, before they catch fire!',
            'game.intro.title': 'Run the repair and recycling shop',
            'game.intro.text': 'Old phones come down the <strong>conveyor belt</strong>. Drag each phone to the right station (or tap the phone, then the station) before it falls into the <strong>landfill</strong> bin. The belt gets faster, so keep up!',
            'game.intro.fire': '<strong>Swollen batteries</strong> start to smoke and then catch fire. Putting one in the wrong station also starts a fire, and that station stops working. <strong>Tap a fire 3 times</strong> to put it out before it spreads.',
            'game.intro.controls': 'Keyboard: left and right arrows choose a phone, keys 1 to 4 send it to a station, F puts out a fire, P pauses.',
            'game.intro.note': 'Prices and points are game values. The amounts of metal recovered from each phone come from the scientific study used on this page.',
            'game.best': 'Your best on this device: {score} points',
            'game.start': 'Start the shift',
            'game.timeLeft': 'Time left in your shift',
            'game.part.screen': 'spare screens',
            'game.part.battery': 'spare batteries',
            'game.buy': 'Buy {price}',
            'game.order.screen': 'Buy a spare screen for {price}. Needed to repair cracked screens.',
            'game.order.battery': 'Buy a spare battery for {price}. Needed to repair dead batteries.',
            'game.pause': 'Pause',
            'game.resume': 'Carry on',
            'game.paused': 'Paused',
            'game.canvasLabel': 'Repair and recycling shop. Use the arrow keys to choose a phone on the belt and keys 1 to 4 to send it to a station.',
            'game.keys': 'Drag phones to a station, or tap a phone and then a station. Keyboard: arrows, 1 to 4, F for fires, P to pause.',
            'game.tapFire': '👆 Tap ×{n}',
            'game.fireBanner': '🔥 Tap the fires to put them out!',
            'game.hint.working': 'Works fine → 2 Refurbish & sell',
            'game.hint.screen': 'Cracked screen → 1 Repair bench',
            'game.hint.battery': 'Dead battery → 1 Repair bench',
            'game.hint.water': 'Water damage → 3 Recycle',
            'game.hint.old': 'Very old phone → 3 Recycle',
            'game.hint.swollen': 'Swollen battery! → 4 Safety bin, fast!',
            'game.tutorial': 'Show hints for each new kind of phone (tutorial)',
            'game.restart': 'Restart',
            'game.exit': 'Exit',
            'game.sfx': 'Sound effects on or off',
            'game.music': 'Music on or off',
            'game.ch.today': "Today's challenge:",
            'game.ch.noFire': 'Finish the shift without a single fire',
            'game.ch.repair': 'Repair at least {n} phones',
            'game.ch.noLandfill': 'Let no phone end up in landfill',
            'game.ch.safe': 'Make at least {n} swollen batteries safe',
            'game.ch.sell': 'Refurbish and sell at least {n} phones',
            'game.ch.recycle': 'Recycle at least {n} phones that cannot be saved',
            'game.ch.money': 'Earn at least {n}',
            'game.ch.doneToday': 'done today',
            'game.ch.bonus': 'Complete it for a bonus of {n} points. A new challenge every day!',
            'game.ch.won': 'done! +{n} points',
            'game.ch.lost': 'not this time',
            'game.msg.burning': 'On fire! Tap the fire',

            'game.msg.busy': 'Full! Wait a moment',
            'game.msg.fire': 'FIRE!',
            'game.msg.nothingToFix': 'Nothing to fix: sell it!',
            'game.msg.cantRepair': 'Cannot be repaired: recycle it',
            'game.msg.noPart.screen': 'No spare screen! Buy one',
            'game.msg.noPart.battery': 'No spare battery! Buy one',
            'game.msg.safetyOnly': 'Only for swollen batteries',
            'game.msg.repaired': 'Repaired and sold +{amount}',
            'game.msg.sold': 'Sold +{amount}',
            'game.msg.returned': 'Returned: it is broken!',
            'game.msg.stillWorked': 'It still worked!',
            'game.msg.couldRepair': 'Could have been repaired',
            'game.msg.recycled': 'Metals recovered!',
            'game.msg.safe': 'Battery made safe',
            'game.msg.fireOut': 'Fire out!',
            'game.msg.landfill': 'Landfill!',
            'game.msg.burnt': 'Burnt!',
            'game.fact.fire': '<strong>🔥 Battery fire!</strong> In the year to March 2026, UK waste companies recorded 1,518 fires at their sites, and more than 700 were caused by lithium-ion batteries.',
            'game.fact.parts': '<strong>🔧 Out of parts!</strong> Since June 2025, new phones sold in the EU and Northern Ireland must have spare parts available for 7 years.',
            'game.fact.repair': '<strong>🔧 Repaired!</strong> Most of a phone\'s carbon footprint comes from making it, so every repair saves a lot.',
            'game.fact.sell': '<strong>🛍️ Second life!</strong> Reusing a phone is the best way to keep its critical elements in use.',
            'game.fact.returned': '<strong>↩️ Returned!</strong> Only sell phones that work. Broken phones need repairing or recycling.',
            'game.fact.recycle': '<strong>♻️ Urban mining!</strong> One old phone can contain up to about 14 mg of gold, 5 g of copper and 0.3 g of rare earth elements.',
            'game.fact.safe': '<strong>🪣 Well done!</strong> Damaged lithium-ion batteries can catch fire. Never put phones or batteries in the household bin.',
            'game.fact.landfill': '<strong>🗑️ Lost to landfill!</strong> In 2022 only 22% of the world\'s e-waste was properly collected and recycled.',
            'game.ev.drive': '<strong>📦 School collection drive!</strong> A local school collected old phones from home drawers: here they come!',
            'game.ev.rush1': '<strong>⏩ Rush hour!</strong> The belt is getting faster.',
            'game.ev.heat': '<strong>🌡️ Heatwave!</strong> Damaged batteries are more dangerous in the heat: swollen batteries catch fire sooner.',
            'game.ev.rush2': '<strong>⏩ Final rush!</strong> The belt is at top speed. Keep going!',
            'game.ev.sale': '<strong>🏷️ Parts sale!</strong> Spare parts are half price for 15 seconds.',
            'game.starsLabel': '{n} out of 3 stars',
            'game.end.title0': 'Keep practising!',
            'game.end.title1': 'A good start!',
            'game.end.title2': 'Great shift!',
            'game.end.title3': 'Urban mining champion!',
            'game.end.score': 'Your score: {n} points',
            'game.newBest': 'New best!',
            'game.row.sold': 'Phones refurbished and sold',
            'game.row.repaired': 'Phones repaired',
            'game.row.recycled': 'Phones recycled',
            'game.row.safe': 'Swollen batteries made safe',
            'game.row.fires': 'Fires',
            'game.row.landfill': 'Phones lost to landfill',
            'game.row.money': 'Money earned',
            'game.recovered': 'Metals recovered',
            'game.lesson.fires': '{n} fire(s) started. Damaged batteries must be handled safely: real recycling centres remove batteries before shredding.',
            'game.lesson.landfill': '{n} phone(s) ended up in landfill, and their metals are lost. In 2022 only 22% of the world\'s e-waste was properly recycled.',
            'game.lesson.wasted': '{n} phone(s) were recycled although they still worked or could have been repaired. Reusing and repairing come before recycling.',
            'game.lesson.returned': 'Some broken phones were sold and came back. Check each phone before you sell it.',
            'game.lesson.perfect': 'A perfect shift: no fires, nothing lost to landfill and every phone in the right place!',
            'game.lesson.metals': 'The metals in one old phone are worth only about £1.30, but many of them are critical raw materials. Recycling keeps them in use.',
            'game.full': 'FULL',
            'game.combo': 'Streak! ×{n} points',
            'game.comboLabel': 'Streak: correct choices in a row. 4 in a row doubles your points, 8 in a row triples them. A mistake or a phone in landfill ends the streak.',
            'game.intro.combo': 'Get phones right in a row for a streak: 4 in a row doubles your points, 8 in a row triples them.',
            'game.bestCombo': 'longest streak: {n}',
            'game.level': 'Difficulty',
            'game.level.easy': 'Easy',
            'game.level.easy.hint': 'Slower belt, fires do not spread',
            'game.level.normal': 'Normal',
            'game.level.normal.hint': 'The standard shift',
            'game.level.hard': 'Hard',
            'game.level.hard.hint': 'Faster belt, quicker fires',
            'game.link.metal': 'You recovered {amount} of {metal} in this shift.',
            'game.link.battery': 'Swollen batteries are lithium-ion batteries.',
            'game.link.gold': 'An old phone can hold up to about 14 mg of gold.',
            'game.link.button': 'Find out about {name}',
            'game.again': 'Play again',
            'game.close': 'Close',

            // The bigger picture
            'big.title': 'The bigger picture',
            'big.homes.num': '880 million',
            'big.homes': 'unused electrical items are kept in UK homes, about 30 per home',
            'big.homes.src': 'Material Focus, 2025',
            'big.value.num': '£1 billion',
            'big.value': 'of materials are hidden in the electricals UK households throw away or hold onto',
            'big.value.src': 'Material Focus, 2025',
            'big.uk.num': '24.5 kg',
            'big.uk': 'of e-waste per person in the UK, the second highest in the world after Norway',
            'big.uk.src': 'Global E-waste Monitor 2024 (2022 data)',
            'big.world.num': '22%',
            'big.world': "of the world's e-waste was properly collected and recycled. Without action, this could fall to 20% by 2030",
            'big.world.src': 'Global E-waste Monitor 2024 (2022 data)',

            // Sources
            'sources.summary': 'Sources & image credits',
            'sources.main': 'Main data source',
            'sources.mainNote': 'Component values, weights and metal contents on this page come from this study: 15 phones made between 2002 and 2015, with metal prices from 2021. Batteries were not analysed in the study.',
            'sources.other': 'Other sources',
            'sources.illustration': 'Phone illustration and 3D model',
            'sources.illustrationText': 'Exploded-view phone illustration and interactive 3D phone model (a generic modern smartphone) created by Peter Nockemann using Google Gemini (AI generation), adapted for this resource. The 3D graphics use three.js (© 2010–2023 three.js authors, MIT licence).',
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
            'quiz.start.hint': "Haven't explored the phone yet? Do that first, because every answer can be found there!",
            'quiz.best': 'Your best score on this device: {score}',
            'quiz.startBtn': 'Start the quiz',
            'quiz.exploreFirst': 'Explore the phone first',
            'quiz.progress': 'Question {n} of {total}',
            'quiz.score': 'Score:',
            'quiz.correct': 'Correct!',
            'quiz.wrong': 'Not quite. The answer is: {answer}',
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
            'quiz.res.keep.msg': 'Tap through the phone layers and elements again: all the answers are there. Then have another go!',
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
            'cert.footer': 'Hidden Treasure in Your Pocket: an interactive guide to critical elements in smartphones'
        },

        elements: {
            In: 'Indium', Sn: 'Tin', Si: 'Silicon', Ir: 'Iridium', Au: 'Gold', Cu: 'Copper',
            Ag: 'Silver', Pd: 'Palladium', Ta: 'Tantalum', Ga: 'Gallium', Nd: 'Neodymium',
            Dy: 'Dysprosium', Fe: 'Iron', W: 'Tungsten', Li: 'Lithium', Co: 'Cobalt',
            C: 'Graphite', Al: 'Aluminium', Mg: 'Magnesium', Eu: 'Europium', Tb: 'Terbium',
            Ni: 'Nickel', Ba: 'Barium', Hf: 'Hafnium', As: 'Arsenic', Y: 'Yttrium', Pr: 'Praseodymium', Ti: 'Titanium', Sb: 'Antimony',
            K: 'Potassium', La: 'Lanthanum', Mn: 'Manganese',
            Plastic: 'Plastics'
        },

        layers: [
            {
                id: 'screen', title: '🖥️ Display (Screen)',
                intro: 'Older and cheaper phones use LCD screens lit from behind by LEDs. About 6 in 10 new smartphones now have OLED screens, where every pixel makes its own light.',
                elements: [
                    ['In', '🔍 The Invisible Wires', `<strong>Indium</strong> is combined with tin and oxygen to make <strong>indium tin oxide (ITO)</strong>: a see-through material that conducts electricity. Thin ITO layers act as invisible wires that switch the pixels and, in many phones, help detect your finger.<br><br><strong>Fun fact:</strong> Indium is so soft you can scratch it with a fingernail, and a bent bar of it makes a faint crackling "cry".<br><br><strong>Where from?</strong> Indium is a by-product of zinc mining. China refined about 70% of the world's indium in 2025.`],
                    ['Sn', '🤝 Indium\'s Partner', `<strong>Tin</strong> is the other metal in indium tin oxide (about 90% indium oxide, 10% tin oxide). The tin atoms add free electrons, which is what lets the see-through film conduct electricity.<br><br><strong>Fun fact:</strong> Tin is also the main ingredient of the solder that holds every chip onto the circuit board.<br><br><strong>Where from?</strong> China and Indonesia mined almost half of the world's tin in 2025. Tin is one of the "conflict minerals", so companies must check where it comes from.`],
                    ['Si', '🏖️ From Sand to Screen', `<strong>Silicon</strong> is the second most common element in Earth's crust, after oxygen. Sand is mostly silica: silicon combined with oxygen. Silica is the backbone of the tough cover glass.<br><br><strong>Fun fact:</strong> Silicon Valley in California got its name from the silicon chips made by the companies there.<br><br><strong>Where from?</strong> Silicon is made by heating quartz with carbon in huge electric furnaces. China produced almost 80% of the world's silicon materials in 2025.`],
                    ['K', '🛡️ The Glass Toughener', `The cover glass is made tougher in a hot bath of molten <strong>potassium</strong> nitrate at around 400 °C. Big potassium ions swap places with smaller sodium ions in the glass surface and squeeze it together, so cracks struggle to start.<br><br><strong>Fun fact:</strong> Potassium metal is so reactive that it fizzes on water and burns with a lilac flame. In your body, potassium helps your nerves and muscles work, which is why bananas are a famous source.<br><br><strong>Where from?</strong> Potassium comes from potash minerals. Canada mined about 30% of the world's potash in 2025, followed by Russia, China and Belarus.`],
                    ['Ir', '✨ The Light Maker', `In <strong>OLED</strong> screens, the red and green pixels in most displays use tiny amounts of <strong>iridium</strong>-containing molecules that turn electricity into light very efficiently.<br><br><strong>Fun fact:</strong> Iridium is one of the rarest elements in Earth's crust and about twice as dense as lead. A thin iridium-rich layer of rock found all over the world is evidence for the asteroid impact that wiped out the dinosaurs 66 million years ago.<br><br><strong>Where from?</strong> Iridium is a by-product of platinum mining. South Africa mined about 70% of the world's platinum in 2025, and most iridium comes from there too.`],
                    ['Eu', '🌈 The Colour Maker', `LCD screens are lit from behind by white LEDs. In better screens, each is a blue LED coated with <em>phosphors</em> that glow green and red, and some of the best of these phosphors contain a pinch of <strong>europium</strong>. The study found less than 1 g per tonne of screens.<br><br><strong>Fun fact:</strong> Europium is named after Europe. Under UV light, euro banknotes glow red thanks to a europium-containing ink that helps to stop forgers.<br><br><strong>Where from?</strong> Most of the world's rare earths, including europium, are refined in China.`],
                    ['Y', '💡 The Yellow Glow', `Many white LEDs, like your camera's flash and the backlight of many cheaper LCD screens, are really blue LEDs coated with a phosphor that glows yellow. Blue plus yellow looks white! That phosphor is yttrium aluminium garnet with a little cerium (YAG:Ce), and <strong>yttrium</strong> is one of its main ingredients.<br><br><strong>Fun fact:</strong> In 1987 a compound of yttrium, barium, copper and oxygen became the first superconductor to work above the temperature of liquid nitrogen (−196 °C), carrying electricity with no resistance at all.<br><br><strong>Where from?</strong> China produced most of the world's yttrium in 2025, with a significant share from Myanmar.`],
                    ['Mn', '🔴 The Red Glow', `Many LCD screens that show very rich colours use a red-glowing phosphor called KSF (potassium silicon fluoride with a little <strong>manganese</strong>). Manganese is also used in many larger batteries, such as those in electric cars, where it helps to use less cobalt.<br><br><strong>Fun fact:</strong> Stone Age artists used black manganese oxide to paint animals on cave walls, for example at Lascaux in France about 17,000 years ago.<br><br><strong>Where from?</strong> South Africa and Gabon mined over 60% of the world's manganese in 2025.`]
                ],
                stats: [['£2,750', 'Metal value per tonne of screens'], ['~50%', 'of screen weight is the LCD panel']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Surprise!</strong> Gold makes up 73% of the metal value of a screen. Old phone screens hold 65–263 g of indium per tonne, more than the zinc ores indium is normally extracted from (20–50 g per tonne).']
            },
            {
                id: 'camera', title: '📸 Camera Module',
                elements: [
                    ['Au', '🏆 The Corrosion-Proof Connector', `<strong>Gold</strong> doesn't rust or tarnish, so it coats connectors and forms ultra-fine wires that link chips such as the image sensor.<br><br><strong>Fun fact:</strong> Cameras are the most gold-rich part of a phone: on average about 1.2 kg of gold per tonne of camera modules. Typical gold ore holds only 1–3 g per tonne!<br><br><strong>Where from?</strong> Gold is mined in many countries. China, Russia, Australia, Canada and the USA were the top five producers in 2025, together mining about 40% of the world's gold.`],
                    ['Cu', '⚡ The Signal Highway', `<strong>Copper</strong> tracks and flexible cables carry the signals from the camera sensor to the phone's processor.<br><br><strong>Fun fact:</strong> Copper can be recycled again and again without losing any of its properties.<br><br><strong>Where from?</strong> Chile mines about a quarter of the world's copper; China refines nearly half of it.`],
                    ['Si', '📷 The Light Catcher', `The image sensor is a <strong>silicon</strong> chip covered in millions of light-sensitive pixels (a CMOS sensor). When light hits the silicon it frees electrons, which the chip counts to build up your photo.<br><br><strong>Fun fact:</strong> Silicon for chips is purified to 99.9999999% ("nine nines") or better.<br><br><strong>Where from?</strong> Chip-grade silicon is purified from ordinary silicon metal. China produced almost 80% of the world's silicon materials in 2025.`],
                    ['Nd', '🎯 The Focus Motor', `Tiny <strong>neodymium</strong> magnets in a "voice-coil motor" move the lens back and forth to focus. In many phones they also shift the lens to cancel out shaky hands (optical image stabilisation).<br><br><strong>Fun fact:</strong> Neodymium is also used in powerful lasers (Nd:YAG lasers) that doctors use for eye surgery and to remove tattoos.<br><br><strong>Where from?</strong> China mined about 69% of the world's rare earths in 2025, and refines most of them.`],
                    ['La', '🔭 The Lens Sharpener', `Most phone camera lenses are made of moulded plastic, but some phones add a glass lens element. High-quality optical glass often contains <strong>lanthanum</strong> oxide, which bends light strongly without splitting it into colour fringes. The study found only traces of lanthanum in the cameras.<br><br><strong>Fun fact:</strong> The "flint" in a lighter is ferrocerium: a rare earth alloy (mischmetal) mixed with iron. About a fifth of it is lanthanum.<br><br><strong>Where from?</strong> China mined about 69% of the world's rare earths in 2025, and refines most of them.`]
                ],
                stats: [['£63,100', 'Metal value per tonne of cameras, the highest of any part'], ['31.8%', 'Metal content (smartphone cameras)']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Where\'s the value?</strong> Gold alone makes up 93% of the metal value of a camera module.'],
                trend: '📈 Smartphone cameras contain more metal (31.8%) than the cameras of older phones (21.5%), linked to their higher-resolution technology.'
            },
            {
                id: 'pcb', title: '🔌 Circuit Board (PCB)',
                elements: [
                    ['Cu', '🛣️ The Wiring', `<strong>Copper</strong> makes up about 28% of a circuit board's weight, in thin tracks connecting thousands of components. That's 10 to 50 times richer than copper ore, which contains only 0.5–3% copper. In the old phones in the study, copper made up more than half of all the metal.<br><br><strong>Fun fact:</strong> The Statue of Liberty is covered in copper sheets just 2.4 mm thick. Its famous green colour is a thin layer of copper compounds that formed in the air.<br><br><strong>Where from?</strong> Chile mines about a quarter of the world's copper; China refines nearly half of it.`],
                    ['Au', '💎 Hidden Treasure', `<strong>Gold</strong> plates the contacts and connectors so they never corrode. A tonne of phone circuit boards can contain up to 678 g of gold, hundreds of times more than typical gold ore (1–3 g per tonne).<br><br><strong>Fun fact:</strong> Gold is not on the critical lists, but it is the most valuable metal in a phone: about three-quarters of its metal value.<br><br><strong>Where from?</strong> Gold is mined in many countries. China, Russia, Australia, Canada and the USA were the top five producers in 2025, together mining about 40% of the world's gold.`],
                    ['Ag', '🥈 The Best Conductor', `<strong>Silver</strong> conducts electricity better than any other metal. It is in the lead-free solder that holds chips in place (a common type is 96.5% tin, 3% silver and 0.5% copper) and in many tiny components.<br><br><strong>Fun fact:</strong> A tonne of phone circuit boards can contain up to 1.3 kg of silver.<br><br><strong>Where from?</strong> Mexico mined about a quarter of the world's silver in 2025, followed by Peru and China. Much silver is a by-product of mining lead, zinc and copper.`],
                    ['Pd', '🧽 The Hydrogen Sponge', `<strong>Palladium</strong> plates some connectors and is used in some of the hundreds of tiny ceramic capacitors on the board (most of these now use cheaper nickel instead). A tonne of circuit boards can contain up to 98 g of palladium and 38 g of its sister metal, platinum.<br><br><strong>Fun fact:</strong> Palladium can soak up to 900 times its own volume of hydrogen gas, like a metal sponge. It is named after the asteroid Pallas, discovered a year before the metal.<br><br><strong>Where from?</strong> Russia and South Africa mined over 80% of the world's palladium in 2025.`],
                    ['Ni', '🥞 The Thin-Layer Stack', `A high-end smartphone has around 1,000 tiny ceramic capacitors on its circuit board, many smaller than a grain of rice. Inside each one, hundreds of very thin layers of <strong>nickel</strong> are stacked between layers of ceramic. Where the board has gold-plated contacts, the gold is usually a very thin layer on top of nickel.<br><br><strong>Fun fact:</strong> The US 5-cent coin called a "nickel" has long been made of 75% copper and only 25% nickel.<br><br><strong>Where from?</strong> Indonesia mined about two-thirds of the world's nickel in 2025. Battery-grade nickel is on the EU's critical list.`],
                    ['Ba', '🫙 The Charge Holder', `The ceramic in those tiny capacitors is <strong>barium</strong> titanate. It lets each capacitor store far more electric charge than air or plastic could, so the capacitors can be tiny. They smooth the power supply and filter signals all over the board.<br><br><strong>Fun fact:</strong> Barium compounds give fireworks their green colour. And before an X-ray of the stomach, patients drink a "barium meal". Barium sulfate is safe because it does not dissolve (other barium compounds are poisonous!).<br><br><strong>Where from?</strong> Barium comes from the mineral baryte, which is on the EU and US critical lists. India and China mined over half of it in 2025.`],
                    ['Ta', '🛑 The Power Smoother', `<strong>Tantalum</strong> capacitors store and release tiny amounts of electricity to smooth the power supply. They pack a lot of storage into a very small space, ideal for phones.<br><br><strong>Fun fact:</strong> It is named after Tantalus from Greek myth, who was punished by standing in water he could never drink. Tantalum is not attacked by most acids, so it can sit in acid without taking any of it in.<br><br><strong>Where from?</strong> About half of the world's tantalum was mined in DR Congo in 2025. As a "conflict mineral", companies must check it isn't funding armed groups.`],
                    ['Ga', '📡 The Signal Booster', `<strong>Gallium arsenide</strong> chips amplify your phone's radio signal so it can reach the mobile mast. Gallium is also in the LEDs of the camera flash and LCD backlights.<br><br><strong>Fun fact:</strong> Gallium melts at 29.8 °C, so a piece will melt in your hand!<br><br><strong>Where from?</strong> Gallium is a by-product of aluminium ore. China produced 99% of the world's primary gallium in 2025.`],
                    ['As', '🎭 The Villain Turned Helper', `<strong>Arsenic</strong> is gallium's partner in gallium arsenide, the material of the chips that boost your phone's radio signal. Tiny traces of arsenic are also added to silicon chips to change how they conduct electricity.<br><br><strong>Fun fact:</strong> Arsenic is famous as a poison, yet in the 1800s an arsenic compound was used to make a bright green pigment for wallpaper and paint.<br><br><strong>Where from?</strong> Peru, China and Morocco produced more than 95% of the world's arsenic in 2025.`],
                    ['Hf', '🔬 The Atom-Thin Insulator', `Your phone's processor contains billions of tiny switches called transistors. Since 2007, the most advanced chips have used an ultra-thin insulating layer of <strong>hafnium</strong> oxide in each switch (only a few millionths of a millimetre thick), so they leak less electricity and waste less power. Today it is standard in modern chips, including smartphone processors.<br><br><strong>Fun fact:</strong> Hafnium was discovered in Copenhagen in 1923 and named after Hafnia, the Latin name for the city. It soaks up neutrons so well that it is used in the control rods of nuclear reactors.<br><br><strong>Where from?</strong> Hafnium is a by-product of making zirconium metal. Only a few countries refine it, mainly France, the USA, China and Russia.`]
                ],
                stats: [['£40,300', 'Metal value per tonne of circuit boards'], ['18%', 'of phone weight']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Most metal-rich part:</strong> Circuit boards are on average 43% metal by weight, and 52% in the smartphones studied.',
                    '🚫 <strong>Banned!</strong> Since July 2006, EU rules (RoHS) have restricted lead, mercury, cadmium and some other hazardous substances in new electronics. Solder changed from tin-lead to tin with about 3% silver and 0.5% copper. In the study, lead in screens dropped from 35 g per tonne in the oldest phones to 2 g per tonne in the smartphones.']
            },
            {
                id: 'speaker', title: '🔊 Speakers, Magnets & Vibration',
                elements: [
                    ['Nd', '🧲 The Super Magnet', `<strong>Neodymium</strong>-iron-boron magnets are the strongest permanent magnets you can buy. In a speaker, the magnet pushes against a coil of wire to move a thin membrane that makes sound. Speaker parts in the study were 7–10% neodymium by weight.<br><br><strong>Fun fact:</strong> A neodymium magnet the size of a coin can hold up to 5–8 kg of steel.<br><br><strong>Where from?</strong> China mined about 69% of the world's rare earths in 2025, and refines most of them.`],
                    ['Pr', '👯 The Green Twin', `<strong>Praseodymium</strong> is neodymium's close chemical sibling. The two are usually mined, sold and used together: magnet makers mix them as "NdPr". In the study, speaker parts contained about 1% praseodymium.<br><br><strong>Fun fact:</strong> Its name comes from the Greek for "green twin". Glass containing praseodymium and neodymium is used in welders' and glassblowers' goggles to filter out the glare.<br><br><strong>Where from?</strong> China mined about 69% of the world's rare earths in 2025, and refines most of them.`],
                    ['Dy', '🌡️ The Heat Shield', `A little <strong>dysprosium</strong> (0.3–0.8% of the speaker parts studied) keeps the magnet strong when it gets hot.<br><br><strong>Fun fact:</strong> Its name comes from the Greek <em>dysprositos</em>, "hard to get at", because it was so difficult to separate from the other rare earths.<br><br><strong>Where from?</strong> Almost all dysprosium is refined in China, much of it from ore mined in China and Myanmar.`],
                    ['Tb', '💪 The Magnet Booster', `Like dysprosium, a little <strong>terbium</strong> helps neodymium magnets stay strong when they get hot. It works even better, but is rarer and more expensive. In the phones studied, most terbium was in the speakers (up to about 1.6 kg per tonne of speaker parts), while the screens contained less than 1 g per tonne.<br><br><strong>Fun fact:</strong> Terbium is one of four elements named after the same small village, Ytterby in Sweden, along with yttrium, erbium and ytterbium. Terbium also makes the bright green glow in energy-saving fluorescent lamps.<br><br><strong>Where from?</strong> Almost all terbium is refined in China, much of it from ore mined in China and Myanmar.`],
                    ['Fe', '🧱 The Backbone', `A neodymium magnet (Nd<sub>2</sub>Fe<sub>14</sub>B) is mostly <strong>iron</strong>: about two-thirds to three-quarters of its weight.<br><br><strong>Fun fact:</strong> Thanks to Earth's metal core, iron is the most common element in our planet as a whole.<br><br><strong>Where from?</strong> Australia mined over a third of the world's iron ore in 2025, followed by Brazil, India and China.`],
                    ['W', '📳 The Buzz', `Your phone vibrates thanks to a tiny motor that shakes a small, heavy weight, often made of <strong>tungsten</strong>, one of the densest metals.<br><br><strong>Fun fact:</strong> Tungsten has the highest melting point of any metal: 3,422 °C.<br><br><strong>Where from?</strong> China mined about 79% of the world's tungsten in 2025.`]
                ],
                stats: [['£15,900', 'Metal value per tonne of speakers'], ['47%', 'Metal content']],
                note: VALUE_NOTE,
                facts: ['💡 <strong>Rare earth power:</strong> Neodymium, praseodymium and dysprosium make up 53% of the metal value of a speaker. Yet only about 1% of the world\'s rare earth demand is met by recycling e-waste.']
            },
            {
                id: 'battery', title: '🔋 Battery & Charging',
                elements: [
                    ['Li', '🪶 The Lightweight Champion', `<strong>Lithium</strong> is the lightest metal. Your battery holds no lithium metal, though: lithium <em>ions</em> shuttle from the graphite side to the cobalt-oxide side as the battery powers your phone, and back again when you charge it.<br><br><strong>Fun fact:</strong> Lithium is so light it floats on water (while fizzing as it reacts!), and lithium compounds give some fireworks a bright crimson-red colour.<br><br><strong>Where from?</strong> In 2025 about a third of mined lithium came from Australia, followed by China and Chile.`],
                    ['Co', '⚙️ The Stabiliser', `Lithium cobalt oxide forms the positive side of most phone batteries. <strong>Cobalt</strong> helps it keep its layered structure as lithium moves in and out, so a lot of energy fits into a small space. A phone battery contains a few grams of cobalt.<br><br><strong>Fun fact:</strong> Cobalt is named after the <em>kobold</em>, a goblin of German folklore. Miners blamed kobolds for ores that gave off poisonous arsenic fumes when smelted.<br><br><strong>Where from?</strong> DR Congo mined 73% of the world's cobalt in 2025. Some is dug by hand in dangerous conditions, sometimes by children.`],
                    ['C', '🅿️ The Ion Parking Garage', `The negative side of the battery is <strong>graphite</strong>, the same form of carbon as pencil "lead". Lithium ions park between its flat layers of carbon atoms when you charge.<br><br><strong>Fun fact:</strong> Battery graphite must be over 99.95% pure. Synthetic graphite is baked at around 3,000 °C.<br><br><strong>Where from?</strong> China mined about 80% of the world's natural graphite in 2025 and makes most battery graphite.`],
                    ['Cu', '🌀 The Wireless Charger', `Phones that charge wirelessly have a flat coil of fine <strong>copper</strong> wire inside. In the charging pad, an alternating current in another coil makes a changing magnetic field, and this makes a current flow in the phone's coil, which charges the battery. A thin sheet of ferrite (a ceramic made from iron oxide) behind the coil guides the magnetic field.<br><br><strong>Fun fact:</strong> Making electricity with a changing magnetic field is called electromagnetic induction. Michael Faraday discovered it in London in 1831.<br><br><strong>Where from?</strong> Chile mines about a quarter of the world's copper; China refines nearly half of it.`]
                ],
                stats: [['~24%', 'of phone weight'], ['73%', 'of mined cobalt came from DR Congo (2025)']],
                facts: ['🔋 <strong>Inside the battery:</strong> The two sides of the battery are coated onto very thin metal foils: copper on the graphite side and aluminium on the cobalt-oxide side.',
                    '💡 <strong>Handle with care:</strong> Batteries are removed before phones are recycled (and were not part of the study above). Never put phones or batteries in the household bin: damaged lithium-ion batteries can start fires in bin lorries and recycling plants. If a phone\'s battery swells up, stop using and charging the phone and take it to a phone shop or recycling centre.']
            },
            {
                id: 'casing', title: '📦 Casing & Frame',
                elements: [
                    ['Al', '🏗️ The Frame', `Many phones have an <strong>aluminium</strong> frame: light, strong and easy to shape. Making new aluminium from ore takes huge amounts of electricity: around 14–15 MWh per tonne, about as much as a typical UK home uses in 5 years.<br><br><strong>Fun fact:</strong> Recycling aluminium saves about 95% of the energy needed to make it new.<br><br><strong>Where from?</strong> China made about 61% of the world's new aluminium in 2025.`],
                    ['Ti', '🛡️ The Featherweight Armour', `Some recent top-of-the-range phones have frames made of <strong>titanium</strong>, for example the iPhone 15 Pro and 16 Pro and Samsung's Galaxy S24 and S25 Ultra. Newer models of both brands switched back to aluminium, but the slim iPhone Air (2025) still uses titanium.<br><br><strong>Fun fact:</strong> Titanium is about 40% lighter than steel, and titanium alloys can be as strong as many steels. Bone grows tightly against it, so it is used for hip and knee replacements and dental implants.<br><br><strong>Where from?</strong> China made about 70% of the world's titanium metal in 2025.`],
                    ['Mg', '🪶 The Lightest Structural Metal', `<strong>Magnesium</strong> is about one-third less dense than aluminium, and its alloys are strong for their weight. It is used in some phones' internal frames, as well as in laptops, cars and aircraft.<br><br><strong>Fun fact:</strong> Magnesium burns with a dazzling white light, and is used in flares, fireworks and sparklers.<br><br><strong>Where from?</strong> China produced about 86% of the world's magnesium metal in 2025.`],
                    ['C', '🌡️ The Heat Spreader', `Many phones have thin sheets of <strong>graphite</strong> behind the screen and on the frame. Heat travels along these sheets up to several times better than along copper, spreading the heat from the busy processor so the phone does not get hot spots.<br><br><strong>Fun fact:</strong> A single layer of graphite, just one atom thick, is called graphene. It was first isolated in 2004 at the University of Manchester using sticky tape, and won the 2010 Nobel Prize in Physics.<br><br><strong>Where from?</strong> China mined about 80% of the world's natural graphite in 2025. Heat-spreading sheets are usually made of synthetic graphite.`],
                    ['Cu', '💧 The Vapour Chamber', `Some powerful phones cool their processor with a vapour chamber: a flat, sealed <strong>copper</strong> pocket with a few drops of water inside. The water evaporates at the hot chip, the vapour spreads to cooler parts of the chamber and turns back into water, which flows back through a sponge-like copper wick. This carries heat away very quickly.<br><br><strong>Fun fact:</strong> Most of the air is pumped out of the chamber before it is sealed, so the water inside boils at well below 100 °C.<br><br><strong>Where from?</strong> Chile mines about a quarter of the world's copper; China refines nearly half of it.`],
                    ['Sb', '🔥 The Fire Fighter', `Plastics in electronics must not catch fire easily. <strong>Antimony</strong> oxide is added to some plastics together with bromine-containing flame retardants, and the two work as a team to slow down flames.<br><br><strong>Fun fact:</strong> In ancient Egypt, a black antimony mineral (stibnite) was used as eye make-up (kohl).<br><br><strong>Where from?</strong> China, Russia and Tajikistan mined about 85% of the world's antimony in 2025.`],
                    ['Plastic', '🛢️ Made from Oil and Gas', `<strong>Plastics</strong> are long chains of mostly carbon and hydrogen atoms, made mostly from oil and natural gas. The phone casings in the study were mainly polycarbonate/ABS blends.<br><br><strong>Fun fact:</strong> Plastics make up about 40% of a phone's weight, metals about 35% and glass and ceramics about 25%.<br><br><strong>Where from?</strong> Plastics are made in chemical plants from oil and natural gas. About a third of the world's plastics are made in China.`]
                ],
                stats: [['39%', 'of phone weight'], ['95%', 'Energy saved by recycling aluminium']],
                facts: ['💡 <strong>Close the loop:</strong> Older phones may contain brominated flame retardants in their plastics. Proper recycling keeps these chemicals out of the environment.']
            }
        ],

        quiz: [
            {
                q: 'Roughly how many different chemical elements can a smartphone contain?',
                options: ['60 to 70', 'About 5', 'About 15', 'More than 200'],
                explain: 'A phone can contain 60–70 different elements, most of the stable elements in the periodic table. (There are only 118 known elements in total.)'
            },
            {
                q: 'Which element in the display forms see-through "invisible wires" that conduct electricity?',
                options: ['Indium', 'Gold', 'Iron', 'Lithium'],
                explain: 'Indium tin oxide (ITO) is transparent but conducts electricity, so it can carry signals across the screen without blocking the picture.'
            },
            {
                q: 'Which metal makes up more than half of all the metal in a phone (by weight)?',
                options: ['Copper', 'Gold', 'Silver', 'Tin'],
                explain: 'Copper was about 58% of the metal in the old phones studied, in wires, tracks on the circuit board and cables.'
            },
            {
                q: 'Which metal is responsible for about three-quarters of the value of the metals in a phone?',
                options: ['Gold', 'Copper', 'Aluminium', 'Iron'],
                explain: 'Gold is only a tiny fraction of the weight, but it is so valuable that it makes up about 74% of the metal value.'
            },
            {
                q: 'Gold is NOT on the EU, US or UK critical-materials lists. Why is it still important to recycle phones for gold?',
                options: ['Old phones are far richer in gold than gold ore', 'Gold slowly becomes radioactive inside old phones', 'Gold is what lets the battery store its energy', 'Gold makes up most of the weight of a phone'],
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
                q: 'Which element melts at 29.8 °C, so a piece would melt in your hand?',
                options: ['Gallium', 'Tungsten', 'Tantalum', 'Magnesium'],
                explain: 'Gallium has a very low melting point. In phones, gallium arsenide chips boost the radio signal.'
            },
            {
                q: 'Where in a phone would you find neodymium magnets?',
                options: ['In the speakers and the camera focus motor', 'In the battery, between its two sides', 'In the cover glass, to make it tougher', 'In the plastic casing, to make it stiffer'],
                explain: 'Neodymium-iron-boron magnets are the strongest permanent magnets. They drive the speakers and move the camera lens to focus.'
            },
            {
                q: 'Which element is added to magnets to stop them losing strength when they get hot?',
                options: ['Dysprosium', 'Iron', 'Silver', 'Indium'],
                explain: 'Dysprosium keeps magnets strong at high temperatures. Its name means "hard to get at" in Greek.'
            },
            {
                q: 'What makes your phone vibrate?',
                options: ['A tiny motor shaking a heavy tungsten weight', 'A magnesium spring that bounces up and down', 'Liquid gallium sloshing around inside a tube', 'The battery quickly expanding and shrinking'],
                explain: 'Tungsten is one of the densest metals, so a tiny weight made of it gives a strong buzz.'
            },
            {
                q: 'Tantalum is named after Tantalus from Greek myth. Why?',
                options: ['It sits in acid without absorbing any, like Tantalus, who could never drink', 'It is tantalisingly hard to find, like treasure in a Greek story', 'It glows in the dark, like the fruit Tantalus could never reach', 'It was first discovered on a Greek island near Mount Olympus'],
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
                explain: 'Oxygen comes first. Sand is mostly silica (silicon combined with oxygen), which is used to make the cover glass.'
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
                q: 'This shiny grey form of carbon is also used in pencils. Which of these parts of the phone contains it?',
                img: ['element-C-graphite.jpg', 'A shiny grey mineral specimen', 'Photo: <a href="https://commons.wikimedia.org/wiki/File:Graphite-233436.jpg" target="_blank" rel="noopener">Robert M. Lavinsky</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>'],
                options: ['The battery', 'The camera', 'The speaker', 'The cover glass'],
                explain: 'Graphite forms the negative side of the battery. Lithium ions park between its flat layers of carbon atoms when you charge.'
            },
            {
                q: 'Wireless charging uses electromagnetic induction. Which scientist discovered it, in London in 1831?',
                options: ['Michael Faraday', 'Isaac Newton', 'Marie Curie', 'Charles Darwin'],
                explain: 'Faraday showed that a changing magnetic field makes electricity flow in a coil of wire. The copper coils in a charging pad and a phone work the same way.'
            },
            {
                q: 'Graphene, a single layer of the graphite that spreads heat in phones, was first isolated in 2004 at which UK university?',
                options: ['University of Manchester', 'University of Oxford', 'University of Cambridge', "Queen's University Belfast"],
                explain: 'Andre Geim and Konstantin Novoselov isolated graphene with sticky tape and won the 2010 Nobel Prize in Physics.'
            },
            {
                q: 'In 2022 the UK produced the second most e-waste per person in the world. Which country produced the most?',
                options: ['Norway', 'China', 'USA', 'India'],
                explain: 'Norway produced 26.8 kg of e-waste per person and the UK 24.5 kg (Global E-waste Monitor 2024).'
            },
            {
                q: 'What should you do before passing on an old phone?',
                options: ['Back it up, do a factory reset and remove the SIM and memory card', 'Nothing: the next owner will delete your data', 'Take the battery out with a screwdriver so it is safe', 'Put it in the freezer for a day to wipe the memory'],
                explain: 'A factory reset wipes your personal data. Never open a phone or its battery yourself.'
            },
            {
                q: 'About how many tiny ceramic capacitors are on the circuit board of a high-end smartphone?',
                options: ['About 1,000', 'About 10', 'About 100,000', 'None'],
                explain: 'A high-end smartphone has around 1,000 multilayer ceramic capacitors, many smaller than a grain of rice. They are made of barium titanate ceramic with thin nickel layers.'
            },
            {
                q: 'Hafnium, used in the tiny switches of modern computer chips, is named after the Latin name of which city?',
                options: ['Copenhagen', 'Rome', 'Paris', 'Athens'],
                explain: 'Hafnium was discovered in Copenhagen in 1923. "Hafnia" is the Latin name for the city.'
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
                options: ['About 95%', 'About 10%', 'About 50%', 'None (it uses more energy)'],
                explain: 'Making new aluminium takes huge amounts of electricity. Recycling it saves about 95% of that energy.'
            },
            {
                q: 'In 2022, how much of the world\'s electronic waste was documented as properly collected and recycled?',
                options: ['About 22%', 'About 5%', 'About 50%', 'About 90%'],
                explain: 'Only about a fifth was documented as properly recycled; most of the valuable materials in the rest were lost.'
            },
            {
                q: 'Why are many of the elements in a phone called "critical"?',
                options: ['They are important for technology and their supply could be disrupted', 'They are all radioactive and must be handled very carefully', 'They are poisonous, so phones must be kept away from food', 'They are the most common elements in the Earth\'s crust'],
                explain: 'Critical raw materials are economically important, and their supply is at risk, often because one or a few countries produce most of them.'
            },
            {
                q: 'What should you do with an old phone you no longer use?',
                options: ['Reuse, repair or take it to an e-waste collection point', 'Put it in the household bin with the general rubbish', 'Put it in the plastic recycling bin at home', 'Take the battery out yourself with a screwdriver'],
                explain: 'Never put phones or batteries in the bin: damaged lithium-ion batteries can start fires. Pass working phones on, and recycle the rest properly.'
            },

            // ---- Display ----
            {
                q: 'The cover glass is toughened in a hot bath of molten potassium nitrate. What happens to the surface of the glass?',
                options: ['Big potassium ions swap places with smaller sodium ions and squeeze it together', 'The surface melts slightly and sets again as a layer twice as thick', 'It gets a thin coating of shiny potassium metal that stops scratches', 'It soaks up water from the bath and becomes bendy instead of brittle'],
                explain: 'Potassium ions are bigger than the sodium ions they replace, so they squeeze the surface together. This makes it much harder for cracks to start.'
            },
            {
                q: 'Many white LEDs, like the camera flash, are really blue LEDs coated with a phosphor. What colour does the phosphor glow, so that the light looks white?',
                options: ['Yellow', 'Red', 'Green', 'Purple'],
                explain: 'Blue plus yellow looks white to our eyes. The yellow-glowing phosphor is yttrium aluminium garnet with a little cerium (YAG:Ce).'
            },
            {
                q: 'Stone Age artists painted animals on cave walls with a black oxide of which metal? Today it is also used in some screens and batteries.',
                options: ['Manganese', 'Lithium', 'Gold', 'Tin'],
                explain: 'Black manganese oxide was used for cave paintings such as those at Lascaux in France, about 17,000 years ago. Today manganese is in a red-glowing screen phosphor and in many larger batteries.'
            },
            {
                q: 'Indium is usually extracted from zinc ores that contain 20–50 g of indium per tonne. How do old phone screens compare?',
                options: ['They contain more: 65–263 g per tonne', 'They contain much less: under 1 g per tonne', 'They contain about the same: 20–50 g per tonne', 'They contain no indium at all'],
                explain: 'Old phone screens are richer in indium than the ores it normally comes from, which makes them a valuable "urban mine".'
            },

            // ---- Camera ----
            {
                q: "Your phone camera's image sensor is a chip covered in millions of light-sensitive pixels. Which element is the chip made of?",
                options: ['Silicon', 'Gold', 'Neodymium', 'Lanthanum'],
                explain: 'When light hits the silicon it frees electrons, and the chip counts them to build up your photo. Silicon for chips is purified to 99.9999999% or better.'
            },
            {
                q: 'Why is lanthanum oxide added to high-quality glass camera lenses?',
                options: ['It bends light strongly without splitting it into colour fringes', 'It makes the lens glow faintly, so you can take photos in the dark', 'It makes the lens magnetic, so the focus motor can move it', 'It stops water and fingerprints from sticking to the lens'],
                explain: 'Lanthanum glass bends (refracts) light strongly without spreading it into a rainbow at the edges, so photos stay sharp.'
            },

            // ---- Circuit board ----
            {
                q: 'Which metal conducts electricity better than any other?',
                options: ['Silver', 'Copper', 'Gold', 'Aluminium'],
                explain: 'Silver is the best conductor of all metals, but it is expensive, so copper is used for most wiring. Silver is in the solder that holds the chips in place.'
            },
            {
                q: 'Since 2006, EU rules have restricted lead in new electronics. What is the solder that holds chips on the circuit board now mostly made of?',
                options: ['Tin, with a little silver and copper', 'Lead, with a little mercury', 'Pure gold, so it never corrodes', 'Iron and nickel, which are magnetic'],
                explain: 'A common lead-free solder is 96.5% tin, 3% silver and 0.5% copper. The RoHS rules also restrict mercury, cadmium and other hazardous substances.'
            },
            {
                q: 'Palladium, used on some circuit boards, can soak up to 900 times its own volume of which gas, like a metal sponge?',
                options: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Helium'],
                explain: 'Hydrogen atoms are so small that they slip in between the palladium atoms. Palladium is named after the asteroid Pallas.'
            },
            {
                q: 'Before a stomach X-ray, patients drink a "barium meal" of barium sulfate. Why is it safe, when other barium compounds are poisonous?',
                options: ['It does not dissolve, so the body does not absorb it', 'It is boiled first, which destroys the poisonous part of it', 'It is mixed with sugar, which cancels out the poison', 'It turns into a harmless gas as soon as it reaches the stomach'],
                explain: 'Barium sulfate is insoluble, so it passes through the body. In phones, another barium compound, barium titanate, is the ceramic inside the tiny capacitors.'
            },
            {
                q: "Gallium's partner in the chips that boost your phone's radio signal is famous as a poison. Which element is it?",
                options: ['Arsenic', 'Mercury', 'Lead', 'Chlorine'],
                explain: 'Gallium arsenide chips amplify the radio signal so it can reach the mobile mast. Tiny traces of arsenic are also added to silicon chips.'
            },
            {
                q: 'Tin and tantalum are called "conflict minerals". What must companies that use them do?',
                options: ['Check that buying them does not fund armed groups', 'Stop using them completely and find other materials instead', 'Buy them only from mines in the UK and the rest of Europe', 'Pay a special tax on them to help the countries they come from'],
                explain: 'Some of these minerals come from areas where their sale can pay for armed conflict, so companies must check their supply chains.'
            },

            // ---- Speakers, magnets & vibration ----
            {
                q: 'Praseodymium\'s name means "green twin". Which element is its twin, used together with it in magnets as "NdPr"?',
                options: ['Neodymium', 'Nickel', 'Nitrogen', 'Sodium'],
                explain: 'Praseodymium and neodymium are chemically so alike that they are usually mined, sold and used together.'
            },
            {
                q: 'A neodymium magnet (Nd2Fe14B) is mostly made of which element, by weight?',
                options: ['Iron', 'Neodymium', 'Boron', 'Copper'],
                explain: 'About two-thirds to three-quarters of the magnet\'s weight is iron. The neodymium is what makes it so strong.'
            },
            {
                q: 'Tungsten, used for the small weight in the vibration motor, holds which record?',
                options: ['The highest melting point of any metal', 'The lowest density of any metal', 'The best electrical conductor of any metal', 'The most reactive of all the metals'],
                explain: 'Tungsten melts at 3,422 °C. It is also one of the densest metals, so a tiny piece makes a good heavy weight.'
            },
            {
                q: "About how much of the world's demand for rare earth elements is met by recycling e-waste?",
                options: ['About 1%', 'About 25%', 'About 50%', 'About 90%'],
                explain: 'Only about 1%, even though speakers and other magnets are full of rare earths. That is a huge untapped urban mine.'
            },

            // ---- Battery ----
            {
                q: 'Cobalt is named after the kobold. What is a kobold?',
                options: ['A goblin from German folklore', 'A Danish king', 'A blue gemstone', 'A Greek god of the underworld'],
                explain: 'Miners blamed kobolds for ores that gave off poisonous arsenic fumes when they were smelted.'
            },
            {
                q: 'What happens when a small piece of lithium is dropped into water?',
                options: ['It floats and fizzes as it reacts', 'It sinks to the bottom and nothing happens', 'It bursts into a bright lilac flame', 'It dissolves completely without a sound'],
                explain: 'Lithium is the lightest metal, so it floats, and it reacts with the water, giving off hydrogen gas. A lilac flame is what potassium makes.'
            },
            {
                q: 'In the year to March 2026, UK waste companies recorded 1,518 fires at their sites. Roughly how many were caused by lithium-ion batteries?',
                options: ['More than 700', 'About 10', 'About 50', 'None'],
                explain: 'Phones, vapes and batteries thrown in the bin can be crushed in bin lorries and recycling plants and catch fire. Always recycle them separately.'
            },
            {
                q: 'The battery of an old phone has swollen up and the case is bulging. What should you do?',
                options: ['Stop using and charging it, and take it to a phone shop or recycling centre', 'Press it flat again carefully, then carry on using the phone', 'Keep charging it overnight until it goes back to its normal shape', 'Put it in the household bin, wrapped in a plastic bag'],
                explain: 'A swollen lithium-ion battery is damaged and can catch fire. Do not press it, charge it or bin it: let the experts deal with it.'
            },

            // ---- Casing & frame ----
            {
                q: "What makes up the biggest share of a phone's weight?",
                options: ['Plastics', 'Metals', 'Glass and ceramics', 'Gold'],
                explain: 'Plastics make up about 40% of a phone\'s weight, metals about 35%, and glass and ceramics about 25%.'
            },
            {
                q: 'This metal is about 40% lighter than steel and has been used for the frames of some top phones. Bone grows tightly against it, so it is also used for hip replacements. What is it?',
                img: ['element-Ti.jpg', 'A silvery metal crystal bar', 'Photo: <a href="https://commons.wikimedia.org/wiki/File:Titan-crystal_bar.JPG" target="_blank" rel="noopener">Alchemist-hp (www.pse-mendelejew.de)</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>'],
                options: ['Titanium', 'Aluminium', 'Magnesium', 'Tungsten'],
                explain: 'Titanium alloys are light, strong and do not corrode. China made about 70% of the world\'s titanium metal in 2025.'
            },
            {
                q: 'This light metal is used in some phones\' internal frames. It burns with a dazzling white light, so it is used in flares and sparklers. What is it?',
                img: ['element-Mg.jpg', 'Shiny metal crystals', 'Photo: <a href="https://commons.wikimedia.org/wiki/File:Magnesium_crystals.jpg" target="_blank" rel="noopener">Warut Roonguthai</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>'],
                options: ['Magnesium', 'Copper', 'Gold', 'Tin'],
                explain: 'Magnesium is about one-third less dense than aluminium. China produced about 86% of the world\'s magnesium metal in 2025.'
            },
            {
                q: 'Antimony oxide is added to some plastics in electronics. What is its job?',
                options: ['To help slow down flames', 'To make the plastic shiny', 'To make the plastic magnetic', 'To make the plastic rot away faster'],
                explain: 'Antimony oxide works as a team with bromine-containing flame retardants, so the plastic does not catch fire easily.'
            },
            {
                q: 'Some powerful phones cool their processor with a vapour chamber. How does it work?',
                options: ['Water evaporates at the hot chip and condenses again in cooler parts', 'A tiny fan inside it blows cool air over the hot chip', 'Ice inside it slowly melts and soaks up the heat from the chip', 'It turns the heat from the chip into light that shines out'],
                explain: 'Evaporating water takes in a lot of heat, and gives it out again where it condenses. The water then flows back through a copper wick to the chip.'
            },

            // ---- What can YOU do? ----
            {
                q: 'Since June 2025, new phones sold in the EU and Northern Ireland must have spare parts available for how long?',
                options: ['7 years', '6 months', '2 years', '20 years'],
                explain: 'The new rules also require a repair score from A to E on the label, so it is easier to choose a phone that can be fixed.'
            },
            {
                q: 'For the Fairphone 5, about how much of its carbon footprint comes from making the phone, rather than using it?',
                options: ['About three-quarters', 'Almost none', 'About a tenth', 'About a quarter'],
                explain: 'Most of a phone\'s carbon footprint comes from making it, so keeping a phone for longer is one of the best things you can do.'
            },
            {
                q: 'About how many unused electrical items are kept in UK homes?',
                options: ['About 880 million', 'About 8 million', 'About 88,000', 'About 8 billion'],
                explain: 'That is about 30 items per home (Material Focus, 2025). Check the drawers at home!'
            },
            {
                q: 'About how many old phones would you need to collect just 1 g of gold?',
                options: ['About 70', 'About 2', 'About 7,000', 'About a million'],
                explain: 'An old phone can contain up to about 14 mg of gold, so it takes about 70 phones to collect 1 g. Every phone counts!'
            },
            {
                q: 'Which order is best for an old phone, starting with the best option?',
                options: ['Keep it longer, repair it, pass it on, recycle it', 'Recycle it, repair it, pass it on, keep it longer', 'Pass it on, recycle it, keep it longer, repair it', 'Repair it, recycle it, keep it longer, pass it on'],
                explain: 'Keeping, repairing and reusing a phone saves all the materials and energy that went into making it. Recycling recovers some of the metals, so it comes last, but it is far better than the bin.'
            }
        ]
    };
})();
