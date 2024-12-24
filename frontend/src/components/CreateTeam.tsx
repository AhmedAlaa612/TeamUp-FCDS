// src/components/CreateTeam.tsx
import { useEffect, useState } from "react";
import { Course, TeamCreationData } from "../models/responses";
import { createTeam, getCourses } from "../services/Teams";

interface CreateTeamModalProps {
  onClose: () => void;
  onTeamCreated: () => void;
}

const CreateTeamModal = ({ onClose, onTeamCreated }: CreateTeamModalProps) => {
  const [teamData, setTeamData] = useState<TeamCreationData>({
    name: "",
    size: 1,
    teamDescription: "",
    courseId: 1,
  });
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (response.status != "success")
          throw new Error("Failed to fetch courses");
        setCourses(() => response.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
    console.log("courses : ", courses);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createTeam(teamData);
      if (response.message !== "success") {
        throw new Error("Failed to create team");
      }
      onTeamCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Team</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>
            <input
              type="text"
              value={teamData.name}
              onChange={(e) =>
                setTeamData({ ...teamData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Team Size</label>
            <input
              type="number"
              min="1"
              value={teamData.size}
              onChange={(e) =>
                setTeamData({ ...teamData, size: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={teamData.teamDescription}
              onChange={(e) =>
                setTeamData({ ...teamData, teamDescription: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <select
              value={teamData.courseId}
              onChange={(e) =>
                setTeamData({ ...teamData, courseId: parseInt(e.target.value) })
              }
              required
            >
              <option value="" hidden>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create Team</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
