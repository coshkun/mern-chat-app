
export function extractChatTime(dateString) {
    const date    = new Date(dateString);
    const hours   = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`
}

// Helper func to pad single-digit numbers with a leading zero
function padZero(num){
    return num.toString().padStart(2, "0");
}