export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '8',
      title:"/ ~ src/components/TopNav.vue",
      text: "Link to the Github fiddle.sh repo.",
      attachTo: { on: "left" },
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
          action: () => startupTour.routerPush("/about", startupTour.next)
        }
      ]
    }
  });
  