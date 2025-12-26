import { useEffect, useState } from "react";
import { useTemplateStore } from "../stores/template.store";

const Templates = () => {
  const {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    deleteTemplate,
  } = useTemplateStore();

  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTemplate({
      role,
      subject,
      body,
    });

    setRole("");
    setSubject("");
    setBody("");
  };

  return (
    <div>
      <h1>Templates</h1>

      {loading && <p>Loading templates...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Create Template
        </button>
      </form>

      <hr />

      <ul>
        {templates.map((template) => (
          <li key={template._id}>
            <p>
              <strong>Role:</strong> {template.role}
            </p>
            <p>
              <strong>Subject:</strong> {template.subject}
            </p>

            <button onClick={() => deleteTemplate(template._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Templates;
