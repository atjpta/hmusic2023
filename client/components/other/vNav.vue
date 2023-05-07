<template>
  <div class="">
    <!-- cho mobie -->
    <div class="dropdown lg:dropdown-open">
      <label tabindex="0" class="">
        <div class="lg:hidden btn btn-ghost rounded-none">
          <OtherVIcon class-icon="text-2xl" icon="fa-solid fa-bars" />
        </div>
      </label>
      <div
        tabindex="0"
        class="dropdown-content lg:mt-8 mt-1 pb-36 bg-base-100 w-60 h-screen carousel hover:overflow-y-auto"
      >
        <div
          class="bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 h-screen w-60"
        >
          <ul class="menu">
            <div v-for="i in dataNav" :key="i">
              <div v-for="j in i" :key="j.name">
                <li class="hover-bordered">
                  <nuxt-link :to="j.url">
                    <OtherVIcon class-icon="text-2xl w-10" :icon="j.icon" />
                    <div class="text-base">
                      {{ j.name }}
                    </div>
                  </nuxt-link>
                </li>
              </div>
              <div v-if="i != dataNav[dataNav.length - 1]" class="divider px-5"></div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showtext = ref(false);
const open = ref(false);

const dataNav = ref([
  [
    {
      name: "Trang chủ",
      url: "/",
      icon: "fa-solid fa-house",
    },

    {
      name: "Tìm kiếm",
      url: "/search",
      icon: "fa-solid fa-magnifying-glass",
    },
    {
      name: "yêu thích",
      url: "/favorite/music",
      icon: "fa-solid fa-heart",
    },
  ],
  [
    {
      name: "Nhạc mới",
      url: "/music",
      icon: "fa-solid fa-music",
    },
    {
      name: "Thể loại",
      url: "/genre",
      icon: "fa-solid fa-table-cells-large",
    },
    {
      name: "Quốc gia",
      url: "/country",
      icon: "fa-solid fa-globe",
    },
    {
      name: "Ca sĩ",
      url: "/singer",
      icon: "fa-solid fa-microphone-lines",
    },
    {
      name: "Playlist",
      url: "/playlist",
      icon: "fa-solid fa-icons",
    },
  ],
  [
    {
      name: "Liên hệ",
      url: "/test",
      icon: "fa-solid fa-square-phone",
    },
    {
      name: "Hướng dẫn",
      url: "/test",
      icon: "fa-solid fa-book-atlas",
    },
    {
      name: "Cài đặt",
      url: "/test",
      icon: "fa-solid fa-gears",
    },
  ],
]);

function openNav() {
  if (open.value) {
    open.value = false;
    showtext.value = false;
  } else {
    showtext.value = true;
    open.value = true;
  }
}

onUpdated(() => {
  if (!showtext.value) {
    open.value = false;
  }
});
</script>

<style>
.router-link-active,
.router-link-exact-active {
  color: rgb(255, 255, 255);
  background: rgba(120, 0, 255);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce2-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
