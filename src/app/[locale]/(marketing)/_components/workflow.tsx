"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";

export interface WorkflowProps {
  children?: React.ReactNode;
}

export default function Workflow({}: WorkflowProps) {
  const t = useTranslations("marketing.workflow");

  return (
    <Section id="workflow">
      <Container>
        <h2>{t("title")}</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          optio delectus dolore beatae repellat in ullam et eum, natus ducimus
          excepturi odit. Sunt doloribus, exercitationem tempora perspiciatis,
          voluptate quia totam rem quis dolorem sed, ad aspernatur. Facilis
          aperiam doloribus dolor sunt nam quod, assumenda voluptatibus modi
          blanditiis id tenetur aut ipsa non in inventore quasi hic? Libero
          doloribus quod sint vel provident cumque, repudiandae, optio est
          reiciendis quasi officiis quam itaque illo culpa dolores, harum sed
          blanditiis expedita. Quae dignissimos amet libero totam deleniti ad
          voluptatum quaerat atque. Odit error illum nisi repudiandae minus
          ducimus culpa, ipsam voluptates quod, in perspiciatis vel deserunt
          vitae exercitationem rem, non sunt! Illo assumenda inventore fugiat
          quae sit ratione expedita, dignissimos delectus, facilis sapiente,
          labore sunt earum aut doloribus veritatis non totam. Saepe fugit
          dolore deserunt omnis ipsa ullam commodi magnam, illum suscipit
          aperiam possimus totam cum recusandae harum ad, ipsam nemo doloribus
          consequuntur consectetur libero vitae quod earum. Ut dolor quasi
          exercitationem nam optio nulla, porro sint non harum repudiandae velit
          veniam. Alias, repellat. Consequatur, laudantium omnis blanditiis
          tenetur magnam illum odit autem adipisci dignissimos quos voluptas!
          Voluptate quia, molestias neque suscipit velit id culpa. Soluta quo
          dolores consequuntur beatae placeat totam tempora delectus, aperiam
          repellendus incidunt distinctio fugit nihil corrupti provident quod,
          explicabo vel voluptates molestiae consectetur odit, porro praesentium
          veritatis? Vero sequi, perspiciatis quos architecto facere deleniti
          aliquam rerum molestiae repellat, mollitia sit quisquam ut harum
          tenetur ab omnis doloribus nemo et natus maiores veritatis expedita
          neque. Perferendis sequi delectus, assumenda non magni totam nesciunt
          deleniti architecto, vel est debitis? A minima suscipit veritatis
          eveniet error ut laborum minus sunt quo provident tempora nihil sequi
          officiis tenetur, animi deserunt ab ratione ipsam voluptatem est
          facilis rem nemo! Temporibus minima eveniet molestiae natus quibusdam
          qui distinctio dignissimos ratione est sunt mollitia sint id,
          voluptates sapiente aliquid et ipsa! Commodi obcaecati minima nobis
          excepturi sequi soluta aspernatur asperiores? Aspernatur, tenetur. Ea
          aliquid amet quidem sit expedita itaque sunt ducimus id explicabo
          impedit repellendus, labore quia laborum fugit asperiores ullam
          dignissimos rerum consequatur quas! Adipisci voluptates odit at, iusto
          tenetur repellendus, voluptatum, sunt dicta esse nam reprehenderit
          numquam obcaecati voluptate consequatur vel sint culpa laborum quod.
          Sunt explicabo dolores rerum eligendi optio minus aperiam consequuntur
          expedita dolorem natus omnis odio earum mollitia nesciunt in nulla
          ducimus, provident eveniet a tempora autem aliquam ea cum. Modi non
          voluptas vitae libero dolorum eius neque ipsum quo!
        </p>
      </Container>
    </Section>
  );
}
