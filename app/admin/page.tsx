import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Rsvp = {
  id: string;
  name: string;
  phone: string;
  will_attend: boolean;
  plus_one: boolean;
  guest_count: number;
  guest_names: string[] | null;
  message: string | null;
  created_at: string;
};

async function getRsvps(): Promise<Rsvp[]> {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filter = typeof params.filter === 'string' ? params.filter : 'all'; // all | yes | no

  const rsvps = await getRsvps();

  const confirmados = rsvps.filter((r) => r.will_attend).length;
  const recusados = rsvps.filter((r) => !r.will_attend).length;
  const totalAcompanhantes = rsvps
    .filter((r) => r.will_attend && r.plus_one)
    .reduce((sum, r) => sum + (r.guest_count || 0), 0);
  const totalPessoas = confirmados + totalAcompanhantes;

  const stats = [
    { label: 'Confirmados', value: confirmados, icon: '✅' },
    { label: 'Não vão', value: recusados, icon: '❌' },
    { label: 'Total de acompanhantes', value: totalAcompanhantes, icon: '👯' },
    { label: 'Total de pessoas', value: totalPessoas, icon: '🎉' },
  ];

  const filteredRsvps = rsvps.filter((r) => {
    if (filter === 'yes') return r.will_attend;
    if (filter === 'no') return !r.will_attend;
    return true;
  });

  // Lista simples: nome de quem vai + nomes dos acompanhantes,
  // numerada, no formato "Nome Acompanhante - (Convidado)"
  const nameList: string[] = [];
  rsvps
    .filter((r) => r.will_attend)
    .forEach((r) => {
      nameList.push(r.name);
      if (r.plus_one && r.guest_names) {
        r.guest_names
          .filter((n) => n && n.trim())
          .forEach((guestName) => {
            nameList.push(`${guestName} - (Convidado de ${r.name})`);
          });
      }
    });

  const filters = [
    { key: 'all', label: 'Todos', count: rsvps.length },
    { key: 'yes', label: 'Vão', count: confirmados },
    { key: 'no', label: 'Não vão', count: recusados },
    { key: 'lista', label: 'Lista de nomes', count: nameList.length },
  ];

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 20% 0%, #3a0a63 0%, #1f033a 45%, #15022a 100%)',
        color: '#fff',
        padding: '48px 32px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontSize: '12px',
              color: '#c9a6ff',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            Painel da festa
          </p>
          <h1
            style={{
              fontSize: '34px',
              fontWeight: 800,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            🎟 Lista de Confirmados
          </h1>
        </header>

        {/* Cards de estatísticas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '20px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filtro */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          {filters.map((f) => {
            const isActive = filter === f.key;
            return (
              <a
                key={f.key}
                href={f.key === 'all' ? '?' : `?filter=${f.key}`}
                style={{
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: isActive
                    ? '1px solid #c9a6ff'
                    : '1px solid rgba(255,255,255,0.15)',
                  background: isActive
                    ? 'rgba(201,166,255,0.18)'
                    : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#e6d6ff' : 'rgba(255,255,255,0.7)',
                }}
              >
                {f.label} ({f.count})
              </a>
            );
          })}
        </div>

        {/* Lista de nomes numerada */}
        {filter === 'lista' ? (
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                Lista de nomes
              </h2>
              <span
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}
              >
                {nameList.length} no total
              </span>
            </div>

            {nameList.length === 0 ? (
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Ninguém confirmado ainda.
              </div>
            ) : (
              <ol
                style={{
                  margin: 0,
                  padding: '8px 0',
                  listStylePosition: 'inside',
                }}
              >
                {nameList.map((entry, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: '12px 24px',
                      borderTop:
                        idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                      background:
                        idx % 2 === 0
                          ? 'transparent'
                          : 'rgba(255,255,255,0.03)',
                      fontSize: '14px',
                    }}
                  >
                    {entry}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ) : (
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                Respostas
              </h2>
              <span
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}
              >
                {filteredRsvps.length} exibidas de {rsvps.length}
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              {filteredRsvps.length === 0 ? (
                <div
                  style={{
                    padding: '48px 24px',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Nenhuma resposta encontrada para esse filtro.
                </div>
              ) : (
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px',
                  }}
                >
                  <thead>
                    <tr style={{ textAlign: 'left' }}>
                      {[
                        'Nome',
                        'Telefone',
                        'Vai?',
                        'Qtd. Acompanhantes',
                        'Nomes Acompanhantes',
                        'Mensagem',
                        'Data',
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '12px 24px',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: 'rgba(255,255,255,0.55)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRsvps.map((rsvp, i) => (
                      <tr
                        key={rsvp.id}
                        style={{
                          background:
                            i % 2 === 0
                              ? 'transparent'
                              : 'rgba(255,255,255,0.03)',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <td style={{ padding: '12px 24px', fontWeight: 600 }}>
                          {rsvp.name}
                        </td>
                        <td
                          style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}
                        >
                          {rsvp.phone}
                        </td>
                        <td
                          style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}
                        >
                          {rsvp.will_attend ? (
                            <span style={{ color: '#7CFFB2' }}>✅ Sim</span>
                          ) : (
                            <span style={{ color: '#FF8FA3' }}>❌ Não</span>
                          )}
                        </td>
                        <td
                          style={{ padding: '12px 24px', textAlign: 'center' }}
                        >
                          {rsvp.plus_one ? rsvp.guest_count : '-'}
                        </td>
                        <td style={{ padding: '12px 24px' }}>
                          {rsvp.plus_one &&
                          rsvp.guest_names &&
                          rsvp.guest_names.length > 0
                            ? rsvp.guest_names.join(', ')
                            : '-'}
                        </td>
                        <td
                          style={{
                            padding: '12px 24px',
                            maxWidth: '260px',
                            color: 'rgba(255,255,255,0.8)',
                          }}
                        >
                          {rsvp.message || '-'}
                        </td>
                        <td
                          style={{
                            padding: '12px 24px',
                            whiteSpace: 'nowrap',
                            color: 'rgba(255,255,255,0.6)',
                          }}
                        >
                          {new Date(rsvp.created_at).toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
