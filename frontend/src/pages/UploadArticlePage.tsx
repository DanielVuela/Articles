import { useMemo, useState } from "react";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";

type ApiResponse = {
  id?: number | string;
  message?: string;
  errors?: string[];
};

function safePretty(obj: unknown) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return "";
  }
}

export default function UploadArticlePage() {
  const [jsonText, setJsonText] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isSending, setIsSending] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

  const parsed = useMemo(() => {
    setError("");
    setPreview("");
    setResult(null);

    const trimmed = jsonText.trim();
    if (!trimmed) return null;

    try {
      const obj = JSON.parse(trimmed);
      setPreview(safePretty(obj));
      return obj;
    } catch {
      setError("Invalid JSON. Fix the syntax and try again.");
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonText]);

  async function handleSend() {
    setError("");
    setResult(null);

    if (!parsed) {
      setError("Please provide a valid JSON before sending.");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch(`${baseUrl}/source-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const contentType = res.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) {
        setError(payload?.message ?? "Request failed.");
        setResult(payload);
        return;
      }

      setResult(payload);
    } catch {
      setError("Network error. Is the backend running and CORS enabled?");
    } finally {
      setIsSending(false);
    }
  }

  async function handleFilePick(file: File) {
    setError("");
    setResult(null);

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please choose a .json file.");
      return;
    }

    const text = await file.text();
    setJsonText(text);
  }

  function loadSample() {
    const sample = {
      schemaVersion: "v1",
      source: { id: "demo", name: "Demo Source", url: "https://example.com" },
      normalized: {
        id: "n-001",
        title: "Hello",
        url: "https://example.com/article",
      },
      raw: { format: "html", data: { original: "<html>...</html>" } },
    };
    setJsonText(JSON.stringify(sample));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* <h1 className="text-xl font-semibold">Upload Article</h1> */}
            <Title>Upload Article</Title>
            <p className="mt-1 text-sm text-slate-300">
              Paste JSON or upload a .json file, then send it to the API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={loadSample} variant="secondary">
              Load sample
            </Button>

            <label className="cursor-pointer rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-700">
              Upload .json
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleFilePick(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            <Button
              disabled={!parsed || isSending}
              onClick={handleSend}
              variant="primary"
            >
              {isSending ? "Sending..." : "Send to API"}
            </Button>
{/*         <button
              type="button"
              onClick={handleSend}
              disabled={!parsed || isSending}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send to API"}
            </button>*/}

          </div>
        </div> 

        <div className="mt-3 text-xs text-slate-400">
          Endpoint:{" "}
          <code className="rounded bg-slate-800 px-2 py-1">
            {baseUrl}/source-items
          </code>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
          <span className="font-semibold text-red-300">Error:</span>{" "}
          <span className="text-red-200">{error}</span>
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4 text-sm">
          <div className="font-semibold text-sky-200">Response</div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-200">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Input JSON
          </h2>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={20}
            placeholder="Paste JSON here..."
            className="w-full resize-y rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-100 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
          />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">Preview</h2>
          <pre className="h-11/12 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-100">
            {preview || "Preview will appear here once JSON is valid."}
          </pre>
        </section>
      </div>
    </div>
  );
}
