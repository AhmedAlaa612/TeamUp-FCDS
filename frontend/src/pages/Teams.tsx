import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { Team } from "../models/responses";
import TeamCard from "../components/TeamCard";
import CreateTeamModal from "../components/CreateTeam";
import "../../assets/styles/Team.css";
import {
  deleteTeam,
  getOtherTeams,
  getUserTeams,
  joinTeam,
  leaveTeam,
} from "../services/Teams";

const Teams = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [availableTeams, setAvailableTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeams();
  }, [userId]);

  const fetchTeams = async () => {
    try {
      if (!userId) {
        setError("User ID not found");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      setLoading(true);
      setError(null); // Clear any previous errors

      try {
        const [myTeamsResponse, availableTeamsResponse] = await Promise.all([
          getUserTeams(userId),
          getOtherTeams(userId),
        ]);

        if (myTeamsResponse?.teams) {
          setMyTeams(myTeamsResponse.teams);
        }
        if (availableTeamsResponse?.teams) {
          setAvailableTeams(availableTeamsResponse.teams);
        }
      } catch (err) {
        console.error("API call failed:", err);
        setError("Failed to fetch teams. Please try again.");
      }
    } catch (err) {
      console.error("fetchTeams error:", err);
      setError("An error occurred while loading teams");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (teamId: number) => {
    try {
      await joinTeam(teamId, userId!);
      await fetchTeams();
    } catch (err) {
      setError("Failed to join team");
    }
  };

  const handleLeaveTeam = async (teamId: number) => {
    try {
      await leaveTeam(teamId, userId!);
      await fetchTeams();
    } catch (err) {
      setError("Failed to leave team");
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    const team = myTeams.find((t) => t.id === teamId);
    if (!team) return;

    if (team.users.length > 1) {
      setError("Cannot delete team with other members");
      return;
    }

    try {
      await deleteTeam(teamId);
      await fetchTeams();
    } catch (err) {
      setError("Failed to delete team");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h1>Teams</h1>
        <button onClick={() => setShowCreateModal(true)}>Create Team</button>
      </div>

      <div className="teams-grid">
        <div className="teams-section">
          <h2>My Teams</h2>
          <div className="my-teams-grid">
            {myTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onLeave={team.users.length === 1 ? undefined : handleLeaveTeam}
                onDelete={
                  team.users.length === 1 ? handleDeleteTeam : undefined
                }
              />
            ))}
          </div>
        </div>

        <div className="teams-divider"></div>

        <div className="teams-section">
          <h2>Available Teams</h2>
          <div className="available-teams-grid">
            {availableTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onJoin={handleJoinTeam}
                disabled={team.users.length >= team.size}
              />
            ))}
          </div>

          {showCreateModal && (
            <CreateTeamModal
              onClose={() => setShowCreateModal(false)}
              onTeamCreated={fetchTeams}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
