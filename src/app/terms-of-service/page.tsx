import PageBackButton from "@/components/elements/pageBackButton";
import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";

const TermsOfServicePage = () => {
  return (
    <>
      <Box height="30px">
        <PageBackButton />
      </Box>
      <Box padding="30px">
        <Heading as="h1" size="lg">
          利用規約
        </Heading>
        <Text paddingY="5px">
          この利用規約 (以下、「本規約」といいます。) は、snooze 運営 (以下、「当運営」といいます。)
          がこのウェブサイト上で提供するサービス (以下、「本サービス」といいます。)
          の利用条件を定めるものです。登録ユーザーの皆さま (以下、「ユーザー」といいます。)
          には、本規約に従って、本サービスをご利用いただきます。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第1条 (適用)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              本規約は、ユーザーと当運営との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め
              (以下、「個別規定」といいます。)
              をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第2条 (利用登録)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              本サービスにおいては、登録希望者が本規約に同意の上、当運営の定める方法によって利用登録を申請し、当運営がこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。{" "}
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">利用登録の申請に際して虚偽の事項を届け出た場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">本規約に違反したことがある者からの申請である場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">その他、当運営が利用登録を相当でないと判断した場合</Text>
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第3条 (ユーザーアカウントの管理)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              ユーザーは、自己の責任において、本サービスのユーザーアカウントを適切に管理するものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              ユーザーは、いかなる場合にも、ユーザーアカウントを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当運営は、ユーザーアカウントが登録情報と一致してログインされた場合には、そのユーザーアカウントを登録しているユーザー自身による利用とみなします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              ユーザーアカウントが第三者によって使用されたことによって生じた損害は、当運営は一切の責任を負わないものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第4条 (禁止事項)
        </Heading>
        <Text paddingY="5px">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</Text>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">法令または公序良俗に違反する行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">犯罪行為に関連する行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">当運営のサービスの運営を妨害するおそれのある行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">他のユーザーに関する個人情報等を収集または蓄積する行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">不正アクセスをし、またはこれを試みる行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">他のユーザーに成りすます行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営、本サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              以下の表現を含み、または含むと当運営が判断する内容を本サービス上に投稿し、または送信する行為
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">過度に暴力的な表現</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">露骨な性的表現</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">自殺、自傷行為、薬物乱用を誘引または助長する表現</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">その他反社会的な内容を含み他人に不快感を与える表現</Text>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">以下を目的とし、または目的とすると当運営が判断する行為 </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">
                  営業、宣伝、広告、勧誘、その他営利を目的とする行為 (当運営の認めたものを除きます。){" "}
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">性行為やわいせつな行為を目的とする行為</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">面識のない異性との出会いや交際を目的とする行為</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  当運営、本サービスの他のユーザー、または第三者に不利益、損害または不快感を与えることを目的とする行為
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</Text>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">宗教活動または宗教団体への勧誘行為</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">その他、当運営が不適切と判断する行為</Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第5条 (本サービスの提供の停止等)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                </Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">コンピュータまたは通信回線等が事故により停止した場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">その他、当運営が本サービスの提供が困難と判断した場合</Text>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第6条 (著作権)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、本サービスを利用し、投稿ないしアップロードすることができるものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              ユーザーが本サービスを利用して投稿ないしアップロードした文章、画像、映像等の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、当運営は、本サービスを利用して投稿ないしアップロードされた文章、画像、映像等について、本サービスの改良、品質の向上、または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべて当運営または当運営にその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信
              (送信可能化を含みます。) 、伝送、配布、出版、営業使用等をしてはならないものとします。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第7条 (利用制限および登録抹消)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">本規約のいずれかの条項に違反した場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">登録事項に虚偽の事実があることが判明した場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">当運営からの連絡に対し、一定期間返答がない場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">本サービスについて、最終の利用から一定期間利用がない場合</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">その他、当運営が本サービスの利用を適当でないと判断した場合</Text>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              前項各号のいずれかに該当した場合、ユーザーは、当然に当運営に対する一切の債務について期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、本条に基づき当運営が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第8条 (退会)
        </Heading>
        <Text paddingY="5px">ユーザーは、当運営の定める退会手続により、本サービスから退会できるものとします。</Text>
        <Heading as="h2" size="md" paddingY="10px">
          第9条 (保証の否認および免責事項)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は、本サービスに事実上または法律上の瑕疵
              (安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。)
              がないことを明示的にも黙示的にも保証しておりません。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              前項ただし書に定める場合であっても、当運営は、当運営の過失
              による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害
              (当運営またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。)
              について一切の責任を負いません。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              当運営は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              本サービスによって生じた直接的、また間接的トラブル、損失、損害については、当運営は一切の責任を負いません。
            </Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              本サービスが停止したことを起因してユーザーに生じた損害については、当運営は一切の責任を負いません。
            </Text>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第10条 (サービス内容の変更等)
        </Heading>
        <Text paddingY="5px">
          当運営は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第11条 (利用規約の変更)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">
              当運営は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
            </Text>
            <OrderedList>
              <ListItem>
                <Text paddingY="5px">本規約の変更がユーザーの一般の利益に適合するとき。</Text>
              </ListItem>
              <ListItem>
                <Text paddingY="5px">
                  本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                </Text>
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
        <Heading as="h2" size="md" paddingY="10px">
          第12条 (個人情報の取扱い)
        </Heading>
        <Text paddingY="5px">
          当運営は、本サービスの利用によって取得する個人情報については、本サービス「プライバシーポリシー」に従い適切に取り扱うものとします。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第13条 (通知または連絡)
        </Heading>
        <Text paddingY="5px">
          ユーザーと当運営との間の通知または連絡は、当運営の定める方法によって行うものとします。当運営は,ユーザーから,当運営が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第14条 (権利義務の譲渡の禁止)
        </Heading>
        <Text paddingY="5px">
          ユーザーは、当運営の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
        </Text>
        <Heading as="h2" size="md" paddingY="10px">
          第15条 (準拠法・裁判管轄)
        </Heading>
        <OrderedList>
          <ListItem>
            <Text paddingY="5px">本規約の解釈にあたっては、日本法を準拠法とします。</Text>
          </ListItem>
          <ListItem>
            <Text paddingY="5px">
              本サービスに関して紛争が生じた場合には、当運営の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </Text>
          </ListItem>
        </OrderedList>
        <Text paddingY="20px">以上</Text>
      </Box>
    </>
  );
};

export default TermsOfServicePage;
