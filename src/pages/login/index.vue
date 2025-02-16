<script setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

const doLogin = () => {
    userStore.doLogin()
}
</script>

<template>
    <div>
        <el-button type="primary" @click="doLogin">Login</el-button>
    </div>
</template>

<style scoped lang="less"></style>
