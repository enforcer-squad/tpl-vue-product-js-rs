<template>
    <div>
        <router-link to="/page1">page1</router-link>
        <router-link to="/page2">page2</router-link>
        <div style="padding-top: 20px">
            <router-view />
        </div>
    </div>
</template>

<script setup>
// 使用组合式 API，这里暂时不需要任何逻辑
</script>