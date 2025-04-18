export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '6',
      title: "/ ~ src/components/TopNav.vue",
      text: "Router Path Link to `/about`.",
      attachTo: { on: "bottom" },
      when: {
        cancel: function() {
            startupTour.routerPush("/")
        }
      },
      cancelIcon: {
        enabled: true,
        label: "cancel tour",
      },
      buttons: [
        {
          text: "Next",
          action: startupTour.next
        }
      ]
    }
  });
  