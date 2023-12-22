import type { Meta, StoryObj } from '@storybook/react';
import Address from '../../renderer/components/Address';

const meta: Meta<typeof Address> = {
    title: 'Address',
    component: Address,
};
export default meta;
type Story = StoryObj<typeof Address>;

export const Default: Story = {
    args: {
        value : "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbF"
    }
};

export const WithCopy: Story = {
    args: {
        copy: true,
        value : "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbF"
    }
};

export const Shortened: Story = {
    args: {
        shortened: true,
        value : "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbF"
    }
};

export const CopyShortened: Story = {
    args: {
        copy: true,
        shortened: true,
        value : "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbF"
    }
};
