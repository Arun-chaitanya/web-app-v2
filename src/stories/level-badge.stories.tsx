import LevelBadge from '@atoms/level-badge';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'ATOM/LevelBadge',
  component: LevelBadge,
} as ComponentMeta<typeof LevelBadge>;

const Template: ComponentStory<typeof LevelBadge> = (args) => <LevelBadge {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  level: 1,
  size: 's',
};
