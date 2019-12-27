
export function injectControl() {
    return import('moment').then(({ default: moment }) => {
        return import('jquery').then(({ default: $}) => {
            const element = document.createElement('input');
            element.setAttribute('type', 'text');
            element.setAttribute('name', 'birthday');
            element.setAttribute('value', '10/24/1984');
            document.body.appendChild(element);
            $('input[name="birthday"]').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format('YYYY'),10)
              }, function(start, end, label) {
                var years = moment().diff(start, 'years');
                alert("You are " + years + " years old!");
              });
            return 'calendar created';
        }).catch(error => 'An error occurred importing jquery');
    }).catch(error => 'An error occurred while loading the component');
};