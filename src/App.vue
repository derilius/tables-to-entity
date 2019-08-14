<template>
    <div id="app">
        <v-toolbar
                :collapse="collapse"
                :src="'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'"
        >

            <v-toolbar-title style="color: white">VueApp</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark text to="/">Home</v-btn>
                <v-btn dark text to="/converter">Converter</v-btn>
            </v-toolbar-items>

            <!--            <template v-if="$vuetify.breakpoint.smAndUp">-->
            <!--                <v-btn dark icon>-->
            <!--                    <v-icon>mdi-export-variant</v-icon>-->
            <!--                </v-btn>-->
            <!--                <v-btn dark icon>-->
            <!--                    <v-icon>mdi-delete-circle</v-icon>-->
            <!--                </v-btn>-->
            <!--                <v-btn dark icon>-->
            <!--                    <v-icon>mdi-plus-circle</v-icon>-->
            <!--                </v-btn>-->
            <!--            </template>-->
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
