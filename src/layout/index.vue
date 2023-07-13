<template>
  <div class="container">
    <div class="main">
      <b>Vue Nice UI</b>
      <p>Nice UI 组件库</p>
      <p>
        <span>基于 Vue3 + TS + Vite 开发</span>
        <span>V 0.0.1</span>
      </p>
      <div class="btn">
        <a @click="toComponents">Get Started</a>
        <a href="https://github.com/Taoshuaixing/vite-nice-ui" target="_blank">View on GitHub</a>
        <a href="" target="_blank">View on NPM</a>
      </div>
    </div>
    <div class="img">
      <div class="img-bg"></div>
      <img class="img-src" src="/src/assets/NiceUI.png" alt="Vue Nice UI" />
      <div class="img-shadow"></div>
    </div>
  </div>
  <div class="footer">
    <p>Released under the MIT License.</p>
    <p>Copyright © 2023-present The TSXWEB</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toComponents = () => {
  router.push('/niceui')
  sessionStorage.setItem('mIndex', '0-0')
  sessionStorage.setItem('tabIndex', '1')
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .main {
    b {
      font-weight: bold;
      white-space: pre-wrap;
      font-size: 100px;
      background: linear-gradient(135deg, #43cbff 10%, #9708cc 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-weight: bold;
      white-space: pre-wrap;
      font-size: 55px;
      color: rgba(60, 60, 67);

      & span {
        font-size: 30px;
        color: #909090;
        font-weight: normal;
        background: #dfdfdf;
        padding: 5px 10px;
        border-radius: 10px;

        &:last-child {
          background-image: linear-gradient(135deg, #43cbff 10%, #9708cc 100%);
          color: #fff;
          padding: 0 10px;
          border-radius: 10px;
          font-size: 25px;
          margin-left: 10px;
        }
      }
    }

    .btn {
      margin-top: 50px;

      a {
        display: inline-block;
        border: 1px solid transparent;
        text-align: center;
        font-weight: 600;
        white-space: nowrap;
        transition: color 0.25s, border-color 0.25s, background-color 0.25s;
        border-radius: 20px;
        padding: 0 20px;
        line-height: 38px;
        font-size: 14px;
        color: #333;
        background-color: #f6f6f7;
        border-color: rgba(60, 60, 67, 0.29);
        text-decoration: none;
        margin-right: 20px;
        cursor: pointer;

        &:hover {
          background-color: #e3e3e5;
        }

        &:first-child {
          border: none;
          color: #fff;
          background-color: #9708cc;
        }

        &:first-child:hover {
          background-color: #8a08b9;
        }
      }
    }
  }

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .img-bg {
      position: absolute;
      border-radius: 50%;
      width: 600px;
      height: 600px;
      background-image: linear-gradient(135deg, #43cbff 10%, #9708cc 100%);
      filter: blur(112px);
      z-index: -1;
    }

    .img-src {
      width: 60%;

      & {
        animation: moveUpDown 5s ease-in-out infinite;
      }
    }

    // .img-shadow {
    //   position: absolute;
    //   border-radius: 50%;
    //   width: 350px;
    //   height: 60px;
    //   background: #3c3c3c;
    //   filter: blur(32px);
    //   bottom: -20px;
    //   z-index: -1;

    //   & {
    //     animation: shadowWidth 5s ease-in-out infinite;

    //   }
    // }
  }
}

@keyframes moveUpDown {
  0% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(0px, -50px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes shadowWidth {
  0% {
    width: 350px;
  }

  50% {
    width: 250px;
  }

  100% {
    width: 350px;
  }
}

.footer {
  position: absolute;
  border-top: 1px solid #dcdcdc;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  color: #7d7d7d;
}
</style>
