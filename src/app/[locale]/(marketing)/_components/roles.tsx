"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";

export interface RolesProps {
  children?: React.ReactNode;
}

export default function Roles({}: RolesProps) {
  const t = useTranslations("marketing.roles");

  return (
    <Section id="roles">
      <Container>
        <h2>{t("title")}</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          repellendus fugiat nihil animi quas, dolore quia ipsa mollitia
          corporis voluptatem. Modi ut dolorem quae soluta cupiditate iusto,
          incidunt quam laboriosam exercitationem quas dignissimos quibusdam
          nostrum error natus. Ducimus blanditiis dolore at debitis id veniam
          consequatur officia voluptates minus perferendis velit provident a
          nemo sit eum harum quia maiores iusto iste aspernatur error, ipsam
          beatae hic nesciunt? Exercitationem voluptatem reprehenderit
          consequatur laudantium voluptates in quo similique, ipsam recusandae.
          Tenetur incidunt minus reiciendis tempore magnam placeat fuga
          similique aliquid? Rem explicabo in obcaecati. Autem, consequuntur
          eius! Aperiam vitae placeat soluta dolore excepturi illo autem sequi?
          Eveniet delectus id magni quas sapiente vitae assumenda minus
          asperiores odio reiciendis ab numquam nam cum animi earum, amet fugiat
          accusantium. Aliquid soluta, veniam ratione eligendi repellendus
          praesentium assumenda consequatur autem recusandae, repellat iste in.
          Natus consequuntur repudiandae quas itaque iusto commodi! Odit,
          molestiae autem officia magnam ipsam eos ut suscipit blanditiis nisi
          et. Quae consequuntur a porro debitis cumque labore maxime corrupti,
          unde expedita reiciendis molestiae doloribus! Quaerat minus excepturi
          molestiae eos ipsa! Fuga cum rem, praesentium soluta autem
          repudiandae? Voluptas veniam quibusdam officiis facilis ullam amet
          iusto id saepe dolore nam error eos molestias nostrum, unde, animi
          mollitia sint! Illo fugiat totam porro quibusdam? Saepe incidunt ullam
          cupiditate laudantium assumenda est. Labore quas reiciendis neque
          deserunt dolor repellat odit doloribus, blanditiis illum rem optio,
          dolores consequatur tenetur ipsam aliquam voluptatibus. Placeat labore
          fugit quos, quo magni rerum maxime nesciunt, recusandae, at soluta
          illo reprehenderit culpa ipsum voluptatum aut quia voluptas itaque
          dolorem! Molestiae, laborum? Numquam quisquam adipisci deleniti ipsum,
          doloremque iure obcaecati nesciunt repellendus necessitatibus. Quas
          distinctio soluta nisi fugit quaerat iste numquam voluptatibus porro
          nam error. Iusto fugit error sunt possimus provident, consequuntur
          quam corrupti fuga, enim, quae doloremque dicta quidem rerum nulla
          neque ullam necessitatibus a unde soluta est earum sed aliquid? Itaque
          laudantium quisquam reprehenderit, iusto libero cumque explicabo
          velit, vitae ipsa ducimus vero! Placeat facilis provident iure
          recusandae, similique saepe ut debitis sed illum labore nulla illo
          quos! Nulla voluptas repudiandae labore iusto accusamus, veritatis
          exercitationem quos numquam iure sed iste corrupti dolore in
          voluptatem rem, aut harum quam adipisci consequuntur ipsa esse velit,
          mollitia at. Aliquid veritatis obcaecati unde delectus expedita.
          Expedita harum, exercitationem nobis qui reprehenderit enim assumenda
          dolorem? Atque quae fugiat fugit rem in dolore recusandae voluptate
          vitae perspiciatis exercitationem. Nihil ad magni, iste praesentium
          temporibus assumenda! Nulla quisquam dolorem sequi debitis quidem,
          nesciunt consequuntur necessitatibus ipsam magnam voluptatibus aliquam
          quas optio corporis eum quia dolore, ut odit suscipit voluptates.
          Debitis veritatis reprehenderit dolorem quidem natus harum culpa nemo
          fugit, officia, cupiditate quae voluptatibus! Debitis fugiat
          distinctio libero sit repellat natus vero odio ex sapiente, voluptas
          tempore rerum, aliquid, atque quod harum dolor? Labore exercitationem
          enim vel sint accusamus sit quasi natus illo minus totam facere
          fugiat, quisquam non quae, ipsum, odio possimus tenetur libero dicta
          quas aliquid? Tenetur temporibus expedita perferendis eum minima,
          incidunt assumenda culpa doloremque! Nesciunt obcaecati voluptas
          porro, repudiandae dolorum blanditiis eum necessitatibus recusandae!
        </p>
      </Container>
    </Section>
  );
}
