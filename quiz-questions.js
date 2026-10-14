/*
 * Quiz questions for "Hidden Treasure in Your Pocket".
 * Used by quiz.html (the quiz) and teachers.html (the answer key).
 *
 * The FIRST option is always the correct answer; the quiz shuffles the options.
 * Every fact here also appears on the main page, so pupils can learn it there first.
 * img (optional): [file, alt text, credit HTML]
 */
window.QUIZ_QUESTIONS = [
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
];
