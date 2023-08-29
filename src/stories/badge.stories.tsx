import Badge from '@atoms/badge';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'ATOM/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  value: '1',
};
