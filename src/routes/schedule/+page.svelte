<script>
    import Schedule from "./Schedule.svelte";
    import { connected } from "../../api";
</script>

{#if $connected}
<Schedule></Schedule>
{/if}