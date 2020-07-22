<template>
  <div class="bs-panel" :style="{ backgroundColor: backgroundColor }">
    <div v-if="hasHRule" :style="{ width: width + 'px' }" class="bs-panel__hrule">
      <span v-for="mark in hRuleMarks" :key="mark" :style="{ left:`${ mark + 2 }px` }" class="rule-mark hrule-mark">{{ mark }}</span>
    </div>
    <div v-if="hasVRule" :style="{ height: height + 'px' }" class="bs-panel__vrule">
      <span v-for="mark in vRuleMarks" :key="mark"  :style="{ top:`${ mark + 2 }px` }" class="rule-mark vrule-mark">{{ mark }}</span>
    </div>
    <div v-if="hasGrid" :style="{ width: width + 'px', height: height + 'px' }" class="bs-panel__grid"></div>
    <div class="bs-panel__datascreen" :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundColor: backgroundColor,
      backgroundImage: `url(${backgroundImage})`,
      borderColor: borderColor,
      borderStyle: borderStyle,
      borderWidth: borderWidth
    }"></div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
.bs-panel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .bs-panel__hrule {
    position: sticky;
    height: 20px;
    left: 30px;
    top: 0;
    z-index: 2;
    background-color: #8e8c8c;
    background-image: url('../assets/ruler_h.png');
    background-repeat: repeat-x;
  }
  .bs-panel__vrule {
    position: sticky;
    width: 20px;
    top: 30px;
    left: 0;
    z-index: 2;
    background-color: #8e8c8c;
    background-image: url('../assets/ruler_v.png');
    background-repeat: repeat-y;
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
  .bs-panel__grid {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: 1;
    background-image: url('../assets/data-screen-grid.png');
    background-repeat: repeat;
  }
  .bs-panel__datascreen {
    position: absolute;
    left: 30px;
    top: 30px;
    box-shadow: 1px 2px 10px #000000;
  }
}
</style>