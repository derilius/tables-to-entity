<template>
    <div id="app">
        <v-toolbar
                :src="'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'"
        >

            <v-toolbar-title style="color: white">VueApp</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark text to="/">Home</v-btn>
                <v-btn dark text to="/converter">Converter</v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <router-view/>
    </div>
</template>

<style lang="scss">

    html {
        overflow-y: auto !important;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #ebeef7;
        min-height: 100vh;
    }

</style>
