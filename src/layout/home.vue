<template>
  <div class="nice-ui-doc">
    <aside>
      <div class="list-box">
        <div class="item-list" v-for="(item, index) in MenuList" :key="index">
          <p class="titls">
            <span>{{ item.text }}</span>
          </p>
          <li
            v-for="(v, i) in item.items"
            :key="i"
            :class="{ active: menuIndex == index + '-' + i }"
            @click="
              switchMenu({
                parentTitle: item.text,
                title: v.text,
                index: index,
                index1: i,
                path: v.link,
              })
            "
          >
            {{ v.text }}
          </li>
        </div>
      </div>
    </aside>
    <main class="niceuirightView">
      <router-view></router-view>
    </main>
    <!--<n-backtop target=".niceuirightView"></n-backtop>-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MenuList from '@/components/data/menuList'
const router = useRouter()
const menuIndex = ref(sessionStorage.getItem('mIndex') || '0-0')

const activeIndex: any = ref(sessionStorage.getItem('index') || 0)

// 菜单切换
const switchMenu = (obj: any): void => {
  if (router.currentRoute.value.path != obj.path) {
    let lastSegment = obj.path.split('/').pop()
    router.push('/niceui/' + lastSegment)
  }
  menuIndex.value = obj.index + '-' + obj.index1
  sessionStorage.setItem('mIndex', obj.index + '-' + obj.index1)
}
</script>

<style lang="less" scoped>
.nice-ui-doc {
  display: flex;
  height: calc(100vh - 64px - 2vh);
  margin-top: 2vh;
  overflow: hidden;

  aside {
    width: 317px;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    overflow-y: auto;

    .list-box {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-bottom: 30px;
      box-sizing: border-box;

      .item-list {
        width: 100%;
        height: auto;
        overflow: hidden;

        p {
          padding-left: 34px;
          box-sizing: border-box;
          height: 30px;
          margin-top: 30px;

          span {
            width: 100%;
            height: 100%;
            display: inline-block;
            font-size: 14px;
            color: #00000073;
            border-bottom: 1px solid #f0f0f0;
          }
        }

        li {
          list-style: none;
          padding-left: 34px;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 14px;
          color: #000000d9;
          line-height: 40px;
          transform: all 0.2s ease;

          &:hover {
            color: #9708cc;
          }
        }

        li.active {
          color: #9708cc;
          background: rgba(14, 128, 235, 0.1);
          border-left: 3px solid #9708cc;
          padding-left: 31px;
          transform: all 0.2s ease;
        }
      }
    }
  }

  main {
    width: calc(100% - 317px);
    flex: 1;
    height: 100%;
    padding: 0 calc(2vw + 100px) 0 2vw;
    overflow-x: hidden;
    overflow-y: auto;
    word-wrap: break-word;
  }
}

aside::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

aside::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #b8b8bb;
}

aside::-webkit-scrollbar-track {
  border-radius: 0px;
  background: #fff;
}

main::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

main::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #b8b8bb;
}

main::-webkit-scrollbar-track {
  border-radius: 0px;
  background: #fff;
}
</style>
