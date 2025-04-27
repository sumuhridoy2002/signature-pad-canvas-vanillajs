var canvas = document.querySelector('canvas')
    canvas.style.position = 'relative'
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.width = 500
    canvas.height = 350

var ctx = canvas.getContext('2d')
    ctx.lineWidth = 3
    ctx.lineJoin = ctx.lineCap = 'round'

var isDrawing, drawLine
canvas.onmousedown = (event) => {
    isDrawing = true
    drawLine = { x: event.clientX, y: event.clientY }
}

canvas.onmousemove = (event) => {
    if (!isDrawing) return

    ctx.beginPath()
    
    ctx.moveTo(drawLine.x, drawLine.y)
    ctx.lineTo(event.clientX, event.clientY)
    ctx.stroke()
    
    drawLine = { x: event.clientX, y: event.clientY }
}

canvas.onmouseup = () => isDrawing = false

document.getElementById('clear').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

window.onload = () => document.getElementById('download').onclick = () => download(canvas, 'signature.png')

function download(canvas, filename) {
    var lnk = document.createElement('a'), e
        lnk.download = filename
        lnk.href = canvas.toDataURL("image/pngbase64")
    
    if (document.createEvent) {
    e = document.createEvent("MouseEvents")
    e.initMouseEvent("click", true, true, window,
                    0, 0, 0, 0, 0, false, false, false,
                    false, 0, null)

    lnk.dispatchEvent(e)
    } else if (lnk.fireEvent) lnk.fireEvent("onclick")
}

document.addEventListener('contextmenu', (event) => event.preventDefault())