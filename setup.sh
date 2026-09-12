#!/usr/bin/env bash

set -Eeuo pipefail

: <<'NEUP_DOCUMENTATION'
::neup.documentation::setup-script

Synchronizes the shared Neup repositories into the expected `.neup` folders.

Run `npm run setup` to update only repositories whose local HEAD is not the
latest commit on GitHub's `main` branch. Run `npm run setup -- force` (or
`npm run setup force`) to replace all three folders with fresh shallow clones.

::end
NEUP_DOCUMENTATION

readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly NEUP_DIR="$SCRIPT_DIR/.neup"
readonly BASE_FILE="$SCRIPT_DIR/base.json"
readonly ENV_FILE="$SCRIPT_DIR/.env"

update_env_from_base() {
  local app_id
  local app_basepath
  local logo_main
  local favicon
  local value
  local key

  if [[ ! -f "$BASE_FILE" ]]; then
    printf 'Cannot update .env: %s was not found.\n' "$BASE_FILE" >&2
    return 1
  fi

  mkdir -p -- "$(dirname -- "$ENV_FILE")"
  touch "$ENV_FILE"

  if ! IFS=$'\x1f' read -r app_id app_basepath logo_main favicon < <(node -e '
    const fs = require("fs");
    const base = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const value = (item) => item == null ? "" : String(item);
    process.stdout.write([
      value(base.identity?.applicationId),
      value(base.platforms?.web?.basepath),
      value(base.assets?.logo?.main),
      value(base.assets?.favicon?.path ?? base.assets?.favicon),
    ].join("\x1f"));
  ' "$BASE_FILE"); then
    printf 'Unable to read application values from %s.\n' "$BASE_FILE" >&2
    return 1
  fi

  for key in NEUP_APP_ID NEUP_APP_SECRET NEXT_PUBLIC_APP_BASEPATH APP_ASSETS_LOGO_MAIN APP_ASSETS_FAVICON; do
    if grep -qE "^[[:space:]]*${key}[[:space:]]*=" "$ENV_FILE"; then
      continue
    fi

    case "$key" in
      NEUP_APP_ID) value="$app_id" ;;
      NEUP_APP_SECRET) value="" ;;
      NEXT_PUBLIC_APP_BASEPATH) value="$app_basepath" ;;
      APP_ASSETS_LOGO_MAIN) value="$logo_main" ;;
      APP_ASSETS_FAVICON) value="$favicon" ;;
    esac

    printf '%s=%q\n' "$key" "$value" >> "$ENV_FILE"
    printf 'Added %s to .env.\n' "$key"
  done
}

clone_repository() {
  local repository_url="$1"
  local target_directory="$2"

  rm -rf -- "$target_directory"
  git clone --depth 1 --single-branch --branch main "$repository_url" "$target_directory"
}

sync_repository() {
  local repository_url="$1"
  local target_directory="$2"
  local repository_name="$3"
  local remote_commit
  local local_commit

  remote_commit="$(git ls-remote "$repository_url" refs/heads/main | cut -f1)"
  if [[ -z "$remote_commit" ]]; then
    printf 'Unable to find the main branch for %s.\n' "$repository_url" >&2
    return 1
  fi

  if [[ -e "$target_directory/.git" ]]; then
    local_commit="$(git -C "$target_directory" rev-parse HEAD 2>/dev/null || true)"
    if [[ "$local_commit" == "$remote_commit" ]]; then
      printf '%s is already up to date (%s).\n' "$repository_name" "${local_commit:0:12}"
      return 0
    fi

    printf '%s is out of date; replacing it with the latest main commit.\n' "$repository_name"
  elif [[ -e "$target_directory" ]]; then
    printf '%s is not a Git checkout; replacing it.\n' "$target_directory"
  else
    printf 'Cloning %s.\n' "$repository_name"
  fi

  clone_repository "$repository_url" "$target_directory"
}

force_sync=false
for argument in "$@"; do
  if [[ "$argument" == "force" ]]; then
    force_sync=true
    break
  fi
done

mkdir -p -- "$NEUP_DIR"

update_env_from_base

repositories=(
  "https://github.com/neupgroup/neup.core|$NEUP_DIR/core|neup.core"
  "https://github.com/neupgroup/neup.logica|$NEUP_DIR/logica|neup.logica"
  "https://github.com/neupgroup/neup.react.components|$NEUP_DIR/components|neup.react.components"
)

for repository in "${repositories[@]}"; do
  IFS='|' read -r repository_url target_directory repository_name <<< "$repository"

  if [[ "$force_sync" == true ]]; then
    printf 'Force syncing %s.\n' "$repository_name"
    clone_repository "$repository_url" "$target_directory"
  else
    sync_repository "$repository_url" "$target_directory" "$repository_name"
  fi
done

if [[ -x "$NEUP_DIR/logica/setup.sh" ]]; then
  "$NEUP_DIR/logica/setup.sh"
else
  printf 'Logica setup script was not found or is not executable.\n' >&2
  exit 1
fi
