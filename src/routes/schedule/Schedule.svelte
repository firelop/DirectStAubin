<script>
    import { loading, cached, fetchSchedule } from "../../api";
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
    let is_updating = false;

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

    function yesterday() {
        if(is_updating) return;
        actual_date.setDate(actual_date.getDate() - 1);
        actual_date = new Date(actual_date);
        is_updating = true;
        if(convertDateToString(actual_date) in $cached) {
            data = $cached[convertDateToString(actual_date)];
            is_updating = false;
        } else {
            $loading = true;
            fetchSchedule(actual_date).then(() => {
                if(convertDateToString(actual_date) in $cached) {
                    data = $cached[convertDateToString(actual_date)];
                } else {
                    data = [];
                }
                is_updating = false;
                $loading = false;
            }).catch(() => {
                data = [];
                is_updating = false;
                $loading = false;
            });
        }
    }

    function tomorrow() {
        if(is_updating) return;
        actual_date.setDate(actual_date.getDate() + 1);
        actual_date = new Date(actual_date);
        is_updating = true;
        if(convertDateToString(actual_date) in $cached) {
            data = $cached[convertDateToString(actual_date)];
            is_updating = false;
        } else {
            $loading = true;
            fetchSchedule(actual_date).then(() => {
                if(convertDateToString(actual_date) in $cached) {
                    data = $cached[convertDateToString(actual_date)];
                } else {
                    data = [];
                }
                is_updating = false;
                $loading = false;
            }).catch(() => {
                data = [];
                is_updating = false;
                $loading = false;
            });
        }
    }

    onMount(() => {
        if(convertDateToString(actual_date) in $cached) {
            data = $cached[convertDateToString(actual_date)];
        } else {
            $loading = true;
            fetchSchedule().then(() => {
                data = $cached[convertDateToString(actual_date)];
                $loading = false;
            });
        }
    });
</script>

<div class="date">
    <i on:click={yesterday} class="bi bi-chevron-left {is_updating ? "updating" : ""}"></i><p>{actual_date.toLocaleDateString("fr", options)}</p><i on:click={tomorrow} class="bi bi-chevron-right {is_updating ? "updating" : ""}"></i>
</div>

<div class="timetable">
    {#each data as {start, end, name, room, color}}
    <div class="class {color == "#f3f3f3" ? "cancelled" : ""}" style="top: {start*1.2}px; height: calc({(end-start)*1.2}px - 1em); background-color: {color}">
        <div class="tags">
            <div class="tag">{getHourFromMinutes(start)}-{getHourFromMinutes(end)}</div>     
            {#if color == "#f3f3f3"}
            <div class="tag cancelled-tag">Annulé</div>
            {:else}
            <div class="tag">{room}</div>
            {/if}
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

    .cancelled-tag {
        background-color: #cc1717!important;
        color: white!important;
    }

    .cancelled .tag {
        background-color: rgb(40, 40, 40);
    }

    .cancelled {
        background-color: rgb(183, 183, 183)!important;
        border: 1px dashed #cc1717;
        z-index: 3;
        width: calc(calc(100% - 1em) - 2px)!important;
    }

    .cancelled h2 {
        color: rgb(40, 40, 40);
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

    i.bi {
        cursor: pointer;
    }
    i.bi.updating {
        cursor: not-allowed;
    }


    .date {
        background-color: #1E1E1E;
        padding: 0.7em;
        border-radius: 3rem;
        text-align: center;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
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