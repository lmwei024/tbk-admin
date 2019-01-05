<template>
  <div>
    <!-- <div class="scroll-wrap">
      <ul class="scroll-content" :style="{ top }">
          <li v-for="(item, index) in prizeList" :key="index">
            {{item.name}}
          </li>
      </ul>
    </div> -->
    <div class="cont">
      <div class="bb"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      prizeList:
      [
        { name: '准备好了吗' },
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
      ],
      activeIndex: 0,
    };
  },
  computed: {
    top() {
      return - this.activeIndex * 150 + 'px';
    },
  },
  mounted() {
    setInterval(_ => {
      if(this.activeIndex < this.prizeList.length) {
        this.activeIndex += 1;
      } else {
        this.activeIndex = 0;
      }
    }, 1200);
  },
};
</script>

<style lang="scss" scoped>
.scroll-wrap{
  width: 200px;
  height: 150px;
  // border: 1px solid #407ce7;
  overflow: hidden;
  margin: 0 auto;
}

.scroll-content{
  position: relative;
  transition: top 0.5s;

  li{
    line-height: 150px;
    text-align: center;
  }
}
.cont {
  width: 200px;
  height: 200px;
  margin: 20px auto;
}
.bb{
  background: url('~@/assets/img/logo.png') center no-repeat;
  background-size: 100% 100%;
  position: relative;
  width: 200px;
  height: 200px;
  // border: 1px solid #407ce7;
}
.bb:before,.bb:after{
  content: " ";
  display: block;
  position: absolute;
  width:220px;
  height:220px;
  top: -10px;
  left: -10px;
  border:2px solid #407ce7;
  z-index:10;
  box-sizing: border-box;
  -webkit-animation: clipAni 4s infinite linear;
}
.bb:before{
  -webkit-animation-delay: 2s;
}
@keyframes  clipAni{
  0%,100%{
      clip:rect(0px,220px,220px,217px);
  }
  25%{
      clip:rect(0px,220px,3px,0px);
  }
  50%{
      clip:rect(0px,3px,220px,0px);
  }
  75%{
      clip:rect(217px,220px,220px,0px);
  }            
}
</style>

