import { Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const ANNOUNCEMENT_LOCALSTORAGE_KEY = "announcementDialog";

type Announcement = {
  title: string;
  content: React.JSX.Element;
  createdAt: Date;
};

const announcements: Announcement[] = [
  {
    title: "snooze アップデートのお知らせ",
    content: (
      <Flex direction="column" gap={3}>
        <Text>この度、snooze がアップデートされました！</Text>
        <Text>更新内容</Text>
        <UnorderedList>
          <ListItem>無限スクロールの実装</ListItem>
          <ListItem>相互フォローの相互フォローを覗けないように変更</ListItem>
          <ListItem>アカウント削除の実装</ListItem>
          <ListItem>短時間に同じ内容のポストを連投できないように変更</ListItem>
          <ListItem>利用規約の改定</ListItem>
          <ListItem>Ctrl+Enter でポストを送信できる機能の追加</ListItem>
          <ListItem>PWA に対応</ListItem>
          <ListItem>一部の要素のクリックの判定がおかしい問題を修正</ListItem>
          <ListItem>ポストのリンクをクリックしたときの挙動の修正</ListItem>
          <ListItem>メッセージ空白のみ、改行のみのポストが投稿できてしまう問題の修正</ListItem>
          <ListItem>404 ページの作成</ListItem>
          <ListItem>サーバーと通信できないときの表示の追加</ListItem>
          <ListItem>運営からのお知らせを表示する機能の追加</ListItem>
          <ListItem>ポストの詳細ページの時刻の表示の不具合を修正</ListItem>
          <ListItem>その他軽微な不具合の修正</ListItem>
        </UnorderedList>
        <Text>今後とも snooze をよろしくお願いします。</Text>
      </Flex>
    ),
    createdAt: new Date("2024-07-14T00:00:00Z"),
  },
];

export { ANNOUNCEMENT_LOCALSTORAGE_KEY, announcements };
