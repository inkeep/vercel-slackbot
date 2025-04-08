import { WebClient } from "@slack/web-api";
import { getGPTResponse, generatePromptFromThread } from "./_openai";

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

type Event = {
	channel: string;
	ts: string;
	thread_ts?: string;
};

export async function sendGPTResponse(event: Event) {
	const { channel, ts, thread_ts } = event;

	try {
		const thread = await slack.conversations.replies({
			channel,
			ts: thread_ts ?? ts,
			inclusive: true,
		});

		await slack.chat.postMessage({
			channel,
			text: `Hello, I'm a bot. I'm here to help you with your questions.`,
			...(thread_ts ? { thread_ts } : {}),
		})

		const prompts = await generatePromptFromThread(thread);
		const gptResponse = await getGPTResponse(prompts);

		await slack.chat.postMessage({
			channel,
			thread_ts: ts,
			text: `${gptResponse.choices[0].message.content}`,
			mrkdwn: true,
		});
	} catch (error) {
		console.error('Slack API Error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            error: JSON.stringify(error, null, 2),
            channel,
            ts,
            thread_ts,
        });
	}
}
