function Queue() {
    this.temp = []
   }
   //於佇列後端新增一個或多個資料。
   Queue.prototype.enqueue = function (element) {
    this.temp.push(element)
   }
   //於佇列前端(頭部、第一個)移除資料，並將被移除的資料回傳。
   Queue.prototype.dequeue = function () {
    return this.temp.shift()
   }
   //呈現佇列前端(頭部、第一個)資料名稱
   Queue.prototype.front = function () {
    return this.temp[0]
   }
   //回傳佇列裡共有幾筆資料數值
   Queue.prototype.size = function () {
    return this.temp.length
   }
   //回傳佇列內部裡是否還有資料
   Queue.prototype.isEmpty = function () {
    return this.temp.length === 0
   }
   //清空佇列裡的所有資料
   Queue.prototype.clear = function () {
    return this.temp = []
   }