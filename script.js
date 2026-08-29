/* =========================================================
   MEMORY CHALLENGE GAME

   LEVEL 1 = 35 MARKS
   LEVEL 2 = 35 MARKS
   LEVEL 3 = 30 MARKS

   TOTAL = 100 MARKS
========================================================= */


let currentLevel = 1;

let currentQuestion = 1;

let totalScore = 0;

let levelScore = 0;

let countdownTimer = null;


/* =========================================================
   MARKS
========================================================= */

const levelMarks = {

    1: [10, 10, 15],

    2: [10, 10, 15],

    3: [10, 10, 10]

};


/* =========================================================
   LEVEL 1 IMAGES
========================================================= */

const level1Images = [

    {
        name: "Astronaut",
        file: "images/level1/astronaut.jpeg"
    },

    {
        name: "Chef",
        file: "images/level1/chef.jpeg"
    },

    {
        name: "Doctor",
        file: "images/level1/doctor.jpeg"
    },

    {
        name: "Pandith",
        file: "images/level1/pandith.jpeg"
    }

];


/* =========================================================
   LEVEL 2 MOVIES

   IMPORTANT:
   Your files are "movie"
========================================================= */

const level2Images = [

    {
        name: "movie1",
        file: "images/level2/movie1.jpeg"
    },

    {
        name: "movie2",
        file: "images/level2/movie2.jpeg"
    },

    {
        name: "movie3",
        file: "images/level2/movie3.jpeg"
    }

];


/* =========================================================
   LEVEL 3 IMAGES

   IMPORTANT:
   SHELL FILE = shells.jpeg
========================================================= */

const level3Images = [

    {
        name: "shells",
        file: "images/level3/shells.jpeg"
    },

    {
        name: "ship",
        file: "images/level3/ship.jpeg"
    },

    {
        name: "snow",
        file: "images/level3/snow.jpeg"
    },

    {
        name: "trees",
        file: "images/level3/trees.jpeg"
    },

    {
        name: "waves",
        file: "images/level3/waves.jpeg"
    }

];


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    const music = document.getElementById("backgroundMusic");

    music.volume = 0.4;

    music.play().catch(function(error) {
        console.log("Music could not start:", error);
    });

    clearInterval(countdownTimer);

    currentLevel = 1;

    currentQuestion = 1;

    totalScore = 0;

    levelScore = 0;


    document
        .getElementById("homeScreen")
        .classList.add("hidden");


    document
        .getElementById("levelCompleteScreen")
        .classList.add("hidden");


    document
        .getElementById("finalScreen")
        .classList.add("hidden");


    document
        .getElementById("gameScreen")
        .classList.remove("hidden");


    updateScore();

    startQuestion();

}


/* =========================================================
   START QUESTION
========================================================= */

function startQuestion() {

    clearInterval(countdownTimer);


    const memoryArea =
        document.getElementById(
            "memoryArea"
        );


    const questionArea =
        document.getElementById(
            "questionArea"
        );


    const feedback =
        document.getElementById(
            "feedback"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    memoryArea.classList.remove(
        "hidden"
    );


    questionArea.classList.add(
        "hidden"
    );


    feedback.textContent = "";

    feedback.className =
        "feedback";


    nextButton.classList.add(
        "hidden"
    );


    updateLevelTitle();

    updateProgress();


    if (currentLevel === 1) {

        level1Question();

    }

    else if (currentLevel === 2) {

        level2Question();

    }

    else if (currentLevel === 3) {

        level3Question();

    }

}


/* =========================================================
   LEVEL 1
========================================================= */

function level1Question() {

    let images =
        [...level1Images];


    /* -----------------------------------------------------
       QUESTION 1
    ----------------------------------------------------- */

    if (currentQuestion === 1) {

        showImages(

            images,

            "Observe these 4 pictures Carefully!",

            "level1-images"

        );


        startCountdown(
            5,
            function () {

                hideMemoryImages();

                askLevel1Question1(
                    images
                );

            }
        );

    }


    /* -----------------------------------------------------
       QUESTION 2
    ----------------------------------------------------- */

    else if (currentQuestion === 2) {

        images =
            shuffleArray(images);


        showImages(

            images,

            "Observe these 4 pictures Carefully!",

            "level1-images"

        );


        startCountdown(
            5,
            function () {

                hideMemoryImages();

                askLevel1Question2(
                    images
                );

            }
        );

    }


    /* -----------------------------------------------------
       QUESTION 3
    ----------------------------------------------------- */

    else {

        const astronaut =
            level1Images[0];


        showImages(

            [astronaut],

            "Remember this picture!",

            "level3-single"

        );


        const image =
            document.querySelector(
                "#imageContainer .memory-image"
            );


        if (image) {

            image.style.filter =
                "blur(15px)";

            image.style.opacity =
                "1.00";

        }


        startCountdown(
            5,
            function () {

                hideMemoryImages();

                askLevel1Question3();

            }
        );

    }

}


/* =========================================================
   LEVEL 1 QUESTION 1
========================================================= */

function askLevel1Question1(
    images
) {

    showQuestion(

        "What was the colour of the vessel infront of the chef?",

        [
            "Black",
            "Silver",
            "Wooden",
            "Golden"
        ],

        "Silver"

    );

}


/* =========================================================
   LEVEL 1 QUESTION 2
========================================================= */

function askLevel1Question2(
    images
) {

    const correctOrder =
        images
            .map(
                item => item.name
            )
            .join(" → ");


    const reverseOrder =
        [...images]
            .reverse()
            .map(
                item => item.name
            )
            .join(" → ");


    const order3 =
        [
            images[1],
            images[0],
            images[3],
            images[2]
        ]
        .map(
            item => item.name
        )
        .join(" → ");


    const order4 =
        [
            images[2],
            images[3],
            images[0],
            images[1]
        ]
        .map(
            item => item.name
        )
        .join(" → ");


    showQuestion(

        "What was the picture order?",

        [
            correctOrder,
            reverseOrder,
            order3,
            order4
        ],

        correctOrder

    );

}


/* =========================================================
   LEVEL 1 QUESTION 3
========================================================= */

function askLevel1Question3() {

    showQuestion(

        "Who is this picture?",

        [
            "Astronaut",
            "Pandith",
            "Doctor",
            "Chef"
        ],

        "Astronaut"

    );

}


/* =========================================================
   LEVEL 2
========================================================= */

function level2Question() {

    const movie =
        level2Images[
            currentQuestion - 1
        ];


    showImages(

        [movie],

        "Find out the movie name based on the hints!",

        "level2-single"

    );


    startCountdown(
        5,
        function () {

            hideMemoryImages();


            if (currentQuestion === 1) {

                askLevel2Question1();

            }

            else if (
                currentQuestion === 2
            ) {

                askLevel2Question2();

            }

            else {

                askLevel2Question3();

            }

        }
    );

}


/* =========================================================
   LEVEL 2 QUESTION 1
========================================================= */

function askLevel2Question1() {

    showQuestion(

        "Guess the movie",

        [
            "zombiereddy",
            "Matthu vadhalara",
            "jambalakadipamba",
            "Rangasthalam"
        ],

        "zombiereddy"

    );

}


/* =========================================================
   LEVEL 2 QUESTION 2
========================================================= */

function askLevel2Question2() {

    showQuestion(

        "Guess the movie",

        [
            "Bruce Lee",
            "Dhruva",
            "Khaidhi no.150",
            "Godfather"
        ],

        "Bruce Lee"

    );

}


/* =========================================================
   LEVEL 2 QUESTION 3
========================================================= */

function askLevel2Question3() {

    showQuestion(

        "Guess the movie",

        [
            "Ala Vaikunthapurramuloo",
            "dhruva",
            "Sarrainodu",
            "Naa peru surya naa illu india "
        ],

        "Sarrainodu"

    );

}


/* =========================================================
   LEVEL 3

   FIVE PICTURES SHOW TOGETHER
   FOR 5 SECONDS
========================================================= */

function level3Question() {

    const images =
        shuffleArray(
            [...level3Images]
        );


    showImages(

        images,

        "Remember all 5 pictures!",

        "level3-five-images"

    );


    startCountdown(
        5,
        function () {

            hideMemoryImages();


            if (
                currentQuestion === 1
            ) {

                askLevel3Question1();

            }

            else if (
                currentQuestion === 2
            ) {

                askLevel3Question2(
                    images
                );

            }

            else {

                askLevel3Question3(
                    images
                );

            }

        }
    );

}


/* =========================================================
   LEVEL 3 QUESTION 1
   20 MARKS

   ODD ONE OUT
========================================================= */

function askLevel3Question1() {

    showQuestion(

        "Find the Odd One Out",

        [
            "Shell",
            "Ship",
            "Snowman",
            "Trees",
            "Waves"
        ],

        "Snowman"

    );

}


/* =========================================================
   LEVEL 3 QUESTION 2
   20 MARKS
========================================================= */

function askLevel3Question2(
    images
) {

    const correctAnswer =
        images[1].name;


    showQuestion(

        "Which picture was in the 2nd position?",

        [
            "Shell",
            "Ship",
            "Snowman",
            "Trees",
            "Waves"
        ],

        correctAnswer

    );

}


/* =========================================================
   LEVEL 3 QUESTION 3
   30 MARKS

   IMPORTANT:
   FIND THE POSITION

   4TH POSITION
========================================================= */

function askLevel3Question3(
    images
) {

    const correctAnswer =
        images[3].name;


    showQuestion(

        " Can you spot the number registered on the ship?",

        [
            "T563",
            "E563",
            "T248",
            "G456",
            "DW43"
        ],

        "T248"

    );

}


/* =========================================================
   SHOW IMAGES
========================================================= */

function showImages(
    images,
    instruction,
    cssClass
) {

    const memoryArea =
        document.getElementById(
            "memoryArea"
        );


    const imageContainer =
        document.getElementById(
            "imageContainer"
        );


    const instructionElement =
        document.getElementById(
            "memoryInstruction"
        );


    instructionElement.textContent =
        instruction;


    imageContainer.innerHTML = "";


    imageContainer.className =
        "image-container " +
        cssClass;


    images.forEach(
        function (imageData) {

            const img =
                document.createElement(
                    "img"
                );


            img.src =
                imageData.file;


            img.alt =
                imageData.name;


            img.className =
                "memory-image";


            img.onerror =
                function () {

                    console.error(
                        "Image not found:",
                        imageData.file
                    );

                };


            imageContainer.appendChild(
                img
            );

        }
    );


    memoryArea.classList.remove(
        "hidden"
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown(
    seconds,
    callback
) {

    clearInterval(
        countdownTimer
    );


    let count = seconds;


    const countdown =
        document.getElementById(
            "countdown"
        );


    countdown.textContent =
        count;


    countdownTimer =
        setInterval(
            function () {

                count--;


                if (count <= 0) {

                    clearInterval(
                        countdownTimer
                    );


                    countdown.textContent =
                        "";


                    callback();

                }

                else {

                    countdown.textContent =
                        count;

                }

            },
            1000
        );

}


/* =========================================================
   HIDE MEMORY IMAGES
========================================================= */

function hideMemoryImages() {

    const imageContainer =
        document.getElementById(
            "imageContainer"
        );


    const instruction =
        document.getElementById(
            "memoryInstruction"
        );


    const countdown =
        document.getElementById(
            "countdown"
        );


    imageContainer.innerHTML =
        "";


    instruction.textContent =
        "";


    countdown.textContent =
        "";

}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion(
    question,
    options,
    correctAnswer
) {

    const memoryArea =
        document.getElementById(
            "memoryArea"
        );


    const questionArea =
        document.getElementById(
            "questionArea"
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );


    const feedback =
        document.getElementById(
            "feedback"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    memoryArea.classList.add(
        "hidden"
    );


    questionArea.classList.remove(
        "hidden"
    );


    questionText.textContent =
        question;


    optionsContainer.innerHTML =
        "";


    feedback.textContent =
        "";


    feedback.className =
        "feedback";


    nextButton.classList.add(
        "hidden"
    );


    const shuffledOptions =
        shuffleArray(
            [...options]
        );


    shuffledOptions.forEach(
        function (option) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option-btn";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(

                        button,

                        option,

                        correctAnswer

                    );

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT ANSWER
========================================================= */

function selectAnswer(
    selectedButton,
    selectedAnswer,
    correctAnswer
) {

    const buttons =
        document.querySelectorAll(
            ".option-btn"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    const feedback =
        document.getElementById(
            "feedback"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    const marks =
        levelMarks[
            currentLevel
        ][
            currentQuestion - 1
        ];


    /* -----------------------------------------------------
       CORRECT
    ----------------------------------------------------- */

    if (
        selectedAnswer ===
        correctAnswer
    ) {

        selectedButton.classList.add(
            "correct"
        );


        feedback.textContent =
            "✨ You are correct! +" +
            marks +
            " Marks ✨";


        feedback.className =
            "feedback correct";


        totalScore += marks;

        levelScore += marks;


        createSparkles();

    }


    /* -----------------------------------------------------
       WRONG
    ----------------------------------------------------- */

    else {

        selectedButton.classList.add(
            "wrong"
        );


        feedback.textContent =
            "❌ Better luck next time!";


        feedback.className =
            "feedback wrong";


        buttons.forEach(
            function (button) {

                if (
                    button.textContent ===
                    correctAnswer
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );

    }


    updateScore();


    nextButton.classList.remove(
        "hidden"
    );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion > 3
    ) {

        finishLevel();

    }

    else {

        startQuestion();

    }

}


/* =========================================================
   FINISH LEVEL
========================================================= */

function finishLevel() {

    clearInterval(
        countdownTimer
    );


    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    const completionScreen =
        document.getElementById(
            "levelCompleteScreen"
        );


    gameScreen.classList.add(
        "hidden"
    );


    completionScreen.classList.remove(
        "hidden"
    );


    let maximumScore;


    if (
        currentLevel === 1
    ) {

        maximumScore = 35;

    }

    else if (
        currentLevel === 2
    ) {

        maximumScore = 35;

    }

    else {

        maximumScore = 30;

    }


    document
        .getElementById(
            "completeTitle"
        )
        .textContent =
        "LEVEL " +
        currentLevel +
        " COMPLETED!";


    document
        .getElementById(
            "levelScoreText"
        )
        .textContent =
        "Level Score: " +
        levelScore +
        " / " +
        maximumScore;


    const continueButton =
        document.getElementById(
            "continueButton"
        );


    if (
        currentLevel === 3
    ) {

        continueButton.textContent =
            "Your FINAL SCORE 🏆";

    }

    else {

        continueButton.textContent =
            "GO TO LEVEL " +
            (currentLevel + 1) +
            " ➜";

    }


    /* BIG FALLING SPARKLES */

    createCompletionSparkles();

}


/* =========================================================
   CONTINUE
========================================================= */

function continueGame() {

    document
        .getElementById(
            "levelCompleteScreen"
        )
        .classList.add(
            "hidden"
        );


    /* LEVEL 3 FINISHED */

    if (
        currentLevel === 3
    ) {

        showFinalScreen();

        return;

    }


    currentLevel++;

    currentQuestion = 1;

    levelScore = 0;


    document
        .getElementById(
            "gameScreen"
        )
        .classList.remove(
            "hidden"
        );


    startQuestion();

}


/* =========================================================
   FINAL SCREEN
========================================================= */

function showFinalScreen() {

    const finalScreen =
        document.getElementById(
            "finalScreen"
        );


    const finalScore =
        document.getElementById(
            "finalScore"
        );


    finalScore.textContent =
        totalScore +
        " / 100";


    finalScreen.classList.remove(
        "hidden"
    );


    createCompletionSparkles();

}


/* =========================================================
   RESTART
========================================================= */

function restartGame() {

    clearInterval(
        countdownTimer
    );


    document
        .getElementById(
            "finalScreen"
        )
        .classList.add(
            "hidden"
        );


    startGame();

}


/* =========================================================
   SCORE
========================================================= */

function updateScore() {

    document
        .getElementById(
            "totalScore"
        )
        .textContent =
        totalScore;

}


/* =========================================================
   LEVEL TITLE
========================================================= */

function updateLevelTitle() {

    const title =
        document.getElementById(
            "levelTitle"
        );


    title.textContent =
        "Level " +
        currentLevel;


    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    gameScreen.classList.remove(

        "level1-theme",

        "level2-theme",

        "level3-theme"

    );


    gameScreen.classList.add(

        "level" +
        currentLevel +
        "-theme"

    );

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    document
        .getElementById(
            "questionNumber"
        )
        .textContent =
        "Question " +
        currentQuestion +
        " / 3";


    document
        .getElementById(
            "progressFill"
        )
        .style.width =
        (
            currentQuestion / 3 * 100
        ) + "%";

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleArray(
    array
) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


/* =========================================================
   NORMAL SPARKLES
========================================================= */

function createSparkles() {

    const container =
        document.getElementById(
            "sparkles"
        );


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.className =
            "sparkle";


        sparkle.textContent =
            i % 3 === 0
                ? "✦"
                : i % 3 === 1
                    ? "★"
                    : "✧";


        sparkle.style.left =
            (
                Math.random() * 100
            ) + "vw";


        sparkle.style.top =
            (
                Math.random() * 90
            ) + "vh";


        sparkle.style.fontSize =
            (
                18 +
                Math.random() * 35
            ) + "px";


        sparkle.style.animationDuration =
            (
                1 +
                Math.random() * 1.5
            ) + "s";


        container.appendChild(
            sparkle
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            3000
        );

    }

}


/* =========================================================
   BIG LEVEL COMPLETION SPARKLES
   FALL FROM TOP
========================================================= */

function createCompletionSparkles() {

    const container =
        document.getElementById(
            "sparkles"
        );


    container.innerHTML = "";


    for (
        let i = 0;
        i < 180;
        i++
    ) {

        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.className =
            "completion-sparkle";


        sparkle.textContent =
            i % 4 === 0
                ? "✦"
                : i % 4 === 1
                    ? "★"
                    : i % 4 === 2
                        ? "✧"
                        : "✹";


        sparkle.style.left =
            (
                Math.random() * 100
            ) + "vw";


        sparkle.style.fontSize =
            (
                18 +
                Math.random() * 40
            ) + "px";


        sparkle.style.animationDuration =
            (
                2 +
                Math.random() * 3
            ) + "s";


        sparkle.style.animationDelay =
            (
                Math.random() * 1.5
            ) + "s";


        container.appendChild(
            sparkle
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            6500
        );

    }

}