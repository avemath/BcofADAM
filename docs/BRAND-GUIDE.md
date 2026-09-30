# Our brand guide

How we keep the website, social posts, flyers and Water Watcher cards looking and sounding like one organization. We'll update it once we have a real logo.

## Name
- **Full:** Because of ADAM: Allies in the Drowning Awareness Movement (the name we chose when we started it in 2020)
- **Short:** Because of ADAM (always capitalize **ADAM** when it refers to the movement; "Adam" when it's him)
- **Community:** Adam's Village / Adam's Village of Hope
- **Hashtags (already used on Facebook):** #BecauseofADAM (primary) · #AdamsVillage · #AdamRocks · #inHisTime · #smallmiracles

## Tagline options
- *Drowning is silent. We won't be.* (home page headline)
- *Learn from our past. Protect your future.* (our own hashtag, on the About page; the 2021 banner says "their future")
- *We will end childhood drowning.* (our banner)
- *Join the movement. Become an Ally!* (our banner; on Get Involved)
- *Providing awareness to end childhood drowning.* (our 2021 flyer)
- *Skills before thrills.*
- *It only takes a second.* (Mom and Dad's words)
- *No single layer is enough.*
- *Check the water first.*

## Colors
Defined at the top of [`src/styles/global.css`](../src/styles/global.css). Change them there and the whole site updates.

| Name | Hex | Use |
|---|---|---|
| Abyss | `#041d2b` | Footer, darkest sections |
| Deep | `#083349` | Dark sections, headings on light |
| Ocean | `#0b5470` | Links, buttons on light backgrounds |
| Aqua | `#1aa6b7` | Accents, eyebrows, stat underlines |
| Shallow | `#bfe7ea` | Soft highlights on dark |
| Foam | `#eef8f8` | Light alternating sections |
| Sand | `#fbf6ee` | Page background |
| **Sun** | `#ffb703` | **Hope & action.** Main buttons, key words, Water Watcher |
| Coral | `#e85d4f` | Alerts only (sparingly) |

**Contrast:** dark text on Sun, and white on Deep/Abyss/Ocean, pass WCAG AA. Avoid white text on Aqua or Sun.

## Type
- **Headlines:** Fraunces (a warm serif; italics for emotional emphasis, e.g. *is silent.*)
- **Body:** Figtree (friendly, highly readable sans-serif)
- Both are free Google Fonts and work in Canva.

## Photos
- Real over stock. Warm, natural light; Adam and family as they really are.
- Show **safe behavior** in any water photo: an adult within arm's reach, life jackets on open water, a fence and gate visible. Never publish photos of unsupervised children near water, even as a "don't."
- Always get written permission for any child who isn't yours ([release template](PHOTO-AND-STORY-RELEASE.md)).
- Don't pair a child's full name with their school or neighborhood.

## Voice
Warm, honest, urgent, never blaming. See [CONTENT-PLAN.md §4](CONTENT-PLAN.md#4-voice-and-words) for the words to use and avoid.

### How we sound (from Mom's Facebook posts, 2017–2026)

Mom has written to "Adam's village" on Facebook since the week Adam drowned. Those 113 posts are the truest picture of our voice. When you write for the site, read a few first.

- **Who's talking.** Most pages are us, Adam's brother and sisters ("we," "our mom," "our dad"). When we use Mom's or Dad's words, we quote them and say whose they are.
- **Lead with love.** Adam before June 5: tickled with Dad's beard at bath time, playing in a tent with Lea, curls and a grin. Adam now: music, Barney, Spider-Man and Mickey, Lea's singing, and the smile that took 15 months to come back. Show the whole family: Mom the advocate (and now his nurse), Dad the steady one, Lea his best friend, the big kids who carried the house.
- **Honest, then hopeful.** Mom never pretends it's easy ("It's not always easy, but it will be worth it"), and she always turns toward hope: fireflies lighting Adam's tree, the heart-shaped scan, "In His time." Faith is part of our story; share it in our own sections, and keep the practical pages open to every family.
- **Fierce and practical.** Her water safety posts are direct, and they end with something to do: "Layer up. There are no do-overs." "Skills before thrills." "Hold your non-swimmer." "Decide today to make layers of protection a priority."
- **Never blame.** "For every tragic story you read, there are family members in horrendous pain blaming themselves. When you hear these stories, pause and find kindness."
- **Grateful.** To the village, the nurses, the first responders, our hometown. "We're the village."

**Phrases that are ours:** Learn from our past. Protect your future. · Layer up. · Skills before thrills. · There are no do-overs. · Drowning is silent. · Check the water first. · It only takes a second. · We're the village. · Adam's Army · In His time · Wear blue on June 5.

**Our symbols:** blue (June 5), fireflies (Adam's village), Mom's painting of a child on a swing under the moon, painted rocks (#AdamRocks), and the heart-shaped scan in our logo.

**Lessons from our own backyard** (fine to share as our experience; any number still needs a source):
- We didn't have a fence between the house and the pool. "A four-sided pool fence with a self-closing gate would have saved him."
- We had door alarms, but they stopped sounding when a door was mostly closed but not all the way shut.
- ISR self-rescue lessons weren't available near us, and Adam was too young to swim.
- Floaties and Puddle Jumpers can teach false confidence; hold your non-swimmer, or pick a splash pad.

**What stays off the site:** Adam's medical updates and hospital stays, fundraising for his own care and its payment links, Dad's swim lesson business, and other families' children's stories unless they've said yes in writing.

## Logo
Our mark is a **top-down view of a brain with a heart inside it**, in teal, purple, magenta and orange (September 2026). In September 2017, a SPECT scan of Adam's brain showed the part hurt by the lack of oxygen as a dark area, and it was shaped like a perfect heart. Mom wrote, *"Rather than devastation, I was flooded with immense hope."* To us, it's about finding hope in hopeless places. The story is on the About page and in Adam's Story. ("Because of Adam, I know so much about the brain," as Lea says.)

**This is the redrawn version** (September 28, 2026). The first draft had a stem running down from the heart and folds and lobes meeting at the bottom center, which could be misread, so the back of the brain is now one smooth, rounded shape with the folds out on the sides. If it's ever redrawn again, keep the heart as the clear focus and avoid shapes that meet or split at the bottom center.

| File | Use |
|---|---|
| `public/images/logo-mark-large.png` | Full-size mark on a transparent background, for flyers, shirts and social posts |
| `public/images/logo-mark.png` | The small mark next to "Because of ADAM" in the site header and footer ([`Logo.astro`](../src/components/Logo.astro)) |
| `public/favicon.ico`, `icon-192.png`, `icon-512.png` | Browser tab and bookmark icons |
| `public/apple-touch-icon.png` | iPhone home-screen icon (on our sand background) |
| `public/images/share-card.png` | The picture Facebook and texts show when someone shares our link (1200×630) |

- The mark works on light and dark backgrounds. Don't stretch it, recolor it, or put it on a busy photo.
- Always leave a little space around it, about the width of the teal ring.
- For print or embroidery, ask a designer for an **SVG** (vector) version traced from `logo-mark-large.png`, plus a one-color version. If someone else designed it, get a written OK for the organization to use it.
