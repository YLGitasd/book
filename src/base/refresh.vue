<template>
  <pull-to-refresh
    @on-pullup='onPullup'
    @on-pulldown='onPulldown'>
    <ul>
      <li :key="index" v-for="(item, index) in items">
        # item {{ index }}
      </li>
    </ul>
  </pull-to-refresh>
</template>

<script>
    export default {
        data() {
            return {msg: 'hello'}
        },
        created() {
        },
        methods: {},
        computed: {},
        components: {}
    }

</script>

<style scoped>

</style>
