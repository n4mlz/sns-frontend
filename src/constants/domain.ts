const domainConsts = {
  MIN_USERNAME_LENGTH: 4,
  MAX_USERNAME_LENGTH: 16,
  USERNAME_REGEX: /^[a-zA-Z0-9_]{4,16}$/,

  MIN_DISPLAY_NAME_LENGTH: 1,
  MAX_DISPLAY_NAME_LENGTH: 32,

  MAX_BIOGRAPHY_LENGTH: 256,

  MAX_CONTENT_LENGTH: 256,

  ICON_IMAGE_WIDTH: 256,
  ICON_IMAGE_HEIGHT: 256,

  BG_IMAGE_WIDTH: 960,
  BG_IMAGE_HEIGHT: 320,

  MUTUAL: "mutual",
  FOLLOWING: "following",
  FOLLOWED: "followed",
  NONE: "none",
  OWN: "own",

  COMMENT: "comment",
  REPLY: "reply",

  NonVisibleUserName: "",

  CURSOR_PAGINATION_LIMIT: 32,
};

export default domainConsts;
