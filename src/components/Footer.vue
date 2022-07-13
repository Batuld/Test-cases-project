<template>
    <footer>
        <h1>{{ message }}</h1>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        message: String
    }
}
</script>

<style scoped>
footer {
    margin: auto;
    /* margin: 10px; */
    justify-content: center;
        display: flex;
        padding: 8px;
}
</style>
