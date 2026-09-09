export default function Dashboard() {
  const stats = [
    { key: "postule", count: 4, label: "Postulé" },
    { key: "entretien", count: 2, label: "Entretien" },
    { key: "offre", count: 1, label: "Offre reçue" },
    { key: "refuse", count: 3, label: "Refusé" },
  ];

  const pipeline = [
    {
      key: "postule",
      name: "Postulé",
      jobs: [
        { company: "Orange Digital Center", role: "Développeur front-end", date: "Envoyé le 2 sept.", badge: "React" },
        { company: "Yas", role: "Développeur WordPress", date: "Envoyé le 4 sept.", badge: "PHP" },
      ],
    },
    {
      key: "entretien",
      name: "Entretien",
      jobs: [
        { company: "Sayna", role: "Développeur full-stack", date: "Entretien le 12 sept.", badge: "Visio" },
      ],
    },
    {
      key: "offre",
      name: "Offre",
      jobs: [
        { company: "Freelance — client agence", role: "Intégration Gutenberg", date: "Reçue le 6 sept.", badge: "À répondre" },
      ],
    },
    {
      key: "refuse",
      name: "Refusé",
      jobs: [
        { company: "Jumia", role: "Développeur front-end", date: "Réponse le 30 août", badge: "Archivé" },
      ],
    },
  ];

  return (
    <>
      <div className="head">
        <div className="text">
          <h2>Bonjour User</h2>
          <span>10 candidatures en cours de suivi cette semaine</span>
        </div>
        <button className="btn-primary">Nouvelle candidature</button>
      </div>

      <section className="stats">
        {stats.map((s) => (
          <div key={s.key} className={`stat-card ${s.key}`}>
            <div className="count">{s.count}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </section>

      <div className="pipeline">
        {pipeline.map((col) => (
          <section key={col.key} className={col.key}>
            <div className="column-header">
              <span className="stage-name">
                <span className="stage-dot"></span>
                {col.name}
              </span>
              <span className="stage-count">{col.jobs.length}</span>
            </div>
            <div className="card-list">
              {col.jobs.map((job, i) => (
                <div
                  key={i}
                  className="job-card"
                  style={{ "--stage-color": `var(--stage-${col.key})` }}
                >
                  <div className="company">{job.company}</div>
                  <div className="role">{job.role}</div>
                  <div className="meta">
                    <span className="date">{job.date}</span>
                    <span className="badge">{job.badge}</span>
                  </div>
                </div>
              ))}
              <div className="add-card">+ Ajouter une candidature</div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}