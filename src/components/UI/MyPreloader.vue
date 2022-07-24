<template>
    <div class="lazy-load"></div>
    <div class="lazy-load__wait-three-line wait-three-line__wide">
        <div class="wait-three-line__wide-wrap">
            <div class="wait-three-line__wide_one"></div>
            <div class="wait-three-line__wide_two"></div>
            <div class="wait-three-line__wide_three"></div>
        </div>
    </div>

</template>


<script>

export default {
    name: 'my-preloader',
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.lazy-load {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    // .lazy-load__wait-three-line
    &__wait-three-line {}
}

.wait-three-line__wide {
    width: 15%;
    padding-bottom: 8%;
    position: relative;
    margin: 25px;

    // .wait-three-line__wide-wrap
    &-wrap {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    &_one,
    &_two,
    &_three {
        border-radius: 3px;
        background-color: $fiolet-light;
        width: 22%;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    // .wait-three-line__one
    &_one {
        padding-bottom: 20%;
        animation-name: growAndDegreePercentMin;
    }

    // .wait-three-line__two
    &_two {
        padding-bottom: 80%;
        animation-name: growAndDegreePercentMax;
    }

    // .wait-three-line__three
    &_three {
        padding-bottom: 20%;
        animation-name: growAndDegreePercentMin;
    }
}

@keyframes growAndDegreePercentMin {
    0% {
        padding-bottom: 20%;
    }

    100% {
        padding-bottom: 80%;
    }
}

@keyframes growAndDegreePercentMax {
    0% {
        padding-bottom: 80%;
    }

    100% {
        padding-bottom: 20%;
    }
}
</style>