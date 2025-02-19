let playerName = '';
const questions = {
    addition: [
        { question: "5 + 3", answers: [8, 7, 6, 9], correct: 0 },
        { question: "10 + 7", answers: [16, 17, 18, 19], correct: 1 },
        { question: "1 + 1", answers: [3, 2, 4, 5], correct: 1 },
        { question: "3 + 3", answers: [6, 7, 8, 9], correct: 0 },
        { question: "6 + 4", answers: [11, 12, 10, 13], correct: 2 },
        { question: "2 + 9", answers: [11, 12, 13, 10], correct: 0 },
        { question: "7 + 8", answers: [16, 15, 17, 14], correct: 1 },
        { question: "12 + 7", answers: [19, 20, 18, 21], correct: 0 },
        { question: "6 + 6", answers: [12, 11, 13, 10], correct: 0 },
        { question: "4 + 2", answers: [6, 7, 5, 4], correct: 0 },
    ],
    subtraction: [
        { question: "8 - 3", answers: [5, 6, 7, 4], correct: 0 },
        { question: "15 - 7", answers: [8, 9, 7, 10], correct: 0 },
        { question: "10 - 4", answers: [5, 6, 7, 4], correct: 1 },
        { question: "6 - 2", answers: [4, 3, 5, 6], correct: 0 },
        { question: "14 - 5", answers: [9, 10, 8, 7], correct: 0 },
        { question: "9 - 4", answers: [5, 6, 7, 4], correct: 0 },
        { question: "20 - 10", answers: [10, 9, 8, 7], correct: 0 },
        { question: "12 - 3", answers: [9, 10, 8, 7], correct: 0 },
        { question: "18 - 9", answers: [9, 8, 7, 6], correct: 0 },
        { question: "5 - 2", answers: [3, 4, 5, 2], correct: 0 },
    ],
    multiplication: [
        { question: "2 x 3", answers: [6, 5, 7, 8], correct: 0 },
        { question: "4 x 4", answers: [16, 15, 17, 18], correct: 0 },
        { question: "3 x 5", answers: [15, 14, 13, 12], correct: 0 },
        { question: "6 x 2", answers: [12, 11, 13, 10], correct: 0 },
        { question: "7 x 4", answers: [28, 29, 30, 27], correct: 0 },
        { question: "5 x 3", answers: [15, 16, 17, 18], correct: 0 },
        { question: "9 x 2", answers: [18, 19, 20, 21], correct: 0 },
        { question: "8 x 3", answers: [24, 23, 25, 22], correct: 0 },
        { question: "6 x 5", answers: [30, 31, 29, 28], correct: 0 },
        { question: "4 x 6", answers: [24, 23, 25, 26], correct: 0 },
    ],
    division: [
        { question: "12 ÷ 4", answers: [3, 2, 4, 5], correct: 0 },
        { question: "20 ÷ 5", answers: [5, 6, 4, 3], correct: 2 },
        { question: "10 ÷ 2", answers: [5, 6, 4, 7], correct: 0 },
        { question: "15 ÷ 3", answers: [5, 4, 3, 6], correct: 0 },
        { question: "18 ÷ 6", answers: [3, 4, 5, 6], correct: 0 },
        { question: "24 ÷ 6", answers: [4, 5, 3, 2], correct: 0 },
        { question: "30 ÷ 5", answers: [6, 5, 7, 4], correct: 0 },
        { question: "16 ÷ 4", answers: [4, 5, 3, 6], correct: 0 },
        { question: "8 ÷ 2", answers: [4, 3, 2, 5], correct: 0 },
        { question: "9 ÷ 3", answers: [3, 4, 5, 6], correct: 0 },
    ]
};

let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;

// Embaralhar as respostas
function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
}

// Iniciar o jogo com o nome do jogador
function startGameWithName() {
    playerName = document.getElementById('player-name').value.trim();
    if (playerName && /^[a-zA-Z0-9 ]+$/.test(playerName)) {
        switchScreen('video-screen');
    } else {
        alert('Por favor, digite um nome válido (apenas letras e números).');
    }
}

// Mostrar a tela de definição da operação escolhida
function startGame(operation) {
    currentCategory = operation;
    let operationName = '';
    let definition = '';

    switch (operation) {
        case 'addition':
            operationName = 'Definição de Adição';
            definition = 'A adição é a operação matemática que representa a soma de dois números.';
            break;
        case 'subtraction':
            operationName = 'Definição de Subtração';
            definition = 'A subtração é a operação matemática que representa a diferença entre dois números.';
            break;
        case 'multiplication':
            operationName = 'Definição de Multiplicação';
            definition = 'A multiplicação é a operação matemática que representa a soma repetida de um número.';
            break;
        case 'division':
            operationName = 'Definição de Divisão';
            definition = 'A divisão é a operação matemática que representa a partição de um número em partes iguais.';
            break;
    }

    document.getElementById('operation-definition').textContent = `${operationName}: ${definition}`;
    switchScreen('operation-explanation-screen');
}

// Iniciar o jogo após a explicação
function startGameAfterExplanation() {
    showQuestion();
    switchScreen('game-screen');
}

// Mostrar uma nova pergunta
function showQuestion() {
    const question = questions[currentCategory][currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const answers = [...question.answers];
    shuffleAnswers(answers);

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';  // Limpa respostas anteriores
    answers.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer');
        button.onclick = () => checkAnswer(answer, question.correct);
        answersContainer.appendChild(button);
    });
}

// Verificar a resposta
function checkAnswer(answer, correctAnswerIndex) {
    if (answer === questions[currentCategory][currentQuestionIndex].answers[correctAnswerIndex]) {
        score++;
        document.getElementById('correct-sound').play();
    } else {
        document.getElementById('wrong-sound').play();
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentCategory].length) {
        showQuestion();
    } else {
        endGame();
    }
}

// Finalizar o jogo
function endGame() {
    fetch('http://localhost:3000/pontuacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jogador: playerName,
            pontos: score
        })
    })
        .then(response => response.json())
        .then(data => {
            showResult(data);
        })
        .catch(error => {
            console.error("Erro ao salvar pontuação:", error);
        });
}

function showResult(data) {
    let congratsMessage = ''
    const resultTable = document.getElementById('result-table');

    // Remove a tabela de pontuações antigas (se houver)
    const oldTable = document.getElementById('scoreboard');
    if (oldTable) {
        oldTable.remove();
    }

    // Criar nova tabela de pontuações
    const scoresTable = document.createElement('table');
    scoresTable.id = 'scoreboard';
    scoresTable.innerHTML = `
        <tr>
            <th>Total de Perguntas</th>
            <th>Acertos</th>
        </tr>
    `;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${questions[currentCategory].length}</td>
        <td>${data.pontos}</td>
    `;
    scoresTable.appendChild(row);

    if (data.pontos >= 9) {
        congratsMessage = `Arrrr! Parabéns, ${data.jogador}! Você conquistou o tesouro!`;
    } else if (data.pontos >= 5) {
        congratsMessage = `Bom trabalho, ${data.jogador}! Você está no caminho certo, mas precisa melhorar para conquistar o tesouro!`;
    } else {
        congratsMessage = `Ai, ai, ${data.jogador}. Precisa estudar mais! Não desista!`;
    }

    document.getElementById('final-message').textContent = `Você acertou ${data.pontos} de ${questions[currentCategory].length} perguntas!`;
    document.getElementById('congratulations-message').textContent = congratsMessage;

    // Adiciona a tabela de pontuação abaixo da existente
    resultTable.appendChild(scoresTable);

    switchScreen('end-screen');
}

// Alternar entre as telas
function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    document.getElementById(screenId).classList.add('active');
}

// Voltar à tela inicial
function backToStart() {
    currentQuestionIndex = 0;
    score = 0;
    switchScreen('start-screen');
}

// Controlar a música
function toggleMusic() {
    const music = document.getElementById('music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

window.onload = function () {
    const music = document.getElementById('music');
    if (music) {
        music.pause()
    }
}