<template>
  <div class="bs-panel" :style="{ backgroundColor: backgroundColor }">
    <div class="rule-div h-rule-div">
      <div ref="hRule" class="bs-panel__rule-container h-rule-container">
        <div v-if="hasHRule" :style="{ width: width + 'px' }" class="bs-panel__hrule">
          <span v-for="mark in hRuleMarks" :key="mark" :style="{ left:`${ mark + 2 }px` }" class="rule-mark   hrule-mark">{{ mark }}</span>
        </div>
      </div>
    </div>
    <div class="rule-div v-rule-div">
      <div ref="vRule" class="bs-panel__rule-container v-rule-container">
        <div v-if="hasVRule" :style="{ height: height + 'px' }" class="bs-panel__vrule">
          <span v-for="mark in vRuleMarks" :key="mark"  :style="{ top:`${ mark + 2 }px` }" class="rule-mark   vrule-mark">{{ mark }}</span>
        </div>
      </div>
    </div>
    <div ref="screenContainer" class="bs-panel__datascreen-container">
      <div class="bs-panel__datascreen" :style="{
        width: width + 'px',
        height: height + 'px',
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        borderColor: borderColor,
        borderStyle: borderStyle,
        borderWidth: borderWidth
      }"></div>
      <div v-if="hasGrid" :style="{ width: width + 'px', height: height + 'px' }" class="bs-panel__grid"></div>
    </div>
  </div>
</template>

<script>
import TWEEN from "@tweenjs/tween.js"

export default {
  name: 'BSPanel',
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    },
    backgroundColor: {
      type: String,
      default: '#23253D'
    },
    backgroundImage: String,
    borderColor: String,
    borderStyle: {
      type: String,
      validator(val) {
        return ['none', 'dotted', 'inset', 'double', 'groove', 'dashed'].indexOf(val) > -1
      }
    },
    borderWidth: Number,
    hasHRule: {
      type: Boolean,
      default: true
    },
    hasVRule: {
      type: Boolean,
      default: true
    },
    ruleStep: {
      type: Number,
      default: 100
    },
    hasGrid: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hRuleMarks() {
      const markArr = []
      for (let i = 0; i < this.width; i += this.ruleStep) {
        markArr.push(i)
      }
      return markArr
    },
    vRuleMarks() {
      const markArr = []
      for (let i = 0; i < this.height; i += this.ruleStep) {
        markArr.push(i)
      }
      return markArr
    }
  },
  mounted() {
    const panelEle = this.screenContainer =  this.$refs.screenContainer
    const hRuleEle = this.$refs.hRule
    const vRuleEle = this.$refs.vRule
    panelEle.addEventListener('scroll', e => {
      const sTop = panelEle.scrollTop
      const sLeft = panelEle.scrollLeft
      hRuleEle.scrollLeft = sLeft;
      vRuleEle.scrollTop = sTop;
    }, false);
  },
  methods: {
    scrollTo(x, y) {
      const pos = {
        x: this.screenContainer.scrollLeft,
        y: this.screenContainer.scrollTop
      }
      // 加滚动动画
      new TWEEN.Tween(pos)
      .to({ x, y }, 1000)
      .onUpdate(({ x, y }) => {
        this.screenContainer.scrollLeft = x
        this.screenContainer.scrollTop = y
      })
      .start()
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-panel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .rule-div {
    position: absolute;
    overflow: hidden;
    background-color: #8e8c8c;
    &.h-rule-div {
      left: 0;
      right: 0;
      top: 0;
      height: 20px;
    }
    &.v-rule-div {
      top: 0;
      bottom: 0;
      left: 0;
      width: 20px;
    }
    .bs-panel__rule-container {
      position: absolute;
      overflow: hidden;
      // background-color: #8e8c8c;
      &.h-rule-container {
        top: 0;
        left: 30px;
        right: 0;
        height: 100%;
        .bs-panel__hrule {
          position: absolute;
          height: 100%;
          background-image: url('../assets/ruler_h.png');
          background-repeat: repeat-x;
        }
      }
      &.v-rule-container {
        left: 0;
        top: 30px;
        bottom: 0;
        width: 100%;
        .bs-panel__vrule {
          position: absolute;
          width: 100%;
          background-image: url('../assets/ruler_v.png');
          background-repeat: repeat-y;
        }
      }
      .rule-mark {
        position: absolute;
        font-size: 10px;
        line-height: 14px;
        color: rgba(2, 1, 1, 0.5);
        &.vrule-mark {
          transform: translateY(-14px) rotate(90deg);
          transform-origin: left bottom;
        }
      }
    }
  }
  .bs-panel__datascreen-container {
    position: absolute;
    left: 30px;
    top: 30px;
    right: 10px;
    bottom: 10px;
    overflow: auto;
    box-shadow: 1px 2px 10px #000000;
    .bs-panel__datascreen {
      position: absolute;
      background-size: cover;
    }
    .bs-panel__grid {
      position: absolute;
      background-image: url('../assets/data-screen-grid.png');
      background-repeat: repeat;
    }
  }
}
</style>