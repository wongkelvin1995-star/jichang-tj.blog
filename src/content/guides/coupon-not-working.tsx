import React from 'react';
import { H2, P, Ol, Table, Callout, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { Flow } from '@/components/guide/Media';
import { COUPON_MD } from '@/data/couponData';
import { VERIFICATION } from '@/data/verification';

export default function CouponNotWorking() {
  const total = COUPON_MD.length;
  const has = (re: RegExp) => COUPON_MD.filter((c) => c.condition_notes.some((n) => re.test(n))).length;
  const withConditions = COUPON_MD.filter((c) => c.condition_notes.length > 0).length;
  const applicable = has(/^适用：/);
  const notApplicable = has(/^不适用：/);
  const newUserOnly = has(/^限制：.*(新用户|新客)/);
  const yearlyExcluded = has(/^不适用：.*年付/);
  const smallExcluded = has(/^不适用：.*(流量包|小包|不限时|试用|体验)/);
  const noDiscount = COUPON_MD.filter((c) => !c.discount).length;
  const notesOf = (id: string) => COUPON_MD.find((c) => c.brand_id === id)?.condition_notes.join('；') ?? '';

  return (
    <>
      <P>
        优惠码输进去，金额没有变化，或者提示无效。这时先别怀疑码是假的：站内资料里不少优惠码带着适用范围或使用限制，所以最先要查的是，你选的套餐、付款周期和账号类型在不在范围内。本文先把站内资料里的条件统计出来，再给出按原因对照的排查表和一套固定的操作顺序。
      </P>
      <Flow
        steps={[
          { title: '确认码是优惠码', note: '推广链接里的 code= 是邀请参数' },
          { title: '看品牌页的适用范围', note: '适用、不适用、限制' },
          { title: '选对套餐和周期', note: '再输入优惠码' },
          { title: '在结算页输入', note: '不是登录页，也不是推广页' },
          { title: '看实付金额有没有变化', note: '以实际抵扣为准' },
          { title: '不行就带截图问客服', note: '写清套餐、周期、账号类型' }
        ]}
        caption="优惠码用不了时的排查顺序"
      />

      <H2 id="stats">站内资料里，优惠码的条件是怎么写的</H2>
      <P>
        站长提供的机场资料里，一共有 {total} 个优惠码。其中 {withConditions} 个写了条件：{applicable} 个写了适用的套餐，{notApplicable} 个写了不适用的套餐，{newUserOnly} 个限制新用户或新客；另有 {total - withConditions} 个没有写任何条件，{noDiscount} 个没有写折扣幅度。价格和优惠码由{VERIFICATION.label}，之后服务商可能调整，以结算页为准。各家的完整写法见<GuideLink href="/deals/">优惠码汇总</GuideLink>和各品牌页的优惠码板块。
      </P>

      <H2 id="causes">常见原因对照表</H2>
      <Table
        nowrapFirst
        head={['原因', '资料里的例子', '怎么处理']}
        rows={[
          [
            '套餐不在适用范围',
            <>
              <BrandLink key="ld" id="lingdongyun">灵动云</BrandLink>的资料写着“{notesOf('lingdongyun')}”
            </>,
            '先看品牌页优惠码板块的适用和不适用，换到适用的档位再输入'
          ],
          [
            '付款周期不符',
            <>
              <BrandLink key="fc" id="flycat">飞猫云</BrandLink>的资料写着“{notesOf('flycat')}”。另有 {yearlyExcluded} 个码把年付版或年付小包列为不适用
            </>,
            '先选对周期，再输入优惠码；周期换了，要重新输入一次'
          ],
          [
            '新用户限制',
            `${newUserOnly} 个码写了新用户或新客专享，其中有的还限每个账号用一次`,
            '老账号可能用不了，付款前向客服确认是否有续费优惠'
          ],
          [
            '小包、试用包、一次性流量包被排除',
            `${smallExcluded} 个码把不限时流量包、小包、试用或体验套餐列为不适用`,
            '这类档位多半不在折扣内，以结算页实际抵扣为准'
          ],
          [
            '码输错或混淆',
            <>
              <BrandLink key="sx" id="shenxingyun">神行云</BrandLink>的资料写着“{notesOf('shenxingyun').replace(/^限制：/, '')}”；推广链接里的 code= 参数是邀请参数，不是优惠码
            </>,
            '从品牌页复制优惠码，不手敲；分清优惠码和客户端识别码、邀请参数'
          ],
          [
            '资料没写条件',
            `${total - withConditions} 个码没有任何条件说明`,
            '以结算页实际抵扣为准；不抵扣时问客服，不要自己猜'
          ],
          [
            '码或活动已变更',
            `资料由${VERIFICATION.label}，此后可能有变化`,
            '以结算页为准，发现和本站不一致，欢迎通过页面底部的邮箱反馈'
          ]
        ]}
      />

      <H2 id="steps">一套固定的操作顺序</H2>
      <Ol
        items={[
          '到品牌页复制优惠码，粘贴到结算页的优惠码输入框，注意前后不要带空格。',
          '先选好套餐和付款周期，再输入优惠码；改了套餐或周期，要重新输入。',
          '点“应用”或“使用”之后，看订单里的实付金额有没有变化，只看实付金额，不看别的提示。',
          '没有变化，对照上表逐项排查：套餐、周期、账号类型、码有没有输对。',
          '都核对过还是不行，截图订单页（套餐、周期、优惠码、实付金额）发给客服，不要重复提交订单。'
        ]}
      />

      <H2 id="mistakes">最容易出错的几件事</H2>
      <Ol
        items={[
          '把推广链接里的 code= 当成优惠码输入。',
          '先输入优惠码，后来又改了套餐，结算时没有再检查。',
          '在第三方网站找所谓的“最新优惠码”，来源不明，也无法核对。',
          '优惠码用不了，就直接放弃，没有看资料里的适用范围。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '优惠码可以和其他活动叠加吗？',
            a: '资料里没有写叠加规则。是否叠加、先打折还是先减免，以结算页显示的实付金额为准，拿不准就问客服。'
          },
          {
            q: '输入优惠码后金额没变，还能下单吗？',
            a: '金额没变，说明这个码没有生效，不要先下单再理论。先按上面的顺序排查，核对完再付款。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文统计的是站长提供的机场资料里的优惠码条件，是品牌自己的写法，不代表本站验证了每个码在所有套餐上的实际抵扣。折扣幅度和适用范围随时可能调整，一切以结算页为准。
      </Callout>
    </>
  );
}
