import { MouseEvent, ReactNode } from "react";
import Linkify from "linkify-react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const isSafeUrl = (href: string) => {
  try {
    const url = new URL(href, "https://snooze.invalid");
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const linkProps = {
  onClick: (e: MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation();
  },
};

const renderLink = ({ attributes, content }: { attributes: any; content: any }) => {
  const { href, ...props } = attributes;
  if (!href) {
    return <Text>{content}</Text>;
  } else if (!isSafeUrl(href)) {
    return <Text>{content}</Text>;
  } else if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} {...props} target="_blank" rel="noopener noreferrer nofollow">
        <Text color="blue.400" overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
          {content}
        </Text>
      </a>
    );
  } else {
    return (
      <Link href={href} {...props}>
        <Text color="blue.400" overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
          {content}
        </Text>
      </Link>
    );
  }
};

export const CustomLinkify = (props: { children: ReactNode }) => (
  <Linkify options={{ attributes: linkProps, render: renderLink }}>{props.children}</Linkify>
);
