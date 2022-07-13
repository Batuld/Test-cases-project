<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    /* margin: auto; */
    margin: 15px;
        justify-content: center;
            display: flex;
}

header h1 {
    font-size: 2.5em;
}
</style>
