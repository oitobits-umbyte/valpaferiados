const holidays = {
    'may': [
        { day: 24, name: 'Dia de Nossa Senhora Auxiliadora (Padroeira)', data: '24 de maio' },
        { day: 30, name: 'Dia de Santa Joana D\'Arc (Aniversário do Município)', data: '30 de maio' }
    ],
    'august': [
        { day: 15, name: 'Dia de Assunção de Nossa Senhora', data: '15 de agosto' }
    ]
};

// Mantém a célula selecionada
let selectedCell = null;

function updateCalendars() {
	document.querySelector("#holidayInfo").textContent='';
	document.querySelector("body > p").style.display='';
    const year = parseInt(document.getElementById('yearInput').value);
    renderCalendar('may', year);
    renderCalendar('august', year);
}

function changeYear(increment) {
	document.querySelector("#holidayInfo").textContent='';
	document.querySelector("body > p").style.display='';
    const yearInput = document.getElementById('yearInput');
    yearInput.value = parseInt(yearInput.value) + increment;
    updateCalendars();
}

function renderCalendar(month, year) {
    const monthBody = document.getElementById(`${month}Body`);
    monthBody.innerHTML = ''; // Limpa o calendário anterior

    const firstDay = new Date(year, month === 'may' ? 4 : 7, 1).getDay();
    const daysInMonth = new Date(year, month === 'may' ? 5 : 8, 0).getDate();

    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('td');
        row.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
            monthBody.appendChild(row);
            row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        cell.textContent = day;

        const holiday = holidays[month].find(h => h.day === day);
        if (holiday) {
            const today = new Date();
            const holidayDate = new Date(year, month === 'may' ? 4 : 7, day);

            // Verifica se o feriado já passou
            if (holidayDate >= today) {
                cell.classList.add('highlight');
                cell.setAttribute('title', holiday.name);

                // Mostra quantos dias faltam para o feriado ao passar o mouse
                cell.onmouseover = function () {
                    const timeDiff = holidayDate - today;
                    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    cell.title = `${holiday.name} - Faltam ${daysDiff} dias`;
                };
				
				// Exibe a informação ao clicar no feriado
                cell.onclick = function () {
					document.querySelector("body > p").style.display='none';
                    const timeDiff = holidayDate - today;
                    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    document.getElementById('holidayInfo').textContent = `${holiday.data} - ${holiday.name} - Faltam ${daysDiff} dias`;
					// Remove a classe 'selected' da célula anterior, se existir
                    if (selectedCell) {
                        selectedCell.classList.remove('selected');
                    }

                    // Adiciona a classe 'selected' à célula clicada
                    cell.classList.add('selected');
                    selectedCell = cell;
                };
				
            }else{
				cell.classList.add('highlight');
                cell.setAttribute('title', holiday.name);

                // Mostra o rescpectivo feriado ao passar o mouse
                cell.onmouseover = function () {
                    const timeDiff = holidayDate - today;
                    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    cell.title = `${holiday.name}`;
                };
				
				// Exibe a informação ao clicar no feriado
                cell.onclick = function () {
					document.querySelector("body > p").style.display='none';
                    const timeDiff = holidayDate - today;
                    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    document.getElementById('holidayInfo').textContent = `${holiday.data} - ${holiday.name}`;
					// Remove a classe 'selected' da célula anterior, se existir
                    if (selectedCell) {
                        selectedCell.classList.remove('selected');
                    }

                    // Adiciona a classe 'selected' à célula clicada
                    cell.classList.add('selected');
                    selectedCell = cell;
                };
			}
        }

        row.appendChild(cell);
    }

    monthBody.appendChild(row);
}

// Inicializa os calendários
updateCalendars();