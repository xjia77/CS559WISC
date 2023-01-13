var stack = [mat3.create()]

function save() {
    stack.unshift(mat3.clone(stack[0]))
}

function restore() {
    stack.shift()
}

function Clock(ctx, x, y, r, s) {
    this.ctx = ctx
    this.x = x 
    this.y = y 
    this.r = r 
    temp = 5
    h = m = 0
    this.acceleration = acceleration
    this.s = s
}

Clock.prototype.Ctx = function() {
    return ctx=this.ctx
}

Clock.prototype.clockshape = function() {
    this.Ctx()
    var pos = vec2.create()
    var mat = stack[0]
    vec2.transformMat3(pos, [this.x, this.y], mat)
    var x = pos[0]
    var y = pos[1]
    ctx.beginPath()
    ctx.arc(x, y, this.r +17, 0, 2 * Math.PI)
    ctx.fillStyle = "#ff9800"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x, y, this.r + temp, 0, 2 * Math.PI)
    ctx.fillStyle = "pink"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x, y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, 2 * Math.PI)
    ctx.fill()
}

Clock.prototype.clockinternal = function() {
    this.Ctx();
    var y = -0.8 * this.r
    ctx.font = '10px serif'
    ctx.textAlign = "center"
    save()
    var mat = stack[0]
    mat3.translate(mat, mat, [this.x, this.y])
    mat3.rotate(mat, mat, Math.PI / 6)
    var Roman = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    var pos = vec2.create()
    for (var i =0; i<Roman.length; i++) {
        vec2.transformMat3(pos, [0, y], mat)
        ctx.fillText(Roman[i], pos[0], pos[1])
        mat3.rotate(mat, mat, Math.PI/6)
    }
    restore()
}

Clock.prototype.addHand = function() {
    this.Ctx()
    ctx.lineWidth = 3
    ctx.beginPath()
    var pos = vec2.create()
    var mat = stack[0]
    vec2.transformMat3(pos, [0, 0], mat)
    ctx.moveTo(pos[0], pos[1])
    vec2.transformMat3(pos, [0, 30], mat)
    ctx.lineTo(pos[0], pos[1])
    ctx.stroke()
}

Clock.prototype.plotHands = function() {
    this.Ctx()
    save()
    var mat = stack[0]
    mat3.translate(mat, mat, [this.x, this.y])
    mat3.rotate(mat, mat, h)
    this.addHand()
    mat3.rotate(mat, mat, m)
    this.addHand()
    restore()
}

Clock.prototype.update = function() {
    h += 1 / 12 * Math.PI / 180 * this.acceleration
    m += 1 * Math.PI / 180 * this.acceleration
    if((this.x-750)<=0){
        this.x+=1+this.acceleration/2
    }else{
        this.x=this.x-910;
    }
}

Clock.prototype.draw = function() {
    var sx = this.s * (Math.random() - 0.1)
    var sy = this.s * (Math.random() - 0.1)
    save()
    mat3.translate(stack[0], stack[0], [sx, sy])
    this.clockshape()
    this.clockinternal()
    this.plotHands()
    restore()
}