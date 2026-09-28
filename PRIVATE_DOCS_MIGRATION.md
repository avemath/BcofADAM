# Moving `docs/` out of this public repo

This repo is public, and `docs/` holds private family planning material: the launch checklist (IRS, tax and money notes), story notes, questions for Mom and Dad, the research notes, the brand guide, the Studio guide and the photo release template. Anyone can read them today, and they stay in the git history even after they're deleted.

This guide moves them to a private repo and then removes them from this repo's history. **Nothing here has been done yet.** Do it after the `audit-fixes` pull request is merged, because rewriting history changes every commit ID and would break an open pull request.

## Step 1: Copy `docs/` into a new private repo (keeps its history)

1. On GitHub, create a new **private** repo, for example `avemath/BcofADAM-private`. Leave it empty (no README).
2. On your computer:

   ```bash
   # A throwaway copy just for the private repo
   git clone https://github.com/avemath/BcofADAM.git bcofadam-private
   cd bcofadam-private

   # Install git-filter-repo once: https://github.com/newren/git-filter-repo#how-do-i-install-it
   # (on a Mac: brew install git-filter-repo; with Python: pip install git-filter-repo)

   # Keep only docs/ and its history
   git filter-repo --path docs/

   git remote add origin https://github.com/avemath/BcofADAM-private.git
   git push -u origin main
   ```

3. Open the private repo on GitHub and confirm all eight files are there.

## Step 2: Remove `docs/` from this repo's history

1. Make sure nobody (including the Studio) is saving changes while you do this, and that the `audit-fixes` pull request is merged or closed.
2. Start from a **fresh clone** (git-filter-repo refuses to run on a working copy with other remotes or changes):

   ```bash
   git clone https://github.com/avemath/BcofADAM.git bcofadam-clean
   cd bcofadam-clean

   # Remove docs/ from every commit
   git filter-repo --path docs/ --invert-paths

   # Optional: also rewrite commit messages that mention private details (list below)
   # Put one replacement per line in a file, e.g. messages.txt:
   #   prayersforadam PayPal==>personal fundraising link
   #   bcofADAM@gmail.com==>old email address
   #   SPECT scan==>brain scan
   # then run:
   # git filter-repo --replace-message messages.txt

   git remote add origin https://github.com/avemath/BcofADAM.git
   git push --force --all origin
   git push --force --tags origin
   ```

3. In the new private repo, keep a copy of `README.md`'s "Our planning docs" table, and in this repo remove that table from `README.md` (it links into `docs/`).

## What will break, and what to check afterward

- **Every commit ID changes.** Anyone with a local copy must re-clone (don't pull into an old copy, or the old history comes back).
- **README links to `docs/`** will 404 until you remove or repoint them (step 2.3). The Studio guide lives in `docs/`, so share its new private link with the family.
- **`src/data/layers.ts`** has a code comment pointing to `docs/RESEARCH.md`. It's only a comment; update it to point to the private repo.
- **The website itself does not use `docs/`.** The build, the Studio (`.pages.yml`) and the deploy workflow don't read anything in it. After the force push, check that the "Deploy site" action runs green and becauseofadam.org still loads.
- **Old copies are still cached on GitHub.** Closed pull requests (#1 and #2) and anyone who already knows an old commit link can still see the old files. Ask GitHub Support to remove cached views and pull request references: https://support.github.com/request (choose "Remove sensitive data"). GitHub's guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- **Forks:** check the repo's Insights → Forks page. Forks keep their own copy of the old history.
- **Photos:** family photos in `public/images/uploads/` are public on purpose because they're on the website. Anything uploaded there but never used on a page is still public; delete unused uploads in the Studio.

## Commit messages that mention private details

These messages would stay visible even after `docs/` is removed, unless you also rewrite them with `--replace-message`:

| Commit | Message | Mentions |
|---|---|---|
| `c34f2d7` | Add the 2021 Community Days cornhole tournament | the prayersforadam PayPal, a CPA question, Dad's business sponsoring events |
| `c6a99fb` | Add the 2020 cornhole details, our 2021 booth, and where photos go | the prayersforadam PayPal, "ISR scholarships", a CPA question |
| `d2dfb8c` | Domains bought; plan hello@becauseofadam.org instead of a new Gmail | the old bcofADAM@gmail.com address |
| `6fdc99e` | Safer logo for now, and the story behind the heart | Adam's 2017 SPECT scan |
| `6d392af`, `35bedcc` | Finish ISR finder and events; note IRS status | IRS status notes |
| `4c1f2e5`, `c3df060`, `ebfc191`, `e84b88b`, `328d157`, `f12e0c6` | Various | point to the private launch checklist or story notes (no private details in the message itself) |

Studio commits named after photo files (for example "Add picu.jpg", "Add mom.jpg") only name files that are already public on the website.
