import React from "react";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface PageProps {
  children?: React.ReactNode;
}

export default function Page({}: PageProps) {
  return (
    <Section>
      <Container>
        <SectionTitle>Services page</SectionTitle>
      </Container>
    </Section>
  );
}
