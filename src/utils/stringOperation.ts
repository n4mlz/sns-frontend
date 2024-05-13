const stringLength = (str: string): number => {
  const segmenter = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });
  return Array.from(segmenter.segment(str)).length;
};

const MAX_DISPLAY_BIO_LENGTH = 64;

const adjustBio = (bio: string): string => {
  if (bio.length > MAX_DISPLAY_BIO_LENGTH) {
    return bio.slice(0, MAX_DISPLAY_BIO_LENGTH) + "...";
  }
  return bio;
};

export { stringLength, adjustBio };
