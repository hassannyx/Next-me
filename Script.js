// ============== بيانات الاختبار ==============
const questions = [
    {
        question: "1. عندما تكون في موقف صعب، أنت تميل إلى:",
        options: [
            "تحليل المشكلة منطقيًا واتخاذ قرار موضوعي",
            "الاستماع لحدسك الداخلي والمشاعر",
            "طلب مشورة الآخرين قبل التصرف",
            "التصرف بسرعة حسب ما يمليه الموقف"
        ],
        scores: [3, 1, 2, 0] // INTJ, INFP, ENFJ, ESTP
    },
    {
        question: "2. في الحفلات، أنت عادة:",
        options: [
            "تتواصل مع أشخاص جدد بسهولة",
            "تقتصر على دائرة معارفك",
            "تراقب من بعيد قبل المشاركة",
            "تفضل عدم الحضور أساسًا"
        ],
        scores: [0, 2, 1, 3] // ESTP, ENFJ, INFP, INTJ
    },
    // يمكنك إضافة 18 سؤالًا آخر بنفس الهيكل
];

const personalityTypes = [
    {
        type: "INTJ",
        title: "الاستراتيجي",
        desc: "أنت مفكر استراتيجي تحب التخطيط للمستقبل، تتمتع بعقلية تحليلية وقدرة على حل المشكلات المعقدة."
    },
    {
        type: "INFP",
        title: "المثالي",
        desc: "شخص حالم وقيمك مهمة لك، تهتم بالمعاني العميقة وتسعى لجعل العالم مكانًا أفضل."
    },
    // أضف بقية الأنماط الـ16
];

// ============== متغيرات التشغيل ==============
let currentQuestion = 0;
let userScores = Array(16).fill(0); // مصفوفة لتتبع نقاط كل نمط

// ============== عناصر واجهة المستخدم ==============
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress');
const resultContainer = document.getElementById('personality-result');
const restartBtn = document.getElementById('restart-btn');

// ============== إدارة الأحداث ==============
startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', restartTest);

// ============== دوال الاختبار ==============
function startTest() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    // تحديث شريط التقدم
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // عرض السؤال الحالي
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    
    // إنشاء خيارات السؤال
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    // حساب النقاط (هذا مثال - تحتاج لخوارزمية أفضل)
    const question = questions[currentQuestion];
    userScores = userScores.map((score, i) => score + question.scores[selectedIndex]);
    
    // الانتقال للسؤال التالي
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    // تحديد النمط الأعلى نقاطًا
    const maxScore = Math.max(...userScores);
    const personalityIndex = userScores.indexOf(maxScore);
    const personality = personalityTypes[personalityIndex];
    
    // عرض النتيجة
    resultContainer.innerHTML = `
        <h3>${personality.type} - ${personality.title}</h3>
        <p>${personality.desc}</p>
        <div class="type-details">
            <p><strong>نقاطك:</strong> ${maxScore}/${questions.length * 3}</p>
            <p><strong>مشاهير من نمطك:</strong> [أسماء مشاهير]</p>
        </div>
    `;
}

function restartTest() {
    currentQuestion = 0;
    userScores = Array(16).fill(0);
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

// ============== تحسينات إضافية ==============
document.addEventListener('DOMContentLoaded', () => {
    // إضافة تأثيرات عند التحميل
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.transition = 'opacity 0.5s';
        startScreen.style.opacity = '1';
    }, 100);
});
