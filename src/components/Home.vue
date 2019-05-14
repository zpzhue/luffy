<template>
	<div class="home">
    <Header :current_page="current_page"/>
    <Banner />
    <Footer />
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Banner from "./common/Banner"
  import Footer from "./common/Footer"
    export default {
      name: "Home",
      components: {
        Header,
        Banner,
        Footer,
      },
      data() {
        return{
          current_page: 0,
        }
      },
    }
</script>

<style scoped>
.home{
  padding-top: 80px;
}
</style>
