<script>
    import dsaComplete from "$lib/images/dsa_complete.png";
    import { connected, api_endpoint, getUrlEncoded, token, fetchSchedule, cached } from "./../api.js";
    
    let username = "";
    let password = "";

    let enabled = true;

    function connect() {
        enabled = false;
        fetch(api_endpoint + "login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
            body: getUrlEncoded({
                username: username,
                password: password
            })
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if(json.code == 200) {
                $token = json.token;
                fetchSchedule();
                $connected = true;
            } else {
                $connected = false;
            }
            
        }).catch((error) => {
            console.log(error);
            enabled = true;

        });
    }
</script>

<div class="allscreen">
    <img src={dsaComplete} alt="Logo Directe St-Aubin">
    <h1>Connexion</h1>
    <form method="post">
        <label for="username" >Nom d'utilisateur</label>
        <input type="text" bind:value={username} name="username">
        <label for="password">Mot de passe</label>
        <input type="password" bind:value={password} name="password">
        <button class="{enabled ? "" : "disabled"}" on:click={connect}>Connexion</button>
    </form>

</div>
<style>
    .allscreen {
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #2C2732;
        z-index: 9999;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
        font-family: 'Rubik';
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .allscreen img {
        height: 30vh;
        margin-top: 10px;
        margin-bottom: 2em;
    }

    input {
        width: calc(80% - 20px);
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        border: none;
        font-size: 1.2em;
    }

    label {
        margin-top: 0.7em;
        line-height: 50%;
        width: 80%;
        font-size: 1.1em;
    }

    .allscreen button {
        width: 80%;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        border: none;
        font-size: 1.2em;
        background-color: #7277F1;
        color: white;
        margin-top: 0.9em;
        cursor: pointer;
    }

    .disabled {
        background-color: #7678a0;
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>