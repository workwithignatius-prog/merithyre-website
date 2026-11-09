#!/usr/bin/env bash
# Publish a static preview of the site to the gh-pages branch (served by GitHub Pages).
#
#   npm run deploy:pages
#
# Builds with GITHUB_PAGES=true (static export under /merithyre-website/, noindex,
# no redirects), then force-pushes the output as the only commit on gh-pages.
# gh-pages holds build output only, so overwriting it each time is expected.
set -euo pipefail
cd "$(dirname "$0")/.."

remote_url="$(git remote get-url origin)"
source_sha="$(git rev-parse --short HEAD)"
source_branch="$(git rev-parse --abbrev-ref HEAD)"

rm -rf out
GITHUB_PAGES=true npx next build
touch out/.nojekyll # serve the _next/ folder as-is (skip Jekyll processing)

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
cp -R out/. "$tmp"
git -C "$tmp" init -q -b gh-pages
git -C "$tmp" add -A
git -C "$tmp" commit -q -m "Preview build of ${source_branch}@${source_sha}" ${DEPLOY_COMMIT_TRAILER:+-m "$DEPLOY_COMMIT_TRAILER"}
git -C "$tmp" push -q -f "$remote_url" gh-pages

echo "Published ${source_branch}@${source_sha} to gh-pages."
echo "Preview: https://workwithignatius-prog.github.io/merithyre-website/"
