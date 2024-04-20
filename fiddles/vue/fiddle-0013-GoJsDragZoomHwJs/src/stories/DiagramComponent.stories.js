// DiagramComponent.stories.js
import DiagramComponent from '../components/DiagramComponent.vue';

export default {
  title: 'components/DiagramComponent',
  tags: ['autodocs'],
  component: DiagramComponent,
};

const Template = () => ({
  components: { DiagramComponent },
  template: '<div style="width: 100%; height: 500px"><DiagramComponent /></div>',
});

export const Default = Template.bind({});
