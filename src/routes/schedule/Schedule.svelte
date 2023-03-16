<script>
    import { api_endpoint, connected, token, cached, fetchSchedule } from "../../api";
    import { onMount } from "svelte";

    var stringTruncate = function(str, length){
        var dots = str.length > length ? '...' : '';
        return str.substring(0, length)+dots;
    };

    function convertDateToString(date) {
        return date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
    }

    let actual_date = new Date();

    let data = [];
    let update = false;
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };

    function getHourFromMinutes(defminutes) {
        let minutes = defminutes + 495;
        let hours = Math.floor(minutes / 60);
        let minutesLeft = minutes % 60;
        return `${hours}h${minutesLeft < 10 ? "0" : ""}${minutesLeft}`;
    }

    onMount(() => {
        if(convertDateToString(actual_date) in $cached) {
            data = $cached[convertDateToString(actual_date)];
        } else {
            fetchSchedule().then(() => {
                data = $cached[convertDateToString(actual_date)];
            });
        }
    });
</script>

<div class="date">
    <p>{actual_date.toLocaleDateString("fr", options)}</p>
</div>

<div class="timetable {"up" ? update : "down"}">
    {#each data as {start, end, name, room, color}}
    <div class="class" style="top: {start*1.2}px; height: calc({(end-start)*1.2}px - 1em); background-color: {color}">
        <div class="tags">
            <div class="tag">{getHourFromMinutes(start)}-{getHourFromMinutes(end)}</div>
            <div class="tag">{room}</div>
        </div>
        <h2>{name}</h2>
    </div>
    {/each}

</div>

<style>
    * {
        font-family: 'Rubik';
    }

    .tags {
        display: flex;
        gap: 5px;
        max-width: 100%;
    }

    .tag {
        background-color: black;
        border-radius: 3rem;
        color: white;
        font-size: 0.8em;
        padding: 0.2em 0.7em;
        white-space: nowrap;

    }

    .class {
        padding: 0.5em;
        width: calc(100% - 1em);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        position: absolute;
    }

    .class h2 {
        font-size: 1.2em;
        margin: 0;
    }


    .date {
        background-color: #1E1E1E;
        padding: 0.7em;
        border-radius: 3rem;
        text-align: center;
        color: white;
    }

    .timetable {
        margin-top: 1em;
        background-color: #c7d1d0;
        height: 660px;
        border-radius: 5px;
        position: relative;
        margin-bottom: 5em;
    }

    .date p {
        margin: 0;
        font-size: 1.3em;
    }
</style>