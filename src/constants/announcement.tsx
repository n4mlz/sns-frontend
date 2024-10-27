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
  {
    title: "snooze アップデートのお知らせ",
    content: (
      <Flex direction="column" gap={3}>
        <Text>この度、snooze がアップデートされました！</Text>
        <Text>更新内容</Text>
        <UnorderedList>
          <ListItem>通知機能の追加</ListItem>
          <ListItem>特定の条件下でポストの詳細が表示できない不具合の修正</ListItem>
          <ListItem>その他 UI の調整</ListItem>
        </UnorderedList>
        <Text>今後とも snooze をよろしくお願いします。</Text>
      </Flex>
    ),
    createdAt: new Date("2024-07-22T00:00:00Z"),
  },
  {
    title: "ドメイン移行のお知らせ",
    content: (
      <Flex direction="column" gap={3}>
        <Text>8月11日午前2時 (JST) に snooze のドメイン移行を行います。</Text>
        <Text fontWeight={700}>旧: https://snooze.n4mlz.dev</Text>
        <Text fontWeight={700}>新: https://snooze.page</Text>
        <Text>またドメイン移行に伴い、1時間ほどサービスにアクセスできなくなります。</Text>
        <Text>ご不便をおかけしますが、今後とも snooze をよろしくお願いします。</Text>
        <Text></Text>
      </Flex>
    ),
    createdAt: new Date("2024-08-10T00:00:00Z"),
  },
  {
    title: "ドメイン移行完了のお知らせ",
    content: (
      <Flex direction="column" gap={3}>
        <Text>8月11日午前3時 (JST) に snooze のドメイン移行が完了しました。</Text>
        <Text fontWeight={700}>旧: https://snooze.n4mlz.dev</Text>
        <Text fontWeight={700}>新: https://snooze.page</Text>
        <Text>ご協力ありがとうございました。今後とも snooze をよろしくお願いします。</Text>
      </Flex>
    ),
    createdAt: new Date("2024-08-11T00:00:00Z"),
  },
  {
    title: "筑波大学全学停電に伴う一時サービス停止のお知らせ",
    content: (
      <Flex direction="column" gap={3}>
        <Text>いつも snooze をご利用頂きありがとうございます。</Text>
        <Text>
          この度、10月26日(土)、27日(日)に実施される筑波大学全学停電に伴い、下記の期間、snooze
          のサービスを停止いたします。
        </Text>
        <Text>停止期間: 10月26日(土) 0:00 〜 10月27日(日) 23:59</Text>
        <Text>大変ご不便をおかけしますが、皆様のご理解とご協力をお願い申し上げます。</Text>
      </Flex>
    ),
    createdAt: new Date("2024-10-22T00:00:00Z"),
  },
  {
    title: "筑波大学の復電に伴うサービス再開のお知らせ",
    content: (
      <Flex direction="column" gap={3}>
        <Text>いつも snooze をご利用頂きありがとうございます。</Text>
        <Text>
          10月26日 (土) および27日 (日)
          に実施された筑波大学の全学停電により、一時的にsnoozeのサービスを停止しておりましたが、10月27日 (日) 17:30
          よりサービスを再開いたしました。
        </Text>
        <Text>ご不便をおかけしましたことをお詫び申し上げます。</Text>
        <Text>今後とも snooze をよろしくお願いいたします。</Text>
      </Flex>
    ),
    createdAt: new Date("2024-10-27T08:30:00Z"),
  },
];

export { ANNOUNCEMENT_LOCALSTORAGE_KEY, announcements };
