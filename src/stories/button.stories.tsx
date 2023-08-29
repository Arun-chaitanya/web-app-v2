import Button from '@atoms/button';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'ATOM/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});

Primary.args = { color: 'blue' };
