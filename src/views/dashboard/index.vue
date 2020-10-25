<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
        <el-button type="primary">按钮</el-button>
        <el-button type="warning">按钮</el-button>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'name'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }

        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
