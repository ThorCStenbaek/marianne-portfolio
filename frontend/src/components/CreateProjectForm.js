import React, { useState, useEffect } from 'react';
import "./CreateProjectForm.css";
import { Software } from './mini/Software';







function MarianneAuth({isMarianneAuth}) {
  const [password, setPassword] = useState("");
  const [isMarianne, setIsMarianne] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch("/isMarianne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.answer) {
        setIsMarianne(true);
        isMarianneAuth(true)
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="text-red-500">{error}</p>}
      {isMarianne && <p className="text-green-500">You are Marianne!</p>}
    </div>
  );
}



function CreateProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [primaryImage, setPrimaryImage] = useState(null);
  const [link, setLink] = useState('');
  const [categoryNames, setCategoryNames] = useState([]);
  const [technologyNames, setTechnologyNames] = useState([]);
  const [projectMeta, setProjectMeta] = useState([]);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);

  const [marianneAuth, isMarianneAuth] =useState(false)


  // Fetch categories and technologies from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/categories');
      const data = await res.json();
      setAvailableCategories(data);
    };

    const fetchTechnologies = async () => {
      const res = await fetch('/technologies');
      const data = await res.json();
      setAvailableTechnologies(data);
    };

    fetchCategories();
    fetchTechnologies();
  }, []);

  // Handle toggling categories
  const handleCategoryToggle = (categoryName) => {
    setCategoryNames((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Handle toggling technologies
  const handleTechnologyToggle = (technologyName) => {
    setTechnologyNames((prev) =>
      prev.includes(technologyName)
        ? prev.filter((tech) => tech !== technologyName)
        : [...prev, technologyName]
    );
  };

  const handlePrimaryImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      // Remove spaces from the file name
      const newFileName = file.name.replace(/\s+/g, '_');
      file = new File([file], newFileName, { type: file.type });
  
      setPrimaryImage(file);
    }
  };
  
  const handleMetaFileChange = (e, type) => {
    let file = e.target.files[0];
    if (file) {
      // Remove spaces from the file name
      const newFileName = file.name.replace(/\s+/g, '_');
      file = new File([file], newFileName, { type: file.type });
  
      setProjectMeta((prevMeta) => [
        ...prevMeta,
        { type, url: URL.createObjectURL(file), file },
      ]);
    }
  };
  

  const addNewMetaInput = (type) => {
    return (
      <div key={Math.random()} className="create-project__meta-input">
        <label className="create-project__meta-label">Project Meta ({type === 'IMAGE' ? 'Image' : 'Video'}):</label>
        <input  name="projectMeta"  className="create-project__file-input" type="file" accept={type === 'IMAGE' ? 'image/*' : 'video/*'} onChange={(e) => handleMetaFileChange(e, type)} />
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    
    // Append the primary image file
    if (primaryImage) {
      formData.append('primaryImage', primaryImage);
    }
  
    // Append categories and technologies
    categoryNames.forEach((category) => {
      formData.append('categoryNames', category);
    });
  
    technologyNames.forEach((tech) => {
      formData.append('technologyNames', tech);
    });
  
    // Append each meta file along with its type
    projectMeta.forEach((meta, index) => {
      formData.append('projectMeta', meta.file); // Using the same key for each file
      formData.append(`projectMetaType[${index}]`, meta.type); // Appending metadata separately
    });
  
    try {
      const response = await fetch('/projects', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Project created successfully');
        // Optionally, reset the form or redirect the user
      } else {
        const errorData = await response.json();
        console.error('Failed to create project:', errorData.error);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  
  if (!marianneAuth)
    return(
    <MarianneAuth isMarianneAuth={isMarianneAuth} />)


  return (
    <form onSubmit={handleSubmit} className="create-project__form" encType="multipart/form-data">
      <div className="create-project__form-group">
        <label className="create-project__label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="create-project__input"
        />
      </div>

      <div className="create-project__form-group">
        <label className="create-project__label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="create-project__textarea"
        ></textarea>
      </div>

      <div className="create-project__form-group">
        <label className="create-project__label">Primary Image:</label>
        <input name="primaryImage"  className="create-project__file-input" type="file" accept="image/*" onChange={handlePrimaryImageChange} required />
      </div>

      <div className="create-project__form-group">
        <label className="create-project__label">Link:</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="create-project__input"
        />
      </div>

      <div className="create-project__form-group">
        <label className="create-project__label">Categories:</label>
        <div className="create-project__toggle-list">
          {availableCategories.map((category) => (
            <div style={{ background: categoryNames.includes(category.name) ? 'green' : '' }}
              key={category.id}
              className={`create-project__toggle-item ${categoryNames.includes(category.name) ? 'selected' : ''}`}
              onClick={() => handleCategoryToggle(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div className="create-project__form-group">
        <label className="create-project__label">Technologies:</label>
        <div className="softwares-section">
          {availableTechnologies.map((technology) => (
            <Software key={technology.id} isSelected={technologyNames.includes(technology.name)} onClick={() => handleTechnologyToggle(technology.name)} tech={technology} />
          ))}
        </div>
      </div>

      <h4 className="create-project__meta-header">Project Meta (Images/Videos)</h4>
      {projectMeta.map((meta, index) => (
        <div key={index} className="create-project__meta-preview">
          <label className="create-project__meta-label">{meta.type === 'IMAGE' ? 'Image' : 'Video'} Preview:</label>
          {meta.type === 'IMAGE' ? (
            <img src={meta.url} alt="Preview" className="create-project__image-preview" />
          ) : (
            <video src={meta.url} className="create-project__video-preview" controls />
          )}
        </div>
      ))}

      {/* Add new meta inputs dynamically */}
      {addNewMetaInput('IMAGE')}
      {addNewMetaInput('VIDEO')}

      <button type="submit" className="create-project__submit-button">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
