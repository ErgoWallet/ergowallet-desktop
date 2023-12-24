import LoginScreen from '../../renderer/modules/app/login/LoginScreen';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoginScreen> = {
    title: 'Onboarding/LoginScreen',
    component: LoginScreen,
};
export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {
    args: {
    }
};

