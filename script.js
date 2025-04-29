const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

function resizeCanvas() {
    const containerWidth = document.getElementById('canvas-wrap').offsetWidth
    canvas.width = containerWidth
    canvas.height = Math.min(350, containerWidth * 0.7)
    ctx.lineWidth = 3
    ctx.lineJoin = ctx.lineCap = 'round'
}
resizeCanvas()

let isDrawing = false
let drawLine = { x: 0, y: 0 }

canvas.onmousedown = (event) => {
    isDrawing = true
    drawLine = { x: event.offsetX, y: event.offsetY }
}

canvas.onmousemove = (event) => {
    if (!isDrawing) return
    ctx.beginPath()
    ctx.moveTo(drawLine.x, drawLine.y)
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
    drawLine = { x: event.offsetX, y: event.offsetY }
}

canvas.onmouseup = () => isDrawing = false
canvas.onmouseleave = () => isDrawing = false

// Touch support for mobile
canvas.ontouchstart = (event) => {
    event.preventDefault()
    const touch = event.touches[0]
    const rect = canvas.getBoundingClientRect()
    isDrawing = true
    drawLine = { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
}

canvas.ontouchmove = (event) => {
    event.preventDefault()
    if (!isDrawing) return
    const touch = event.touches[0]
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(drawLine.x, drawLine.y)
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top)
    ctx.stroke()
    drawLine = { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
}

canvas.ontouchend = () => isDrawing = false

document.getElementById('clear').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

document.getElementById('download').onclick = () => {
    const lnk = document.createElement('a')
    lnk.download = 'signature.png'
    lnk.href = canvas.toDataURL('image/png')
    lnk.click()
}

document.addEventListener('contextmenu', (event) => event.preventDefault())

window.addEventListener('resize', resizeCanvas)