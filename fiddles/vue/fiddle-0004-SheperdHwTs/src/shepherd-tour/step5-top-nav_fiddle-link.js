export default (startupTour) => ({
  tour: startupTour,
  options: {
    id: '5',
    title: "/ ~ src/components/TopNav.vue",
    text: "Router Link to the default `/` path.",
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
