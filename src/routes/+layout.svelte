<script>
    import { writable } from "svelte/store";
    import { page } from "$app/stores";
    import LoginPopup from "./LoginPopup.svelte"
    import Navbar from "./Navbar.svelte";
    import PageTitle from "./PageTitle.svelte";
    import { connected } from "./../api.js";
    import { onMount } from "svelte";
    
    const page_links = {
        "/schedule": "Emplois du temps",
        "/": "Accueil",
        "/todo": "Travail à faire",
        "/chat": "Conversations",
        "/grades": "Notes"
    }

    let actual_page = new writable(page_links[$page.route.id]);

</script>

<svelte:head>
    <title>DirecteStAubin</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
</svelte:head>

<div class="centered">
    <PageTitle page={actual_page}></PageTitle>
</div>

<div class="main-content">
    <slot/>
</div>

{#if !$connected}
<LoginPopup></LoginPopup>
{/if}

<div class="bottom">
    <Navbar currentpage={actual_page}></Navbar>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
    
    .bottom {
        position: fixed;
        bottom: 1em;
        width: 100%;
    }
    .main-content {
        padding: 1em;
        padding-top: 0;
    }

    @media screen and (min-width: 425px) {
        .main-content {
            padding: 2em;
            padding-top: 0;
        }
    }
</style>