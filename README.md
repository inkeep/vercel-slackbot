# Custom Inkeep Slackbot with Node.js and Vercel

An example repo on how to deploy your own fully customizable Slackbot that uses Inkeep.

> [!NOTE] 
> To add the official Inkeep Slackbot to your workspace, you can instead follow these docs here [https://docs.inkeep.com/integrations/slack/community](https://docs.inkeep.com/integrations/slack/community).

### Environment Variables

After completing the setup instructions below, you will have the following `.env` file in your project for testing locally, and the same environment variables added on Vercel:

```bash
INKEEP_API_KEY=
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
```

#### Inkeep API Key

- Log into the Inkeep dashboard at [https://portal.inkeep.com](https://portal.inkeep.com).
- Navigate to the Projects section and select your project
- Open the Integrations tab
- Click Create Integration and choose API from the options (do not select Slack)
- Enter a Name for your new API integration
- Click on Create
- A generated API key will appear
- Add the key to Vercel's environment variables as `INKEEP_API_KEY`.

#### Slack Bot Token & Signing Secret

Go to [Slack API Apps Page](https://api.slack.com/apps):

- Create new App
  - From Scratch
  - Name your app & pick a workspace
- Go to OAuth & Permissions
  - Scroll to scopes
  - Add the following scopes
    - `app_mentions:read`
    - `channels:history`
    - `chat:write`
    - `commands`
  - Click "Install to Workplace"
  - Copy **Bot User OAuth Token**
  - Add the token to Vercel's environment variables as `SLACK_BOT_TOKEN`
- Getting signing secret
  - Basic Information --> App Credentials --> Copy **Signing Secret**
  - Add the secret to Vercel's environment variables as `SLACK_SIGNING_SECRET`

### Enable Slack Events

After successfully deploying the app, go to [Slack API Apps Page](https://api.slack.com/apps) and select your app:

- Go to **Event Subscriptions** and enable events.
- Add the following URL to **Request URL**:
  - `https://<your-vercel-app>.vercel.app/api/events`
  - Make sure the URL is verified, otherwise check out [Vercel Logs](https://vercel.com/docs/observability/runtime-logs) for troubleshooting.
  - Subscribe to bot events by adding:
    - `app_mention`
    - `channel_created`
  - Click **Save Changes**.
- Slack requires you to reinstall the app to apply the changes.

### Customize the Slackbot

- Go to [Slack API Apps Page](https://api.slack.com/apps) and select your app
- Go to Basic Information
- Under the Display Information section, you can edit the App name, Short description, App icon & Preview, Background color, and the Long description.

## Local Development

Use the [Vercel CLI](https://vercel.com/docs/cli) and [localtunnel](https://github.com/localtunnel/localtunnel) to test out this project locally:

```sh
pnpm i -g vercel
pnpm vercel dev --listen 3000 --yes
```

```sh
npx localtunnel --port 3000
```

Make sure to modify the [subscription URL](./README.md/#enable-slack-events) to the `localtunnel` URL.
