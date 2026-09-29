# Hosting notes

How becauseofadam.org is hosted, what to check in GitHub and at Porkbun, and what we could add later. Nothing in this file changes the site by itself.

## Where the site lives today

- **Hosting:** GitHub Pages, published by `.github/workflows/deploy.yml` every time something is merged into `main`, and every morning (so events move to "Past events" the day after they end). GitHub pauses these scheduled rebuilds if the repo goes 60 days with no commits, and emails the owner. If that happens, open Actions → Deploy site and click "Enable workflow", or just save any change in the Studio.
- **Domain:** becauseofadam.org, registered at Porkbun.
- **Studio:** Pages CMS at becauseofadam.org/studio saves straight to this repo, which triggers a new deploy.

## 1. Turn on "Enforce HTTPS"

1. GitHub → this repo → **Settings** → **Pages**.
2. Under **Custom domain**, make sure it says `becauseofadam.org` and shows a green "DNS check successful".
3. Tick **Enforce HTTPS**. If the box is grayed out, GitHub is still issuing the certificate. Wait up to an hour (sometimes 24) and try again.

After that, anyone who types `http://` is sent to `https://` automatically.

## 2. DNS records at Porkbun (apex and www)

Porkbun → **Domain Management** → becauseofadam.org → **DNS**. You should have exactly these for the website (delete Porkbun's default "parked" ALIAS or CNAME records if they're still there):

| Type | Host | Answer |
|---|---|---|
| A | *(blank, meaning becauseofadam.org)* | 185.199.108.153 |
| A | *(blank)* | 185.199.109.153 |
| A | *(blank)* | 185.199.110.153 |
| A | *(blank)* | 185.199.111.153 |
| AAAA | *(blank)* | 2606:50c0:8000::153 |
| AAAA | *(blank)* | 2606:50c0:8001::153 |
| AAAA | *(blank)* | 2606:50c0:8002::153 |
| AAAA | *(blank)* | 2606:50c0:8003::153 |
| CNAME | www | avemath.github.io |

These are GitHub's published addresses: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

With the custom domain set to `becauseofadam.org`, GitHub sends `www.becauseofadam.org` to the apex automatically.

**Verify the domain** so nobody else can claim it on GitHub: your GitHub profile → **Settings** → **Pages** → **Add a domain**. GitHub gives you a TXT record to add at Porkbun.

**The second domain.** Point it at the main site with Porkbun's **URL Forwarding** (permanent 301, to https://becauseofadam.org, "include path" on). If it will never send email, also add the "no email" records in section 5 so nobody can spoof it.

## 3. Security headers: what GitHub Pages can't do

GitHub Pages doesn't let us set custom HTTP headers (Content-Security-Policy, HSTS, and so on). It already serves everything over HTTPS once "Enforce HTTPS" is on, and it sends a basic HSTS header for github.io, but not a policy we control.

If we ever want those headers, the simplest move is **Cloudflare Pages** (free): connect this repo, build command `npm run build`, output folder `dist`, and add a `public/_headers` file like the draft below. The Studio would keep working the same way, since it only saves to GitHub.

**We are not moving hosting now.** This is just ready if we decide to.

### Draft `public/_headers` for Cloudflare Pages

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io https://cdn.usefathom.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://formspree.io https://api.web3forms.com https://plausible.io https://cdn.usefathom.com https://cloudflareinsights.com; frame-src https://www.facebook.com; form-action 'self' https://formspree.io https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests

/_img/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

Notes on the draft:

- **Before turning it on,** add the newsletter provider's form address (for example `https://buttondown.com` or your Mailchimp `list-manage.com` address) to `connect-src` and `form-action`, and remove the analytics hosts we don't use.
- `'unsafe-inline'` is needed because Astro puts a few small scripts and styles inline. It could be tightened later with hashes.
- `includeSubDomains` in HSTS means every subdomain must also support HTTPS. Leave it out if you're unsure.
- Test with https://securityheaders.com after deploying, then click through the forms, the Facebook "Show our latest posts" button and the Studio.

## 4. Things that already work on GitHub Pages

- `robots.txt` and `sitemap-index.xml` are generated on every build. `/studio`, `/404`, the print-only checklist, and Donate (until there's a donation link) stay out of the sitemap.
- The custom `404.html` page is served for any address that doesn't exist.
- Every page has `noindex, nofollow` until `launchReady` is turned on in Site settings.

## 5. Email DNS for hello@becauseofadam.org

Do this once you pick an email provider. Good fits for a small nonprofit:

- **Google Workspace for Nonprofits** (free for eligible 501(c)(3)s through Google for Nonprofits), or
- **Microsoft 365** nonprofit grants, or
- **Porkbun email forwarding** (free, forwards hello@ to a personal inbox; replying *as* hello@ needs an SMTP setup, so a real mailbox is easier).

Your provider will give you the exact values. The pattern is always the same:

1. **MX records:** where mail for @becauseofadam.org gets delivered. Add exactly what the provider lists and remove any other MX records.
2. **SPF** (one TXT record on the apex, and only one):
   - Google: `v=spf1 include:_spf.google.com ~all`
   - Microsoft 365: `v=spf1 include:spf.protection.outlook.com ~all`
   - If the newsletter or form service sends *from* @becauseofadam.org too, add its `include:` to the same record (for example `v=spf1 include:_spf.google.com include:servers.mcsv.net ~all` for Mailchimp).
3. **DKIM:** turn it on in the provider's admin (Google: Admin console → Apps → Gmail → Authenticate email). It gives you a TXT record, usually at a host like `google._domainkey`. Add it at Porkbun, then click "Start authentication" back in the provider.
4. **DMARC** (TXT record at host `_dmarc`). Start gentle, then tighten after a few weeks of clean reports:
   - Week 1: `v=DMARC1; p=none; rua=mailto:hello@becauseofadam.org`
   - Later: `v=DMARC1; p=quarantine; rua=mailto:hello@becauseofadam.org`
5. **Newsletter provider:** most (Mailchimp, Buttondown, and others) have a "verify your domain" step with their own DKIM records. Do it so newsletters don't land in spam.
6. **Check it:** send a test to https://www.mail-tester.com and aim for 9/10 or better.

**For a domain that will never send email** (like the second domain), add these so nobody can send spoofed mail from it:

| Type | Host | Answer |
|---|---|---|
| MX | *(blank)* | `.` with priority 0 (a "null MX"; skip if Porkbun won't accept it) |
| TXT | *(blank)* | `v=spf1 -all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject` |
