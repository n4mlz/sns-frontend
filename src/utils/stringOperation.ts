const MAX_DISPLAY_BIO_LENGTH = 64;

const adjustBio = (bio: string): string => {
  if (bio.length > MAX_DISPLAY_BIO_LENGTH) {
    return bio.slice(0, MAX_DISPLAY_BIO_LENGTH) + "...";
  }
  return bio;
};

export { adjustBio };
