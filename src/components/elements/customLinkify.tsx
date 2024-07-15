import { MouseEvent, ReactNode } from "react";
import Linkify from "linkify-react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const linkProps = {
  onClick: (e: MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation();
  },
};

const renderLink = ({ attributes, content }: { attributes: any; content: any }) => {
  const { href, ...props } = attributes;
  if (!href) {
    return <Text>{content}</Text>;
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
