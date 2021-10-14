import React from 'react';
import shallow from 'zustand/shallow';
import styled from 'styled-components';
import { FlexCol } from 'src/assets/styles/styles';
import { getIcon } from 'src/assets/icons';

import {
  ModernHeader,
  ModernHeaderIntro,
} from 'src/templates/components/section-layout/ModernHeader';
import { Intro } from 'src/templates/components/intro/Intro';
import { Description } from 'src/templates/components/description/Description';
import { RatedBars } from 'src/templates/components/skills/RatedBars';
import { UnratedTabs } from 'src/templates/components/skills/UnratedTabs';
import { Exp } from 'src/templates/components/exp/Exp';
import { EduSection } from 'src/templates/components/education/EduSection';
import { List } from 'src/templates/components/list/List';

import {
  useIntro,
  useSocial,
  useExp,
  useSkills,
  useAchievements,
  useEducation,
} from 'src/stores/data.store';

const LeftSection = styled(FlexCol)`
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`;

const RightSection = styled(FlexCol)`
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  justify-content: space-between;
`;

export function ProfessionalTemplate() {
  const intro = useIntro((state: any) => state);
  const social = useSocial((state: any) => state);
  const education = useEducation((state: any) => state.education);
  const experience = useExp((state: any) => state.experience);
  const [keyProjects, certificates] = useAchievements(
    (state: any) => [state.keyProjects, state.certificates],
    shallow
  );
  const [technical, exposure, methodology, tools] = useSkills(
    (state: any) => [state.technical, state.exposure, state.methodology, state.tools],
    shallow
  );

  const leftSections = [
    {
      title: experience.title,
      component: <Exp companies={experience.companies} />,
      styles: { flexGrow: 1 },
    },
    {
      title: keyProjects.title,
      component: <List items={keyProjects.items} />,
    },
    {
      title: certificates.title,
      component: <List items={certificates.items} />,
    },
  ];
  const rightSections = [
    {
      title: intro.about.title,
      component: <Description photo={intro.photo} description={intro.about.description} />,
    },
    {
      title: intro.objective.title,
      component: <Description description={intro.objective.description} />,
    },
    {
      title: technical.title,
      component: <RatedBars items={technical.items} />,
    },
    { title: exposure.title, component: <UnratedTabs items={exposure.items} /> },
    {
      title: methodology.title,
      component: <UnratedTabs items={methodology.items} />,
    },
    { title: tools.title, component: <UnratedTabs items={tools.items} /> },
    {
      title: education.title,
      component: <EduSection items={education.items} />,
    },
  ];

  return (
    <>
      <LeftSection>
        <ModernHeaderIntro title={intro.name} icons={social}>
          <Intro data={intro} />
        </ModernHeaderIntro>

        {leftSections.map(({ title, component, styles }) => (
          <ModernHeader icon={getIcon(title)} title={title} styles={styles} key={title}>
            {component}
          </ModernHeader>
        ))}
      </LeftSection>

      <RightSection>
        {rightSections.map(({ title, component }) => (
          <ModernHeader icon={getIcon(title)} title={title} key={title}>
            {component}
          </ModernHeader>
        ))}
      </RightSection>
    </>
  );
}