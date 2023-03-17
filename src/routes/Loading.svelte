<script>
    import loading from "$lib/images/loading.gif";
</script>
<div class="loading">
    <img class="rounded" src={loading} alt="Loading">
</div>

<style>
    .loading {
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #2C2732;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0.9;
    }
    img.rounded {
        border-radius: 5px;
    }
</style>