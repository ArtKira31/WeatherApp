export function DateTime(timezone: number, dt: number) {

    let dateTime = new Date(dt * 1000 + (timezone * 1000));

    let weekday = dateTime.toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return `${weekday}th`;
}


