<template>
  <div class="timeline-container">
    <div class="timeline-btn timeline-btn-pre" @click="preTick"></div>
    <div ref="tickContainer" class="timeline-tick-container">
      <div class="timeline-tick-list" :style="{ width: sumWidth + 'px' }">
        <div
          v-for="item in tickArr"
          :key="item.label"
          :class="[
            { active: +item.time === +currentTime },
            'timeline-tick-item'
          ]"
          :style="{ width: width + 'px' }"
        >
          <div class="timeline-tick-line line-before"></div>
          <div class="timeline-tick-icon" @click="iconClick(item)"></div>
          <div
            class="timeline-tick-text"
            :style="{ 'max-width': width + 'px' }"
          >
            {{ item.label }}
          </div>
          <div class="timeline-tick-line line-after"></div>
        </div>
      </div>
    </div>
    <div class="timeline-btn timeline-btn-next" @click="nextTick"></div>
  </div>
</template>

<script>
const dateUtil = {
  toDate(date) {
    if (date instanceof Date) {
      return date;
    } else {
      return new Date(date);
    }
  },
  formateDate(date, accuracy) {
    date = dateUtil.toDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    switch (accuracy) {
      case "year":
        return `${year}年`;
      case "month":
        return `${year}年${month}月`;
      case "day":
        return `${year}年${month}月${day}日`;
      // case 'hour': return `${year}年${month}月${day}日 ${hour}时`;
      case "hour":
        return `${month}月${day}日 ${hour}时`;
      case "minute":
        return `${year}年${month}月${day}日 ${hour}时${minutes}分`;
      default:
        return `${year}年${month}月${day}日 ${hour}时${minutes}分${seconds}秒`;
    }
  },
  getStepTime(time, accuracy = "hour", step = 1, isNext = true) {
    time = dateUtil.toDate(time);
    const copyTime = new Date(+time);
    let stepTime;
    switch (accuracy) {
      case "year":
        stepTime = time.getFullYear();
        isNext
          ? copyTime.setFullYear(stepTime + step)
          : copyTime.setFullYear(stepTime - step);
        break;
      case "month":
        stepTime = time.getMonth();
        isNext
          ? copyTime.setMonth(stepTime + step)
          : copyTime.setMonth(stepTime - step);
        break;
      case "day":
        stepTime = time.getDate();
        isNext
          ? copyTime.setDate(stepTime + step)
          : copyTime.setDate(stepTime - step);
        break;
      case "hour":
        stepTime = time.getHours();
        isNext
          ? copyTime.setHours(stepTime + step)
          : copyTime.setHours(stepTime - step);
        break;
      case "minute":
        stepTime = time.getMinutes();
        isNext
          ? copyTime.setMinutes(stepTime + step)
          : copyTime.setMinutes(stepTime - step);
        break;
      case "second":
        stepTime = time.getSeconds();
        isNext
          ? copyTime.setSeconds(stepTime + step)
          : copyTime.setSeconds(stepTime - step);
        break;
    }
    return copyTime;
  },
  getNextTime(time, accuracy, step) {
    return dateUtil.getStepTime(time, accuracy, step, true);
  },
  getPreTime(time, accuracy, step) {
    return dateUtil.getStepTime(time, accuracy, step, false);
  }
};
export default {
  name: "TimeLine",
  data() {
    return {
      tickArr: [],
      currentTime: dateUtil.toDate(this.initTime)
    };
  },
  props: {
    startTime: {
      type: [String, Object, Number],
      default() {
        return new Date();
      }
    },
    endTime: {
      type: [String, Object, Number],
      default() {
        return new Date();
      }
    },
    initTime: {
      type: [String, Object, Number],
      default() {
        return new Date();
      }
    },
    accuracy: {
      type: String,
      default: "hour",
      validator(v) {
        return (
          ["year", "month", "day", "hour", "minute", "second"].indexOf(v) !== -1
        );
      }
    },
    width: {
      type: Number,
      default: 110
    }
  },
  computed: {
    sTime() {
      return dateUtil.toDate(this.startTime);
    },
    eTime() {
      return dateUtil.toDate(this.endTime);
    },
    sumWidth() {
      return this.tickArr.length * this.width;
    }
  },
  created() {
    if (+this.sTime > +this.eTime) {
      throw new Error("开始时间不能大于结束时间");
    }
    if (+this.currentTime < +this.sTime || +this.currentTime > +this.eTime) {
      throw new Error("当前时间超出范围");
    }
    let tempTime = this.sTime;
    while (+tempTime <= +this.eTime) {
      const tick = this.createTick(tempTime, this.accuracy);
      this.tickArr.push(tick);
      tempTime = dateUtil.getNextTime(tempTime, this.accuracy, 1);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updatePos(false);
      this.$emit("change", this.currentTime);
    });
  },
  methods: {
    updatePos(isSmooth = true) {
      const index = this.tickArr.findIndex(t => +t.time === +this.currentTime);
      if (index >= 1) {
        const currentLeft = this.$refs.tickContainer.scrollLeft;
        const scrollToLeft = this.width * (index - 1); // 居中
        const leftDistance = scrollToLeft - currentLeft;
        if (!isSmooth) {
          this.$refs.tickContainer.scrollLeft = scrollToLeft;
        } else {
          this.$refs.tickContainer.scrollBy({
            left: leftDistance,
            top: 0,
            behavior: "smooth"
          });
        }
      }
    },
    createTick(time, accuracy) {
      return {
        time: dateUtil.toDate(time),
        label: dateUtil.formateDate(time, accuracy)
      };
    },
    preTick() {
      const preTime = dateUtil.getPreTime(this.currentTime, this.accuracy);
      if (+preTime >= +this.sTime) {
        this.currentTime = preTime;
        this.updatePos();
        this.$emit("change", this.currentTime);
      }
    },
    nextTick() {
      const nextTime = dateUtil.getNextTime(this.currentTime, this.accuracy);
      if (+nextTime <= +this.eTime) {
        this.currentTime = nextTime;
        this.updatePos();
        this.$emit("change", this.currentTime);
      }
    },
    iconClick(item) {
      this.currentTime = item.time;
      this.$emit("change", this.currentTime);
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline-container {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 64px;
  .timeline-btn {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: #15a4d0;
  }
  .timeline-btn.timeline-btn-pre {
    background: url(../assets/left.svg) no-repeat center center;
    background-size: 100% 100%;
  }
  .timeline-btn.timeline-btn-next {
    background: url(../assets/right.svg) no-repeat center center;
    background-size: 100% 100%;
  }
  .timeline-tick-container {
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
    transition: all 3s ease-in-out;
    &::-webkit-scrollbar {
      display: none;
    }
    .timeline-tick-list {
      display: flex;
      flex-flow: row nowrap;
      height: 100%;
      box-sizing: border-box;
      .timeline-tick-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        position: relative;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        &.active {
          color: red;
          .timeline-tick-icon {
            background: green;
            border-color: green;
          }
        }
        // &:last-child {
        //   .timeline-tick-text {
        //     right: 140px;
        //   }
        // }
        .timeline-tick-line {
          flex-grow: 1;
          height: 1px;
          background: #15a4d0;
        }
        .timeline-tick-icon {
          flex-shrink: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-sizing: border-box;
          border: 1px solid red;
          cursor: pointer;
        }
        .timeline-tick-text {
          position: absolute;
          top: 44px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: keep-all;
          overflow: hidden;
          color: #000;
        }
      }
    }
  }
}
</style>
