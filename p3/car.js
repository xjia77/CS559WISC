function Car(ctx, acceleration, s) {
    this.ctx = ctx
    this.acceleration = acceleration
    this.s = s
    this.t = 0
    this.color = '#168'
    this.x = 0
    this.c = 0
}

Car.prototype.Ctx = function () {
    return (ctx = this.ctx)
}

var getTransformPos = function (x, y) {
    var mat = stack[0]
    var vec = vec2.create()
    vec2.transformMat3(vec, [x, y], mat)
    return vec
}

Car.prototype.carshape = function () {
    this.Ctx()
    var mat = stack[0]
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = '#ff9800'
    var pos1 = getTransformPos(200, 225)
    ctx.rect(pos1[0], pos1[1], 200, 150)
    ctx.stroke()
    ctx.beginPath()
    var pos2 = getTransformPos(250, 376)
    ctx.arc(pos2[0], pos2[1], 20, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.beginPath()
    var pos3 = getTransformPos(350, 376)
    ctx.arc(pos3[0], pos3[1], 20, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.beginPath()
    ctx.lineWidth = '5'
    ctx.strokeStyle = '#ff9800'
    var pos4 = getTransformPos(400, 300)
    ctx.arc(pos4[0], pos4[1], 60, -Math.PI / 2, Math.PI / 2)
    ctx.stroke()
    ctx.beginPath()
    var pos5 = getTransformPos(435, 300)
    ctx.arc(pos5[0], pos5[1], 10, 0, 2 * Math.PI)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.beginPath()
    var pos6 = getTransformPos(415, 330)
    ctx.arc(pos6[0], pos6[1], 5, 0, 2 * Math.PI)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.beginPath()
    var pos6 = getTransformPos(415, 270)
    ctx.arc(pos6[0], pos6[1], 5, 0, 2 * Math.PI)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.beginPath()
    ctx.lineWidth = '3'
    ctx.strokeStyle = '#ff9800'
    var pos7 = getTransformPos(200, 340)
    var pos8 = getTransformPos(150, 360)
    var pos9 = getTransformPos(150, 370)
    var pos10 = getTransformPos(200, 375)
    ctx.moveTo(pos7[0], pos7[1])
    ctx.lineTo(pos8[0], pos8[1])
    ctx.lineTo(pos9[0], pos9[1])
    ctx.lineTo(pos10[0], pos10[1])
    ctx.stroke()
    ctx.beginPath()
    var pos11 = getTransformPos(350, 376)
    ctx.arc(pos11[0], pos11[1], 7, 0, 2 * Math.PI)
    ctx.fillStyle = '#ff9800'
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    var pos12 = getTransformPos(250, 376)
    ctx.arc(pos12[0], pos12[1], 7, 0, 2 * Math.PI)
    ctx.fillStyle = '#ff9800'
    ctx.closePath()
    ctx.fill()
}

Car.prototype.whellOne = function () {
    this.Ctx()
    ctx.beginPath()
    ctx.lineWidth = '2'
    var pos = getTransformPos(350, 376)
    ctx.arc(
        pos[0],
        pos[1],
        17,
        (Math.PI / 90) * this.t + (0 + ((2 * Math.PI) / 6) * this.c),
        (Math.PI / 90) * this.t +
          ((2 * Math.PI) / 12 + ((2 * Math.PI) / 6) * this.c)
    )
    ctx.strokeStyle = '#ff9800'
    ctx.closePath()
    ctx.stroke()
}

Car.prototype.whellTwo = function () {
    this.Ctx()
    ctx.beginPath()
    ctx.lineWidth = '2'
    var pos = getTransformPos(250, 376)
    ctx.arc(
        pos[0],
        pos[1],
        17,
        (Math.PI / 90) * this.t + (0 + ((2 * Math.PI) / 6) * this.c),
        (Math.PI / 90) * this.t +
          ((2 * Math.PI) / 12 + ((2 * Math.PI) / 6) * this.c)
    )
    ctx.strokeStyle = '#ff9800'
    ctx.closePath()
    ctx.stroke()
}

Car.prototype.whellThree = function () {
    for (this.c = 0; this.c <= 6; this.c++) {
        this.whellOne()
        this.whellTwo()
    }
}

Car.prototype.update = function () {
    this.t += this.acceleration / 2.5
    if (this.x <= 450) {
        this.x += 1 + this.acceleration / 2
    } else {
        this.x = this.x - 910
    }
}

Car.prototype.draw = function () {
    save()
    var mat = stack[0]
    var y = this.s * (Math.random() - 0.1)
    mat3.translate(mat, mat, [this.x, y])
    this.carshape()
    this.whellOne()
    this.whellTwo()
    this.whellThree()
    restore()
}
