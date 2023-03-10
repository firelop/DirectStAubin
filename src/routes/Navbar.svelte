<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    let actualPage: String = "Acceuil";
    let page = writable(actualPage); 
    setContext("page", page);

    function clicked(npage: String) {
        return () => {
            actualPage = npage;
            $page = actualPage;
        }
    }
</script>

<div class="centered">
    <div class="container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="iconlink {actualPage == "Emplois du temps" ? "active" : ""}" on:click={clicked("Emplois du temps")}>
            <i class="bi bi-calendar3-week"></i>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="iconlink {actualPage == "Notes" ? "active" : ""}" on:click={clicked("Notes")}>
            <i class="bi bi-123"></i>    
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events --> 
        <div class="iconlink widther {actualPage == "Acceuil" ? "active" : ""}" on:click={clicked("Acceuil")}>
            <i class="bi bi-house"></i>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="iconlink {actualPage == "Travail à faire" ? "active" : ""}" on:click={clicked("Travail à faire")}>
            <i class="bi bi-book"></i>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="iconlink {actualPage == "Conversations" ? "active" : ""}" on:click={clicked("Conversations")}>
            <i class="bi bi-chat"></i>
        </div>
    </div>
</div>

<style>

    .centered {
        display: flex;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: row;
        width: fit-content;
        padding: 1em;
        gap: 1.5em;
        background-color: #D9D9D9;
        border-radius: 15px;
        box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.083);
    }
    .bi {
        font-size: 1.7em;
    }
    .iconlink {
        width: 3.5em;
        height: 3.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(125.27deg, #FFFFFF 0%, rgba(255, 255, 255, 0.25) 100%);
        border-radius: 15px;
        cursor: pointer;
        transform: scale(100%);
        transition: transform 0.2s ease-in-out;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.083);
    }


    .widther {
        width: 5em;
        color: linear-gradient(125.27deg, #ED71AD 0%, #7277F1 100%);
    }

    .active {
        background: linear-gradient(125.27deg, #ED71AD 0%, #7277F1 100%);
        color: white;
    }

    .iconlink:hover {
        transform: scale(105%);
        transition: transform 0.2s ease-in-out;
    }

    
</style>


