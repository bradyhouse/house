// BreadCrumbs.stories.js
import BreadCrumbs from '../components/BreadCrumbs.vue';

export default {
  title: 'components/BreadCrumbs',
  component: BreadCrumbs,
  tags: ['autodocs'],
  argTypes: {
    crumbs: { control: 'array' },
  },
};

const Template = (args) => ({
  components: { BreadCrumbs },
  setup() {
    return { args };
  },
  template: '<BreadCrumbs v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  crumbs: [
    { title: 'Home', url: 'https://example.com/home' },
    { title: 'About', url: 'https://example.com/about' },
    { title: 'Contact', url: '' }, // Last item, no URL
  ],
};
