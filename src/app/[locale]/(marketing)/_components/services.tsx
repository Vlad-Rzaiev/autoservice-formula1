import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface ServicesProps {
  children?: React.ReactNode;
}

export default function Services({}: ServicesProps) {
  const t = useTranslations();

  return (
    <Section id="services">
      <Container>
        <SectionTitle>{t("marketing.services.title")}</SectionTitle>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          nemo laboriosam est animi voluptatibus ad voluptatem quas ipsa
          accusamus dolor amet quae aut vitae, suscipit quod minima, distinctio
          eos sint possimus consectetur nisi alias tempora ratione fugiat. Quam
          voluptates similique esse et suscipit tempora at deserunt itaque
          excepturi ab, nulla, nobis expedita qui! Temporibus, quasi, molestiae
          nihil voluptas, necessitatibus hic sit quisquam nam deserunt explicabo
          aut quis. Sed voluptates aliquam rerum voluptas nisi, excepturi
          obcaecati tempora eius quia quaerat. Ut natus, illum impedit alias
          nostrum rem rerum accusamus hic reprehenderit. Placeat, dolore sit
          quae quod illum earum consequuntur impedit, quos fugiat quisquam
          aperiam maiores nulla, soluta dolorum non ab velit architecto.
          Officiis, harum! Sapiente maiores doloribus id hic blanditiis? Ab id
          temporibus maiores nesciunt, sunt molestiae accusantium labore unde
          sapiente repudiandae esse repellat? Dolore quia id, quaerat iure in,
          reprehenderit ea nesciunt voluptatibus mollitia tempore saepe omnis,
          pariatur nisi. Asperiores delectus sed perspiciatis facilis cumque,
          dolores saepe nisi quod minus accusantium minima repudiandae
          reprehenderit magnam facere consequuntur autem ipsa porro! Fugit in
          culpa nobis totam voluptate repellendus at itaque, consectetur illo
          vero nisi unde aspernatur, enim iusto amet? Eaque repellat adipisci a
          ipsa illo, quam maxime porro doloremque corrupti veritatis, sed
          aliquam nulla error sequi facere dolorem ut accusantium rem
          consequatur aut cupiditate dolor neque aperiam! Quia nulla eius atque
          blanditiis fugit quibusdam, sunt laudantium, illo fuga deleniti,
          praesentium dolor reprehenderit suscipit doloribus tempore pariatur.
          Eligendi aspernatur sint nulla dolorem officiis autem nemo cupiditate,
          laborum corrupti aut minus asperiores maxime quidem sunt facere amet
          vitae fuga veritatis tempora nesciunt ipsa voluptates! Voluptatibus
          laboriosam asperiores, repudiandae quod libero, culpa consectetur
          maxime perferendis tempora, alias reprehenderit ullam inventore
          deleniti molestiae id quis. Repellat accusamus fugit distinctio
          impedit numquam nesciunt commodi illum asperiores, nobis tempore
          labore ducimus veritatis odio tenetur debitis consequatur adipisci?
          Reiciendis voluptates aut libero, incidunt eos labore dolores quas
          ullam optio possimus cumque eius quod ab quis expedita veniam aperiam
          voluptas cum facilis cupiditate vitae sed quo laborum. Provident,
          enim. Animi eum hic cumque neque facilis facere in inventore illum?
          Quas ipsam sunt corporis quaerat accusantium consectetur, facere ipsa.
          Illo soluta magnam ex dolor quo molestias ullam voluptate quibusdam,
          itaque libero repellendus deleniti quaerat earum non accusamus minus
          ea perferendis error perspiciatis, necessitatibus cupiditate quisquam
          at. Quae, quibusdam corrupti. Mollitia, enim quaerat! Molestias eos
          fugit quam, consequatur iusto magnam, minima temporibus labore eaque
          sapiente enim beatae vitae, consequuntur soluta aliquam?
        </p>
      </Container>
    </Section>
  );
}
