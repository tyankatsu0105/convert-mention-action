/**
 * Slackのメンションの記法に合わせたメンション文字列を返す
 * @see https://api.slack.com/docs/message-formatting#linking_to_channels_and_users
 * @param ids
 * @example
 * generateSlackMension(['id1', 'id2'])
 * // => '<@id1> <@id2>'
 */
export const generateSlackMension = (ids: string[]) =>
  ids.reduce((text, id) => {
    return (text += `<@${id}>`);
  }, '');
