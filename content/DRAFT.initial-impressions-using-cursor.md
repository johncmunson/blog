---
title: Initial Impressions Using Cursor
---

- It was slightly confusing what was happening, but the `cursor` shell command was actually installed appropriately and automatically in both Powershell and WSL Ubuntu.
- The integration with WSL and/or devcontainers seems a little rough around the edges.
  - There's sometimes a random error when trying to "open folder in container"
  - When using VSCode and you close out, or you "reopen folder in WSL", it automatically communicates with the Docker engine to stop the running Docker Compose containers. Cursor does not currently do this and it's a little frustrating.
- WSL + devcontainer bug
  - https://forum.cursor.com/t/cursor-parallel-agents-in-wsl-devcontainers-misresolve-worktree-paths-and-context/145711
