<script>
    import { cached } from "../api";

    function convertDateToString(date) {
        return date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
    }

    function getDateFromMinutes(defminutes) {
        let minutes = defminutes + 495;
        let hours = Math.floor(minutes / 60);
        let minutesLeft = minutes % 60;
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutesLeft);
        return date;
    }

    function getActualMinutes() {
        let date = new Date();
        return date.getHours() * 60 + date.getMinutes() - 495;
    }

    function getNextClass() {
        let today = new Date();
        let next_class = {start: 1000000};
        let next_class_minutes = 1000000;
        if(today in $cached) {
            let data = $cached[today];
            for(let i = 0; i < data.length; i++) {
                let start = data[i].start;
          
                if(start < next_class_minutes) {
                    next_class = data[i];
                    next_class_minutes = start;
                }
            }
        }
        
        return next_class;
    }
</script>

<div class="test">
    {#if getNextClass().start > getActualMinutes() + 60}
    <h3>Pas de cours d'ici une heure</h3>
    <p>Il est temps de faire une petite sieste</p>
    {:else}
    <h3>Prochain cours dans {getNextClass() - getActualMinutes()} minutes</h3>
    <p>Aller ! Hop, on se prépare</p>
    {/if}
</div>

<style>
    * {
        font-family: "Rubik";
    }

    .test {
        background-color: #1E1E1E;
        color: #FFFFFF;
        padding: 1em;
        border-radius: 15px;
    }

    .test h3, .test p {
        margin: 5px;
    }
</style>