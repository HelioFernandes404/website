# Extract Profile Data to JSON Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract hardcoded `profileData` from `ProfileCard.tsx` to a separate `profile.json` file that can be imported as a module.

**Architecture:** Create a data layer separate from the UI component. The `ProfileCard.tsx` will import profile data from `src/data/profile.json`, enabling easy customization without modifying React code. Icons will be mapped from string names after import since JSON cannot directly store function references.

**Tech Stack:** React 18, TypeScript, JSON, Lucide React icons

---

## Task 1: Create profile data type definitions

**Files:**
- Create: `src/types/profile.ts`

**Step 1: Write the TypeScript types file**

```typescript
import { LucideIcon } from "lucide-react";

export interface ProfileLink {
  id: number;
  label: string;
  url: string;
  iconName: string; // Icon name as string, will be resolved to component
  primary?: boolean;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  image: string;
  links: ProfileLink[];
}
```

**Step 2: Verify the file was created**

Run: `ls -la src/types/profile.ts`
Expected: File exists

---

## Task 2: Create profile.json with data

**Files:**
- Create: `src/data/profile.json`

**Step 1: Create the JSON data file**

```json
{
  "name": "Alex Rivera",
  "role": "Full Stack Engineer",
  "bio": "Building modern web experiences with precision and purpose. Focused on performance, scalability, and clean architecture.",
  "image": "https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHRlY2h8ZW58MXx8fHwxNzY0MDYyNzc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "links": [
    {
      "id": 1,
      "label": "Portfolio",
      "url": "https://example.com",
      "iconName": "Globe",
      "primary": true
    },
    {
      "id": 2,
      "label": "GitHub",
      "url": "https://github.com",
      "iconName": "Github"
    },
    {
      "id": 3,
      "label": "LinkedIn",
      "url": "https://linkedin.com",
      "iconName": "Linkedin"
    },
    {
      "id": 4,
      "label": "Twitter",
      "url": "https://twitter.com",
      "iconName": "Twitter"
    },
    {
      "id": 5,
      "label": "Contact",
      "url": "mailto:alex@example.com",
      "iconName": "Mail"
    }
  ]
}
```

**Step 2: Verify the file was created**

Run: `cat src/data/profile.json | head -10`
Expected: JSON content with profile data visible

---

## Task 3: Create icon mapper utility

**Files:**
- Create: `src/utils/iconMapper.ts`

**Step 1: Create the icon mapper file**

```typescript
import { LucideIcon, Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Globe; // Default to Globe if icon not found
}
```

**Step 2: Verify the file was created**

Run: `cat src/utils/iconMapper.ts`
Expected: File contains icon mapping object

---

## Task 4: Update ProfileCard.tsx to use imported data

**Files:**
- Modify: `src/components/ProfileCard.tsx:1-50`

**Step 1: Update the imports and remove hardcoded data**

Replace the entire top section of `ProfileCard.tsx` (lines 1-43):

```typescript
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./LinkButton";
import profileData from "../data/profile.json";
import { getIcon } from "../utils/iconMapper";
import { ProfileData, ProfileLink } from "../types/profile";
```

**Step 2: Update the component to map icons**

Replace the component's JSX where links are rendered (around line 133-141):

```typescript
export function ProfileCard() {
  // Type-cast to match our ProfileData interface (icons will be resolved)
  const profile = profileData as ProfileData;

  return (
    <div className="w-full max-w-2xl">
      {/* Main card */}
      <div
        className="relative backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid var(--gray-200)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* ... existing top section ... */}

        {/* Update links rendering section */}
        <div className="space-y-3">
          {profile.links.map((link) => (
            <LinkButton
              key={link.id}
              label={link.label}
              url={link.url}
              icon={getIcon(link.iconName)}
              primary={link.primary}
            />
          ))}
        </div>
      </div>

      {/* Footer text */}
      <div className="text-center mt-8">
        <p
          style={{
            fontSize: '14px',
            color: 'var(--gray-500)',
            fontWeight: 400
          }}
        >
          Designed with precision · Built with React
        </p>
      </div>
    </div>
  );
}
```

**Step 3: Run the dev server to verify no errors**

Run: `npm run dev`
Expected: App loads without console errors, profile renders correctly

**Step 4: Verify the app still looks the same**

Check in browser at `http://localhost:5173`
Expected: Same layout and styling as before

---

## Task 5: Test the data import works

**Files:**
- Modify: `src/components/ProfileCard.tsx`

**Step 1: Verify data is imported correctly**

Add a console.log in the component to confirm data loads:

```typescript
export function ProfileCard() {
  const profile = profileData as ProfileData;

  // Temporary: verify data loads
  console.log("Profile data loaded:", profile);

  return (
    // ... rest of component
  );
}
```

**Step 2: Check browser console**

Open DevTools (F12), check Console tab
Expected: See "Profile data loaded: {name: 'Alex Rivera', ...}"

**Step 3: Remove the console.log**

Delete the temporary console.log line from the component

**Step 4: Verify the app still works**

Refresh the page and ensure everything renders correctly
Expected: No console errors, all links render and are clickable

---

## Task 6: Commit changes

**Files:**
- `src/types/profile.ts` (new)
- `src/data/profile.json` (new)
- `src/utils/iconMapper.ts` (new)
- `src/components/ProfileCard.tsx` (modified)

**Step 1: Stage all changes**

Run: `git add src/types/profile.ts src/data/profile.json src/utils/iconMapper.ts src/components/ProfileCard.tsx`

**Step 2: Create commit**

Run: `git commit -m "refactor: extract profile data to separate JSON file"`

Expected: Commit succeeds with message about extracting profile data

**Step 3: Verify commit was created**

Run: `git log -1 --oneline`
Expected: Output shows "refactor: extract profile data to separate JSON file"

---

## Next Steps (Optional Future Tasks)

Once this plan is complete, you could:
1. Add environment variable support for different profiles
2. Create a simple admin UI to edit `profile.json`
3. Add validation schema for profile.json
4. Create a build step to support multiple profile configurations

