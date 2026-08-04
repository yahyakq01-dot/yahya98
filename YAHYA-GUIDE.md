# 👋 Your Portfolio — Owner's Guide

Hi Yahya! This is your personal portfolio website **and** a private control panel
that lets you change almost everything on it yourself — no coding, no waiting for
a developer. This guide walks you through it in plain language.

Keep this page handy (you can print it: **Ctrl/Cmd + P**).

---

## 🧭 The two halves of your site

| | Web address | Who sees it |
|---|---|---|
| **Public portfolio** | `your-site.com` | Everyone — clients, recruiters, Fiverr buyers |
| **Admin panel** (private) | `your-site.com/admin` | Only you, after signing in with Google |

Anything you change in the admin appears on the public site **within about a
minute** (usually sooner).

---

## 🔑 Signing in

1. Go to **`your-site.com/login`** (bookmark this!).
2. Click **“Continue with Google.”**
3. Choose your Google account (`yahyaqureshi012@gmail.com`).
4. You land on your admin dashboard. Done.

> **Only your email can get in.** If anyone else tries to sign in with a
> different Google account, they’re politely turned away. If *you* ever see
> “Access Denied,” see **Troubleshooting** at the bottom.

To sign out, click **“Sign out”** in the sidebar.

---

## 🏠 The admin dashboard

After logging in you’ll see:

- A **“Welcome back”** header.
- **Counts** of your dashboards, testimonials, services, etc.
- **Quick actions** (Add a dashboard, Add a testimonial, Update hero, Edit profile).
- A left **sidebar** with every section you can edit.
- A **“Force Refresh”** button in the top bar — press it if you want your latest
  change to show on the public site *immediately* instead of waiting a minute.

---

## ✏️ What you can edit (sidebar sections)

Each section works the same way, so once you learn one you know them all.

| Section | What it controls |
|---|---|
| **Hero** | The big headline, the “Available for projects” pill, and the sub-text at the top of the page |
| **Profile** | Your name, role, bio, photo, CV file, Fiverr/GitHub links, “open to work” badge |
| **Dashboards** | Your Power BI project cards |
| **Code Projects** | Your SQL & Python project cards (with the code snippet shown in the “code window”) |
| **Services** | The numbered service cards |
| **Testimonials** | Client reviews (the star stats above them update automatically) |
| **Stats** | The “11+ Projects / 10 Dashboards / 5.0 Rating …” numbers |
| **Worked With** | The scrolling row of companies/tools |
| **Capabilities** | The little pills above the Dashboards and the SQL & Python sections |
| **Site Settings** | Your site name, the “YK” monogram, and footer text |
| **Contact** | Email, WhatsApp, Fiverr, response time, location |
| **Social** | The footer’s LinkedIn / GitHub / Fiverr / Instagram links |

---

## 🧱 How editing works (the pattern)

**Single things** (Hero, Profile, Site Settings, Contact) are one form:
fill in the boxes → **Save**. That’s it.

**Lists** (Dashboards, Testimonials, Services, etc.) work like this:

1. The section shows your existing items.
2. Click **“Add …”** (top-right) to create a new one, or click an item to edit it.
3. Fill in the form.
4. Click **Create** (or **Save**). A little green message confirms it.
5. To remove an item, open it and click **Delete** — you’ll be asked to confirm.

> **“Display order”** decides the order items appear in (smaller numbers first).
> When you add a new item, the form already suggests the next number for you, so
> new items land at the end. Change it if you want to move something up.

---

## 🖼️ Uploading a photo, screenshot, or CV

Any field with a dashed **“Click or drag to upload”** box:

1. Click it (or drag a file onto it).
2. Pick your file. Images should be **PNG / JPG / WEBP**; the CV should be a **PDF**.
3. Keep files **under 5 MB**. Wait for the preview to appear — that means it saved.
4. Click **Save** on the form.

To swap a file, click **Remove**, then upload the new one.

---

## ⭐ Common things you’ll want to do

**Add a new Power BI dashboard**
Dashboards → **Add Dashboard** → fill in a short *slug* (e.g. `retention-cohort`),
title, category, upload a screenshot, write 2–3 sentences, add tools, paste your
Power BI “Publish to web” link, toggle **Featured** if you want the badge → **Create**.

**Add a testimonial after a new Fiverr review**
Testimonials → **Add Testimonial** → name, initials, country + flag emoji, pick the
star rating, paste the quote → **Create**. (The “5-Star Reviews”, “Avg Rating” and
“Repeat Clients” numbers above your testimonials recalculate automatically.)

**Update your stats as you grow**
Stats → click the stat → change e.g. `11+` to `15+` → **Save**.

**Change your headline**
Hero → edit the three headline lines → **Save**. (A “.” at the end of the last line
gets the purple accent automatically.)

**Update your WhatsApp number** *(important — see below)*
Contact → put your real number in **WhatsApp number** in international format
(digits and a leading `+`, e.g. `+923001234567`) → **Save**.

**Replace your profile photo or CV**
Profile → upload a new photo / new CV PDF → **Save**.

---

## 📌 Please replace these placeholders

The site shipped with a few stand-in values. Update them once and you’re set:

- **WhatsApp number** (Contact) — currently a placeholder `+92 333 123 4567`.
  Until you set a real one, the WhatsApp option is simply hidden — no broken link.
- **LinkedIn URL** (Social) — double-check it points to your real profile.
- **Instagram URL** (Social) — double-check or remove it.
- **GitHub** is already correct (`github.com/yahya-kq`).

---

## 🆘 Troubleshooting

**“Access Denied” when I try to log in**
Your Google account’s email must be on the site’s allow-list. The site is set up
for `yahyaqureshi012@gmail.com`. If you use a different Google account, or the
allow-list is empty, ask your developer to run the one-line database step in the
`README.md` (“Bootstrapping the first admin”).

**I saved a change but don’t see it on the public site**
Give it up to a minute, then refresh. To see it instantly, press **“Force
Refresh”** in the admin top bar, then reload the public page.

**A dashboard image is broken / not loading**
Re-upload the screenshot in the Dashboards form (drag a fresh PNG into the upload
box) and Save. Very large images (over 5 MB) are rejected — shrink them first.

**The intro animation only shows once**
That’s on purpose — the loading intro plays once per browsing session so repeat
visitors aren’t slowed down. Open the site in a private/incognito window to see it
again.

**I’m stuck**
Take a screenshot and send it to your developer. Nothing you do in the forms can
break the site — the worst case is an edit you can simply change back.

---

## 🔒 A note on safety

- Only you (your Google account) can reach the admin.
- Deleting always asks for confirmation.
- Every change is just data — you can always edit it back. There’s no way to
  “break” the website from these forms.

Enjoy your portfolio! 🎉
