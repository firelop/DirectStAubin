<script>
    import { api_endpoint, connected, token } from "../../api";
    import { onMount } from "svelte";

    var stringTruncate = function(str, length){
        var dots = str.length > length ? '...' : '';
        return str.substring(0, length)+dots;
    };

    let data = [
        {
            start: 0,
            end: 55,
            name: "Sciences et vie de la Terre",
            teacher: "A. Rideau",
            room: "B020",
            color: "#FF8EC5"
        }, 
        {
            start: 55,
            end: 110,
            name: "Mathématiques",
            teacher: "M. Coquereau",
            room: "B117", 
            color: "#FFB967"
        }, 
        {
            start: 125,
            end: 235,
            name: "Physiques",
            teacher: "G. Clair",
            room: "B010", 
            color: "#70BB64"
        }
    ]

    function fetchSchedule() {
        fetch(api_endpoint + "schedule/", {
            credentials: "include"
        }).then((response) => {
            return response.json();
        }).then((json) => {
            let tdate = new Date();
            console.log(tdate.getFullYear() + "-" + tdate.getMonth().toString() + "-" + tdate.getDate().toString());
            let today_date = tdate.getFullYear() + "-" + (tdate.getMonth()+1).toString().padStart(2, '0') + "-" + tdate.getDate().toString().padStart(2, '0');
            console.log(today_date);
            if(today_date in json["data"]) {
                data = json["data"][today_date];
            } else {
                data = [];
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function getHourFromMinutes(defminutes) {
        let minutes = defminutes + 495;
        let hours = Math.floor(minutes / 60);
        let minutesLeft = minutes % 60;
        return `${hours}h${minutesLeft < 10 ? "0" : ""}${minutesLeft}`;
    }

    onMount(() => {
        fetchSchedule();
    });
</script>

<div class="date">
    <p>Vendredi 03 mars</p>
</div>

<div class="timetable">
    {#each data as {start, end, name, teacher, room, color}}
    <div class="class" style="top: {start*1.2}px; height: calc({(end-start)*1.2}px - 1em); background-color: {color}">
        <div class="tags">
            <div class="tag">{getHourFromMinutes(start)}-{getHourFromMinutes(end)}</div>
            {#if teacher.length > 0}
                <div class="tag">{stringTruncate(teacher, 20)}</div>
            {/if}
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
    }

    .tag {
        background-color: black;
        border-radius: 3rem;
        color: white;
        font-size: 0.8em;
        padding: 0.2em 0.7em;
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