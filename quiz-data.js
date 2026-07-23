// Edit this file to change courses, questions, or the survey.

const courses = {
  gst103: {
    code: "GST 103",
    title: "African Peoples, Cultures & Civilisations",
    questions: [
      { text: "According to the text, which historian strongly asserted that old Egyptian civilisation was black African?", options: ["Basil Davidson", "Akinjide Osuntokun", "Cheikh Anta Diop", "Ibn Battuta"], correctIndex: 2 },
      { text: "Where did iron working civilisation first emerge on the African continent?", options: ["Axum", "Merowe", "Punt", "Timbuktu"], correctIndex: 1 },
      { text: "Around what year did Egyptian civilisation develop?", options: ["5000BC", "3500BC", "2500BC", "1500BC"], correctIndex: 2 },
      { text: "The Kushite Pharaohs ruled Egypt from the Mediterranean to the border of modern Ethiopia around which year?", options: ["1000BC", "725BC", "500BC", "300BC"], correctIndex: 1 },
      { text: "What was the capital of the Kushite civilisation?", options: ["Axum", "Memphis", "Merowe", "Thebes"], correctIndex: 2 },
      { text: "Which of the following is NOT mentioned as a name for the Supreme Being in Nigeria?", options: ["Olorun", "Chukwu", "Allah", "Ubangiji"], correctIndex: 2 },
      { text: "Which of the following civilisations was a copy of Ancient Egypt according to the text?", options: ["Axum", "Punt", "Kush", "Maghreb"], correctIndex: 2 },
      { text: "What was the name of the secret society among the Yoruba mentioned in the text?", options: ["Ekpe", "Ogboni", "Sangof", "Fezzan"], correctIndex: 1 },
      { text: "Which of the following groups began to adopt Ijukun institutional symbols such as drums?", options: ["The Fulani", "The Tivs", "The Igbo", "The Nguni"], correctIndex: 1 },
      { text: "The Mahdist revolt occurred in the latter part of the 19th century in which country?", options: ["Nigeria", "Egypt", "Sudan", "Ethiopia"], correctIndex: 2 },
      { text: "Islam came to Borno by which century through the Fezzan and the Sudan?", options: ["6th century", "7th century", "8th century", "9th century"], correctIndex: 2 },
      { text: "According to the text, what is the predominant Islamic tradition in Africa?", options: ["Shia", "Sunni", "Sufi", "Ahmadiyya"], correctIndex: 1 },
      { text: "Which of the following is NOT mentioned as a form of oil used in African cooking?", options: ["Palm oil", "Peanut oil", "Coconut oil", "Shea butter oil"], correctIndex: 2 },
      { text: "The trans-Saharan trade provided contact between the savannah and which region?", options: ["The Atlantic Coast", "The Mediterranean Coast", "The Indian Ocean Coast", "The Red Sea Coast"], correctIndex: 1 },
      { text: "Which language has been spreading from the coast of Zanzibar, Mozambique, and the Eastern coast of East Africa across the continent?", options: ["Arabic", "Hausa", "Swahili", "Yoruba"], correctIndex: 2 },
      { text: "Which of the following is NOT a characteristic of African culture mentioned in the text?", options: ["Elaborate greetings and salutations", "Time sensitivity and punctuality", "Belief in a Supreme Being", "Use of herbal medicine"], correctIndex: 1 },
      { text: "Which of the following groups is mentioned as having influence as centralising agents in East and Southern Africa?", options: ["The Yoruba", "The Igbo", "The Nguni", "The Tivs"], correctIndex: 2 },
      { text: "According to the text, what religion was exploited by rulers to ensure loyalty of subjects?", options: ["Christianity", "Islam", "Traditional religion", "Judaism"], correctIndex: 2 },
      { text: "Which of the following is NOT mentioned as having been influenced by the Bini monarchy?", options: ["Ekiti principalities", "Akoko principalities", "Igala kingdom", "Hausa kingdoms"], correctIndex: 3 },
      { text: "According to the text, what has been the effect of globalisation and IT revolution on African youths?", options: ["They have become more traditional", "They have become caricatures of western culture", "They have abandoned all forms of religion", "They have returned to pre-colonial practices"], correctIndex: 1 }
    ]
  },
  gst104: {
    code: "GST 104",
    title: "Reproductive Health Studies",
    questions: [
      { text: "According to the WHO definition, health is a state of complete:", options: ["Physical fitness only", "Physical, mental and social well-being", "Mental and emotional stability", "Absence of disease only"], correctIndex: 1 },
      { text: "Environmental health is a branch of public health concerned with:", options: ["Only genetic factors affecting health", "All aspects of the natural and built environment that may affect human health", "Only social and cultural factors", "Only infectious diseases"], correctIndex: 1 },
      { text: "WHO defines environmental health as aspects of human health determined by:", options: ["Genetic factors only", "Physical, chemical and biological factors external to a person", "Social and cultural environment only", "Behavioral factors only"], correctIndex: 1 },
      { text: "According to WHO, how many deaths could be prevented every year by making our environment healthier?", options: ["3 million", "7 million", "13 million", "20 million"], correctIndex: 2 },
      { text: "In children under the age of five, what fraction of all diseases is caused by environmental factors?", options: ["One quarter", "One third", "One half", "Two thirds"], correctIndex: 1 },
      { text: "How many children under 5 years could be saved every year by preventing environmental risks?", options: ["1 million", "2 million", "3 million", "4 million"], correctIndex: 3 },
      { text: "Better environmental management could prevent what percentage of deaths from diarrhea disease?", options: ["40%", "60%", "80%", "94%"], correctIndex: 3 },
      { text: "In the least developed countries, what fraction of death and disease is a direct result of environmental causes?", options: ["One quarter", "One third", "One half", "Two thirds"], correctIndex: 1 },
      { text: "Environmental factors influence how many categories of diseases and injuries listed in the world health report?", options: ["55 out of 102", "65 out of 102", "75 out of 102", "85 out of 102"], correctIndex: 3 },
      { text: "Which of the following is NOT listed as an environmental health concern?", options: ["Air quality", "Food safety", "Genetic disorders", "Noise pollution control"], correctIndex: 2 },
      { text: "Vector control includes the control of all EXCEPT:", options: ["Mosquitoes", "Rodents", "Birds", "Cockroaches"], correctIndex: 2 },
      { text: "Stress is defined as the response you have when facing circumstances that force you to:", options: ["Relax and rest", "Act, change or adjust in some way", "Ignore all problems", "Sleep more"], correctIndex: 1 },
      { text: "The circumstances that cause stress are known as:", options: ["Reactions", "Stressors", "Responses", "Symptoms"], correctIndex: 1 },
      { text: "Which of the following is NOT one of the four A's for dealing with stressful situations?", options: ["Avoid the stressor", "Alter the stressor", "Argue with the stressor", "Accept the stressor"], correctIndex: 2 },
      { text: "Which approach to stress management involves breathing exercises and use of humor?", options: ["Long-term stress management", "Addressing the situation", "Quick stress relief", "Avoidance"], correctIndex: 2 },
      { text: "What is recommended as a minimum amount of sleep per night?", options: ["4 hours", "5 hours", "6 hours", "7 hours"], correctIndex: 3 },
      { text: "Which of the following is a strategy for altering a stressful situation?", options: ["Avoid the person causing stress", "Express your feelings instead of bottling them up", "Ignore the problem", "Accept everything as it is"], correctIndex: 1 },
      { text: "According to the 2008 physical activity guidelines, regular exercise helps protect against all EXCEPT:", options: ["Heart disease", "Type 2 diabetes", "Malaria", "Osteoporosis"], correctIndex: 2 },
      { text: "A sedentary lifestyle is associated with:", options: ["Little or no physical activity", "Increased physical fitness", "Better health outcomes", "Reduced disease risk"], correctIndex: 0 },
      { text: "Which of the following is NOT mentioned as a healthy way to relax and recharge?", options: ["Going for a walk and breathing in fresh air", "Spending time working in a garden", "Watching television all day", "Taking time for fun and relaxation"], correctIndex: 2 }
    ]
  },
  ges107: {
    code: "GES 107",
    title: "Science, Technology and Humankind",
    questions: [
      { text: "According to the text, the doctrine of divine creation is a cornerstone of which religions?", options: ["Buddhism, Hinduism, and Jainism", "Judaism, Christianity, and Islam", "Taoism, Confucianism, and Shinto", "Zoroastrianism, Sikhism, and Bahá'í"], correctIndex: 1 },
      { text: "The creationist account of the origin of humans is based primarily on:", options: ["Empirical evidence", "Scientific experimentation", "Faith and the biblical account", "Archaeological findings"], correctIndex: 2 },
      { text: "According to the biblical account in Genesis, God created humans in whose image?", options: ["The angels", "God's own image", "The animals", "The stars"], correctIndex: 1 },
      { text: "The first human beings according to the biblical creation story were called:", options: ["Abraham and Sarah", "Adam and Eve", "Moses and Miriam", "Noah and Naamah"], correctIndex: 1 },
      { text: "Which book by Charles Darwin challenged the creationist viewpoint?", options: ["The Descent of Man", "The Expression of the Emotions in Man and Animals", "The Origin of Species", "The Voyage of the Beagle"], correctIndex: 2 },
      { text: "According to the text, creation from nothing is known as:", options: ["Ex materia", "Ex nihilo", "Ex deo", "Ex natura"], correctIndex: 1 },
      { text: "Which of the following is NOT one of the four events that dominated the origin of life according to Henry Morris?", options: ["Special creation of all things in six days", "The curse upon all things", "The Industrial Revolution", "Universal flood"], correctIndex: 2 },
      { text: "According to the text, what is the most widely accepted scientific explanation of the origin of the universe?", options: ["The Steady State Theory", "The Big Bang Theory", "The Oscillating Universe Theory", "The Plasma Cosmology Theory"], correctIndex: 1 },
      { text: "Cosmologists believe the universe originated between how many billion years ago?", options: ["5 to 8 billion years", "10 to 12 billion years", "15 to 18 billion years", "20 to 25 billion years"], correctIndex: 2 },
      { text: "In African Traditional Religion (ATR), the supreme deity among the Igbo is called:", options: ["Olodumare", "Chukwu", "Amma", "Osamobua"], correctIndex: 1 },
      { text: "According to the text, pantheism maintains that:", options: ["God created everything from nothing", "God and the universe are one", "God is completely separate from the universe", "There is no God"], correctIndex: 1 },
      { text: "Which philosopher is mentioned as arguing that every conception of God is inevitably partial and inadequate?", options: ["Stephen Hawking", "Charles Darwin", "J.I. Omorogbe", "Erich Fromm"], correctIndex: 2 },
      { text: "According to the text, the Sustainable Development Goals (SDGs) aim to do all EXCEPT:", options: ["Reduce inequality", "Promote climate change", "Protect ecosystems", "Strengthen global partnership"], correctIndex: 1 },
      { text: "SDG 6 focuses on:", options: ["Climate action", "Clean water and sustainable water management", "Affordable and clean energy", "Life on land"], correctIndex: 1 },
      { text: "SDG 7 focuses on:", options: ["Clean water and sanitation", "Affordable and clean energy", "Climate action", "Life below water"], correctIndex: 1 },
      { text: "Which of the following is mentioned as a consequence of climate change?", options: ["Increased crop production", "Gain of biodiversity", "Loss of biodiversity", "Decrease in economic losses"], correctIndex: 2 },
      { text: "According to the text, greenhouse gases include all EXCEPT:", options: ["Carbon dioxide (CO₂)", "Methane", "Oxygen", "Nitrous oxide"], correctIndex: 2 },
      { text: "Scientists estimate that the Sun will continue to radiate at more or less the same intensity for how long before becoming a red giant?", options: ["One to two billion years", "Three to four billion years", "Five to ten billion years", "Fifteen to twenty billion years"], correctIndex: 2 },
      { text: "The book \"A Brief History of Time\" was written by:", options: ["Charles Darwin", "Stephen Hawking", "Erich Fromm", "Geoffrey Parrinder"], correctIndex: 1 },
      { text: "According to the text, scientific creationism probably began in 1961 with the publication of:", options: ["The Origin of Species", "A Brief History of Time", "The Genesis Flood", "The Self-Organizing Universe"], correctIndex: 2 }
    ]
  }
};

// Shown only to names starting with "." — a ratings-based feedback survey.
const surveyStatements = [
  "The website was easy to navigate",
  "The website was fast enough",
  "The design was visually appealing",
  "The information was clear and easy to understand",
  "The website met my expectations",
  "I did not encounter any problems while using the website",
  "I would recommend this website to others",
  "I would use this website again",
  "Overall, I am satisfied with this website"
];
const surveyScale = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
const surveyOpenQuestion = "What should we improve or remove?";

module.exports = { courses, surveyStatements, surveyScale, surveyOpenQuestion };
