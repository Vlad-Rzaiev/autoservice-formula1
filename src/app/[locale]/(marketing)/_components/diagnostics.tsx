import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface DiagnosticsProps {
  children?: React.ReactNode;
}

export default function Diagnostics({}: DiagnosticsProps) {
  const t = useTranslations();
  return (
    <Section id="diagnostics">
      <Container>
        <SectionTitle>{t("marketing.diagnostics.title")}</SectionTitle>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit enim
          reiciendis aperiam provident aliquam non ipsum aspernatur! Consectetur
          voluptate, officiis distinctio pariatur eum magnam aut esse
          repellendus voluptas fuga veniam beatae mollitia et cupiditate
          deleniti. Repellendus blanditiis aut possimus error minus hic, nam
          repudiandae, id ab laboriosam quas magnam ipsam beatae animi doloribus
          quo. Eos nostrum mollitia modi quae hic, non vel aliquid praesentium
          quaerat iusto dolor eum tempora voluptas quisquam vitae porro ab
          excepturi aliquam recusandae delectus a blanditiis inventore? Eaque
          cum praesentium fuga deserunt cumque sint perferendis officiis
          repellat. Doloribus vero vitae deleniti ad mollitia accusantium qui,
          molestias error tenetur, esse possimus saepe inventore voluptate amet
          ipsa earum facere enim quia. Porro, minus! Aliquam ipsam rem veniam
          doloremque consequuntur tempora, sed nisi assumenda ipsum non dicta,
          porro, optio deleniti amet doloribus reiciendis cumque nam asperiores.
          Qui placeat eius magni eos quod debitis itaque excepturi vero
          consectetur fugiat minus accusantium unde earum dolor ut magnam
          recusandae praesentium cupiditate illum architecto similique, nobis
          alias voluptatibus dicta! Facere repudiandae voluptate inventore
          tempora aliquam eaque velit aliquid nobis deleniti quia quidem aperiam
          animi, quae ipsa assumenda. Voluptas fuga magnam earum, dicta
          repellendus quis illo at consequuntur rerum veniam cum alias expedita
          repudiandae omnis, perspiciatis placeat repellat esse quos nihil.
          Pariatur sapiente aliquam cupiditate velit reiciendis recusandae
          officiis laudantium ipsam et rerum corporis nostrum enim error
          excepturi maxime, dolor a accusantium reprehenderit ratione quaerat
          accusamus. Et cumque, dolorem voluptates possimus obcaecati omnis
          impedit. Officia, delectus! Dolorum minima eum quis quisquam laborum
          sit dolore placeat quae amet, voluptatibus iure cum officiis veniam,
          ipsam excepturi! Sequi laborum dolores ex doloribus animi architecto
          asperiores, dignissimos, delectus, officia amet nisi obcaecati soluta!
          Sapiente accusamus atque qui officiis. Facilis maxime veritatis ea in
          natus esse? Dolores recusandae ipsum animi deserunt nostrum vitae,
          voluptatibus iusto explicabo dolore sequi dolorem neque adipisci
          nesciunt. At commodi optio veniam qui odit error cupiditate aliquid
          animi. Alias consectetur facere eum consequatur culpa officiis amet a
          tempora ipsum incidunt, omnis libero sint dignissimos ratione fugit
          quidem atque nihil totam ducimus ex magni quod perspiciatis adipisci
          similique. Est aspernatur ea aut labore id nihil praesentium sit, nam,
          maxime aliquam tempore libero veniam animi perferendis inventore
          ducimus ex officiis, quia modi nesciunt placeat quod saepe voluptatem.
          Dolores aperiam laborum animi praesentium incidunt nesciunt, minima
          sunt eum voluptatibus omnis quam repudiandae ex? Vero possimus cumque
          quae nostrum, veniam odio temporibus quam nobis, quia iure dolores
          dolorem error?
        </p>
      </Container>
    </Section>
  );
}
