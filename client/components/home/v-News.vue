<template>
  <div>
    <div
      ref="scrollingContainer"
      class="overflow-x-auto carousel carousel-center space-x-5"
    >
      <div class="carousel-item" v-for="item in dataNews" :key="item.url">
        <NewsVMono :data="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
let intervalId;
let scrollStep;
let scrollBarWidth;
let countScroll = 0;
const scrollingContainer = ref();
const dataNews = ref([
  {
    id: 1,
    url:
      "https://img5.thuthuatphanmem.vn/uploads/2021/11/17/anh-nen-am-nhac-cho-may-tinh_013829710.jpg",
  },
  {
    id: 2,
    url:
      "https://ss-ava.saostar.vn/w800/pc/1683392497737/saostar-j72sj24n05oi7fib.png",
  },
  {
    id: 3,
    url:
      "https://ss-images.saostar.vn/pc/1683277608405/saostar-aebisa3gdrl5yq7p.jpg",
  },
  {
    id: 4,
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFfPDPQBcAsxuDISw-5OBYX-Imz49kUHnrQ&usqp=CAU",
  },
  {
    id: 5,
    url:
      "https://ss-images.saostar.vn/pc/1668839975773/saostar-1qqoy2qrtdlrbloe.png",
  },
]);

onMounted(() => {
  intervalId = setInterval(() => {
    if (scrollingContainer.value.offsetWidth > 1000) {
      scrollStep = scrollingContainer.value.offsetWidth / 3;
    } else if (scrollingContainer.value.offsetWidth > 500) {
      scrollStep = scrollingContainer.value.offsetWidth / 2;
    } else {
      scrollStep = scrollingContainer.value.offsetWidth;
    }
    countScroll++;
    scrollingContainer.value.scrollLeft += scrollStep;

    if (countScroll == dataNews.value.length) {
      countScroll = 0;
      scrollingContainer.value.scrollLeft = 0;
    }
  }, 2000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.scrolling-content {
  width: 200%;
}
</style>
