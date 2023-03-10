<script>
    import Navbar from "./Navbar.svelte";
    import PageTitle from "./PageTitle.svelte";
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
</svelte:head>

<div class="centered">
    <PageTitle></PageTitle>
</div>

<slot/>

<div class="bottom">
    <Navbar></Navbar>
</div>

<style>
    .bottom {
        position: fixed;
        bottom: 1em;
        width: 100%;
    }
</style>