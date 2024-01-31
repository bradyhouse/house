<template>
    <editor :api-key="apiKey" output-format="html" v-model="value" style="width: 100%; height: 100%;" :init="initOptions" />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { ref, computed } from 'vue'

const apiKey = '5w4tt5nu56xcjbk8yzeotq5iay58j0qyt8kmww5axe1yvkfg'
const defaultContent = `
    <h2 style="text-align: center;">
    TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
    </h2>
    <p style="text-align: center;">
    <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
    </p>`


export default {
    components: {
        'editor': Editor,
    },
    props: {
        content: String
    },

    setup(props) {
        const defaultValue = ref(defaultContent)
        const value = props && props.content ? props.content : defaultValue

        const initOptions = computed(() => ({
            toolbar_mode: 'floating',
            skin: 'fabric',
            content_css: 'fabric',            
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | pagebreak | codesample | printtopdf',
            plugins: 'pagebreak advlist autolink lists link image charmap preview anchor codesample',
            setup: function(editor) {
                editor.ui.registry.addMenuItem('printtopdf', {
                    text: 'Print to PDF',
                    onAction: function() {
                        printToPDF(editor.getContent());
                    }
                });
            }
        }));

        function printToPDF(content) {
            var win = window.open('', '_blank');
            win.document.open();
            win.document.write('<html><head><title>Print to PDF</title></head><body>');
            win.document.write(content);
            win.document.write('</body></html>');
            win.document.close();

            setTimeout(function() {
                win.print();
            }, 500);
        }

        return {
            apiKey,
            value,
            initOptions
        };
    }
};
</script>
