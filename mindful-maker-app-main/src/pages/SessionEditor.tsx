import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

interface Session {
  title: string;
  tags: string; // user types as string
  json_file_url: string;
  duration: string;
  status?: "draft" | "published";
}

const API_BASE_URL = "http://localhost:5000/api"; // ✅ correct API base

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<Session>({
    title: "",
    tags: "",
    json_file_url: "",
    duration: "",
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const token = localStorage.getItem("token");

  // ✅ Load session data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE_URL}/my-sessions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const session = res.data.session;
          setSessionData({
            title: session.title,
            tags: session.tags.join(", "), // convert array to string
            json_file_url: session.json_file_url,
            duration: session.duration || "",
          });
        })
        .catch((err) => {
          console.error("Load error:", err);
          toast.error("Failed to load session");
        });
    }
  }, [id, token]);

  // ✅ Auto-save as draft
  const autoSave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      axios
        .post(
          `${API_BASE_URL}/my-sessions/save-draft`,
          {
            ...sessionData,
            tags: sessionData.tags.split(",").map((t) => t.trim()),
            id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => toast.success("Auto-saved"))
        .catch(() => toast.error("Auto-save failed"));
    }, 5000);
  };

  // ✅ Handle field changes
  const handleChange = (field: keyof Session, value: string) => {
    setSessionData((prev) => ({ ...prev, [field]: value }));
    autoSave();
  };

  // ✅ Publish session
  const handlePublish = () => {
    axios
      .post(
        `${API_BASE_URL}/my-sessions/publish`,
        {
          ...sessionData,
          tags: sessionData.tags.split(",").map((t) => t.trim()),
          id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success("Session published");
        navigate("/my-sessions");
      })
      .catch((err) => {
        console.error("Publish error:", err);
        toast.error("Failed to publish");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Edit Session" : "Create Session"}
      </h2>
      <div className="space-y-4">
        <Input
          placeholder="Session Title"
          value={sessionData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Input
          placeholder="Tags (comma separated)"
          value={sessionData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />
        <Input
          placeholder="Duration (e.g. 10 min)"
          value={sessionData.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
        <Textarea
          placeholder="JSON File URL"
          value={sessionData.json_file_url}
          onChange={(e) => handleChange("json_file_url", e.target.value)}
        />
        <div className="flex gap-4">
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;
