import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Données des candidatures
const applications = [
  { company: "Orange Digital Center", status: "applied", date: "2026-09-02" },
  { company: "Yas", status: "applied", date: "2026-09-04" },
  { company: "Sayna", status: "interview", date: "2026-08-28" },
  { company: "Freelance — client agence", status: "offer", date: "2026-08-30" },
  { company: "Jumia", status: "rejected", date: "2026-08-20" },
];

// Libellés affichés pour chaque statut
const STATUS_LABELS = {
  applied: "Postulé",
  interview: "Entretien",
  offer: "Offre",
  rejected: "Refusé",
};

// Couleurs associées à chaque statut
const STATUS_COLORS = {
  applied: "#7fa7d1",
  interview: "#d19f5f",
  offer: "#6fbf8b",
  rejected: "#a17878",
};

export default function Statistics() {
  const total = applications.length;

  // Compte le nombre de candidatures par statut
  const counts = applications.reduce((acc, application) => {
    acc[application.status] = (acc[application.status] || 0) + 1;
    return acc;
  }, {});

  console.log(counts);
  // Taux de réponse : part des candidatures ayant reçu une suite (entretien, offre ou refus)
  const responded =
    (counts.interview || 0) + (counts.offer || 0) + (counts.rejected || 0);
  const responseRate = total ? Math.round((responded / total) * 100) : 0;
  console.log("reponse :" ,responded)
  console.log("taux de réponse: " ,responseRate)
  // Taux de conversion : part des entretiens ayant débouché sur une offre
  const interviews = counts.interview || 0;
  const offers = counts.offer || 0;
  const conversionRate =
    interviews + offers > 0
      ? Math.round((offers / (interviews + offers)) * 100)
      : 0;

  // Prépare les données du graphique en courbe : nombre cumulé de candidatures dans le temps
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const lineData = sortedApplications.map((application, index) => ({
    date: application.date.slice(5),
    applications: index + 1,
  }));

  // Prépare les données du donut : répartition des candidatures par statut
  const pieData = Object.keys(STATUS_LABELS).map((status) => ({
    name: STATUS_LABELS[status],
    value: counts[status] || 0,
    status,
  }));

  return (
    <>
      <div className="head">
        <div className="text">
          <h2>Statistiques</h2>
          <span>Vue d'ensemble de ta recherche d'emploi</span>
        </div>
      </div>

      {/* Chiffres clés */}
      <section className="stats">
        <div className="stat-card">
          <div className="count">{responseRate}%</div>
          <div className="label">Taux de réponse</div>
        </div>
        <div className="stat-card entretien">
          <div className="count">{conversionRate}%</div>
          <div className="label">Conversion entretien → offre</div>
        </div>
        <div className="stat-card">
          <div className="count">{total}</div>
          <div className="label">Candidatures au total</div>
        </div>
      </section>

      <div className="charts-row">
        {/* Graphique en courbe : évolution du nombre de candidatures */}
        <div className="chart-card">
          <h3>Évolution des candidatures</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "var(--text)",
                }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ r: 3, fill: "var(--accent)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut : répartition des candidatures par statut */}
        <div className="chart-card">
          <h3>Répartition par statut</h3>
          <div className="donut-wrap">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "var(--text)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Légende manuelle du donut, avec pastille de couleur par statut */}
            <ul className="donut-legend">
              {pieData.map((entry) => (
                <li key={entry.status}>
                  <span
                    className="dot"
                    style={{ background: STATUS_COLORS[entry.status] }}
                  />
                  {entry.name} ({entry.value})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
