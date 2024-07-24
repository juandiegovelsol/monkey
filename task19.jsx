import React, { useState, useEffect } from "react";

// Placeholder for project images (replace with actual image URLs)
const placeholderImage = "https://via.placeholder.com/300x200";

const App = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project 1",
      description: "This is project 1",
      image: placeholderImage,
    },
    {
      id: 2,
      title: "Project 2",
      description: "This is project 2",
      image: placeholderImage,
    },
    {
      id: 3,
      title: "Project 3",
      description: "This is project 3",
      image: placeholderImage,
    },
    // Add more initial projects here
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  const handleProjectClick = (project) => {
    console.log("Clicked project:", project);
  };

  const [showForm, setShowForm] = useState(false);

  const handleAddProject = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (newProject) => {
    // Add the new project to the projects array
    setProjects([...projects, { ...newProject, id: Date.now() }]); // Assign a unique ID
    setShowForm(false);
  };

  return (
    <div>
      <Carousel
        projects={projects}
        activeIndex={activeIndex}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        goToIndex={goToIndex}
        handleProjectClick={handleProjectClick}
        handleAddProject={handleAddProject}
        showForm={showForm}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

const Carousel = ({
  projects,
  activeIndex,
  goToPrevious,
  goToNext,
  goToIndex,
  handleProjectClick,
  handleAddProject,
  showForm,
  handleFormSubmit,
}) => {
  const [project, setProject] = useState(projects[activeIndex]);

  useEffect(() => {
    setProject(projects[activeIndex]);
    console.log(project);
  }, [activeIndex]);

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        <div className="carousel-track">
          <div className="carousel-slide">
            <div
              className="carousel-item"
              onClick={() => handleProjectClick(project)}
            >
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <button onClick={goToPrevious}>&lt;</button>
        {projects.map((_, index) => (
          <button
            key={index}
            className={activeIndex === index ? "active" : ""}
            style={{ height: 10, width: 10, margin: 10, borderRadius: 50 }}
            onClick={() => goToIndex(index)}
          ></button>
        ))}
        <button onClick={goToNext}>&gt;</button>
      </div>

      <button className="add-project-button" onClick={handleAddProject}>
        Add Project
      </button>

      {showForm && <ProjectForm onSubmit={handleFormSubmit} />}
    </div>
  );
};

const ProjectForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description, image: placeholderImage }); // Use placeholder image
    setTitle("");
    setDescription("");
  };

  return (
    <div className="project-form">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default App;
