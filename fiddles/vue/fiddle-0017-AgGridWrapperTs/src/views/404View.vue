<template>
<div class="h-100 d-flex align-items-center justify-content-center">
    <div class="img-block align-middle">
        <img src="../assets/404.gif" />
    </div>
</div>
</template>

  

<style scoped>
.img-block {
    max-width: 85%;
    display: inline-block;
}

@media(max-width:355px) {

    img {
        transform: rotate(90deg);
        width: 100%;
    }

    .img-block {
        padding-top: 300px;
        max-width: 355px;
        display: inline-block;

    }
}
</style>
