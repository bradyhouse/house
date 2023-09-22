export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '1',
      title: "/ ~ src/view/FiddleView.vue",
      text: "Target of the default route, and wrapper for your new fiddle.",
      attachTo: { on: "right" },
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
  