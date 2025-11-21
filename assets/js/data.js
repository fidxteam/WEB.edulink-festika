// initial seed data
const SEED_QUESTIONS = {
  grammar: [
    { type: "mc", question: "She ___ to school every day.", choices: ["go","goes","going","gone"], answer: "goes" },
    { type: "fill", question: "They ___ playing football.", answer: "are" },
    { type: "mc", question: "Choose correct: I ___ already finished.", choices:["have","has","had","having"], answer:"have"}
  ],
  vocab: [
    { type: "mc", question: "What is the synonym of 'big'?", choices:["small","large","tiny","little"], answer:"large" },
    { type: "fill", question: "Translate: 'buku' = ____", answer:"book" }
  ],
  reading: [
    { type: "mc", question: "Tom went to the market to buy apples. What did Tom buy?", choices:["Bananas","Oranges","Apples","Grapes"], answer:"Apples" },
    { type: "mc", question: "Sally reads every morning. What does Sally do every morning?", choices:["Walk","Read","Cook","Sleep"], answer:"Read" }
  ]
};

// helper: ensure localStorage key exists
(function ensureQuestions() {
  if (!localStorage.getItem("quiz_questions")) {
    localStorage.setItem("quiz_questions", JSON.stringify(SEED_QUESTIONS));
  }
})();
