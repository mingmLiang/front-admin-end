<template>
    <header class="header">
          <div class="wapper">
            <span class="nav_list">{{nav}}</span>
            <span>{{qtt_admin}}</span>
            <img id="userPic"src="//2.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=132&d=wavatar" alt="user" height="40">
          </div>
    </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['nav'],
    data () {
      return {
        qtt_admin: ''
      };
    },
    created: function () {
      this.qtt_admin = sessionStorage.getItem('admin_qtt');
    },
    methods: {

    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .header
    height:50px
    background-color: #eef1f6
    line-height:  50px
    text-align: right
    padding: 0 20px
    color: #48576a
    font-size:12px
    .nav_list
      float: left
    img
      border-radius: 50%
      overflow: hidden
      vertical-align: middle
</style>
