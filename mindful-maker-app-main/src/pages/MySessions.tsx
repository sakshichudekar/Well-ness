import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = "http://localhost:5000";

export default function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [autoSaveMessage, setAutoSaveMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<number>(0);

  const fetchSession = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/my-sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const session = res.data.session; // ✅ Corrected access
      setTitle(session.title);
      setTags(session.tags.join(", "));
      setJsonUrl(session.json_file_url);
    } catch (err) {
      toast({ title: "Failed to load session", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (id) fetchSession();
  }, [id]);

  const saveDraft = async () => {
    try {
      const payload = {
        id: id || undefined, // ✅ Corrected key
        title,
        tags: tags.split(",").map((t) => t.trim()),
        json_file_url: jsonUrl,
      };
      await axios.post(`${API_BASE_URL}/my-sessions/save-draft`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLastSaved(Date.now());
      setAutoSaveMessage("Draft auto-saved");
    } catch (err) {
      toast({ title: "Draft save failed", variant: "destructive" });
    }
  };

  const publishSession = async () => {
    try {
      const payload = {
        id: id || undefined, // ✅ Corrected key
        title,
        tags: tags.split(",").map((t) => t.trim()),
        json_file_url: jsonUrl,
      };
      await axios.post(`${API_BASE_URL}/my-sessions/publish`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Session published!" });
      navigate("/my-sessions");
    } catch (err) {
      toast({ title: "Publish failed", variant: "destructive" });
    }
  };

  const debounceSave = useCallback(() => {
    const now = Date.now();
    if (now - lastSaved > 5000) {
      saveDraft();
    }
  }, [title, tags, jsonUrl]);

  useEffect(() => {
    const handler = setTimeout(() => {
      debounceSave();
    }, 5000);

    return () => clearTimeout(handler);
  }, [title, tags, jsonUrl]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Session" : "Create Session"}
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter session title"
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. yoga, meditation"
          />
        </div>

        <div>
          <Label htmlFor="jsonUrl">JSON File URL</Label>
          <Input
            id="jsonUrl"
            value={jsonUrl}
            onChange={(e) => setJsonUrl(e.target.value)}
            placeholder="https://example.com/session.json"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={saveDraft}>
            Save as Draft
          </Button>
          <Button onClick={publishSession}>Publish</Button>
        </div>

        {autoSaveMessage && (
          <p className="text-sm text-green-600 mt-2">{autoSaveMessage}</p>
        )}
      </div>
    </div>
  );
}
