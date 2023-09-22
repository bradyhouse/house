export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '2',
      attachTo: { on: "top" },
      title: "/ ~ src/components/HelloWorld.vue",
      text: "Rendered version of the HelloWorld component.",
      cancelIcon: {
        enabled: true,
        label: "cancel tour",
      },
      when: {
        cancel: function() {
            startupTour.routerPush("/")
        }
      },
      buttons: [
        {
          text: "Next",
          action: startupTour.next
        }
      ]
    }
  });