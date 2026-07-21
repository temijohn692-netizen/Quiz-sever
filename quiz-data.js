// Edit this file to change the quiz questions.
// Each question needs: text, an array of 4 options, and the index (0-3) of the correct one.
const questions = [
  {
    text: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Ibadan"],
    correctIndex: 1
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctIndex: 2
  },
  {
    text: "What is 12 x 8?",
    options: ["96", "88", "108", "84"],
    correctIndex: 0
  },
  {
    text: "Which gas do plants absorb from the air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctIndex: 2
  },
  {
    text: "Who wrote 'Things Fall Apart'?",
    options: ["Wole Soyinka", "Chinua Achebe", "Chimamanda Ngozi Adichie", "Ben Okri"],
    correctIndex: 1
  }
];

// Only shown to names that start with "." — a hidden bonus question.
const specialQuestion = {
  text: "What's the hidden bonus question worth?",
  options: ["Nothing, just for fun", "1 point", "5 points", "A prize"],
  correctIndex: 0
};

module.exports = { questions, specialQuestion };
