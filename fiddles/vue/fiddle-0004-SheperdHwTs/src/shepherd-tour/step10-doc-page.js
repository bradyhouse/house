export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '10',
      title: "/doc ~ src/components/TheWelcome.vue",
      text: "Rendered version of the TheWelcome component. It provides links to Vue documentation and reference pages.",   
      attachTo: { on: "bottom" },
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
          text: "End",
          action: () => {
            startupTour.routerPush("/", startupTour.cancel)
          }
        }
      ]
    }
  });
  