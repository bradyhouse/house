export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '4',
      title: "/ ~ src/components/TopNav.vue",
      text: "Router Link to /tour. This route is used to startup sheperd.js walkthrough tour.",
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
  