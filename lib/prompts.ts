export const getContext = ({
  isThreaded,
}: {
  isThreaded: boolean;
}) => {
  const baseContext = "This question is being asked in a Slack channel.";

  const isThreadedContext = isThreaded
    ? 'The user is participating in a message thread. The message thread history is provided within the <THREAD_MESSAGE_HISTORY> tag.'
    : undefined;

  const contextParts = [
    baseContext,
    isThreadedContext,
  ].filter(Boolean);

  return contextParts.length > 0 ? contextParts.join('\n') : undefined;
};

export const getGuidance = ({
  isAskForHelpButtonEnabled,
}: {
  isAskForHelpButtonEnabled: boolean;
}) => {
  const isAskForHelpButtonEnabledGuidance = isAskForHelpButtonEnabled
    ? `
      <law>
        <name>Ask for help button</name>
        <conditions>
            <condition>You cannot answer the question confidently.</condition>
        </conditions>
        <action>Suggest the user clicks on the "Ask for help" button to tag a team member to review the question (happens within the Slack channel).</action>
      </law>
    `
    : undefined;

  const guidanceParts = [
    isAskForHelpButtonEnabledGuidance,
  ].filter(Boolean);

  return guidanceParts.length > 0 ? guidanceParts.join('\n') : undefined;
};
