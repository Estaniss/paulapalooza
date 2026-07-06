'use client';

type Props = {
  nameList: string[];
};

export default function ExportPdfButton({ nameList }: Props) {
  function handleExport() {
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Lista de Presença – Paulapalooza</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background: #fff;
              color: #111;
              padding: 48px 56px;
            }

            header {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              margin-bottom: 36px;
              border-bottom: 2px solid #7c3aed;
              padding-bottom: 20px;
            }

            header .eyebrow {
              text-transform: uppercase;
              letter-spacing: 0.18em;
              font-size: 11px;
              color: #7c3aed;
              font-weight: 700;
            }

            header h1 {
              font-size: 26px;
              font-weight: 800;
              color: #1f003a;
            }

            header .sub {
              font-size: 13px;
              color: #666;
            }

            ol {
              padding-left: 0;
              list-style: none;
              counter-reset: list-counter;
            }

            li {
              counter-increment: list-counter;
              display: flex;
              align-items: baseline;
              gap: 14px;
              padding: 10px 0;
              border-bottom: 1px solid #ede9f6;
              font-size: 14px;
            }

            li::before {
              content: counter(list-counter);
              min-width: 28px;
              font-size: 12px;
              font-weight: 700;
              color: #7c3aed;
              text-align: right;
              flex-shrink: 0;
            }

            li .entry-name {
              flex: 1;
              font-weight: 600;
              color: #1a1a2e;
            }

            li .entry-guest {
              flex: 1;
              color: #444;
            }

            li .badge {
              font-size: 11px;
              font-weight: 600;
              color: #7c3aed;
              background: #ede9f6;
              border-radius: 999px;
              padding: 2px 9px;
              white-space: nowrap;
            }

            footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #aaa;
            }

            @media print {
              body { padding: 24px 32px; }
            }
          </style>
        </head>
        <body>
          <header>
            <span class="eyebrow">Lista de presença</span>
            <h1>🎟 Paulapalooza</h1>
            <span class="sub">Total: ${nameList.length} pessoa${nameList.length !== 1 ? 's' : ''} • Gerado em ${new Date().toLocaleString('pt-BR')}</span>
          </header>

          <ol>
            ${nameList
              .map((entry) => {
                const isGuest = entry.includes(' - (Convidado de ');
                if (isGuest) {
                  const [guestName, rest] = entry.split(' - (Convidado de ');
                  const host = rest?.replace(')', '') ?? '';
                  return `
                    <li>
                      <span class="entry-guest">${guestName}</span>
                      <span class="badge">Convidado de ${host}</span>
                    </li>`;
                }
                return `
                  <li>
                    <span class="entry-name">${entry}</span>
                  </li>`;
              })
              .join('')}
          </ol>

          <footer>
            ✦ ✦ ✦ &nbsp; Paulapalooza &nbsp; ✦ ✦ ✦
          </footer>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const popup = window.open(url, '_blank');
    if (!popup) {
      alert('Permita pop-ups para exportar o PDF.');
    }
  }

  return (
    <button
      onClick={handleExport}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 18px',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: 600,
        border: '1px solid rgba(201,166,255,0.5)',
        background: 'rgba(201,166,255,0.12)',
        color: '#e6d6ff',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.background = 'rgba(201,166,255,0.22)')
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.background = 'rgba(201,166,255,0.12)')
      }
    >
      📄 Exportar PDF
    </button>
  );
}
