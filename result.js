document.addEventListener("DOMContentLoaded", function () {
    const resultMessage = document.getElementById("resultMessage");
    const prizeImage = document.getElementById("prizeImage");
    const congratsMessage = document.querySelector(".congrats");

    // استرجاع البيانات من localStorage
    const correctAnswers = localStorage.getItem("correctAnswers") || 0;
    const prize = localStorage.getItem("prize") || "لا شيء";
    const prizeImagePath = localStorage.getItem("prizeImage") || "no_prize.png";

    // عرض الرسالة بناءً على عدد الإجابات الصحيحة
    resultMessage.textContent = `جاوبت ${correctAnswers} أسئلة صح.`;

    // تحديث رسالة التهنئة أو الحظ
    if (correctAnswers <= 2) {
        congratsMessage.textContent = "حظ أوفر في المرة القادمة!";
    } else {
        congratsMessage.textContent = "🎉 مبروووووك 🎉";
    }

    // تحديث صورة الجائزة
    prizeImage.src = `images/${prizeImagePath}`;
});
