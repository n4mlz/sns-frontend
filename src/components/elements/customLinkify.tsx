import { ReactNode } from "react";
import Linkify from "linkify-react";
import styles from "@components/elements/linkify.module.css";

export const CustomLinkify = (props: { children: ReactNode }) => (
  <Linkify options={{ className: styles.linkify }}>{props.children}</Linkify>
);
