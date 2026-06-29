// Sostituisce il contenuto statico della tabella con i dati da results.json
async function loadResults() {
  const res = await fetch('results.json');
  const data = await res.json();

  const main = document.querySelector('main');

  // Rimuove la sezione esistente
  main.innerHTML = '';

  const years = Object.keys(data).sort((a, b) => b - a); // ordine decrescente: 2026, 2025, 2024

  for (const year of years) {
    const events = data[year];

    const section = document.createElement('section');
    section.className = 'terminal-section';

    section.innerHTML = `
      <h2><span class="prompt">$</span> grep "${year}" ./ctf_history.csv</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>EVENT</th>
              <th>DATE</th>
              <th>CATEGORY</th>
              <th>RANK</th>
            </tr>
          </thead>
          <tbody>
            ${events.map(e => `
              <tr>
                <td>${e.event}</td>
                <td>${e.date}</td>
                <td>${e.category}</td>
                <td>${e.rank}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    main.appendChild(section);
  }
}

loadResults();
