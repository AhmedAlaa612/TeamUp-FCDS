// src/components/TeamCard.tsx
import { Team } from "../models/responses";

interface TeamCardProps {
  team: Team;
  onJoin?: (teamId: number) => void;
  onLeave?: (teamId: number) => void;
  onDelete?: (teamId: number) => void;
  disabled?: boolean;
}

const TeamCard = ({
  team,
  onJoin,
  onLeave,
  onDelete,
  disabled,
}: TeamCardProps) => {
  return (
    <div className="team-card">
      <h3>{team.name}</h3>
      <p>{team.teamDescription}</p>
      <div className="team-info">
        <p>Course: {team.course.name}</p>
        <p>
          Members: {team.users.length}/{team.size}
        </p>
      </div>
      <div className="team-members">
        {team.users.map((user) => (
          <span key={user.id} className="team-member">
            {user.firstName} {user.lastName}
          </span>
        ))}
      </div>
      <div className="team-actions">
        {onJoin && (
          <button
            onClick={() => onJoin(team.id)}
            disabled={disabled}
            className={`join-button ${disabled ? "disabled" : ""}`}
          >
            Join Team
          </button>
        )}
        {onLeave && (
          <button onClick={() => onLeave(team.id)} className="leave-button">
            Leave Team
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(team.id)} className="delete-button">
            Delete Team
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
