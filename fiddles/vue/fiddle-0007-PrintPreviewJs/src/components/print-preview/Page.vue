<template>
<div class="page">
    <header class="header">
        <slot name="header"></slot>
    </header>
    <main class="main">
        <slot name="main"></slot>
    </main>
    <footer class="footer">
        <slot name="footer"></slot>
    </footer>
</div>
</template>

<style scoped>
@import '../../index.css';

html,
body {
    /* Reset the document's margin values */
    margin: 0;
    /* Reset the document's padding values */
    padding: 0;
    /* Use the platform's native font as the default */
    font-family: "Roboto", -apple-system, "San Francisco", "Segoe UI", "Helvetica Neue", sans-serif !important;
    /* Define a reasonable base font size */
    font-size: 12pt;

    /* Styles for better appearance on screens only -- are reset to defaults in print styles later */

    /* Use a non-white background color to make the content areas stick out from the full page box */
    background-color: #eee;
}

* {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 98%;
    color: #CCC;
    background: #333;
    padding: 8px;
    margin: 8px;
    text-align: center;
}

.header {
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    color: #CCC;
    background: #333;
    padding: 8px;
    margin-bottom: 10px;
    text-align: center;
}

.main {
    height: 25.7cm;
}

.page {
    margin: 1cm auto;
    background: #fff;
    box-shadow: 0 4px 5px rgba(75, 75, 75, 0.2);
    outline: 0;
    font-family: "Roboto", -apple-system, "San Francisco", "Segoe UI", "Helvetica Neue", sans-serif !important;
    width: 21.6cm;
    min-height: 27.9cm !important;
    padding-left: .2cm;
    padding-top: .2cm;
    padding-right: .2cm;
    padding-bottom: .2cm;
    overflow: hidden;
}


div.page-break {
    page-break-after: always;
}

@media screen {
    div.page-break::before {
        content: "";
        display: block;
        height: 0.8cm;
        margin-left: 0.5cm;
        margin-right: 0.5cm;
        background-color: #fff;
        box-shadow: 0 6px 5px rgba(75, 75, 75, 0.2);
    }

    div.page-break {
        display: block;
        height: 1.8cm;
        margin-left: -2.5cm;
        margin-right: -2.5cm;
        margin-top: 1.2cm;
        margin-bottom: 2cm;
        background: #eee;
    }
}

h1 {
    page-break-before: always;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    page-break-after: avoid;
}

p {
    margin: 0;
}

p+p {
    margin-top: 0.5cm;
}

a {
    text-decoration: none;
    color: black;
}

table {
    page-break-inside: avoid;
}

@page {
    orphans: 4;
    widows: 2;

}

@media print {

    html,
    body {
        /* Reset the document's background color */
        background-color: #fff;
    }

    .page {
        width: initial !important;
        min-height: initial !important;
        margin: 0 !important;
        padding: 0 !important;
        border: initial !important;
        border-radius: initial !important;
        background: initial !important;
        box-shadow: initial !important;
        page-break-after: always;
    }

    .footer {
        position: absolute;
        bottom: 0px !important;
        left: 0px;
        width: 100%;
        color: #CCC;
        background: #333;
        padding-top: 8px;
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 0px;

        margin: 0px;
        text-align: center;
    }

}

@page {
    size: letter portrait;
    margin-left: 0cm;
    margin-top: 0cm;
    margin-right: 0cm;
    margin-bottom: 0cm;
}
</style>
