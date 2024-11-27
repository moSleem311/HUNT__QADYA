const questions = [
  { question: " ايه اللى بيخلى اتنين يلاعبوا بعض؟", options: ["الميزان", "السن", "ال  Record  ؟", "أي شخص يمكنه اللعب"], answer: "الميزان" },
  { question: "ال mma بتتكون من كام رياضه؟", options: ["5", "7", "10", "12"], answer: "7" },
  { question: "مين من الاسماء دى مش مقاتل mma ؟", options: ["حبيب", "إسلام سياحة", "أحمد الجندي", "كونر"], answer: "أحمد الجندي" },
  { question: "قاضيه عملت كام ايفينت؟", options: ["5", "7", "10", "12"], answer: "7" },
  { question: "اول نزال mma اتلعب فى سنه كام؟", options: ["1995", "1993", "2000", "2001"], answer: "1993" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let used50Button = false;
let usedCallFriendButton = false;

const questionElement = document.getElementById("question");
const optionElements = [...document.querySelectorAll(".option")];
const checkAnswerBtn = document.getElementById("checkAnswerBtn");
const use50Button = document.getElementById("use50Button");
const callFriendButton = document.getElementById("callFriendButton");
const exitButton = document.getElementById("exitButton");
const resultMessage = document.getElementById("resultMessage");
const stageElement = document.getElementById("stage");
const amountElement = document.getElementById("amount");

function loadQuestion() {
  const questionData = questions[currentQuestionIndex];
  questionElement.textContent = questionData.question;
  optionElements.forEach((btn, index) => {
      btn.textContent = questionData.options[index];
      btn.classList.remove("correct", "wrong", "selected");
      btn.disabled = false;
      btn.onclick = () => selectAnswer(questionData.options[index]);
  });
  stageElement.textContent = currentQuestionIndex + 1;
}

function selectAnswer(selected) {
  optionElements.forEach((btn) => btn.disabled = true);
  const selectedOption = [...optionElements].find(btn => btn.textContent === selected);
  selectedOption.classList.add('selected');
}

function checkAnswer() {
  const correctAnswer = questions[currentQuestionIndex].answer;
  const selectedAnswer = [...document.querySelectorAll(".option")]
      .find(btn => btn.classList.contains('selected'));

  if (selectedAnswer) {
      if (selectedAnswer.textContent === correctAnswer) {
          selectedAnswer.classList.add("correct");
          correctAnswers++;

          // تحديث العداد الخاص بالعلامة
          amountElement.textContent = correctAnswers;

          displayMessage("مبروك! اجابتك صحيحة.");
      } else {
          selectedAnswer.classList.add("wrong");
          displayMessage("الإجابة خاطئة!");
      }
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      showResult();
  }
}

function showResult() {
  let prize = "";
  let prizeImage = "";

  if (correctAnswers <= 2) {
      prize = "لا شيء";
      prizeImage = "no_prize.png";
  } else if (correctAnswers >= 3 && correctAnswers <= 4) {
      prize = "سوار (Bracelet)";
      prizeImage = "bracelet.png";
  } else if (correctAnswers === 5) {
      prize = "قميص (T-shirt)";
      prizeImage = "tshirt.png";
  }

  // تخزين النتائج في localStorage
  localStorage.setItem("correctAnswers", correctAnswers);
  localStorage.setItem("prize", prize);
  localStorage.setItem("prizeImage", prizeImage);

  // الانتقال إلى صفحة النتائج
  window.location.href = "result.html";
}

function displayMessage(message) {
  resultMessage.textContent = message;
}

function use50() {
  if (!used50Button) {
      used50Button = true;
      const correctAnswer = questions[currentQuestionIndex].answer;
      let wrongOptions = [...questions[currentQuestionIndex].options].filter(option => option !== correctAnswer);
      wrongOptions = wrongOptions.slice(0, 2);

      optionElements.forEach((btn) => {
          if (wrongOptions.includes(btn.textContent)) {
              btn.disabled = true;
          }
      });
      use50Button.disabled = true;
  }
}

function callFriend() {
  if (!usedCallFriendButton) {
      alert("مساعدة خارجيه!");
      usedCallFriendButton = true;
      callFriendButton.disabled = true; // تعطيل الزر بعد الاستخدام
  } else {
      alert("لقد استخدمت خيار مساعدة خارجيه بالفعل!");
  }
}

function exitGame() {
  if (confirm("هل أنت متأكد من أنك تريد الانسحاب؟")) {
      window.location.href = "index.html";
  }
}

checkAnswerBtn.addEventListener("click", checkAnswer);
use50Button.addEventListener("click", use50);
callFriendButton.addEventListener("click", callFriend);
exitButton.addEventListener("click", exitGame);

loadQuestion();
