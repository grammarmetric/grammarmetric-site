// ============================================================================
// THE EXAMINER — bank.js · placement item bank
//
// 4 CEFR levels × 12 words (4 nouns / 4 verbs / 4 adjectives each).
// Every item is ONE cloze question — the most IELTS-like, self-contained
// format. Distractors are drawn from the SAME level and SAME part of speech,
// so every option is plausible in register and grammar; only meaning decides.
//
// Item shape: { w:word, pos:'noun'|'verb'|'adjective',
//               def:'plain-English meaning'  (wrong-answer flash + breakdown),
//               ctx:'cloze sentence with ___' (the question) }
//
// AUTHORING RULES (keep when adding/replacing items):
//  - ctx must strongly select its word: no same-level, same-POS neighbour may
//    fit the gap grammatically AND semantically.
//  - the bare form must fit the gap (no ___s / ___ed slots).
//  - ≥4 words per POS per level, or that word can't build 3 clean distractors.
//  - All sentences original to this project.
//
// Level tags: 0 = A2 · 1 = B1 · 2 = B2 · 3 = C1
// ============================================================================

window.EXAMINER_BANK = {

  0: [ // ── A2 — everyday words ──────────────────────────────────────────────
    { w:'holiday',   pos:'noun', def:'a time when you travel or rest, away from work or school',
      ctx:'We went to the beach for our summer ___ .' },
    { w:'neighbour', pos:'noun', def:'a person who lives next to you or near you',
      ctx:'Our ___ next door waters our plants when we travel.' },
    { w:'ticket',    pos:'noun', def:'a piece of paper that lets you enter or travel',
      ctx:'You need a ___ to get on the train.' },
    { w:'kitchen',   pos:'noun', def:'the room where you cook food',
      ctx:'She is making dinner in the ___ .' },
    { w:'borrow',    pos:'verb', def:'to take something and give it back later',
      ctx:"Can I ___ your pen? I'll give it back after class." },
    { w:'arrive',    pos:'verb', def:'to get to a place',
      ctx:'The bus should ___ at nine o\'clock.' },
    { w:'forget',    pos:'verb', def:'to not remember something',
      ctx:'Don\'t ___ your umbrella — it will rain today.' },
    { w:'invite',    pos:'verb', def:'to ask someone to come to an event',
      ctx:'Did you ___ all your friends to the party?' },
    { w:'hungry',    pos:'adjective', def:'wanting to eat',
      ctx:"I'm really ___ — let's have lunch now." },
    { w:'expensive', pos:'adjective', def:'costing a lot of money',
      ctx:'That phone is too ___ for me; I\'ll buy a cheaper one.' },
    { w:'quiet',     pos:'adjective', def:'with little or no noise',
      ctx:'The library is very ___ — nobody is talking.' },
    { w:'dangerous', pos:'adjective', def:'able to hurt or harm you',
      ctx:'It is ___ to swim in the river after heavy rain.' },
  ],

  1: [ // ── B1 — intermediate ────────────────────────────────────────────────
    { w:'opportunity',   pos:'noun', def:'a chance to do something good',
      ctx:'Working abroad gave her the ___ to learn a new language.' },
    { w:'advertisement', pos:'noun', def:'a notice or video that tries to sell something',
      ctx:'I saw an ___ for the job in the newspaper.' },
    { w:'experience',    pos:'noun', def:'knowledge or skill from doing something before',
      ctx:"You don't need any ___ to apply — we will train you." },
    { w:'purpose',       pos:'noun', def:'the reason something is done',
      ctx:"The main ___ of the meeting is to plan next year's budget." },
    { w:'improve',   pos:'verb', def:'to make or become better',
      ctx:'Practising a little every day will ___ your speaking.' },
    { w:'avoid',     pos:'verb', def:'to stay away from something',
      ctx:'Leave home early to ___ the morning traffic.' },
    { w:'encourage', pos:'verb', def:'to give someone confidence to do something',
      ctx:'Good teachers ___ students to ask questions.' },
    { w:'achieve',   pos:'verb', def:'to succeed in doing something after effort',
      ctx:'She worked for years to ___ her goal of studying abroad.' },
    { w:'convenient',   pos:'adjective', def:'easy to use or reach; not causing difficulty',
      ctx:'The hotel is very ___ for the airport — only five minutes away.' },
    { w:'familiar',     pos:'adjective', def:'known to you; easy to recognise',
      ctx:"His face looks ___ , but I can't remember his name." },
    { w:'various',      pos:'adjective', def:'several different kinds of',
      ctx:'The course covers ___ topics, from grammar to writing.' },
    { w:'disappointed', pos:'adjective', def:'sad because something was not as good as hoped',
      ctx:'She was ___ when her team lost the final.' },
  ],

  2: [ // ── B2 — upper-intermediate ──────────────────────────────────────────
    { w:'consequence', pos:'noun', def:'a result of an action, often a bad one',
      ctx:'Rising sea levels are a direct ___ of global warming.' },
    { w:'tendency',    pos:'noun', def:'a habit of behaving in a particular way',
      ctx:'He has a ___ to leave things until the last minute.' },
    { w:'priority',    pos:'noun', def:'the thing treated as most important',
      ctx:"Passenger safety is the airline's top ___ ." },
    { w:'controversy', pos:'noun', def:'strong public disagreement about something',
      ctx:'The new law caused ___ because many people felt it was unfair.' },
    { w:'obtain',    pos:'verb', def:'to get something, especially by effort or official process',
      ctx:'Students must ___ a visa before entering the country.' },
    { w:'decline',   pos:'verb', def:'to become smaller or weaker; to go down',
      ctx:'Sales began to ___ after the holiday season ended.' },
    { w:'emphasise', pos:'verb', def:'to show that something is especially important',
      ctx:'In her speech, she wanted to ___ the importance of teamwork.' },
    { w:'adapt',     pos:'verb', def:'to change in order to suit a new situation',
      ctx:'It took him a year to ___ to life in a new country.' },
    { w:'sufficient', pos:'adjective', def:'as much as is needed; enough',
      ctx:'Make sure you have ___ time to answer every question.' },
    { w:'reluctant',  pos:'adjective', def:'not wanting to do something',
      ctx:'He was ___ to lend his car to anyone.' },
    { w:'thorough',   pos:'adjective', def:'careful and complete, missing nothing',
      ctx:'The doctor gave her a ___ examination before making a diagnosis.' },
    { w:'inevitable', pos:'adjective', def:'certain to happen; impossible to avoid',
      ctx:'With both sides refusing to talk, conflict seemed ___ .' },
  ],

  3: [ // ── C1 — advanced ────────────────────────────────────────────────────
    { w:'scrutiny',   pos:'noun', def:'careful and critical examination',
      ctx:"The minister's spending came under close ___ after the scandal." },
    { w:'constraint', pos:'noun', def:'something that limits what you can do',
      ctx:'Time was the biggest ___ on the project — money was never the problem.' },
    { w:'ambiguity',  pos:'noun', def:'the quality of having more than one possible meaning',
      ctx:'The contract was rewritten to remove any ___ about who owns the data.' },
    { w:'consensus',  pos:'noun', def:'general agreement among a group',
      ctx:'After hours of debate, the committee finally reached a ___ .' },
    { w:'mitigate',  pos:'verb', def:'to make something bad less severe',
      ctx:'Coastal wetlands help ___ the damage caused by storms.' },
    { w:'exacerbate',pos:'verb', def:'to make a bad situation worse',
      ctx:'Cutting hospital budgets will only ___ the staffing crisis.' },
    { w:'allocate',  pos:'verb', def:'to officially give out resources for a purpose',
      ctx:'The government plans to ___ more funding to rural schools.' },
    { w:'undermine', pos:'verb', def:'to gradually weaken something',
      ctx:"Constant criticism can ___ a student's confidence." },
    { w:'negligible', pos:'adjective', def:'so small it is not worth considering',
      ctx:'The difference in price was ___ — only a few cents.' },
    { w:'meticulous', pos:'adjective', def:'extremely careful about details',
      ctx:'She kept ___ records of every experiment she ran.' },
    { w:'plausible',  pos:'adjective', def:'seeming reasonable or believable',
      ctx:'His excuse sounded ___ , but nobody quite believed it.' },
    { w:'profound',   pos:'adjective', def:'very great or deep in effect',
      ctx:'The internet has had a ___ effect on the way we learn.' },
  ],
};

// CEFR label per ladder level — used on the breakdown screen bars.
window.EXAMINER_LEVELS = [
  { tag:'A2', label:'Everyday words'       },
  { tag:'B1', label:'Intermediate words'   },
  { tag:'B2', label:'Upper-intermediate'   },
  { tag:'C1', label:'Advanced words'       },
];
