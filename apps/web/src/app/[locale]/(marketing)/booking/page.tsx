import Container from "@/app/components/layout/container";
import Section from "@/app/components/layout/section";
import SectionTitle from "@/app/components/layout/section-title";
import React from "react";

export interface PageProps {
  children?: React.ReactNode;
}

export default function Page({}: PageProps) {
  return (
    <main>
      <Section>
        <Container>
          <SectionTitle>BOOKING PAGE</SectionTitle>
        </Container>
      </Section>
    </main>
  );
}
