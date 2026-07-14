import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";

export interface FaqProps {
  children?: React.ReactNode;
}

export default function Faq({}: FaqProps) {
  const t = useTranslations("marketing.faq");

  return (
    <Section id="faq">
      <Container>
        <h2>{t("title")}</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ipsam ipsum expedita ut natus. Iusto, error esse est ab consectetur
          eos voluptatem unde necessitatibus, reiciendis, modi voluptates beatae
          cum perspiciatis quibusdam quos architecto possimus dolore sint hic
          aspernatur labore eveniet rem? Nam incidunt ea obcaecati reiciendis
          pariatur atque debitis vel necessitatibus nihil quae odit dignissimos
          dolor ipsam maxime placeat eum, quia quas nisi hic quaerat
          voluptatibus? Vitae autem voluptas veniam quam amet enim voluptatibus
          sint a ipsum neque asperiores optio nam saepe consequatur, non
          obcaecati dolore atque vel. Quae quo incidunt unde aperiam ipsam. Sit
          obcaecati, reiciendis iure deserunt aut, consectetur eaque adipisci
          iusto ratione fuga praesentium dignissimos, nesciunt accusamus beatae
          voluptatibus recusandae illum exercitationem! Sapiente similique
          pariatur eaque autem distinctio. Placeat quod asperiores voluptatibus
          consectetur. Exercitationem, quos! Autem debitis enim modi quo atque
          dolore id odio nemo labore aliquid qui ad neque aut, fugit at libero.
          Ducimus voluptas nulla praesentium aut itaque quibusdam distinctio
          laboriosam asperiores suscipit culpa ratione, sapiente excepturi modi.
          Necessitatibus, perferendis. Temporibus fuga possimus modi nam
          expedita quidem ipsum nulla natus velit pariatur consequuntur est
          eveniet ipsa quam, aliquam, sapiente quos recusandae quisquam
          eligendi. Magni harum dolor sit eligendi dignissimos ab
          exercitationem, perferendis saepe delectus vel cum assumenda nisi
          sequi ducimus ipsa tempore cumque quasi laudantium odit sed quibusdam
          animi? Impedit libero animi odit delectus velit cumque illo aliquid,
          ullam quos ipsa tenetur rerum blanditiis voluptatem sunt dolore.
          Quasi, doloremque rerum expedita ullam at quia, soluta iste
          dignissimos et provident illo, voluptas animi corporis recusandae
          magni obcaecati aut id ipsa? Rerum placeat facere incidunt animi fugit
          ea neque repudiandae modi. Inventore voluptate delectus enim itaque.
          Blanditiis reiciendis aperiam perferendis consequatur animi alias
          vitae, tenetur sapiente, distinctio quo nemo doloremque commodi quia
          doloribus. Voluptate sapiente illum labore harum reprehenderit
          adipisci. Deleniti debitis totam enim provident fugiat suscipit
          repudiandae ex voluptas blanditiis, quisquam esse vero accusamus eos
          odit, sequi sapiente similique labore facere consectetur perspiciatis
          error! Perspiciatis odit ipsam maiores, vitae quas natus non. Quis
          quam alias esse, vitae, sed eos perferendis necessitatibus illum
          facilis harum quos quod maiores voluptatibus consectetur obcaecati rem
          veniam nostrum nobis debitis, aspernatur aliquid deserunt praesentium.
          Nihil nemo eum temporibus molestiae, incidunt ea, maxime harum autem
          earum nam facere sit, iusto fugiat! Eaque, dicta voluptatibus! Nemo
          animi saepe, exercitationem at, et obcaecati eum officia vel rem
          placeat quia totam quisquam deleniti voluptas rerum beatae ducimus.
          Cupiditate optio repellat accusantium distinctio aliquid qui corporis
          quam placeat laudantium quo similique iste est aliquam, eos eaque
          minus tenetur exercitationem, dignissimos enim. Delectus libero fuga
          consectetur adipisci doloremque porro tenetur nisi quos vel cumque
          odio, fugit qui eum rerum aspernatur sapiente, eligendi distinctio
          rem. Impedit consequuntur sapiente quam sint harum, in labore eos,
          officia necessitatibus repudiandae expedita itaque sunt possimus ea
          non repellat perspiciatis ratione. Nulla dignissimos distinctio dolor
          est corrupti aliquam tempora ipsam beatae recusandae similique
          quibusdam ea impedit eligendi ad, nesciunt eaque placeat vitae
          accusamus ipsa qui deleniti laudantium architecto exercitationem
          assumenda? Doloribus laboriosam saepe exercitationem excepturi, magnam
          dolor tempore dolorem at iste doloremque facilis?
        </p>
      </Container>
    </Section>
  );
}
