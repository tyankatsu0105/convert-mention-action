import * as request from 'request-promise-native';

export type Member = {
  id: string;
  team_id: string;
  name: string;
  deleted: boolean;
  color: string;
  real_name: string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: {
    title: string;
    phone: string;
    skype: string;
    real_name: string;
    real_name_normalized: string;
    display_name: string;
    display_name_normalized: string;
    status_text: string;
    status_emoji: string;
    status_expiration: number;
    avatar_hash: string;
    image_original: string;
    is_custom_image: boolean;
    first_name: string;
    last_name: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
    status_text_canonical: string;
    team: string;
  };
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_bot: boolean;
  is_app_user: boolean;
  updated: number;
  has_2fa: boolean;
};

/**
 * workspaceのメンバー情報をリストで取得
 * @param token - slackのtoken
 */
export const getMembers = async (token) => {
  const headers = { 'Content-type': 'application/x-www-form-urlencoded' };

  const options = {
    url: `https://slack.com/api/users.list?token=${token}`,
    method: 'GET',
    headers: headers,
    json: true
  };

  const { members }: { members: Member[] } = await request.get(options);

  return members;
};
