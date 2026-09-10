import { useState } from "react";

export default function Profil() {
  // Informations personnelles
  const [lastName, setLastName] = useState("Doe");
  const [firstName, setFirstName] = useState("User");

  // Compte Gmail lié (utilisé pour la recherche d'offres via API)
  const [gmailAccount, setGmailAccount] = useState(""); // vide = non connecté

  // Postes recherchés (tags)
  const [jobTitles, setJobTitles] = useState([
    "Développeur front-end",
    "Développeur WordPress",
  ]);
  const [jobTitleInput, setJobTitleInput] = useState("");

  // Termes de recherche pour l'API (mots-clés, technologies, localisation...)
  const [searchTerms, setSearchTerms] = useState([
    "React",
    "Remote",
    "Madagascar",
  ]);
  const [searchTermInput, setSearchTermInput] = useState("");

  // Mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Ajoute un tag à une liste (postes ou termes de recherche) si non vide et non déjà présent
  const addTag = (value, list, setList, setInput) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput("");
  };

  // Retire un tag de la liste par son index
  const removeTag = (index, list, setList) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Ajoute le tag quand l'utilisateur appuie sur Entrée
  const handleTagKeyDown = (e, value, list, setList, setInput) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(value, list, setList, setInput);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // TODO: appel API PUT /api/users/me avec { lastName, firstName, jobTitles, searchTerms }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    // TODO: appel API PUT /api/users/me/password avec { currentPassword, newPassword }
  };

  const handleConnectGmail = () => {
    // TODO: déclencher le flow OAuth Google, puis setGmailAccount(email retourné)
  };

  return (
    <>
      <div className="head">
        <div className="text">
          <h2>Profil</h2>
          <span>Gère tes informations et tes préférences de recherche</span>
        </div>
      </div>

      <div className="profile-grid">
        {/* Informations personnelles */}
        <form className="profile-card" onSubmit={handleSaveProfile}>
          <h3>Informations personnelles</h3>

          <div className="form-row">
            <label>
              Prénom
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Nom
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <label>
            Postes recherchés
            <div className="tag-input">
              {jobTitles.map((title, i) => (
                <span key={title} className="tag">
                  {title}
                  <button
                    type="button"
                    onClick={() => removeTag(i, jobTitles, setJobTitles)}
                    aria-label={`Retirer ${title}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={jobTitleInput}
                onChange={(e) => setJobTitleInput(e.target.value)}
                onKeyDown={(e) =>
                  handleTagKeyDown(
                    e,
                    jobTitleInput,
                    jobTitles,
                    setJobTitles,
                    setJobTitleInput,
                  )
                }
                placeholder="Ajouter un poste et appuyer sur Entrée"
              />
            </div>
          </label>

          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
        </form>

        {/* Recherche d'emploi automatisée */}
        <div className="profile-card">
          <h3>Recherche d'offres</h3>
          <p className="card-hint">
            Ces termes sont utilisés pour interroger les API des sites d'emploi
            et te proposer des offres correspondantes.
          </p>

          <label>
            Termes de recherche
            <div className="tag-input">
              {searchTerms.map((term, i) => (
                <span key={term} className="tag">
                  {term}
                  <button
                    type="button"
                    onClick={() => removeTag(i, searchTerms, setSearchTerms)}
                    aria-label={`Retirer ${term}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={searchTermInput}
                onChange={(e) => setSearchTermInput(e.target.value)}
                onKeyDown={(e) =>
                  handleTagKeyDown(
                    e,
                    searchTermInput,
                    searchTerms,
                    setSearchTerms,
                    setSearchTermInput,
                  )
                }
                placeholder="Mot-clé, techno, ville... puis Entrée"
              />
            </div>
          </label>

          <div className="gmail-connect">
            <div>
              <strong>Compte Gmail</strong>
              <p className="card-hint">
                {gmailAccount ? gmailAccount : "Aucun compte connecté"}
              </p>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleConnectGmail}
            >
              {gmailAccount ? "Changer de compte" : "Connecter Gmail"}
            </button>
          </div>
        </div>

        {/* Sécurité */}
        <form className="profile-card" onSubmit={handleChangePassword}>
          <h3>Sécurité</h3>

          <label>
            Mot de passe actuel
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Nouveau mot de passe
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirmer
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>

          <button type="submit" className="btn-primary">
            Changer le mot de passe
          </button>
        </form>
      </div>
    </>
  );
}