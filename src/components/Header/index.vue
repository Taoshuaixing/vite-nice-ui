<template>
  <div class="header-block-box">
    <div class="logoBox">
      <img
        src="/src/assets/NiceUI.png"
        alt="nice-ui"
        @click="toHome"
      />
      <a
        href="javascript:;"
        @click="toHome"
      >Nice UI</a>
    </div>
    <div class="toolsBox">
      <a
        href="javascript:;"
        v-for="(item, index) in tools"
        :key="index"
        :class="{ active: tabIndex == index }"
        @click="pageView(item, index)"
      >{{ item.name }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref, onMounted } from "vue";

const { push, currentRoute } = useRouter();
const state = reactive({
  tools: [
    {
      name: "首页",
      path: "/",
    },
    {
      name: "组件",
      path: "/niceui/started",
    },
    {
      name: "问题反馈",
      path: "open",
      url: "https://github.com/Taoshuaixing/vite-nice-ui/issues",
    },
  ],
});
const { tools } = state;
const fullPath: any = ref(currentRoute.value.fullPath)
const tabIndex: any = ref(sessionStorage.getItem("tabIndex"));
onMounted(() => {
  //监听sessionStorage数据变化
  window.addEventListener('setItemEvent', function (e: any) {
    if (e.key === 'tabIndex') {
      tabIndex.value = e.newValue || sessionStorage.getItem('tabIndex')
    }
  })
});
const toHome = () => {
  push("/");
  sessionStorage.setItem("tabIndex", '0')
}
//切换menu选中状态，修改sessionStorage数据
const pageView = (item: any, index: any) => {
  if (item.name !== '问题反馈') {
    sessionStorage.setItem("tabIndex", String(index));
  }
  if (item.path == "open") {
    window.open(item.url);
  } else {
    if (item.path != fullPath) {
      push(item.path);
    }
  }
};

</script>

<style scoped lang="less">
.header-block-box {
  width: 100%;
  height: 64px;
  padding: 0 100px;
  background: #fff;
  box-shadow: 0 12px 15px #f0f1f2;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // position: fixed;
  // top: 0;
  // z-index: 999;

  .logoBox {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      cursor: pointer;
    }

    a {
      padding-right: 10px;
      color: #4a5264;
      font-weight: 700;
      font-size: 18px;
      font-family: PuHuiTi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji,
        segoe ui emoji, Segoe UI Symbol, noto color emoji, sans-serif;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      transition: all 0.5s;

      &:hover {
        color: #9708CC;
      }
    }
  }

  .toolsBox {
    a {
      font-weight: normal;
      font-size: 16px;
      padding: 8px 3px;
      margin-left: 25px;
      border-bottom: 2px solid #fff;
      display: inline-block;
      float: none;
      line-height: normal;
      transition: all 0.2s ease;
      text-decoration: none;
      color: #4a5264;
      transition: all 0.5s;

      &:hover {
        color: #9708CC;
        border-color: #9708CC;
      }
    }

    a.active {
      color: #9708CC;
      border-color: #9708CC;
    }
  }
}
</style>
