import { Box, Heading, ListItem, OrderedList, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import PageBackButton from "@/components/elements/pageBackButton";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Box height="30px">
        <PageBackButton />
      </Box>
      <Box padding="30px">
        <Heading as="h1" size="lg">
          プライバシーポリシー
        </Heading>
        <Text paddingY="5px">
          snooze 運営 (以下、「当運営」といいます。) は、本ウェブサイト上で提供するサービス
          (以下,「本サービス」といいます。)
          における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー
          (以下、「本ポリシー」といいます。) を定めます。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第1条 (個人情報)
        </Heading>
        <Text paddingY="5px">
          「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報
          (個人識別情報) を指します。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第2条 (個人情報の収集方法)
        </Heading>
        <Text paddingY="5px">
          当運営は、ユーザーが利用登録をする際に氏名、生年月日、電話番号、メールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を,当運営の提携先
          (情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。) などから収集することがあります。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第3条 (個人情報を収集・利用する目的)
        </Heading>
        <Text paddingY="5px">当運営が個人情報を収集・利用する目的は、以下のとおりです。</Text>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">当運営サービスの提供・運営のため</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">ユーザーからのお問い合わせに回答するため (本人確認を行うことを含む) </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">ユーザーに必要な情報をお知らせするため</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">メンテナンス、重要なお知らせなど必要に応じたご連絡のため</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">上記の利用目的に付随する目的</Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第4条 (利用目的の変更)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は、必要と判断した場合、本ポリシーの内容を変更することができるものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              利用目的の変更を行った場合には、変更後の目的について、当運営所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第5条 (個人情報の第三者提供)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  予め次の事項を告知あるいは公表し、かつ当運営が個人情報保護委員会に届出をしたとき
                </Text>
                <OrderedList>
                  <ListItem>
                    <Text paddingY="5px">利用目的に第三者への提供を含むこと</Text>
                  </ListItem>
                  <ListItem>
                    <Text paddingY="5px">第三者に提供されるデータの項目</Text>
                  </ListItem>
                  <ListItem>
                    <Text paddingY="5px">第三者への提供の手段または方法</Text>
                  </ListItem>
                  <ListItem>
                    <Text paddingY="5px">本人の求めに応じて個人情報の第三者への提供を停止すること</Text>
                  </ListItem>
                  <ListItem>
                    <Text paddingY="5px">本人の求めを受け付ける方法</Text>
                  </ListItem>
                </OrderedList>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">
                  当運営が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">合併その他の事由による事業の承継に伴って個人情報が提供される場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
                </Text>
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第6条 (個人情報の開示)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              ユーザーは、当運営の保有する自己の個人情報が誤った情報である場合には、当運営が定める手続きにより、当運営に対して個人情報の訂正、追加または削除
              (以下、「訂正等」といいます。) を請求することができます。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、前項の規定に基づき訂正等を行った場合、または訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第7条 (個人情報の利用停止等)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去
              (以下、「利用停止等」といいます。) を求められた場合には、遅滞なく必要な調査を行います。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              前項の調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、前項の規定に基づき利用停止等を行った場合、または利用停止等を行わない旨の決定をしたときは、遅滞なく、これをユーザーに通知します。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              前2項にかかわらず、利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じるものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第8条 (プライバシーポリシーの変更)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第9条 (お問い合わせ窓口)
        </Heading>
        <Text paddingY="5px">本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</Text>
        <Table>
          <Tbody>
            <Tr>
              <Td>運営者名</Td>
              <Td>n4mlz</Td>
            </Tr>
            <Tr>
              <Td>メールアドレス</Td>
              <Td>work at n4mlz.dev (at を @ に置き換えてください。) </Td>
            </Tr>
          </Tbody>
        </Table>
        <Text paddingY="20px">以上</Text>
      </Box>
    </>
  );
};

export default PrivacyPolicyPage;
