# Deployment to Vercel

## Quick Start

1. Go to https://vercel.com/new
2. Import your GitHub repository: `jvn8hfn78t-design/mine-report-pro`
3. Click "Deploy"

## Environment Variables

After deployment, add these in Vercel Dashboard:

**Settings > Environment Variables**

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Build Settings

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Automatic Deployments

- ✅ Push to `main` = Auto deploy to production
- ✅ Push to other branches = Preview deploy

## Domain (Optional)

Add custom domain in Vercel Dashboard:
- Settings > Domains
- Add your domain (e.g., `minereportpro.com`)

---

**Your Production URL will be:**
`https://mine-report-pro-[random].vercel.app`

After custom domain:
`https://yourdomaon.com`
