/* -------------------- new JS template below -------------------- */
let ceeLoGame = {
    version: '1.0',
    author: 'Al Augustin',
    project: 'Cee-Lo web dice game',
    Date: '2021',

    // INITIALIZATION --------------------
    init: function () {
        let context = this;

        // GLOBAL VARIABLES --------------------
        context.config = {
            // let
            playerArray: document.querySelectorAll(".playerHolder"),
            scoreBoardArray: document.querySelectorAll(".playerScoreBoard"),
            rollButtonArray: document.querySelectorAll(".rollButton"),
            win: false,
            diceSides: 6,
            resetButtonPress: 0,
            rollCode: '',
            rollPoint: '',
            array456: '',
            array456sort: '',
            array456string: '',
            array123: '',
            array123sort: '',
            array123string: '',
            highScores: [],

            // const
            startButton: document.getElementById("startButton"),
            resetButton: document.getElementById("resetButton"),
            playerCount: document.getElementById("playerCount"),
        };

        // CALL DOM INVOKING FUNCTIONS HERE --------------------
        context.onDomReady();
        console.log(ceeLoGame.config);

    },

    onDomReady: () => {
        // -------------------- PLAYER --------------------
        let howManyPlayers = ceeLoGame.config.playerArray.length;
        playerCount.innerHTML = howManyPlayers;

        scoreBoard.innerHTML = "Please press start";

    },

    // -------------------- PRINT DICE NUMBERS --------------------
    printDice: (a, b, c) => {
        document.getElementById("die1").innerHTML = a;
        document.getElementById("die2").innerHTML = b;
        document.getElementById("die3").innerHTML = c;

    },

    // -------------------- START GAME --------------------
    startGame: () => {
        scoreBoard.innerHTML = "Player 1 roll";
        ceeLoGame.initCLgame();
        console.log("Start button pressed.");

    },

    // -------------------- RESET GAME --------------------
    resetGame: () => {
        win = false;
        ceeLoGame.config.resetButtonPress;
        scoreBoard.innerHTML = "Please roll";
        document.getElementById("showData").innerHTML = "";
        window.location.href = window.location.href;
        ceeLoGame.disableButtons();
        localStorage.clear();
        console.log("Reset button pressed. Reset game win to " + win);

    },

    // -------------------- INIT GAME --------------------
    initCLgame: () => {
        for (let i = 0; i < ceeLoGame.config.rollButtonArray.length; i++) {
            ceeLoGame.config.rollButtonArray[0].disabled = false;
            ceeLoGame.config.rollButtonArray[i].disabled = true;

        }

        console.log("init game");
        console.log("* ---------- *");

    },

    // -------------------- RESET DICE NUMBERS --------------------
    resetDie: () => {
        document.getElementById("die1").innerHTML = 4;
        document.getElementById("die2").innerHTML = 5;
        document.getElementById("die3").innerHTML = 6;

    },

    // -------------------- GAME --------------------
    disableButtons: () => {
        for (let i = 0; i < ceeLoGame.config.rollButtonArray.length; i++) {
            ceeLoGame.config.rollButtonArray[i].disabled = true;

        }
    },

    // -------------------- GENERATE RANDOM NUMBER --------------------
    randNum: () => {
        let sides = 6,
            a = Math.floor(Math.random() * sides) + 1,
            b = Math.floor(Math.random() * sides) + 1,
            c = Math.floor(Math.random() * sides) + 1;

        ceeLoGame.printDice(a, b, c);
        ceeLoGame.ceeLo(a, b, c);

    },

    // -------------------- WIN/LOSS --------------------
    winConditon: () => {
        ceeLoGame.config.win = true;
        ceeLoGame.disableButtons();

    },

    lossConditon: () => {
        ceeLoGame.config.win = false;
        ceeLoGame.disableButtons();

    },

    // -------------------- CeeLo DICE ROLLS --------------------
    ceeLo: (a, b, c) => {
        // 4 5 6 CONDITION --------------------
        let fourFiveSix = () => {
            let array456 = [a, b, c],
                array456sort = array456.sort(),
                array456string = array456sort.toString();
            rollCode = 4;
            rollPoint = 3;

            if (array456string === "4,5,6") {
                rollCode;
                scoreBoard.innerHTML = "You win";
                // ceeLoGame.determineRollType(rollPoint);

            } else {
                trips();

            }
        }

        // TRIPS CONDITION --------------------
        let trips = () => {
            rollCode = 3;

            if (a === b && b === c) {
                rollCode;
                rollPoint = a;
                scoreBoard.innerHTML = "Trips - " + a + b + c;
                // ceeLoGame.determineRollType(rollPoint);

            } else {
                point();

            }
        }

        // POINT CONDITION --------------------
        let point = () => {
            rollCode = 2;

            if (a === b) {
                scoreBoard.innerHTML = "Points - " + c;
                rollPoint = c;
                rollCode;
                // ceeLoGame.determineRollType(rollPoint);

            } else if (a === c) {
                scoreBoard.innerHTML = "Points - " + b;
                rollPoint = b;
                rollCode;
                // ceeLoGame.determineRollType(rollPoint);

            } else if (b === c) {
                scoreBoard.innerHTML = "Points - " + a;
                rollPoint = a;
                rollCode;
                // ceeLoGame.determineRollType(rollPoint);

            } else {
                oneTwoThree();

            }
        }

        // 1 2 3 CONDITION --------------------
        let oneTwoThree = () => {
            let array123 = [a, b, c],
                array123sort = array123.sort(),
                array123string = array123sort.toString();
            rollCode = 1;
            rollPoint = 0;

            if (array123string === "1,2,3") {
                rollCode;
                scoreBoard.innerHTML = "You loose";
                // ceeLoGame.determineRollType(rollPoint);

            } else {
                rollCode = 0;
                scoreBoard.innerHTML = "Roll again.";

            }
        }
        fourFiveSix();

    },

    // -------------------- PLAYER SCORE--------------------
    storePlayerScore: (playerNumber) => {
        let populateLScore = () => {
            ceeLoGame.config.highScores.push({ "player": playerNumber, "roll_code": rollCode, "roll_point": rollPoint });
            localStorage.setItem("highscores", JSON.stringify(ceeLoGame.config.highScores));
            ceeLoGame.playerScoreTable();

        };

        if (rollCode == 4 || rollCode == 3 || rollCode == 2 || rollCode == 1) {
            populateLScore();
            ceeLoGame.advancePlayer();

        }
    },

    playerScoreTable: () => {
        // the json data.
        const playerScoreData = JSON.parse(localStorage.getItem("highscores"));

        // Extract value from table header.
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        let col = [];
        for (let i = 0; i < playerScoreData.length; i++) {
            for (let key in playerScoreData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // Create a table.
        const table = document.createElement("table");
        // Create table header row using the extracted headers above.
        let tr = table.insertRow(-1); // table row.

        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th"); // table header.
            th.innerHTML = col[i];
            tr.appendChild(th);

        }

        // add json data to the table as rows.
        for (let i = 0; i < playerScoreData.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = playerScoreData[i][col[j]];
            }
        }

        // Now, add the newly created table with json data, to a container.
        const divShowData = document.getElementById('showData');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);

    },

    advancePlayer: () => {
        // TODO: MAKE THIS SUPPORT MORE THAN TWO PLAYERS
        for (let i = 0; i < ceeLoGame.config.rollButtonArray.length; i++) {

            if (ceeLoGame.config.rollButtonArray[i].disabled) {
                ceeLoGame.config.rollButtonArray[0].disabled = true;
                ceeLoGame.config.rollButtonArray[i].disabled = false;

            } else {
                ceeLoGame.config.rollButtonArray[0].disabled = false;
                ceeLoGame.config.rollButtonArray[i].disabled = true;

            }
        }
    },

    // -------------------- ROLL DICE --------------------
    rollDice: () => {

        let buttonPressCount = ceeLoGame.config.resetButtonPress;

        for (let i = 0; i < ceeLoGame.config.rollButtonArray.length; i++) {
            const playerRoll = ceeLoGame.config.rollButtonArray[i];

            playerRoll.addEventListener("click", () => {
                ceeLoGame.randNum();
                playerScoreBoard();
                determineRollType();

            });

            let playerScoreBoard = () => {
                let players = [i],
                    playerNumber = players[0] + 1;
                // ceeLoGame.config.rollButtonArray[i].previousElementSibling.innerHTML = "Player " + playerNumber + " score goes here. Win is = " + ceeLoGame.config.win;
                ceeLoGame.storePlayerScore(playerNumber);

            };

            // -------------------- DETERMINE ROLL TYPE --------------------
            let determineRollType = () => {
                switch (rollCode) {
                    case 4:
                        rollType = "4 5 6";
                        ceeLoGame.winConditon();
                        console.log(rollType + " | roll code is " + rollCode + ' and roll point is ' + rollPoint);
                        console.log("* ---------- *");

                        break;
                    case 3:
                        rollType = "Trips";
                        countButtonPress();
                        console.log(rollType + " | roll code is " + rollCode + ' and roll point is ' + rollPoint);
                        console.log("* ---------- *");

                        break;
                    case 2:
                        rollType = "Roll Point";
                        countButtonPress();
                        console.log(rollType + " | roll code is " + rollCode + ' and roll point is ' + rollPoint);
                        console.log("* ---------- *");

                        break;
                    case 1:
                        rollType = "1 2 3";
                        ceeLoGame.lossConditon();
                        console.log(rollType + " | roll code is " + rollCode + ' and roll point is ' + rollPoint);
                        console.log("* ---------- *");

                        break;
                    default:
                        rollType = "No dice";
                        console.log(rollType + " | roll code is " + rollCode + ' and roll point is ' + rollPoint);
                        console.log("* ---------- *");

                }
            };

            let countButtonPress = () => {
                buttonPressCount++;
                if (buttonPressCount == ceeLoGame.config.rollButtonArray.length) {
                    ceeLoGame.disableButtons();
                    console.log("roll code is " + rollCode + ' and roll point is ' + rollPoint);
                    console.log(JSON.parse(localStorage.getItem("highscores")));
                    console.log("* ---------- *");

                } else {
                    console.log("roll code is " + rollCode + ' and roll point is ' + rollPoint);
                    console.log("* ---------- *");

                }
            };
        }
    },

    // HANDLE ALL PAGE LEVEL EVENTS --------------------
    eventHandlers: () => {

        resetButton.addEventListener("click", () => {
            ceeLoGame.resetGame();
            ceeLoGame.resetDie();

        });

        startButton.addEventListener("click", () => {
            ceeLoGame.startGame();

        });
    },
};

window.addEventListener("load", () => {
    ceeLoGame.init();
    ceeLoGame.printDice();
    ceeLoGame.resetDie();
    ceeLoGame.rollDice();
    ceeLoGame.eventHandlers();
    ceeLoGame.disableButtons();
});
