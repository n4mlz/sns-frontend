import { components } from "@/lib/openapi/schema";

type Props = {
  reply: components["schemas"]["reply"];
  replyCallback?: (reply: components["schemas"]["reply"]) => void;
};

const Reply = ({ reply, replyCallback }: Props) => {
  return <div>Enter</div>;
};

export default Reply;
