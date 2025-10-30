
import React, { useState } from "react";
import "./CourseFilters.css";
function CourseFilters() {
  const [searchTopic, setSearchTopic] = useState("");
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [levelsOpen, setLevelsOpen] = useState(true);

  const topics = [
    "Finance",
    "Science",
    "Chemistry",
    "History",
    "Literature",
    "Biology",
    "Business",
    "Mathematic",
    "Society",
    "Health And Medicine",
    "Architecture",
    "Language",
  ];

  const filteredTopics = topics.filter((t) =>
    t.toLowerCase().includes(searchTopic.toLowerCase())
  );

  return (
    <div className="filter-box">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="clear-btn">Clear all</button>
      </div>

      {/* Topics */}
      <div className="filter-section">
        <div
          className="filter-title"
          onClick={() => setTopicsOpen(!topicsOpen)}
        >
          <strong>Topics</strong>
          <span>{topicsOpen ? "▲" : "▼"}</span>
        </div>

        {topicsOpen && (
          <div className="topics-list">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              className="topic-search"
            />

            <div className="topic-items">
              {filteredTopics.map((topic) => (
                <label key={topic} className="checkbox-item">
                  <input type="checkbox" /> {topic}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Levels */}
      <div className="filter-section">
        <div
          className="filter-title"
          onClick={() => setLevelsOpen(!levelsOpen)}
        >
          <strong>Levels</strong>
          <span>{levelsOpen ? "▲" : "▼"}</span>
        </div>

        {levelsOpen && (
          <div className="levels-list">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="checkbox-item">
                <input type="checkbox" /> {level}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseFilters;
