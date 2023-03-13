<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    export let currentpage;

    let actualPage = $currentpage;

     
    onMount(() => {
        $currentpage = actualPage;
    })
    

    function clicked(npage) {
        return () => {
            actualPage = npage;
            $currentpage = actualPage;
        }
    }
</script>

<div class="centered">
    <div class="container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="iconlink {actualPage == "Emplois du temps" ? "active" : ""}" on:click={clicked("Emplois du temps")}>
            <a href="/schedule">
                <i class="bi bi-calendar3-week"></i>
            </a>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="iconlink {actualPage == "Notes" ? "active" : ""}" on:click={clicked("Notes")}>
            <i class="bi bi-123"></i>    
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events --> 
        <div class="iconlink widther {actualPage == "Acceuil" ? "active" : ""}" on:click={clicked("Acceuil")}>
            <a href="/">
                <i class="bi bi-house"></i>
            </a>
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
    a { 
        color: inherit; 
    } 
    .container {
        display: flex;
        flex-direction: row;
        width: fit-content;
        padding: 1em;
        gap: 0.7em;
        background-color: #D9D9D9;
        border-radius: 15px;
        box-shadow: 0px 5px 7px 4px rgba(0, 0, 0, 0.1);
    }
    .bi {
        font-size: 1.5em;
    }
    .iconlink {
        height: 3em;
        width: 3em;
        display: flex;
        color: black;
        justify-content: center;
        align-items: center;
        background: linear-gradient(125.27deg, #FFFFFF 0%, rgba(255, 255, 255, 0.25) 100%);
        border-radius: 15px;
        cursor: pointer;
        transform: scale(100%);
        transition: transform 0.2s ease-in-out;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.083);
    }


    .iconlink.widther {
        width: 5em;
    }

    .active {
        background: #7277F1;
        color: white;
    }

    .widther.active {
        background: linear-gradient(125.27deg, #ED71AD 0%, #7277F1 100%)!important;
    }

    .iconlink:hover {
        transform: scale(105%);
        transition: transform 0.2s ease-in-out;
    }


    @media screen and (min-width: 768px) {
        .container {
            gap: 1.5em;
        }
        .iconlink {
            width: 5em;
            height: 5em;
        }
        .widther {
            width: 10em;
        }

        .bi {
            font-size: 2.7em;
        }

        
    }
    
</style>


