<template>
  <div>
    <HeadNav />
    <router-view></router-view>
  </div>
</template>
<script>

import HeadNav from "../components/Nav"

export default {
  name:"Layout",
  components:{
    HeadNav
  }
}
</script>