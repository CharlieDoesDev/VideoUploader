const UPLOAD_API = "https://videobuddy.crimsonwheeler.repl.co/send-video";
const PRINT_API = "https://videobuddy.crimsonwheeler.repl.co/print-message";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const videoInput = document.getElementById("video");
  const messageInput = document.getElementById("message");
  const statusEl = document.getElementById("status");

  if (!videoInput.files.length) {
    return alert("Please select a video file.");
  }

  statusEl.textContent = "Uploading…";

  const formData = new FormData();
  formData.append("video", videoInput.files[0]);
  formData.append("message", messageInput.value.trim() || "Here is a video!");

  try {
    const res = await fetch(UPLOAD_API, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();

    if (res.ok) {
      statusEl.textContent = json.status;
    } else {
      statusEl.textContent = json.error || "Upload failed.";
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Network error.";
  }
});

document.getElementById("consoleForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const consoleInput = document.getElementById("consoleMessage");
  const statusEl = document.getElementById("consoleStatus");

  const message = consoleInput.value.trim();
  if (!message) {
    statusEl.textContent = "Please enter a message.";
    return;
  }

  statusEl.textContent = "Sending…";

  try {
    const res = await fetch(PRINT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const json = await res.json();

    if (res.ok) {
      statusEl.textContent = json.status;
      consoleInput.value = "";
    } else {
      statusEl.textContent = json.error || "Failed to send.";
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Network error.";
  }
});
